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
import {PostPort, registerPortFactory} from '../../../diagram';
import {Labels} from '../../../labels';
import {PlaygroundCssVars} from '../../../widgets';
import {StepPortProps} from '../common';
import {SetsStepDefModel} from './types';

export class SetsSubStepsPortModel extends PortModel {
	public static readonly TYPE = 'sets-sub-steps-port';
	public static readonly NAME = 'sets-sub-steps';

	public constructor() {
		super({
			type: SetsSubStepsPortModel.TYPE,
			name: SetsSubStepsPortModel.NAME,
			alignment: PortModelAlignment.RIGHT
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

export class SetsSubStepsPortFactory extends AbstractModelFactory<SetsSubStepsPortModel, DiagramEngine> {
	public constructor() {
		super(SetsSubStepsPortModel.TYPE);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public generateModel(_event: GenerateModelEvent): SetsSubStepsPortModel {
		return new SetsSubStepsPortModel();
	}
}

registerPortFactory(new SetsSubStepsPortFactory());

export const SetsSubStepsPortContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-sets-sub-steps-port'})`
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

export interface SetsSubStepsPortWidgetProps {
	// node and engine props are required
	port: SetsSubStepsPortModel;
	engine: DiagramEngine;
}

export const SetsSubStepsPortWidget = (props: SetsSubStepsPortWidgetProps) => {
	const {port, engine} = props;

	return <SetsSubStepsPortContainer>
		<PortWidget port={port} engine={engine}/>
	</SetsSubStepsPortContainer>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PortSubSteps = (props: StepPortProps<SetsStepDefModel>) => {
	const {node, engine} = props;

	// guard
	if (node.getPort(SetsSubStepsPortModel.NAME) == null) {
		node.addPort(new SetsSubStepsPortModel());
	}

	return <PostPort label={Labels.StepSubSteps} required={false} defined={true} data-role="sub-steps">
		<SetsSubStepsPortWidget port={node.getPort(SetsSubStepsPortModel.NAME) as SetsSubStepsPortModel}
		                        engine={engine}/>
	</PostPort>;
};
