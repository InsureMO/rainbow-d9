import {LinkModel, NodeModel, PortModel} from '@projectstorm/react-diagrams';
import {Undefinable} from '@rainbow-d9/n1';
import {FileDef, PipelineStepDef, PipelineStepRegisterKey} from '../definition';
import {HandledNodeModel, NodeHandlers, StepNodeModel} from '../diagram';
import {ConfigurableElement, ConfigurableElementAnchor, ConfigurableModel} from '../edit-dialog';
import {StepDefsFolder} from '../editor';
import {MarkdownContent, PlaygroundDecorator, PlaygroundModuleAssistant} from '../types';
import {FirstSubStepPortContainerFind, StepDefsReconfigurer, StepPort} from './step-def';

export type ConfigChangesConfirmed = Array<ConfigurableElementAnchor> | true;

export interface FileNodeConfirmOptions {
	handlers: NodeHandlers;
	assistant: Required<PlaygroundModuleAssistant>;
}

export interface FileNodeConfigurer<D extends FileDef = FileDef, M extends ConfigurableModel = ConfigurableModel> {
	prepare: (def: D) => M;
	confirm: (model: M, def: D, options: FileNodeConfirmOptions) => ConfigChangesConfirmed;
	discard: (model: M) => void;
	elements: Array<ConfigurableElement>;
}

export interface CreateSubNodesOptions {
	appendNode: (...nodes: Array<NodeModel>) => void;
	appendLink: (...links: Array<LinkModel>) => void;
	handlers: NodeHandlers;
	assistant: Required<PlaygroundModuleAssistant>;
	decorator?: PlaygroundDecorator;
}

export interface ConfirmNodeOptions {
	handlers: NodeHandlers;
	assistant: Required<PlaygroundModuleAssistant>;
}

export interface OperateNodeOptions {
	handlers: NodeHandlers;
	assistant: Required<PlaygroundModuleAssistant>;
}

/**
 * if operation can be performed on given node, then provide the corresponding operation function
 */
export interface NodeOperators<F extends PipelineStepDef = PipelineStepDef> {
	remove?: (node: StepNodeModel, def: F) => void;
	prependStep?: (node: StepNodeModel, def: F) => void;
	appendStep?: (node: StepNodeModel, def: F) => void;
	prependRoute?: (node: StepNodeModel, def: F) => void;
	appendRoute?: (node: StepNodeModel, def: F) => void;
	removeRoute?: (node: StepNodeModel, def: F) => void;
	addOtherwise?: (node: StepNodeModel, def: F) => void;
	removeOtherwise?: (node: StepNodeModel, def: F) => void;
}

export type StepDefsOperators<F extends PipelineStepDef = PipelineStepDef> = (node: StepNodeModel, def: F) => NodeOperators<F>

export interface StepNodeConfigurer<F extends PipelineStepDef = PipelineStepDef, M extends ConfigurableModel = ConfigurableModel> {
	use: PipelineStepRegisterKey;
	/** prepare configurable model for popup edit dialog */
	prepare: (def: F) => M;
	/** use switched, use in given model is updated */
	switchUse: (model: ConfigurableModel, originalUse: PipelineStepDef['use']) => ConfigurableModel;
	/** confirm the changes from edit dialog */
	confirm: (model: M, def: F, file: FileDef, options: ConfirmNodeOptions) => ConfigChangesConfirmed;
	/** property could concatenated by "." */
	survivalAfterConfirm: (def: F, property: string) => boolean;
	/** discard the changes from edit dialog */
	discard: (model: M) => void;
	ports?: Array<{ key: string, port: StepPort }>;
	properties: Array<ConfigurableElement>;
	/** create nodes for sub steps, returns an end node */
	createSubNodes: (node: StepNodeModel, options: CreateSubNodesOptions) => Undefinable<HandledNodeModel>;
	/** port for sub-steps must be the first one of returning array */
	findSubPorts: (node: StepNodeModel) => Undefinable<Array<PortModel>>;
	helpDocs: MarkdownContent;
	folder: StepDefsFolder<F>;
	operators: StepDefsOperators<F>;
	/** reconfigurer */
	reconfigurer?: StepDefsReconfigurer;
	/** first sub step port container finder */
	firstSubStepPortContainerFind?: FirstSubStepPortContainerFind;
}
