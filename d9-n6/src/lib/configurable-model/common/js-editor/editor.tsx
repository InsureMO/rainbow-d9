// import * as eslint from 'eslint-linter-browserify';
import {autocompletion} from '@codemirror/autocomplete';
import {javascript} from '@codemirror/lang-javascript';
import {tsAutocomplete, tsFacet, tsHover, tsLinter, tsSync} from '@valtown/codemirror-ts';
import React, {useState} from 'react';
import {PlaygroundDecorator} from '../../../types';
import {ALL_FILES_MAP, createSystem, createVirtualTypeScriptEnvironment} from '../../../typescript-vfs';
import {CodeEditorState, useHandleCodeChange, useInitCodeContent, useInitCodeEditor} from '../code-editor';
import {JsEditorContainer} from './widgets';

export interface JsEditorProps {
	visible?: boolean;
	height?: number | string;
	snippet?: string;
	onChange: (snippet: string) => Promise<void>;
	placeholder?: string;
	decorator?: PlaygroundDecorator;
}

const createCodeMirrorExtensions = () => {
	const system = createSystem(ALL_FILES_MAP);
	const compilerOpts = {};
	const env = createVirtualTypeScriptEnvironment(system, [], compilerOpts);
	const path = 'index.ts';
	return [
		javascript({jsx: false, typescript: false}),
		tsFacet.of({env, path}),
		tsSync(),
		tsLinter(),
		autocompletion({override: [tsAutocomplete()]}),
		tsHover()
	];
};
export const JsEditor = (props: JsEditorProps) => {
	const {visible = true, height, snippet, onChange, decorator} = props;

	const [state, setState] = useState<CodeEditorState>({});
	const {ref} = useInitCodeEditor({state, setState, createCodeMirrorExtensions, decorator});
	useInitCodeContent({editor: state.editor, code: snippet});
	useHandleCodeChange({...state, onChange});

	return <JsEditorContainer data-visible={visible} data-height={height} ref={ref}/>;
};