import {GenerateModelEvent} from '@projectstorm/react-canvas-core';
import {AbstractModelFactory, LinkModel, PortModelAlignment, PortWidget} from '@projectstorm/react-diagrams';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import React from 'react';
import styled from 'styled-components';
import {LinkExtras, StepNodeModel} from '../../../../diagram';
import {FoldSubNodes, UnfoldSubNodes} from '../../../../icons';
import {PlaygroundCssVars} from '../../../../widgets';
import {ErrorHandlesLinkModel} from '../links';
import {ErrorHandlesPortModel} from './error-handles-port-model';
import {useSubNodesFold} from './use-sub-nodes-fold';
import {SubNodesPortContainer} from './widgets';

export class ExposedErrorHandlePortModel extends ErrorHandlesPortModel {
	public static readonly TYPE = 'exposed-error-handle-port';
	public static readonly NAME = 'exposed-error-handle';

	public constructor() {
		super(ExposedErrorHandlePortModel.TYPE, ExposedErrorHandlePortModel.NAME, PortModelAlignment.RIGHT);
	}

	protected createDefaultLinkModel(extras?: LinkExtras): LinkModel {
		return new ErrorHandlesLinkModel(this.toLinkModelOptions(extras));
	}
}

export class ExposedErrorHandlePortFactory extends AbstractModelFactory<ExposedErrorHandlePortModel, DiagramEngine> {
	public constructor() {
		super(ExposedErrorHandlePortModel.TYPE);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public generateModel(_event: GenerateModelEvent): ExposedErrorHandlePortModel {
		throw new Error('DO NOT use ExposedErrorHandlePortFactory#generateModel.');
	}
}

export const ExposedErrorHandlePortContainer = styled(SubNodesPortContainer).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-exposed-error-port',
	style: {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		'--background-color': PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_BACKGROUND,
		'--border': PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_BORDER,
		'--icon-color': PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_ICON_COLOR
	}
})``;

export interface ExposedErrorHandlePortWidgetProps {
	// node and engine props are required
	port: ExposedErrorHandlePortModel;
	engine: DiagramEngine;
}

/**
 * used in step node, when it has exposed error handle
 */
export const ExposedErrorHandlePortWidget = (props: ExposedErrorHandlePortWidgetProps) => {
	const {port, engine} = props;

	const model = port.getNode() as StepNodeModel;
	const {fold, switchFold} = useSubNodesFold({model, property: '$foldExposed'});

	return <ExposedErrorHandlePortContainer data-fold={fold} onClick={switchFold}>
		{fold ? <UnfoldSubNodes/> : <FoldSubNodes/>}
		<PortWidget port={port} engine={engine}/>
	</ExposedErrorHandlePortContainer>;
};
