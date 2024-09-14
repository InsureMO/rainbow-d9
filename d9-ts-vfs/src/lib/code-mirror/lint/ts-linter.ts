/** copy from @valtown/codemirror-ts */
import {Diagnostic, linter} from '@codemirror/lint';
import {EditorView} from '@codemirror/view';
import {tsFacet} from '../facet';
import {getLintsFromVfs, getLintsOnImpExp} from './get-lints';

export interface TsLinterOptions {
	diagnosticCodesToIgnore?: Array<number>;
}

/**
 * Binds the TypeScript `lint()` method with TypeScript's
 * semantic and syntactic diagnostics. You can use
 * the `getLints` method for a lower-level interface
 * to the same data.
 */
export const tsLinter = (options?: TsLinterOptions) => {
	const {diagnosticCodesToIgnore} = options || {};

	return linter(async (view: EditorView): Promise<readonly Diagnostic[]> => {
		const diagnostics = getLintsOnImpExp(view);
		const config = view.state.facet(tsFacet);
		if (config == null) {
			return diagnostics;
		} else {
			return [
				...diagnostics,
				...getLintsFromVfs({...config, diagnosticCodesToIgnore: diagnosticCodesToIgnore || []})
			];
		}
	});
};