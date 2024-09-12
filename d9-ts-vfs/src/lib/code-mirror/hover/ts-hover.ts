/** copy from @valtown/codemirror-ts */
import {Extension} from '@codemirror/state';
import {EditorView, hoverTooltip, Tooltip} from '@codemirror/view';
import {tsFacet} from '../facet';
import {getHover} from './get-hover';
import {defaultRenderer, TooltipRenderer} from './render-tooltip';

export interface TsHoverOptions {
	renderTooltip?: TooltipRenderer;
}

/**
 * This binds the CodeMirror `hoverTooltip` method
 * with a code that pulls types and documentation
 * from the TypeScript environment.
 */
export const tsHover = (options?: TsHoverOptions): Extension => {
	const {renderTooltip = defaultRenderer} = options || {};

	return hoverTooltip(async (view: EditorView, pos: number): Promise<Tooltip | null> => {
		const config = view.state.facet(tsFacet);
		if (!config) {
			return null;
		}

		const hoverData = getHover({...config, pos});

		if (!hoverData) {
			return null;
		} else {
			return {
				pos: hoverData.start, end: hoverData.end,
				create: () => renderTooltip(hoverData, view)
			};
		}
	});
};