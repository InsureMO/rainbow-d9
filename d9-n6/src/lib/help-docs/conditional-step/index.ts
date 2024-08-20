import {mergeStepDocs} from '../step';
import {markdown as stepConditionalCheck} from './check.md';
import {markdown as step} from './step.md';

export const docs = {
	stepConditionalCheck,
	conditionalStep: mergeStepDocs(step)
};
