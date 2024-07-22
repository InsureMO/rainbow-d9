import {StandardPipelineStepRegisterKey} from '../../../definition';
import {CommonStepDefModel} from '../common';

export interface AsyncSetsStepDefModel extends CommonStepDefModel {
	use: StandardPipelineStepRegisterKey.ASYNC_SETS;
}
