import {EditorView, ViewUpdate} from '@codemirror/view';
import {OnValueChange, useThrottler} from '@rainbow-d9/n1';
import {useGlobalHandlers} from '@rainbow-d9/n2';
import {useEffect} from 'react';
import {CodeEditorState} from './types';

export interface UseHandleCodeChangeOptions extends CodeEditorState {
	onChange: OnValueChange;
	delay?: number;
}

export const useHandleCodeChange = (options: UseHandleCodeChangeOptions) => {
	const {editor, changeListener, onChange, delay = 300} = options;

	const globalHandlers = useGlobalHandlers();
	const {replace} = useThrottler();
	useEffect(() => {
		if (editor == null) {
			return;
		}
		editor.dispatch({
			effects: changeListener.reconfigure(EditorView.updateListener.of((view: ViewUpdate) => {
				if (view.docChanged) {
					replace(async () => {
						await onChange(view.state.doc.toString(), false, {global: globalHandlers});
					}, delay);
				}
			}))
		});
	}, [replace, editor, changeListener, onChange, delay, globalHandlers]);
};