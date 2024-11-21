// and all d.ts files are copied from typescript v5.6.2
import {VFS_TS_562_ES2023_FILES} from './dts-ts-562-es2023';
import {DtsMap, DtsMapOptions, LibDtsMapOptions} from './types';
import {dts as esnextArray} from './typescript/lib/lib.esnext.array.d.ts?dts';
import {dts as esnextCollection} from './typescript/lib/lib.esnext.collection.d.ts?dts';
import {dts as esnext} from './typescript/lib/lib.esnext.d.ts?dts';
import {dts as esnextDecorators} from './typescript/lib/lib.esnext.decorators.d.ts?dts';
import {dts as esnextDisposable} from './typescript/lib/lib.esnext.disposable.d.ts?dts';
import {dts as esnextFull} from './typescript/lib/lib.esnext.full.d.ts?dts';
import {dts as esnextIntl} from './typescript/lib/lib.esnext.intl.d.ts?dts';
import {dts as esnextIterator} from './typescript/lib/lib.esnext.iterator.d.ts?dts';
import {dts as esnextObject} from './typescript/lib/lib.esnext.object.d.ts?dts';
import {dts as esnextPromise} from './typescript/lib/lib.esnext.promise.d.ts?dts';
import {dts as esnextRegexp} from './typescript/lib/lib.esnext.regexp.d.ts?dts';
import {dts as esnextString} from './typescript/lib/lib.esnext.string.d.ts?dts';
import {createDTSMap, createDTSMapWithDOMGteEs2018} from './utils';

export const VFS_TS_562_ESNEXT_FILES = (options: LibDtsMapOptions): Record<string, string> => {
	return {
		...VFS_TS_562_ES2023_FILES(options),
		'/lib.esnext.array.d.ts': esnextArray,
		'/lib.esnext.collection.d.ts': esnextCollection,
		'/lib.esnext.decorators.d.ts': esnextDecorators,
		'/lib.esnext.disposable.d.ts': esnextDisposable,
		'/lib.esnext.d.ts': esnext,
		// esnext.full is entry point, use esnext to avoid unnecessary declarations
		'/lib.esnext.full.d.ts': options.full ? esnextFull : esnext,
		'/lib.esnext.intl.d.ts': esnextIntl,
		'/lib.esnext.iterator.d.ts': esnextIterator,
		'/lib.esnext.object.d.ts': esnextObject,
		'/lib.esnext.promise.d.ts': esnextPromise,
		'/lib.esnext.regexp.d.ts': esnextRegexp,
		'/lib.esnext.string.d.ts': esnextString
	};
};
/**
 * typescript 5.6.2, esnext
 */
export const VFS_TS_562_ESNEXT = (options?: DtsMapOptions): DtsMap => {
	return createDTSMap(VFS_TS_562_ESNEXT_FILES({...options, full: false}));
};
export const VFS_TS_562_ESNEXT_FULL = (options?: DtsMapOptions): DtsMap => {
	return createDTSMapWithDOMGteEs2018(VFS_TS_562_ESNEXT_FILES({...options, full: true}));
};
