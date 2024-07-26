import {GenerateModelEvent} from '@projectstorm/react-canvas-core';
import {AbstractModelFactory, LinkModel, PortModelAlignment, PortWidget} from '@projectstorm/react-diagrams';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {useForceUpdate} from '@rainbow-d9/n1';
import {CssVars, DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import React from 'react';
import styled from 'styled-components';
import {PipelineStepDiagramDef} from '../../../../definition';
import {LinkExtras, OutgoingPortModel, StepNodeModel} from '../../../../diagram';
import {FoldSubNodes, UnfoldSubNodes} from '../../../../icons';
import {PlaygroundCssVars} from '../../../../widgets';
import {StepsLinkModel} from '../links';

export class StepsPortModel extends OutgoingPortModel {
	public static readonly TYPE = 'steps-port';

	public constructor(name: string) {
		super(StepsPortModel.TYPE, name, PortModelAlignment.RIGHT);
	}

	protected createDefaultLinkModel(extras?: LinkExtras): LinkModel {
		return new StepsLinkModel(this.toLinkModelOptions(extras));
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
    align-items: center;
    justify-content: center;
    top: calc(-1 * ${PlaygroundCssVars.NODE_PORT_BORDER_WIDTH});
    right: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / -2 - ${PlaygroundCssVars.NODE_BORDER_WIDTH});
    width: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    height: ${PlaygroundCssVars.NODE_PORT_HEIGHT};
    background-color: ${PlaygroundCssVars.NODE_PORT_STEPS_BACKGROUND};
    border: ${PlaygroundCssVars.NODE_PORT_STEPS_BORDER};
    border-top-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    border-bottom-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    transition: width ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, right ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &:hover {
        right: calc(0px - ${PlaygroundCssVars.NODE_PORT_HEIGHT} - ${PlaygroundCssVars.NODE_BORDER_WIDTH});
        width: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT});

        > svg:first-child {
            width: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
            opacity: 1;
        }
    }

    > svg:first-child {
        height: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
        width: 0;
        opacity: 0;
        color: ${PlaygroundCssVars.NODE_PORT_STEPS_ICON_COLOR};
        overflow: hidden;
        transition: width ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

        &[data-icon=o23-fold-sub-nodes] {
            margin-left: -4px;
        }

        &[data-icon=o23-unfold-sub-nodes] {
            margin-left: -3px;
        }
    }

    > div:last-child {
        position: absolute;
        top: 0;
        left: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
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

	const forceUpdate = useForceUpdate();

	const model = port.getNode() as StepNodeModel;
	const def = model.step as PipelineStepDiagramDef;
	const diagram = def.$diagram ?? {$foldSubSteps: false};

	const onClicked = () => {
		if (def.$diagram == null) {
			def.$diagram = {$foldSubSteps: diagram.$foldSubSteps};
		}
		def.$diagram.$foldSubSteps = !def.$diagram.$foldSubSteps;
		forceUpdate();
	};

	return <StepsPortContainer onClick={onClicked}>
		{diagram.$foldSubSteps ? <UnfoldSubNodes/> : <FoldSubNodes/>}
		<PortWidget port={port} engine={engine}/>
	</StepsPortContainer>;
};
