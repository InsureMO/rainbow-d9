import {autocompletion} from '@codemirror/autocomplete';
import {tsAutocomplete, tsFacet, tsHover, tsLinter, tsSync} from '@valtown/codemirror-ts';
import {createSystem, createVirtualTypeScriptEnvironment, DtsMap} from '../vfs';

export interface CreateCoeMirrorJavascriptExtensionsOptions {
	files: DtsMap;
}

export const createCodeMirrorJavascriptExtensions = (options: CreateCoeMirrorJavascriptExtensionsOptions) => {
	const {files} = options;

	return () => {
		const system = createSystem(files);
		const compilerOpts = {};
		const env = createVirtualTypeScriptEnvironment(system, [], compilerOpts);
		const path = 'index.ts';

		return [
			tsFacet.of({env, path}),
			tsSync(),
			tsLinter(),
			autocompletion({override: [tsAutocomplete()]}),
			tsHover()
		];
	};
};
