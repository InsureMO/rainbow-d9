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
import {createSelectableSnippetEditor, JsEditorExtensionType} from '../../../common';
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
	{
		flag: 'useErrorHandlesForCatchable', snippet: 'catchable',
		extensionType: JsEditorExtensionType.CATCHABLE_ERROR_HANDLE
	} |
	{
		flag: 'useErrorHandlesForUncatchable', snippet: 'uncatchable',
		extensionType: JsEditorExtensionType.UNCATCHABLE_ERROR_HANDLE
	} |
	{
		flag: 'useErrorHandlesForExposed', snippet: 'exposed',
		extensionType: JsEditorExtensionType.EXPOSED_ERROR_HANDLE
	} |
	{ flag: 'useErrorHandlesForAny', snippet: 'any', extensionType: JsEditorExtensionType.ANY_ERROR_HANDLE };
const createEditor = (names: EditorNames) => {
	const {flag, snippet, extensionType} = names;
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
		extensionType,
		height: PlaygroundCssVars.SNIPPET_ERROR_HANDLES_HEIGHT
	});
};

export const elementCatchableErrorHandle: ConfigurableElement = {
	code: 'catchable-error-handle', label: Labels.CatchableErrorHandle, anchor: 'catchable-error-handle',
	badge: createBadge('useErrorHandlesForCatchable'),
	editor: createEditor({
		flag: 'useErrorHandlesForCatchable', snippet: 'catchable',
		extensionType: JsEditorExtensionType.CATCHABLE_ERROR_HANDLE
	}),
	helpDoc: HelpDocs.stepCatchableErrorHandle
};
export const elementUncatchableErrorHandle: ConfigurableElement = {
	code: 'uncatchable-error-handle', label: Labels.UncatchableErrorHandle, anchor: 'uncatchable-error-handle',
	badge: createBadge('useErrorHandlesForUncatchable'),
	editor: createEditor({
		flag: 'useErrorHandlesForUncatchable', snippet: 'uncatchable',
		extensionType: JsEditorExtensionType.UNCATCHABLE_ERROR_HANDLE
	}),
	helpDoc: HelpDocs.stepUncatchableErrorHandle
};
export const elementExposedErrorHandle: ConfigurableElement = {
	code: 'exposed-error-handle', label: Labels.ExposedErrorHandle, anchor: 'exposed-error-handle',
	badge: createBadge('useErrorHandlesForExposed'),
	editor: createEditor({
		flag: 'useErrorHandlesForExposed', snippet: 'exposed',
		extensionType: JsEditorExtensionType.EXPOSED_ERROR_HANDLE
	}),
	helpDoc: HelpDocs.stepExposedErrorHandle
};
export const elementAnyErrorHandle: ConfigurableElement = {
	code: 'any-error-handle', label: Labels.AnyErrorHandle, anchor: 'any-error-handle',
	badge: createBadge('useErrorHandlesForAny'),
	editor: createEditor({
		flag: 'useErrorHandlesForAny', snippet: 'any',
		extensionType: JsEditorExtensionType.ANY_ERROR_HANDLE
	}),
	helpDoc: HelpDocs.stepAnyErrorHandle
};

export const elementErrorHandles: ConfigurableElement = {
	code: 'error-handles', label: Labels.ErrorHandles, anchor: 'error-handles',
	children: [
		elementCatchableErrorHandle, elementExposedErrorHandle, elementUncatchableErrorHandle, elementAnyErrorHandle
	],
	group: true, collapsible: true, collapsed: true
};
