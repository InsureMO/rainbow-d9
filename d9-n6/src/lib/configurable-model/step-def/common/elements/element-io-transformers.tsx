import {PropValue} from '@rainbow-d9/n1';
import {UnwrappedDecorateInput, UnwrappedDropdown} from '@rainbow-d9/n2';
import React, {ReactNode, useRef} from 'react';
import {
	ConfigurableElement,
	ConfigurableElementBadgeAsIs,
	ConfigurableElementBadgeSnippet,
	ConfigurableElementEditorProps
} from '../../../../edit-dialog';
import {HelpDocs} from '../../../../help-docs';
import {Labels} from '../../../../labels';
import {VerticalLinesEditor} from '../../../vertical-lines-editor';
import {CommonStepDefModel, ErrorHandleType, MergeRequestType} from '../types';

const createBadge = (name: 'fromRequestAsIs' | 'toResponseAsIs') => {
	return (model: CommonStepDefModel): ReactNode => {
		if (model.temporary?.[name] === false) {
			return <ConfigurableElementBadgeSnippet/>;
		} else {
			return <ConfigurableElementBadgeAsIs/>;
		}
	};
};
const createEditor =
	(names: { flag: 'fromRequestAsIs', snippet: 'fromRequest' }
		| { flag: 'toResponseAsIs', snippet: 'toResponse' }) => {
		return (props: ConfigurableElementEditorProps<CommonStepDefModel>) => {
			const {flag, snippet} = names;
			const {model, onValueChanged} = props;
			const onValueChange = (value: PropValue) => {
				model.temporary = {...(model.temporary ?? {}), [flag]: value as ErrorHandleType};
				onValueChanged();
			};
			const options = [
				{value: true, label: Labels.StepIOTransformerAsIs},
				{value: false, label: Labels.StepIOTransformerSnippet}
			];
			return <VerticalLinesEditor>
				<UnwrappedDropdown value={model.temporary?.[flag] ?? true}
				                   onValueChange={onValueChange} options={options} clearable={false}
				                   style={{justifySelf: 'start', width: 'unset', minWidth: 'min(200px, 100%)'}}/>
			</VerticalLinesEditor>;
		};
	};

export const elementFromRequest: ConfigurableElement = {
	code: 'from-request', label: Labels.StepIOTransformer, anchor: 'from-request',
	badge: createBadge('fromRequestAsIs'),
	editor: createEditor({flag: 'fromRequestAsIs', snippet: 'fromRequest'}),
	helpDoc: HelpDocs.stepFromRequest
};
export const elementFromRequestGroup: ConfigurableElement = {
	code: 'from-request-group', label: Labels.StepFromRequest, anchor: 'from-request-group',
	children: [elementFromRequest],
	group: true
};
export const elementToResponse: ConfigurableElement = {
	code: 'to-response', label: Labels.StepIOTransformer, anchor: 'to-response',
	badge: createBadge('toResponseAsIs'),
	editor: createEditor({flag: 'toResponseAsIs', snippet: 'toResponse'}),
	helpDoc: HelpDocs.stepToResponse
};
const MergeToRequestEditor = (props: ConfigurableElementEditorProps<CommonStepDefModel>) => {
	const {model, onValueChanged} = props;

	const inputRef = useRef<HTMLDivElement>(null);

	const onValueChange = (value: PropValue) => {
		model.temporary = {...(model.temporary ?? {}), mergeRequestType: value as MergeRequestType};
		setTimeout(() => inputRef.current?.querySelector('input')?.focus(), 50);
		onValueChanged();
	};
	const onNameChange = (value: PropValue) => {
		model.mergeRequest = value as string;
		onValueChanged();
	};
	const options = [
		{value: MergeRequestType.REPLACE, label: Labels.StepIOMergeBackReplace},
		{value: MergeRequestType.MERGE_AS_PROPERTY, label: Labels.StepIOMergeBackAsProperty},
		{value: MergeRequestType.UNBOX, label: Labels.StepIOMergeBackUnbox}
	];
	return <VerticalLinesEditor>
		<UnwrappedDropdown value={model.temporary?.mergeRequestType ?? MergeRequestType.REPLACE}
		                   onValueChange={onValueChange} options={options} clearable={false}
		                   style={{justifySelf: 'start', width: 'unset', minWidth: 'min(200px, 100%)'}}/>
		<UnwrappedDecorateInput leads={[Labels.StepIOMergeBackAsPropertyName]}
		                        value={model.mergeRequest ?? ''}
		                        onValueChange={onNameChange}
		                        disabled={model.temporary?.mergeRequestType !== MergeRequestType.MERGE_AS_PROPERTY}
		                        ref={inputRef}
		                        data-di-prefix-text={true}/>
	</VerticalLinesEditor>;
};
export const elementMergeToRequest: ConfigurableElement = {
	code: 'merge-to-response', label: Labels.StepMergeRequest, anchor: 'merge-to-response',
	badge: (model: CommonStepDefModel): ReactNode => {
		const {mergeRequestType: type} = model.temporary ?? {};
		switch (type) {
			case MergeRequestType.UNBOX:
				return Labels.StepIOMergeBackUnbox;
			case MergeRequestType.MERGE_AS_PROPERTY:
				return Labels.StepIOMergeBackAsProperty;
			case MergeRequestType.REPLACE:
				return Labels.StepIOMergeBackReplace;
		}
	},
	editor: MergeToRequestEditor,
	helpDoc: HelpDocs.stepMergeToRequest
};
export const elementToResponseGroup: ConfigurableElement = {
	code: 'to-response-group', label: Labels.StepToResponse, anchor: 'to-response-group',
	children: [elementToResponse, elementMergeToRequest],
	group: true
};
