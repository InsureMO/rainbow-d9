import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {confirm} from './confirm';
import {prepare} from './prepare';
import {SnippetStepDefModel} from './types';

export * from './types';

export const SnippetStepDefs: StepNodeConfigurer<SnippetStepDefModel> = {
	use: 'snippet',
	prepare, confirm, discard: CommonStepDefs.discard,
	createSubNodes: CommonStepDefs.createSubNodes
};
