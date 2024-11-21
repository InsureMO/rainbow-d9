// and all d.ts files are copied from typescript v5.6.2
import {DtsMap, DtsMapOptions, LibDtsMapOptions} from './types';
import {dts as lib} from './typescript/lib/lib.d.ts?dts';
import {dts as decorators} from './typescript/lib/lib.decorators.d.ts?dts';
import {dts as decoratorsLegacy} from './typescript/lib/lib.decorators.legacy.d.ts?dts';
import {dts as es5} from './typescript/lib/lib.es5.d.ts?dts';
import {createDTSMap, createEs5DTSMapWithDOM} from './utils';

export const VFS_TS_562_ES5_FILES = (options: LibDtsMapOptions): Record<string, string> => {
	const extendDtsContents = options.extend?.();
	const extendNonameDtsContents: Array<string> = [];
	const extendNamedDtsContents: Record<string, string> = {};
	if (extendDtsContents == null) {
		// do nothing
	} else if (Array.isArray(extendDtsContents)) {
		extendDtsContents.forEach((content) => {
			if (typeof content === 'string') {
				extendNonameDtsContents.push(content);
			} else {
				Object.keys(content).forEach((key) => {
					extendNamedDtsContents[key] = content[key];
				});
			}
		});
	} else if (typeof extendDtsContents === 'string') {
		extendNonameDtsContents.push(extendDtsContents);
	} else {
		Object.keys(extendDtsContents).forEach((key) => {
			extendNamedDtsContents[key] = extendDtsContents[key];
		});
	}
	return {
		'/lib.decorators.d.ts': decorators,
		'/lib.decorators.legacy.d.ts': decoratorsLegacy,
		'/lib.es5.d.ts': (() => {
			if (extendNonameDtsContents.length === 0) {
				return es5;
			} else {
				return `${es5}\n${extendNonameDtsContents.join('\n')}`;
			}
		})(),
		...(Object.keys(extendNamedDtsContents).reduce((map, key) => {
			map[`/lib.external.${key}.d.ts`] = extendNamedDtsContents[key];
			return map;
		}, {})),
		...(options.full ? {'/lib.d.ts': lib} : {})
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
