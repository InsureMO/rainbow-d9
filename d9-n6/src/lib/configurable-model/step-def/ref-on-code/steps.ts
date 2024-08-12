import {DropdownOptions} from '@rainbow-d9/n2';
import {ReactNode} from 'react';
import {
	RefOnCodePipelineStepDef,
	RefPipelinePipelineStepDef,
	RefStepPipelineStepDef,
	StandardPipelineStepRegisterKey
} from '../../../definition';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {PlaygroundModuleAssistant} from '../../../types';
import {StepNodeConfigurer} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {CommonStepDefs} from '../common';
import {createRefOnCodeCodeProperty} from './code-property';
import {confirm} from './confirm';
import {createRefOnCodePortCode} from './port-code';
import {prepare} from './prepare';
import {switchUse} from './switch-use';
import {RefOnCodeStepDefModel} from './types';

export interface CreateRefOnCodeStepDefsOptions<F extends RefOnCodePipelineStepDef> {
	use: F['use'];
	portCodeLabel: ReactNode;
	askRefOptions: (assistant: Required<PlaygroundModuleAssistant>) => DropdownOptions;
	elementCodeHelpDoc: string;
	stepHelpDoc: string;
}

export const createRefOnCodeStepDefs = <F extends RefOnCodePipelineStepDef, M extends RefOnCodeStepDefModel>(options: CreateRefOnCodeStepDefsOptions<F>): StepNodeConfigurer<F, M> => {
	const {use, portCodeLabel, askRefOptions, elementCodeHelpDoc, stepHelpDoc} = options;
	return {
		use,
		prepare, switchUse, confirm, discard: CommonStepDefs.discard,
		properties: [
			...CommonStepDefs.properties.leadingGroup,
			CommonStepDefs.createMainContentElement(createRefOnCodeCodeProperty({
				helpDoc: elementCodeHelpDoc, askOptions: askRefOptions
			})),
			...CommonStepDefs.properties.tailingGroup
		],
		ports: [
			...CommonStepDefs.prebuiltPorts.input,
			{key: 'property', port: createRefOnCodePortCode({label: portCodeLabel})},
			...CommonStepDefs.prebuiltPorts.errorHandles,
			...CommonStepDefs.prebuiltPorts.output
		],
		createSubNodes: CommonStepDefs.createSubNodesAndEndNode, findSubPorts: CommonStepDefs.findSubPorts,
		helpDocs: stepHelpDoc
	};
};

export interface RefPipelineStepDefModel extends RefOnCodeStepDefModel {
	use: StandardPipelineStepRegisterKey.REF_PIPELINE;
}

export const RefPipelineStepDefs: StepNodeConfigurer<RefPipelinePipelineStepDef, RefPipelineStepDefModel> =
	createRefOnCodeStepDefs({
		use: StandardPipelineStepRegisterKey.REF_PIPELINE,
		askRefOptions: assistant => {
			return (assistant.askRefPipelines() ?? []).map(pipeline => {
				return {value: pipeline.code, label: pipeline.name};
			});
		},
		elementCodeHelpDoc: HelpDocs.stepRefPipelineCode,
		portCodeLabel: Labels.StepRefPipelineCode,
		stepHelpDoc: HelpDocs.refPipelineStep
	});
registerStepDef(RefPipelineStepDefs);

export interface RefStepStepDefModel extends RefOnCodeStepDefModel {
	use: StandardPipelineStepRegisterKey.REF_STEP;
}

export const RefStepStepDefs: StepNodeConfigurer<RefStepPipelineStepDef, RefStepStepDefModel> =
	createRefOnCodeStepDefs({
		use: StandardPipelineStepRegisterKey.REF_STEP,
		askRefOptions: assistant => {
			return (assistant.askRefSteps() ?? []).map(pipeline => {
				return {value: pipeline.code, label: pipeline.name};
			});
		},
		elementCodeHelpDoc: HelpDocs.stepRefStepCode,
		portCodeLabel: Labels.StepRefStepCode,
		stepHelpDoc: HelpDocs.refStepStep
	});
registerStepDef(RefStepStepDefs);
