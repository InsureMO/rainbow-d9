import {markdown as pipelineBody} from './pipeline/body.md';
import {markdown as pipelineCode} from './pipeline/code.md';
import {markdown as pipelineEnabled} from './pipeline/enabled.md';
import {markdown as pipelineExposeFile} from './pipeline/expose-file.md';
import {markdown as pipelineHeaders} from './pipeline/headers.md';
import {markdown as pipelineInitOnly} from './pipeline/init-only.md';
import {markdown as pipelineMethod} from './pipeline/method.md';
import {markdown as pipelinePathParams} from './pipeline/path-params.md';
import {markdown as pipeline} from './pipeline/pipeline.md';
import {markdown as pipelineQueryParams} from './pipeline/query-params.md';
import {markdown as pipelineRoute} from './pipeline/route.md';
import {markdown as pipelineType} from './pipeline/type.md';

export const HelpDocs = {
	pipeline,
	pipelineCode, pipelineEnabled, pipelineType,
	pipelineInitOnly,
	pipelineRoute, pipelineMethod, pipelineHeaders, pipelinePathParams, pipelineQueryParams,
	pipelineBody,
	pipelineExposeFile
};
