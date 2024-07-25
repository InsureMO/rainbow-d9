import {SnippetPipelineStepDef, StandardPipelineStepRegisterKey} from '../../../definition';
import {HelpDocs} from '../../../help-docs';
import {StepNodeConfigurer} from '../../types';
import {registerStepDef} from '../all-step-defs';
import {CommonStepDefs} from '../common';
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
		...CommonStepDefs.prebuiltPorts.input,
		{key: 'snippet', port: PortSnippet},
		...CommonStepDefs.prebuiltPorts.errorHandles,
		...CommonStepDefs.prebuiltPorts.output
	],
	createSubNodes: CommonStepDefs.createSubNodesAndEndNode, findSubPorts: CommonStepDefs.findSubPorts,
	helpDocs: HelpDocs.snippetStep
};
registerStepDef(SnippetStepDefs);
