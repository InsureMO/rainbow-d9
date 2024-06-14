import {PropValue, VUtils} from '@rainbow-d9/n1';
import {UnwrappedInput} from '@rainbow-d9/n2';
import React, {ReactNode} from 'react';
import {ConfigurableElement, ConfigurableElementBadgeMissed, ConfigurableElementEditorProps} from '../../edit-dialog';
import {HelpDocs} from '../../help-docs';
import {FileDefModel} from './types';

export const elementCode: ConfigurableElement = {
	code: 'code', label: 'Code', anchor: 'code',
	badge: (model: FileDefModel): ReactNode => {
		if (VUtils.isNotBlank(model.code)) {
			return model.code.trim();
		} else {
			return <ConfigurableElementBadgeMissed/>;
		}
	},
	editor: (props: ConfigurableElementEditorProps<FileDefModel>) => {
		const {model, onValueChanged} = props;
		const onValueChange = (value: PropValue) => {
			model.code = value as string;
			onValueChanged();
		};
		return <UnwrappedInput onValueChange={onValueChange} value={model.code ?? ''}/>;
	},
	helpDoc: HelpDocs.pipelineCode
};
