// and all d.ts files are copied from typescript v5.6.2
import {VFS_TS_562_ES2022_FILES} from './dts-ts-562-es2022';
import {DtsMap, DtsMapOptions, LibDtsMapOptions} from './types';
import {dts as es2023Array} from './typescript/lib/lib.es2023.array.d.ts?dts';
import {dts as es2023Collection} from './typescript/lib/lib.es2023.collection.d.ts?dts';
import {dts as es2023} from './typescript/lib/lib.es2023.d.ts?dts';
import {dts as es2023Full} from './typescript/lib/lib.es2023.full.d.ts?dts';
import {dts as es2023Intl} from './typescript/lib/lib.es2023.intl.d.ts?dts';
import {createDTSMap, createDTSMapWithDOMGteEs2018} from './utils';

export const VFS_TS_562_ES2023_FILES = (options: LibDtsMapOptions): Record<string, string> => {
	return {
		...VFS_TS_562_ES2022_FILES(options),
		'/lib.es2023.array.d.ts': es2023Array,
		'/lib.es2023.collection.d.ts': es2023Collection,
		'/lib.es2023.d.ts': es2023,
		// es2023.full is entry point, use es2023 to avoid unnecessary declarations
		'/lib.es2023.full.d.ts': options.full ? es2023Full : es2023,
		'/lib.es2023.intl.d.ts': es2023Intl
	};
};
/**
 * typescript 5.6.2, es2023
 */
export const VFS_TS_562_ES2023 = (options?: DtsMapOptions): DtsMap => {
	return createDTSMap(VFS_TS_562_ES2023_FILES({...options, full: false}));
};
export const VFS_TS_562_ES2023_FULL = (options?: DtsMapOptions): DtsMap => {
	return createDTSMapWithDOMGteEs2018(VFS_TS_562_ES2023_FILES({...options, full: true}));
};
