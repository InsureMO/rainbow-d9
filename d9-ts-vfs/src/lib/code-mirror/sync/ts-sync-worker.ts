/** copy from @valtown/codemirror-ts */
import {Extension} from '@codemirror/state';
import {EditorView, ViewUpdate} from '@codemirror/view';
import {tsFacetWorker} from '../index.js';

/**
 * Sync updates from CodeMirror to the worker.
 */
export const tsSyncWorker = (): Extension => {
	// TODO: this is a weak solution to the cold start problem.
	// If you boot up a CodeMirror instance, we want the initial
	// value to get loaded into CodeMirror. We do get a change event,
	// but it surprisingly doesn't have `docChanged: true` on it,
	// so this is a rough heuristic to just accept the first event
	// regardless of whether it looks significant.
	let first = true;
	return EditorView.updateListener.of(async (update: ViewUpdate) => {
		const config = update.view.state.facet(tsFacetWorker);
		if (!config) {
			return;
		}
		if (!update.docChanged && !first) {
			return;
		}
		first = false;

		await config.worker.updateFile({
			path: config.path,
			code: update.state.doc.toString()
		});
	});
};