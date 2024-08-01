import {NodeModelGenerics} from '@projectstorm/react-diagrams';
import {FileDef} from '../../definition';
import {PlaygroundModuleAssistant} from '../../types';
import {NextStepPortModel} from '../common';
import {HandledNodeModel, NodeHandlers} from '../node-handlers';

export interface StartNodeModelGenerics {
	PORT: NextStepPortModel;
}

export interface StartNodeModelOptions {
	handlers: NodeHandlers;
	assistant: Required<PlaygroundModuleAssistant>;
}

export class StartNodeModel extends HandledNodeModel<NodeModelGenerics & StartNodeModelGenerics> {
	public static readonly TYPE = 'start-node';

	public readonly assistant: Required<PlaygroundModuleAssistant>;

	public constructor(public readonly def: FileDef,
	                   private readonly rest: StartNodeModelOptions) {
		super({type: StartNodeModel.TYPE}, rest.handlers);
		this.assistant = rest.assistant;
		// always have a port which link to next step
		this.addPort(new NextStepPortModel());
	}
}
