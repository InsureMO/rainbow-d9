// and all d.ts files are copied from typescript v5.6.2
import {dts as decorators} from './dts-files/lib.decorators.dts';
import {dts as decoratorsLegacy} from './dts-files/lib.decorators.legacy.dts';
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
import {dts as es2016ArrayInclude} from './dts-files/lib.es2016.array.include.dts';
import {dts as es2016} from './dts-files/lib.es2016.dts';
import {dts as es2016Intl} from './dts-files/lib.es2016.intl.dts';
import {dts as es2017Date} from './dts-files/lib.es2017.date.dts';
import {dts as es2017} from './dts-files/lib.es2017.dts';
import {dts as es2017Intl} from './dts-files/lib.es2017.intl.dts';
import {dts as es2017Object} from './dts-files/lib.es2017.object.dts';
import {dts as es2017SharedMemory} from './dts-files/lib.es2017.sharedmemory.dts';
import {dts as es2017String} from './dts-files/lib.es2017.string.dts';
import {dts as es2017TypedArrays} from './dts-files/lib.es2017.typedarrays.dts';
import {dts as es2018AsyncGenerator} from './dts-files/lib.es2018.asyncgenerator.dts';
import {dts as es2018AsyncIterable} from './dts-files/lib.es2018.asynciterable.dts';
import {dts as es2018} from './dts-files/lib.es2018.dts';
import {dts as es2018Intl} from './dts-files/lib.es2018.intl.dts';
import {dts as es2018Promise} from './dts-files/lib.es2018.promise.dts';
import {dts as es2018Regexp} from './dts-files/lib.es2018.regexp.dts';
import {dts as es2019Array} from './dts-files/lib.es2019.array.dts';
import {dts as es2019} from './dts-files/lib.es2019.dts';
import {dts as es2019Intl} from './dts-files/lib.es2019.intl.dts';
import {dts as es2019Object} from './dts-files/lib.es2019.object.dts';
import {dts as es2019String} from './dts-files/lib.es2019.string.dts';
import {dts as es2019Symbol} from './dts-files/lib.es2019.symbol.dts';
import {dts as es2020Bigint} from './dts-files/lib.es2020.bigint.dts';
import {dts as es2020Date} from './dts-files/lib.es2020.date.dts';
import {dts as es2020} from './dts-files/lib.es2020.dts';
import {dts as es2020Intl} from './dts-files/lib.es2020.intl.dts';
import {dts as es2020Number} from './dts-files/lib.es2020.number.dts';
import {dts as es2020Promise} from './dts-files/lib.es2020.promise.dts';
import {dts as es2020SharedMemory} from './dts-files/lib.es2020.sharedmemory.dts';
import {dts as es2020String} from './dts-files/lib.es2020.string.dts';
import {dts as es2020SymbolWellKnown} from './dts-files/lib.es2020.symbol.wellknown.dts';
import {dts as es5} from './dts-files/lib.es5.dts';
import {DtsMap} from './types';
import {createDTSMap, createDTSMapWithDOMGteEs2018} from './utils';

export const VFS_TS_562_ES2020_FILES = (): Record<string, string> => {
	return {
		'/lib.decorators.d.ts': decorators,
		'/lib.decorators.legacy.d.ts': decoratorsLegacy,
		'/lib.es5.d.ts': es5,
		'/lib.es2015.collection.d.ts': es2015Collection,
		'/lib.es2015.core.d.ts': es2015Core,
		'/lib.es2015.d.ts': es2015,
		'/lib.es2015.generator.d.ts': es2015Generator,
		'/lib.es2015.iterable.d.ts': es2015Iterable,
		'/lib.es2015.promise.d.ts': es2015Promise,
		'/lib.es2015.proxy.d.ts': es2015Proxy,
		'/lib.es2015.reflect.d.ts': es2015Reflect,
		'/lib.es2015.symbol.d.ts': es2015Symbol,
		'/lib.es2015.symbol.wellknown.d.ts': es2015SymbolWellKnown,
		'/lib.es2016.array.include.d.ts': es2016ArrayInclude,
		'/lib.es2016.d.ts': es2016,
		'/lib.es2016.intl.d.ts': es2016Intl,
		'/lib.es2017.date.d.ts': es2017Date,
		'/lib.es2017.d.ts': es2017,
		'/lib.es2017.intl.d.ts': es2017Intl,
		'/lib.es2017.object.d.ts': es2017Object,
		'/lib.es2017.sharedmemory.d.ts': es2017SharedMemory,
		'/lib.es2017.string.d.ts': es2017String,
		'/lib.es2017.typedarrays.d.ts': es2017TypedArrays,
		'/lib.es2018.asyncgenerator.d.ts': es2018AsyncGenerator,
		'/lib.es2018.asynciterable.d.ts': es2018AsyncIterable,
		'/lib.es2018.d.ts': es2018,
		'/lib.es2018.intl.d.ts': es2018Intl,
		'/lib.es2018.promise.d.ts': es2018Promise,
		'/lib.es2018.regexp.d.ts': es2018Regexp,
		'/lib.es2019.array.d.ts': es2019Array,
		'/lib.es2019.d.ts': es2019,
		'/lib.es2019.intl.d.ts': es2019Intl,
		'/lib.es2019.object.d.ts': es2019Object,
		'/lib.es2019.string.d.ts': es2019String,
		'/lib.es2019.symbol.d.ts': es2019Symbol,
		'/lib.es2020.bigint.d.ts': es2020Bigint,
		'/lib.es2020.date.d.ts': es2020Date,
		'/lib.es2020.d.ts': es2020,
		// es2020.full is entry point, use es2020 to avoid unnecessary declarations
		'/lib.es2020.full.d.ts': es2020,
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
export const VFS_TS_562_ES2020 = (): DtsMap => createDTSMap(VFS_TS_562_ES2020_FILES());
export const VFS_TS_562_ES2020_FULL = (): DtsMap => createDTSMapWithDOMGteEs2018(VFS_TS_562_ES2020_FILES());
