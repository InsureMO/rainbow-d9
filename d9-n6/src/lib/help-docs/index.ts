import {docs as PipelineDocs} from './pipeline';
import {docs as SnippetStepDocs} from './snippet-step';
import {docs as StepCommonDocs} from './step';

export const HelpDocs = {
	...PipelineDocs,
	...StepCommonDocs,
	...SnippetStepDocs
};
