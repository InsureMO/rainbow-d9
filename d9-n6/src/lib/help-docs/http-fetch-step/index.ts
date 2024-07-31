import {mergeStepDocs, mergeStepDocsFreely} from '../step';
import {markdown as fetchStep} from './fetch-step.md';
import {markdown as getStep} from './get-step.md';
import {markdown as httpStep} from './http-step.md';
import {markdown as postStep} from './post-step.md';

export const docs = (() => {
	const httpDocs = mergeStepDocs(httpStep, false);
	return {
		httpFetchStep: mergeStepDocsFreely(fetchStep, {'http': httpDocs}),
		httpGetStep: mergeStepDocsFreely(getStep, {'http': httpDocs}),
		httpPostStep: mergeStepDocsFreely(postStep, {'http': httpDocs})
	};
})();
