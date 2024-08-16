import {PropValue} from '@rainbow-d9/n1';
import {DropdownOptions, UnwrappedDropdown} from '@rainbow-d9/n2';
import React, {FC} from 'react';
import {ConfigurableElementEditorProps} from '../../../edit-dialog';
import {JsEditor} from '../js-editor';
import {SqlEditor} from '../sql-editor';
import {CommonElementEditorStyles} from '../styles';
import {VerticalLinesEditor} from '../vertical-lines-editor';

export interface SelectableCodeEditorProps {
	visible?: boolean;
	height?: number | string;
	snippet?: string;
	onChange: (snippet: string) => Promise<void>;
}

export type SelectableCodeEditor = FC<SelectableCodeEditorProps>;

export interface SelectableCodeEditorOptions<M, FV> {
	findFlag: (model: M) => FV;
	saveFlag: (model: M, value: FV) => void;
	findSnippet: (model: M) => string;
	saveSnippet: (model: M, value: string) => void;
	flagCandidates: DropdownOptions;
	isSnippetAvailable: (value: FV) => boolean;
	height?: number | string;
	editor: SelectableCodeEditor;
}

export const createSelectableCodeEditor = <M, FV>(options: SelectableCodeEditorOptions<M, FV>) => {
	const {
		findFlag, saveFlag, findSnippet, saveSnippet,
		flagCandidates, isSnippetAvailable, height: editorHeight,
		editor: CodeEditor
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
			<CodeEditor snippet={snippet} onChange={onSnippetChange}
			            visible={isSnippetAvailable(flag)} height={editorHeight}/>
		</VerticalLinesEditor>;
	};
};

export const createSelectableSnippetEditor = <M, FV>(options: Omit<SelectableCodeEditorOptions<M, FV>, 'editor'>) => {
	return createSelectableCodeEditor({...options, editor: JsEditor});
};
export const createSelectableSqlEditor = <M, FV>(options: Omit<SelectableCodeEditorOptions<M, FV>, 'editor'>) => {
	return createSelectableCodeEditor({...options, editor: SqlEditor});
};
