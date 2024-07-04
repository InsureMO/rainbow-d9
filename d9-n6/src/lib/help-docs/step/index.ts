import {markdown as stepAnyErrorHandle} from './any-error-handle.md';
import {markdown as stepCatchableErrorHandle} from './catchable-error-handle.md';
import {markdown as stepExposedErrorHandle} from './exposed-error-handle.md';
import {markdown as stepName} from './name.md';
import {markdown as stepTransformer} from './transformer.md';
import {markdown as stepUncatchableErrorHandle} from './uncatchable-error-handle.md';
import {markdown as stepUse} from './use.md';

export const docs = {
	stepName, stepUse,
	stepCatchableErrorHandle, stepUncatchableErrorHandle,
	stepExposedErrorHandle, stepAnyErrorHandle,
	// replace $ to $$, since this content will be used in a replacement string
	stepTransformer: stepTransformer.replace(/\$/g, '$$$$')
};
