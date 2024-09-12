import {VFS_TS_562_ES2022} from '../vfs';
import {createCodeMirrorJavascriptExtensions} from './js-extensions';

export const createCodeMirrorTs562Es2022Extensions = () => {
	const create = createCodeMirrorJavascriptExtensions({
		files: VFS_TS_562_ES2022()
	});
	return create();
};
