import {PortModel} from '@projectstorm/react-diagrams';
import {Undefinable} from '@rainbow-d9/n1';
import {StepNodeModel} from '../../../diagram';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs, StepsPortName} from '../common';

export const findSubPorts: StepNodeConfigurer['findSubPorts'] = (model: StepNodeModel): Undefinable<Array<PortModel>> => {
	const subStepsPort = model.getPort(StepsPortName);

	return subStepsPort != null ? [subStepsPort, ...(CommonStepDefs.findSubPorts(model) ?? [])] : CommonStepDefs.findSubPorts(model);
};
