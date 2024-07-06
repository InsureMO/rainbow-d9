import {VUtils} from '@rainbow-d9/n1';
import React, {ReactNode} from 'react';
import {
	ConfigurableElement,
	ConfigurableElementBadgeChecked,
	ConfigurableElementBadgeMissed,
	ConfigurableElementEditorProps
} from '../../../edit-dialog';
import {HelpDocs} from '../../../help-docs';
import {Labels} from '../../../labels';
import {PlaygroundCssVars} from '../../../widgets';
import {JsEditor} from '../../js-editor';
import {VerticalLinesEditor} from '../../vertical-lines-editor';
import {SnippetStepDefModel} from './types';

const SnippetEditor = (props: ConfigurableElementEditorProps<SnippetStepDefModel>) => {
	const {model, onValueChanged} = props;

	const onValueChange = async (snippet: string) => {
		model.snippet = snippet;
		onValueChanged(false);
	};
	return <VerticalLinesEditor>
		<JsEditor snippet={model.snippet} onChange={onValueChange} height={PlaygroundCssVars.SNIPPET_HEIGHT}/>
	</VerticalLinesEditor>;
};
export const elementSnippet: ConfigurableElement = {
	code: 'snippet', label: Labels.StepSnippetSnippet, anchor: 'snippet',
	badge: (model: SnippetStepDefModel): ReactNode => {
		if (VUtils.isNotBlank(model.snippet)) {
			return <ConfigurableElementBadgeChecked/>;
		} else {
			return <ConfigurableElementBadgeMissed/>;
		}
	},
	editor: SnippetEditor,
	helpDoc: HelpDocs.stepSnippetSnippet
};
