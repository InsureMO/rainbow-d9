import {PropValue} from '@rainbow-d9/n1';
import {UnwrappedCheckbox} from '@rainbow-d9/n2';
import React from 'react';
import {ConfigurableElement, ConfigurableElementEditorProps} from '../../edit-dialog';
import {HelpDocs} from '../../help-docs';
import {Labels} from '../../labels';
import {createCheckOrBanBadge} from '../common';
import {ANCHOR_TYPE, visibleOnNotApi} from './helper';
import {PipelineFileDefModel} from './types';

export const elementInitOnly: ConfigurableElement = {
	code: 'initOnly', label: Labels.ExecuteOnInitLabel, anchor: 'initOnly',
	badge: createCheckOrBanBadge({check: (model: PipelineFileDefModel) => model.initOnly === true}),
	visibleOn: [ANCHOR_TYPE], visible: visibleOnNotApi,
	editor: (props: ConfigurableElementEditorProps<PipelineFileDefModel>) => {
		const {model, onValueChanged} = props;
		const onValueChange = (value: PropValue) => {
			model.initOnly = value as boolean;
			onValueChanged();
		};
		return <UnwrappedCheckbox onValueChange={onValueChange} value={model.initOnly ?? false}/>;
	},
	helpDoc: HelpDocs.pipelineInitOnly
};
