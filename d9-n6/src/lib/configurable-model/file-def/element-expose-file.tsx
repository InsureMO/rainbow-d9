import {PropValue} from '@rainbow-d9/n1';
import {UnwrappedCheckbox} from '@rainbow-d9/n2';
import React, {ReactNode} from 'react';
import {
	ConfigurableElement,
	ConfigurableElementBadgeChecked,
	ConfigurableElementBadgeNotAvailable,
	ConfigurableElementEditorProps
} from '../../edit-dialog';
import {HelpDocs} from '../../help-docs';
import {PipelineFileDefModel} from './types';

export const elementExposeFile: ConfigurableElement = {
	code: 'exposeFile', label: 'Expose File', anchor: 'expose-file',
	badge: (model: PipelineFileDefModel): ReactNode => {
		if (model.exposeFile === true) {
			return <ConfigurableElementBadgeChecked/>;
		} else {
			return <ConfigurableElementBadgeNotAvailable/>;
		}
	},
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
