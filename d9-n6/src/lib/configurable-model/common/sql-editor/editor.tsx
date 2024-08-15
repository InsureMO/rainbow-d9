import {indentWithTab} from '@codemirror/commands';
import {sql} from '@codemirror/lang-sql';
import {lintGutter} from '@codemirror/lint';
import {Compartment, EditorState as CodeMirrorState} from '@codemirror/state';
import {EditorView, keymap, ViewUpdate} from '@codemirror/view';
import {useThrottler, VUtils} from '@rainbow-d9/n1';
import {basicSetup} from 'codemirror';
import React, {useEffect, useRef, useState} from 'react';
import {SqlEditorContainer} from './widgets';

export interface SqlEditorProps {
	visible?: boolean;
	height?: number | string;
	snippet?: string;
	onChange: (snippet: string) => Promise<void>;
	placeholder?: string;
}

export interface JsEditorState {
	editor?: EditorView;
	changeListener?: Compartment;
}

export const SqlEditor = (props: SqlEditorProps) => {
	const {visible = true, height, snippet, onChange} = props;

	const ref = useRef<HTMLDivElement>(null);
	const [state, setState] = useState<JsEditorState>({});
	const {replace} = useThrottler();
	useEffect(() => {
		if (ref.current == null) {
			return;
		}

		const changeListener = new Compartment();
		const editor = new EditorView({
			state: CodeMirrorState.create({
				doc: '',
				extensions: [
					basicSetup,
					keymap.of([indentWithTab]),
					sql(),
					lintGutter(),
					changeListener.of(EditorView.updateListener.of(VUtils.noop))
				]
			}),
			parent: ref.current
		});
		setState(state => ({...state, editor, changeListener}));
		return () => {
			editor.destroy();
		};
	}, []);
	useEffect(() => {
		if (state.editor == null) {
			return;
		}
		const doc = state.editor.state.doc;
		const text = doc.toString();
		if (text !== snippet) {
			state.editor.dispatch({changes: {from: 0, to: doc.length, insert: snippet ?? ''}});
		}
	}, [state.editor, snippet]);
	useEffect(() => {
		if (state.editor == null) {
			return;
		}
		state.editor.dispatch({
			effects: state.changeListener.reconfigure(EditorView.updateListener.of((view: ViewUpdate) => {
				if (view.docChanged) {
					replace(async () => {
						await onChange(view.state.doc.toString());
					}, 300);
				}
			}))
		});
	}, [replace, state.editor, state.changeListener, onChange]);

	return <SqlEditorContainer data-visible={visible} data-height={height} ref={ref}/>;
};