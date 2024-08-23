import React, {MutableRefObject, useEffect, useRef} from 'react';
import {PipelineStepDef} from '../definition';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {EditorKernelRefState} from './painter';
import {NodeLocatorNeedle} from './widgets';

export interface NodeLocatorProps {
	stateRef: MutableRefObject<EditorKernelRefState>;
}

export const NodeLocator = (props: NodeLocatorProps) => {
	const {stateRef} = props;

	const {on, off, fire} = usePlaygroundEventBus();
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const onLocateFileNode = () => {
			fire(PlaygroundEventTypes.DO_LOCATE_FILE_NODE);
		};
		const onLocateStepNode = (step: PipelineStepDef) => {
			fire(PlaygroundEventTypes.REPAINT_AND_LOCATE_STEP_NODE, step);
		};
		on(PlaygroundEventTypes.LOCATE_FILE_NODE, onLocateFileNode);
		on(PlaygroundEventTypes.LOCATE_STEP_NODE, onLocateStepNode);
		return () => {
			off(PlaygroundEventTypes.LOCATE_FILE_NODE, onLocateFileNode);
			off(PlaygroundEventTypes.LOCATE_STEP_NODE, onLocateStepNode);
		};
	}, [on, off, fire, stateRef]);

	return <NodeLocatorNeedle ref={ref}/>;
};
