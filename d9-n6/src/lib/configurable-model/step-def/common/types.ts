import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {Undefinable} from '@rainbow-d9/n1';
import {AllInPipelineStepDef, FileDef, PipelineStepDef} from '../../../definition';
import {HandledNodeModel, StepNodeModel} from '../../../diagram';
import {ConfigurableElement, ConfigurableModel} from '../../../edit-dialog';
import {CreateSubNodesOptions, StepNodeConfigurer} from '../../types';

export enum MergeRequestType {
	REPLACE, UNBOX, MERGE_AS_PROPERTY
}

export enum ErrorHandleType {
	NONE, SNIPPET, STEPS
}

export interface CommonStepDefModel extends ConfigurableModel, PipelineStepDef {
	fromRequest?: string;
	toResponse?: string;
	mergeRequest?: string;
	errorHandles?: {
		catchable?: string;
		uncatchable?: string;
		exposed?: string;
		any?: string;
	};
	temporary?: {
		fromRequestAsIs?: boolean;
		toResponseAsIs?: boolean;
		mergeRequestType?: MergeRequestType;
		useErrorHandlesForCatchable?: ErrorHandleType;
		catchable?: Array<PipelineStepDef>;
		useErrorHandlesForUncatchable?: ErrorHandleType;
		uncatchable?: Array<PipelineStepDef>;
		useErrorHandlesForExposed?: ErrorHandleType;
		exposed?: Array<PipelineStepDef>;
		useErrorHandlesForAny?: ErrorHandleType;
		any?: Array<PipelineStepDef>;
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
	// fromRequest: ConfigurableElement;
	// toResponse: ConfigurableElement;
	// mergeRequest: ConfigurableElement;
}

/**
 * step extends from AbstractFragmentaryPipelineStep, will inherit these ports
 */
export interface CommonStepDefsPorts {
	fromRequest: StepPort;
	toResponse: StepPort;
	mergeRequest: StepPort;
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
}

export interface CreateSubNodesAndEndNodeOptions extends CreateSubNodesOptions {
	createSpecificSubNodes?: (node: StepNodeModel, options: CreateSubNodesOptions) => Undefinable<Array<HandledNodeModel>>;
}

export interface CommonStepDefsType extends Omit<StepNodeConfigurer<CommonStepDefModel>, 'use' | 'properties' | 'ports' | 'createSubNodes' | 'helpDocs'> {
	properties: CommonStepDefsProperties;
	ports: CommonStepDefsPorts;
	prebuiltPorts: PrebuiltStepDefsPorts;
	createSubNodes: (node: StepNodeModel, options: CreateSubNodesOptions) => Undefinable<Array<HandledNodeModel>>;
	createSubNodesAndEndNode: (node: StepNodeModel, options: CreateSubNodesAndEndNodeOptions) => Undefinable<HandledNodeModel>;
}

