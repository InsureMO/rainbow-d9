import {ScriptTarget} from 'typescript';
import {VFS_TS_562_ES2022, VFS_TS_562_ESNEXT} from '../vfs';
import {CodeMirrorJavascriptExtensionsOptions, createCodeMirrorJavascriptExtensions} from './js-extensions';

export const createCodeMirrorTs562Es2022Extensions = (options?: CodeMirrorJavascriptExtensionsOptions) => {
	const create = createCodeMirrorJavascriptExtensions({
		files: VFS_TS_562_ES2022()
	});
	return create(options);
};

export const createCodeMirrorTs562EsnextExtensions = (options?: CodeMirrorJavascriptExtensionsOptions) => {
	const create = createCodeMirrorJavascriptExtensions({
		files: VFS_TS_562_ESNEXT(),
		compilerOpts: {target: ScriptTarget.ESNext}
	});
	return create(options);
};
