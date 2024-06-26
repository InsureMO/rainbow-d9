import {StandardPipelineStepRegisterKey} from '../../../definition';
import {HelpDocs} from '../../../help-docs';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {confirm} from './confirm';
import {PortSubSteps} from './port-sub-steps';
import {prepare} from './prepare';
import {SetsStepDefModel} from './types';

export * from './types';

export const SetsStepDefs: StepNodeConfigurer<SetsStepDefModel> = {
	use: StandardPipelineStepRegisterKey.SETS,
	prepare, confirm, discard: CommonStepDefs.discard,
	properties: [CommonStepDefs.properties.name],
	ports: [
		{key: 'from-request', port: CommonStepDefs.ports.fromRequest},
		{key: 'sub-steps', port: PortSubSteps},
		{key: 'to-response', port: CommonStepDefs.ports.toResponse},
		{key: 'merge-request', port: CommonStepDefs.ports.mergeRequest}
	],
	createSubNodes: CommonStepDefs.createSubNodes,
	helpDocs: HelpDocs.snippetStep
};
