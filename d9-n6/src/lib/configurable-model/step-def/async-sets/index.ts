import {AsyncSetsPipelineStepDef, StandardPipelineStepRegisterKey} from '../../../definition';
import {HelpDocs} from '../../../help-docs';
import {registerStepDef} from '../all-step-defs';
import {CommonStepDefModel, CommonStepDefs} from '../common';

export interface AsyncSetsStepDefModel extends CommonStepDefModel {
	use: StandardPipelineStepRegisterKey.ASYNC_SETS;
}

export const AsyncSetsStepDefs =
	CommonStepDefs.createStepNodeConfigurer<AsyncSetsPipelineStepDef, AsyncSetsStepDefModel>({
		use: StandardPipelineStepRegisterKey.ASYNC_SETS,
		folder: {
			switch: CommonStepDefs.switchFoldWhenSubNodesExist,
			askSubSteps: CommonStepDefs.askSubSteps,
			askSubStepsWithCategory: CommonStepDefs.askSubStepsWithCategory
		},
		ports: [{key: 'steps', port: CommonStepDefs.prebuiltPorts.steps}],
		createSubNodes: CommonStepDefs.createSetsLikeSubNodesAndEndNode,
		helpDocs: HelpDocs.asyncSetsStep
	});
registerStepDef(AsyncSetsStepDefs);
