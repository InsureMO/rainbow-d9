// and all d.ts files are copied from typescript v5.6.2
import {VFS_TS_562_ES2017_FILES} from './dts-ts-562-es2017';
import {DtsMap, DtsMapOptions, LibDtsMapOptions} from './types';
import {dts as es2018AsyncGenerator} from './typescript/lib/lib.es2018.asyncgenerator.d.ts?dts';
import {dts as es2018AsyncIterable} from './typescript/lib/lib.es2018.asynciterable.d.ts?dts';
import {dts as es2018} from './typescript/lib/lib.es2018.d.ts?dts';
import {dts as es2018Full} from './typescript/lib/lib.es2018.full.d.ts?dts';
import {dts as es2018Intl} from './typescript/lib/lib.es2018.intl.d.ts?dts';
import {dts as es2018Promise} from './typescript/lib/lib.es2018.promise.d.ts?dts';
import {dts as es2018Regexp} from './typescript/lib/lib.es2018.regexp.d.ts?dts';
import {createDTSMap, createDTSMapWithDOMGteEs2018} from './utils';

export const VFS_TS_562_ES2018_FILES = (options: LibDtsMapOptions): Record<string, string> => {
	return {
		...VFS_TS_562_ES2017_FILES(options),
		'/lib.es2018.asyncgenerator.d.ts': es2018AsyncGenerator,
		'/lib.es2018.asynciterable.d.ts': es2018AsyncIterable,
		'/lib.es2018.d.ts': es2018,
		// es2018.full is entry point, use es2018 to avoid unnecessary declarations
		'/lib.es2018.full.d.ts': options.full ? es2018Full : es2018,
		'/lib.es2018.intl.d.ts': es2018Intl,
		'/lib.es2018.promise.d.ts': es2018Promise,
		'/lib.es2018.regexp.d.ts': es2018Regexp
	};
};
/**
 * typescript 5.6.2, es2018
 */
export const VFS_TS_562_ES2018 = (options?: DtsMapOptions): DtsMap => {
	return createDTSMap(VFS_TS_562_ES2018_FILES({...options, full: false}));
};
export const VFS_TS_562_ES2018_FULL = (options?: DtsMapOptions): DtsMap => {
	return createDTSMapWithDOMGteEs2018(VFS_TS_562_ES2018_FILES({...options, full: true}));
};
