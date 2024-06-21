import {HelpDocs} from '../../../help-docs';
import {StepNodeConfigurer} from '../../types';
import {CommonStepDefs} from '../common';
import {confirm} from './confirm';
import {PortSnippet} from './port-snippet';
import {prepare} from './prepare';
import {SnippetStepDefModel} from './types';

export * from './types';

export const SnippetStepDefs: StepNodeConfigurer<SnippetStepDefModel> = {
	use: 'snippet',
	prepare, confirm, discard: CommonStepDefs.discard,
	properties: [CommonStepDefs.properties.name],
	ports: [
		{key: 'from-request', port: CommonStepDefs.ports.fromRequest},
		{key: 'to-response', port: CommonStepDefs.ports.toResponse},
		{key: 'snippet', port: PortSnippet},
		{key: 'merge-request', port: CommonStepDefs.ports.mergeRequest}
	],
	createSubNodes: CommonStepDefs.createSubNodes,
	helpDocs: HelpDocs.snippetStep
};
