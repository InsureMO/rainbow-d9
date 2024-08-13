import React, {ReactNode} from 'react';
import {
	ConfigurableElement,
	ConfigurableElementBadgeIgnored,
	ConfigurableElementBadgeSnippet,
	ConfigurableElementBadgeSteps
} from '../../../../edit-dialog';
import {HelpDocs} from '../../../../help-docs';
import {Labels} from '../../../../labels';
import {PlaygroundCssVars} from '../../../../widgets';
import {createSelectableSnippetEditor} from '../../../common';
import {CommonStepDefModel, ErrorHandleType} from '../types';

const createBadge = (name: 'useErrorHandlesForCatchable' | 'useErrorHandlesForUncatchable' | 'useErrorHandlesForExposed' | 'useErrorHandlesForAny') => {
	return (model: CommonStepDefModel): ReactNode => {
		switch (model.temporary?.[name]) {
			case ErrorHandleType.SNIPPET:
				return <ConfigurableElementBadgeSnippet/>;
			case ErrorHandleType.STEPS:
				return <ConfigurableElementBadgeSteps/>;
			case ErrorHandleType.NONE:
			default:
				return <ConfigurableElementBadgeIgnored/>;
		}
	};
};
type EditorNames =
	{ flag: 'useErrorHandlesForCatchable', snippet: 'catchable' }
	| { flag: 'useErrorHandlesForUncatchable', snippet: 'uncatchable' }
	| { flag: 'useErrorHandlesForExposed', snippet: 'exposed' }
	| { flag: 'useErrorHandlesForAny', snippet: 'any' };
const createEditor = (names: EditorNames) => {
	const {flag, snippet} = names;
	return createSelectableSnippetEditor<CommonStepDefModel, ErrorHandleType>({
		findFlag: (model) => model.temporary?.[flag] ?? ErrorHandleType.NONE,
		saveFlag: (model, value) => {
			model.temporary = {...(model.temporary ?? {}), [flag]: value};
		},
		findSnippet: (model) => model.errorHandles?.[snippet],
		saveSnippet: (model, text) => {
			if (model.errorHandles == null) {
				model.errorHandles = {};
			}
			model.errorHandles[snippet] = text;
		},
		flagCandidates: [
			{value: ErrorHandleType.NONE, label: Labels.StepErrorHandleTypeNone},
			{value: ErrorHandleType.SNIPPET, label: Labels.StepErrorHandleTypeSnippet},
			{value: ErrorHandleType.STEPS, label: Labels.StepErrorHandleTypeSteps}
		],
		isSnippetAvailable: (value) => value === ErrorHandleType.SNIPPET,
		height: PlaygroundCssVars.SNIPPET_ERROR_HANDLES_HEIGHT
	});
};

export const elementCatchableErrorHandle: ConfigurableElement = {
	code: 'catchable-error-handle', label: Labels.CatchableErrorHandle, anchor: 'catchable-error-handle',
	badge: createBadge('useErrorHandlesForCatchable'),
	editor: createEditor({flag: 'useErrorHandlesForCatchable', snippet: 'catchable'}),
	helpDoc: HelpDocs.stepCatchableErrorHandle
};
export const elementUncatchableErrorHandle: ConfigurableElement = {
	code: 'uncatchable-error-handle', label: Labels.UncatchableErrorHandle, anchor: 'uncatchable-error-handle',
	badge: createBadge('useErrorHandlesForUncatchable'),
	editor: createEditor({flag: 'useErrorHandlesForUncatchable', snippet: 'uncatchable'}),
	helpDoc: HelpDocs.stepUncatchableErrorHandle
};
export const elementExposedErrorHandle: ConfigurableElement = {
	code: 'exposed-error-handle', label: Labels.ExposedErrorHandle, anchor: 'exposed-error-handle',
	badge: createBadge('useErrorHandlesForExposed'),
	editor: createEditor({flag: 'useErrorHandlesForExposed', snippet: 'exposed'}),
	helpDoc: HelpDocs.stepExposedErrorHandle
};
export const elementAnyErrorHandle: ConfigurableElement = {
	code: 'any-error-handle', label: Labels.AnyErrorHandle, anchor: 'any-error-handle',
	badge: createBadge('useErrorHandlesForAny'),
	editor: createEditor({flag: 'useErrorHandlesForAny', snippet: 'any'}),
	helpDoc: HelpDocs.stepAnyErrorHandle
};

export const elementErrorHandles: ConfigurableElement = {
	code: 'error-handles', label: Labels.ErrorHandles, anchor: 'error-handles',
	children: [
		elementCatchableErrorHandle, elementExposedErrorHandle, elementUncatchableErrorHandle, elementAnyErrorHandle
	],
	group: true, collapsible: true, collapsed: true
};
