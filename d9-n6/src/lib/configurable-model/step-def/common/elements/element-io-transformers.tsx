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
import {PlaygroundCssVars} from '../../../../widgets';
import {
	CommonElementEditorStyles,
	createSelectableSnippetEditor,
	JsEditorExtensionType,
	VerticalLinesEditor
} from '../../../common';
import {CommonStepDefModel, MergeType} from '../types';

const createBadge = (name: 'fromInputAsIs' | 'toOutputAsIs') => {
	return (model: CommonStepDefModel): ReactNode => {
		if (model.temporary?.[name] === false) {
			return <ConfigurableElementBadgeSnippet/>;
		} else {
			return <ConfigurableElementBadgeAsIs/>;
		}
	};
};
type EditorNames =
	{ flag: 'fromInputAsIs', snippet: 'fromInput', extensionType: JsEditorExtensionType.FROM_INPUT }
	| { flag: 'toOutputAsIs', snippet: 'toOutput', extensionType: JsEditorExtensionType.TO_OUTPUT };
const createEditor = (names: EditorNames) => {
	const {flag, snippet} = names;
	return createSelectableSnippetEditor<CommonStepDefModel, boolean>({
		findFlag: (model) => model.temporary?.[flag] ?? true,
		saveFlag: (model, value) => {
			model.temporary = {...(model.temporary ?? {}), [flag]: value};
		},
		findSnippet: (model) => model[snippet],
		saveSnippet: (model, text) => {
			model[snippet] = text;
		},
		flagCandidates: [
			{value: true, label: Labels.StepIOTransformerAsIs},
			{value: false, label: Labels.StepIOTransformerSnippet}
		],
		isSnippetAvailable: (value) => value === false,
		height: PlaygroundCssVars.SNIPPET_IO_TRANSFORMER_HEIGHT
	});
};

export const elementFromInput: ConfigurableElement = {
	code: 'from-input', label: Labels.StepIOTransformer, anchor: 'from-input',
	badge: createBadge('fromInputAsIs'),
	editor: createEditor({
		flag: 'fromInputAsIs', snippet: 'fromInput', extensionType: JsEditorExtensionType.FROM_INPUT
	}),
	helpDoc: HelpDocs.stepFromInput
};
export const elementFromInputGroup: ConfigurableElement = {
	code: 'from-input-group', label: Labels.StepFromInput, anchor: 'from-input-group',
	children: [elementFromInput],
	group: true
};
export const elementToOutput: ConfigurableElement = {
	code: 'to-output', label: Labels.StepIOTransformer, anchor: 'to-output',
	badge: createBadge('toOutputAsIs'),
	editor: createEditor({
		flag: 'toOutputAsIs', snippet: 'toOutput', extensionType: JsEditorExtensionType.TO_OUTPUT
	}),
	helpDoc: HelpDocs.stepToOutput
};
const MergeToRequestEditor = (props: ConfigurableElementEditorProps<CommonStepDefModel>) => {
	const {model, onValueChanged} = props;

	const inputRef = useRef<HTMLDivElement>(null);

	const onValueChange = (value: PropValue) => {
		model.temporary = {...(model.temporary ?? {}), mergeType: value as MergeType};
		setTimeout(() => inputRef.current?.querySelector('input')?.focus(), 50);
		onValueChanged();
	};
	const onNameChange = (value: PropValue) => {
		model.merge = value as string;
		onValueChanged();
	};
	const options = [
		{value: MergeType.REPLACE, label: Labels.StepIOMergeBackReplace},
		{value: MergeType.MERGE_AS_PROPERTY, label: Labels.StepIOMergeBackAsProperty},
		{value: MergeType.UNBOX, label: Labels.StepIOMergeBackUnbox}
	];
	return <VerticalLinesEditor>
		<UnwrappedDropdown value={model.temporary?.mergeType ?? MergeType.REPLACE}
		                   onValueChange={onValueChange} options={options}
		                   clearable={false} style={CommonElementEditorStyles.dropdown}/>
		<UnwrappedDecorateInput leads={[Labels.StepIOMergeBackAsPropertyName]}
		                        value={model.merge ?? ''}
		                        onValueChange={onNameChange}
		                        disabled={model.temporary?.mergeType !== MergeType.MERGE_AS_PROPERTY}
		                        ref={inputRef}
		                        data-di-prefix-text={true}/>
	</VerticalLinesEditor>;
};
export const elementMergeToRequest: ConfigurableElement = {
	code: 'merge-to-output', label: Labels.StepMerge, anchor: 'merge-to-output',
	badge: (model: CommonStepDefModel): ReactNode => {
		const {mergeType: type} = model.temporary ?? {};
		switch (type) {
			case MergeType.UNBOX:
				return Labels.StepIOMergeBackUnbox;
			case MergeType.MERGE_AS_PROPERTY:
				return Labels.StepIOMergeBackAsProperty;
			case MergeType.REPLACE:
				return Labels.StepIOMergeBackReplace;
		}
	},
	editor: MergeToRequestEditor,
	helpDoc: HelpDocs.stepMergeToRequest
};
export const elementToOutputGroup: ConfigurableElement = {
	code: 'to-output-group', label: Labels.StepToOutput, anchor: 'to-output-group',
	children: [elementToOutput, elementMergeToRequest],
	group: true
};
