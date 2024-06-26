import {StandardPipelineStepRegisterKey} from '../../../definition';
import {CommonStepDefModel} from '../common';

export interface SetsStepDefModel extends CommonStepDefModel {
	use: StandardPipelineStepRegisterKey.SETS;
}
