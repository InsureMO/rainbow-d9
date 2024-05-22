import {DiagramEngine} from '@projectstorm/react-diagrams';
import {DOM_KEY_WIDGET, IntlLabel, UnwrappedCaption} from '@rainbow-d9/n2';
import React, {useState} from 'react';
import styled from 'styled-components';
import {PlaygroundCssVars} from '../../widgets';
import {NextStepPortModel, NextStepPortWidget} from '../common';
import {StartNodeModel} from './node-model';

export interface StartNodeWidgetProps {
	// node and engine props are required
	node: StartNodeModel;
	engine: DiagramEngine;
}

export const StartNodeContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-start-node'})`
    display: flex;
    position: relative;
    flex-direction: column;
    border-radius: ${PlaygroundCssVars.NODE_BORDER_RADIUS};
    border: ${PlaygroundCssVars.NODE_START_BORDER};
    background-color: ${PlaygroundCssVars.NODE_BACKGROUND};
    min-width: ${PlaygroundCssVars.NODE_MIN_WIDTH};
    overflow: hidden;
`;
export const StartNodeHeader = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-start-node-header'})`
    display: flex;
    position: relative;
    background: ${PlaygroundCssVars.NODE_START_TITLE_BACKGROUND};
    padding: ${PlaygroundCssVars.NODE_TITLE_PADDING};
    margin-top: -2px;
`;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const StartNodeTitle = styled(UnwrappedCaption)`
    flex-grow: 1;
    color: ${PlaygroundCssVars.NODE_START_TITLE_COLOR};
    font-weight: ${PlaygroundCssVars.NODE_START_TITLE_FONT_WEIGHT};
`;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const StartNodeTypeLabel = styled(UnwrappedCaption)`
    color: ${PlaygroundCssVars.NODE_START_TITLE_COLOR};
    font-weight: ${PlaygroundCssVars.NODE_START_TITLE_FONT_WEIGHT};
    justify-content: flex-end;
    text-decoration: double;
`;
export const StartNodeBody = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-start-node-body'})`
    display: grid;
    position: relative;
    grid-column: 1 / span 2;
    grid-row: 2;
    grid-template-columns: auto 1fr auto;
    min-height: ${PlaygroundCssVars.NODE_START_BODY_HEIGHT};
    padding: ${PlaygroundCssVars.NODE_START_BODY_PADDING};
`;

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
