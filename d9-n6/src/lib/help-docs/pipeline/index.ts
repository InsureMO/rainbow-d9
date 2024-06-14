import {markdown as pipelineBody} from './body.md';
import {markdown as pipelineCode} from './code.md';
import {markdown as pipelineEnabled} from './enabled.md';
import {markdown as pipelineExposeFile} from './expose-file.md';
import {markdown as pipelineExposeHeaders} from './expose-headers.md';
import {markdown as pipelineHeaders} from './headers.md';
import {markdown as pipelineInitOnly} from './init-only.md';
import {markdown as pipelineMethod} from './method.md';
import {markdown as pipelinePathParams} from './path-params.md';
import {markdown as pipeline} from './pipeline.md';
import {markdown as pipelineQueryParams} from './query-params.md';
import {markdown as pipelineRoute} from './route.md';
import {markdown as pipelineType} from './type.md';

export const docs = {
	pipeline,
	pipelineCode, pipelineEnabled, pipelineType,
	pipelineInitOnly,
	pipelineRoute, pipelineMethod, pipelineHeaders, pipelinePathParams, pipelineQueryParams,
	pipelineBody,
	pipelineExposeFile, pipelineExposeHeaders
};