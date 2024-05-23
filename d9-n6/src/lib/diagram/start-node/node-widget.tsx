import {DiagramEngine} from '@projectstorm/react-diagrams';
import {VUtils} from '@rainbow-d9/n1';
import {DOM_KEY_WIDGET, IntlLabel} from '@rainbow-d9/n2';
import React from 'react';
import styled from 'styled-components';
import {isPipelineDef} from '../../definition';
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
import {RestApiVariablePortWidget} from './rest-api-variable-port';

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
})`
    &[data-role=route] {
        text-decoration: ${PlaygroundCssVars.NODE_START_SECOND_TITLE_DECORATION};
    }
`;
export const StartNodeSecondTitle = styled(NodeSecondTitle).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-start-node-title',
	style: {
		'--color': PlaygroundCssVars.NODE_START_TITLE_COLOR,
		'--font-weight': PlaygroundCssVars.NODE_START_TITLE_FONT_WEIGHT,
		'--text-decoration': PlaygroundCssVars.NODE_START_SECOND_TITLE_DECORATION
	}
})`
    &[data-role=method] {
        text-decoration: unset;
        text-transform: uppercase;
    }
`;
export const StartNodeBody = styled(NodeBody).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-start-node-body',
	style: {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		'--min-height': PlaygroundCssVars.NODE_START_BODY_HEIGHT,
		'--padding': PlaygroundCssVars.NODE_START_BODY_PADDING
	}
})``;

export const StartNodeWidget = (props: StartNodeWidgetProps) => {
	const {node, engine} = props;

	const def = node.def;

	const firstTitleRole = () => {
		if (isPipelineDef(def) && VUtils.isNotBlank(def.route)) {
			return 'route';
		}
		return (void 0);
	};
	const firstTitle = () => {
		if (isPipelineDef(def) && VUtils.isNotBlank(def.route)) {
			return def.route;
		}
		return <IntlLabel keys={['o23', 'node', 'start']} value="Start"/>;
	};
	const secondTitleRole = () => {
		if (isPipelineDef(def) && VUtils.isNotBlank(def.route)) {
			return 'method';
		}
		return (void 0);
	};
	const secondTitle = () => {
		if (isPipelineDef(def)) {
			if (VUtils.isNotBlank(def.route)) {
				return `[${def.method || 'post'}]`;
			} else {
				return <IntlLabel keys={['o23', 'pipeline', 'type', def.type]} value="Rest API"/>;
			}
		}
		return <IntlLabel keys={['o23', 'pipeline', 'type', def.type]} value={def.type.replace('-', '')}/>;
	};

	return <StartNodeContainer>
		<StartNodeHeader>
			<StartNodeTitle data-role={firstTitleRole()}>
				{firstTitle()}
			</StartNodeTitle>
			<StartNodeSecondTitle data-role={secondTitleRole()}>
				{secondTitle()}
			</StartNodeSecondTitle>
		</StartNodeHeader>
		<StartNodeBody>
			{isPipelineDef(def)
				? <>
					{VUtils.isNotBlank(def.route) ? null :
						<RestApiVariablePortWidget label={(def.method || 'post').toUpperCase()}/>}
					<RestApiVariablePortWidget label="Headers"/>
					<RestApiVariablePortWidget label="Path Parameters"/>
					<RestApiVariablePortWidget label="Query Parameters"/>
					<RestApiVariablePortWidget label="Expose Headers"/>
					<RestApiVariablePortWidget label="Expose File"/>
				</>
				: null}
			<NextStepPortWidget port={node.getPort(NextStepPortModel.NAME) as NextStepPortModel} engine={engine}/>
		</StartNodeBody>
	</StartNodeContainer>;
};
