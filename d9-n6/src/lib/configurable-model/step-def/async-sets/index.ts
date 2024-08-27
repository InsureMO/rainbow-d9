import {AsyncSetsPipelineStepDef, StandardPipelineStepRegisterKey} from '../../../definition';
import {HelpDocs} from '../../../help-docs';
import {registerStepDef} from '../all-step-defs';
import {AndConfirmReturned, CommonStepDefModel, CommonStepDefs} from '../common';

export interface AsyncSetsStepDefModel extends CommonStepDefModel {
	use: StandardPipelineStepRegisterKey.ASYNC_SETS;
}

export const AsyncSetsStepDefs =
	CommonStepDefs.createStepNodeConfigurer<AsyncSetsPipelineStepDef, AsyncSetsStepDefModel>({
		use: StandardPipelineStepRegisterKey.ASYNC_SETS,
		confirm: ['and', (_model, def, _file, options): AndConfirmReturned => {
			return () => {
				CommonStepDefs.confirmSetsLikePipelineStep(def, options);
			};
		}],
		survivalAfterConfirm: ['and', (_def: AsyncSetsPipelineStepDef, property: string) => {
			return ['steps', 'steps.*', '$diagram.$foldSubSteps'].includes(property);
		}],
		folder: {
			switch: CommonStepDefs.switchFoldWhenSubNodesExist,
			askSubSteps: CommonStepDefs.askSubSteps,
			askSubStepsWithCategory: CommonStepDefs.askSubStepsWithCategory,
			tryToRevealSubStep: CommonStepDefs.tryToRevealSubSteps
		},
		ports: [{key: 'steps', port: CommonStepDefs.prebuiltPorts.steps}],
		createSubNodes: CommonStepDefs.createSetsLikeSubNodesAndEndNode,
		helpDocs: HelpDocs.asyncSetsStep
	});
registerStepDef(AsyncSetsStepDefs);
