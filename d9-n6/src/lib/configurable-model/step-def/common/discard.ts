import {VUtils} from '@rainbow-d9/n1';
import {AllInPipelineStepDef} from '../../../definition';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefModel} from './types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const discard: StepNodeConfigurer<AllInPipelineStepDef, CommonStepDefModel>['discard'] = (_model: CommonStepDefModel) => VUtils.noop();
