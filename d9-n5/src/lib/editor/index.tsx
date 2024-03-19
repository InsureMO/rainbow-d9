import {indentWithTab} from '@codemirror/commands';
import {markdown, markdownLanguage} from '@codemirror/lang-markdown';
import {EditorState as CodeMirrorState} from '@codemirror/state';
import {EditorView, keymap, ViewUpdate} from '@codemirror/view';
import {basicSetup} from 'codemirror';
import React, {useEffect, useRef, useState} from 'react';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {EditorProps} from '../types';
import {createD9mlCompletions, d9mlExtensions, d9mlHighlightStyle, WidgetDeclarationIconPlugin} from './enhance';
import {EditorPanel, EditorWrapper} from './widgets';

export interface EditorState {
	editor?: EditorView;
}

export const Editor = (props: EditorProps) => {
	const {
		content,
		externalDefsTypes, widgets,
		...rest
	} = props;

	const ref = useRef<HTMLDivElement>(null);
	const {fire} = usePlaygroundEventBus();
	const [state, setState] = useState<EditorState>({});
	useEffect(() => {
		if (ref.current == null) {
			return;
		}

		const editor = new EditorView({
			state: CodeMirrorState.create({
				doc: '',
				extensions: [
					basicSetup,
					keymap.of([indentWithTab]),
					d9mlHighlightStyle,
					createD9mlCompletions({widgets, externalDefsTypes: externalDefsTypes ?? {}}),
					markdown({
						base: markdownLanguage, extensions: [d9mlExtensions]
					}),
					WidgetDeclarationIconPlugin,
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
		setState(state => ({...state, editor}));
		return () => {
			editor.destroy();
		};
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

	return <EditorWrapper {...rest}>
		<EditorPanel ref={ref}/>
	</EditorWrapper>;
};
