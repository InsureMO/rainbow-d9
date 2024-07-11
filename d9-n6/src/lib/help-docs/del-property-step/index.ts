import {docs as StepDocs} from '../step';
import {markdown as stepDelPropertyProperty} from './property.md';
import {markdown as step} from './step.md';

export const docs = {
	stepDelPropertyProperty,
	delPropertyStep: step.replace('${transformer}\n', StepDocs.stepTransformer)
};
