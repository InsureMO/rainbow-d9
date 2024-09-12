/** copy from @valtown/codemirror-ts */
import {Extension} from '@codemirror/state';
import {EditorView, hoverTooltip, Tooltip} from '@codemirror/view';
import {tsFacetWorker} from '../facet';
import {defaultRenderer} from './render-tooltip';
import {TsHoverOptions} from './ts-hover';

/**
 * This binds the CodeMirror `hoverTooltip` method
 * with a code that pulls types and documentation
 * from the TypeScript environment.
 */
export const tsHoverWorker = (options: TsHoverOptions): Extension => {
	const {renderTooltip = defaultRenderer} = options || {};

	return hoverTooltip(async (view: EditorView, pos: number): Promise<Tooltip | null> => {
		const config = view.state.facet(tsFacetWorker);
		if (!config) {
			return null;
		}
		const hoverData = await config.worker.getHover({path: config.path, pos});

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