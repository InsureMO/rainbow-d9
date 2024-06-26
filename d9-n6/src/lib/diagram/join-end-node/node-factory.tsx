import {AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import React from 'react';
import {JoinEndNodeModel} from './node-model';
import {JoinEndNodeWidget} from './node-widget';

export class JoinEndNodeFactory extends AbstractReactFactory<JoinEndNodeModel, DiagramEngine> {
	public constructor() {
		super(JoinEndNodeModel.TYPE);
	}

	public generateReactWidget(event: GenerateWidgetEvent<JoinEndNodeModel>): JSX.Element {
		return <JoinEndNodeWidget engine={this.engine} node={event.model}/>;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public generateModel(_event: GenerateModelEvent): JoinEndNodeModel {
		throw new Error('DO NOT use JoinEndNodeFactory#generateModel.');
	}
}
