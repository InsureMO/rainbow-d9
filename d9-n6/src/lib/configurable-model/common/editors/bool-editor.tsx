import {Nullable, PropValue} from '@rainbow-d9/n1';
import {UnwrappedCheckbox} from '@rainbow-d9/n2';
import React from 'react';
import {ConfigurableElementEditorProps} from '../../../edit-dialog';
import {CommonStepDefModel} from '../../step-def';

export interface CreateBoolEditorOptions<M extends CommonStepDefModel> {
	getValue: (model: M) => Nullable<boolean>;
	setValue: (model: M, value: Nullable<boolean>) => void;
	/** default false */
	defaultAs?: boolean;
}

export const createBoolEditor = <M extends CommonStepDefModel>(options: CreateBoolEditorOptions<M>) => {
	const {getValue, setValue, defaultAs = false} = options;

	return (props: ConfigurableElementEditorProps<M>) => {
		const {model, onValueChanged} = props;
		const onValueChange = (value: PropValue) => {
			if (value == null || value === false) {
				setValue(model, false);
			} else {
				setValue(model, true);
			}
			onValueChanged();
		};
		return <UnwrappedCheckbox onValueChange={onValueChange} value={getValue(model) ?? defaultAs}/>;
	};
};