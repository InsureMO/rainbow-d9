import {PropValue} from '@rainbow-d9/n1';
import {UnwrappedDropdown} from '@rainbow-d9/n2';
import React from 'react';
import {ConfigurableElement, ConfigurableElementEditorProps} from '../../edit-dialog';
import {HelpDocs} from '../../help-docs';
import {Labels} from '../../labels';
import {createCheckOrIgnoreBadge} from '../common';
import {CommonElementEditorStyles} from '../styles';
import {PipelineFileDefModel} from './types';

const ParseIgnoredOrDefaultOptions = [
	{value: 'default', label: Labels.BodyFollowHttpMethod},
	{value: 'ignored', label: Labels.Ignored},
	{value: 'parse', label: Labels.ParseBody}
];

export const elementBody: ConfigurableElement = {
	code: 'body', label: Labels.ApiBodyLabel, anchor: 'body',
	badge: createCheckOrIgnoreBadge({check: (model: PipelineFileDefModel) => model.body === true}),
	editor: (props: ConfigurableElementEditorProps<PipelineFileDefModel>) => {
		const {model, onValueChanged} = props;
		const onValueChange = (value: PropValue) => {
			if (value === 'default') {
				delete model.body;
			} else {
				model.body = value !== 'ignored';
			}
			onValueChanged();
		};
		const value = model.body == null ? 'default' : model.body ? 'parse' : 'ignored';

		return <UnwrappedDropdown value={value} onValueChange={onValueChange} options={ParseIgnoredOrDefaultOptions}
		                          clearable={false} style={CommonElementEditorStyles.dropdown}/>;
	},
	helpDoc: HelpDocs.pipelineBody
};
