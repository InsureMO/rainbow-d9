import {EditorView} from '@codemirror/view';
import {useEffect} from 'react';

export interface UseInitCodeContentOptions {
	editor?: EditorView;
	code: string;
}

export const useInitCodeContent = (options: UseInitCodeContentOptions) => {
	const {editor, code} = options;

	useEffect(() => {
		if (editor == null) {
			return;
		}
		const doc = editor.state.doc;
		const text = doc.toString();
		if (text !== code) {
			editor.dispatch({changes: {from: 0, to: doc.length, insert: code ?? ''}});
		}
	}, [editor, code]);
};