import {SnippetPipelineStepDef, StandardPipelineStepRegisterKey} from '../../../definition';
import {HelpDocs} from '../../../help-docs';
import {StepNodeConfigurer} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {CommonStepDefs, PortAnyError, PortCatchableError, PortExposedError, PortUncatchableError} from '../common';
import {confirm} from './confirm';
import {elementSnippet} from './element-snippet';
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
		CommonStepDefs.createMainContentElement(elementSnippet),
		...CommonStepDefs.properties.tailingGroup
	],
	ports: [
		{key: 'from-input', port: CommonStepDefs.ports.fromInput},
		{key: 'snippet', port: PortSnippet},
		{key: 'catchable-error-handle', port: PortCatchableError},
		{key: 'exposed-error-handle', port: PortExposedError},
		{key: 'uncatchable-error-handle', port: PortUncatchableError},
		{key: 'any-error-handle', port: PortAnyError},
		{key: 'to-output', port: CommonStepDefs.ports.toOutput},
		{key: 'merge', port: CommonStepDefs.ports.merge}
	],
	createSubNodes: CommonStepDefs.createSubNodesAndEndNode, findSubPorts: CommonStepDefs.findSubPorts,
	helpDocs: HelpDocs.snippetStep
};
registerStepDef(SnippetStepDefs);