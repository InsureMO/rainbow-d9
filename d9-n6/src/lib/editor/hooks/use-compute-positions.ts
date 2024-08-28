import {MutableRefObject, useEffect} from 'react';
import {DEFAULTS} from '../../constants';
import {StartNodeModel} from '../../diagram';
import {usePlaygroundEventBus} from '../../playground-event-bus';
import {buildGrid, cloneDiagramNodes, computeGrid, createLockedDiagramModel, GridCell} from '../diagram-utils';
import {computeCanvasSize, EditorKernelDiagramStatus, EditorKernelRefState} from '../painter';

export interface UseRepaintFrontendOptions {
	stateRef: MutableRefObject<EditorKernelRefState>;
	afterPositionComputed: () => void;
}

export const useComputePositions = (options: UseRepaintFrontendOptions) => {
	const {stateRef, afterPositionComputed} = options;

	const {fire} = usePlaygroundEventBus();
	useEffect(() => {
		const computePositions = () => {
			const backendModel = stateRef.current.engineBackend.getModel();
			// re-calculate node positions
			const grid: Array<Array<GridCell>> = [];
			const nodes = backendModel.getNodes();
			const startNode = nodes.find(node => node instanceof StartNodeModel);
			grid[0] = grid[0] ?? [];
			grid[0][0] = {
				node: startNode, x: startNode.getPosition().x, y: startNode.getPosition().y,
				maxWidth: -1, maxHeight: -1, top: -1, left: -1
			};
			// [0, 0] is hold by start node
			buildGrid(startNode, grid, 0, 0);
			const {startTop, startLeft, rowGap, columnGap} = DEFAULTS.diagram;
			computeGrid(grid, startTop, startLeft, rowGap, columnGap);
			// must reset model, otherwise links might not be repositioned, don't know why.
			const newModel = cloneDiagramNodes(backendModel);
			// leave canvas zoom as it is, but need to copy it to the new model
			newModel.setZoomLevel((stateRef.current.canvasZoom ?? 1) * 100);
			// reset size only
			const {width, height} = computeCanvasSize(newModel);
			stateRef.current.canvasWidth = width;
			stateRef.current.canvasHeight = height;
			stateRef.current.engine.setModel(newModel);
			// clear backend model to save dom performance
			stateRef.current.engineBackend.setModel(createLockedDiagramModel());
			stateRef.current.diagramStatus = EditorKernelDiagramStatus.ALL_CANVAS_READY;
			afterPositionComputed();
		};

		if (stateRef.current.diagramStatus === EditorKernelDiagramStatus.PAINT
			|| stateRef.current.diagramStatus === EditorKernelDiagramStatus.PAINT_ON_POSITION) {
			computePositions();
		}

	}, [fire, stateRef, stateRef.current.diagramStatus, afterPositionComputed]);
};