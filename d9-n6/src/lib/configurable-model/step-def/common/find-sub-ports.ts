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

export const findSubPorts: StepNodeConfigurer['findSubPorts'] = (model: StepNodeModel): Undefinable<Array<PortModel>> => {
	// error handles
	return [
		model.getPort(CatchableErrorHandlePortModel.NAME),
		model.getPort(UncatchableErrorHandlePortModel.NAME),
		model.getPort(ExposedErrorHandlePortModel.NAME),
		model.getPort(AnyErrorHandlePortModel.NAME)
	].filter(port => port != null);
};

