/** copy from @valtown/codemirror-ts */
import {Diagnostic as CMLintDiagnostic} from '@codemirror/lint';
import {Diagnostic, DiagnosticWithLocation} from 'typescript';
import {VirtualTypeScriptEnvironment} from '../../vfs';
import {convertTSDiagnosticToCM, isDiagnosticWithLocation} from './utils.js';

export interface GetLintsOptions {
	env: VirtualTypeScriptEnvironment;
	path: string;
	diagnosticCodesToIgnore: number[];
}

/**
 * Lower-level interface to get semantic and syntactic
 * diagnostics from the TypeScript environment.
 *
 * This is used by tsLinter and tsLinterWorker,
 * but you can use it directly to power other UI.
 */
export const getLints = (options: GetLintsOptions): Array<CMLintDiagnostic> => {
	const {env, path, diagnosticCodesToIgnore} = options;
	// Don't crash if the relevant file isn't created yet.
	const exists = env.getSourceFile(path);
	if (!exists) {
		return [];
	}

	const syntacticDiagnostics = env.languageService.getSyntacticDiagnostics(path);
	const semanticDiagnostics = env.languageService.getSemanticDiagnostics(path);

	const diagnostics = [...syntacticDiagnostics, ...semanticDiagnostics]
		.filter((diagnostic: Diagnostic | DiagnosticWithLocation): diagnostic is DiagnosticWithLocation => {
			return isDiagnosticWithLocation(diagnostic) && !diagnosticCodesToIgnore.includes(diagnostic.code);
		});

	return diagnostics.map(convertTSDiagnosticToCM);
};