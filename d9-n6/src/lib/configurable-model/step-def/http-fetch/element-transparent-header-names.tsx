import React from 'react';
import {ConfigurableElement} from '../../../edit-dialog';
import {NavigatorElementBadgeWrapper} from '../../../edit-dialog/widgets';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {createStrEditor, createValueOrAnotherBadge} from '../../common';
import {HttpStepDefModel} from './types';

export const elementTransparentHeaderNames: ConfigurableElement = {
	code: 'transparent-header-names', label: Labels.StepHttpTransparentHeaderNames, anchor: 'transparent-header-names',
	badge: createValueOrAnotherBadge<HttpStepDefModel>({
		check: model => {
			if (model.transparentHeaderNames == null) {
				return false;
			} else if (Array.isArray(model.transparentHeaderNames)) {
				return model.transparentHeaderNames.filter(name => name != null && name.trim().length !== 0).join('; ').length !== 0;
			} else {
				return model.transparentHeaderNames.trim().length !== 0;
			}
		},
		one: () => <NavigatorElementBadgeWrapper data-role="checked">
			{Labels.BadgeChecked}
		</NavigatorElementBadgeWrapper>,
		another: <NavigatorElementBadgeWrapper data-role="ignored">
			{Labels.Ignored}
		</NavigatorElementBadgeWrapper>
	}),
	editor: createStrEditor<HttpStepDefModel>({
		getValue: model => {
			if (model.transparentHeaderNames == null) {
				return '';
			} else if (Array.isArray(model.transparentHeaderNames)) {
				return model.transparentHeaderNames.filter(name => name != null && name.trim().length !== 0).join('; ');
			} else {
				return model.transparentHeaderNames.trim();
			}
		},
		setValue: (model, value) => {
			value = value ?? '';
			if (value.trim().length === 0) {
				delete model.transparentHeaderNames;
			} else if (value.indexOf(';') !== 0) {
				const values = value.split(';').map(v => v.trim()).filter(v => v.length !== 0);
				if (values.length === 0) {
					delete model.transparentHeaderNames;
				} else {
					model.transparentHeaderNames = values.join('; ');
				}
			} else {
				model.transparentHeaderNames = value;
			}
		}
	}),
	helpDoc: HelpDocs.stepHttpTransparentHeaderNames
};
