import {PortModel} from '@projectstorm/react-diagrams';
import {Undefinable} from '@rainbow-d9/n1';
import {StepNodeModel} from '../../../diagram';
import {StepNodeConfigurer} from '../../types';
import {
	AnyErrorHandlePortModel,
	CatchableErrorHandlePortModel,
	ExposedErrorHandlePortModel,
	UncatchableErrorHandlePortModel
} from './port-widgets';
import {StepsPortName} from './ports';

export const findSubPorts: StepNodeConfigurer['findSubPorts'] = (model: StepNodeModel): Undefinable<Array<PortModel>> => {
	return [
		// steps
		model.getPort(StepsPortName),
		// error handles
		model.getPort(CatchableErrorHandlePortModel.NAME),
		model.getPort(ExposedErrorHandlePortModel.NAME),
		model.getPort(UncatchableErrorHandlePortModel.NAME),
		model.getPort(AnyErrorHandlePortModel.NAME)
	].filter(port => port != null);
};
