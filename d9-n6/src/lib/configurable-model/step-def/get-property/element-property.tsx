import {PropValue, VUtils} from '@rainbow-d9/n1';
import {UnwrappedInput} from '@rainbow-d9/n2';
import React from 'react';
import {ConfigurableElement, ConfigurableElementEditorProps} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {createCheckOrMissBadge} from '../../common';
import {GetPropertyStepDefModel} from './types';

export const elementProperty: ConfigurableElement = {
	code: 'property', label: Labels.StepGetPropertyProperty, anchor: 'property',
	badge: createCheckOrMissBadge({check: (model: GetPropertyStepDefModel) => VUtils.isNotBlank(model.property)}),
	editor: (props: ConfigurableElementEditorProps<GetPropertyStepDefModel>) => {
		const {model, onValueChanged} = props;
		const onValueChange = (value: PropValue) => {
			model.property = value as string;
			onValueChanged();
		};
		return <UnwrappedInput onValueChange={onValueChange} value={model.property ?? ''}/>;
	},
	helpDoc: HelpDocs.stepGetPropertyProperty
};
