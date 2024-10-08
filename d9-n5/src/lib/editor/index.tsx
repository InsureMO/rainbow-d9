import {indentWithTab} from '@codemirror/commands';
import {javascript} from '@codemirror/lang-javascript';
import {markdown, markdownLanguage} from '@codemirror/lang-markdown';
import {Compartment, EditorState as CodeMirrorState} from '@codemirror/state';
import {EditorView, keymap, ViewUpdate} from '@codemirror/view';
import {WidgetType} from '@rainbow-d9/n1';
import {basicSetup} from 'codemirror';
import React, {useEffect, useRef, useState} from 'react';
import {createTheme, useTheme} from '../hooks/use-theme';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {EditorProps, PlaygroundWidgetGroupKey} from '../types';
import {
	createD9mlCompletions,
	createWidgetLinter,
	d9mlExtensions,
	d9mlHighlightStyle,
	WidgetDeclarationIconPlugin
} from './enhance';
import {WidgetTemplateDialog} from './template-dialog';
import {beautifyTemplate} from './utils';
import {EditorPanel, EditorWrapper} from './widgets';

export * from './widgets';

export interface EditorState {
	size?: number;
	editor?: EditorView;
	themeListener?: Compartment;
	editorBadge: boolean;
}

export const Editor = (props: EditorProps) => {
	const {
		content,
		externalDefsTypes, widgets, decorator: {theme} = {},
		...rest
	} = props;

	const ref = useRef<HTMLDivElement>(null);
	const {on, off, fire} = usePlaygroundEventBus();
	const [state, setState] = useState<EditorState>({editorBadge: false});
	useEffect(() => {
		if (ref.current == null) {
			return;
		}

		const {extension: changeableThemeExtension, listener: themeListener} = createTheme(theme);
		const editor = new EditorView({
			state: CodeMirrorState.create({
				doc: '',
				extensions: [
					basicSetup,
					keymap.of([indentWithTab]),
					d9mlHighlightStyle,
					createD9mlCompletions({widgets, externalDefsTypes: externalDefsTypes ?? {}}),
					markdown({
						defaultCodeLanguage: javascript({jsx: false, typescript: false}),
						base: markdownLanguage, extensions: d9mlExtensions
					}),
					...createWidgetLinter({widgets, externalDefsTypes: externalDefsTypes ?? {}}),
					WidgetDeclarationIconPlugin,
					...changeableThemeExtension,
					EditorView.updateListener.of((view: ViewUpdate) => {
						if (view.docChanged) {
							const doc = view.state.doc;
							const value = doc.toString();
							fire(PlaygroundEventTypes.CONTENT_CHANGED, value);
						}
					})
				]
			}),
			parent: ref.current
		});
		setState(state => ({...state, editor, themeListener}));
		return () => {
			editor.destroy();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fire, widgets, externalDefsTypes]);
	useEffect(() => {
		if (state.editor == null) {
			return;
		}
		const doc = state.editor.state.doc;
		const value = doc.toString();
		if (value !== (content ?? '')) {
			state.editor.dispatch({changes: {from: 0, to: doc.length, insert: content ?? ''}});
		}
	}, [fire, state.editor, content]);
	useEffect(() => {
		const onResizeEditor = (width: number) => {
			setState(state => ({...state, size: width}));
		};
		on(PlaygroundEventTypes.RESIZE_EDITOR, onResizeEditor);
		return () => {
			off(PlaygroundEventTypes.RESIZE_EDITOR, onResizeEditor);
		};
	}, [on, off]);
	useEffect(() => {
		const onSwitchEditorBadge = (visible: boolean) => {
			setState(state => ({...state, editorBadge: visible}));
		};
		on(PlaygroundEventTypes.SWITCH_EDITOR_BADGE, onSwitchEditorBadge);
		return () => {
			off(PlaygroundEventTypes.SWITCH_EDITOR_BADGE, onSwitchEditorBadge);
		};
	}, [on, off]);
	useEffect(() => {
		if (state.editor == null) {
			return;
		}
		const onLocateLine = (lineNumber: number) => {
			const editor = state.editor;
			const line = editor.state.doc.line(lineNumber);
			// top, left is relative to current window viewport
			editor.dispatch({selection: {anchor: line.from}, scrollIntoView: true});
			// not sure that scrolling is sync or async,
			// therefore delay 100ms to make compensatory moves, and try the exception
			// the compensatory moves is necessary because the scrolling might let the line at bottom of editor viewport
			setTimeout(() => {
				try {
					const {top, left} = editor.coordsAtPos(line.from);
					const {top: contentTop, left: contentLeft} = editor.contentDOM.getBoundingClientRect();
					const scroller = editor.scrollDOM;
					// console.log(line.from, top, left, scroller.scrollTop, contentLeft);
					scroller.scrollTo({
						top: Math.max(0, top - contentTop - 20), left: left - contentLeft, behavior: 'smooth'
					});
				} catch {
					// do nothing, simply ignore
				}
			}, 100);
		};
		on(PlaygroundEventTypes.LOCATE_LINE, onLocateLine);
		return () => {
			off(PlaygroundEventTypes.LOCATE_LINE, onLocateLine);
		};
	}, [on, off, state.editor]);
	useEffect(() => {
		if (state.editor == null) {
			return;
		}
		const findDefaultPrefix = (keyOrWidgetType: WidgetType, level: number) => {
			// find by key, then by widget type
			const group = widgets.widgets.find(widget => widget.$key === keyOrWidgetType)?.group
				?? widgets.widgets.find(widget => widget.$wt === keyOrWidgetType)?.group;
			if (group === PlaygroundWidgetGroupKey.CONTAINERS) {
				if (level < 6) {
					return new Array(level).fill('#').join('');
				}
			}
			return '-';
		};
		const findClosestPreviousHeadingLevel = (lineNumber: number, include: boolean): number => {
			if (lineNumber === 1) {
				return 2;
			}
			const editorState = state.editor.state;
			for (let line = (include ? lineNumber : (lineNumber - 1)); line >= 1; line--) {
				const {text} = editorState.doc.line(line);
				if (text.startsWith('#')) {
					const [, symbol] = text.match(/^(#{1,6})\s(.*)$/) ?? [];
					if (symbol != null) {
						return Math.max(symbol.length, 2);
					}
				}
			}
			return 2;
		};
		const onInsertWidgetTemplate = (keyOrWidgetType: WidgetType) => {
			const editorState = state.editor.state;
			const {from, to} = editorState.selection.main;
			const {
				from: fromLineFirstCharPos, number: fromLineNumber, text: fromLineText
			} = editorState.doc.lineAt(from);
			if (fromLineNumber === 1) {
				// cursor at first line, copy to clipboard and alert
				fire(PlaygroundEventTypes.SHOW_WIDGET_TEMPLATE_DIALOG, keyOrWidgetType, findDefaultPrefix(keyOrWidgetType, 2),
					'The cursor is at the beginning of the designer, so it cannot be directly inserted the widget template.');
				return;
			}
			const text = editorState.sliceDoc(from, to) ?? '';
			if (from !== to && text.trim().length !== 0) {
				// something selected (not blank check first), copy to clipboard and alert
				fire(PlaygroundEventTypes.SHOW_WIDGET_TEMPLATE_DIALOG, keyOrWidgetType,
					findDefaultPrefix(keyOrWidgetType, findClosestPreviousHeadingLevel(fromLineNumber, false)),
					'The current selection in the designer already contains content, so it cannot be directly inserted the widget template.');
				return;
			}
			const {number: toLineNumber} = editorState.doc.lineAt(to);
			if (fromLineNumber !== toLineNumber) {
				// selected multiple lines, copy to clipboard and alert
				fire(PlaygroundEventTypes.SHOW_WIDGET_TEMPLATE_DIALOG, keyOrWidgetType,
					findDefaultPrefix(keyOrWidgetType, findClosestPreviousHeadingLevel(fromLineNumber, false)),
					'The current selection contains multiple lines, so it cannot be directly inserted the widget template.');
				return;
			}
			let indent = '';
			let prefix = '';
			if (fromLineText.trim().length !== 0) {
				const [, spaces, symbol, content] = fromLineText.match(/^(\s*)(#{1,6}|-|\*)(.*)$/) ?? [];
				if (symbol == null || (spaces.length !== 0 && symbol.includes('#'))) {
					// not matched, or matched but there are spaces before symbol #
					// not heading or list item, copy to clipboard and alert
					fire(PlaygroundEventTypes.SHOW_WIDGET_TEMPLATE_DIALOG, keyOrWidgetType,
						findDefaultPrefix(keyOrWidgetType, findClosestPreviousHeadingLevel(fromLineNumber, false)),
						'The selected line is neither a heading nor a bullet list, so it cannot be directly inserted into the widget template.');
					return;
				}
				if (content.trim().length !== 0) {
					// matched, but already has content, copy to clipboard and alert
					fire(PlaygroundEventTypes.SHOW_WIDGET_TEMPLATE_DIALOG, keyOrWidgetType,
						findDefaultPrefix(keyOrWidgetType, findClosestPreviousHeadingLevel(fromLineNumber, false)),
						'The selected line already contains content, so it cannot be directly inserted into the widget template.');
					return;
				}
				indent = spaces;
				prefix = symbol;
			} else {
				// blank line
				prefix = findDefaultPrefix(keyOrWidgetType, findClosestPreviousHeadingLevel(fromLineNumber, false));
			}
			let template = widgets.widgets.find(widget => widget.$key === keyOrWidgetType)?.template
				?? widgets.widgets.find(widget => widget.$wt === keyOrWidgetType)?.template ?? '';
			template = beautifyTemplate(template, prefix, indent);
			state.editor.dispatch({
				changes: {
					from: fromLineFirstCharPos, to: fromLineFirstCharPos + fromLineText.length,
					insert: template
				}
			});
		};
		on(PlaygroundEventTypes.INSERT_WIDGET_TEMPLATE, onInsertWidgetTemplate);
		return () => {
			off(PlaygroundEventTypes.INSERT_WIDGET_TEMPLATE, onInsertWidgetTemplate);
		};
	}, [on, off, fire, state.editor, widgets.widgets]);
	useTheme({theme, editor: state.editor, listener: state.themeListener});

	return <>
		<WidgetTemplateDialog widgets={widgets}/>
		<EditorWrapper editorSize={state.size} {...rest} data-editor-badge={state.editorBadge}>
			<EditorPanel ref={ref}/>
		</EditorWrapper>
	</>;
};
