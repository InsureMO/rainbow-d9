// import * as eslint from 'eslint-linter-browserify';
import {javascript} from '@codemirror/lang-javascript';
// import globals from 'globals';
import React, {useState} from 'react';
import {CodeEditorState, useHandleCodeChange, useInitCodeContent, useInitCodeEditor} from '../code-editor';
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

const createCodeMirrorExtensions = () => {
	return [
		javascript()
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
	];
};
export const JsEditor = (props: JsEditorProps) => {
	const {visible = true, height, snippet, onChange} = props;

	const [state, setState] = useState<CodeEditorState>({});
	const {ref} = useInitCodeEditor({
		setState, createCodeMirrorExtensions
	});
	useInitCodeContent({editor: state.editor, code: snippet});
	useHandleCodeChange({...state, onChange});

	return <JsEditorContainer data-visible={visible} data-height={height} ref={ref}/>;
};