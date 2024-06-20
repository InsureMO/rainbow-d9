import {Undefinable} from '@rainbow-d9/n1';
import {StepNodeModel} from '../../../diagram';
import {StepNodeConfigurer} from '../../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createSubNodes: StepNodeConfigurer['createSubNodes'] = (_model: StepNodeModel): Undefinable<StepNodeModel> => {
	// TODO error handles
	return (void 0);
};
