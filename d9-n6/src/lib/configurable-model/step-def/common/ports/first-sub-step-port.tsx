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
import {PlaygroundCssVars} from '../../../../widgets';

export class FirstSubStepPortModel extends PortModel {
	public static readonly TYPE = 'first-sub-step-port';
	public static readonly NAME = 'first-sub-step';

	public constructor() {
		super({
			type: FirstSubStepPortModel.TYPE,
			name: FirstSubStepPortModel.NAME,
			alignment: PortModelAlignment.RIGHT
		});
	}

	/**
	 * source is this port
	 */
	public createLinkModel(): LinkModel {
		return this.createIncomingLinkModel();
	}

	public createIncomingLinkModel(): LinkModel {
		const link = new DefaultLinkModel();
		link.setTargetPort(this);
		return link;
	}
}

export class FirstSubStepPortFactory extends AbstractModelFactory<FirstSubStepPortModel, DiagramEngine> {
	public constructor() {
		super(FirstSubStepPortModel.TYPE);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public generateModel(_event: GenerateModelEvent): FirstSubStepPortModel {
		throw new Error('DO NOT use FirstSubStepPortFactory#generateModel.');
	}
}

export const FirstSubStepPortContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-first-sub-step-port'})`
    display: flex;
    position: absolute;
    top: calc(-1 * ${PlaygroundCssVars.NODE_PORT_RADIUS});
    left: calc(50% - ${PlaygroundCssVars.NODE_PORT_RADIUS});
    width: calc(${PlaygroundCssVars.NODE_PORT_RADIUS} * 2);
    height: ${PlaygroundCssVars.NODE_PORT_RADIUS};
    background-color: ${PlaygroundCssVars.NODE_PORT_FIRST_SUB_STEP_BACKGROUND};
    border: ${PlaygroundCssVars.NODE_PORT_FIRST_SUB_STEP_BORDER};
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

export interface FirstSubStepPortWidgetProps {
	// node and engine props are required
	port: FirstSubStepPortModel;
	engine: DiagramEngine;
}

/**
 * used in step node, when it is first sub step
 */
export const FirstSubStepPortWidget = (props: FirstSubStepPortWidgetProps) => {
	const {port, engine} = props;

	return <FirstSubStepPortContainer>
		<PortWidget port={port} engine={engine}/>
	</FirstSubStepPortContainer>;
};
