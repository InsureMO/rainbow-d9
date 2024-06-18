import {NodeModel, NodeModelGenerics} from '@projectstorm/react-diagrams';
import {PreviousStepPortModel} from '../common';

export interface EndNodeModelGenerics {
	PORT: PreviousStepPortModel;
}

export class EndNodeModel extends NodeModel<NodeModelGenerics & EndNodeModelGenerics> {
	public static readonly TYPE = 'end-node';

	public constructor() {
		super({type: EndNodeModel.TYPE});
		// always have a port which link to next step
		this.addPort(new PreviousStepPortModel());
	}
}
