import {mergeStepDocs} from '../step';
import {markdown as stepParallelCloneData} from './clone-data.md';
import {markdown as stepParallelRace} from './race.md';
import {markdown as step} from './step.md';

export const docs = {
	stepParallelRace, stepParallelCloneData,
	parallelStep: mergeStepDocs(step)
};
