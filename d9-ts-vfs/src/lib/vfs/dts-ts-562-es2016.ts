// and all d.ts files are copied from typescript v5.6.2
import {VFS_TS_562_ES2015_FILES} from './dts-ts-562-es2015';
import {DtsMap, DtsMapOptions, LibDtsMapOptions} from './types';
import {dts as es2016ArrayInclude} from './typescript/lib/lib.es2016.array.include.d.ts?dts';
import {dts as es2016} from './typescript/lib/lib.es2016.d.ts?dts';
import {dts as es2016Full} from './typescript/lib/lib.es2016.full.d.ts?dts';
import {dts as es2016Intl} from './typescript/lib/lib.es2016.intl.d.ts?dts';
import {createDTSMap, createDTSMapWithDOMLtEs2018} from './utils';

export const VFS_TS_562_ES2016_FILES = (options: LibDtsMapOptions): Record<string, string> => {
	return {
		...VFS_TS_562_ES2015_FILES(options),
		'/lib.es2016.array.include.d.ts': es2016ArrayInclude,
		'/lib.es2016.d.ts': options.full ? es2016Full : es2016,
		// es2016.full is entry point, use es2016 to avoid unnecessary declarations
		'/lib.es2016.full.d.ts': es2016,
		'/lib.es2016.intl.d.ts': es2016Intl
	};
};
/**
 * typescript 5.6.2, es2016
 */
export const VFS_TS_562_ES2016 = (options?: DtsMapOptions): DtsMap => {
	return createDTSMap(VFS_TS_562_ES2016_FILES({...options, full: false}));
};
export const VFS_TS_562_ES2016_FULL = (options?: DtsMapOptions): DtsMap => {
	return createDTSMapWithDOMLtEs2018(VFS_TS_562_ES2016_FILES({...options, full: true}));
};
