import {PropValue} from '@rainbow-d9/n1';
import {OptionItemSort, UnwrappedDropdown} from '@rainbow-d9/n2';
import React, {ReactNode} from 'react';
import {ConfigurableElement, ConfigurableElementEditorProps} from '../../../../edit-dialog';
import {HelpDocs} from '../../../../help-docs';
import {askUseLabel, askUseStringifyText, Labels} from '../../../../labels';
import {AllStepDefsAsArray, findStepDef} from '../../all-step-defs';
import {CommonStepDefModel} from '../types';

export const elementUse: ConfigurableElement = {
	code: 'type', label: Labels.Use, anchor: 'use',
	badge: (model: CommonStepDefModel): ReactNode => askUseLabel(model.use),
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
		const options = AllStepDefsAsArray().map(def => {
			return {value: def.use, label: askUseLabel(def.use), stringify: () => askUseStringifyText(def.use)};
		});
		return <UnwrappedDropdown value={value} onValueChange={onValueChange} options={options}
		                          optionSort={OptionItemSort.ASC} clearable={false}
		                          style={{justifySelf: 'start', width: 'unset', minWidth: 'min(200px, 100%)'}}/>;
	},
	helpDoc: HelpDocs.stepUse
};
