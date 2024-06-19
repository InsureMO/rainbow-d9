import {NodeModelGenerics} from '@projectstorm/react-diagrams';
import {FileDef} from '../../definition';
import {NextStepPortModel} from '../common';
import {HandledNodeModel, NodeHandlers} from '../node-handlers';

export interface StartNodeModelGenerics {
	PORT: NextStepPortModel;
}

export class StartNodeModel extends HandledNodeModel<NodeModelGenerics & StartNodeModelGenerics> {
	public static readonly TYPE = 'start-node';

	public constructor(public readonly def: FileDef, handlers: NodeHandlers) {
		super({type: StartNodeModel.TYPE}, handlers);
		// always have a port which link to next step
		this.addPort(new NextStepPortModel());
	}
}
