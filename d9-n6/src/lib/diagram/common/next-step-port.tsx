import {GenerateModelEvent} from '@projectstorm/react-canvas-core';
import {
	AbstractModelFactory,
	DefaultLinkModel,
	LinkModel,
	PortModel,
	PortModelAlignment,
	PortWidget
} from '@projectstorm/react-diagrams';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import React from 'react';
import styled from 'styled-components';
import {PlaygroundCssVars} from '../../widgets';

export class NextStepPortModel extends PortModel {
	public static readonly TYPE = 'next-step-port';
	public static readonly NAME = 'next-step';

	public constructor() {
		super({
			type: NextStepPortModel.TYPE,
			name: NextStepPortModel.NAME,
			alignment: PortModelAlignment.BOTTOM
		});
	}

	/**
	 * source is this port
	 */
	public createLinkModel(): LinkModel {
		return this.createOutgoingLinkModel();
	}

	public createOutgoingLinkModel(): LinkModel {
		const link = new DefaultLinkModel();
		link.setSourcePort(this);
		return link;
	}
}

export class NextStepPortFactory extends AbstractModelFactory<NextStepPortModel, DiagramEngine> {
	public constructor() {
		super(NextStepPortModel.TYPE);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public generateModel(_event: GenerateModelEvent): NextStepPortModel {
		throw new Error('DO NOT use NextStepPortFactory#generateModel.');
	}
}

export const NextStepPortContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-next-step-port'})`
    display: flex;
    position: absolute;
    left: calc(50% - ${PlaygroundCssVars.NODE_PORT_RADIUS});
    bottom: calc(-1 * ${PlaygroundCssVars.NODE_PORT_RADIUS});
    width: calc(${PlaygroundCssVars.NODE_PORT_RADIUS} * 2);
    height: ${PlaygroundCssVars.NODE_PORT_RADIUS};
    background-color: ${PlaygroundCssVars.NODE_NEXT_STEP_PORT_BACKGROUND_COLOR};
    border: ${PlaygroundCssVars.NODE_NEXT_STEP_PORT_BORDER};
    border-bottom-left-radius: ${PlaygroundCssVars.NODE_PORT_RADIUS};
    border-bottom-right-radius: ${PlaygroundCssVars.NODE_PORT_RADIUS};

    > div:first-child {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0;
    }
`;

export interface NextStepPortWidgetProps {
	// node and engine props are required
	port: NextStepPortModel;
	engine: DiagramEngine;
}

export const NextStepPortWidget = (props: NextStepPortWidgetProps) => {
	const {port, engine} = props;

	return <NextStepPortContainer>
		<PortWidget port={port} engine={engine}/>
	</NextStepPortContainer>;
};
