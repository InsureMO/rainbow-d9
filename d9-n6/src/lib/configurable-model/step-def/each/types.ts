import {StandardPipelineStepRegisterKey} from '../../../definition';
import {CommonStepDefModel} from '../common';

export interface EachStepDefModel extends CommonStepDefModel {
	use: StandardPipelineStepRegisterKey.EACH_SETS;
	originalContentName?: string;
	itemName?: string;
}
