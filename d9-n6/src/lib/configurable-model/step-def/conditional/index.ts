import {ConditionalPipelineStepDef, StandardPipelineStepRegisterKey} from '../../../definition';
import {ConfigurableElementAnchor} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {registerStepDef} from '../all-step-defs';
import {AndConfirmCommit, CommonStepDefModel, CommonStepDefs} from '../common';

export interface ConditionalStepDefModel extends CommonStepDefModel {
	use: StandardPipelineStepRegisterKey.CONDITIONAL_SETS;
	check?: string;
}

export const ConditionalStepDefs =
	CommonStepDefs.createStepNodeConfigurer<ConditionalPipelineStepDef, ConditionalStepDefModel>({
		use: StandardPipelineStepRegisterKey.CONDITIONAL_SETS,
		prepare: ['and', (def, model) => model.check = def.check],
		switchUse: ['keep', ['check']],
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		confirm: ['and', (model, def, _file, _options): ConfigurableElementAnchor | AndConfirmCommit => {
			// TODO VALIDATE CHECK
			return () => def.check = (model.check ?? '').trim();
		}],
		ports: [{key: 'steps', port: CommonStepDefs.prebuiltPorts.steps}],
		createSubNodes: CommonStepDefs.createConditionalSubNodesAndEndNode,
		helpDocs: HelpDocs.conditionalStep
	});
registerStepDef(ConditionalStepDefs);
