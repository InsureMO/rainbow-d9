import {StandardPipelineStepRegisterKey} from '../../../definition';
import {CommonStepDefModel} from '../common';

export interface GetPropertyStepDefModel extends CommonStepDefModel {
	use: StandardPipelineStepRegisterKey.GET_PROPERTY;
	property?: string;
}
