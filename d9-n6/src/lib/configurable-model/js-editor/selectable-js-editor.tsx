import {PropValue} from '@rainbow-d9/n1';
import {DropdownOptions, UnwrappedDropdown} from '@rainbow-d9/n2';
import React from 'react';
import {ConfigurableElementEditorProps} from '../../edit-dialog';
import {CommonElementEditorStyles} from '../styles';
import {VerticalLinesEditor} from '../vertical-lines-editor';
import {JsEditor} from './editor';

export interface SelectableJsEditorOptions<M, FV> {
	findFlag: (model: M) => FV;
	saveFlag: (model: M, value: FV) => void;
	findSnippet: (model: M) => string;
	saveSnippet: (model: M, value: string) => void;
	flagCandidates: DropdownOptions;
	isSnippetAvailable: (value: FV) => boolean;
	height?: number | string;
}

export const createSelectableJsEditor = <M, FV>(options: SelectableJsEditorOptions<M, FV>) => {
	const {
		findFlag, saveFlag, findSnippet, saveSnippet,
		flagCandidates, isSnippetAvailable, height: editorHeight
	} = options;

	return (props: ConfigurableElementEditorProps<M>) => {

		const {model, onValueChanged} = props;
		const onValueChange = (value: PropValue) => {
			saveFlag(model, value as FV);
			onValueChanged();
		};
		const onSnippetChange = async (snippet: string) => {
			saveSnippet(model, snippet);
			// no need to repaint
			onValueChanged(false);
		};
		const flag = findFlag(model);
		const snippet = findSnippet(model);

		return <VerticalLinesEditor>
			{// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				/** @ts-ignore */}
			<UnwrappedDropdown value={flag}
			                   onValueChange={onValueChange} options={flagCandidates}
			                   clearable={false} filterable={false} style={CommonElementEditorStyles.dropdown}/>
			<JsEditor snippet={snippet} onChange={onSnippetChange}
			          visible={isSnippetAvailable(flag)} height={editorHeight}/>
		</VerticalLinesEditor>;
	};
};
