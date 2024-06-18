import {LinkModel, NodeModel, NodeModelGenerics} from '@projectstorm/react-diagrams';
import {FileDef, PipelineStepDef} from '../../definition';
import {NextStepPortModel, PreviousStepPortModel} from '../common';

export enum StepNodeEntityType {
	START = 'start',        // file is step-sets or step, use a virtual step to represent it
	NORMAL = 'normal',      // normal step
}

export class StepNodeEntity {
	constructor(public readonly step: PipelineStepDef, public readonly type: StepNodeEntityType,
	            public readonly file: FileDef,
	            // is sub step of some step
	            public readonly subOf?: PipelineStepDef) {
	}
}

export interface StepNodeModelGenerics {
	IN: PreviousStepPortModel;
	OUT: NextStepPortModel;
}

export class StepNodeModel extends NodeModel<NodeModelGenerics & StepNodeModelGenerics> {
	public static readonly TYPE = 'step-node';

	public constructor(public readonly entity: StepNodeEntity) {
		super({type: StepNodeModel.TYPE});
		// always have a port which link from previous step or start node
		this.addPort(new PreviousStepPortModel());
		// always have a port which link to next step or end node
		this.addPort(new NextStepPortModel());
	}

	public previous(node: NodeModel): LinkModel {
		const port = this.getPort(PreviousStepPortModel.NAME);
		const link = port.createLinkModel();
		link.setSourcePort(node.getPort(NextStepPortModel.NAME));
		return link;
	}

	public next(node: NodeModel): LinkModel {
		const port = this.getPort(NextStepPortModel.NAME);
		const link = port.createLinkModel();
		link.setTargetPort(node.getPort(PreviousStepPortModel.NAME));
		return link;
	}
}
