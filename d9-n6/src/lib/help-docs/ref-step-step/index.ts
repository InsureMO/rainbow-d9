import {mergeStepDocs} from '../step';
import {markdown as stepRefStepCode} from './code.md';
import {markdown as step} from './step.md';

export const docs = {
	stepRefStepCode,
	refStepStep: mergeStepDocs(step)
};
