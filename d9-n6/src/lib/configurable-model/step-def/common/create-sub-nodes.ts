import {Undefinable} from '@rainbow-d9/n1';
import {HandledNodeModel, StepNodeModel} from '../../../diagram';
import {CreateSubNodesOptions, StepNodeConfigurer} from '../../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createSubNodes: StepNodeConfigurer['createSubNodes'] = (_model: StepNodeModel, _options: CreateSubNodesOptions): Undefinable<HandledNodeModel> => {
	// TODO error handles
	return (void 0);
};
