// and all d.ts files are copied from typescript v5.6.2
import {dts as es2023Array} from './dts-files/lib.es2023.array.dts';
import {dts as es2023Collection} from './dts-files/lib.es2023.collection.dts';
import {dts as es2023} from './dts-files/lib.es2023.dts';
import {dts as es2023Intl} from './dts-files/lib.es2023.intl.dts';
import {VFS_TS_562_ES2022_FILES} from './dts-ts-562-es2022';
import {DtsMap} from './types';
import {createDTSMap, createDTSMapWithDOMGteEs2018} from './utils';

export const VFS_TS_562_ES2023_FILES = (): Record<string, string> => {
	return {
		...VFS_TS_562_ES2022_FILES,
		'/lib.es2023.array.d.ts': es2023Array,
		'/lib.es2023.collection.d.ts': es2023Collection,
		'/lib.es2023.d.ts': es2023,
		// es2023.full is entry point, use es2023 to avoid unnecessary declarations
		'/lib.es2023.full.d.ts': es2023,
		'/lib.es2023.intl.d.ts': es2023Intl
	};
};
/**
 * typescript 5.6.2, es2023
 */
export const VFS_TS_562_ES2023 = (): DtsMap => createDTSMap(VFS_TS_562_ES2023_FILES());
export const VFS_TS_562_ES2023_FULL = (): DtsMap => createDTSMapWithDOMGteEs2018(VFS_TS_562_ES2023_FILES());
