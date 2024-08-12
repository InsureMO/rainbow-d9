import {PropValue} from '@rainbow-d9/n1';
import {UnwrappedCheckbox} from '@rainbow-d9/n2';
import React from 'react';
import {ConfigurableElement, ConfigurableElementEditorProps} from '../../edit-dialog';
import {HelpDocs} from '../../help-docs';
import {Labels} from '../../labels';
import {createCheckOrNotAvailableBadge} from '../common';
import {PipelineFileDefModel} from './types';

export const elementExposeFile: ConfigurableElement = {
	code: 'exposeFile', label: Labels.ApiExposeFileLabel, anchor: 'expose-file',
	badge: createCheckOrNotAvailableBadge({check: (model: PipelineFileDefModel) => model.exposeFile === true}),
	editor: (props: ConfigurableElementEditorProps<PipelineFileDefModel>) => {
		const {model, onValueChanged} = props;
		const onValueChange = (value: PropValue) => {
			model.exposeFile = value as boolean;
			onValueChanged();
		};
		return <UnwrappedCheckbox onValueChange={onValueChange} value={model.exposeFile ?? false}/>;
	},
	helpDoc: HelpDocs.pipelineExposeFile
};
