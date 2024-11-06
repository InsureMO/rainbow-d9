import {PropValue} from '@rainbow-d9/n1';
import {UnwrappedDropdown} from '@rainbow-d9/n2';
import React, {ReactNode} from 'react';
import {ConfigurableElement, ConfigurableElementBadgeMissed, ConfigurableElementEditorProps} from '../../edit-dialog';
import {HelpDocs} from '../../help-docs';
import {Labels} from '../../labels';
import {CommonElementEditorStyles} from '../common';
import {elementAuthorizations} from './element-authorizations';
import {elementInitOnly} from './element-init-only';
import {elementRequest} from './element-request';
import {elementResponse} from './element-response';
import {elementRoute} from './element-route';
import {ANCHOR_TYPE} from './helper';
import {FileDefModel, PipelineFileDefModel} from './types';

export const elementType: ConfigurableElement = {
	code: 'type', label: Labels.Type, anchor: ANCHOR_TYPE,
	badge: (model: FileDefModel): ReactNode => {
		switch (true) {
			case model.type === 'pipeline' && (model as PipelineFileDefModel).api === true:
				return Labels.PipelineTypeApi;
			case  model.type === 'pipeline':
				return Labels.PipelineTypePipeline;
			case model.type === 'step-sets':
				return Labels.PipelineTypeStepSet;
			case model.type === 'step':
				return Labels.PipelineTypeStep;
			default:
				return <ConfigurableElementBadgeMissed/>;
		}
	},
	editor: (props: ConfigurableElementEditorProps<FileDefModel>) => {
		const {model, onValueChanged} = props;
		const onValueChange = (value: PropValue) => {
			if (value === 'api') {
				model.type = 'pipeline';
				(model as PipelineFileDefModel).api = true;
			} else if (value === 'pipeline') {
				model.type = 'pipeline';
				(model as PipelineFileDefModel).api = false;
			} else {
				model.type = value as 'step-sets' | 'step';
				delete (model as PipelineFileDefModel).api;
			}
			onValueChanged();
		};
		const value = ((model as PipelineFileDefModel).api === true ? 'api' : model.type) ?? 'pipeline';
		const options = [
			{value: 'pipeline', label: Labels.PipelineTypePipeline},
			{value: 'api', label: Labels.PipelineTypeApi},
			{value: 'step-sets', label: Labels.PipelineTypeStepSet},
			{value: 'step', label: Labels.PipelineTypeStep}
		];
		return <UnwrappedDropdown value={value} onValueChange={onValueChange} options={options}
		                          clearable={false} style={CommonElementEditorStyles.dropdown}/>;
	},
	helpDoc: HelpDocs.pipelineType,
	children: [elementInitOnly, elementRoute, elementAuthorizations, elementRequest, elementResponse]
};
