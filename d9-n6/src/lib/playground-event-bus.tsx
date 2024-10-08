import {useCreateEventBus} from '@rainbow-d9/n1';
import React, {createContext, ReactNode, useContext} from 'react';
import {PipelineStepDef} from './definition';

export enum PlaygroundEventTypes {
	CONTENT_CHANGED = 'content-changed',
	RESET_CONTENT = 'reset-content',
	INIT_HELP_DOC_WIDTH = 'init-help-doc-width',
	SHOW_EDIT_DIALOG = 'show-edit-dialog',
	HIDE_EDIT_DIALOG = 'hide-edit-dialog',

	REPAINT = 'repaint',
	ZOOM_TO = 'zoom-to', ZOOM_TO_FIT = 'zoom-to-fit',
	FOLD_ALL_NODES = 'fold-all-nodes', UNFOLD_ALL_NODES = 'unfold-all-nodes',
	LOCATE_FILE_NODE = 'locate-file-node', DO_LOCATE_FILE_NODE = 'do-locate-file-node',
	LOCATE_STEP_NODE = 'locate-step-node', REPAINT_AND_LOCATE_STEP_NODE = 'repaint-and-locate-step-node',
	DO_LOCATE_STEP_NODE = 'do-locate-step-node'
}

export interface PlaygroundEventBus {
	fire(type: PlaygroundEventTypes.CONTENT_CHANGED, content?: string): this;

	on(type: PlaygroundEventTypes.CONTENT_CHANGED, listener: (content?: string) => void): this;

	off(type: PlaygroundEventTypes.CONTENT_CHANGED, listener: (content?: string) => void): this;

	fire(type: PlaygroundEventTypes.RESET_CONTENT, content: string): this;

	on(type: PlaygroundEventTypes.RESET_CONTENT, listener: (content: string) => void): this;

	off(type: PlaygroundEventTypes.RESET_CONTENT, listener: (content: string) => void): this;

	fire(type: PlaygroundEventTypes.INIT_HELP_DOC_WIDTH, width: number): this;

	on(type: PlaygroundEventTypes.INIT_HELP_DOC_WIDTH, listener: (width: number) => void): this;

	off(type: PlaygroundEventTypes.INIT_HELP_DOC_WIDTH, listener: (width: number) => void): this;

	fire(type: PlaygroundEventTypes.SHOW_EDIT_DIALOG, content: ReactNode): this;

	on(type: PlaygroundEventTypes.SHOW_EDIT_DIALOG, listener: (content: ReactNode) => void): this;

	off(type: PlaygroundEventTypes.SHOW_EDIT_DIALOG, listener: (content: ReactNode) => void): this;

	fire(type: PlaygroundEventTypes.HIDE_EDIT_DIALOG): this;

	on(type: PlaygroundEventTypes.HIDE_EDIT_DIALOG, listener: () => void): this;

	off(type: PlaygroundEventTypes.HIDE_EDIT_DIALOG, listener: () => void): this;

	fire(type: PlaygroundEventTypes.REPAINT): this;

	on(type: PlaygroundEventTypes.REPAINT, listener: () => void): this;

	off(type: PlaygroundEventTypes.REPAINT, listener: () => void): this;

	fire(type: PlaygroundEventTypes.ZOOM_TO, zoom: number): this;

	on(type: PlaygroundEventTypes.ZOOM_TO, listener: (zoom: number) => void): this;

	off(type: PlaygroundEventTypes.ZOOM_TO, listener: (zoom: number) => void): this;

	fire(type: PlaygroundEventTypes.ZOOM_TO_FIT): this;

	on(type: PlaygroundEventTypes.ZOOM_TO_FIT, listener: () => void): this;

	off(type: PlaygroundEventTypes.ZOOM_TO_FIT, listener: () => void): this;

	fire(type: PlaygroundEventTypes.FOLD_ALL_NODES): this;

	on(type: PlaygroundEventTypes.FOLD_ALL_NODES, listener: () => void): this;

	off(type: PlaygroundEventTypes.FOLD_ALL_NODES, listener: () => void): this;

	fire(type: PlaygroundEventTypes.UNFOLD_ALL_NODES): this;

	on(type: PlaygroundEventTypes.UNFOLD_ALL_NODES, listener: () => void): this;

	off(type: PlaygroundEventTypes.UNFOLD_ALL_NODES, listener: () => void): this;

	fire(type: PlaygroundEventTypes.LOCATE_FILE_NODE): this;

	on(type: PlaygroundEventTypes.LOCATE_FILE_NODE, listener: () => void): this;

	off(type: PlaygroundEventTypes.LOCATE_FILE_NODE, listener: () => void): this;

	fire(type: PlaygroundEventTypes.DO_LOCATE_FILE_NODE): this;

	on(type: PlaygroundEventTypes.DO_LOCATE_FILE_NODE, listener: () => void): this;

	off(type: PlaygroundEventTypes.DO_LOCATE_FILE_NODE, listener: () => void): this;

	fire(type: PlaygroundEventTypes.LOCATE_STEP_NODE, step: PipelineStepDef): this;

	on(type: PlaygroundEventTypes.LOCATE_STEP_NODE, listener: (step: PipelineStepDef) => void): this;

	off(type: PlaygroundEventTypes.LOCATE_STEP_NODE, listener: (step: PipelineStepDef) => void): this;

	fire(type: PlaygroundEventTypes.REPAINT_AND_LOCATE_STEP_NODE, step: PipelineStepDef): this;

	on(type: PlaygroundEventTypes.REPAINT_AND_LOCATE_STEP_NODE, listener: (step: PipelineStepDef) => void): this;

	off(type: PlaygroundEventTypes.REPAINT_AND_LOCATE_STEP_NODE, listener: (step: PipelineStepDef) => void): this;

	fire(type: PlaygroundEventTypes.DO_LOCATE_STEP_NODE, step: PipelineStepDef): this;

	on(type: PlaygroundEventTypes.DO_LOCATE_STEP_NODE, listener: (step: PipelineStepDef) => void): this;

	off(type: PlaygroundEventTypes.DO_LOCATE_STEP_NODE, listener: (step: PipelineStepDef) => void): this;
}

const Context = createContext<PlaygroundEventBus>({} as PlaygroundEventBus);
Context.displayName = 'PlaygroundEventBus';

export const PlaygroundEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<PlaygroundEventBus>('playground');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const usePlaygroundEventBus = () => useContext(Context);
