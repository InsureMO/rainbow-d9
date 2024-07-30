import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {Undefinable} from '@rainbow-d9/n1';
import {AllInPipelineStepDef, FileDef, PipelineStepDef} from '../../../definition';
import {HandledNodeModel, StepNodeModel} from '../../../diagram';
import {ConfigurableElement, ConfigurableModel} from '../../../edit-dialog';
import {CreateSubNodesOptions, StepNodeConfigurer} from '../../types';

export enum MergeType {
	REPLACE, UNBOX, MERGE_AS_PROPERTY
}

export enum ErrorHandleType {
	NONE, SNIPPET, STEPS
}

export interface CommonStepDefModel extends ConfigurableModel, PipelineStepDef {
	fromInput?: string;
	toOutput?: string;
	merge?: string;
	errorHandles?: {
		catchable?: string;
		uncatchable?: string;
		exposed?: string;
		any?: string;
	};
	temporary?: {
		fromInputAsIs?: boolean;
		toOutputAsIs?: boolean;
		mergeType?: MergeType;
		useErrorHandlesForCatchable?: ErrorHandleType;
		useErrorHandlesForUncatchable?: ErrorHandleType;
		useErrorHandlesForExposed?: ErrorHandleType;
		useErrorHandlesForAny?: ErrorHandleType;
	};
}

export interface StepPortProps<S extends AllInPipelineStepDef = AllInPipelineStepDef> {
	step: S;
	file: FileDef;
	node: StepNodeModel;
	engine: DiagramEngine;
}

export type StepPort<S extends AllInPipelineStepDef = AllInPipelineStepDef> = (props: StepPortProps<S>) => JSX.Element;

export interface CommonStepDefsProperties {
	name: ConfigurableElement;
	use: ConfigurableElement;
	fromInput: ConfigurableElement;
	toOutput: ConfigurableElement;
	errorHandles: ConfigurableElement;
	/** typically a set of configurable elements at leading position */
	leadingGroup: Array<ConfigurableElement>;
	/** typically a set of configurable elements at trailing position */
	tailingGroup: Array<ConfigurableElement>;
}

/**
 * step extends from AbstractFragmentaryPipelineStep, will inherit these ports
 */
export interface CommonStepDefsPorts {
	fromInput: StepPort;
	toOutput: StepPort;
	merge: StepPort;
	handleCatchableError: StepPort;
	handleUncatchableError: StepPort;
	handleExposedError: StepPort;
	handleAnyError: StepPort;
}

/**
 * prebuilt but not mandatory
 */
export interface PrebuiltStepDefsPorts {
	steps: StepPort;
	input: Array<{ key: string, port: StepPort }>;
	errorHandles: Array<{ key: string, port: StepPort }>;
	output: Array<{ key: string, port: StepPort }>;
}

export interface CreateSubNodesAndEndNodeOptions extends CreateSubNodesOptions {
	createSpecificSubNodes?: (node: StepNodeModel, options: CreateSubNodesOptions) => Undefinable<Array<HandledNodeModel>>;
}

export interface CommonStepDefsType extends Omit<StepNodeConfigurer<AllInPipelineStepDef, CommonStepDefModel>, 'switchUse' | 'use' | 'properties' | 'ports' | 'createSubNodes' | 'helpDocs'> {
	properties: CommonStepDefsProperties;
	ports: CommonStepDefsPorts;
	prebuiltPorts: PrebuiltStepDefsPorts;
	switchUse: (model: ConfigurableModel, keptPropNames: Array<string>, originalUse: PipelineStepDef['use']) => void;
	createSubNodes: (node: StepNodeModel, options: CreateSubNodesOptions) => Undefinable<Array<HandledNodeModel>>;
	createSubNodesAndEndNode: (node: StepNodeModel, options: CreateSubNodesAndEndNodeOptions) => Undefinable<HandledNodeModel>;
	createSetsLikeSubNodesAndEndNode: (node: StepNodeModel, options: CreateSubNodesOptions) => Undefinable<HandledNodeModel>;
	createParallelSubNodesAndEndNode: (model: StepNodeModel, options: CreateSubNodesOptions) => Undefinable<HandledNodeModel>;
	createMainContentElement: (...children: Array<ConfigurableElement>) => ConfigurableElement;
}
