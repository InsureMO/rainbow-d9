import {LinkModel, NodeModel, NodeModelGenerics} from '@projectstorm/react-diagrams';
import {FileDef} from '../../definition';
import {NextStepPortModel, PreviousStepPortModel} from '../common';
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

	public next(node: NodeModel): LinkModel {
		const port = this.getPort(NextStepPortModel.NAME);
		const link = port.createLinkModel();
		link.setTargetPort(node.getPort(PreviousStepPortModel.NAME));
		return link;
	}
}
