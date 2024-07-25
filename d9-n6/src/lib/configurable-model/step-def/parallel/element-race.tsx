import {PropValue} from '@rainbow-d9/n1';
import {UnwrappedCheckbox} from '@rainbow-d9/n2';
import React, {ReactNode} from 'react';
import {
	ConfigurableElement,
	ConfigurableElementBadgeNo,
	ConfigurableElementBadgeYes,
	ConfigurableElementEditorProps
} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {ParallelStepDefModel} from './types';

export const elementRace: ConfigurableElement = {
	code: 'race', label: Labels.StepParallelRace, anchor: 'race',
	badge: (model: ParallelStepDefModel): ReactNode => {
		if (model.race == null || model.race === false) {
			return <ConfigurableElementBadgeNo/>;
		} else {
			return <ConfigurableElementBadgeYes/>;
		}
	},
	editor: (props: ConfigurableElementEditorProps<ParallelStepDefModel>) => {
		const {model, onValueChanged} = props;
		const onValueChange = (value: PropValue) => {
			if (value == null || value === false) {
				delete model.race;
			} else {
				model.race = true;
			}
			onValueChanged();
		};
		return <UnwrappedCheckbox onValueChange={onValueChange} value={model.race ?? false}/>;
	},
	helpDoc: HelpDocs.stepParallelRace
};
