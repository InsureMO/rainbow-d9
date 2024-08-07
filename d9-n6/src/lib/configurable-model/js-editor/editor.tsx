import {indentWithTab} from '@codemirror/commands';
import {javascript} from '@codemirror/lang-javascript';
import {lintGutter} from '@codemirror/lint';
import {Compartment, EditorState as CodeMirrorState} from '@codemirror/state';
import {EditorView, keymap, ViewUpdate} from '@codemirror/view';
import {useThrottler, VUtils} from '@rainbow-d9/n1';
import {basicSetup} from 'codemirror';
// import * as eslint from 'eslint-linter-browserify';
// import globals from 'globals';
import React, {useEffect, useRef, useState} from 'react';
import {JsEditorContainer} from './widgets';

// /**
//  * TODO don't know why the @typescript-eslint/eslint-plugin cannot be imported, so use this instead temporarily. all rules disabled here
//  */
// export const TypescriptEslintPlugin = {
// 	// preferred location of name and version
// 	meta: {
// 		name: '@typescript-eslint',
// 		version: '7.8.0' // latest 2024/05/08
// 	},
// 	rules: {
// 		'no-var-requires': {
// 			create() {
// 				// report nothing now
// 			}
// 		}
// 	}
// };

export interface JsEditorProps {
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

export const JsEditor = (props: JsEditorProps) => {
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
					javascript(),
					lintGutter(),
					// linter(esLint(new eslint.Linter(), {
					// 	// eslint configuration
					// 	languageOptions: {
					// 		// globals: {...globals.node}
					// 		// use default latest and module
					// 		// parserOptions: {ecmaVersion: 2022, sourceType: 'module'},
					// 	},
					// 	linterOptions: {
					// 		reportUnusedDisableDirectives: false
					// 	},
					// 	plugins: {
					// 		'@typescript-eslint': TypescriptEslintPlugin
					// 	},
					// 	rules: {
					// 		'no-extra-semi': 'off',
					// 		'@typescript-eslint/no-var-requires': 'off'
					// 		// ...tslint.rules
					// 		// semi: ['error', 'never'],
					// 	}
					// }))
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

	return <JsEditorContainer data-visible={visible} data-height={height} ref={ref}/>;
};