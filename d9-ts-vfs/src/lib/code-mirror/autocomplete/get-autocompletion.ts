/** copy from @valtown/codemirror-ts */
import {Completion, CompletionContext, CompletionResult} from '@codemirror/autocomplete';
import {ScriptElementKind} from 'typescript';
import {VirtualTypeScriptEnvironment} from '../../vfs';
import {DEFAULT_CODEMIRROR_TYPE_ICONS} from './icons';
import {matchBefore} from './match-before';
import {AUTOCOMPLETION_SYMBOLS} from './symbols';

const TS_COMPLETE_BLOCKLIST: Array<ScriptElementKind> = [ScriptElementKind.warning];

export interface GetAutocompletionOptions {
	env: VirtualTypeScriptEnvironment;
	path: string;
	/**
	 * Allow this to be a subset of the full CompletionContext
	 * object, because the raw object isn't serializable.
	 */
	context: Pick<CompletionContext, 'pos' | 'explicit'>;
}

export const getAutocompletion = async (options: GetAutocompletionOptions): Promise<CompletionResult | null> => {
	const {env, path, context} = options;
	const {pos, explicit} = context;
	const rawContents = env.getSourceFile(path)?.getFullText();

	if (!rawContents) return null;

	// If there's space behind the cursor, don't try and autocomplete.
	// https://codemirror.net/examples/autocompletion/
	let word = matchBefore(rawContents, pos, /\w*/);
	if (!word?.text) {
		word = matchBefore(rawContents, pos, /\./);
	}

	if (!word?.text && !explicit) {
		return null;
	}

	const completionInfo = env.languageService.getCompletionsAtPosition(path, pos, {}, {});

	// TODO: build ATA support for a 'loading' state
	// while types are being fetched
	if (!completionInfo) {
		return null;
	}

	const optionsOfResult = completionInfo.entries
		.filter((entry) => {
			return !TS_COMPLETE_BLOCKLIST.includes(entry.kind) &&
				(entry.sortText < '15' || (completionInfo.optionalReplacementSpan?.length && AUTOCOMPLETION_SYMBOLS.includes(entry.name)));
		})
		.map((entry): Completion => {
			const boost = -Number(entry.sortText) || 0;
			let type = entry.kind ? String(entry.kind) : undefined;

			if (type === 'member') {
				type = 'property';
			}

			if (type && !DEFAULT_CODEMIRROR_TYPE_ICONS.has(type)) {
				type = (void 0);
			}

			return {label: entry.name, type, boost};
		});

	return {
		from: word ? (word.text === '.' ? word.to : word.from) : pos,
		options: optionsOfResult
	};
};