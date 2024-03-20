import {Completion, CompletionContext, CompletionResult} from '@codemirror/autocomplete';
import {markdownLanguage} from '@codemirror/lang-markdown';
import {syntaxTree} from '@codemirror/language';
import {SyntaxNode, Tree} from '@lezer/common';
import {N2, VUtils, WidgetType} from '@rainbow-d9/n3';
import {ExternalDefsTypes, ExternalDefType, PlaygroundWidgetProperty, PlaygroundWidgets} from '../../types';
import {
	ATTRIBUTE_DECLARATION_EXCLAMATION_MARK,
	ATTRIBUTE_DECLARATION_JOINT,
	ATTRIBUTE_VALUE_CONST_START,
	ATTRIBUTE_VALUE_EXT_PREFIX,
	ATTRIBUTE_VALUE_ICON_PREFIX,
	ATTRIBUTE_VALUE_REF_START,
	getCommonWidgetAttributes
} from '../../widget-constants';

export interface WidgetTypeCompletion extends Completion {
	$parent?: WidgetType | Array<WidgetType>;
}

export interface AttrNameCompletion extends Completion {
	$wt: WidgetType | '$all';
	name: PlaygroundWidgetProperty['name'];
}

export interface ExtCompletion extends Completion {
	$wt: WidgetType;
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

/**
 * current is a ListItem, to find the widget type which leads this item.
 */
export const findWidgetType = (node: SyntaxNode, context: CompletionContext): string | undefined => {
	const bulletList = node.parent;
	if (bulletList == null || bulletList.name !== 'BulletList') {
		return (void 0);
	}
	//TODO CONSIDERING THIS NODE IS NOT THE FIRST CHILD OF PARENT,
	// IF PREVIOUS SIBLINGS CONTAINS WIDGET DECLARATION, WHICH MEANS THIS NODE CANNOT BE A PROPERTY DECLARATION
	// HOWEVER, FOR NOW, LET'S IGNORE THIS SITUATION, AS IT MAY BE MANUALLY ADJUSTED TO ENSURE GRAMMATICAL CORRECTNESS.

	// check the parent, it might be Document or ListItem or something else
	const parent = bulletList.parent;
	if (parent == null) {
		return (void 0);
	}
	if (parent.name === 'Document') {
		// find the closest heading, there still can be a ListItem which declares widget anyway,
		// but since it may be manually adjusted to ensure the grammatical correctness,
		// so for now, ignore the ListItem
		let previous = parent.childBefore(node.from);
		while (previous != null && !previous.name.startsWith('ATXHeading')) {
			previous = parent.childBefore(previous.from);
		}
		if (previous == null) {
			return (void 0);
		}
		// if the Heading is a widget declaration, check follows:
		// firstChild is HeadMark, nextSibling is WidgetDeclaration
		const declaration = previous.firstChild?.nextSibling;
		if (declaration == null || declaration.name !== 'WidgetDeclaration') {
			return (void 0);
		}
		const declarationType = declaration.firstChild;
		if (declarationType == null || declarationType.name !== 'WidgetDeclarationType') {
			return (void 0);
		}
		return context.state.sliceDoc(declarationType.from, declarationType.to);
	} else if (parent.name !== 'ListItem') {
		return (void 0);
	}
	// if the ListItem is a widget declaration, check follows:
	// firstChild is ListMark, nextSibling is Paragraph, firstChild could be WidgetDeclaration
	const declaration = parent.firstChild?.nextSibling?.firstChild;
	if (declaration == null || declaration.name !== 'WidgetDeclaration') {
		return (void 0);
	}
	const declarationType = declaration.firstChild;
	if (declarationType == null || declarationType.name !== 'WidgetDeclarationType') {
		//TODO SOMETIMES, PROPERTY ALSO CAN USE THE LIST TO DESCRIBE MORE DETAILS
		// BUT CURRENTLY, ONLY FIND THE WIDGET DECLARATION TYPE
		return (void 0);
	}

	return context.state.sliceDoc(declarationType.from, declarationType.to);
};

//TODO:
// 1. completion:
// 1.1 [x] attribute name, complete the declaration
// 1.2 [x] attributes list names,
// 1.3 [x] $icons,
// 1.4 [x] @ext
// 2. syntax highlight:
// 2.1 [x] $icons,
// 2.2 [x] @ext
// 3. Linting
// 3.1 Widget Type,
// 3.2 attribute name,
// 3.3 $icons,
// 3.4 @ext
// 4. Click toolbar icons, and check editor caret, should be first column. otherwise copy to clipboard.
// 5. javascript code block
export const createCompleteD9ml = (options: {
	widgets: Required<PlaygroundWidgets>;
	externalDefsTypes: ExternalDefsTypes;
}) => {
	const {widgets, externalDefsTypes} = options;

	const WidgetTypeOptions: Array<WidgetTypeCompletion> = widgets.widgets
		// page is special, only for heading1
		.filter(({$wt}) => $wt != N2.N2WidgetType.PAGE)
		.map(({$wt, label, description, $parent}) => {
			return {label: $wt, detail: label, info: description, type: 'class', $parent};
		});
	const WidgetAttrNameOptions: Array<AttrNameCompletion> = [
		...getCommonWidgetAttributes().map(({name, label, description}) => {
			return {label: name, detail: label, info: description, $wt: '$all', name};
		}),
		...widgets.widgets
			// page is special, no attribute needed
			.filter(({$wt}) => $wt != N2.N2WidgetType.PAGE)
			.map(({$wt, properties}) => {
				return (properties ?? []).map(({name, label, description}) => {
					return {label: name, detail: label, info: description, $wt, name};
				});
			}).flat()
	];
	const WidgetConstPrefixOptions: Array<Completion> = widgets.constants
		.map(({$prefix, label, description}) => ({label: $prefix, detail: label, info: description, type: 'variable'}));
	const WidgetIconOptions: Array<Completion> = widgets.icons
		.map(({$key, label, description}) => ({label: $key, detail: label, info: description, type: 'variable'}));
	const WidgetRefPrefixOptions: Array<Completion> = widgets.extensions
		.map(({$prefix, label, description}) => ({label: $prefix, detail: label, info: description, type: 'variable'}));
	const WidgetExtOptions: Array<Completion> = buildExtOptions(externalDefsTypes);

	const completeHeading = (context: CompletionContext, nodeBefore: SyntaxNode) => {
		const textBefore = context.state.sliceDoc(nodeBefore.from, context.pos) ?? '';
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
	};
	const completeListItem = (context: CompletionContext, nodeBefore: SyntaxNode, attributes: boolean) => {
		const textBefore = context.state.sliceDoc(nodeBefore.from, context.pos) ?? '';
		// bullet list
		const tagBefore = /([-|*]\s+)(.*)$/.exec(textBefore);
		if (tagBefore == null) {
			return null;
		}
		const widgetType = findWidgetType(nodeBefore, context);
		let typeOptions = WidgetTypeOptions;
		if (widgetType != null) {
			typeOptions = typeOptions.filter(option => {
				return option.$parent == null || option.$parent === widgetType || (Array.isArray(option.$parent) && option.$parent.includes(widgetType));
			});
		}
		// widget type not found, or it's a page, no attribute needed
		const attrOptions = (widgetType == null || widgetType === N2.N2WidgetType.PAGE)
			? []
			: WidgetAttrNameOptions.filter(option => {
				return option.$wt === '$all' || option.$wt === widgetType;
			});
		const lastJointIndex = attributes
			? Math.max(textBefore.lastIndexOf(ATTRIBUTE_DECLARATION_JOINT), textBefore.lastIndexOf(' '), textBefore.lastIndexOf(ATTRIBUTE_DECLARATION_EXCLAMATION_MARK))
			: -1;
		if (lastJointIndex !== -1) {
			return {
				from: nodeBefore.from + lastJointIndex + 1,
				options: [...typeOptions, ...attrOptions]
			};
		} else {
			return {
				from: nodeBefore.from + tagBefore[1].length,
				options: [...typeOptions, ...attrOptions]
				// validFor: /^#{1,6}\s+\w*$/
			};
		}
	};
	const completeMightBeWidgetDeclaration = (context: CompletionContext, nodeBefore: SyntaxNode, tree: Tree, attributes: boolean) => {
		const nodeBefore2 = tree.resolveInner(nodeBefore.from, -1);
		if (nodeBefore2 == null) {
			return null;
		} else if (nodeBefore2.name === 'ListItem') {
			return completeListItem(context, nodeBefore2, attributes);
		} else {
			return null;
		}
	};
	const completeWidgetDeclarationAttrName = (context: CompletionContext, nodeBefore: SyntaxNode, tree: Tree) => {
		let nodeBefore2 = tree.resolveInner(nodeBefore.from, -1);
		if (nodeBefore2 == null) {
			return null;
		} else if (nodeBefore2.name === 'ListItem') {
			return completeListItem(context, nodeBefore2, true);
		} else if (nodeBefore2.name === 'MightBeWidgetDeclaration') {
			return completeMightBeWidgetDeclaration(context, nodeBefore2, tree, true);
		} else if ([
			'WidgetDeclarationAttrName', 'WidgetDeclarationAttrNameButBlank', 'WidgetDeclarationAttrNameJoint'
		].includes(nodeBefore2.name)) {
			// eslint-disable-next-line no-constant-condition
			while (true) {
				nodeBefore2 = tree.resolveInner(nodeBefore2.from, -1);
				if (nodeBefore2.name === 'ListItem') {
					return completeListItem(context, nodeBefore2, true);
				} else if (nodeBefore2.name === 'MightBeWidgetDeclaration') {
					return completeMightBeWidgetDeclaration(context, nodeBefore2, tree, true);
				} else if (!nodeBefore2.name.startsWith('WidgetDeclaration')) {
					break;
				}
			}
			return null;
		} else {
			return null;
		}
	};
	const completeIcon = (context: CompletionContext, nodeBefore: SyntaxNode) => {
		const textBefore = context.state.sliceDoc(nodeBefore.from, context.pos) ?? '';
		// console.log(textBefore);
		if (textBefore.trim().startsWith(ATTRIBUTE_VALUE_ICON_PREFIX)) {
			return {
				from: nodeBefore.from + textBefore.indexOf(ATTRIBUTE_VALUE_ICON_PREFIX) + ATTRIBUTE_VALUE_ICON_PREFIX.length,
				options: WidgetIconOptions
			};
		} else {
			return null;
		}
	};
	const completeExt = (context: CompletionContext, nodeBefore: SyntaxNode) => {
		const textBefore = context.state.sliceDoc(nodeBefore.from, context.pos) ?? '';
		if (textBefore.trim().startsWith(ATTRIBUTE_VALUE_EXT_PREFIX)) {
			return {
				from: nodeBefore.from + textBefore.indexOf(ATTRIBUTE_VALUE_EXT_PREFIX) + ATTRIBUTE_VALUE_EXT_PREFIX.length,
				options: WidgetExtOptions
			};
		} else {
			return null;
		}
	};
	const completePrefix = (context: CompletionContext, nodeBefore: SyntaxNode) => {
		const textBefore = context.state.sliceDoc(nodeBefore.from, context.pos) ?? '';
		if (textBefore.trim().startsWith(ATTRIBUTE_VALUE_CONST_START)) {
			return {
				from: nodeBefore.from + textBefore.indexOf(ATTRIBUTE_VALUE_CONST_START),
				options: WidgetConstPrefixOptions
			};
		} else if (textBefore.trim().startsWith(ATTRIBUTE_VALUE_REF_START)) {
			return {
				from: nodeBefore.from + textBefore.indexOf(ATTRIBUTE_VALUE_REF_START),
				options: WidgetRefPrefixOptions
			};
		} else {
			return null;
		}
	};

	return (context: CompletionContext): CompletionResult | null => {
		const tree = syntaxTree(context.state);
		const nodeBefore = tree.resolveInner(context.pos, -1);
		if (nodeBefore == null) {
			return null;
		}

		switch (true) {
			case nodeBefore.name.startsWith('ATXHeading'):
				return completeHeading(context, nodeBefore);
			case nodeBefore.name === 'ListItem':
				return completeListItem(context, nodeBefore, false);
			case nodeBefore.name === 'MightBeWidgetDeclaration':
				return completeMightBeWidgetDeclaration(context, nodeBefore, tree, false);
			case nodeBefore.name === 'WidgetDeclarationAttrName':
			case nodeBefore.name === 'WidgetDeclarationAttrNameButBlank':
			case nodeBefore.name === 'WidgetDeclarationAttrNameJoint':
				return completeWidgetDeclarationAttrName(context, nodeBefore, tree);
			case nodeBefore.name === 'WidgetDeclarationAttrValueIcon':
				return completeIcon(context, nodeBefore);
			case nodeBefore.name === 'WidgetDeclarationAttrValueExt':
				return completeExt(context, nodeBefore);
			case nodeBefore.name === 'WidgetDeclarationAttrValue':
				return completePrefix(context, nodeBefore);
			default:
				return null;
		}
	};
};

// export const d9mlCompletions = autocompletion({activateOnTyping: true, override: [completeD9ml]});
export const createD9mlCompletions = (options: {
	widgets: Required<PlaygroundWidgets>;
	externalDefsTypes: ExternalDefsTypes;
}) => {
	return markdownLanguage.data.of({autocomplete: createCompleteD9ml(options)});
};