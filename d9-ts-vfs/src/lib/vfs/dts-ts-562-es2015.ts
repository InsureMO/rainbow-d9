// and all d.ts files are copied from typescript v5.6.2
import {dts as es2015Collection} from './dts-files/lib.es2015.collection.dts';
import {dts as es2015Core} from './dts-files/lib.es2015.core.dts';
import {dts as es2015} from './dts-files/lib.es2015.dts';
import {dts as es2015Generator} from './dts-files/lib.es2015.generator.dts';
import {dts as es2015Iterable} from './dts-files/lib.es2015.iterable.dts';
import {dts as es2015Promise} from './dts-files/lib.es2015.promise.dts';
import {dts as es2015Proxy} from './dts-files/lib.es2015.proxy.dts';
import {dts as es2015Reflect} from './dts-files/lib.es2015.reflect.dts';
import {dts as es2015Symbol} from './dts-files/lib.es2015.symbol.dts';
import {dts as es2015SymbolWellKnown} from './dts-files/lib.es2015.symbol.wellknown.dts';
import {VFS_TS_562_ES5_FILES} from './dts-ts-562-es5';
import {DtsMap} from './types';
import {createDTSMap, createDTSMapWithDOMLtEs2018} from './utils';

export const VFS_TS_562_ES2015_FILES = (): Record<string, string> => {
	return {
		...VFS_TS_562_ES5_FILES(),
		// es6 is entry point, use es2015 to avoid unnecessary declarations
		'/lib.es6.d.ts': es2015,
		'/lib.es2015.collection.d.ts': es2015Collection,
		'/lib.es2015.core.d.ts': es2015Core,
		'/lib.es2015.d.ts': es2015,
		'/lib.es2015.generator.d.ts': es2015Generator,
		'/lib.es2015.iterable.d.ts': es2015Iterable,
		'/lib.es2015.promise.d.ts': es2015Promise,
		'/lib.es2015.proxy.d.ts': es2015Proxy,
		'/lib.es2015.reflect.d.ts': es2015Reflect,
		'/lib.es2015.symbol.d.ts': es2015Symbol,
		'/lib.es2015.symbol.wellknown.d.ts': es2015SymbolWellKnown
	};
};
export const VFS_TS_562_ES6_FILES = VFS_TS_562_ES2015_FILES;
/**
 * typescript 5.6.2, es2015, es6
 */
export const VFS_TS_562_ES2015 = (): DtsMap => createDTSMap(VFS_TS_562_ES2015_FILES());
export const VFS_TS_562_ES2015_FULL = (): DtsMap => createDTSMapWithDOMLtEs2018(VFS_TS_562_ES2015_FILES());
export const VFS_TS_562_ES6 = VFS_TS_562_ES2015;
export const VFS_TS_562_ES6_FULL = VFS_TS_562_ES2015_FULL;