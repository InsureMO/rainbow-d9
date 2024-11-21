// and all d.ts files are copied from typescript v5.6.2
import {VFS_TS_562_ES5_FILES} from './dts-ts-562-es5';
import {DtsMap, DtsMapOptions, LibDtsMapOptions} from './types';
import {dts as es2015Collection} from './typescript/lib/lib.es2015.collection.d.ts?dts';
import {dts as es2015Core} from './typescript/lib/lib.es2015.core.d.ts?dts';
import {dts as es2015} from './typescript/lib/lib.es2015.d.ts?dts';
import {dts as es2015Generator} from './typescript/lib/lib.es2015.generator.d.ts?dts';
import {dts as es2015Iterable} from './typescript/lib/lib.es2015.iterable.d.ts?dts';
import {dts as es2015Promise} from './typescript/lib/lib.es2015.promise.d.ts?dts';
import {dts as es2015Proxy} from './typescript/lib/lib.es2015.proxy.d.ts?dts';
import {dts as es2015Reflect} from './typescript/lib/lib.es2015.reflect.d.ts?dts';
import {dts as es2015Symbol} from './typescript/lib/lib.es2015.symbol.d.ts?dts';
import {dts as es2015SymbolWellKnown} from './typescript/lib/lib.es2015.symbol.wellknown.d.ts?dts';
import {dts as es6} from './typescript/lib/lib.es6.d.ts?dts';
import {createDTSMap, createDTSMapWithDOMLtEs2018} from './utils';

export const VFS_TS_562_ES2015_FILES = (options: LibDtsMapOptions): Record<string, string> => {
	return {
		...VFS_TS_562_ES5_FILES(options),
		// es6 is entry point, use es2015 to avoid unnecessary declarations
		'/lib.es6.d.ts': options.full ? es6 : es2015,
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
export const VFS_TS_562_ES2015 = (options?: DtsMapOptions): DtsMap => {
	return createDTSMap(VFS_TS_562_ES2015_FILES({...options, full: false}));
};
export const VFS_TS_562_ES6 = (options?: DtsMapOptions): DtsMap => {
	return createDTSMapWithDOMLtEs2018(VFS_TS_562_ES2015_FILES({...options, full: true}));
};