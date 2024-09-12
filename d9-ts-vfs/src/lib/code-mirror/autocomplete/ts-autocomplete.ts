/** copy from @valtown/codemirror-ts */
import {CompletionContext, CompletionResult, CompletionSource} from '@codemirror/autocomplete';
import {tsFacet} from '../facet';
import {getAutocompletion} from './get-autocompletion';

/**
 * Create a `CompletionSource` that queries
 * the _on-thread_ TypeScript environments for autocompletions
 * at this character.
 */
export const tsAutocomplete = (): CompletionSource => {
	return async (context: CompletionContext): Promise<CompletionResult | null> => {
		const config = context.state.facet(tsFacet);
		if (!config) return null;
		return getAutocompletion({...config, context});
	};
};