// This file is copied from https://github.com/microsoft/TypeScript-Website/blob/v2/packages/typescript-vfs/src/index.ts,
// and has had unnecessary features removed.

import ts, {
	CompilerHost,
	CompilerOptions,
	CustomTransformers,
	JsxEmit,
	LanguageService,
	LanguageServiceHost,
	ModuleKind,
	ModuleResolutionKind,
	ScriptSnapshot,
	ScriptTarget,
	SourceFile,
	System,
	TextSpan
} from 'typescript';
import {DtsMap} from './types';

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
const notImplemented = (methodName: string): never => {
	throw new Error(`Method '${methodName}' is not implemented.`);
};
/** The default compiler options if TypeScript could ever change the compiler options */
const defaultCompilerOptions = (): CompilerOptions => {
	return {
		...ts.getDefaultCompilerOptions(),
		target: ScriptTarget.ES2022, // default use 2022, which supported since node 16
		jsx: JsxEmit.None,   // no jsx
		strict: true,
		esModuleInterop: true,
		module: ModuleKind.ES2022,   // default use 2022, which supported since node 16
		suppressOutputPathCheck: true,
		skipLibCheck: true,
		skipDefaultLibCheck: true,
		moduleResolution: ModuleResolutionKind.Node16 // default use node 16
	};
};
// "/DOM.d.ts" => "/lib.dom.d.ts"
const libize = (path: string) => path.replace('/', '/lib.').toLowerCase();
/**
 * Creates an in-memory System object which can be used in a TypeScript program, this
 * is what provides read/write aspects of the virtual fs
 */
export const createSystem = (files: DtsMap): System => {
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
				return ScriptSnapshot.fromString(contents);
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