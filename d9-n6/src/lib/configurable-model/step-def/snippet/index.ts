import {SnippetPipelineStepDef, StandardPipelineStepRegisterKey} from '../../../definition';
import {HelpDocs} from '../../../help-docs';
import {StepNodeConfigurer} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {CommonStepDefs, PortAnyError, PortCatchableError, PortExposedError, PortUncatchableError} from '../common';
import {confirm} from './confirm';
import {PortSnippet} from './port-snippet';
import {prepare} from './prepare';
import {switchUse} from './switch-use';
import {SnippetStepDefModel} from './types';

export * from './types';

export const SnippetStepDefs: StepNodeConfigurer<SnippetPipelineStepDef, SnippetStepDefModel> = {
	use: StandardPipelineStepRegisterKey.SNIPPET,
	prepare, switchUse, confirm, discard: CommonStepDefs.discard,
	properties: [
		...CommonStepDefs.properties.leadingGroup,
		...CommonStepDefs.properties.tailingGroup
	],
	ports: [
		{key: 'from-request', port: CommonStepDefs.ports.fromRequest},
		{key: 'snippet', port: PortSnippet},
		{key: 'catchable-error-handle', port: PortCatchableError},
		{key: 'exposed-error-handle', port: PortExposedError},
		{key: 'uncatchable-error-handle', port: PortUncatchableError},
		{key: 'any-error-handle', port: PortAnyError},
		{key: 'to-response', port: CommonStepDefs.ports.toResponse},
		{key: 'merge-request', port: CommonStepDefs.ports.mergeRequest}
	],
	createSubNodes: CommonStepDefs.createSubNodesAndEndNode, findSubPorts: CommonStepDefs.findSubPorts,
	helpDocs: HelpDocs.snippetStep
};
registerStepDef(SnippetStepDefs);
