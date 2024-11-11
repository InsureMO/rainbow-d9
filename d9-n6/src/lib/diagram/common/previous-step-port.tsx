import {GenerateModelEvent} from '@projectstorm/react-canvas-core';
import {AbstractModelFactory, PortModelAlignment, PortWidget} from '@projectstorm/react-diagrams';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {DOM_KEY_WIDGET, SDP} from '@rainbow-d9/n2';
import React from 'react';
import styled from 'styled-components';
import {PlaygroundCssVars} from '../../widgets';
import {IncomingPortModel} from './incoming-port-model';

export class PreviousStepPortModel extends IncomingPortModel {
	public static readonly TYPE = 'previous-step-port';
	public static readonly NAME = 'previous-step';

	public constructor() {
		super(PreviousStepPortModel.TYPE, PreviousStepPortModel.NAME, PortModelAlignment.TOP);
	}
}

export class PreviousStepPortFactory extends AbstractModelFactory<PreviousStepPortModel, DiagramEngine> {
	public constructor() {
		super(PreviousStepPortModel.TYPE);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public generateModel(_event: GenerateModelEvent): PreviousStepPortModel {
		throw new Error('DO NOT use PreviousStepPortFactory#generateModel.');
	}
}

export const PreviousStepPortContainer = styled.div.attrs<SDP>({[DOM_KEY_WIDGET]: 'o23-playground-previous-step-port'})`
    display: flex;
    position: absolute;
    left: calc(50% - ${PlaygroundCssVars.NODE_PORT_RADIUS});
    top: calc(-1 * ${PlaygroundCssVars.NODE_PORT_RADIUS});
    width: calc(${PlaygroundCssVars.NODE_PORT_RADIUS} * 2);
    height: ${PlaygroundCssVars.NODE_PORT_RADIUS};
    background-color: ${PlaygroundCssVars.NODE_PREVIOUS_STEP_PORT_BACKGROUND_COLOR};
    border: ${PlaygroundCssVars.NODE_PREVIOUS_STEP_PORT_BORDER};
    border-top-left-radius: ${PlaygroundCssVars.NODE_PORT_RADIUS};
    border-top-right-radius: ${PlaygroundCssVars.NODE_PORT_RADIUS};

    > div:first-child {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 0;
    }
`;

export interface PreviousStepPortWidgetProps {
	// node and engine props are required
	port: PreviousStepPortModel;
	engine: DiagramEngine;
}

export const PreviousStepPortWidget = (props: PreviousStepPortWidgetProps) => {
	const {port, engine} = props;

	return <PreviousStepPortContainer>
		<PortWidget port={port} engine={engine}/>
	</PreviousStepPortContainer>;
};
