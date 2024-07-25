import {VUtils} from '@rainbow-d9/n1';
import React, {ReactNode} from 'react';
import {
	ConfigurableElement,
	ConfigurableElementBadgeChecked,
	ConfigurableElementBadgeIgnored,
	ConfigurableElementEditorProps
} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {PlaygroundCssVars} from '../../../widgets';
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
	badge: (model: ParallelStepDefModel): ReactNode => {
		if (VUtils.isNotBlank(model.snippet)) {
			return <ConfigurableElementBadgeChecked/>;
		} else {
			return <ConfigurableElementBadgeIgnored/>;
		}
	},
	editor: SnippetEditor,
	helpDoc: HelpDocs.stepParallelCloneData
};
