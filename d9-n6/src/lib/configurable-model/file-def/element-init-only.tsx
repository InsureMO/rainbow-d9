import {PropValue} from '@rainbow-d9/n1';
import {UnwrappedCheckbox} from '@rainbow-d9/n2';
import React from 'react';
import {
	ConfigurableElement,
	ConfigurableElementEditorProps,
	EditDialogEventTypes,
	useEditDialogEventBus
} from '../../edit-dialog';
import {HelpDocs} from '../../help-docs';
import {Labels} from '../../labels';
import {createCheckOrBanBadge} from '../common';
import {ANCHOR_INIT_ONLY, ANCHOR_SCHEDULE, ANCHOR_TYPE, visibleOnNotApi} from './helper';
import {PipelineFileDefModel} from './types';

const InitOnlyEditor = (props: ConfigurableElementEditorProps<PipelineFileDefModel>) => {
	const {model, onValueChanged} = props;
	const {fire} = useEditDialogEventBus();
	const onValueChange = (value: PropValue) => {
		model.initOnly = value as boolean;
		fire(EditDialogEventTypes.ELEMENT_VALUE_CHANGED, ANCHOR_SCHEDULE);
		onValueChanged();
	};
	return <UnwrappedCheckbox onValueChange={onValueChange} value={model.initOnly ?? false}/>;
};
export const elementInitOnly: ConfigurableElement = {
	code: ANCHOR_INIT_ONLY, label: Labels.ExecuteOnInitLabel, anchor: ANCHOR_INIT_ONLY,
	badge: createCheckOrBanBadge({check: (model: PipelineFileDefModel) => model.initOnly === true}),
	visibleOn: [ANCHOR_TYPE], visible: visibleOnNotApi,
	editor: InitOnlyEditor,
	helpDoc: HelpDocs.pipelineInitOnly
};
