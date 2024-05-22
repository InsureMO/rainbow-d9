import {DiagramEngine} from '@projectstorm/react-diagrams';
import {DOM_KEY_WIDGET, UnwrappedCaption} from '@rainbow-d9/n2';
import React from 'react';
import styled from 'styled-components';
import {PlaygroundCssVars} from '../../widgets';
import {PreviousStepPortModel, PreviousStepPortWidget} from '../common';
import {EndNodeModel} from './node-model';

export interface EndNodeWidgetProps {
	// node and engine props are required
	node: EndNodeModel;
	engine: DiagramEngine;
}

export const EndNodeContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-end-node'})`
    display: flex;
    position: relative;
    flex-direction: column;
    border-radius: ${PlaygroundCssVars.NODE_BORDER_RADIUS};
    border: ${PlaygroundCssVars.NODE_END_BORDER};
    background-color: ${PlaygroundCssVars.NODE_BACKGROUND};
    min-width: ${PlaygroundCssVars.NODE_MIN_WIDTH};
    overflow: hidden;
`;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const EndNodeTitle = styled(UnwrappedCaption)`
    font-weight: ${PlaygroundCssVars.NODE_END_TITLE_FONT_WEIGHT};
    color: ${PlaygroundCssVars.NODE_END_TITLE_COLOR};
    background: ${PlaygroundCssVars.NODE_END_TITLE_BACKGROUND};
    padding: ${PlaygroundCssVars.NODE_TITLE_PADDING};
    margin-top: -2px;
`;
export const EndNodeBody = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-end-node-body'})`
    display: grid;
    position: relative;
    grid-template-columns: auto 1fr auto;
    min-height: ${PlaygroundCssVars.NODE_END_BODY_HEIGHT};
    padding: ${PlaygroundCssVars.NODE_END_BODY_PADDING};
`;

export const EndNodeWidget = (props: EndNodeWidgetProps) => {
	const {node, engine} = props;

	return <EndNodeContainer>
		<EndNodeTitle>End</EndNodeTitle>
		<EndNodeBody>
			<PreviousStepPortWidget port={node.getPort(PreviousStepPortModel.NAME) as PreviousStepPortModel}
			                        engine={engine}/>
		</EndNodeBody>
	</EndNodeContainer>;
};
