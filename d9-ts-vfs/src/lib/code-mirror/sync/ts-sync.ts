/** copy from @valtown/codemirror-ts */
import {Extension} from '@codemirror/state';
import {EditorView, ViewUpdate} from '@codemirror/view';
import {tsFacet} from '../facet';
import {createOrUpdateFile} from './update';

/**
 * Sync updates from CodeMirror to the TypeScript
 * virtual environment. Note that this updates a file - it isn't
 * responsible (yet) for deleting or renaming files if they
 * do get deleted or renamed.
 */
export const tsSync = (): Extension => {
	// TODO: this is a weak solution to the cold start problem.
	// If you boot up a CodeMirror instance, we want the initial
	// value to get loaded into CodeMirror. We do get a change event,
	// but it surprisingly doesn't have `docChanged: true` on it,
	// so this is a rough heuristic to just accept the first event
	// regardless of whether it looks significant.
	let first = true;
	return EditorView.updateListener.of((update: ViewUpdate) => {
		const config = update.view.state.facet(tsFacet);
		if (!config) {
			return;
		}
		if (!update.docChanged && !first) {
			return;
		}
		first = false;
		createOrUpdateFile(config.env, config.path, update.state.doc.toString() || ' ');
	});
};