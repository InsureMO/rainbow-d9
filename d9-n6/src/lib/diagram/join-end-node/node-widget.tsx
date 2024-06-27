import {DiagramEngine} from '@projectstorm/react-diagrams';
import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import React from 'react';
import styled from 'styled-components';
import {LastSubStepJoinPortModel, LastSubStepJoinPortWidget} from '../../configurable-model';
import {Labels} from '../../labels';
import {PlaygroundCssVars} from '../../widgets';
import {
	NextStepPortModel,
	NextStepPortWidget,
	NodeHeader,
	NodeTitle,
	NodeWrapper,
	PreviousStepPortModel,
	PreviousStepPortWidget
} from '../common';
import {StepNodeSecondTitle} from '../step-node';
import {JoinEndNodeModel} from './node-model';

export interface JoinEndNodeWidgetProps {
	// node and engine props are required
	node: JoinEndNodeModel;
	engine: DiagramEngine;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const JoinEndNodeContainer = styled(NodeWrapper).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-join-end-node',
	style: {
		'--border-radius': PlaygroundCssVars.NODE_BORDER_RADIUS,
		'--border': PlaygroundCssVars.NODE_END_BORDER,
		'--background-color': PlaygroundCssVars.NODE_BACKGROUND
	}
})``;
export const JoinEndNodeHeader = styled(NodeHeader).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-join-end-node-header',
	style: {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		'--border-radius': PlaygroundCssVars.NODE_BORDER_RADIUS,
		'--background': PlaygroundCssVars.NODE_END_TITLE_BACKGROUND,
		'--padding': PlaygroundCssVars.NODE_TITLE_PADDING
	}
})``;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const JoinEndNodeTitle = styled(NodeTitle).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-join-end-node-title',
	style: {
		'--color': PlaygroundCssVars.NODE_END_TITLE_COLOR,
		'--font-size': PlaygroundCssVars.NODE_END_TITLE_FONT_SIZE,
		'--font-weight': PlaygroundCssVars.NODE_END_TITLE_FONT_WEIGHT
	}
})``;

export const JoinEndNodeWidget = (props: JoinEndNodeWidgetProps) => {
	const {node, engine} = props;

	const {step: def} = node;

	return <JoinEndNodeContainer>
		<PreviousStepPortWidget port={node.getPort(PreviousStepPortModel.NAME) as PreviousStepPortModel}
		                        engine={engine}/>
		<LastSubStepJoinPortWidget port={node.getPort(LastSubStepJoinPortModel.NAME) as LastSubStepJoinPortModel}
		                           engine={engine}/>
		<JoinEndNodeHeader>
			<JoinEndNodeTitle>{Labels.JoinEndNodeTitle}</JoinEndNodeTitle>
			<StepNodeSecondTitle>{(def.name ?? '').trim() || Labels.StepNodeNoname}</StepNodeSecondTitle>
		</JoinEndNodeHeader>
		<NextStepPortWidget port={node.getPort(NextStepPortModel.NAME) as NextStepPortModel} engine={engine}/>
	</JoinEndNodeContainer>;
};
