// and all d.ts files are copied from typescript v5.6.2
import {dts as es2019Array} from './dts-files/lib.es2019.array.dts';
import {dts as es2019} from './dts-files/lib.es2019.dts';
import {dts as es2019Full} from './dts-files/lib.es2019.full.dts';
import {dts as es2019Intl} from './dts-files/lib.es2019.intl.dts';
import {dts as es2019Object} from './dts-files/lib.es2019.object.dts';
import {dts as es2019String} from './dts-files/lib.es2019.string.dts';
import {dts as es2019Symbol} from './dts-files/lib.es2019.symbol.dts';
import {VFS_TS_562_ES2018_FILES} from './dts-ts-562-es2018';
import {DtsMap, DtsMapOptions, LibDtsMapOptions} from './types';
import {createDTSMap, createDTSMapWithDOMGteEs2018} from './utils';

export const VFS_TS_562_ES2019_FILES = (options: LibDtsMapOptions): Record<string, string> => {
	return {
		...VFS_TS_562_ES2018_FILES(options),
		'/lib.es2019.array.d.ts': es2019Array,
		'/lib.es2019.d.ts': es2019,
		// es2019.full is entry point, use es2019 to avoid unnecessary declarations
		'/lib.es2019.full.d.ts': options.full ? es2019Full : es2019,
		'/lib.es2019.intl.d.ts': es2019Intl,
		'/lib.es2019.object.d.ts': es2019Object,
		'/lib.es2019.string.d.ts': es2019String,
		'/lib.es2019.symbol.d.ts': es2019Symbol
	};
};
/**
 * typescript 5.6.2, es2021
 */
export const VFS_TS_562_ES2019 = (options?: DtsMapOptions): DtsMap => {
	return createDTSMap(VFS_TS_562_ES2019_FILES({...options, full: false}));
};
export const VFS_TS_562_ES2019_FULL = (options?: DtsMapOptions): DtsMap => {
	return createDTSMapWithDOMGteEs2018(VFS_TS_562_ES2019_FILES({...options, full: true}));
};
