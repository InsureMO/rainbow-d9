import {GenerateModelEvent} from '@projectstorm/react-canvas-core';
import {AbstractModelFactory, PortModelAlignment, PortWidget} from '@projectstorm/react-diagrams';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {Undefinable} from '@rainbow-d9/n1';
import {CssVars, DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import React, {FC, ReactNode} from 'react';
import styled from 'styled-components';
import {PipelineStepDef} from '../../../../definition';
import {IncomingPortModel, StepNodeModel} from '../../../../diagram';
import {RouteTest} from '../../../../icons';
import {PlaygroundCssVars} from '../../../../widgets';

export class FirstSubStepPortModel extends IncomingPortModel {
	public static readonly TYPE = 'first-sub-step-port';
	public static readonly NAME = 'first-sub-step';

	public constructor() {
		super(FirstSubStepPortModel.TYPE, FirstSubStepPortModel.NAME, PortModelAlignment.LEFT);
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
    top: calc(${CssVars.INPUT_HEIGHT} / 2 - ${PlaygroundCssVars.NODE_PORT_RADIUS});
    left: calc(-1 * (${PlaygroundCssVars.NODE_PORT_RADIUS} + ${PlaygroundCssVars.NODE_BORDER_WIDTH}));
    width: ${PlaygroundCssVars.NODE_PORT_RADIUS};
    height: calc(${PlaygroundCssVars.NODE_PORT_RADIUS} * 2);
    background-color: ${PlaygroundCssVars.NODE_PORT_FIRST_SUB_STEP_BACKGROUND};
    border: ${PlaygroundCssVars.NODE_PORT_FIRST_SUB_STEP_BORDER};
    border-top-left-radius: ${PlaygroundCssVars.NODE_PORT_RADIUS};
    border-bottom-left-radius: ${PlaygroundCssVars.NODE_PORT_RADIUS};

    > div:first-child {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
    }
`;

export type FirstSubStepPortContainerFC = FC<{ children: ReactNode }>;
export type FirstSubStepPortContainerFind = (step: PipelineStepDef, parent: PipelineStepDef) => Undefinable<FirstSubStepPortContainerFC>;

export const FirstSubStepPortForRuleCheckContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'o23-playground-route-test-port'})`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
    top: calc(${CssVars.INPUT_HEIGHT} / 2 - ${PlaygroundCssVars.NODE_PORT_ROUTE_TEST_RADIUS});
    left: calc(-1 * (${PlaygroundCssVars.NODE_PORT_ROUTE_TEST_RADIUS} * 2 + ${PlaygroundCssVars.NODE_BORDER_WIDTH}));
    width: calc(${PlaygroundCssVars.NODE_PORT_ROUTE_TEST_RADIUS} * 2);
    height: calc(${PlaygroundCssVars.NODE_PORT_ROUTE_TEST_RADIUS} * 2);
    background-color: ${PlaygroundCssVars.NODE_PORT_ROUTE_TEST_BACKGROUND};
    border: ${PlaygroundCssVars.NODE_PORT_ROUTE_TEST_BORDER};
    border-top-left-radius: ${PlaygroundCssVars.NODE_PORT_ROUTE_TEST_RADIUS};
    border-bottom-left-radius: ${PlaygroundCssVars.NODE_PORT_ROUTE_TEST_RADIUS};
    padding-left: calc(${PlaygroundCssVars.NODE_PORT_ROUTE_TEST_RADIUS} * 0.3);

    > svg {
        width: calc(${PlaygroundCssVars.NODE_PORT_ROUTE_TEST_RADIUS} * 1.4);
        height: calc(${PlaygroundCssVars.NODE_PORT_ROUTE_TEST_RADIUS} * 1.4);
        color: ${PlaygroundCssVars.NODE_PORT_ROUTE_TEST_COLOR};
    }

    > div:last-child {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
    }
`;
export const FirstSubStepPortForRouteTest = (props: { children: ReactNode }) => {
	const {children} = props;

	return <FirstSubStepPortForRuleCheckContainer>
		<RouteTest/>
		{children}
	</FirstSubStepPortForRuleCheckContainer>;
};

const FirstSubStepPortContainerFinds: Array<FirstSubStepPortContainerFind> = [];
export const registerFirstSubStepPortContainerFinds = (...finds: Array<FirstSubStepPortContainerFind>) => {
	(finds || []).forEach(find => {
		if (!FirstSubStepPortContainerFinds.includes(find)) {
			FirstSubStepPortContainerFinds.push(find);
		}
	});
};
export const findFirstSubStepPortContainer = (step: PipelineStepDef, parent: PipelineStepDef): FirstSubStepPortContainerFC => {
	for (const find of FirstSubStepPortContainerFinds) {
		const C = find(step, parent);
		if (C != null) {
			return C;
		}
	}
	return FirstSubStepPortContainer;
};

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

	const C = findFirstSubStepPortContainer(
		(port.getParent() as StepNodeModel).step,
		(Object.values(port.getLinks())[0].getSourcePort().getNode() as StepNodeModel).step);

	return <C>
		<PortWidget port={port} engine={engine}/>
	</C>;
};
