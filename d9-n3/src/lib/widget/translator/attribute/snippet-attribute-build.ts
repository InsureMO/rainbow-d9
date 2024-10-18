import {ExternalDefIndicator, NodeDef, Undefinable, VUtils} from '@rainbow-d9/n1';
import {$d9n3, isUseDynamicFuncsInScriptTag, nonce} from '../../../constants';
import {ParsedNodeType} from '../../../node-types';
import {
	ParsedCode,
	ParsedEmphasis,
	ParsedInlineCode,
	ParsedListItemAttributePair,
	ParsedParagraph,
	ParsedStrong,
	ParsedText
} from '../../../semantic';
import {AsyncFunction as AsyncFunc, SyncFunction as SyncFunc} from '../../../utils';
import {AbstractTranslator} from '../abstract-translator';
import {AttributeValueBuild, ScriptSnippet, WidgetPropertyName} from './types';

const parseCodeBlock = (code: ParsedCode): ScriptSnippet => {
	return code.text;
};

const parseParagraph = (textCarrier: ParsedParagraph | ParsedEmphasis | ParsedStrong): ScriptSnippet => {
	return (textCarrier.children ?? [])
		.filter(child => {
			return [
				ParsedNodeType.INLINE_CODE,
				ParsedNodeType.TEXT, ParsedNodeType.EMPHASIS, ParsedNodeType.STRONG
			].includes(child.type);
		})
		.map(child => {
			if (child.type === ParsedNodeType.INLINE_CODE) {
				return (child as ParsedInlineCode).text;
			} else if (child.type === ParsedNodeType.TEXT) {
				return (child as ParsedText).text;
			} else if (child.type === ParsedNodeType.EMPHASIS) {
				return parseParagraph(child as ParsedEmphasis);
			} else if (child.type === ParsedNodeType.STRONG) {
				return parseParagraph(child as ParsedStrong);
			} else {
				return '';
			}
		}).join('');
};

export const parseSnippet = (attributeValue: string, item: ParsedListItemAttributePair): ExternalDefIndicator | ScriptSnippet => {
	const {children} = item;
	const concerned = (children ?? [])
		.filter(child => child.type === ParsedNodeType.CODE || ParsedNodeType.PARAGRAPH);
	if (concerned.length === 0) {
		if (VUtils.isNotBlank(attributeValue)) {
			if (attributeValue.trim().toLowerCase().startsWith(AbstractTranslator.EXTERNAL_DEF_PREFIX)) {
				return new ExternalDefIndicator(attributeValue.trim().substring(AbstractTranslator.EXTERNAL_DEF_PREFIX.length));
			} else {
				return attributeValue;
			}
		} else {
			return '';
		}
	}
	const snippet = concerned.map(node => {
		if (node.type === ParsedNodeType.CODE) {
			return parseCodeBlock(node as ParsedCode);
		} else if (node.type === ParsedNodeType.PARAGRAPH) {
			return parseParagraph(node as ParsedParagraph);
		} else {
			return '';
		}
	}).join('\n');
	if (VUtils.isNotBlank(attributeValue)) {
		return `${attributeValue}\n${snippet}`;
	} else {
		return snippet;
	}
};

export const createSnippetBuild = <D extends NodeDef | object, P extends keyof D, F = D[P]>(
	attrName: P | string, createFunc: (parsed: string) => F
): AttributeValueBuild<F | ExternalDefIndicator> => {
	return {
		accept: (key: WidgetPropertyName) => key === attrName,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		build: (value: Undefinable<string>, list: ParsedListItemAttributePair): Undefinable<F | ExternalDefIndicator> => {
			const parsed = parseSnippet(value, list);
			if (parsed instanceof ExternalDefIndicator) {
				// in fact, external def indicator is already intercepted by caller,
				// see AbstractTranslator.buildAttributeValue for more details
				return parsed;
			} else if (VUtils.isBlank(parsed)) {
				return (void 0);
			} else {
				return createFunc(parsed);
			}
		}
	};
};

const createFuncByScriptTag = (sync = true) => <R>(...args: Array<string>): R => {
	const renderNode = document.createElement('script');
	const argNames = args.slice(0, args.length - 1);
	const body = args[args.length - 1];

	let key = VUtils.generateUniqueId();
	while ($d9n3.$dynamicFuncs[key] != null) {
		key = VUtils.generateUniqueId();
	}
	renderNode.text = `{
	window.$d9n3.$dynamicFuncs["${key}"] = () => {
		return ${sync ? '' : 'async'} (${argNames.join(', ')}) => {
			// console.log('I am created by script tag and is ${sync ? 'sync' : 'async'}.');
			${body}
		};
	}
	// console.log($d9n3.$dynamicFuncs["${key}"]);
}
`;
	renderNode.setAttribute('nonce', nonce());

	document.head.appendChild(renderNode).parentNode.removeChild(renderNode);
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const func = $d9n3.$dynamicFuncs[key]();
	delete $d9n3.$dynamicFuncs[key];
	return func;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const buildFunc = <R = Function>(async: boolean, body: string, ...argNames: Array<string>): R => {
	if (async) {
		const AsyncFunction = isUseDynamicFuncsInScriptTag() ? createFuncByScriptTag(false) : AsyncFunc;
		if (argNames == null || argNames.length === 0) {
			return AsyncFunction(body) as R;
		} else {
			return AsyncFunction(...argNames, body) as R;
		}
	} else {
		const SyncFunction = isUseDynamicFuncsInScriptTag() ? createFuncByScriptTag(true) : SyncFunc;
		if (argNames == null || argNames.length === 0) {
			return SyncFunction(body) as R;
		} else {
			return SyncFunction(...argNames, body) as R;
		}
	}
};
export type SyncSnippetBuild<D extends NodeDef | object, P extends keyof D> = AttributeValueBuild<D[P] | ExternalDefIndicator>
export const createSyncSnippetBuild = <D extends NodeDef | object, P extends keyof D>(
	// eslint-disable-next-line @typescript-eslint/no-inferrable-types
	attrName: P | string, argNames: Array<string>, avoidFuncWhenSingleLine: boolean = false
): SyncSnippetBuild<D, P> => {
	return createSnippetBuild<D, P, D[P]>(attrName, (parsed: string) => {
		if (parsed.indexOf('\n') === -1 && avoidFuncWhenSingleLine) {
			return parsed as D[P];
		}
		return buildFunc(false, parsed, ...argNames);
	});
};

export type AsyncSnippetBuild<D extends NodeDef | object, P extends keyof D> = AttributeValueBuild<D[P] | ExternalDefIndicator>
export const createAsyncSnippetBuild = <D extends NodeDef | object, P extends keyof D>(
	// eslint-disable-next-line @typescript-eslint/no-inferrable-types
	attrName: P | string, argNames: Array<string>, avoidFuncWhenSingleLine: boolean = false
): AsyncSnippetBuild<D, P> => {
	return createSnippetBuild<D, P, D[P]>(attrName, (parsed: string) => {
		if (parsed.indexOf('\n') === -1 && avoidFuncWhenSingleLine) {
			return parsed as D[P];
		}
		return buildFunc(true, parsed, ...argNames);
	});
};
