// and all d.ts files are copied from typescript v5.6.2
import {dts as es2018AsyncGenerator} from './dts-files/lib.es2018.asyncgenerator.dts';
import {dts as es2018AsyncIterable} from './dts-files/lib.es2018.asynciterable.dts';
import {dts as es2018} from './dts-files/lib.es2018.dts';
import {dts as es2018Full} from './dts-files/lib.es2018.full.dts';
import {dts as es2018Intl} from './dts-files/lib.es2018.intl.dts';
import {dts as es2018Promise} from './dts-files/lib.es2018.promise.dts';
import {dts as es2018Regexp} from './dts-files/lib.es2018.regexp.dts';
import {VFS_TS_562_ES2017_FILES} from './dts-ts-562-es2017';
import {DtsMap} from './types';
import {createDTSMap, createDTSMapWithDOMGteEs2018} from './utils';

export const VFS_TS_562_ES2018_FILES = (full: boolean): Record<string, string> => {
	return {
		...VFS_TS_562_ES2017_FILES(full),
		'/lib.es2018.asyncgenerator.d.ts': es2018AsyncGenerator,
		'/lib.es2018.asynciterable.d.ts': es2018AsyncIterable,
		'/lib.es2018.d.ts': es2018,
		// es2018.full is entry point, use es2018 to avoid unnecessary declarations
		'/lib.es2018.full.d.ts': full ? es2018Full : es2018,
		'/lib.es2018.intl.d.ts': es2018Intl,
		'/lib.es2018.promise.d.ts': es2018Promise,
		'/lib.es2018.regexp.d.ts': es2018Regexp
	};
};
/**
 * typescript 5.6.2, es2018
 */
export const VFS_TS_562_ES2018 = (): DtsMap => createDTSMap(VFS_TS_562_ES2018_FILES(false));
export const VFS_TS_562_ES2018_FULL = (): DtsMap => createDTSMapWithDOMGteEs2018(VFS_TS_562_ES2018_FILES(true));
