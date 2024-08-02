import React, {ReactNode} from 'react';
import {ConfigurableElement, ConfigurableElementBadgeSnippet} from '../../../edit-dialog';
import {NavigatorElementBadgeWrapper} from '../../../edit-dialog/widgets';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {PlaygroundCssVars} from '../../../widgets';
import {createSelectableJsEditor} from '../../js-editor/selectable-js-editor';
import {HttpStepDefModel} from './types';

export const elementDecorateUrl: ConfigurableElement = {
	code: 'decorate-url', label: Labels.StepHttpDecorateUrl, anchor: 'decorate-url',
	badge: (model: HttpStepDefModel): ReactNode => {
		if (model.temporary?.decorateUrlAsIs === false) {
			return <ConfigurableElementBadgeSnippet/>;
		} else {
			return <NavigatorElementBadgeWrapper data-role="use-default">
				{Labels.NoDecoration}
			</NavigatorElementBadgeWrapper>;
		}
	},
	editor: createSelectableJsEditor<HttpStepDefModel, boolean>({
		findFlag: (model) => model.temporary?.decorateUrlAsIs ?? true,
		saveFlag: (model, value) => {
			model.temporary = {...(model.temporary ?? {}), decorateUrlAsIs: value};
		},
		findSnippet: (model) => model.decorateUrl,
		saveSnippet: (model, text) => {
			model.decorateUrl = text;
		},
		flagCandidates: [
			{value: true, label: Labels.NoDecoration},
			{value: false, label: Labels.StepVariableUseSnippet}
		],
		isSnippetAvailable: (value) => value === false,
		height: PlaygroundCssVars.SNIPPET_HTTP_DECORATE_URL_HEIGHT
	}),
	helpDoc: HelpDocs.stepHttpDecorateUrl
};