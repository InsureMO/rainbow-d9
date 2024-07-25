import {StandardPipelineStepRegisterKey} from '../../../definition';
import {CommonStepDefModel} from '../common';

export interface ParallelStepDefModel extends CommonStepDefModel {
	use: StandardPipelineStepRegisterKey.PARALLEL_SETS;
	cloneData?: string;
	race?: boolean;
}
