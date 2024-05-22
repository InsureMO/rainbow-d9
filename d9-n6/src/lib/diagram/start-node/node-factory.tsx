import {AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import React from 'react';
import {StartNodeModel} from './node-model';
import {StartNodeWidget} from './node-widget';

export class StartNodeFactory extends AbstractReactFactory<StartNodeModel, DiagramEngine> {
	public constructor() {
		super(StartNodeModel.TYPE);
	}

	public generateReactWidget(event: GenerateWidgetEvent<StartNodeModel>): JSX.Element {
		return <StartNodeWidget engine={this.engine} node={event.model}/>;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public generateModel(_event: GenerateModelEvent) {
		return new StartNodeModel();
	}
}
