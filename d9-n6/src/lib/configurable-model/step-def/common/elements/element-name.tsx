import {PropValue, VUtils} from '@rainbow-d9/n1';
import {UnwrappedInput} from '@rainbow-d9/n2';
import React, {ReactNode} from 'react';
import {
	ConfigurableElement,
	ConfigurableElementBadgeMissed,
	ConfigurableElementEditorProps
} from '../../../../edit-dialog';
import {HelpDocs} from '../../../../help-docs';
import {Labels} from '../../../../labels';
import {CommonStepDefModel} from '../types';

export const elementName: ConfigurableElement = {
	code: 'name', label: Labels.Name, anchor: 'name',
	badge: (model: CommonStepDefModel): ReactNode => {
		if (VUtils.isNotBlank(model.name)) {
			return model.name.trim();
		} else {
			return <ConfigurableElementBadgeMissed/>;
		}
	},
	editor: (props: ConfigurableElementEditorProps<CommonStepDefModel>) => {
		const {model, onValueChanged} = props;
		const onValueChange = (value: PropValue) => {
			model.name = value as string;
			onValueChanged();
		};
		return <UnwrappedInput onValueChange={onValueChange} value={model.name ?? ''}/>;
	},
	helpDoc: HelpDocs.stepName
};
