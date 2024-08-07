import {PropValue, VUtils} from '@rainbow-d9/n1';
import {DropdownOptions, UnwrappedDropdown} from '@rainbow-d9/n2';
import React, {ReactNode} from 'react';
import {
	ConfigurableElement,
	ConfigurableElementBadgeNo,
	ConfigurableElementBadgeUseDefault,
	ConfigurableElementBadgeYes,
	ConfigurableElementEditorProps
} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {CommonElementEditorStyles} from '../../styles';
import {HttpStepDefModel} from './types';

export const elementBodyUsed: ConfigurableElement = {
	code: 'body-used', label: Labels.StepHttpBodyUsed, anchor: 'body-used',
	badge: (model: HttpStepDefModel): ReactNode => {
		if (model.bodyUsed === true) {
			return <ConfigurableElementBadgeYes/>;
		} else if (model.bodyUsed === false) {
			return <ConfigurableElementBadgeNo/>;
		} else {
			return <ConfigurableElementBadgeUseDefault/>;
		}
	},
	editor: (props: ConfigurableElementEditorProps<HttpStepDefModel>) => {
		const {model, onValueChanged} = props;

		const options: DropdownOptions = [
			{value: 'default', label: Labels.UseDefault},
			{value: true, label: Labels.Yes},
			{value: false, label: Labels.No}
		];
		const onValueChange = (value: PropValue) => {
			if (value === 'default') {
				delete model.bodyUsed;
			} else {
				model.bodyUsed = value as boolean;
			}
			onValueChanged();
		};
		const used = VUtils.isBlank(model.bodyUsed) ? 'default' : model.bodyUsed;

		return <UnwrappedDropdown value={used} onValueChange={onValueChange} options={options}
		                          clearable={false} style={CommonElementEditorStyles.dropdown}/>;
	},
	helpDoc: HelpDocs.stepHttpBodyUsed
};