import {SnowflakePipelineStepDef, StandardPipelineStepRegisterKey} from '../../../definition';
import {HelpDocs} from '../../../help-docs';
import {registerStepDef} from '../all-step-defs';
import {CommonStepDefModel, CommonStepDefs} from '../common';

export interface SnowflakeStepDefModel extends CommonStepDefModel {
	use: StandardPipelineStepRegisterKey.SNOWFLAKE;
}

export const SnowflakePropertyStepDefs =
	CommonStepDefs.createStepNodeConfigurer<SnowflakePipelineStepDef, SnowflakeStepDefModel>({
		use: StandardPipelineStepRegisterKey.SNOWFLAKE,
		helpDocs: HelpDocs.snowflakeStep
	});
registerStepDef(SnowflakePropertyStepDefs);
