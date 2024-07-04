import {PropValue} from '@rainbow-d9/n1';
import {UnwrappedDropdown} from '@rainbow-d9/n2';
import React, {ReactNode} from 'react';
import {
	ConfigurableElement,
	ConfigurableElementBadgeIgnored,
	ConfigurableElementBadgeSnippet,
	ConfigurableElementBadgeSteps,
	ConfigurableElementEditorProps
} from '../../../../edit-dialog';
import {HelpDocs} from '../../../../help-docs';
import {Labels} from '../../../../labels';
import {VerticalLinesEditor} from '../../../vertical-lines-editor';
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
const createEditor = (name: 'useErrorHandlesForCatchable' | 'useErrorHandlesForUncatchable' | 'useErrorHandlesForExposed' | 'useErrorHandlesForAny') => {
	return (props: ConfigurableElementEditorProps<CommonStepDefModel>) => {
		const {model, onValueChanged} = props;
		const onValueChange = (value: PropValue) => {
			model.temporary = {...(model.temporary ?? {}), [name]: value as ErrorHandleType};
			onValueChanged();
		};
		const options = [
			{value: ErrorHandleType.NONE, label: Labels.StepErrorHandleTypeNone},
			{value: ErrorHandleType.SNIPPET, label: Labels.StepErrorHandleTypeSnippet},
			{value: ErrorHandleType.STEPS, label: Labels.StepErrorHandleTypeSteps}
		];
		return <VerticalLinesEditor>
			<UnwrappedDropdown value={model.temporary?.[name] ?? ErrorHandleType.NONE}
			                   onValueChange={onValueChange} options={options} clearable={false}
			                   style={{justifySelf: 'start', width: 'unset', minWidth: 'min(200px, 100%)'}}/>
		</VerticalLinesEditor>;
	};
};

export const elementCatchableErrorHandle: ConfigurableElement = {
	code: 'catchable-error-handle', label: Labels.CatchableErrorHandle, anchor: 'catchable-error-handle',
	badge: createBadge('useErrorHandlesForCatchable'),
	editor: createEditor('useErrorHandlesForCatchable'),
	helpDoc: HelpDocs.stepCatchableErrorHandle
};
export const elementUncatchableErrorHandle: ConfigurableElement = {
	code: 'uncatchable-error-handle', label: Labels.UncatchableErrorHandle, anchor: 'uncatchable-error-handle',
	badge: createBadge('useErrorHandlesForUncatchable'),
	editor: createEditor('useErrorHandlesForUncatchable'),
	helpDoc: HelpDocs.stepUncatchableErrorHandle
};
export const elementExposedErrorHandle: ConfigurableElement = {
	code: 'exposed-error-handle', label: Labels.ExposedErrorHandle, anchor: 'exposed-error-handle',
	badge: createBadge('useErrorHandlesForExposed'),
	editor: createEditor('useErrorHandlesForExposed'),
	helpDoc: HelpDocs.stepExposedErrorHandle
};
export const elementAnyErrorHandle: ConfigurableElement = {
	code: 'any-error-handle', label: Labels.AnyErrorHandle, anchor: 'any-error-handle',
	badge: createBadge('useErrorHandlesForAny'),
	editor: createEditor('useErrorHandlesForAny'),
	helpDoc: HelpDocs.stepAnyErrorHandle
};

export const elementErrorHandles: ConfigurableElement = {
	code: 'error-handles', label: Labels.ErrorHandles, anchor: 'error-handles',
	children: [
		elementCatchableErrorHandle, elementExposedErrorHandle, elementUncatchableErrorHandle, elementAnyErrorHandle
	],
	group: true
};
