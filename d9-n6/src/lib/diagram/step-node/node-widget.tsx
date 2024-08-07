import {DiagramEngine} from '@projectstorm/react-diagrams';
import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import React from 'react';
import styled from 'styled-components';
import {findStepDef, FirstSubStepPortModel, FirstSubStepPortWidget} from '../../configurable-model';
import {StepDialogContent} from '../../edit-dialog';
import {asBeautifiedUse, Labels} from '../../labels';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../../playground-event-bus';
import {PlaygroundCssVars} from '../../widgets';
import {
	NextStepPortModel,
	NextStepPortWidget,
	NodeBody,
	NodeHeader,
	NodeSecondTitle,
	NodeTitle,
	NodeTitleSpreader,
	NodeWrapper,
	PreviousStepPortModel,
	PreviousStepPortWidget
} from '../common';
import {StepNodeModel} from './node-model';

export interface StepNodeWidgetProps {
	// node and engine props are required
	node: StepNodeModel;
	engine: DiagramEngine;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const StepNodeContainer = styled(NodeWrapper).attrs(
	({'data-use': use}) => {
		return {
			[DOM_KEY_WIDGET]: 'o23-playground-step-node',
			style: {
				'--border-radius': PlaygroundCssVars.NODE_BORDER_RADIUS,
				'--border': PlaygroundCssVars[`NODE_STEP_${(use ?? '').trim().toUpperCase().replace(/-/g, '_')}_BORDER`] ?? PlaygroundCssVars.NODE_STEP_BORDER,
				'--background-color': PlaygroundCssVars.NODE_BACKGROUND
			}
		};
	})``;
export const StepNodeHeader = styled(NodeHeader).attrs<{ 'data-use'?: string }>(
	({'data-use': use}) => {
		return {
			[DOM_KEY_WIDGET]: 'o23-playground-step-node-header',
			style: {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				'--border-radius': PlaygroundCssVars.NODE_BORDER_RADIUS,
				'--background': PlaygroundCssVars[`NODE_STEP_${(use ?? '').trim().toUpperCase().replace(/-/g, '_')}_TITLE_BACKGROUND`] ?? PlaygroundCssVars.NODE_STEP_TITLE_BACKGROUND,
				'--padding': PlaygroundCssVars.NODE_TITLE_PADDING
			}
		};
	})``;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const StepNodeTitle = styled(NodeTitle).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-step-node-title',
	style: {
		'--color': PlaygroundCssVars.NODE_STEP_TITLE_COLOR,
		'--font-size': PlaygroundCssVars.NODE_STEP_TITLE_FONT_SIZE,
		'--font-weight': PlaygroundCssVars.NODE_STEP_TITLE_FONT_WEIGHT
	}
})``;
export const StepNodeSecondTitle = styled(NodeSecondTitle).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-step-node-second-title',
	style: {
		'--color': PlaygroundCssVars.NODE_START_TITLE_COLOR,
		'--font-size': PlaygroundCssVars.NODE_START_SECOND_TITLE_FONT_SIZE,
		'--font-weight': PlaygroundCssVars.NODE_START_SECOND_TITLE_FONT_WEIGHT
	}
})`
    &:before, &:after {
        display: inline-block;
        position: relative;
        margin-top: 3px;
    }

    &:before {
        content: '〔';
        margin-right: 2px;
    }

    &:after {
        content: '〕';
        margin-left: 2px;
    }
`;
export const StepNodeBody = styled(NodeBody).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-step-node-body',
	style: {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		'--min-height': PlaygroundCssVars.NODE_STEP_BODY_HEIGHT,
		'--padding': PlaygroundCssVars.NODE_STEP_BODY_PADDING
	}
})`
`;

export const StepNodeWidget = (props: StepNodeWidgetProps) => {
	const {node, engine} = props;

	const {fire} = usePlaygroundEventBus();

	const {step: def, file} = node;
	const {use} = def;
	const StepDefs = findStepDef(use);

	const onDoubleClicked = () => {
		fire(PlaygroundEventTypes.SHOW_EDIT_DIALOG, <StepDialogContent model={node}/>);
	};
	const isFirstSubStep = node.isFirstSubStep();

	return <StepNodeContainer onDoubleClick={onDoubleClicked} data-use={use}>
		{isFirstSubStep
			? <FirstSubStepPortWidget port={node.getPort(FirstSubStepPortModel.NAME) as FirstSubStepPortModel}
			                          engine={engine}/>
			: <PreviousStepPortWidget port={node.getPort(PreviousStepPortModel.NAME) as PreviousStepPortModel}
			                          engine={engine}/>}
		<StepNodeHeader data-use={use}>
			<StepNodeTitle>{(def.name ?? '').trim() || Labels.StepNodeNoname}</StepNodeTitle>
			<NodeTitleSpreader/>
			<StepNodeSecondTitle>{asBeautifiedUse(use)}</StepNodeSecondTitle>
		</StepNodeHeader>
		<StepNodeBody data-use={use}>
			{StepDefs.ports.map(({key, port: StepPort}) => {
				return <StepPort step={def} file={file} node={node} engine={engine} key={key}/>;
			})}
		</StepNodeBody>
		<NextStepPortWidget port={node.getPort(NextStepPortModel.NAME) as NextStepPortModel} engine={engine}/>
	</StepNodeContainer>;
};
