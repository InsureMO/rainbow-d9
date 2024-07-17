import {mergeStepDocs} from '../step';
import {markdown as step} from './step.md';

export const docs = {
	snowflakeStep: mergeStepDocs(step)
};
