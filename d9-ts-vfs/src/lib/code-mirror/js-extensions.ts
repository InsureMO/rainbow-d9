import {autocompletion} from '@codemirror/autocomplete';
import {Extension} from '@codemirror/state';
import {CompilerOptions} from 'typescript';
import {createSystem, createVirtualTypeScriptEnvironment, DtsMap} from '../vfs';
import {tsAutocomplete} from './autocomplete';
import {tsFacet} from './facet';
import {tsHover} from './hover';
import {tsLinter} from './lint';
import {tsSync} from './sync';

export enum DiagnosticCodes {
	C1118 = 1108, //A_return_statement_can_only_be_used_within_a_function_body_1108
	C1375 = 1375, // await_expressions_are_only_allowed_at_the_top_level_of_a_file_when_that_file_is_a_module_but_this_fi_1375
}

export interface CreateCodeMirrorJavascriptExtensionsOptions {
	files: DtsMap;
	compilerOpts?: CompilerOptions;
}

export type CodeMirrorJavascriptExtensionsCreateFunc = (options?: CodeMirrorJavascriptExtensionsOptions) => Array<Extension>;

export interface CodeMirrorJavascriptExtensionsOptions {
	diagnosticCodesToIgnore?: DiagnosticCodes[];
}

export const defaultCodeMirrorJavascriptExtensionsOptions = (): CodeMirrorJavascriptExtensionsOptions => {
	return {
		diagnosticCodesToIgnore: [DiagnosticCodes.C1118, DiagnosticCodes.C1375]
	};
};

export const createCodeMirrorJavascriptExtensions = (options: CreateCodeMirrorJavascriptExtensionsOptions): CodeMirrorJavascriptExtensionsCreateFunc => {
	const {files, compilerOpts: fixedCompilerOptions} = options;

	return (options: CodeMirrorJavascriptExtensionsOptions = defaultCodeMirrorJavascriptExtensionsOptions()): Array<Extension> => {
		const {diagnosticCodesToIgnore} = options;

		const system = createSystem(files);
		const compilerOpts = fixedCompilerOptions ?? {};
		const env = createVirtualTypeScriptEnvironment(system, [], compilerOpts);
		const path = 'index.ts';

		return [
			tsFacet.of({env, path}),
			tsSync(),
			tsLinter({diagnosticCodesToIgnore}),
			autocompletion({override: [tsAutocomplete()]}),
			tsHover()
		];
	};
};
