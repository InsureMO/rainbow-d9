import {GenerateModelEvent} from '@projectstorm/react-canvas-core';
import {AbstractModelFactory, PortWidget} from '@projectstorm/react-diagrams';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import React from 'react';
import styled from 'styled-components';
import {PlaygroundCssVars} from '../../../../widgets';
import {ErrorHandlesPortModel} from './error-handles-port-model';

export class AnyErrorHandlePortModel extends ErrorHandlesPortModel {
	public static readonly TYPE = 'any-error-handle-port';
	public static readonly NAME = 'any-error-handle';

	public constructor() {
		super(AnyErrorHandlePortModel.TYPE, AnyErrorHandlePortModel.NAME);
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

export const AnyErrorHandlePortContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-any-error-port'})`
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

	return <AnyErrorHandlePortContainer>
		<PortWidget port={port} engine={engine}/>
	</AnyErrorHandlePortContainer>;
};
