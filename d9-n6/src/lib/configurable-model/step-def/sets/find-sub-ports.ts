import {PortModel} from '@projectstorm/react-diagrams';
import {Undefinable} from '@rainbow-d9/n1';
import {StepNodeModel} from '../../../diagram';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {SetsSubStepsPortName} from './port-sub-steps';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const findSubPorts: StepNodeConfigurer['findSubPorts'] = (model: StepNodeModel): Undefinable<Array<PortModel>> => {
	const subStepsPort = model.getPort(SetsSubStepsPortName);

	return subStepsPort != null ? [subStepsPort, ...(CommonStepDefs.findSubPorts(model) ?? [])] : CommonStepDefs.findSubPorts(model);
};
