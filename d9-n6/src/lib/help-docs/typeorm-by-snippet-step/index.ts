import {mergeStepDocsAnd} from '../step';
import {markdown as stepTypeOrmSnippet} from './snippet.md';
import {markdown as step} from './step.md';

export const docs = {
	stepTypeOrmSnippet,
	typeOrmBySnippetStep: mergeStepDocsAnd(step, {'${typeorm}\n': ''})
};
