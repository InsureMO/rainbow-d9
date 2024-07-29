import {GenerateModelEvent} from '@projectstorm/react-canvas-core';
import {AbstractModelFactory, LinkModel, PortModelAlignment, PortWidget} from '@projectstorm/react-diagrams';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import React from 'react';
import styled from 'styled-components';
import {LinkExtras, OutgoingPortModel, StepNodeModel} from '../../../../diagram';
import {FoldSubNodes, UnfoldSubNodes} from '../../../../icons';
import {PlaygroundCssVars} from '../../../../widgets';
import {StepsLinkModel} from '../links';
import {useSubNodesFold} from './use-sub-nodes-fold';
import {SubNodesPortContainer} from './widgets';

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

export const StepsPortContainer = styled(SubNodesPortContainer).attrs({
	[DOM_KEY_WIDGET]: 'o23-playground-steps-port',
	style: {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		'--background-color': PlaygroundCssVars.NODE_PORT_STEPS_BACKGROUND,
		'--border': PlaygroundCssVars.NODE_PORT_STEPS_BORDER,
		'--icon-color': PlaygroundCssVars.NODE_PORT_STEPS_ICON_COLOR
	}
})``;

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

	const model = port.getNode() as StepNodeModel;
	const {fold, switchFold} = useSubNodesFold({model, property: '$foldSubSteps'});

	return <StepsPortContainer data-fold={fold} onClick={switchFold}>
		{fold ? <UnfoldSubNodes/> : <FoldSubNodes/>}
		<PortWidget port={port} engine={engine}/>
	</StepsPortContainer>;
};
