import {mergeStepDocs} from '../step';
import {markdown as stepEachItemName} from './item-name.md';
import {markdown as stepEachOriginalContentName} from './original-content-name.md';
import {markdown as step} from './step.md';

export const docs = {
	stepEachItemName, stepEachOriginalContentName,
	eachStep: mergeStepDocs(step)
};
