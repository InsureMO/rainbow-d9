import {StandardPipelineStepRegisterKey} from '../../../definition';
import {CommonStepDefModel} from '../common';

export interface SnippetStepDefModel extends CommonStepDefModel {
	use: StandardPipelineStepRegisterKey.SNIPPET;
	snippet?: string;
}
