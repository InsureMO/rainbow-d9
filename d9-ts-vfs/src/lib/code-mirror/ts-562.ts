import {ScriptTarget} from 'typescript';
import {DtsMapExtend, VFS_TS_562_ES2022, VFS_TS_562_ESNEXT} from '../vfs';
import {CodeMirrorJavascriptExtensionsOptions, createCodeMirrorJavascriptExtensions} from './js-extensions';

export interface TargetedCodeMirrorJavascriptExtensionsOptions extends CodeMirrorJavascriptExtensionsOptions {
	extend?: DtsMapExtend;
}

export const createCodeMirrorTs562Es2022Extensions = (options?: TargetedCodeMirrorJavascriptExtensionsOptions) => {
	const {extend, ...rest} = options;
	const create = createCodeMirrorJavascriptExtensions({
		files: VFS_TS_562_ES2022({extend})
	});
	return create(rest);
};

export const createCodeMirrorTs562EsnextExtensions = (options?: TargetedCodeMirrorJavascriptExtensionsOptions) => {
	const {extend, ...rest} = options;
	const create = createCodeMirrorJavascriptExtensions({
		files: VFS_TS_562_ESNEXT({extend}),
		compilerOpts: {target: ScriptTarget.ESNext}
	});
	return create(rest);
};
