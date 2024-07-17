import {mergeStepDocs} from '../step';
import {markdown as stepSnippetSnippet} from './snippet.md';
import {markdown as step} from './step.md';

export const docs = {
	stepSnippetSnippet,
	snippetStep: mergeStepDocs(step)
};
