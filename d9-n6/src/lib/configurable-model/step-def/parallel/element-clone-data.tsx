import {VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {ConfigurableElement, ConfigurableElementEditorProps} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {PlaygroundCssVars} from '../../../widgets';
import {createCheckOrIgnoreBadge} from '../../common';
import {JsEditor} from '../../js-editor';
import {ParallelStepDefModel} from './types';

const SnippetEditor = (props: ConfigurableElementEditorProps<ParallelStepDefModel>) => {
	const {model, onValueChanged} = props;

	const onValueChange = async (snippet: string) => {
		model.cloneData = snippet;
		onValueChanged(false);
	};
	return <JsEditor snippet={model.snippet} onChange={onValueChange} height={PlaygroundCssVars.SNIPPET_HEIGHT}/>;
};
export const elementCloneData: ConfigurableElement = {
	code: 'clone-data', label: Labels.StepParallelCloneData, anchor: 'clone-data',
	badge: createCheckOrIgnoreBadge({check: (model: ParallelStepDefModel) => VUtils.isNotBlank(model.snippet)}),
	editor: SnippetEditor,
	helpDoc: HelpDocs.stepParallelCloneData
};
