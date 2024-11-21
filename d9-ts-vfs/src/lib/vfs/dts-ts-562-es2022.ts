// and all d.ts files are copied from typescript v5.6.2
import {VFS_TS_562_ES2021_FILES} from './dts-ts-562-es2021';
import {DtsMap, DtsMapOptions, LibDtsMapOptions} from './types';
import {dts as es2022Array} from './typescript/lib/lib.es2022.array.d.ts?dts';
import {dts as es2022} from './typescript/lib/lib.es2022.d.ts?dts';
import {dts as es2022Error} from './typescript/lib/lib.es2022.error.d.ts?dts';
import {dts as es2022Full} from './typescript/lib/lib.es2022.full.d.ts?dts';
import {dts as es2022Intl} from './typescript/lib/lib.es2022.intl.d.ts?dts';
import {dts as es2022Object} from './typescript/lib/lib.es2022.object.d.ts?dts';
import {dts as es2022Regexp} from './typescript/lib/lib.es2022.regexp.d.ts?dts';
import {dts as es2022SharedMemory} from './typescript/lib/lib.es2022.sharedmemory.d.ts?dts';
import {dts as es2022String} from './typescript/lib/lib.es2022.string.d.ts?dts';
import {createDTSMap, createDTSMapWithDOMGteEs2018} from './utils';

export const VFS_TS_562_ES2022_FILES = (options: LibDtsMapOptions): Record<string, string> => {
	return {
		...VFS_TS_562_ES2021_FILES(options),
		'/lib.es2022.array.d.ts': es2022Array,
		'/lib.es2022.d.ts': es2022,
		'/lib.es2022.error.d.ts': es2022Error,
		// es2022.full is entry point, use es2022 to avoid unnecessary declarations
		'/lib.es2022.full.d.ts': options.full ? es2022Full : es2022,
		'/lib.es2022.intl.d.ts': es2022Intl,
		'/lib.es2022.object.d.ts': es2022Object,
		'/lib.es2022.regexp.d.ts': es2022Regexp,
		'/lib.es2022.sharedmemory.d.ts': es2022SharedMemory,
		'/lib.es2022.string.d.ts': es2022String
	};
};
/**
 * typescript 5.6.2, es2022
 */
export const VFS_TS_562_ES2022 = (options?: DtsMapOptions): DtsMap => {
	return createDTSMap(VFS_TS_562_ES2022_FILES({...options, full: false}));
};
export const VFS_TS_562_ES2022_FULL = (options?: DtsMapOptions): DtsMap => {
	return createDTSMapWithDOMGteEs2018(VFS_TS_562_ES2022_FILES({...options, full: true}));
};
