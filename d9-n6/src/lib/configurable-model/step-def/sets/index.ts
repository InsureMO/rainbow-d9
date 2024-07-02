import {StandardPipelineStepRegisterKey} from '../../../definition';
import {HelpDocs} from '../../../help-docs';
import {StepNodeConfigurer} from '../../types';
import {registerStepDef} from '../all-step-defs';
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
		{key: 'catchable-error-handle', port: CommonStepDefs.ports.handleCatchableError},
		{key: 'uncatchable-error-handle', port: CommonStepDefs.ports.handleUncatchableError},
		{key: 'exposed-error-handle', port: CommonStepDefs.ports.handleExposedError},
		{key: 'any-error-handle', port: CommonStepDefs.ports.handleAnyError},
		{key: 'to-response', port: CommonStepDefs.ports.toResponse},
		{key: 'merge-request', port: CommonStepDefs.ports.mergeRequest}
	],
	createSubNodes, findSubPorts,
	helpDocs: HelpDocs.snippetStep
};
registerStepDef(SetsStepDefs);
