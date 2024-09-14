import {Diagnostic, linter} from '@codemirror/lint';
import {EditorView} from '@codemirror/view';
import {getLintsOnImpExp, tsFacetWorker} from '../index.js';
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
		const diagnostics = getLintsOnImpExp(view);
		return config
			? [
				...diagnostics,
				...(await config.worker.getLints({
					path: config.path, diagnosticCodesToIgnore: diagnosticCodesToIgnore || []
				}))
			]
			: diagnostics;
	});
};