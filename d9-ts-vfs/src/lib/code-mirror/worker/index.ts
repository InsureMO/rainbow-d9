/** copy from @valtown/codemirror-ts */
import {Diagnostic as CMLintDiagnostic} from '@codemirror/lint';
import {type Remote} from 'comlink';
import {VirtualTypeScriptEnvironment} from '../../vfs';
import {getAutocompletion, GetAutocompletionOptions} from '../autocomplete';
import {getHover, GetHoverOptions, HoverInfo} from '../hover';
import {getLintsFromVfs, GetLintsOptions} from '../lint';
import {createOrUpdateFile} from '../sync';

/**
 * The shape of the output of something like
 *
 * ```ts
 * Comlink.wrap(new Worker(…));
 * ```
 *
 * Most TypeScript environments won’t be able to figure out
 * the types of a `Worker` instance, so this is a helper
 * for casting.
 */
export type WorkerShape = Remote<ReturnType<typeof createWorker>>;

/**
 * Create a worker with `WorkerShape`, given an initializer
 * method. You might want to customize how your TypeScript
 * environment is set up, so the initializer can do all
 * of that: this then gives you an object that can be
 * passed to `Comlink.expose`.
 */
export const createWorker = (initializer: () => VirtualTypeScriptEnvironment | Promise<VirtualTypeScriptEnvironment>) => {
	let env: VirtualTypeScriptEnvironment;

	return {
		async initialize() {
			env = await initializer();
		},
		updateFile({path, code}: { path: string; code: string }) {
			if (!env) return;
			createOrUpdateFile(env, path, code);
		},
		getLints(options: Pick<GetLintsOptions, 'path' | 'diagnosticCodesToIgnore'>): Array<CMLintDiagnostic> {
			if (!env) {
				return [];
			} else {
				const {path, diagnosticCodesToIgnore} = options;
				return getLintsFromVfs({env, path, diagnosticCodesToIgnore});
			}
		},
		getAutocompletion(options: Pick<GetAutocompletionOptions, 'path' | 'context'>) {
			if (!env) {
				return null;
			} else {
				const {path, context} = options;
				return getAutocompletion({env, path, context});
			}
		},
		getHover(options: Pick<GetHoverOptions, 'path' | 'pos'>): HoverInfo | null {
			if (!env) {
				return;
			} else {
				const {path, pos} = options;
				return getHover({env, path, pos});
			}
		},
		getEnv() {
			return env;
		}
	};
};