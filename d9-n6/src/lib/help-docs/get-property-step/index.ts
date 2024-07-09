import {docs as StepDocs} from '../step';
import {markdown as stepGetPropertyProperty} from './property.md';
import {markdown as step} from './step.md';

export const docs = {
	stepGetPropertyProperty,
	getPropertyStep: step.replace('${transformer}\n', StepDocs.stepTransformer)
};
