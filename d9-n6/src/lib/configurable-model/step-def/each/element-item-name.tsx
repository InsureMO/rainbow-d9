import {PropValue, VUtils} from '@rainbow-d9/n1';
import {UnwrappedInput} from '@rainbow-d9/n2';
import React from 'react';
import {ConfigurableElement, ConfigurableElementEditorProps} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {createCheckOrUseDefaultBadge} from '../../common';
import {EachStepDefModel} from './types';

export const elementItemName: ConfigurableElement = {
	code: 'item-name', label: Labels.StepEachItemName, anchor: 'item-name',
	badge: createCheckOrUseDefaultBadge({check: (model: EachStepDefModel) => VUtils.isNotBlank(model.itemName)}),
	editor: (props: ConfigurableElementEditorProps<EachStepDefModel>) => {
		const {model, onValueChanged} = props;
		const onValueChange = (value: PropValue) => {
			model.itemName = value as string;
			onValueChanged();
		};
		return <UnwrappedInput onValueChange={onValueChange} value={model.itemName ?? ''} placeholder="$item"/>;
	},
	helpDoc: HelpDocs.stepEachItemName
};
