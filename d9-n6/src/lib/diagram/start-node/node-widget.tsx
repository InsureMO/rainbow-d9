import {DiagramEngine} from '@projectstorm/react-diagrams';
import {Undefinable, VUtils} from '@rainbow-d9/n1';
import {DOM_KEY_WIDGET, IntlLabel} from '@rainbow-d9/n2';
import React from 'react';
import styled from 'styled-components';
import {isPipelineDef, PipelineFileDef} from '../../definition';
import {DialogContent} from '../../edit-dialog';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../../playground-event-bus';
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
		'--font-size': PlaygroundCssVars.NODE_START_TITLE_FONT_SIZE,
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
		'--font-size': PlaygroundCssVars.NODE_START_SECOND_TITLE_FONT_SIZE,
		'--font-weight': PlaygroundCssVars.NODE_START_SECOND_TITLE_FONT_WEIGHT,
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
		isApi,
		firstTitle, firstTitleRole, showRouteLack,
		secondTitle, secondTitleRole, showMethodLack
	} = (() => {
		if (isPipelineDef(def)) {
			if (VUtils.isNotBlank(def.route)) {
				// route defined
				if (VUtils.isNotBlank(def.method)) {
					// method defined
					return {
						isApi: true,
						firstTitle: def.route, firstTitleRole: 'route', showRouteLack: false,
						secondTitle: `[${def.method.trim()}]`, secondTitleRole: 'method', showMethodLack: false
					};
				} else {
					// method not defined
					return {
						isApi: true,
						firstTitle: def.route, firstTitleRole: 'route', showRouteLack: false,
						secondTitle: (void 0), secondTitleRole: (void 0), showMethodLack: true
					};
				}
			} else {
				if (VUtils.isNotBlank(def.method)) {
					// method defined
					return {
						isApi: true,
						firstTitle: <IntlLabel keys={['o23', 'node', 'start', 'rest']} value="Rest API"/>,
						firstTitleRole: (void 0), showRouteLack: true,
						secondTitle: `[${def.method.trim()}]`, secondTitleRole: 'method', showMethodLack: false
					};
				} else {
					// method not defined
					return {
						isApi: true,
						firstTitle: <IntlLabel keys={['o23', 'node', 'start', 'rest']} value="Rest API"/>,
						firstTitleRole: (void 0), showRouteLack: true,
						secondTitle: (void 0), secondTitleRole: (void 0), showMethodLack: true
					};
				}
			}
		} else {
			return {
				isApi: false,
				firstTitle: <IntlLabel keys={['o23', 'node', 'start', 'standard']} value="Start"/>,
				firstTitleRole: (void 0),
				showRouteLack: false,
				secondTitle: <IntlLabel keys={['o23', 'pipeline', 'type', def.type]}
				                        value={def.type.replace('-', '')}/>,
				secondTitleRole: (void 0),
				showMethodLack: false
			};
		}
	})();

	const onConfirm = () => {
		// TODO
	};
	const onDoubleClicked = () => {
		fire(PlaygroundEventTypes.SHOW_EDIT_DIALOG, <DialogContent confirm={onConfirm}/>);
	};

	return <StartNodeContainer onDoubleClick={onDoubleClicked}>
		<StartNodeHeader>
			<StartNodeTitle data-role={firstTitleRole}>
				{firstTitle}
			</StartNodeTitle>
			<StartNodeSecondTitle data-role={secondTitleRole}>
				{secondTitle}
			</StartNodeSecondTitle>
		</StartNodeHeader>
		<StartNodeBody>
			{isApi
				? <>
					{showRouteLack ? <RestApiVariablePortWidget label="Route" required={true} defined={false}/> : null}
					{showMethodLack
						? <RestApiVariablePortWidget label="Method" required={true} defined={false}/>
						: null}
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
