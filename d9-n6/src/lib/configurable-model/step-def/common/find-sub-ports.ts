import {PortModel} from '@projectstorm/react-diagrams';
import {Undefinable} from '@rainbow-d9/n1';
import {StepNodeModel} from '../../../diagram';
import {StepNodeConfigurer} from '../../types';
import {CatchableErrorHandlePortModel} from './port-widgets';

export const findSubPorts: StepNodeConfigurer['findSubPorts'] = (model: StepNodeModel): Undefinable<Array<PortModel>> => {
	// error handles
	return [
		model.getPort(CatchableErrorHandlePortModel.NAME)
	].filter(port => port != null);
};

