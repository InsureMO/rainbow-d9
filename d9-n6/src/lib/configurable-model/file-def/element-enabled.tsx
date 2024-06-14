import {PropValue} from '@rainbow-d9/n1';
import {UnwrappedCheckbox} from '@rainbow-d9/n2';
import React from 'react';
import {
	ConfigurableElement,
	ConfigurableElementBadgeBanned,
	ConfigurableElementBadgeChecked,
	ConfigurableElementEditorProps
} from '../../edit-dialog';
import {HelpDocs} from '../../help-docs';
import {FileDefModel} from './types';

export const elementEnabled: ConfigurableElement = {
	code: 'enabled', label: 'Enabled', anchor: 'enabled',
	badge: model => model.enabled !== false
		? <ConfigurableElementBadgeChecked/>
		: <ConfigurableElementBadgeBanned/>,
	editor: (props: ConfigurableElementEditorProps<FileDefModel>) => {
		const {model, onValueChanged} = props;
		const onValueChange = (value: PropValue) => {
			model.enabled = value as boolean;
			onValueChanged();
		};
		return <UnwrappedCheckbox onValueChange={onValueChange} value={model.enabled ?? true}/>;
	},
	helpDoc: HelpDocs.pipelineEnabled
};
