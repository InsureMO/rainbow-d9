import {mergeStepDocs} from '../step';
import {markdown as stepTypeOrmSnippet} from './snippet.md';
import {markdown as step} from './step.md';

export const docs = {
	stepTypeOrmSnippet,
	typeOrmBySnippetStep: mergeStepDocs(step)
};
