import {DtsFileContent, DtsFileKey, DtsMap} from './types';
import {dts as domAsyncIterable} from './typescript/lib/lib.dom.asynciterable.d.ts?dts';
import {dts as dom, dts as domIterable} from './typescript/lib/lib.dom.d.ts?dts';
import {dts as scriptHost} from './typescript/lib/lib.scripthost.d.ts?dts';
import {dts as webWorkerImportScripts} from './typescript/lib/lib.webworker.importscripts.d.ts?dts';

export const createDTSMap = (files: Record<string, string>): DtsMap => {
	const map = new Map<DtsFileKey, DtsFileContent>();
	for (const [path, content] of Object.entries(files)) {
		map.set(path, content);
	}
	return map;
};
/**
 * lib (full version of es5)
 */
export const createEs5DTSMapWithDOM = (files: Record<string, string>): DtsMap => {
	return createDTSMap({
		...files,
		'/lib.dom.d.ts': dom,
		'/lib.webworker.importscripts.d.ts': webWorkerImportScripts,
		'/lib.scripthost.d.ts': scriptHost
	});
};
/**
 * less than 2018, which are es2017, es2016, es6 (full version of es2015)
 */
export const createDTSMapWithDOMLtEs2018 = (files: Record<string, string>): DtsMap => {
	return createDTSMap({
		...files,
		'/lib.dom.d.ts': dom,
		'/lib.dom.iterable.d.ts': domIterable,
		'/lib.webworker.importscripts.d.ts': webWorkerImportScripts,
		'/lib.scripthost.d.ts': scriptHost
	});
};
/**
 * greater than or equals 2018, which are es2018, es2019, es2020, es2021, es2022, es2023, esnext
 */
export const createDTSMapWithDOMGteEs2018 = (files: Record<string, string>): DtsMap => {
	return createDTSMap({
		...files,
		'/lib.dom.asynciterable.d.ts': domAsyncIterable,
		'/lib.dom.d.ts': dom,
		'/lib.dom.iterable.d.ts': domIterable,
		'/lib.webworker.importscripts.d.ts': webWorkerImportScripts,
		'/lib.scripthost.d.ts': scriptHost
	});
};