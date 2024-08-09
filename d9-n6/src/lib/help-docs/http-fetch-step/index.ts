import {mergeStepDocs, mergeStepDocsFreely} from '../step';
import {markdown as stepHttpBodyUsed} from './body-used.md';
import {markdown as stepHttpDecorateUrl} from './decorate-url.md';
import {markdown as stepHttpEndpoint} from './endpoint.md';
import {markdown as fetchStep} from './fetch-step.md';
import {markdown as stepHttpGenerateBody} from './generate-body.md';
import {markdown as stepHttpGenerateHeaders} from './generate-headers.md';
import {markdown as getStep} from './get-step.md';
import {markdown as httpStep} from './http-step.md';
import {markdown as stepHttpMethod} from './method.md';
import {markdown as postStep} from './post-step.md';
import {markdown as stepHttpReadResponse} from './read-response.md';
import {markdown as stepHttpResponseErrorHandles} from './response-error-handles.md';
import {markdown as stepHttpSystem} from './system.md';
import {markdown as stepHttpTimeout} from './timeout.md';

export const docs = (() => {
	const httpDocs = mergeStepDocs(httpStep, false);
	return {
		// variables
		stepHttpSystem, stepHttpEndpoint, stepHttpDecorateUrl, stepHttpMethod, stepHttpTimeout,
		stepHttpGenerateHeaders, stepHttpBodyUsed, stepHttpGenerateBody,
		stepHttpReadResponse, stepHttpResponseErrorHandles,
		// steps
		httpFetchStep: mergeStepDocsFreely(fetchStep, {'http': httpDocs}),
		httpGetStep: mergeStepDocsFreely(getStep, {'http': httpDocs}),
		httpPostStep: mergeStepDocsFreely(postStep, {'http': httpDocs})
	};
})();
