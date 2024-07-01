import {GenerateModelEvent} from '@projectstorm/react-canvas-core';
import {AbstractModelFactory, LinkModel, PortModelAlignment, PortWidget} from '@projectstorm/react-diagrams';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import React from 'react';
import styled from 'styled-components';
import {OutgoingPortModel} from '../../../../diagram';
import {PlaygroundCssVars} from '../../../../widgets';
import {StepsLinkModel} from '../links';

export class StepsPortModel extends OutgoingPortModel {
	public static readonly TYPE = 'steps-port';

	public constructor(name: string) {
		super(StepsPortModel.TYPE, name, PortModelAlignment.RIGHT);
	}

	protected createDefaultLinkModel(): LinkModel {
		return new StepsLinkModel();
	}
}

export class StepsPortFactory extends AbstractModelFactory<StepsPortModel, DiagramEngine> {
	public constructor() {
		super(StepsPortModel.TYPE);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public generateModel(_event: GenerateModelEvent): StepsPortModel {
		throw new Error('DO NOT use StepsPortFactory#generateModel.');
	}
}

export const StepsPortContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-steps-port'})`
    display: flex;
    position: absolute;
    top: calc(-1 * ${PlaygroundCssVars.NODE_PORT_BORDER_WIDTH});
    right: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / -2 - ${PlaygroundCssVars.NODE_BORDER_WIDTH});
    width: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    height: ${PlaygroundCssVars.NODE_PORT_HEIGHT};
    background-color: ${PlaygroundCssVars.NODE_PORT_STEPS_BACKGROUND};
    border: ${PlaygroundCssVars.NODE_PORT_STEPS_BORDER};
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

export interface StepsPortWidgetProps {
	// node and engine props are required
	port: StepsPortModel;
	engine: DiagramEngine;
}

/**
 * used in step node, when it has sub steps
 */
export const StepsPortWidget = (props: StepsPortWidgetProps) => {
	const {port, engine} = props;

	return <StepsPortContainer>
		<PortWidget port={port} engine={engine}/>
	</StepsPortContainer>;
};
