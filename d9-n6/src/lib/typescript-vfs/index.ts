// This file is copied from https://github.com/microsoft/TypeScript-Website/blob/v2/packages/typescript-vfs/src/index.ts,
// and has had unnecessary features removed.
// and all d.ts files are copied from typescript v5.6.2
import ts, {
	CompilerHost,
	CompilerOptions,
	CustomTransformers,
	LanguageService,
	LanguageServiceHost,
	SourceFile,
	System,
	TextSpan
} from 'typescript';
import {dts as decorators} from './lib.decorators.dts';
import {dts as decoratorsLegacy} from './lib.decorators.legacy.dts';
import {dts as domAsyncIterable} from './lib.dom.asynciterable.dts';
import {dts as dom} from './lib.dom.dts';
import {dts as domIterable} from './lib.dom.iterable.dts';
import {dts as lib} from './lib.dts';
import {dts as es2015Collection} from './lib.es2015.collection.dts';
import {dts as es2015Core} from './lib.es2015.core.dts';
import {dts as es2015} from './lib.es2015.dts';
import {dts as es2015Generator} from './lib.es2015.generator.dts';
import {dts as es2015Iterable} from './lib.es2015.iterable.dts';
import {dts as es2015Promise} from './lib.es2015.promise.dts';
import {dts as es2015Proxy} from './lib.es2015.proxy.dts';
import {dts as es2015Reflect} from './lib.es2015.reflect.dts';
import {dts as es2015Symbol} from './lib.es2015.symbol.dts';
import {dts as es2015SymbolWellKnown} from './lib.es2015.symbol.wellknown.dts';
import {dts as es2016ArrayInclude} from './lib.es2016.array.include.dts';
import {dts as es2016} from './lib.es2016.dts';
import {dts as es2016Full} from './lib.es2016.full.dts';
import {dts as es2016Intl} from './lib.es2016.intl.dts';
import {dts as es2017Date} from './lib.es2017.date.dts';
import {dts as es2017} from './lib.es2017.dts';
import {dts as es2017Full} from './lib.es2017.full.dts';
import {dts as es2017Intl} from './lib.es2017.intl.dts';
import {dts as es2017Object} from './lib.es2017.object.dts';
import {dts as es2017SharedMemory} from './lib.es2017.sharedmemory.dts';
import {dts as es2017String} from './lib.es2017.string.dts';
import {dts as es2017TypedArrays} from './lib.es2017.typedarrays.dts';
import {dts as es2018AsyncGenerator} from './lib.es2018.asyncgenerator.dts';
import {dts as es2018AsyncIterable} from './lib.es2018.asynciterable.dts';
import {dts as es2018} from './lib.es2018.dts';
import {dts as es2018Full} from './lib.es2018.full.dts';
import {dts as es2018Intl} from './lib.es2018.intl.dts';
import {dts as es2018Promise} from './lib.es2018.promise.dts';
import {dts as es2018Regexp} from './lib.es2018.regexp.dts';
import {dts as es2019Array} from './lib.es2019.array.dts';
import {dts as es2019} from './lib.es2019.dts';
import {dts as es2019Full} from './lib.es2019.full.dts';
import {dts as es2019Intl} from './lib.es2019.intl.dts';
import {dts as es2019Object} from './lib.es2019.object.dts';
import {dts as es2019String} from './lib.es2019.string.dts';
import {dts as es2019Symbol} from './lib.es2019.symbol.dts';
import {dts as es2020Bigint} from './lib.es2020.bigint.dts';
import {dts as es2020Date} from './lib.es2020.date.dts';
import {dts as es2020} from './lib.es2020.dts';
import {dts as es2020Full} from './lib.es2020.full.dts';
import {dts as es2020Intl} from './lib.es2020.intl.dts';
import {dts as es2020Number} from './lib.es2020.number.dts';
import {dts as es2020Promise} from './lib.es2020.promise.dts';
import {dts as es2020SharedMemory} from './lib.es2020.sharedmemory.dts';
import {dts as es2020String} from './lib.es2020.string.dts';
import {dts as es2020SymbolWellKnown} from './lib.es2020.symbol.wellknown.dts';
import {dts as es2021} from './lib.es2021.dts';
import {dts as es2021Full} from './lib.es2021.full.dts';
import {dts as es2021Intl} from './lib.es2021.intl.dts';
import {dts as es2021Promise} from './lib.es2021.promise.dts';
import {dts as es2021String} from './lib.es2021.string.dts';
import {dts as es2021WeakRef} from './lib.es2021.weakref.dts';
import {dts as es2022Array} from './lib.es2022.array.dts';
import {dts as es2022} from './lib.es2022.dts';
import {dts as es2022Error} from './lib.es2022.error.dts';
import {dts as es2022Full} from './lib.es2022.full.dts';
import {dts as es2022Intl} from './lib.es2022.intl.dts';
import {dts as es2022Object} from './lib.es2022.object.dts';
import {dts as es2022Regexp} from './lib.es2022.regexp.dts';
import {dts as es2022SharedMemory} from './lib.es2022.sharedmemory.dts';
import {dts as es2022String} from './lib.es2022.string.dts';
import {dts as es2023Array} from './lib.es2023.array.dts';
import {dts as es2023Collection} from './lib.es2023.collection.dts';
import {dts as es2023} from './lib.es2023.dts';
import {dts as es2023Full} from './lib.es2023.full.dts';
import {dts as es2023Intl} from './lib.es2023.intl.dts';
import {dts as es5} from './lib.es5.dts';
import {dts as es6} from './lib.es6.dts';
import {dts as esnextArray} from './lib.esnext.array.dts';
import {dts as esnextCollection} from './lib.esnext.collection.dts';
import {dts as esnextDecorators} from './lib.esnext.decorators.dts';
import {dts as esnextDisposable} from './lib.esnext.disposable.dts';
import {dts as esnext} from './lib.esnext.dts';
import {dts as esnextFull} from './lib.esnext.full.dts';
import {dts as esnextIntl} from './lib.esnext.intl.dts';
import {dts as esnextIterator} from './lib.esnext.iterator.dts';
import {dts as esnextObject} from './lib.esnext.object.dts';
import {dts as esnextPromise} from './lib.esnext.promise.dts';
import {dts as esnextRegexp} from './lib.esnext.regexp.dts';
import {dts as esnextString} from './lib.esnext.string.dts';
import {dts as scriptHost} from './lib.scripthost.dts';
import {dts as webWorkerAsyncIterable} from './lib.webworker.asynciterable.dts';
import {dts as webWorker} from './lib.webworker.dts';
import {dts as webWorkerImportScripts} from './lib.webworker.importscripts.dts';
import {dts as webWorkerIterable} from './lib.webworker.iterable.dts';

export const ALL_FILES_MAP: Map<string, string> = (() => {
	const files = {
		'/lib.decorators.dts': decorators,
		'/lib.decorators.legacy.dts': decoratorsLegacy,
		'/lib.dom.asynciterable.dts': domAsyncIterable,
		'/lib.dom.dts': dom,
		'/lib.dom.iterable.dts': domIterable,
		'/lib.dts': lib,
		'/lib.es5.dts': es5,
		'/lib.es6.dts': es6,
		'/lib.es2015.collection.dts': es2015Collection,
		'/lib.es2015.core.dts': es2015Core,
		'/lib.es2015.dts': es2015,
		'/lib.es2015.generator.dts': es2015Generator,
		'/lib.es2015.iterable.dts': es2015Iterable,
		'/lib.es2015.promise.dts': es2015Promise,
		'/lib.es2015.proxy.dts': es2015Proxy,
		'/lib.es2015.reflect.dts': es2015Reflect,
		'/lib.es2015.symbol.dts': es2015Symbol,
		'/lib.es2015.symbol.wellknown.dts': es2015SymbolWellKnown,
		'/lib.es2016.array.include.dts': es2016ArrayInclude,
		'/lib.es2016.dts': es2016,
		'/lib.es2016.full.dts': es2016Full,
		'/lib.es2016.intl.dts': es2016Intl,
		'/lib.es2017.date.dts': es2017Date,
		'/lib.es2017.dts': es2017,
		'/lib.es2017.full.dts': es2017Full,
		'/lib.es2017.intl.dts': es2017Intl,
		'/lib.es2017.object.dts': es2017Object,
		'/lib.es2017.sharedmemory.dts': es2017SharedMemory,
		'/lib.es2017.string.dts': es2017String,
		'/lib.es2017.typedarrays.dts': es2017TypedArrays,
		'/lib.es2018.asyncgenerator.dts': es2018AsyncGenerator,
		'/lib.es2018.asynciterable.dts': es2018AsyncIterable,
		'/lib.es2018.dts': es2018,
		'/lib.es2018.full.dts': es2018Full,
		'/lib.es2018.intl.dts': es2018Intl,
		'/lib.es2018.promise.dts': es2018Promise,
		'/lib.es2018.regexp.dts': es2018Regexp,
		'/lib.es2019.array.dts': es2019Array,
		'/lib.es2019.dts': es2019,
		'/lib.es2019.full.dts': es2019Full,
		'/lib.es2019.intl.dts': es2019Intl,
		'/lib.es2019.object.dts': es2019Object,
		'/lib.es2019.string.dts': es2019String,
		'/lib.es2019.symbol.dts': es2019Symbol,
		'/lib.es2020.bigint.dts': es2020Bigint,
		'/lib.es2020.date.dts': es2020Date,
		'/lib.es2020.dts': es2020,
		'/lib.es2020.full.dts': es2020Full,
		'/lib.es2020.intl.dts': es2020Intl,
		'/lib.es2020.number.dts': es2020Number,
		'/lib.es2020.promise.dts': es2020Promise,
		'/lib.es2020.sharedmemory.dts': es2020SharedMemory,
		'/lib.es2020.string.dts': es2020String,
		'/lib.es2020.symbol.wellknown.dts': es2020SymbolWellKnown,
		'/lib.es2021.dts': es2021,
		'/lib.es2021.full.dts': es2021Full,
		'/lib.es2021.intl.dts': es2021Intl,
		'/lib.es2021.promise.dts': es2021Promise,
		'/lib.es2021.string.dts': es2021String,
		'/lib.es2021.weakref.dts': es2021WeakRef,
		'/lib.es2022.array.dts': es2022Array,
		'/lib.es2022.dts': es2022,
		'/lib.es2022.error.dts': es2022Error,
		'/lib.es2022.full.dts': es2022Full,
		'/lib.es2022.intl.dts': es2022Intl,
		'/lib.es2022.object.dts': es2022Object,
		'/lib.es2022.regexp.dts': es2022Regexp,
		'/lib.es2022.sharedmemory.dts': es2022SharedMemory,
		'/lib.es2022.string.dts': es2022String,
		'/lib.es2023.array.dts': es2023Array,
		'/lib.es2023.collection.dts': es2023Collection,
		'/lib.es2023.dts': es2023,
		'/lib.es2023.full.dts': es2023Full,
		'/lib.es2023.intl.dts': es2023Intl,
		'/lib.esnext.array.dts': esnextArray,
		'/lib.esnext.collection.dts': esnextCollection,
		'/lib.esnext.decorators.dts': esnextDecorators,
		'/lib.esnext.disposable.dts': esnextDisposable,
		'/lib.esnext.dts': esnext,
		'/lib.esnext.full.dts': esnextFull,
		'/lib.esnext.intl.dts': esnextIntl,
		'/lib.esnext.iterator.dts': esnextIterator,
		'/lib.esnext.object.dts': esnextObject,
		'/lib.esnext.promise.dts': esnextPromise,
		'/lib.esnext.regexp.dts': esnextRegexp,
		'/lib.esnext.string.dts': esnextString,
		'/lib.scripthost.dts': scriptHost,
		'/lib.webworker.asynciterable.dts': webWorkerAsyncIterable,
		'/lib.webworker.dts': webWorker,
		'/lib.webworker.importscripts.dts': webWorkerImportScripts,
		'/lib.webworker.iterable.dts': webWorkerIterable
	};
	const map = new Map<string, string>();
	for (const [path, content] of Object.entries(files)) {
		map.set(path, content);
	}
	return map;
})();

export interface VirtualTypeScriptEnvironment {
	sys: System;
	languageService: LanguageService;
	getSourceFile: (fileName: string) => SourceFile | undefined;
	createFile: (fileName: string, content: string) => void;
	updateFile: (fileName: string, content: string, replaceTextSpan?: TextSpan) => void;
	deleteFile: (fileName: string) => void;
}

/**
 * Makes a virtual copy of the TypeScript environment. This is the main API you want to be using with
 * @typescript/vfs. A lot of the other exposed functions are used by this function to get set up.
 *
 * @param sys an object which conforms to the TS Sys (a shim over read/write access to the fs)
 * @param rootFiles a list of files which are considered inside the project
 * @param compilerOptions the options for this compiler run
 * @param customTransformers custom transformers for this compiler run
 */

export const createVirtualTypeScriptEnvironment = (
	sys: System,
	rootFiles: string[],
	compilerOptions: CompilerOptions = {},
	customTransformers?: CustomTransformers
): VirtualTypeScriptEnvironment => {
	const mergedCompilerOpts = {...defaultCompilerOptions(), ...compilerOptions};

	const {languageServiceHost, updateFile, deleteFile} = createVirtualLanguageServiceHost(
		sys,
		rootFiles,
		mergedCompilerOpts,
		customTransformers
	);
	const languageService = ts.createLanguageService(languageServiceHost);
	const diagnostics = languageService.getCompilerOptionsDiagnostics();

	if (diagnostics.length) {
		const compilerHost = createVirtualCompilerHost(sys, compilerOptions);
		throw new Error(ts.formatDiagnostics(diagnostics, compilerHost.compilerHost));
	}

	return {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		name: 'vfs',
		sys,
		languageService,
		getSourceFile: fileName => languageService.getProgram()?.getSourceFile(fileName),
		createFile: (fileName, content) => {
			updateFile(ts.createSourceFile(fileName, content, mergedCompilerOpts.target!, false));
		},
		updateFile: (fileName, content, optPrevTextSpan) => {
			const prevSourceFile = languageService.getProgram()!.getSourceFile(fileName);
			if (!prevSourceFile) {
				throw new Error('Did not find a source file for ' + fileName);
			}
			const prevFullContents = prevSourceFile.text;

			// TODO: Validate if the default text span has a fencepost error?
			const prevTextSpan = optPrevTextSpan ?? ts.createTextSpan(0, prevFullContents.length);
			const newText =
				prevFullContents.slice(0, prevTextSpan.start) +
				content +
				prevFullContents.slice(prevTextSpan.start + prevTextSpan.length);
			const newSourceFile = ts.updateSourceFile(prevSourceFile, newText, {
				span: prevTextSpan,
				newLength: content.length
			});

			updateFile(newSourceFile);
		},
		deleteFile(fileName) {
			const sourceFile = languageService.getProgram()!.getSourceFile(fileName);
			if (sourceFile) {
				deleteFile(sourceFile);
			}
		}
	};
};

// TODO: This could be replaced by grabbing: https://github.com/microsoft/TypeScript/blob/main/src/lib/libs.json
// and then using that to generate the list of files from the server, but it is not included in the npm package

const notImplemented = (methodName: string): never => {
	throw new Error(`Method '${methodName}' is not implemented.`);
};

/** The default compiler options if TypeScript could ever change the compiler options */
const defaultCompilerOptions = (): CompilerOptions => {
	return {
		...ts.getDefaultCompilerOptions(),
		jsx: ts.JsxEmit.None,   // no jsx
		strict: true,
		esModuleInterop: true,
		module: ts.ModuleKind.ES2022,
		suppressOutputPathCheck: true,
		skipLibCheck: true,
		skipDefaultLibCheck: true,
		moduleResolution: ts.ModuleResolutionKind.Node16
	};
};

// "/DOM.d.ts" => "/lib.dom.d.ts"
const libize = (path: string) => path.replace('/', '/lib.').toLowerCase();

/**
 * Creates an in-memory System object which can be used in a TypeScript program, this
 * is what provides read/write aspects of the virtual fs
 */
export const createSystem = (files: Map<string, string>): System => {
	return {
		args: [],
		createDirectory: () => notImplemented('createDirectory'),
		// TODO: could make a real file tree
		directoryExists: directory => {
			return Array.from(files.keys()).some(path => path.startsWith(directory));
		},
		exit: () => notImplemented('exit'),
		fileExists: fileName => files.has(fileName) || files.has(libize(fileName)),
		getCurrentDirectory: () => '/',
		getDirectories: () => [],
		getExecutingFilePath: () => notImplemented('getExecutingFilePath'),
		readDirectory: directory => (directory === '/' ? Array.from(files.keys()) : []),
		readFile: fileName => files.get(fileName) ?? files.get(libize(fileName)),
		resolvePath: path => path,
		newLine: '\n',
		useCaseSensitiveFileNames: true,
		write: () => notImplemented('write'),
		writeFile: (fileName, contents) => {
			files.set(fileName, contents);
		},
		deleteFile: (fileName) => {
			files.delete(fileName);
		}
	};
};

export interface VirtualCompilerHost {
	compilerHost: CompilerHost;
	updateFile: (sourceFile: SourceFile) => boolean;
	deleteFile: (sourceFile: SourceFile) => boolean;

}

/**
 * Creates an in-memory CompilerHost -which is essentially an extra wrapper to System
 * which works with TypeScript objects - returns both a compiler host, and a way to add new SourceFile
 * instances to the in-memory file system.
 */
export const createVirtualCompilerHost = (sys: System, compilerOptions: CompilerOptions): VirtualCompilerHost => {
	const sourceFiles = new Map<string, SourceFile>();
	const save = (sourceFile: SourceFile) => {
		sourceFiles.set(sourceFile.fileName, sourceFile);
		return sourceFile;
	};

	return {
		compilerHost: {
			...sys,
			getCanonicalFileName: fileName => fileName,
			getDefaultLibFileName: () => '/' + ts.getDefaultLibFileName(compilerOptions), // '/lib.d.ts',
			// getDefaultLibLocation: () => '/',
			getNewLine: () => sys.newLine,
			getSourceFile: (fileName, languageVersionOrOptions) => {
				return (
					sourceFiles.get(fileName) ||
					save(
						ts.createSourceFile(
							fileName,
							sys.readFile(fileName)!,
							languageVersionOrOptions ?? compilerOptions.target ?? defaultCompilerOptions().target!,
							false
						)
					)
				);
			},
			useCaseSensitiveFileNames: () => sys.useCaseSensitiveFileNames
		},
		updateFile: sourceFile => {
			const alreadyExists = sourceFiles.has(sourceFile.fileName);
			sys.writeFile(sourceFile.fileName, sourceFile.text);
			sourceFiles.set(sourceFile.fileName, sourceFile);
			return alreadyExists;
		},
		deleteFile: sourceFile => {
			const alreadyExists = sourceFiles.has(sourceFile.fileName);
			sourceFiles.delete(sourceFile.fileName);
			sys.deleteFile!(sourceFile.fileName);
			return alreadyExists;
		}
	};
};

export interface VirtualLanguageServiceHost {
	languageServiceHost: LanguageServiceHost;
	updateFile: (sourceFile: SourceFile) => void;
	deleteFile: (sourceFile: SourceFile) => void;
}

/**
 * Creates an object which can host a language service against the virtual file-system
 */
export const createVirtualLanguageServiceHost = (
	sys: System,
	rootFiles: string[],
	compilerOptions: CompilerOptions,
	customTransformers?: CustomTransformers
): VirtualLanguageServiceHost => {
	const fileNames = [...rootFiles];
	const {compilerHost, updateFile, deleteFile} = createVirtualCompilerHost(sys, compilerOptions);
	const fileVersions = new Map<string, string>();
	let projectVersion = 0;
	const languageServiceHost: LanguageServiceHost = {
		...compilerHost,
		getProjectVersion: () => projectVersion.toString(),
		getCompilationSettings: () => compilerOptions,
		getCustomTransformers: () => customTransformers,
		// A couple weeks of 4.8 TypeScript nightlies had a bug where the Program's
		// list of files was just a reference to the array returned by this host method,
		// which means mutations by the host that ought to result in a new Program being
		// created were not detected, since the old list of files and the new list of files
		// were in fact a reference to the same underlying array. That was fixed in
		// https://github.com/microsoft/TypeScript/pull/49813, but since the twoslash runner
		// is used in bisecting for changes, it needs to guard against being busted in that
		// couple-week period, so we defensively make a slice here.
		getScriptFileNames: () => fileNames.slice(),
		getScriptSnapshot: fileName => {
			const contents = sys.readFile(fileName);
			if (contents && typeof contents === 'string') {
				return ts.ScriptSnapshot.fromString(contents);
			}
			return;
		},
		getScriptVersion: fileName => {
			return fileVersions.get(fileName) || '0';
		},
		writeFile: sys.writeFile
	};

	return {
		languageServiceHost,
		updateFile: sourceFile => {
			projectVersion++;
			fileVersions.set(sourceFile.fileName, projectVersion.toString());
			if (!fileNames.includes(sourceFile.fileName)) {
				fileNames.push(sourceFile.fileName);
			}
			updateFile(sourceFile);
		},
		deleteFile: sourceFile => {
			projectVersion++;
			fileVersions.set(sourceFile.fileName, projectVersion.toString());
			const index = fileNames.indexOf(sourceFile.fileName);
			if (index !== -1) {
				fileNames.splice(index, 1);
			}
			deleteFile(sourceFile);
		}
	};
};
