// and all d.ts files are copied from typescript v5.6.2
import {dts as decorators} from './dts-files/lib.decorators.dts';
import {dts as decoratorsLegacy} from './dts-files/lib.decorators.legacy.dts';
import {dts as lib} from './dts-files/lib.dts';
import {dts as es5} from './dts-files/lib.es5.dts';
import {DtsMap, DtsMapOptions, LibDtsMapOptions} from './types';
import {createDTSMap, createEs5DTSMapWithDOM} from './utils';

// remove eval from es5
const fixedEs5 = es5.replace('declare function eval(x: string): any;', '// declare function eval(x: string): any;');
export const VFS_TS_562_ES5_FILES = (options: LibDtsMapOptions): Record<string, string> => {
	return {
		'/lib.decorators.d.ts': decorators,
		'/lib.decorators.legacy.d.ts': decoratorsLegacy,
		...(options.full ? {'/lib.d.ts': lib} : {}),
		'/lib.es5.d.ts': (() => {
			const extendDts = options.extend?.();
			if (extendDts == null || extendDts.trim().length === 0) {
				return fixedEs5;
			} else {
				return `${fixedEs5}\n${extendDts}`;
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
