import {Nullable, PropValue} from '@rainbow-d9/n1';
import {UnwrappedInput} from '@rainbow-d9/n2';
import React from 'react';
import {ConfigurableElementEditorProps} from '../../../edit-dialog';
import {CommonStepDefModel} from '../../step-def';

export interface CreateStrEditorOptions<M extends CommonStepDefModel> {
	getValue: (model: M) => Nullable<string>;
	setValue: (model: M, value: Nullable<string>) => void;
	placeholder?: string;
}

export const createStrEditor = <M extends CommonStepDefModel>(options: CreateStrEditorOptions<M>) => {
	const {getValue, setValue, placeholder} = options;

	return (props: ConfigurableElementEditorProps<M>) => {
		const {model, onValueChanged} = props;
		const onValueChange = (value: PropValue) => {
			setValue(model, value as Nullable<string>);
			onValueChanged();
		};
		return <UnwrappedInput onValueChange={onValueChange} value={getValue(model) ?? ''} placeholder={placeholder}/>;
	};
};