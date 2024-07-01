import {GenerateModelEvent} from '@projectstorm/react-canvas-core';
import {AbstractModelFactory, PortModelAlignment, PortWidget} from '@projectstorm/react-diagrams';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import React from 'react';
import styled from 'styled-components';
import {PlaygroundCssVars} from '../../../../widgets';
import {ErrorHandlesPortModel} from './error-handles-port-model';

export class CatchableErrorHandlePortModel extends ErrorHandlesPortModel {
	public static readonly TYPE = 'catchable-error-handle-port';
	public static readonly NAME = 'catchable-error-handle';

	public constructor() {
		super(CatchableErrorHandlePortModel.TYPE, CatchableErrorHandlePortModel.NAME, PortModelAlignment.RIGHT);
	}
}

export class CatchableErrorHandlePortFactory extends AbstractModelFactory<CatchableErrorHandlePortModel, DiagramEngine> {
	public constructor() {
		super(CatchableErrorHandlePortModel.TYPE);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public generateModel(_event: GenerateModelEvent): CatchableErrorHandlePortModel {
		throw new Error('DO NOT use CatchableErrorHandlePortFactory#generateModel.');
	}
}

export const CatchableErrorHandlePortContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-catchable-error-port'})`
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

export interface CatchableErrorHandlePortWidgetProps {
	// node and engine props are required
	port: CatchableErrorHandlePortModel;
	engine: DiagramEngine;
}

/**
 * used in step node, when it has catchable error handle
 */
export const CatchableErrorHandlePortWidget = (props: CatchableErrorHandlePortWidgetProps) => {
	const {port, engine} = props;

	return <CatchableErrorHandlePortContainer>
		<PortWidget port={port} engine={engine}/>
	</CatchableErrorHandlePortContainer>;
};
