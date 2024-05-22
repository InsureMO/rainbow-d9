import {DiagramEngine} from '@projectstorm/react-diagrams';
import {DOM_KEY_WIDGET, IntlLabel} from '@rainbow-d9/n2';
import React, {useState} from 'react';
import styled from 'styled-components';
import {PlaygroundCssVars} from '../../widgets';
import {
	NextStepPortModel,
	NextStepPortWidget,
	NodeBody,
	NodeHeader,
	NodeSecondTitle,
	NodeTitle,
	NodeWrapper
} from '../common';
import {StartNodeModel} from './node-model';

export interface StartNodeWidgetProps {
	// node and engine props are required
	node: StartNodeModel;
	engine: DiagramEngine;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const StartNodeContainer = styled(NodeWrapper).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-start-node',
	style: {
		'--border-radius': PlaygroundCssVars.NODE_BORDER_RADIUS,
		'--border': PlaygroundCssVars.NODE_START_BORDER,
		'--background-color': PlaygroundCssVars.NODE_BACKGROUND
	}
})``;
export const StartNodeHeader = styled(NodeHeader).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-start-node-header',
	style: {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		'--border-radius': PlaygroundCssVars.NODE_BORDER_RADIUS,
		'--background': PlaygroundCssVars.NODE_START_TITLE_BACKGROUND,
		'--padding': PlaygroundCssVars.NODE_TITLE_PADDING
	}
})``;
export const StartNodeTitle = styled(NodeTitle).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-start-node-title',
	style: {
		'--color': PlaygroundCssVars.NODE_START_TITLE_COLOR,
		'--font-weight': PlaygroundCssVars.NODE_START_TITLE_FONT_WEIGHT
	}
})``;
export const StartNodeTypeLabel = styled(NodeSecondTitle).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-start-node-title',
	style: {
		'--color': PlaygroundCssVars.NODE_START_TITLE_COLOR,
		'--font-weight': PlaygroundCssVars.NODE_START_TITLE_FONT_WEIGHT,
		'--text-decoration': 'double'
	}
})``;
export const StartNodeBody = styled(NodeBody).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-start-node-body',
	style: {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		'--min-height': PlaygroundCssVars.NODE_START_BODY_HEIGHT,
		'--padding': PlaygroundCssVars.NODE_START_BODY_PADDING
	}
})``;

export enum StartNodeType {
	REST_API = 'rest-api', STANDARD = 'standard'
}

export interface StandNodeTypeOption {
	keys: Array<string>;
	value: string;
}

export const StartNodeTypeOptions: Record<StartNodeType, StandNodeTypeOption> = {
	[StartNodeType.REST_API]: {keys: ['o23', 'node', 'start', 'type', StartNodeType.REST_API], value: '[Rest API]'},
	[StartNodeType.STANDARD]: {keys: ['o23', 'node', 'start', 'type', StartNodeType.STANDARD], value: '[Standard]'}
};

export interface StartNodeState {
	type: StartNodeType;
}

export const StartNodeWidget = (props: StartNodeWidgetProps) => {
	const {node, engine} = props;

	const [state] = useState<StartNodeState>(() => {
		return {
			type: StartNodeType.REST_API
		};
	});

	return <StartNodeContainer>
		<StartNodeHeader>
			<StartNodeTitle>
				<IntlLabel keys={['o23', 'node', 'start']} value="Start"/>
			</StartNodeTitle>
			<StartNodeTypeLabel>
				<IntlLabel keys={StartNodeTypeOptions[state.type].keys} value={StartNodeTypeOptions[state.type].value}/>
			</StartNodeTypeLabel>
		</StartNodeHeader>
		<StartNodeBody>
			<NextStepPortWidget port={node.getPort(NextStepPortModel.NAME) as NextStepPortModel} engine={engine}/>
		</StartNodeBody>
	</StartNodeContainer>;
};
