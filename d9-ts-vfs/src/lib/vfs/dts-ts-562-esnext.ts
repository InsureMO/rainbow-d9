// and all d.ts files are copied from typescript v5.6.2
import {dts as esnextArray} from './dts-files/lib.esnext.array.dts';
import {dts as esnextCollection} from './dts-files/lib.esnext.collection.dts';
import {dts as esnextDecorators} from './dts-files/lib.esnext.decorators.dts';
import {dts as esnextDisposable} from './dts-files/lib.esnext.disposable.dts';
import {dts as esnext} from './dts-files/lib.esnext.dts';
import {dts as esnextFull} from './dts-files/lib.esnext.full.dts';
import {dts as esnextIntl} from './dts-files/lib.esnext.intl.dts';
import {dts as esnextIterator} from './dts-files/lib.esnext.iterator.dts';
import {dts as esnextObject} from './dts-files/lib.esnext.object.dts';
import {dts as esnextPromise} from './dts-files/lib.esnext.promise.dts';
import {dts as esnextRegexp} from './dts-files/lib.esnext.regexp.dts';
import {dts as esnextString} from './dts-files/lib.esnext.string.dts';
import {VFS_TS_562_ES2023_FILES} from './dts-ts-562-es2023';
import {DtsMap, DtsMapOptions, LibDtsMapOptions} from './types';
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
