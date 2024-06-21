import {docs as StepDocs} from '../step';
import {markdown as step} from './step.md';

export const docs = {
	snippetStep: step.replace('${transformer}\n', StepDocs.stepTransformer)
};
