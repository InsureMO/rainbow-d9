// and all d.ts files are copied from typescript v5.6.2
import {dts as decorators} from './dts-files/lib.decorators.dts';
import {dts as decoratorsLegacy} from './dts-files/lib.decorators.legacy.dts';
import {dts as es5} from './dts-files/lib.es5.dts';
import {DtsMap} from './types';
import {createDTSMap, createDTSMapWithDOMLtEs2018} from './utils';

export const VFS_TS_562_ES5_FILES = (): Record<string, string> => {
	return {
		'/lib.decorators.d.ts': decorators,
		'/lib.decorators.legacy.d.ts': decoratorsLegacy,
		'/lib.es5.d.ts': es5
	};
};
/**
 * typescript 5.6.2, es5
 */
export const VFS_TS_562_ES5 = (): DtsMap => createDTSMap(VFS_TS_562_ES5_FILES());
export const VFS_TS_562_ES5_FULL = (): DtsMap => createDTSMapWithDOMLtEs2018(VFS_TS_562_ES5_FILES());
