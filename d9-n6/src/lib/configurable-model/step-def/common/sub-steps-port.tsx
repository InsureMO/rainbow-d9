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
import {PlaygroundCssVars} from '../../../widgets';

export class SubStepsPortModel extends PortModel {
	public static readonly TYPE = 'sub-steps-port';

	public constructor(name: string) {
		super({type: SubStepsPortModel.TYPE, name, alignment: PortModelAlignment.RIGHT});
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

export class SubStepsPortFactory extends AbstractModelFactory<SubStepsPortModel, DiagramEngine> {
	public constructor() {
		super(SubStepsPortModel.TYPE);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public generateModel(_event: GenerateModelEvent): SubStepsPortModel {
		throw new Error('DO NOT use SubStepsPortFactory#generateModel.');
	}
}

export const SubStepsPortContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-sub-steps-port'})`
    display: flex;
    position: absolute;
    top: calc(-1 * ${PlaygroundCssVars.NODE_PORT_BORDER_WIDTH});
    right: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / -2 - ${PlaygroundCssVars.NODE_BORDER_WIDTH});
    width: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    height: ${PlaygroundCssVars.NODE_PORT_HEIGHT};
    background-color: ${PlaygroundCssVars.NODE_POST_PORT_SUB_STEPS_BACKGROUND};
    border: ${PlaygroundCssVars.NODE_POST_PORT_SUB_STEPS_BORDER};
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

export interface SubStepsPortWidgetProps {
	// node and engine props are required
	port: SubStepsPortModel;
	engine: DiagramEngine;
}

export const SubStepsPortWidget = (props: SubStepsPortWidgetProps) => {
	const {port, engine} = props;

	return <SubStepsPortContainer>
		<PortWidget port={port} engine={engine}/>
	</SubStepsPortContainer>;
};
