// and all d.ts files are copied from typescript v5.6.2
import {DtsMap, DtsMapOptions, LibDtsMapOptions} from './types';
import {dts as lib} from './typescript/lib/lib.d.ts?dts';
import {dts as decorators} from './typescript/lib/lib.decorators.d.ts?dts';
import {dts as decoratorsLegacy} from './typescript/lib/lib.decorators.legacy.d.ts?dts';
import {dts as es5} from './typescript/lib/lib.es5.d.ts?dts';
import {createDTSMap, createEs5DTSMapWithDOM} from './utils';

export const VFS_TS_562_ES5_FILES = (options: LibDtsMapOptions): Record<string, string> => {
	return {
		'/lib.decorators.d.ts': decorators,
		'/lib.decorators.legacy.d.ts': decoratorsLegacy,
		...(options.full ? {'/lib.d.ts': lib} : {}),
		'/lib.es5.d.ts': (() => {
			const extendDts = options.extend?.();
			if (extendDts == null || extendDts.trim().length === 0) {
				return es5;
			} else {
				return `${es5}\n${extendDts}`;
			}
		})()
	};
};
/**
 * typescript 5.6.2, es5
 */
export const VFS_TS_562_ES5 = (options?: DtsMapOptions): DtsMap => {
	return createDTSMap(VFS_TS_562_ES5_FILES({...options, full: false}));
};
export const VFS_TS_562_LIB = (options?: DtsMapOptions): DtsMap => {
	return createEs5DTSMapWithDOM(VFS_TS_562_ES5_FILES({...options, full: true}));
};
