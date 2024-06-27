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

export class LastSubStepJoinPortModel extends PortModel {
	public static readonly TYPE = 'last-sub-step-join-port';
	public static readonly NAME = 'last-sub-step-join';

	public constructor() {
		super({
			type: LastSubStepJoinPortModel.TYPE,
			name: LastSubStepJoinPortModel.NAME,
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

export class LastSubStepJoinPortFactory extends AbstractModelFactory<LastSubStepJoinPortModel, DiagramEngine> {
	public constructor() {
		super(LastSubStepJoinPortModel.TYPE);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public generateModel(_event: GenerateModelEvent): LastSubStepJoinPortModel {
		throw new Error('DO NOT use LastSubStepJoinPortFactory#generateModel.');
	}
}

export const LastSubStepJoinPortContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-last-sub-step-join-port'})`
    display: flex;
    position: absolute;
    top: calc(50% - ${PlaygroundCssVars.NODE_PORT_RADIUS});
    right: calc(-1 * ${PlaygroundCssVars.NODE_PORT_RADIUS} - ${PlaygroundCssVars.NODE_BORDER_WIDTH});
    width: ${PlaygroundCssVars.NODE_PORT_RADIUS};
    height: calc(${PlaygroundCssVars.NODE_PORT_RADIUS} * 2);
    background-color: ${PlaygroundCssVars.NODE_PORT_LAST_SUB_STEP_JOIN_BACKGROUND};
    border: ${PlaygroundCssVars.NODE_PORT_LAST_SUB_STEP_JOIN_BORDER};
    border-top-right-radius: ${PlaygroundCssVars.NODE_PORT_RADIUS};
    border-bottom-right-radius: ${PlaygroundCssVars.NODE_PORT_RADIUS};

    > div:first-child {
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 100%;
    }
`;

export interface LastSubStepJoinPortWidgetProps {
	// node and engine props are required
	port: LastSubStepJoinPortModel;
	engine: DiagramEngine;
}

/**
 * used in step node, when it is first sub step
 */
export const LastSubStepJoinPortWidget = (props: LastSubStepJoinPortWidgetProps) => {
	const {port, engine} = props;

	return <LastSubStepJoinPortContainer>
		<PortWidget port={port} engine={engine}/>
	</LastSubStepJoinPortContainer>;
};
