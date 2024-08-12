import {PropValue} from '@rainbow-d9/n1';
import {UnwrappedCheckbox} from '@rainbow-d9/n2';
import React from 'react';
import {ConfigurableElement, ConfigurableElementEditorProps} from '../../edit-dialog';
import {HelpDocs} from '../../help-docs';
import {Labels} from '../../labels';
import {createCheckOrBanBadge} from '../common';
import {FileDefModel} from './types';

export const elementEnabled: ConfigurableElement = {
	code: 'enabled', label: Labels.Enabled, anchor: 'enabled',
	badge: createCheckOrBanBadge({check: (model: FileDefModel) => model.enabled !== false}),
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
