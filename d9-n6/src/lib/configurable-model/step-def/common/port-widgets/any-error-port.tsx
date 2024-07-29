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

export class AnyErrorHandlePortModel extends ErrorHandlesPortModel {
	public static readonly TYPE = 'any-error-handle-port';
	public static readonly NAME = 'any-error-handle';

	public constructor() {
		super(AnyErrorHandlePortModel.TYPE, AnyErrorHandlePortModel.NAME, PortModelAlignment.RIGHT);
	}

	protected createDefaultLinkModel(extras?: LinkExtras): LinkModel {
		return new ErrorHandlesLinkModel(this.toLinkModelOptions(extras));
	}
}

export class AnyErrorHandlePortFactory extends AbstractModelFactory<AnyErrorHandlePortModel, DiagramEngine> {
	public constructor() {
		super(AnyErrorHandlePortModel.TYPE);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public generateModel(_event: GenerateModelEvent): AnyErrorHandlePortModel {
		throw new Error('DO NOT use AnyErrorHandlePortFactory#generateModel.');
	}
}

export const AnyErrorHandlePortContainer = styled(SubNodesPortContainer).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-any-error-port',
	style: {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		'--background-color': PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_BACKGROUND,
		'--border': PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_BORDER,
		'--icon-color': PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_ICON_COLOR
	}
})``;

export interface AnyErrorHandlePortWidgetProps {
	// node and engine props are required
	port: AnyErrorHandlePortModel;
	engine: DiagramEngine;
}

/**
 * used in step node, when it has any error handle
 */
export const AnyErrorHandlePortWidget = (props: AnyErrorHandlePortWidgetProps) => {
	const {port, engine} = props;

	const model = port.getNode() as StepNodeModel;
	const {fold, switchFold} = useSubNodesFold({model, property: '$foldAny'});

	return <AnyErrorHandlePortContainer data-fold={fold} onClick={switchFold}>
		{fold ? <UnfoldSubNodes/> : <FoldSubNodes/>}
		<PortWidget port={port} engine={engine}/>
	</AnyErrorHandlePortContainer>;
};
