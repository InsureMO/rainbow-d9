import {indentWithTab} from '@codemirror/commands';
import {EditorState as CodeMirrorState} from '@codemirror/state';
import {EditorView, keymap, ViewUpdate} from '@codemirror/view';
import {basicSetup} from 'codemirror';
import React, {useEffect, useRef, useState} from 'react';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {EditorProps} from '../types';
import {EditorPanel, EditorWrapper} from './widgets';

export interface EditorState {
	editor?: EditorView;
}

export const Editor = (props: EditorProps) => {
	const {
		content,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		externalDefsTypes,
		...rest
	} = props;

	const ref = useRef<HTMLDivElement>(null);
	const contentRef = useRef<string>(content ?? '');
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
					// lineNumbers({}),
					// EditorView.lineWrapping,
					// CodeMirrorState.tabSize.of(2),
					keymap.of([indentWithTab]),
					// syntaxHighlighting(defaultHighlightStyle, {fallback: true}),
					// markdown({addKeymap: false}), // markdown support
					// WidgetDeclarations,
					// oneDark,
					EditorView.updateListener.of((view: ViewUpdate) => {
						if (view.docChanged) {
							const doc = view.state.doc;
							const value = doc.toString();
							contentRef.current = value;
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
	}, [fire]);
	useEffect(() => {
		if (state.editor == null) {
			return;
		}
		state.editor.dispatch({changes: {from: 0, insert: contentRef.current}});
		fire(PlaygroundEventTypes.CONTENT_INITIALIZED, contentRef.current);
	}, [fire, state.editor]);

	return <EditorWrapper {...rest}>
		<EditorPanel ref={ref}/>
	</EditorWrapper>;
};
