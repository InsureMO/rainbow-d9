import {GenerateModelEvent} from '@projectstorm/react-canvas-core';
import {AbstractModelFactory, PortModelAlignment, PortWidget} from '@projectstorm/react-diagrams';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import React from 'react';
import styled from 'styled-components';
import {PlaygroundCssVars} from '../../../../widgets';
import {ErrorHandlesPortModel} from './error-handles-port-model';

export class ExposedErrorHandlePortModel extends ErrorHandlesPortModel {
	public static readonly TYPE = 'exposed-error-handle-port';
	public static readonly NAME = 'exposed-error-handle';

	public constructor() {
		super(ExposedErrorHandlePortModel.TYPE, ExposedErrorHandlePortModel.NAME, PortModelAlignment.RIGHT);
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

export const ExposedErrorHandlePortContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-exposed-error-port'})`
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

	return <ExposedErrorHandlePortContainer>
		<PortWidget port={port} engine={engine}/>
	</ExposedErrorHandlePortContainer>;
};
