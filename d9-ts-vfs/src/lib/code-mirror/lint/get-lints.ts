/** copy from @valtown/codemirror-ts */
import {syntaxTree} from '@codemirror/language';
import {Diagnostic as CMLintDiagnostic} from '@codemirror/lint';
import {EditorView} from '@codemirror/view';
import {Diagnostic, DiagnosticWithLocation} from 'typescript';
import {VirtualTypeScriptEnvironment} from '../../vfs';
import {convertTSDiagnosticToCM, isDiagnosticWithLocation} from './utils.js';

export const getLintsOnImpExp = (view: EditorView) => {
	const diagnostics: Array<CMLintDiagnostic> = [];
	const tree = syntaxTree(view.state);
	tree.cursor().iterate(node => {
		switch (node.name) {
			case 'DynamicImport':
				diagnostics.push({
					from: node.from, to: node.to,
					severity: 'error', message: 'Dynamic import is not allowed.'
				});
				break;
			case 'ImportDeclaration':
				diagnostics.push({
					from: node.from, to: node.to,
					severity: 'error', message: 'Import declaration is not allowed.'
				});
				break;
			case 'ExportDeclaration':
				diagnostics.push({
					from: node.from, to: node.to,
					severity: 'error', message: 'Export declaration is not allowed.'
				});
				break;
			default:
				break;
		}
	});
	return diagnostics;
};

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
export const getLintsFromVfs = (options: GetLintsOptions): Array<CMLintDiagnostic> => {
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
