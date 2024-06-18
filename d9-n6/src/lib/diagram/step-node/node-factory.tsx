import {AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import React from 'react';
import {StepNodeModel} from './node-model';
import {StepNodeWidget} from './node-widget';

export class StepNodeFactory extends AbstractReactFactory<StepNodeModel, DiagramEngine> {
	public constructor() {
		super(StepNodeModel.TYPE);
	}

	public generateReactWidget(event: GenerateWidgetEvent<StepNodeModel>): JSX.Element {
		return <StepNodeWidget engine={this.engine} node={event.model}/>;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public generateModel(_event: GenerateModelEvent): StepNodeModel {
		throw new Error('DO NOT use StepNodeFactory#generateModel.');
	}
}
