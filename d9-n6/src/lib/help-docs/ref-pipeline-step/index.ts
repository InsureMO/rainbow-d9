import {mergeStepDocs} from '../step';
import {markdown as stepRefPipelineCode} from './code.md';
import {markdown as step} from './step.md';

export const docs = {
	stepRefPipelineCode,
	refPipelineStep: mergeStepDocs(step)
};
