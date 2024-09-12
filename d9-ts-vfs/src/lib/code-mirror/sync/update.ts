/** copy from @valtown/codemirror-ts */
import {VirtualTypeScriptEnvironment} from '../../vfs';

/**
 * In TypeScript, updates are not like PUTs, you
 * need to create a file before updating it.
 *
 * This method lets us treat the two as the same.
 */
export const createOrUpdateFile = (env: VirtualTypeScriptEnvironment, path: string, code: string): void => {
	if (!env.getSourceFile(path)) {
		env.createFile(path, code);
	} else {
		env.updateFile(path, code);
	}
};