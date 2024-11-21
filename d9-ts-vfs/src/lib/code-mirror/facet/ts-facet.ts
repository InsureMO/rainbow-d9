/** copy from @valtown/codemirror-ts */
import {combineConfig, Facet} from '@codemirror/state';
import {VirtualTypeScriptEnvironment} from '../../vfs';

export interface TsFacetData {
	path: string;
	env: VirtualTypeScriptEnvironment;
}

/**
 * This is how the ts-related extensions are
 * configured: this facet sets the path of the file
 * and the environment to use, and the rest of
 * the extensions, like tsLint and tsAutocomplete,
 * pull those settings automatically from editor state.
 */
export const tsFacet = Facet.define<TsFacetData, TsFacetData | null>({
	combine(configs: readonly TsFacetData[]): TsFacetData | null {
		return combineConfig(configs, {});
	}
});