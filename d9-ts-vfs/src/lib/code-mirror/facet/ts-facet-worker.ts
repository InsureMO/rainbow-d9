/** copy from @valtown/codemirror-ts */
import {combineConfig, Facet} from '@codemirror/state';
import {WorkerShape} from '../worker';

export interface TsFacetWorkerData {
	path: string;
	worker: WorkerShape;
}

/**
 * Use this facet if you intend to run your TypeScript
 * virtual environment within a web worker.
 *
 * This is how the ts-related extensions are
 * configured: this facet sets the path of the file
 * and the environment to use, and the rest of
 * the extensions, like tsLint and tsAutocomplete,
 * pull those settings automatically from editor state.
 */
export const tsFacetWorker = Facet.define<TsFacetWorkerData, TsFacetWorkerData | null>({
	combine(configs: readonly TsFacetWorkerData[]): TsFacetWorkerData | null {
		return combineConfig(configs, {});
	}
});
