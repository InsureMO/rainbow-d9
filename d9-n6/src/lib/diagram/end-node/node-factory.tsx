import {AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import React from 'react';
import {EndNodeModel} from './node-model';
import {EndNodeWidget} from './node-widget';

export class EndNodeFactory extends AbstractReactFactory<EndNodeModel, DiagramEngine> {
	public constructor() {
		super(EndNodeModel.TYPE);
	}

	public generateReactWidget(event: GenerateWidgetEvent<EndNodeModel>): JSX.Element {
		return <EndNodeWidget engine={this.engine} node={event.model}/>;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public generateModel(_event: GenerateModelEvent) {
		return new EndNodeModel();
	}
}
