import {VUtils} from '@rainbow-d9/n1';
import {ConfigurableModel} from '../../edit-dialog';
import {FileNodeConfigurer} from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const discard: FileNodeConfigurer['discard'] = (_model: ConfigurableModel) => VUtils.noop();
