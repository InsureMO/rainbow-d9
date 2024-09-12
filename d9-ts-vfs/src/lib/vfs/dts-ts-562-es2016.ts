// and all d.ts files are copied from typescript v5.6.2
import {dts as es2016ArrayInclude} from './dts-files/lib.es2016.array.include.dts';
import {dts as es2016} from './dts-files/lib.es2016.dts';
import {dts as es2016Intl} from './dts-files/lib.es2016.intl.dts';
import {VFS_TS_562_ES2015_FILES} from './dts-ts-562-es2015';
import {DtsMap} from './types';
import {createDTSMap, createDTSMapWithDOMLtEs2018} from './utils';

export const VFS_TS_562_ES2016_FILES = (): Record<string, string> => {
	return {
		...VFS_TS_562_ES2015_FILES(),
		'/lib.es2016.array.include.d.ts': es2016ArrayInclude,
		'/lib.es2016.d.ts': es2016,
		// es2016.full is entry point, use es2016 to avoid unnecessary declarations
		'/lib.es2016.full.d.ts': es2016,
		'/lib.es2016.intl.d.ts': es2016Intl
	};
};
/**
 * typescript 5.6.2, es2016
 */
export const VFS_TS_562_ES2016 = (): DtsMap => createDTSMap(VFS_TS_562_ES2016_FILES());
export const VFS_TS_562_ES2016_FULL = (): DtsMap => createDTSMapWithDOMLtEs2018(VFS_TS_562_ES2016_FILES());
