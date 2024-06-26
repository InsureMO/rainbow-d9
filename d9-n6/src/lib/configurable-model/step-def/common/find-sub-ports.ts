import {PortModel} from '@projectstorm/react-diagrams';
import {Undefinable} from '@rainbow-d9/n1';
import {StepNodeModel} from '../../../diagram';
import {StepNodeConfigurer} from '../../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const findSubPorts: StepNodeConfigurer['findSubPorts'] = (_model: StepNodeModel): Undefinable<Array<PortModel>> => {
	// TODO error handles
	return (void 0);
};

