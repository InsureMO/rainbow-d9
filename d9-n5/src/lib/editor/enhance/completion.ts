import {Completion, CompletionContext, CompletionResult} from '@codemirror/autocomplete';
import {markdownLanguage} from '@codemirror/lang-markdown';
import {syntaxTree} from '@codemirror/language';
import {N2, VUtils} from '@rainbow-d9/n3';
import {ExternalDefsTypes, ExternalDefType, PlaygroundWidgets} from '../../types';
import {
	ATTRIBUTE_VALUE_CONST_START,
	ATTRIBUTE_VALUE_EXT_PREFIX,
	ATTRIBUTE_VALUE_ICON_PREFIX,
	ATTRIBUTE_VALUE_REF_START
} from './widget-parse';

export interface ExtCompletion extends Completion {
	$wt: ExternalDefType['$wt'];
	properties: ExternalDefType['properties'];
}

export const buildExternalDefTypeAsExtOption = (key: string, externalDefType: ExternalDefType, parentKey?: string): ExtCompletion => {
	return {
		label: parentKey == null ? key : `${parentKey}.${key}`,
		detail: externalDefType.label, info: externalDefType.description,
		$wt: externalDefType.$wt, properties: externalDefType.properties
	};
};
export const buildExtOptions = (externalDefsTypes: ExternalDefsTypes, parentKey?: string): Array<ExtCompletion> => {
	return Object.keys(externalDefsTypes).reduce((options, key) => {
		const value = externalDefsTypes[key];
		if (value == null) {
			return options;
		} else if (Array.isArray(value)) {
			options.push(...value.map((item: ExternalDefType | ExternalDefsTypes) => {
				if (item == null) {
					return null;
				}
				if (VUtils.isNotBlank((item as ExternalDefType).$wt)) {
					return buildExternalDefTypeAsExtOption(key, item as ExternalDefType, parentKey);
				} else {
					return buildExtOptions(item as ExternalDefsTypes, parentKey == null ? key : `${parentKey}.${key}`);
				}
			}).filter(x => x != null).flat());
		} else if (VUtils.isNotBlank((value as ExternalDefType).$wt)) {
			options.push(buildExternalDefTypeAsExtOption(key, value as ExternalDefType, parentKey));
		} else {
			options.push(...buildExtOptions(value as ExternalDefsTypes, parentKey == null ? key : `${parentKey}.${key}`));
		}
		return options;
	}, []).filter(x => x != null);
};

//TODO:
// 1. completion: attribute name, attributes list names, $icons, $ext
// 2. $icons, $ext syntax highlight
// 3. Widget Type Linting, $icons linting
// 4. Click toolbar icons, and check editor caret, should be first column. otherwise copy to clipboard.
// 5. javascript code block
export const createCompleteD9ml = (options: {
	widgets: Required<PlaygroundWidgets>;
	externalDefsTypes: ExternalDefsTypes;
}) => {
	const {widgets, externalDefsTypes} = options;

	const WidgetTypeOptions: Array<Completion> = widgets.widgets
		.filter(({$wt}) => $wt != N2.N2WidgetType.PAGE)
		.map(({$wt, label, description}) => ({label: $wt, detail: label, info: description, type: 'class'}));
	const WidgetConstPrefixOptions: Array<Completion> = widgets.constants
		.map(({$prefix, label, description}) => ({label: $prefix, detail: label, info: description, type: 'variable'}));
	const WidgetIconOptions: Array<Completion> = widgets.icons
		.map(({$key, label, description}) => ({label: $key, detail: label, info: description, type: 'variable'}));
	const WidgetRefPrefixOptions: Array<Completion> = widgets.extensions
		.map(({$prefix, label, description}) => ({label: $prefix, detail: label, info: description, type: 'variable'}));
	const WidgetExtOptions: Array<Completion> = buildExtOptions(externalDefsTypes);

	return (context: CompletionContext): CompletionResult | null => {
		const tree = syntaxTree(context.state);
		const nodeBefore = tree.resolveInner(context.pos, -1);
		if (nodeBefore == null) {
			return null;
		}

		// console.log(nodeBefore.name);
		if (nodeBefore.name.startsWith('ATXHeading')) {
			const textBefore = (context.state.sliceDoc(nodeBefore.from, context.pos) ?? '').trim();
			const tagBefore = /(#{1,6})(\s+)\w*$/.exec(textBefore);
			if (tagBefore == null) {
				return null;
			}
			if (tagBefore[1].length === 1) {
				return {
					from: nodeBefore.from + tagBefore[1].length + tagBefore[2].length,
					// no matter what, the top level is Page only
					options: [{label: N2.N2WidgetType.PAGE}]
				};
			} else {
				return {
					from: nodeBefore.from + tagBefore[1].length + tagBefore[2].length,
					options: WidgetTypeOptions
					// validFor: /^#{1,6}\s+\w*$/
				};
			}
		} else if (nodeBefore.name === 'Paragraph') {
			// console.log(context.state.sliceDoc(nodeBefore.from, nodeBefore.to));
			const nodeBefore2 = tree.resolveInner(nodeBefore.from, -1);
			if (nodeBefore2 == null) {
				return null;
			}
			if (nodeBefore2.name === 'ListItem') {
				const textBefore = (context.state.sliceDoc(nodeBefore2.from, context.pos) ?? '').trim();
				const tagBefore = /([-|*]\s+)\w*$/.exec(textBefore);
				if (tagBefore == null) {
					return null;
				}
				return {
					from: nodeBefore2.from + tagBefore[1].length,
					options: WidgetTypeOptions
					// validFor: /^#{1,6}\s+\w*$/
				};
			}
		} else if (nodeBefore.name === 'WidgetDeclarationAttrValueIcon') {
			const textBefore = context.state.sliceDoc(nodeBefore.from, context.pos) ?? '';
			// console.log(textBefore);
			if (textBefore.trim().startsWith(ATTRIBUTE_VALUE_ICON_PREFIX)) {
				return {
					from: nodeBefore.from + textBefore.indexOf(ATTRIBUTE_VALUE_ICON_PREFIX) + ATTRIBUTE_VALUE_ICON_PREFIX.length,
					options: WidgetIconOptions
				};
			}
		} else if (nodeBefore.name === 'WidgetDeclarationAttrValueExt') {
			const textBefore = context.state.sliceDoc(nodeBefore.from, context.pos) ?? '';
			if (textBefore.trim().startsWith(ATTRIBUTE_VALUE_EXT_PREFIX)) {
				return {
					from: nodeBefore.from + textBefore.indexOf(ATTRIBUTE_VALUE_EXT_PREFIX) + ATTRIBUTE_VALUE_EXT_PREFIX.length,
					options: WidgetExtOptions
				};
			}
		} else if (nodeBefore.name === 'WidgetDeclarationAttrValue') {
			const textBefore = context.state.sliceDoc(nodeBefore.from, context.pos) ?? '';
			if (textBefore.trim().startsWith(ATTRIBUTE_VALUE_CONST_START)) {
				return {
					from: nodeBefore.from + textBefore.indexOf(ATTRIBUTE_VALUE_CONST_START),
					options: WidgetConstPrefixOptions
				};
			} else {
				if (textBefore.trim().startsWith(ATTRIBUTE_VALUE_REF_START)) {
					return {
						from: nodeBefore.from + textBefore.indexOf(ATTRIBUTE_VALUE_REF_START),
						options: WidgetRefPrefixOptions
					};
				}
			}
		}
		return null;
	};
};

// export const d9mlCompletions = autocompletion({activateOnTyping: true, override: [completeD9ml]});
export const createD9mlCompletions = (options: {
	widgets: Required<PlaygroundWidgets>;
	externalDefsTypes: ExternalDefsTypes;
}) => {
	return markdownLanguage.data.of({autocomplete: createCompleteD9ml(options)});
};