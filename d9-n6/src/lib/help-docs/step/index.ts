import {markdown as stepAnyErrorHandle} from './any-error-handle.md';
import {markdown as stepCatchableErrorHandle} from './catchable-error-handle.md';
import {markdown as stepErrorHandles} from './error-handles.md';
import {markdown as stepExposedErrorHandle} from './exposed-error-handle.md';
import {markdown as stepFromInput} from './from-input.md';
import {markdown as stepIOTransformer} from './io-transformer.md';
import {markdown as stepMergeToRequest} from './merge.md';
import {markdown as stepName} from './name.md';
import {markdown as stepToOutput} from './to-output.md';
import {markdown as stepUncatchableErrorHandle} from './uncatchable-error-handle.md';
import {markdown as stepUse} from './use.md';

export const docs = {
	stepName, stepUse,
	stepFromInput, stepToOutput, stepMergeToRequest,
	stepCatchableErrorHandle, stepUncatchableErrorHandle,
	stepExposedErrorHandle, stepAnyErrorHandle,
	// replace $ to $$, since this content will be used in a replacement string
	stepIOTransformer: stepIOTransformer.replace(/\$/g, '$$$$'),
	// replace $ to $$, since this content will be used in a replacement string
	stepErrorHandles: stepErrorHandles.replace(/\$/g, '$$$$')
};

export const mergeStepDocs = (doc: string) => {
	const markdown = doc
		.replace('${transformer}\n', docs.stepIOTransformer)
		.replace('${errorHandles}\n', docs.stepErrorHandles);
	const indexes = new Array(6).fill(0);
	let topLevel = 10; // any value >=6 is ok
	return markdown.split('\n')
		.map(line => {
			const matched = line.match(/^(#{1,6})\s(.*)$/);
			if (matched == null) {
				return line;
			} else {
				topLevel = Math.min(topLevel, matched[1].length - 1);
				return [matched[1], matched[2]];
			}
		})
		.map(parsed => {
			if (typeof parsed === 'string') {
				return parsed;
			} else {
				const myLevel = parsed[0].length - 1;
				indexes[myLevel]++;
				for (let i = myLevel + 1; i < indexes.length; i++) {
					indexes[i] = 0;
				}
				return `${parsed[0]} ${indexes.slice(topLevel, myLevel + 1).join('.')}. ${parsed[1]}`;
			}
		}).join('\n');
};
