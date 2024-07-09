import {PropValue, VUtils} from '@rainbow-d9/n1';
import {UnwrappedInput} from '@rainbow-d9/n2';
import React, {ReactNode} from 'react';
import {
	ConfigurableElement,
	ConfigurableElementBadgeChecked,
	ConfigurableElementBadgeMissed,
	ConfigurableElementEditorProps
} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {GetPropertyStepDefModel} from './types';

export const elementProperty: ConfigurableElement = {
	code: 'property', label: Labels.StepGetPropertyProperty, anchor: 'property',
	badge: (model: GetPropertyStepDefModel): ReactNode => {
		if (VUtils.isNotBlank(model.property)) {
			return <ConfigurableElementBadgeChecked/>;
		} else {
			return <ConfigurableElementBadgeMissed/>;
		}
	},
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
