import React from 'react';
import {EditorProps} from '../types';
import {EditorKernel} from './kernel';

export const Editor = (props: EditorProps) => {
	return <EditorKernel {...props}/>;
};

export * from './widgets';
export * from './diagram-utils';
export * from './painter';

export * from './hooks/use-compute-positions';
export * from './hooks/use-repaint-backend';
export * from './hooks/use-force-repaint';

export * from './toolbar-toc';
export * from './toolbar';

export * from './backend-canvas';
export * from './frontend-canvas';
export * from './kernel';
