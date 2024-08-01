import {mergeStepDocs, mergeStepDocsFreely} from '../step';
import {markdown as stepHttpEndpoint} from './endpoint.md';
import {markdown as fetchStep} from './fetch-step.md';
import {markdown as getStep} from './get-step.md';
import {markdown as httpStep} from './http-step.md';
import {markdown as postStep} from './post-step.md';
import {markdown as stepHttpSystem} from './system.md';

export const docs = (() => {
	const httpDocs = mergeStepDocs(httpStep, false);
	return {
		// variables
		stepHttpSystem, stepHttpEndpoint,
		// steps
		httpFetchStep: mergeStepDocsFreely(fetchStep, {'http': httpDocs}),
		httpGetStep: mergeStepDocsFreely(getStep, {'http': httpDocs}),
		httpPostStep: mergeStepDocsFreely(postStep, {'http': httpDocs})
	};
})();