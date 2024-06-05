import {DiagramEngine} from '@projectstorm/react-diagrams';
import {Undefinable, VUtils} from '@rainbow-d9/n1';
import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import React from 'react';
import styled from 'styled-components';
import {FileDefs} from '../../configurable-model';
import {isPipelineDef, PipelineFileDef} from '../../definition';
import {DialogContent} from '../../edit-dialog';
import {HelpDocs} from '../../help-docs';
import {Labels} from '../../labels';
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
		'--font-size': PlaygroundCssVars.NODE_START_TITLE_FONT_SIZE,
		'--font-weight': PlaygroundCssVars.NODE_START_TITLE_FONT_WEIGHT
	}
})``;
export const StartNodeSecondTitle = styled(NodeSecondTitle).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-start-node-second-title',
	style: {
		'--color': PlaygroundCssVars.NODE_START_TITLE_COLOR,
		'--font-size': PlaygroundCssVars.NODE_START_SECOND_TITLE_FONT_SIZE,
		'--font-weight': PlaygroundCssVars.NODE_START_SECOND_TITLE_FONT_WEIGHT
	}
})`
    text-transform: capitalize;

    &[data-role=route] {
        text-transform: unset;
    }

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
export const StartNodeBody = styled(NodeBody).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-start-node-body',
	style: {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		'--min-height': PlaygroundCssVars.NODE_START_BODY_HEIGHT,
		'--padding': PlaygroundCssVars.NODE_START_BODY_PADDING
	}
})``;

export const RestApiMethodPortWidget = (props: { def: PipelineFileDef }) => {
	const {def} = props;

	const {method} = def;
	const all: Undefinable<boolean> = VUtils.isNotBlank(method);

	return <RestApiVariablePortWidget label="Method" required={true}
	                                  defined={all === true} all={all}
	                                  allAsBoolean={false} allAsGiven={`${method ?? ''}`.toUpperCase().trim()}/>;
};

export const RestApiHeadersPortWidget = (props: { def: PipelineFileDef }) => {
	const {def} = props;

	const {headers} = def;
	let count: Undefinable<number> = (void 0);
	let all: Undefinable<boolean> = (void 0);
	if (headers === true) {
		all = true;
	} else if (Array.isArray(headers)) {
		const length = headers.filter(header => VUtils.isNotBlank(header)).length;
		if (length !== 0) {
			count = length;
		}
	}

	return <RestApiVariablePortWidget label="Headers" required={false}
	                                  defined={count != null || all != null} count={count} all={all}/>;
};

export const RestApiPathParamsPortWidget = (props: { def: PipelineFileDef }) => {
	const {def} = props;

	const {pathParams} = def;
	let count: Undefinable<number> = (void 0);
	let all: Undefinable<boolean> = (void 0);
	if (pathParams === true) {
		all = true;
	} else if (Array.isArray(pathParams)) {
		const length = pathParams.filter(param => VUtils.isNotBlank(param)).length;
		if (length !== 0) {
			count = length;
		}
	}

	return <RestApiVariablePortWidget label="Path Parameters" required={false}
	                                  defined={count != null || all != null} count={count} all={all}/>;
};

export const RestApiQueryParamsPortWidget = (props: { def: PipelineFileDef }) => {
	const {def} = props;

	const {queryParams} = def;
	let count: Undefinable<number> = (void 0);
	let all: Undefinable<boolean> = (void 0);
	if (queryParams === true) {
		all = true;
	} else if (Array.isArray(queryParams)) {
		const length = queryParams.filter(param => VUtils.isNotBlank(param)).length;
		if (length !== 0) {
			count = length;
		}
	}

	return <RestApiVariablePortWidget label="Query Parameters" required={false}
	                                  defined={count != null || all != null} count={count} all={all}/>;
};

export const RestApiBodyPortWidget = (props: { def: PipelineFileDef }) => {
	const {def} = props;

	const {body} = def;

	return <RestApiVariablePortWidget label="Body" required={false} defined={body != null}
	                                  all={body} allAsBoolean={true}/>;
};

export const RestApiFilesPortWidget = (props: { def: PipelineFileDef }) => {
	const {def} = props;

	const {files} = def;
	let all: Undefinable<boolean> = (void 0);
	if (files != null && files !== false) {
		all = true;
	}

	return <RestApiVariablePortWidget label="Files" required={false} defined={all != null}
	                                  all={all} allAsBoolean={true}/>;
};

export const RestApiExposeHeadersPortWidget = (props: { def: PipelineFileDef }) => {
	const {def} = props;

	const {exposeHeaders} = def;
	let count: Undefinable<number> = Object.keys(exposeHeaders ?? {}).length;
	if (count === 0) {
		count = (void 0);
	}

	return <RestApiVariablePortWidget label="Expose Headers" required={false} defined={count != null} count={count}/>;
};

export const RestApiExposeFilePortWidget = (props: { def: PipelineFileDef }) => {
	const {def} = props;

	const {exposeFile} = def;

	return <RestApiVariablePortWidget label="Expose File" required={false} defined={exposeFile != null}
	                                  all={exposeFile} allAsBoolean={true}/>;
};

export const StartNodeWidget = (props: StartNodeWidgetProps) => {
	const {node, engine} = props;

	const {fire} = usePlaygroundEventBus();

	const def = node.def;

	const {
		isApi, showRouteLack, secondTitle, secondTitleRole
	} = (() => {
		if (isPipelineDef(def)) {
			if (VUtils.isNotBlank(def.route)) {
				// route defined, exposed as rest api
				return {
					isApi: true, showRouteLack: false, secondTitle: def.route.trim(), secondTitleRole: 'route'
				};
			} else {
				// route not defined, standard pipeline
				return {
					isApi: false, showRouteLack: false,
					secondTitle: Labels.TypeOfStandardPipeline,
					secondTitleRole: (void 0)
				};
			}
		} else {
			// not a pipeline, should be a step or a step sets
			return {
				isApi: false, showRouteLack: false,
				secondTitle: Labels.TypeOfStepOrSets(def.type),
				secondTitleRole: (void 0)
			};
		}
	})();

	const onConfirm = () => {
		// TODO
	};
	const prepareModel = () => FileDefs.prepareModel(def);
	const onDoubleClicked = () => {
		fire(PlaygroundEventTypes.SHOW_EDIT_DIALOG,
			<DialogContent helpDoc={HelpDocs.pipeline} confirm={onConfirm} prepare={prepareModel}
			               elements={FileDefs.elements}/>);
	};

	return <StartNodeContainer onDoubleClick={onDoubleClicked}>
		<StartNodeHeader>
			<StartNodeTitle>
				{VUtils.isNotBlank(def.code)
					? def.code.trim()
					: Labels.NoCodeDefinedInFileDef}
			</StartNodeTitle>
			<NodeTitleSpreader/>
			<StartNodeSecondTitle data-role={secondTitleRole}>
				{secondTitle}
			</StartNodeSecondTitle>
		</StartNodeHeader>
		<StartNodeBody>
			{isApi
				? <>
					{showRouteLack ? <RestApiVariablePortWidget label="Route" required={true} defined={false}/> : null}
					<RestApiMethodPortWidget def={def as PipelineFileDef}/>
					<RestApiHeadersPortWidget def={def as PipelineFileDef}/>
					<RestApiPathParamsPortWidget def={def as PipelineFileDef}/>
					<RestApiQueryParamsPortWidget def={def as PipelineFileDef}/>
					<RestApiBodyPortWidget def={def as PipelineFileDef}/>
					<RestApiFilesPortWidget def={def as PipelineFileDef}/>
					<RestApiExposeHeadersPortWidget def={def as PipelineFileDef}/>
					<RestApiExposeFilePortWidget def={def as PipelineFileDef}/>
				</>
				: null}
			<NextStepPortWidget port={node.getPort(NextStepPortModel.NAME) as NextStepPortModel} engine={engine}/>
		</StartNodeBody>
	</StartNodeContainer>;
};
