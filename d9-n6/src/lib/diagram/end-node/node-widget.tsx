import {DiagramEngine} from '@projectstorm/react-diagrams';
import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import React from 'react';
import styled from 'styled-components';
import {Labels} from '../../labels';
import {PlaygroundCssVars} from '../../widgets';
import {NodeBody, NodeHeader, NodeTitle, NodeWrapper, PreviousStepPortModel, PreviousStepPortWidget} from '../common';
import {EndNodeModel} from './node-model';

export interface EndNodeWidgetProps {
	// node and engine props are required
	node: EndNodeModel;
	engine: DiagramEngine;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const EndNodeContainer = styled(NodeWrapper).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-end-node',
	style: {
		'--border-radius': PlaygroundCssVars.NODE_BORDER_RADIUS,
		'--border': PlaygroundCssVars.NODE_END_BORDER,
		'--background-color': PlaygroundCssVars.NODE_BACKGROUND
	}
})``;
export const EndNodeHeader = styled(NodeHeader).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-end-node-header',
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
export const EndNodeTitle = styled(NodeTitle).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-end-node-title',
	style: {
		'--color': PlaygroundCssVars.NODE_END_TITLE_COLOR,
		'--font-size': PlaygroundCssVars.NODE_END_TITLE_FONT_SIZE,
		'--font-weight': PlaygroundCssVars.NODE_END_TITLE_FONT_WEIGHT
	}
})``;
export const EndNodeBody = styled(NodeBody).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-end-node-body',
	style: {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		'--min-height': PlaygroundCssVars.NODE_END_BODY_HEIGHT,
		'--padding': PlaygroundCssVars.NODE_END_BODY_PADDING
	}
})``;

export const EndNodeWidget = (props: EndNodeWidgetProps) => {
	const {node, engine} = props;

	return <EndNodeContainer>
		<PreviousStepPortWidget port={node.getPort(PreviousStepPortModel.NAME) as PreviousStepPortModel}
		                        engine={engine}/>
		<EndNodeHeader>
			<EndNodeTitle>{Labels.EndNodeTitle}</EndNodeTitle>
		</EndNodeHeader>
		<EndNodeBody>
		</EndNodeBody>
	</EndNodeContainer>;
};
