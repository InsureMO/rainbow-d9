import {NodeDef, registerWidget} from '@rainbow-d9/n1';
import {Widget} from '@rainbow-d9/n3';
import {JSX} from 'react';
import {JsEditor, TsEditor} from './code-editor';
import {CodeEditorDef} from './types';

export const CreateExtensionsDefsBuild = Widget.createSyncSnippetBuild<CodeEditorDef, 'createExtensions'>('createExtensions', []);
export const CreateThemeExtensionDefsBuild = Widget.createSyncSnippetBuild<CodeEditorDef, 'createThemeExtension'>('createThemeExtension', ['theme']);

export abstract class AbstractCodeEditorTranslator extends Widget.SpecificWidgetTranslator<string> {
	public beautifyProperties<Def extends NodeDef>(def: Partial<Def>): Def {
		return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
	}

	public shouldWrapByFormCell(): boolean {
		return false;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<Widget.AttributeValueBuild<any>> {
		return [
			CreateExtensionsDefsBuild, CreateThemeExtensionDefsBuild
		];
	}
}

export interface CodeEditorWidgetTypes {
	Javascript: string;
	Typescript: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const registerCodeEditor = (widgetHelper: Widget.WidgetHelper, widgetType: string, JSX: (props: any) => JSX.Element) => {
	registerWidget({key: widgetType, JSX, container: false, array: false});
	// n3 translator
	const TranslatorClass = class extends AbstractCodeEditorTranslator {
		public getSupportedType(): string {
			return widgetType;
		}
	};
	const repo = widgetHelper.repository;
	repo.register(new TranslatorClass(repo));
};
export const registerCodeEditors = (widgetHelper: Widget.WidgetHelper, widgetTypes?: CodeEditorWidgetTypes) => {
	registerCodeEditor(widgetHelper, widgetTypes?.Javascript || 'JS', JsEditor);
	registerCodeEditor(widgetHelper, widgetTypes?.Typescript || 'TS', TsEditor);
};
