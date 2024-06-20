import {StepNodeConfigurer} from '../../types';
import {confirm} from './confirm';
import {createSubNodes} from './create-sub-nodes';
import {discard} from './discard';
import {prepare} from './prepare';
import {CommonStepDefModel} from './types';

export * from './types';

export const CommonStepDefs: Omit<StepNodeConfigurer<CommonStepDefModel>, 'use'> = {
	prepare, confirm, discard, createSubNodes
};
