import {PropValue} from '@rainbow-d9/n1';
import {DropdownOptions, OptionItemSort, UnwrappedDropdown} from '@rainbow-d9/n2';
import React, {ReactNode} from 'react';
import {ConfigurableElement, ConfigurableElementEditorProps} from '../../../../edit-dialog';
import {HelpDocs} from '../../../../help-docs';
import {askUseBadge, askUseLabel, Labels} from '../../../../labels';
import {CommonElementEditorStyles} from '../../../common';
import {AllStepDefsAsArray, findStepDef} from '../../all-step-defs';
import {CommonStepDefModel} from '../types';

export const ELEMENT_ANCHOR_USE = 'use';
export const elementUse: ConfigurableElement = {
	code: ELEMENT_ANCHOR_USE, label: Labels.Use, anchor: ELEMENT_ANCHOR_USE,
	badge: (model: CommonStepDefModel): ReactNode => askUseBadge(model.use),
	editor: (props: ConfigurableElementEditorProps<CommonStepDefModel>) => {
		const {model, onValueChanged} = props;
		const onValueChange = (value: PropValue) => {
			const originalUse = model.use;
			if (originalUse === value) {
				return;
			}
			model.use = value as string;
			const def = findStepDef(model.use);
			def.switchUse(model, originalUse);
			onValueChanged();
		};
		const value = model.use;
		const options: DropdownOptions = AllStepDefsAsArray().map(def => {
			return {value: def.use, label: askUseLabel(def.use)};
		});
		return <UnwrappedDropdown value={value} onValueChange={onValueChange} options={options}
		                          optionSort={OptionItemSort.ASC}
		                          clearable={false} style={CommonElementEditorStyles.dropdown}/>;
	},
	helpDoc: HelpDocs.stepUse
};
