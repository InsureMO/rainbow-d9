import {VUtils} from '@rainbow-d9/n1';
import {ConfigurableModel} from '../../../edit-dialog';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefModel} from './types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const discard: StepNodeConfigurer<CommonStepDefModel>['discard'] = (_model: ConfigurableModel) => VUtils.noop();
