import {EditorView} from '@codemirror/view';
import {useEffect} from 'react';

export interface UseInitCodeContentOptions {
	editor?: EditorView;
	content: string;
}

export const useInitCodeContent = (options: UseInitCodeContentOptions) => {
	const {editor, content} = options;

	useEffect(() => {
		if (editor == null) {
			return;
		}
		const doc = editor.state.doc;
		const text = doc.toString();
		if (text !== content) {
			editor.dispatch({changes: {from: 0, to: doc.length, insert: content ?? ''}});
		}
	}, [editor, content]);
};