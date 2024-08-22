import {SetsPipelineStepDef, StandardPipelineStepRegisterKey} from '../../../definition';
import {HelpDocs} from '../../../help-docs';
import {registerStepDef} from '../all-step-defs';
import {CommonStepDefModel, CommonStepDefs} from '../common';

export interface SetsStepDefModel extends CommonStepDefModel {
	use: StandardPipelineStepRegisterKey.SETS;
}

export const SetsStepDefs =
	CommonStepDefs.createStepNodeConfigurer<SetsPipelineStepDef, SetsStepDefModel>({
		use: StandardPipelineStepRegisterKey.SETS,
		folder: {
			switch: CommonStepDefs.switchFoldWhenSubNodesExist,
			askSubStep: CommonStepDefs.askSubSteps
		},
		ports: [{key: 'steps', port: CommonStepDefs.prebuiltPorts.steps}],
		createSubNodes: CommonStepDefs.createSetsLikeSubNodesAndEndNode,
		helpDocs: HelpDocs.setsStep
	});
registerStepDef(SetsStepDefs);
