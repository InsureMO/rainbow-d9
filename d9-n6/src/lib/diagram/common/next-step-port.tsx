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

export class NextStepPortModel extends PortModel {
	public static readonly TYPE = 'next-step-port';
	public static readonly NAME = 'next-step';

	public constructor() {
		super({
			type: NextStepPortModel.TYPE,
			name: NextStepPortModel.NAME,
			alignment: PortModelAlignment.RIGHT
		});
	}

	public createLinkModel(): LinkModel {
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
		return new NextStepPortModel();
	}
}

export const NextStepPortContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-next-step-port'})`
    display: flex;
    position: relative;
    align-self: end;
    align-items: center;
    justify-self: end;
    color: ${PlaygroundCssVars.NODE_NEXT_STEP_PORT_COLOR};
    background: ${PlaygroundCssVars.NODE_NEXT_STEP_PORT_BACKGROUND};
    height: ${PlaygroundCssVars.NODE_PORT_HEIGHT};
    border-top-left-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    border-bottom-left-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    font-weight: ${PlaygroundCssVars.NODE_NEXT_STEP_PORT_FONT_WEIGHT};
    font-size: ${PlaygroundCssVars.NODE_NEXT_STEP_PORT_FONT_SIZE};
    text-transform: uppercase;
    padding: ${PlaygroundCssVars.NODE_NEXT_STEP_PORT_PADDING};
    margin-right: -1px;
    grid-column: 3;

    > div:first-child {
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 100%;
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
		<span><IntlLabel keys={['o23', 'port', 'next']} value="Out"/></span>
	</NextStepPortContainer>;
};
