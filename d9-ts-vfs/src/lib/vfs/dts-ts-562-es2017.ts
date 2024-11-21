// and all d.ts files are copied from typescript v5.6.2
import {VFS_TS_562_ES2016_FILES} from './dts-ts-562-es2016';
import {DtsMap, DtsMapOptions, LibDtsMapOptions} from './types';
import {dts as es2017} from './typescript/lib/lib.es2017.d.ts?dts';
import {dts as es2017Date} from './typescript/lib/lib.es2017.date.d.ts?dts';
import {dts as es2017Full} from './typescript/lib/lib.es2017.full.d.ts?dts';
import {dts as es2017Intl} from './typescript/lib/lib.es2017.intl.d.ts?dts';
import {dts as es2017Object} from './typescript/lib/lib.es2017.object.d.ts?dts';
import {dts as es2017SharedMemory} from './typescript/lib/lib.es2017.sharedmemory.d.ts?dts';
import {dts as es2017String} from './typescript/lib/lib.es2017.string.d.ts?dts';
import {dts as es2017TypedArrays} from './typescript/lib/lib.es2017.typedarrays.d.ts?dts';
import {createDTSMap, createDTSMapWithDOMLtEs2018} from './utils';

export const VFS_TS_562_ES2017_FILES = (options: LibDtsMapOptions): Record<string, string> => {
	return {
		...VFS_TS_562_ES2016_FILES(options),
		'/lib.es2017.date.d.ts': es2017Date,
		'/lib.es2017.d.ts': es2017,
		// es2017.full is entry point, use es2017 to avoid unnecessary declarations
		'/lib.es2017.full.d.ts': options.full ? es2017Full : es2017,
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
export const VFS_TS_562_ES2017 = (options?: DtsMapOptions): DtsMap => {
	return createDTSMap(VFS_TS_562_ES2017_FILES({...options, full: false}));
};
export const VFS_TS_562_ES2017_FULL = (options?: DtsMapOptions): DtsMap => {
	return createDTSMapWithDOMLtEs2018(VFS_TS_562_ES2017_FILES({...options, full: true}));
};
