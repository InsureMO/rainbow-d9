import {FileDef, PipelineStepDef} from '../../../definition';
import {ConfigurableModel} from '../../../edit-dialog';

export enum CommonStepErrorHandleType {
	NONE, SNIPPET, STEPS
}

export interface CommonStepDefModel extends ConfigurableModel, PipelineStepDef {
	fromRequest?: string;
	toResponse?: string;
	mergeRequest?: boolean | string;
	errorHandles?: {
		catchable?: string;
		uncatchable?: string;
		exposed?: string;
		any?: string;
	};
	temporary?: {
		useErrorHandlesForCatchable?: CommonStepErrorHandleType;
		useErrorHandlesForUncatchable?: CommonStepErrorHandleType;
		useErrorHandlesForExposed?: CommonStepErrorHandleType;
		useErrorHandlesForAny?: CommonStepErrorHandleType;
	};
}

export interface StepPortProps<S extends CommonStepDefModel = CommonStepDefModel> {
	step: S;
	file: FileDef;
}

export type StepPort<S extends CommonStepDefModel = CommonStepDefModel> = (props: StepPortProps<S>) => JSX.Element;
