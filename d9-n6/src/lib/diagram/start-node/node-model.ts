import {NodeModelGenerics} from '@projectstorm/react-diagrams';
import {Undefinable} from '@rainbow-d9/n1';
import {FileDef} from '../../definition';
import {PlaygroundDecorator, PlaygroundModuleAssistant} from '../../types';
import {NextStepPortModel} from '../common';
import {HandledNodeModel, NodeHandlers} from '../node-handlers';

export interface StartNodeModelGenerics {
	PORT: NextStepPortModel;
}

export interface StartNodeModelOptions {
	handlers: NodeHandlers;
	assistant: Required<PlaygroundModuleAssistant>;
	decorator?: PlaygroundDecorator;
}

export class StartNodeModel extends HandledNodeModel<NodeModelGenerics & StartNodeModelGenerics> {
	public static readonly TYPE = 'start-node';

	public readonly assistant: Required<PlaygroundModuleAssistant>;
	public readonly decorator: Undefinable<PlaygroundDecorator>;

	public constructor(public readonly def: FileDef,
	                   private readonly rest: StartNodeModelOptions) {
		super({type: StartNodeModel.TYPE}, rest.handlers);
		this.assistant = rest.assistant;
		this.decorator = rest.decorator;
		// always have a port which link to next step
		this.addPort(new NextStepPortModel());
	}
}
