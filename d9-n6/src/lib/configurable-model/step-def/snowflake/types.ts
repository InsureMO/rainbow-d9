import {StandardPipelineStepRegisterKey} from '../../../definition';
import {CommonStepDefModel} from '../common';

export interface SnowflakeStepDefModel extends CommonStepDefModel {
	use: StandardPipelineStepRegisterKey.SNOWFLAKE;
}
