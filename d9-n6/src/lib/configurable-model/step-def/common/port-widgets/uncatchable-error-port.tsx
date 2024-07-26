import {GenerateModelEvent} from '@projectstorm/react-canvas-core';
import {AbstractModelFactory, LinkModel, PortModelAlignment, PortWidget} from '@projectstorm/react-diagrams';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import React from 'react';
import styled from 'styled-components';
import {LinkExtras} from '../../../../diagram';
import {PlaygroundCssVars} from '../../../../widgets';
import {ErrorHandlesLinkModel} from '../links';
import {ErrorHandlesPortModel} from './error-handles-port-model';

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

export const UncatchableErrorHandlePortContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-uncatchable-error-port'})`
    display: flex;
    position: absolute;
    top: calc(-1 * ${PlaygroundCssVars.NODE_PORT_BORDER_WIDTH});
    right: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / -2 - ${PlaygroundCssVars.NODE_BORDER_WIDTH});
    width: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    height: ${PlaygroundCssVars.NODE_PORT_HEIGHT};
    background-color: ${PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_BACKGROUND};
    border: ${PlaygroundCssVars.NODE_PORT_ERROR_HANDLES_BORDER};
    border-top-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    border-bottom-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);

    > div:first-child {
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 100%;
    }
`;

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

	return <UncatchableErrorHandlePortContainer>
		<PortWidget port={port} engine={engine}/>
	</UncatchableErrorHandlePortContainer>;
};
