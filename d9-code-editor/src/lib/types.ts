import {Compartment, Extension} from '@codemirror/state';
import {EditorView} from '@codemirror/view';
import {NodeDef, WidgetProps} from '@rainbow-d9/n1';
import {OmitHTMLProps, OmitNodeDef} from '@rainbow-d9/n2';

export type CodeEditorThemeCreate = (theme?: string) => Extension;
export type CodeEditorExtensionsCreate = () => Extension;

export type CodeEditorDef = NodeDef & OmitHTMLProps<HTMLDivElement> & {
	height?: number | string;
	// placeholder?: string;
	valueSyncDelay?: number;
	createExtensions?: CodeEditorExtensionsCreate;
	createThemeExtension?: CodeEditorThemeCreate;
}

export type CodeEditorProps = OmitNodeDef<CodeEditorDef> & WidgetProps;

export interface CodeEditorState {
	editor?: EditorView;
	changeListener?: Compartment;
	themeListener?: Compartment;
}

export interface JsEditorDef extends CodeEditorDef {
	// extensionType?: JsEditorExtensionType;
}

export interface JsEditorProps extends CodeEditorProps, OmitNodeDef<JsEditorDef> {
}
