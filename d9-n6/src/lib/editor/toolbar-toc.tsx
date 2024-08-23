import {useForceUpdate} from '@rainbow-d9/n1';
import React, {MutableRefObject, ReactNode, useEffect, useRef, useState} from 'react';
import {FileDef, isPipelineDef, PipelineStepDef} from '../definition';
import {StepNodeEntityType, StepNodeModel} from '../diagram';
import {Labels} from '../labels';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {findSubStepsWithCategory, tryToRevealStep} from './diagram-utils';
import {EditorKernelRefState} from './painter';
import {EditorToolbarTocContainer, EditorToolbarTocItem} from './widgets';

export interface ToolbarTocProps {
	expanded: boolean;
	stateRef: MutableRefObject<EditorKernelRefState>;
}

interface TocItem {
	index: string;
	label: ReactNode;
	type: StepNodeEntityType | 'file';
	def: FileDef | PipelineStepDef;
}

export const ToolbarToc = (props: Omit<ToolbarTocProps, 'expanded'>) => {
	const {stateRef} = props;
	const def = stateRef.current.def!;

	const ref = useRef<HTMLDivElement>(null);
	const {fire} = usePlaygroundEventBus();
	const [firstPaint, setFirstPaint] = useState(true);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		if (ref.current == null) {
			return;
		}
		const editor = ref.current.parentElement.previousElementSibling as HTMLDivElement;
		if (editor == null) {
			return;
		}
		const resizeObserver = new ResizeObserver(() => {
			forceUpdate();
		});
		resizeObserver.observe(editor);
		return () => {
			resizeObserver?.disconnect();
		};
	}, [forceUpdate]);
	useEffect(() => {
		setFirstPaint(false);
	}, [firstPaint]);
	// TODO respond for def content change

	const items: Array<TocItem> = [{label: def.code, index: '0.', type: 'file', def}];
	const buildItemsOfStep = (step: PipelineStepDef, indexPrefix: string) => {
		const subStepsWithCategory = findSubStepsWithCategory(step) ?? {};
		if (subStepsWithCategory.steps != null) {
			buildItems(subStepsWithCategory.steps, indexPrefix);
		}
		Object.keys(subStepsWithCategory)
			.filter(key => !['steps', 'otherwise', 'catchable', 'uncatchable', 'exposed', 'any'].includes(key))
			.sort()
			.forEach(key => {
				if (subStepsWithCategory[key] != null) {
					buildItems(subStepsWithCategory[key], `${indexPrefix}${key}.`);
				}
			});
		['otherwise', 'catchable', 'uncatchable', 'exposed', 'any'].forEach(key => {
			if (subStepsWithCategory[key] != null) {
				buildItems(subStepsWithCategory[key], `${indexPrefix}${key}.`);
			}
		});
	};
	const buildItems = (steps: Array<PipelineStepDef>, indexPrefix: string) => {
		steps.forEach((step, stepIndex) => {
			const index = `${indexPrefix}${stepIndex + 1}.`;
			items.push({
				label: (step.name ?? '').trim() || Labels.StepNodeNoname, index,
				type: StepNodeEntityType.NORMAL, def: step
			});
			buildItemsOfStep(step, index);
		});
	};
	if (!isPipelineDef(def)) {
		// step def, there is a virtual node
		items.push({
			label: ((def as unknown as PipelineStepDef).name ?? '').trim() || Labels.StepNodeNoname, index: '1.',
			type: StepNodeEntityType.START, def
		});
		buildItemsOfStep(def as unknown as PipelineStepDef, '1.');
	} else {
		buildItems(def.steps ?? [], '');
	}

	// click to locate node,
	// should detect the folding status first, and unfold all ancestor nodes,
	// waiting for repaint accomplished if there is, then locate the node
	const onItemClick = (item: TocItem) => () => {
		const {type, def: step} = item;
		if (type === 'file') {
			fire(PlaygroundEventTypes.LOCATE_FILE_NODE);
			return;
		}
		const node = stateRef.current.engine.getModel().getNodes()?.find(node => node instanceof StepNodeModel && node.step === step);
		if (node != null) {
			// node maybe already rendered
			fire(PlaygroundEventTypes.DO_LOCATE_STEP_NODE, step as unknown as PipelineStepDef);
		} else {
			tryToRevealStep(def, step as unknown as PipelineStepDef);
			fire(PlaygroundEventTypes.LOCATE_STEP_NODE, step as unknown as PipelineStepDef);
		}
	};

	return <EditorToolbarTocContainer data-first-paint={firstPaint} ref={ref}>
		{items.map((item) => {
			return <EditorToolbarTocItem onClick={onItemClick(item)} key={item.index}>
				<span>{item.index}</span>
				<span>{item.label}</span>
			</EditorToolbarTocItem>;
		})}
	</EditorToolbarTocContainer>;
};
export const ToolbarTocWrapper = (props: ToolbarTocProps) => {
	const {stateRef, expanded} = props;

	if (!expanded) {
		return null;
	}

	return <ToolbarToc stateRef={stateRef}/>;
};