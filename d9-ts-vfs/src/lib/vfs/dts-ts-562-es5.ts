// and all d.ts files are copied from typescript v5.6.2
import {dts as decorators} from './dts-files/lib.decorators.dts';
import {dts as decoratorsLegacy} from './dts-files/lib.decorators.legacy.dts';
import {dts as lib} from './dts-files/lib.dts';
import {dts as es5} from './dts-files/lib.es5.dts';
import {DtsMap} from './types';
import {createDTSMap, createEs5DTSMapWithDOM} from './utils';

export const VFS_TS_562_ES5_FILES = (full: boolean): Record<string, string> => {
	return {
		'/lib.decorators.d.ts': decorators,
		'/lib.decorators.legacy.d.ts': decoratorsLegacy,
		...(full ? {'/lib.d.ts': lib} : {}),
		'/lib.es5.d.ts': es5
	};
};
/**
 * typescript 5.6.2, es5
 */
export const VFS_TS_562_ES5 = (): DtsMap => createDTSMap(VFS_TS_562_ES5_FILES(false));
export const VFS_TS_562_LIB = (): DtsMap => createEs5DTSMapWithDOM(VFS_TS_562_ES5_FILES(true));
