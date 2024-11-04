import {ContainerDef, NodeDef, Undefinable, VUtils} from '@rainbow-d9/n1';
import {PaginationDef, TableDef, TableHeaderDef, TableRowButtonDef} from '@rainbow-d9/n2';
import {PreparsedListItem} from '../ast';
import {ParsedNodeType} from '../node-types';
import {ParsedList, ParsedListItemAttributePair, ParsedListItemKind, SemanticUtils, WidgetFlag} from '../semantic';
import {
	AttributeValueBuild,
	createSyncSnippetBuild,
	CustomAttributeName,
	PostWorkSupplementary,
	SpecificArrayWidgetTranslator,
	SpecificWidgetTranslator,
	WidgetPropertyName
} from '../widget';
import {N2TranslatorConstants} from './constants';
import {N2WidgetType} from './types';

export type PendingTableHeaderLabel = {
	$pending: true;
	value: string;
	children: ParsedListItemAttributePair['children']
}
export type BuiltTableHeaderDef = TableHeaderDef
	| (Omit<TableHeaderDef, 'label'> & { label: TableHeaderDef['label'] | PendingTableHeaderLabel });

export const N2TableHeadersBuild: AttributeValueBuild<Array<BuiltTableHeaderDef>> = {
	accept: (key: WidgetPropertyName) => key === 'headers',
	build: (_value: Undefinable<string>, list: ParsedListItemAttributePair): Undefinable<Array<BuiltTableHeaderDef>> => {
		if (list.children == null || list.children.length === 0 || list.children[0].type !== ParsedNodeType.LIST) {
			return (void 0);
		}
		const headers: Array<BuiltTableHeaderDef> = ((list.children[0] as ParsedList).children ?? [])
			.filter(SemanticUtils.isAttributePairListItem)
			.map((pair, index) => {
				const {attributeName, attributeValue} = pair;
				if (VUtils.isBlank(attributeName)) {
					return null;
				} else if (attributeName.toLowerCase() === 'column' || VUtils.isBlank(attributeValue)) {
					// build by sub list item
					if (pair.children == null || pair.children.length === 0 || pair.children[0].type !== ParsedNodeType.LIST) {
						return null;
					}
					const parsed = ((pair.children[0] as ParsedList).children ?? [])
						.filter(SemanticUtils.isAttributePairListItem)
						.reduce((attrs, {attributeName, attributeValue, children}) => {
							const name = attributeName.toLowerCase().trim();
							if (name === 'label') {
								if (children != null && children.length !== 0) {
									// children defined, pending parse
									// set a pending flag, pass children and value as attributes on label
									// eslint-disable-next-line @typescript-eslint/ban-ts-comment
									// @ts-ignore
									attrs.label = {value: attributeValue.trim(), children, $pending: true};
								} else {
									// no child defined, use value as label
									attrs.label = attributeValue.trim();
								}
							} else if (name === 'width') {
								const value = attributeValue.trim();
								const positive = VUtils.isPositive(value);
								if (positive.test) {
									attrs.width = positive.value;
								} else {
									attrs.width = value;
								}
							} else if (name === 'sortkey') {
								attrs.sortKey = attributeValue.trim();
							}
							return attrs;
						}, {} as Omit<TableHeaderDef, 'index'>);
					if (VUtils.isNotBlank(parsed.width)) {
						return {...parsed, index};
					} else {
						return {...parsed, width: N2TranslatorConstants.tableColumnWidth, index};
					}
				} else {
					const value = attributeValue.trim();
					const positive = VUtils.isPositive(value);
					if (positive.test) {
						return {label: attributeName.trim(), width: positive.value, index};
					} else {
						return {label: attributeName.trim(), width: value, index};
					}
				}
			})
			.filter(x => x != null)
			.map((x, index) => ({...x, index}));

		return headers.length === 0 ? (void 0) : headers;
	}
};

export class N2TableRowOperatorsTranslator extends SpecificWidgetTranslator<N2WidgetType.TABLE_ROW_OPERATORS> {
	public getSupportedType(): N2WidgetType.TABLE_ROW_OPERATORS {
		return N2WidgetType.TABLE_ROW_OPERATORS;
	}

	public shouldWrapByFormCell(): boolean {
		return false;
	}
}

export const N2TableInitExpandedBuild =
	createSyncSnippetBuild<TableDef, 'initExpanded'>('initExpanded', ['row', 'index']);
export const N2TableSortBuild =
	createSyncSnippetBuild<TableDef, 'sort'>('sort', ['row', 'index']);

export class N2TableTranslator extends SpecificArrayWidgetTranslator<N2WidgetType.TABLE> {
	public getSupportedType(): N2WidgetType.TABLE {
		return N2WidgetType.TABLE;
	}

	public beautifyProperties<Def extends NodeDef>(def: Partial<Def>): Def {
		return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
	}

	public shouldWrapByFormCell(): boolean {
		return false;
	}

	public getAttributeNamesMapping(): Undefinable<Record<CustomAttributeName, WidgetPropertyName>> {
		return this.buildDefaultAttributeNamesMapping();
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [
			...super.getAttributeValueBuilders(),
			N2TableHeadersBuild, N2TableInitExpandedBuild, N2TableSortBuild
		];
	}

	protected isPendingHeaderLabel(label: BuiltTableHeaderDef['label']): label is PendingTableHeaderLabel {
		return (label as PendingTableHeaderLabel)?.$pending === true;
	}

	public postWork<Def extends NodeDef>(def: Partial<Def>, supplementary: PostWorkSupplementary): Def {
		const defs = def as unknown as TableDef & ContainerDef;
		const {translator, parseOptions} = supplementary;
		defs.headers = defs.headers?.map(header => {
			if (this.isPendingHeaderLabel(header.label)) {
				const {value: attributeValue, children} = header.label;
				const {node, success} = translator.translate({
					type: ParsedNodeType.LIST_ITEM, kind: ParsedListItemKind.WIDGET,
					$wt: (attributeValue ?? '').trim() || 'Caption',
					children: children,
					$flag: WidgetFlag.STANDARD,
					preparsed: {
						type: ParsedNodeType.LIST_ITEM,
						content: {
							type: 'listItem',
							children: (children ?? []).map(child => child.preparsed.content)
						},
						// PreparsedSubordinateOfListItemNodes
						children: (children ?? []).map(child => child.preparsed)
					} as PreparsedListItem
				}, parseOptions);
				if (success) {
					return {label: node, width: header.width, index: header.index, sortKey: header.sortKey};
				} else {
					return header;
				}
			} else {
				return header;
			}
		});

		const {$nodes} = defs;
		defs.rowOperators = (($nodes ?? [])
			.find(node => {
				return node.$wt === N2WidgetType.TABLE_ROW_OPERATORS || node.$wt.startsWith(`${N2WidgetType.TABLE_ROW_OPERATORS}.`);
			}) as ContainerDef)?.$nodes as Array<TableRowButtonDef>;
		defs.pageable = (($nodes ?? [])
			.find(node => {
				return node.$wt === N2WidgetType.PAGINATION || node.$wt.startsWith(`${N2WidgetType.PAGINATION}.`);
			}) as ContainerDef) as PaginationDef;
		defs.$nodes = ($nodes ?? []).filter(node => {
			return node.$wt !== N2WidgetType.TABLE_ROW_OPERATORS && !node.$wt.startsWith(`${N2WidgetType.TABLE_ROW_OPERATORS}.`)
				&& node.$wt !== N2WidgetType.PAGINATION && !node.$wt.startsWith(`${N2WidgetType.PAGINATION}.`);
		});
		return defs as unknown as Def;
	}
}
