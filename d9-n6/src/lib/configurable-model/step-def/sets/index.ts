import {StandardPipelineStepRegisterKey} from '../../../definition';
import {HelpDocs} from '../../../help-docs';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {confirm} from './confirm';
import {createSubNodes} from './create-sub-nodes';
import {findSubPorts} from './find-sub-ports';
import {prepare} from './prepare';
import {SetsStepDefModel} from './types';

export * from './types';

export const SetsStepDefs: StepNodeConfigurer<SetsStepDefModel> = {
	use: StandardPipelineStepRegisterKey.SETS,
	prepare, confirm, discard: CommonStepDefs.discard,
	properties: [CommonStepDefs.properties.name],
	ports: [
		{key: 'from-request', port: CommonStepDefs.ports.fromRequest},
		{key: 'steps', port: CommonStepDefs.prebuiltPorts.steps},
		{key: 'catchable', port: CommonStepDefs.ports.handleCatchableError},
		{key: 'uncatchable', port: CommonStepDefs.ports.handleUncatchableError},
		{key: 'to-response', port: CommonStepDefs.ports.toResponse},
		{key: 'merge-request', port: CommonStepDefs.ports.mergeRequest}
	],
	createSubNodes, findSubPorts,
	helpDocs: HelpDocs.snippetStep
};
