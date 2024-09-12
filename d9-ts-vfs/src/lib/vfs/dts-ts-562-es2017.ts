// and all d.ts files are copied from typescript v5.6.2
import {dts as es2017Date} from './dts-files/lib.es2017.date.dts';
import {dts as es2017} from './dts-files/lib.es2017.dts';
import {dts as es2017Intl} from './dts-files/lib.es2017.intl.dts';
import {dts as es2017Object} from './dts-files/lib.es2017.object.dts';
import {dts as es2017SharedMemory} from './dts-files/lib.es2017.sharedmemory.dts';
import {dts as es2017String} from './dts-files/lib.es2017.string.dts';
import {dts as es2017TypedArrays} from './dts-files/lib.es2017.typedarrays.dts';
import {VFS_TS_562_ES2016_FILES} from './dts-ts-562-es2016';
import {DtsMap} from './types';
import {createDTSMap, createDTSMapWithDOMLtEs2018} from './utils';

export const VFS_TS_562_ES2017_FILES = (): Record<string, string> => {
	return {
		...VFS_TS_562_ES2016_FILES(),
		'/lib.es2017.date.d.ts': es2017Date,
		'/lib.es2017.d.ts': es2017,
		// es2017.full is entry point, use es2017 to avoid unnecessary declarations
		'/lib.es2017.full.d.ts': es2017,
		'/lib.es2017.intl.d.ts': es2017Intl,
		'/lib.es2017.object.d.ts': es2017Object,
		'/lib.es2017.sharedmemory.d.ts': es2017SharedMemory,
		'/lib.es2017.string.d.ts': es2017String,
		'/lib.es2017.typedarrays.d.ts': es2017TypedArrays
	};
};
/**
 * typescript 5.6.2, es2017
 */
export const VFS_TS_562_ES2017 = (): DtsMap => createDTSMap(VFS_TS_562_ES2017_FILES());
export const VFS_TS_562_ES2017_FULL = (): DtsMap => createDTSMapWithDOMLtEs2018(VFS_TS_562_ES2017_FILES());
