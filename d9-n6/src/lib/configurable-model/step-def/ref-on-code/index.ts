import {VUtils} from '@rainbow-d9/n1';
import {DropdownOptions} from '@rainbow-d9/n2';
import {ReactNode} from 'react';
import {
	FileDef,
	RefOnCodePipelineStepDef,
	RefPipelinePipelineStepDef,
	RefStepPipelineStepDef,
	StandardPipelineStepRegisterKey
} from '../../../definition';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {PlaygroundModuleAssistant} from '../../../types';
import {ConfirmNodeOptions, StepNodeConfigurer} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {AndConfirmCommit, CommonStepDefs} from '../common';
import {createRefOnCodeCodeProperty} from './code-property';
import {createRefOnCodePortCode} from './port-code';
import {RefOnCodeStepDefModel} from './types';

export * from './types';

export interface CreateRefOnCodeStepDefsOptions<F extends RefOnCodePipelineStepDef> {
	use: F['use'];
	label: ReactNode;
	askRefOptions: (assistant: Required<PlaygroundModuleAssistant>) => DropdownOptions;
	elementCodeHelpDoc: string;
	stepHelpDoc: string;
}

export const createRefOnCodeStepDefs = <F extends RefOnCodePipelineStepDef, M extends RefOnCodeStepDefModel>(options: CreateRefOnCodeStepDefsOptions<F>): StepNodeConfigurer<F, M> => {
	const {use, label, askRefOptions, elementCodeHelpDoc, stepHelpDoc} = options;
	return CommonStepDefs.createStepNodeConfigurer<F, M>({
		use,
		prepare: ['and', (def: F, model: M) => {
			model.code = def.code;
		}],
		switchUse: ['keep', ['code']],
		confirm: ['and', (model: M, def: F, file: FileDef, options: ConfirmNodeOptions): ConfigurableElementAnchor | AndConfirmCommit => {
			// TODO VALIDATE REF CODE
			return () => {
				def.code = (model.code ?? '').trim();
				options.handlers.onChange();
			};
		}],
		properties: [
			CommonStepDefs.createMainContentElement(createRefOnCodeCodeProperty({
				label, askOptions: askRefOptions, helpDoc: elementCodeHelpDoc
			}))
		],
		ports: [{key: 'code', port: createRefOnCodePortCode({label})}],
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
