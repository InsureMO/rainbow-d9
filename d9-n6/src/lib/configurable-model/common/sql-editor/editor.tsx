import {sql} from '@codemirror/lang-sql';
import React, {useState} from 'react';
import {PlaygroundDecorator} from '../../../types';
import {CodeEditorState, useHandleCodeChange, useInitCodeContent, useInitCodeEditor} from '../code-editor';
import {SqlEditorContainer} from './widgets';

export interface SqlEditorProps {
	visible?: boolean;
	height?: number | string;
	snippet?: string;
	onChange: (snippet: string) => Promise<void>;
	placeholder?: string;
	decorator?: PlaygroundDecorator;
}

const createCodeMirrorExtensions = () => sql();
export const SqlEditor = (props: SqlEditorProps) => {
	const {visible = true, height, snippet, onChange, decorator} = props;

	const [state, setState] = useState<CodeEditorState>({});
	const {ref} = useInitCodeEditor({state, setState, createCodeMirrorExtensions, decorator});
	useInitCodeContent({editor: state.editor, code: snippet});
	useHandleCodeChange({...state, onChange});

	return <SqlEditorContainer data-visible={visible} data-height={height} ref={ref}/>;
};