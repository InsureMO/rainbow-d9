import {docs as StepDocs} from '../step';
import {markdown as stepSnippetSnippet} from './snippet.md';
import {markdown as step} from './step.md';

export const docs = {
	stepSnippetSnippet,
	snippetStep: step.replace('${transformer}\n', StepDocs.stepTransformer)
};
