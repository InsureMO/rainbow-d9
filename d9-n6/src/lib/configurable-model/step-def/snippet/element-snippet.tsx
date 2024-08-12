import {VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {ConfigurableElement, ConfigurableElementEditorProps} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {PlaygroundCssVars} from '../../../widgets';
import {createCheckOrMissBadge} from '../../common';
import {JsEditor} from '../../js-editor';
import {SnippetStepDefModel} from './types';

const SnippetEditor = (props: ConfigurableElementEditorProps<SnippetStepDefModel>) => {
	const {model, onValueChanged} = props;

	const onValueChange = async (snippet: string) => {
		model.snippet = snippet;
		onValueChanged(false);
	};
	return <JsEditor snippet={model.snippet} onChange={onValueChange} height={PlaygroundCssVars.SNIPPET_HEIGHT}/>;
};
export const elementSnippet: ConfigurableElement = {
	code: 'snippet', label: Labels.StepSnippetSnippet, anchor: 'snippet',
	badge: createCheckOrMissBadge({check: (model: SnippetStepDefModel) => VUtils.isNotBlank(model.snippet)}),
	editor: SnippetEditor,
	helpDoc: HelpDocs.stepSnippetSnippet
};
