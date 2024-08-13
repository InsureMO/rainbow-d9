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
		switchUse: ['keep', ['steps']],
		ports: [{key: 'steps', port: CommonStepDefs.prebuiltPorts.steps}],
		createSubNodes: CommonStepDefs.createSetsLikeSubNodesAndEndNode,
		helpDocs: HelpDocs.setsStep
	});
registerStepDef(SetsStepDefs);
