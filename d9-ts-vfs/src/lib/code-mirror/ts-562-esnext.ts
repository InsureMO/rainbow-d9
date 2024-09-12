import ts, {ScriptTarget} from 'typescript';
import {VFS_TS_562_ESNEXT} from '../vfs';
import {createCodeMirrorJavascriptExtensions} from './js-extensions';

export const createCodeMirrorTs562EsnextExtensions = () => {
	const create = createCodeMirrorJavascriptExtensions({
		files: VFS_TS_562_ESNEXT(),
		compilerOpts: {
			target: ScriptTarget.ESNext,
			module: ts.ModuleKind.ESNext
		}
	});
	return create();
};
