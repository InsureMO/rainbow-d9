import {MutableRefObject, useEffect} from 'react';
import {EditorKernelDiagramStatus, EditorKernelRefState, PostRepaintAction} from '../painter';

export interface UseCanvasInServiceOptions {
	stateRef: MutableRefObject<EditorKernelRefState>;
	postPaintActions: MutableRefObject<Array<PostRepaintAction>>;
}

export const useCanvasInService = (options: UseCanvasInServiceOptions) => {
	const {stateRef, postPaintActions} = options;

	useEffect(() => {
		if (stateRef.current.diagramStatus !== EditorKernelDiagramStatus.IN_SERVICE) {
			return;
		}
		const actions = [...postPaintActions.current];
		postPaintActions.current = [];
		actions.forEach(action => action());
	}, [stateRef, stateRef.current.diagramStatus, postPaintActions]);
};
