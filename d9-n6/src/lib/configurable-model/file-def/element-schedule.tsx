import {PropValue, VUtils} from '@rainbow-d9/n1';
import {UnwrappedInput} from '@rainbow-d9/n2';
import React from 'react';
import {ConfigurableElement, ConfigurableElementEditorProps} from '../../edit-dialog';
import {HelpDocs} from '../../help-docs';
import {Labels} from '../../labels';
import {createCheckOrBanBadge} from '../common';
import {ANCHOR_INIT_ONLY, ANCHOR_SCHEDULE, ANCHOR_TYPE, visibleOnNotApi} from './helper';
import {PipelineFileDefModel} from './types';

export const elementSchedule: ConfigurableElement = {
	code: ANCHOR_SCHEDULE, label: Labels.ScheduleLabel, anchor: ANCHOR_SCHEDULE,
	badge: createCheckOrBanBadge({check: (model: PipelineFileDefModel) => model.initOnly !== true && VUtils.isNotBlank(model.schedule)}),
	visibleOn: [ANCHOR_TYPE], visible: visibleOnNotApi,
	changeBy: [ANCHOR_INIT_ONLY],
	editor: (props: ConfigurableElementEditorProps<PipelineFileDefModel>) => {
		const {model, onValueChanged} = props;
		const onValueChange = (value: PropValue) => {
			model.schedule = value as string;
			onValueChanged();
		};
		const disabled = model.initOnly === true;
		return <UnwrappedInput onValueChange={onValueChange} value={model.schedule ?? ''} disabled={disabled}/>;
	},
	helpDoc: HelpDocs.pipelineSchedule
};
