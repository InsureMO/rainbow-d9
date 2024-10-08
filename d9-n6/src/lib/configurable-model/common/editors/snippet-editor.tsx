import {Nullable} from '@rainbow-d9/n1';
import React from 'react';
import {ConfigurableElementEditorProps} from '../../../edit-dialog';
import {CommonStepDefModel} from '../../step-def';
import {JsEditor, JsEditorExtensionType} from '../js-editor';

export interface CreateSnippetEditorOptions<M extends CommonStepDefModel> {
	extensionType: JsEditorExtensionType;
	getValue: (model: M) => Nullable<string>;
	setValue: (model: M, value: string) => void;
	height: string | number;
}

export const createSnippetEditor = <M extends CommonStepDefModel>(options: CreateSnippetEditorOptions<M>) => {
	const {extensionType, getValue, setValue, height} = options;

	return (props: ConfigurableElementEditorProps<M>) => {
		const {model, onValueChanged, decorator} = props;

		const onValueChange = async (snippet: string) => {
			setValue(model, snippet);
			onValueChanged(false);
		};
		return <JsEditor snippet={getValue(model)} onChange={onValueChange} height={height}
		                 extensionType={extensionType}
		                 decorator={decorator}/>;
	};
};
