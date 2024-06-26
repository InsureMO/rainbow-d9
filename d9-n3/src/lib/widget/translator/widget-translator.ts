import {ContainerDef, NodeDef, Nullable, PropertyPath, Undefinable, VUtils} from '@rainbow-d9/n1';
import {PreparsedListItem} from '../../ast';
import {N3Logger} from '../../logger';
import {ParsedNodeType} from '../../node-types';
import {ParsedListItemAttributePair, ParsedListItemKind, SemanticUtils, WidgetFlag, WidgetType} from '../../semantic';
import {DocParseOptions, ParsedNodeDef} from '../../types';
import {AbstractTranslator, Decipherable} from './abstract-translator';
import {AttributeNameUtils} from './attribute';
import {SpecificWidgetTranslator} from './specific-translator';
import {AttributeMap, ClassifiedAttributesAndWidgets} from './types';

export class WidgetTranslator extends AbstractTranslator<Decipherable> {
	public static readonly FORM_CELL_SUFFIX = '.FC';
	public static readonly FORCE_WRAPPED_INTO_FORM_CELL = '$fc';

	/**
	 * any widget type is supported
	 * @param _$wt
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	isTypeSupported(_$wt: WidgetType): boolean {
		return true;
	}

	protected isForceWrappedByFormCell(attributes: AttributeMap): boolean {
		return attributes[WidgetTranslator.FORCE_WRAPPED_INTO_FORM_CELL] === true;
	}

	/**
	 * wrap by form cell when given label is not null
	 */
	protected tryToWrapByFormCell($wt: WidgetType, label: Nullable<string> | NodeDef): Pick<NodeDef, '$wt'> & {
		label?: Nullable<string> | NodeDef
	} {
		if (label == null) {
			return {$wt};
		} else if (typeof label === 'string') {
			return {$wt: `${$wt}${WidgetTranslator.FORM_CELL_SUFFIX}`, label: label.trim()};
		} else {
			return {$wt: `${$wt}${WidgetTranslator.FORM_CELL_SUFFIX}`, label: label};
		}
	}

	protected attemptToFormCell(options: {
		$wt: WidgetType; attributes: AttributeMap;
		translator: SpecificWidgetTranslator<WidgetType>;
	}) {
		const {$wt, attributes, translator} = options;
		const {label} = attributes;
		if (this.isForceWrappedByFormCell(attributes)) {
			return this.tryToWrapByFormCell($wt, label ?? '');
		} else if (translator.shouldWrapByFormCell()) {
			return this.tryToWrapByFormCell($wt, label);
		} else if (label == null || (typeof label === 'string' && VUtils.isBlank(label))) {
			return {$wt};
		} else {
			return {$wt, [translator.transformLabelAttributeName()]: label};
		}
	}

	protected tryToTranslateAttributeToWidget<V>(options: {
		$wt: WidgetType;
		classified: ClassifiedAttributesAndWidgets; attributeName: string;
		given?: Nullable<V>; $ppOfParent: Undefinable<PropertyPath>;
	}, parseOptions?: DocParseOptions): Nullable<V> | NodeDef {
		const {$wt, classified, attributeName, given} = options;

		let transformed: Nullable<V> | NodeDef;
		const {attributes} = classified;
		const found = (attributes ?? [])
			.filter(SemanticUtils.isAttributePairListItem)
			.find(attr => AttributeNameUtils.mapAttributeName($wt, attr.attributeName) === attributeName);
		if (found == null) {
			// do nothing
			transformed = given;
		} else if (found.children == null || found.children.length === 0) {
			transformed = ((found.attributeValue ?? '').trim() || given) as V;
		} else {
			const def = found as ParsedListItemAttributePair;
			// remove from attributes
			classified.attributes = classified.attributes.filter(attr => attr !== found);
			// to parse label, label is a basic property for all widgets, maybe used for form cell,
			// or maybe built-in property for widget itself, such as Section, will be treated as title
			const {node, success} = this.translate({
				type: ParsedNodeType.LIST_ITEM, kind: ParsedListItemKind.WIDGET,
				$wt: (def.attributeValue ?? '').trim() || 'Caption',
				children: def.children,
				$flag: WidgetFlag.STANDARD,
				preparsed: {
					type: ParsedNodeType.LIST_ITEM,
					content: {type: 'listItem', children: (def.children ?? []).map(child => child.preparsed.content)},
					// PreparsedSubordinateOfListItemNodes
					children: (def.children ?? []).map(child => child.preparsed)
				} as PreparsedListItem
			}, parseOptions);
			if (success) {
				transformed = node;
			} else {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				N3Logger.error(`Given node type[${node.type}] for label is not supported.`, WidgetTranslator.name);
				transformed = given;
			}
		}
		return transformed;
	}

	protected doTranslateNode(
		node: Decipherable, $pp: Undefinable<PropertyPath>, label: Nullable<string>,
		findChildren: () => Array<ParsedNodeDef>,
		parseOptions?: DocParseOptions
	): ParsedNodeDef {
		const {$wt} = node;

		const classified = this.classifyAttributesAndSubWidgetsByList(node);
		const translator = this.findSpecificTranslator($wt);

		let transformedLabel: Nullable<string> | NodeDef;
		if (translator?.shouldTranslateLabelAttribute() ?? true) {
			transformedLabel = this.tryToTranslateAttributeToWidget({
				$wt, classified, given: label, $ppOfParent: $pp, attributeName: 'label'
			}, parseOptions);
		} else {
			transformedLabel = label;
		}
		const transformedWidgets = (translator?.getToWidgetAttributeNames() ?? []).reduce((map, name) => {
			map[name] = this.tryToTranslateAttributeToWidget({
				$wt, classified, $ppOfParent: $pp, attributeName: name
			}, parseOptions);
			return map;
		}, {});
		const attributes: AttributeMap = this.parseAndCombineAttributes({
			$wt, items: classified.attributes, $pp
		});
		Object.keys(transformedWidgets).forEach(name => attributes[name] = transformedWidgets[name]);

		let def: ParsedNodeDef['node'];
		if (translator != null) {
			// for resolving the label ambiguity problem
			// some widget has its own label properties, and it leads ambiguity.
			// so call its own translator to eliminate ambiguity first
			// for example, for caption/label, when
			// 1. label is not no value,
			// 2. not force wrapped by form cell
			// 3. text not presents
			// means label property is used to show its own static value
			// in this case, the following attemptToFormCell call will let it be wrapped by form cell, which is not correct
			// so, have to redress properties first
			def = translator.redressProperties({...attributes, label: transformedLabel} as Partial<NodeDef>);
			def = translator.beautifyProperties({
				$pp, ...def, ...this.attemptToFormCell({$wt, attributes: def, translator})
			});
		} else {
			def = {$pp, ...attributes, $wt};
		}
		const children = [
			...this.buildChildrenOnList({widgets: classified.widgets}, parseOptions),
			...findChildren()
		].map(parsed => parsed.node);
		if (children != null && children.length !== 0) {
			(def as ContainerDef).$nodes = children;
		}

		def = translator?.postWork(def as NodeDef, {translator: this, parseOptions});

		// never export
		return {node: def, success: true};
	}

	protected doTranslate(node: Decipherable, parseOptions?: DocParseOptions): ParsedNodeDef {
		if (node.type === ParsedNodeType.HEADING) {
			return this.doTranslateNode(node, node.$pp, node.headline, () => {
				return this.buildChildrenOnSubHeadings({widgets: node.children}, parseOptions);
			}, parseOptions);
		} else if (node.type === ParsedNodeType.LIST_ITEM) {
			return this.doTranslateNode(node, node.$pp, node.label, () => [], parseOptions);
		} else {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			N3Logger.error(`Given node type[${node.type}] is not supported.`, WidgetTranslator.name);
			return {node: {$wt: ''}, success: false};
		}
	}
}
