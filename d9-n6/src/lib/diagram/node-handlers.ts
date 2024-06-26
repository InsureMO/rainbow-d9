import {LinkModel, NodeModel, NodeModelGenerics} from '@projectstorm/react-diagrams';
import {NextStepPortModel, PreviousStepPortModel} from './common';

export interface NodeHandlers {
	onChange: () => void;
}

export abstract class HandledNodeModel<G extends NodeModelGenerics = NodeModelGenerics> extends NodeModel<G> {
	// eslint-disable-next-line @typescript-eslint/no-inferrable-types
	private _positionAppointed: boolean = false;

	protected constructor(options: G['OPTIONS'], public readonly handlers: NodeHandlers) {
		super(options);
	}

	public isPositionAppointed(): boolean {
		return this._positionAppointed;
	}

	public setPositionAppointed(value: boolean) {
		this._positionAppointed = value;
	}

	public previous(node: NodeModel): LinkModel {
		const port = this.getPort(PreviousStepPortModel.NAME) as PreviousStepPortModel;
		const link = port.createIncomingLinkModel();
		link.setSourcePort(node.getPort(NextStepPortModel.NAME));
		return link;
	}

	public next(node: NodeModel): LinkModel {
		const port = this.getPort(NextStepPortModel.NAME) as NextStepPortModel;
		const link = port.createOutgoingLinkModel();
		link.setTargetPort(node.getPort(PreviousStepPortModel.NAME));
		return link;
	}
}
