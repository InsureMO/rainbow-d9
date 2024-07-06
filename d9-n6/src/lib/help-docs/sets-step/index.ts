import {docs as StepDocs} from '../step';
import {markdown as step} from './step.md';

export const docs = {
	setsStep: step.replace('${transformer}\n', StepDocs.stepTransformer)
};
