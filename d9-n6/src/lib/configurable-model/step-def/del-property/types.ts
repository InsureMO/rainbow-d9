import {StandardPipelineStepRegisterKey} from '../../../definition';
import {CommonStepDefModel} from '../common';

export interface DelPropertyStepDefModel extends CommonStepDefModel {
	use: StandardPipelineStepRegisterKey.DEL_PROPERTY | StandardPipelineStepRegisterKey.DELETE_PROPERTIES;
	property?: string;
}
