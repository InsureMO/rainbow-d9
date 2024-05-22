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
import {DOM_KEY_WIDGET, IntlLabel} from '@rainbow-d9/n2';
import React from 'react';
import styled from 'styled-components';
import {PlaygroundCssVars} from '../../widgets';

export class PreviousStepPortModel extends PortModel {
	public static readonly TYPE = 'previous-step-port';
	public static readonly NAME = 'previous-step';

	public constructor() {
		super({
			type: PreviousStepPortModel.TYPE,
			name: PreviousStepPortModel.NAME,
			alignment: PortModelAlignment.LEFT
		});
	}

	public createLinkModel(): LinkModel {
		return new DefaultLinkModel();
	}
}

export type CreatePreviousStepPortModel = () => PreviousStepPortModel;

export class PreviousStepPortFactory extends AbstractModelFactory<PortModel, DiagramEngine> {
	private readonly createPreviousStep: CreatePreviousStepPortModel = () => new PreviousStepPortModel();

	public constructor() {
		super(PreviousStepPortModel.TYPE);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public generateModel(_event: GenerateModelEvent): PortModel {
		return this.createPreviousStep();
	}
}

export const PreviousStepPortContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-previous-step-port'})`
    display: flex;
    position: relative;
    align-self: end;
    align-items: center;
    color: ${PlaygroundCssVars.NODE_PREVIOUS_STEP_PORT_COLOR};
    background: ${PlaygroundCssVars.NODE_PREVIOUS_STEP_PORT_BACKGROUND};
    height: ${PlaygroundCssVars.NODE_PORT_HEIGHT};
    border-top-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    border-bottom-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    font-weight: ${PlaygroundCssVars.NODE_PREVIOUS_STEP_PORT_FONT_WEIGHT};
    font-size: ${PlaygroundCssVars.NODE_PREVIOUS_STEP_PORT_FONT_SIZE};
    text-transform: uppercase;
    padding: ${PlaygroundCssVars.NODE_PREVIOUS_STEP_PORT_PADDING};
    margin-left: -1px;
    grid-column: 1;

    > div:first-child {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
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
		<span><IntlLabel keys={['o23', 'port', 'previous']} value="In"/></span>
	</PreviousStepPortContainer>;
};
