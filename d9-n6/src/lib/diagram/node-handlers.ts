import {NodeModel, NodeModelGenerics} from '@projectstorm/react-diagrams';

export interface NodeHandlers {
	onChange: () => void;
}

export abstract class HandledNodeModel<G extends NodeModelGenerics = NodeModelGenerics> extends NodeModel<G> {
	protected constructor(options: G['OPTIONS'], public readonly handlers: NodeHandlers) {
		super(options);
	}
}
