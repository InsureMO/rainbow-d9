import {mergeStepDocs, mergeStepDocsFreely} from '../step';
import {markdown as stepHttpDecorateUrl} from './decorate-url.md';
import {markdown as stepHttpEndpoint} from './endpoint.md';
import {markdown as fetchStep} from './fetch-step.md';
import {markdown as getStep} from './get-step.md';
import {markdown as httpStep} from './http-step.md';
import {markdown as stepHttpMethod} from './method.md';
import {markdown as postStep} from './post-step.md';
import {markdown as stepHttpSystem} from './system.md';
import {markdown as stepHttpTimeout} from './timeout.md';

export const docs = (() => {
	const httpDocs = mergeStepDocs(httpStep, false);
	return {
		// variables
		stepHttpSystem, stepHttpEndpoint, stepHttpDecorateUrl, stepHttpMethod, stepHttpTimeout,
		// steps
		httpFetchStep: mergeStepDocsFreely(fetchStep, {'http': httpDocs}),
		httpGetStep: mergeStepDocsFreely(getStep, {'http': httpDocs}),
		httpPostStep: mergeStepDocsFreely(postStep, {'http': httpDocs})
	};
})();
