import {useForceUpdate, useThrottler} from '@rainbow-d9/n1';
import {MutableRefObject, useEffect} from 'react';
import {PipelineStepDef} from '../../definition';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../../playground-event-bus';
import {PlaygroundModuleAssistant} from '../../types';
import {switchAllNodesFolding} from '../diagram-utils';
import {EditorKernelRefState, PostRepaintAction, repaintBackend} from '../painter';

export interface UseRepaintBackendOptions {
	stateRef: MutableRefObject<EditorKernelRefState>;
	postPaintActions: MutableRefObject<Array<PostRepaintAction>>;
	assistant?: PlaygroundModuleAssistant;
}

/**
 * handle all events which will lead to repaint backend, which can get size of all nodes
 */
export const useRepaintBackend = (options: UseRepaintBackendOptions) => {
	const {stateRef, postPaintActions, assistant} = options;

	const {on, off, fire} = usePlaygroundEventBus();
	const {replace} = useThrottler();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		// repaint on somewhere call REPAINT
		const onRepaintBackend = () => {
			repaintBackend({
				assistant: () => assistant, stateRef, replace,
				onStateContentChanged: async () => {
					fire(PlaygroundEventTypes.REPAINT);
				},
				onContentChanged: (content?: string) => {
					fire(PlaygroundEventTypes.CONTENT_CHANGED, content);
				}
			});
			forceUpdate();
		};
		const onRepaintAndLocateStepNode = (step: PipelineStepDef) => {
			postPaintActions.current.push(() => {
				fire(PlaygroundEventTypes.DO_LOCATE_STEP_NODE, step);
			});
			onRepaintBackend();
		};
		const switchFolding = (fold: boolean) => {
			switchAllNodesFolding(stateRef.current.def!, fold);
			onRepaintBackend();
		};
		const onFoldAllNodes = () => switchFolding(true);
		const onUnfoldAllNodes = () => switchFolding(false);
		on(PlaygroundEventTypes.REPAINT, onRepaintBackend);
		on(PlaygroundEventTypes.REPAINT_AND_LOCATE_STEP_NODE, onRepaintAndLocateStepNode);
		on(PlaygroundEventTypes.FOLD_ALL_NODES, onFoldAllNodes);
		on(PlaygroundEventTypes.UNFOLD_ALL_NODES, onUnfoldAllNodes);
		return () => {
			off(PlaygroundEventTypes.REPAINT, onRepaintBackend);
			off(PlaygroundEventTypes.REPAINT_AND_LOCATE_STEP_NODE, onRepaintAndLocateStepNode);
			off(PlaygroundEventTypes.FOLD_ALL_NODES, onFoldAllNodes);
			off(PlaygroundEventTypes.UNFOLD_ALL_NODES, onUnfoldAllNodes);
		};
	}, [on, off, fire, replace, forceUpdate, stateRef, postPaintActions, assistant]);
};