// and all d.ts files are copied from typescript v5.6.2
import {dts as es2021} from './dts-files/lib.es2021.dts';
import {dts as es2021Full} from './dts-files/lib.es2021.full.dts';
import {dts as es2021Intl} from './dts-files/lib.es2021.intl.dts';
import {dts as es2021Promise} from './dts-files/lib.es2021.promise.dts';
import {dts as es2021String} from './dts-files/lib.es2021.string.dts';
import {dts as es2021WeakRef} from './dts-files/lib.es2021.weakref.dts';
import {VFS_TS_562_ES2020_FILES} from './dts-ts-562-es2020';
import {DtsMap, DtsMapOptions, LibDtsMapOptions} from './types';
import {createDTSMap, createDTSMapWithDOMGteEs2018} from './utils';

export const VFS_TS_562_ES2021_FILES = (options: LibDtsMapOptions): Record<string, string> => {
	return {
		...VFS_TS_562_ES2020_FILES(options),
		'/lib.es2021.d.ts': es2021,
		// es2021.full is entry point, use es2021 to avoid unnecessary declarations
		'/lib.es2021.full.d.ts': options.full ? es2021Full : es2021,
		'/lib.es2021.intl.d.ts': es2021Intl,
		'/lib.es2021.promise.d.ts': es2021Promise,
		'/lib.es2021.string.d.ts': es2021String,
		'/lib.es2021.weakref.d.ts': es2021WeakRef
	};
};
/**
 * typescript 5.6.2, es2021
 */
export const VFS_TS_562_ES2021 = (options?: DtsMapOptions): DtsMap => {
	return createDTSMap(VFS_TS_562_ES2021_FILES({...options, full: false}));
};
export const VFS_TS_562_ES2021_FULL = (options?: DtsMapOptions): DtsMap => {
	return createDTSMapWithDOMGteEs2018(VFS_TS_562_ES2021_FILES({...options, full: true}));
};
