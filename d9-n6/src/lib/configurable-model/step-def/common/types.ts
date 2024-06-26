import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {AllInPipelineStepDef, FileDef, PipelineStepDef} from '../../../definition';
import {StepNodeModel} from '../../../diagram';
import {ConfigurableModel} from '../../../edit-dialog';

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
