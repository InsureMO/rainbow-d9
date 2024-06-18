import {PropValue, VUtils} from '@rainbow-d9/n1';
import {UnwrappedDropdown} from '@rainbow-d9/n2';
import React, {ReactNode} from 'react';
import {ConfigurableElement, ConfigurableElementBadgeMissed, ConfigurableElementEditorProps} from '../../edit-dialog';
import {HelpDocs} from '../../help-docs';
import {Labels} from '../../labels';
import {PipelineFileDefModel} from './types';

export const elementMethod: ConfigurableElement = {
	code: 'method', label: Labels.ApiMethodLabel, anchor: 'method',
	badge: (model: PipelineFileDefModel): ReactNode => {
		if (VUtils.isNotBlank(model.method)) {
			return model.method.trim().toUpperCase();
		} else {
			return <ConfigurableElementBadgeMissed/>;
		}
	},
	editor: (props: ConfigurableElementEditorProps<PipelineFileDefModel>) => {
		const {model, onValueChanged} = props;
		const onValueChange = (value: PropValue) => {
			model.method = value as PipelineFileDefModel['method'];
			onValueChanged();
		};
		const options = [
			{value: 'get', label: 'GET'},
			{value: 'post', label: 'POST'},
			{value: 'put', label: 'PUT'},
			{value: 'delete', label: 'DELETE'},
			{value: 'patch', label: 'PATCH'}
		];
		return <UnwrappedDropdown value={model.method ?? ''} onValueChange={onValueChange} options={options}
		                          clearable={false}
		                          style={{justifySelf: 'start', width: 'unset', minWidth: 'min(200px, 100%)'}}/>;
	},
	helpDoc: HelpDocs.pipelineMethod
};
