import {DiagramEngine} from '@projectstorm/react-diagrams';
import {DOM_KEY_WIDGET, UnwrappedCaption} from '@rainbow-d9/n2';
import React from 'react';
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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const StartNodeTitle = styled(UnwrappedCaption)`
    font-weight: ${PlaygroundCssVars.NODE_START_TITLE_FONT_WEIGHT};
    color: ${PlaygroundCssVars.NODE_START_TITLE_COLOR};
    background: ${PlaygroundCssVars.NODE_START_TITLE_BACKGROUND};
    padding: ${PlaygroundCssVars.NODE_TITLE_PADDING};
    margin-top: -2px;
`;
export const StartNodeBody = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-start-node-body'})`
    display: grid;
    position: relative;
    grid-template-columns: auto 1fr auto;
    min-height: ${PlaygroundCssVars.NODE_START_BODY_HEIGHT};
    padding: ${PlaygroundCssVars.NODE_START_BODY_PADDING};
`;

export const StartNodeWidget = (props: StartNodeWidgetProps) => {
	const {node, engine} = props;

	return <StartNodeContainer>
		<StartNodeTitle>Start</StartNodeTitle>
		<StartNodeBody>
			<NextStepPortWidget port={node.getPort(NextStepPortModel.NAME) as NextStepPortModel} engine={engine}/>
		</StartNodeBody>
	</StartNodeContainer>;
};
