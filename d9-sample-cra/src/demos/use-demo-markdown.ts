import {MarkdownContent, parseDoc} from '@rainbow-d9/n3';
import {useEffect, useState} from 'react';

export const useDemoMarkdown = (markdown: MarkdownContent) => {
	const [state, setState] = useState(() => {
		const def = parseDoc(markdown).node;
		return {def, markdown};
	});
	useEffect(() => {
		if (markdown === state.markdown) {
			return;
		}
		setState({def: parseDoc(markdown).node, markdown});
	}, [markdown, state.markdown]);

	return state.def;
};