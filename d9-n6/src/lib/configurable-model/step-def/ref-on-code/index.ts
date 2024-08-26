import {VUtils} from '@rainbow-d9/n1';
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
import {createCheckOrMissBadge, createDropdownOnAssistantEditor, createPrePortOnAssistantWithKey} from '../../common';
import {StepNodeConfigurer} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {AndConfirmReturned, CommonStepDefModel, CommonStepDefs} from '../common';

export interface RefOnCodeStepDefModel extends CommonStepDefModel {
	ref?: string;
}

export interface CreateRefOnCodeStepDefsOptions<F extends RefOnCodePipelineStepDef> {
	use: F['use'];
	label: ReactNode;
	askRefOptions: (assistant: Required<PlaygroundModuleAssistant>) => DropdownOptions;
	elementCodeHelpDoc: string;
	stepHelpDoc: string;
}

export const createRefOnCodeStepDefs =
	<F extends RefOnCodePipelineStepDef, M extends RefOnCodeStepDefModel>(options: CreateRefOnCodeStepDefsOptions<F>): StepNodeConfigurer<F, M> => {
		const {use, label, askRefOptions, elementCodeHelpDoc, stepHelpDoc} = options;
		return CommonStepDefs.createStepNodeConfigurer<F, M>({
			use,
			prepare: ['and', (def: F, model: M) => model.ref = def.ref],
			switchUse: ['keep', ['ref']],
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			confirm: ['and', (model: M, def: F, _file, _options): AndConfirmReturned => {
				// TODO VALIDATE REF CODE OF REF ON CODE STEPS
				return () => def.ref = (model.ref ?? '').trim();
			}],
			survivalAfterConfirm: ['and', (_def: F, property: string) => {
				return ['ref'].includes(property);
			}],
			properties: [
				CommonStepDefs.createMainContentElement({
					code: 'ref', label, anchor: 'ref',
					badge: createCheckOrMissBadge<RefOnCodeStepDefModel>({check: model => VUtils.isNotBlank(model.ref)}),
					editor: createDropdownOnAssistantEditor<RefOnCodeStepDefModel, string>({
						getValue: model => model.ref,
						setValue: (model, value) => model.ref = value,
						askOptions: askRefOptions
					}),
					helpDoc: elementCodeHelpDoc
				})
			],
			ports: [
				createPrePortOnAssistantWithKey({
					key: 'ref', label,
					getValue: model => model.ref,
					askOptions: askRefOptions
				})
			],
			helpDocs: stepHelpDoc
		});
	};

export interface RefPipelineStepDefModel extends RefOnCodeStepDefModel {
	use: StandardPipelineStepRegisterKey.REF_PIPELINE;
}

export const RefPipelineStepDefs: StepNodeConfigurer<RefPipelinePipelineStepDef, RefPipelineStepDefModel> =
	createRefOnCodeStepDefs({
		use: StandardPipelineStepRegisterKey.REF_PIPELINE,
		askRefOptions: assistant => {
			return (assistant.askRefPipelines() ?? []).map(pipeline => {
				return {value: pipeline.code, label: VUtils.blankThen(pipeline.name, pipeline.code)};
			});
		},
		elementCodeHelpDoc: HelpDocs.stepRefPipelineCode,
		label: Labels.StepRefPipelineCode,
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
				return {value: pipeline.code, label: VUtils.blankThen(pipeline.name, pipeline.code)};
			});
		},
		elementCodeHelpDoc: HelpDocs.stepRefStepCode,
		label: Labels.StepRefStepCode,
		stepHelpDoc: HelpDocs.refStepStep
	});
registerStepDef(RefStepStepDefs);
