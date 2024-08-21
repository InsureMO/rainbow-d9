import {LinkModel, NodeModel, PortModel} from '@projectstorm/react-diagrams';
import {Undefinable} from '@rainbow-d9/n1';
import {FileDef, PipelineStepDef, PipelineStepRegisterKey} from '../definition';
import {HandledNodeModel, NodeHandlers, StepNodeModel} from '../diagram';
import {ConfigurableElement, ConfigurableElementAnchor, ConfigurableModel} from '../edit-dialog';
import {MarkdownContent, PlaygroundModuleAssistant} from '../types';
import {StepPort} from './step-def';

export type ConfigChangesConfirmed = Array<ConfigurableElementAnchor> | true;

export interface FileNodeConfigurer<D extends FileDef = FileDef, M extends ConfigurableModel = ConfigurableModel> {
	prepare: (def: D) => M;
	confirm: (model: M, def: D, handlers: NodeHandlers) => ConfigChangesConfirmed;
	discard: (model: M) => void;
	elements: Array<ConfigurableElement>;
}

export interface CreateSubNodesOptions {
	appendNode: (...nodes: Array<NodeModel>) => void;
	appendLink: (...links: Array<LinkModel>) => void;
	handlers: NodeHandlers;
	assistant: Required<PlaygroundModuleAssistant>;
}

export interface ConfirmNodeOptions {
	handlers: NodeHandlers;
	assistant: Required<PlaygroundModuleAssistant>;
}

export interface StepNodeConfigurer<F extends PipelineStepDef = PipelineStepDef, M extends ConfigurableModel = ConfigurableModel> {
	use: PipelineStepRegisterKey;
	/** prepare configurable model for popup edit dialog */
	prepare: (def: F) => M;
	/** use switched, use in given model is updated */
	switchUse: (model: ConfigurableModel, originalUse: PipelineStepDef['use']) => ConfigurableModel;
	/** confirm the changes from edit dialog */
	confirm: (model: M, def: F, file: FileDef, options: ConfirmNodeOptions) => ConfigChangesConfirmed;
	/** discard the changes from edit dialog */
	discard: (model: M) => void;
	ports?: Array<{ key: string, port: StepPort }>;
	properties: Array<ConfigurableElement>;
	/** create nodes for sub steps, returns an end node */
	createSubNodes: (node: StepNodeModel, options: CreateSubNodesOptions) => Undefinable<HandledNodeModel>;
	/** port for sub-steps must be the first one of returning array */
	findSubPorts: (node: StepNodeModel) => Undefinable<Array<PortModel>>;
	helpDocs: MarkdownContent;
}
