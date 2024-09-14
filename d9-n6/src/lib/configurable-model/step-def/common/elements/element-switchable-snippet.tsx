import React, {ReactNode} from 'react';
import {
	ConfigurableElement,
	ConfigurableElementBadgeNotAvailable,
	ConfigurableElementBadgeSnippet
} from '../../../../edit-dialog';
import {Labels} from '../../../../labels';
import {createSelectableSnippetEditor} from '../../../common';
import {CommonStepDefModel, SwitchableSnippetElementOptions} from '../types';

export const createSwitchableSnippetElement = <M extends CommonStepDefModel>(options: SwitchableSnippetElementOptions<M>): ConfigurableElement => {
	const {
		code, label, anchor,
		property, temporaryProperty,
		notAvailableBadge, ignoreCandidateLabel, extensionType, snippetHeight,
		helpDoc
	} = options;
	return {
		code, label, anchor,
		badge: (model: M): ReactNode => {
			// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if (model.temporary?.[temporaryProperty] === false) {
				return <ConfigurableElementBadgeSnippet/>;
			} else {
				return notAvailableBadge ?? <ConfigurableElementBadgeNotAvailable/>;
			}
		},
		editor: createSelectableSnippetEditor<M, boolean>({
			// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
			// @ts-ignore
			findFlag: (model) => model.temporary?.[temporaryProperty] ?? true,
			saveFlag: (model, value) => {
				model.temporary = {...(model.temporary ?? {}), [temporaryProperty]: value};
			},
			findSnippet: (model) => model[property],
			saveSnippet: (model, text) => {
				// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
				// @ts-ignore
				model[property] = text;
			},
			flagCandidates: [
				{value: true, label: ignoreCandidateLabel},
				{value: false, label: Labels.StepVariableUseSnippet}
			],
			isSnippetAvailable: (value) => value === false,
			extensionType,
			height: snippetHeight
		}),
		helpDoc
	};
};