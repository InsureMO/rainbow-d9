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

export class UncatchableErrorHandlePortModel extends ErrorHandlesPortModel {
	public static readonly TYPE = 'uncatchable-error-handle-port';
	public static readonly NAME = 'uncatchable-error-handle';

	public constructor() {
		super(UncatchableErrorHandlePortModel.TYPE, UncatchableErrorHandlePortModel.NAME, PortModelAlignment.RIGHT);
	}

	protected createDefaultLinkModel(extras?: LinkExtras): LinkModel {
		return new ErrorHandlesLinkModel(this.toLinkModelOptions(extras));
	}
}

export class UncatchableErrorHandlePortFactory extends AbstractModelFactory<UncatchableErrorHandlePortModel, DiagramEngine> {
	public constructor() {
		super(UncatchableErrorHandlePortModel.TYPE);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public generateModel(_event: GenerateModelEvent): UncatchableErrorHandlePortModel {
		throw new Error('DO NOT use UncatchableErrorHandlePortFactory#generateModel.');
	}
}

export const UncatchableErrorHandlePortContainer = styled(SubNodesPortContainer).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-uncatchable-error-port',
	style: {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		'--background-color': PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_BACKGROUND,
		'--border': PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_BORDER,
		'--icon-color': PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_ICON_COLOR
	}
})``;

export interface UncatchableErrorHandlePortWidgetProps {
	// node and engine props are required
	port: UncatchableErrorHandlePortModel;
	engine: DiagramEngine;
}

/**
 * used in step node, when it has uncatchable error handle
 */
export const UncatchableErrorHandlePortWidget = (props: UncatchableErrorHandlePortWidgetProps) => {
	const {port, engine} = props;

	const model = port.getNode() as StepNodeModel;
	const {fold, switchFold} = useSubNodesFold({model, property: '$foldUncatchable'});

	return <UncatchableErrorHandlePortContainer data-fold={fold} onClick={switchFold}>
		{fold ? <UnfoldSubNodes/> : <FoldSubNodes/>}
		<PortWidget port={port} engine={engine}/>
	</UncatchableErrorHandlePortContainer>;
};
