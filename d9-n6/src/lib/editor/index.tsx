import React from 'react';
import {EditorProps} from '../types';
import {EditorKernel} from './kernel';

export const Editor = (props: EditorProps) => {
	return <EditorKernel {...props}/>;
};
