/** copy from @valtown/codemirror-ts */
import {CompletionContext, CompletionResult, CompletionSource} from '@codemirror/autocomplete';
import {tsFacetWorker} from '../facet';

/**
 * Create a `CompletionSource` that queries
 * the TypeScript environment in a web worker.
 */
export const tsAutocompleteWorker = (): CompletionSource => {
	return async (context: CompletionContext): Promise<CompletionResult | null> => {
		const config = context.state.facet(tsFacetWorker);
		if (!config) {
			return null;
		}
		return config.worker.getAutocompletion({
			path: config.path,
			// Reduce this object so that it's serializable.
			context: {
				pos: context.pos,
				explicit: context.explicit
			}
		});
	};
};
