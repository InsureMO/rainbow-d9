/** copy from @valtown/codemirror-ts */
import {EditorView, TooltipView} from '@codemirror/view';
import {HoverInfo} from './get-hover';

export type TooltipRenderer = (hoverInfo: HoverInfo, editorView: EditorView) => TooltipView;

/**
 * Default, barebones tooltip renderer. Generates
 * structure of a div, containing a series of
 * span elements with the typescript `kind` as
 * classes.
 */
export const defaultRenderer: TooltipRenderer = (info: HoverInfo) => {
	const div = document.createElement('div');
	if (info.quickInfo?.displayParts) {
		for (const part of info.quickInfo.displayParts) {
			const span = div.appendChild(document.createElement('span'));
			span.className = `quick-info-${part.kind}`;
			span.innerText = part.text;
		}
	}
	return {dom: div};
};
