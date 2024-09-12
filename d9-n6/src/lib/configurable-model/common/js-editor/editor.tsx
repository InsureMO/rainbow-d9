import {javascript} from '@codemirror/lang-javascript';
import {createCodeMirrorTs562Es2022Extensions} from '@rainbow-d9/ts-vfs';
import React, {useState} from 'react';
import {PlaygroundDecorator} from '../../../types';
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
	return [
		javascript({jsx: false, typescript: false}),
		...createCodeMirrorTs562Es2022Extensions()
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