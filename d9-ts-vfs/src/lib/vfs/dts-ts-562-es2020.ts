// and all d.ts files are copied from typescript v5.6.2
import {VFS_TS_562_ES2019_FILES} from './dts-ts-562-es2019';
import {DtsMap, DtsMapOptions, LibDtsMapOptions} from './types';
import {dts as es2020Bigint} from './typescript/lib/lib.es2020.bigint.d.ts?dts';
import {dts as es2020} from './typescript/lib/lib.es2020.d.ts?dts';
import {dts as es2020Date} from './typescript/lib/lib.es2020.date.d.ts?dts';
import {dts as es2020Full} from './typescript/lib/lib.es2020.full.d.ts?dts';
import {dts as es2020Intl} from './typescript/lib/lib.es2020.intl.d.ts?dts';
import {dts as es2020Number} from './typescript/lib/lib.es2020.number.d.ts?dts';
import {dts as es2020Promise} from './typescript/lib/lib.es2020.promise.d.ts?dts';
import {dts as es2020SharedMemory} from './typescript/lib/lib.es2020.sharedmemory.d.ts?dts';
import {dts as es2020String} from './typescript/lib/lib.es2020.string.d.ts?dts';
import {dts as es2020SymbolWellKnown} from './typescript/lib/lib.es2020.symbol.wellknown.d.ts?dts';
import {createDTSMap, createDTSMapWithDOMGteEs2018} from './utils';

export const VFS_TS_562_ES2020_FILES = (options: LibDtsMapOptions): Record<string, string> => {
	return {
		...VFS_TS_562_ES2019_FILES(options),
		'/lib.es2020.bigint.d.ts': es2020Bigint,
		'/lib.es2020.date.d.ts': es2020Date,
		'/lib.es2020.d.ts': es2020,
		// es2020.full is entry point, use es2020 to avoid unnecessary declarations
		'/lib.es2020.full.d.ts': options.full ? es2020Full : es2020,
		'/lib.es2020.intl.d.ts': es2020Intl,
		'/lib.es2020.number.d.ts': es2020Number,
		'/lib.es2020.promise.d.ts': es2020Promise,
		'/lib.es2020.sharedmemory.d.ts': es2020SharedMemory,
		'/lib.es2020.string.d.ts': es2020String,
		'/lib.es2020.symbol.wellknown.d.ts': es2020SymbolWellKnown
	};
};
/**
 * typescript 5.6.2, es2020
 */
export const VFS_TS_562_ES2020 = (options?: DtsMapOptions): DtsMap => {
	return createDTSMap(VFS_TS_562_ES2020_FILES({...options, full: false}));
};
export const VFS_TS_562_ES2020_FULL = (options?: DtsMapOptions): DtsMap => {
	return createDTSMapWithDOMGteEs2018(VFS_TS_562_ES2020_FILES({...options, full: true}));
};
