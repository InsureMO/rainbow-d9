import {NodeModelGenerics} from '@projectstorm/react-diagrams';
import {Undefinable} from '@rainbow-d9/n1';
import {FileDef, PipelineStepDef} from '../../definition';
import {PlaygroundModuleAssistant} from '../../types';
import {NextStepPortModel, PreviousStepPortModel} from '../common';
import {HandledNodeModel, NodeHandlers} from '../node-handlers';

export enum StepNodeEntityType {
	START = 'start',        // file is step-sets or step, use a virtual step to represent it
	NORMAL = 'normal',      // normal step
	JOIN_END = 'join-end',  // join end step, virtual step to end sub steps
}

export interface StepNodeModelGenerics {
	IN: PreviousStepPortModel;
	OUT: NextStepPortModel;
}

export interface StepNodeModelOptions {
	type: StepNodeEntityType;
	// is sub step of some step
	subOf?: PipelineStepDef;
	handlers: NodeHandlers;
	assistant: Required<PlaygroundModuleAssistant>;
}

export class StepNodeModel extends HandledNodeModel<NodeModelGenerics & StepNodeModelGenerics> {
	public static readonly TYPE = 'step-node';

	public readonly assistant: Required<PlaygroundModuleAssistant>;
	private firstSubStep = false;

	public constructor(public readonly step: PipelineStepDef,
	                   public readonly file: FileDef,
	                   private readonly rest: StepNodeModelOptions) {
		super({type: StepNodeModel.TYPE}, rest.handlers);
		this.assistant = rest.assistant;
		// always have a port which link from previous step or start node
		this.addPort(new PreviousStepPortModel());
		// always have a port which link to next step or end node
		this.addPort(new NextStepPortModel());
	}

	public getEntityType() {
		return this.rest.type;
	}

	public getSubOf(): Undefinable<PipelineStepDef> {
		return this.rest.subOf;
	}

	public asFirstSubStep(is: boolean) {
		this.firstSubStep = is;
	}

	public isFirstSubStep() {
		return this.firstSubStep;
	}
}
