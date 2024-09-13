// and all d.ts files are copied from typescript v5.6.2
import {dts as decorators} from './dts-files/lib.decorators.dts';
import {dts as decoratorsLegacy} from './dts-files/lib.decorators.legacy.dts';
import {dts as lib} from './dts-files/lib.dts';
import {dts as es5} from './dts-files/lib.es5.dts';
import {dts as dayjs} from './o23-dts-files/lib.dayjs.dts';
import {dts as decimaljs} from './o23-dts-files/lib.decimaljs.dts';
import {dts as mathjs} from './o23-dts-files/lib.mathjs.dts';
import {dts as o23} from './o23-dts-files/lib.o23.dts';
import {DtsMap} from './types';
import {createDTSMap, createEs5DTSMapWithDOM} from './utils';

// remove eval from es5
const fixedEs5 = es5.replace('declare function eval(x: string): any;', '// declare function eval(x: string): any;');
// cannot use the reference lib in es5 (don't know why), have to join all o23 libs at last
const fixedEs5AndO23 = `${fixedEs5}\n${dayjs}\n${decimaljs}\n${mathjs}\n${o23}`;
export const VFS_TS_562_ES5_FILES = (full: boolean): Record<string, string> => {
	return {
		'/lib.decorators.d.ts': decorators,
		'/lib.decorators.legacy.d.ts': decoratorsLegacy,
		...(full ? {'/lib.d.ts': lib} : {}),
		'/lib.es5.d.ts': fixedEs5AndO23
	};
};
/**
 * typescript 5.6.2, es5
 */
export const VFS_TS_562_ES5 = (): DtsMap => createDTSMap(VFS_TS_562_ES5_FILES(false));
export const VFS_TS_562_LIB = (): DtsMap => createEs5DTSMapWithDOM(VFS_TS_562_ES5_FILES(true));
