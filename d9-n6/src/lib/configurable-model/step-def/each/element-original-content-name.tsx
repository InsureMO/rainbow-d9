import {PropValue, VUtils} from '@rainbow-d9/n1';
import {UnwrappedInput} from '@rainbow-d9/n2';
import React, {ReactNode} from 'react';
import {
	ConfigurableElement,
	ConfigurableElementBadgeChecked,
	ConfigurableElementBadgeUseDefault,
	ConfigurableElementEditorProps
} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {EachStepDefModel} from './types';

export const elementOriginalContentName: ConfigurableElement = {
	code: 'original-content-name', label: Labels.StepEachOriginalContentName, anchor: 'original-content-name',
	badge: (model: EachStepDefModel): ReactNode => {
		if (VUtils.isNotBlank(model.originalContentName)) {
			return <ConfigurableElementBadgeChecked/>;
		} else {
			return <ConfigurableElementBadgeUseDefault/>;
		}
	},
	editor: (props: ConfigurableElementEditorProps<EachStepDefModel>) => {
		const {model, onValueChanged} = props;
		const onValueChange = (value: PropValue) => {
			model.originalContentName = value as string;
			onValueChanged();
		};
		return <UnwrappedInput onValueChange={onValueChange} value={model.originalContentName ?? ''}
		                       placeholder="$content"/>;
	},
	helpDoc: HelpDocs.stepEachOriginalContentName
};
