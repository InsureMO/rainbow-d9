import {StandardPipelineStepRegisterKey} from '../../../definition';
import {CommonStepDefModel} from '../common';

export interface AsyncSetsStepDefModel extends CommonStepDefModel {
	use: StandardPipelineStepRegisterKey.ASYNC_SETS;
	// replace error handles, meaningless when it's async
	errorHandles?: never;
}
