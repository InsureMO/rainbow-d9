import {Compartment} from '@codemirror/state';
import {EditorView} from '@codemirror/view';

export interface CodeEditorState {
	editor?: EditorView;
	changeListener?: Compartment;
}
