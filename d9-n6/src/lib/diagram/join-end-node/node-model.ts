import {LinkModel, NodeModel, NodeModelGenerics} from '@projectstorm/react-diagrams';
import {Undefinable} from '@rainbow-d9/n1';
import {LastSubStepJoinPortModel} from '../../configurable-model';
import {FileDef, PipelineStepDef} from '../../definition';
import {NextStepPortModel, PreviousStepPortModel} from '../common';
import {HandledNodeModel} from '../node-handlers';
import {StepNodeModelOptions} from '../step-node';

export interface JoinEndNodeModelGenerics {
	IN: PreviousStepPortModel;
	OUT: NextStepPortModel;
}

export class JoinEndNodeModel extends HandledNodeModel<NodeModelGenerics & JoinEndNodeModelGenerics> {
	public static readonly TYPE = 'join-end-node';

	public constructor(public readonly step: PipelineStepDef,
	                   public readonly file: FileDef,
	                   private readonly rest: StepNodeModelOptions) {
		super({type: JoinEndNodeModel.TYPE}, rest.handlers);
		// always have a port which link from previous step or start node
		this.addPort(new PreviousStepPortModel());
		// always have a port which link from last sub step
		this.addPort(new LastSubStepJoinPortModel());
		// always have a port which link to next step or end node
		this.addPort(new NextStepPortModel());
	}

	public getEntityType() {
		return this.rest.type;
	}

	public getSubOf(): Undefinable<PipelineStepDef> {
		return this.rest.subOf;
	}

	public endOf(node: NodeModel): LinkModel {
		const port = this.getPort(LastSubStepJoinPortModel.NAME) as PreviousStepPortModel;
		const link = port.createIncomingLinkModel();
		link.setSourcePort(node.getPort(NextStepPortModel.NAME));
		return link;
	}
}