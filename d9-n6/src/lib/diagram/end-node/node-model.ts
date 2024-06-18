import {NodeModelGenerics} from '@projectstorm/react-diagrams';
import {FileDef} from '../../definition';
import {PreviousStepPortModel} from '../common';
import {HandledNodeModel, NodeHandlers} from '../node-handlers';

export interface EndNodeModelGenerics {
	PORT: PreviousStepPortModel;
}

export class EndNodeModel extends HandledNodeModel<NodeModelGenerics & EndNodeModelGenerics> {
	public static readonly TYPE = 'end-node';

	public constructor(public readonly def: FileDef, handlers: NodeHandlers) {
		super({type: EndNodeModel.TYPE}, handlers);
		// always have a port which link to next step
		this.addPort(new PreviousStepPortModel());
	}
}
