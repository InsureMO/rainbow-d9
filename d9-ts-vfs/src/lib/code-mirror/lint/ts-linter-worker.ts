import {Diagnostic, linter} from '@codemirror/lint';
import {EditorView} from '@codemirror/view';
import {tsFacetWorker} from '../index.js';
import {TsLinterOptions} from './ts-linter';

/**
 * Binds the TypeScript `lint()` method with TypeScript's
 * semantic and syntactic diagnostics. You can use
 * the `getLints` method for a lower-level interface
 * to the same data.
 */
export const tsLinterWorker = (options?: TsLinterOptions) => {
	const {diagnosticCodesToIgnore} = options || {};

	return linter(async (view: EditorView): Promise<readonly Diagnostic[]> => {
		const config = view.state.facet(tsFacetWorker);
		return config
			? config.worker.getLints({
				path: config.path,
				diagnosticCodesToIgnore: diagnosticCodesToIgnore || []
			})
			: [];
	});
};