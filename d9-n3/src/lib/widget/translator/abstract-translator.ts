import {ExternalDefIndicator, PropertyPath, VUtils} from '@rainbow-d9/n1';
import {PreparsedSubordinateOfHeadingNodes} from '../../ast';
import {N3Logger} from '../../logger';
import {ParsedNodeType} from '../../node-types';
import {
	IgnoredOnTransitToWidgetDefType,
	ParsedHeading,
	ParsedHeadingIdentified,
	ParsedList,
	ParsedListItemAttributePair,
	ParsedListItemAttributes,
	ParsedListItemRefWidget,
	ParsedListItemWidget,
	ParsedNode,
	SemanticUtils,
	WidgetFlag,
	WidgetType
} from '../../semantic';
import {ParsedNodeDef} from '../../types';
import {Nullable, Undefinable} from '../../utility-types';
import {AttributeNameUtils, AttributeUtils, D9PropertyNames} from './attribute';
import {MonitorHandlerDetectOptions} from './monitor';
import {SpecificWidgetTranslator} from './specific-translator';
import {WidgetTranslatorRepository} from './translator-repository';
import {AttributeMap, ClassifiedAttributesAndWidgets} from './types';

export type Decipherable = ParsedHeadingIdentified | ParsedListItemWidget;

export abstract class AbstractTranslator<N extends Decipherable> {
	public static EXTERNAL_DEF_PREFIX = '@ext.';

	constructor(private readonly repository: WidgetTranslatorRepository) {
		this.repository = repository;
	}

	public findSpecificTranslator<T extends WidgetType>($wt: T): Undefinable<SpecificWidgetTranslator<T>> {
		return this.repository.askSpecificTranslator($wt);
	}

	public abstract isTypeSupported($wt: WidgetType): boolean;

	public abstract translate(node: N): ParsedNodeDef;

	protected classifyAttributesAndSubWidgetsByList(parent: N): ClassifiedAttributesAndWidgets {
		const children = parent.children ?? [];

		// go through children of given heading or list item widget
		const [first, ...rest] = children.filter(child => child.type === ParsedNodeType.LIST) as Array<ParsedList>;
		if (first == null) {
			// no attributes and sub widgets defined in list`
			return {attributes: [], widgets: [], ignored: []} as ClassifiedAttributesAndWidgets;
		}

		// collect attributes and sub widgets
		return [first, ...rest].reduce((classified, child, index) => {
			child.children.forEach(item => {
				if (SemanticUtils.isAnyWidgetListItem(item) && item.$flag === WidgetFlag.IGNORE) {
					// ignored
					item.ignoredOnTransitToWidget = {type: IgnoredOnTransitToWidgetDefType.DECLARE_AS_IGNORED};
					classified.ignored.push(item);
				} else if (SemanticUtils.isReservedListItem(item)) {
					// reserved
					item.ignoredOnTransitToWidget = {type: IgnoredOnTransitToWidgetDefType.DETECT_AS_RESERVED};
					classified.ignored.push(item);
				} else if (SemanticUtils.isAnyAttributeListItem(item)) {
					// attribute detected, assumed belongs to given heading or list item widget
					// but if once any sub widget is detected already, it's difficult to confirm which widget (given or sub one)
					// is this attribute belongs to, so it will be tagged as incorrect position.
					// and attribute should at first list
					if (index === 0 && classified.widgets.length === 0) {
						// no widgets detected yet
						classified.attributes.push(item);
					} else {
						item.ignoredOnTransitToWidget = {type: IgnoredOnTransitToWidgetDefType.INCORRECT_INDEX_ATTR_AFTER_WIDGET};
						classified.ignored.push(item);
					}
				} else if (SemanticUtils.isAnyWidgetListItem(item)) {
					// sub widget detected
					classified.widgets.push(item);
				} else {
					// never occurs
					item.ignoredOnTransitToWidget = {type: IgnoredOnTransitToWidgetDefType.UNKNOWN};
					classified.ignored.push(item);
				}
			});
			return classified;
		}, {attributes: [], widgets: [], ignored: []} as ClassifiedAttributesAndWidgets);
	}

	protected parseAttributes($wt: WidgetType, list: ParsedListItemAttributes): AttributeMap {
		return (list.attributes || []).reduce((options, attribute) => {
			if (VUtils.isBlank(attribute)) {
				return options;
			}
			const attr = attribute.trim();
			if (attr.startsWith('!')) {
				options[AttributeNameUtils.mapAttributeName($wt, attr.substring(1))] = false;
			} else {
				options[AttributeNameUtils.mapAttributeName($wt, attr)] = true;
			}
			return options;
		}, {} as AttributeMap);
	}

	protected buildAttributeValue(
		$wt: WidgetType, key: string, value: Undefinable<string>, list: ParsedListItemAttributePair
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	): Nullable<any> {
		if (value == null) {
			return value;
		}
		if (VUtils.isNotBlank(value) && value.trim().toLowerCase().startsWith(AbstractTranslator.EXTERNAL_DEF_PREFIX)) {
			return new ExternalDefIndicator(value.trim().substring(AbstractTranslator.EXTERNAL_DEF_PREFIX.length));
		}
		const builder = AttributeUtils.findAttributeBuilders($wt).find(builder => builder.accept(key));
		if (builder != null) {
			return builder.build(value, list);
		} else {
			return value;
		}
	}

	protected parseAttributePair($wt: WidgetType, list: ParsedListItemAttributePair): AttributeMap {
		const {attributeName: name, attributeValue} = list;
		const key = AttributeNameUtils.mapAttributeName($wt, name);
		const value = this.buildAttributeValue($wt, key, attributeValue ?? (void 0), list);
		if (VUtils.isBlank(value)) {
			// nothing returned
			return {};
		} else if (typeof value === 'object' && !Array.isArray(value) && value[key] != null) {
			// returns a map, which contains given key
			return value;
		} else {
			// returns a value
			return {[key]: value};
		}
	}

	protected combineMonitors(options: MonitorHandlerDetectOptions): AttributeMap {
		return [
			this.repository.validatorBuild,
			this.repository.reactorBuild,
			this.repository.disablementBuild,
			this.repository.visibilityBuild
		].reduce((attrs, build) => build.combine({...options, attributes: attrs}), options.attributes);
	}

	protected parseAndCombineAttributes(options: {
		$wt: WidgetType;
		$pp?: Nullable<PropertyPath>;
		items: Array<ParsedListItemAttributes | ParsedListItemAttributePair>
	}): AttributeMap {
		const {$wt, items, $pp} = options;

		// parse attribute by given items
		const attributes = (items || []).map(item => {
			if (SemanticUtils.isAttributesListItem(item)) {
				return this.parseAttributes($wt, item);
			} else {
				return this.parseAttributePair($wt, item);
			}
		}).reduce((options, each) => {
			Object.keys(each).forEach(key => {
				key.split('.')
					.reduce((parent, part, index, parts) => {
						if (index === parts.length - 1) {
							// last part
							// detect the original value and given value
							const givenValue = each[key];
							if (givenValue != null && VUtils.isNotBlank(givenValue)) {
								const originalValue = parent[part];
								// no original value, or last win when given value is not a primitive type
								if (originalValue == null || VUtils.isBlank(originalValue) || !VUtils.isPrimitive(givenValue)) {
									parent[part] = givenValue;
								}
							}
						} else if (parent[part] == null) {
							// if the part does not exist in the parent, create it as an object
							parent[part] = {} as AttributeMap;
						}
						return parent[part];
					}, options);
			});
			return options;
		}, {} as AttributeMap);

		// now all attributes are parsed, to detect if some of them need to be combined to one
		// and note pass-in $pp might be null since property path might be declared in attribute list rather than in heading
		// when property is declared in attributes, replace given one
		return this.combineMonitors({$wt, $pp: attributes[D9PropertyNames.PROPERTY] || $pp, attributes});
	}

	protected ignoreFailureParsing(parsed: ParsedNodeDef): Nullable<ParsedNodeDef> {
		if (parsed.success !== false) {
			return parsed;
		} else {
			return null;
		}
	}

	protected buildChildrenOnSubHeadings(options: {
		widgets: Array<ParsedNode<PreparsedSubordinateOfHeadingNodes>>
	}): Array<ParsedNodeDef> {
		const {widgets} = options;

		// all other children are ignore but subheadings
		const headings = widgets.filter(widget => widget.type === ParsedNodeType.HEADING) as Array<ParsedHeading>;
		const identifiedHeadings: Array<ParsedHeadingIdentified> = headings.filter(SemanticUtils.isIdentifiedHeading);

		return identifiedHeadings.map(item => {
			const translator = this.repository.askTranslator(item.$wt);
			if (translator == null) {
				// TODO USE A STANDARD ERROR WIDGET, ON DESIGN TIME
				N3Logger.error(`Translator of heading node[type=${item.$wt}] is not found. All content ignored.`, AbstractTranslator.name);
				return null;
			}
			return this.ignoreFailureParsing(translator.translate(item));
		}).filter(x => x != null) as Array<ParsedNodeDef>;
	}

	protected buildChildrenOnList(options: {
		widgets: Array<ParsedListItemWidget | ParsedListItemRefWidget>
	}): Array<ParsedNodeDef> {
		const {widgets} = options;

		return widgets.map(item => {
			if (SemanticUtils.isWidgetListItem(item)) {
				const translator = this.repository.askTranslator(item.$wt);
				if (translator == null) {
					// TODO USE A STANDARD ERROR WIDGET, ON DESIGN TIME
					N3Logger.error(`Parser of node[type=${item.$wt}, line=${item.preparsed.content.position.start.line}] is not found. All content ignored.`, AbstractTranslator.name);
					return null;
				} else {
					return this.ignoreFailureParsing(translator.translate(item));
				}
			} else if (SemanticUtils.isRefWidgetListItem(item)) {
				// TODO TO FIND REFERENCE WIDGET
				return null;
			}
		}).filter(x => x != null) as Array<ParsedNodeDef>;
	}
}
