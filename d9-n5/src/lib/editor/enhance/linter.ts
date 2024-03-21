import {syntaxTree} from '@codemirror/language';
import {Diagnostic, linter, lintGutter} from '@codemirror/lint';
import {EditorView} from '@codemirror/view';
import {SyntaxNodeRef, Tree} from '@lezer/common';
import {ExternalDefKeys, VUtils, WidgetType} from '@rainbow-d9/n1';
import {N2} from '@rainbow-d9/n3';
import {
	ExternalDefsTypes,
	ExternalDefType,
	PlaygroundIcon,
	PlaygroundIconsUsage,
	PlaygroundWidget,
	PlaygroundWidgets
} from '../../types';
import {
	ATTRIBUTE_VALUE_EXT_PREFIX,
	ATTRIBUTE_VALUE_ICON_PREFIX,
	getCommonWidgetAttributes
} from '../../widget-constants';
import {findParentWidgetType, findWidgetTypeAndProperty} from './utils';

type ExtMapByKey = Record<ExternalDefKeys, ExternalDefType>;
/** key is [WidgetType.Property], value is widget type and property array */
type ExtMapByWidgetTypeAndProperty = Record<`${WidgetType}.string`, Array<[string, string]>>;

interface ExtMap {
	byKey: ExtMapByKey;
	byWidgetTypeAndProperty: ExtMapByWidgetTypeAndProperty;
}

type IconMapByKey = Record<string, PlaygroundIcon>
/** key is [WidgetType.Property], value is widget type and property */
type IconMapByWidgetTypeAndProperty = Record<`${WidgetType}.string`, [string, string]>;

interface IconMap {
	byKey: IconMapByKey;
	byWidgetTypeAndProperty: IconMapByWidgetTypeAndProperty;
}

export const createWidgetLinter = (options: {
	widgets: Required<PlaygroundWidgets>;
	externalDefsTypes: ExternalDefsTypes;
}) => {
	const putIntoExtMap = (map: ExtMap, edt: ExternalDefType, key: string, parentKey?: string): void => {
		const id = parentKey == null ? key : `${parentKey}.${key}`;
		map.byKey[id] = edt;
		(edt.properties ?? [])
			.filter(x => VUtils.isNotBlank(x))
			.map(property => {
				const $wtAndPp = `${edt.$wt}.${property}`;
				if (map.byWidgetTypeAndProperty[$wtAndPp] == null) {
					map.byWidgetTypeAndProperty[$wtAndPp] = [[edt.$wt, property]];
				} else {
					map.byWidgetTypeAndProperty[$wtAndPp].push([edt.$wt, property]);
				}
			});
	};
	const buildExtMap = (all: ExtMap, externalDefsTypes: ExternalDefsTypes, parentKey?: string): ExtMap => {
		return Object.keys(externalDefsTypes).reduce((map, key) => {
			const value = externalDefsTypes[key];
			if (value == null) {
				return map;
			} else if (Array.isArray(value)) {
				value.forEach((item: ExternalDefType | ExternalDefsTypes) => {
					if (item == null) {
						return;
					}
					if (VUtils.isNotBlank((item as ExternalDefType).$wt)) {
						putIntoExtMap(map, item as ExternalDefType, key, parentKey);
					} else {
						buildExtMap(map, item as ExternalDefsTypes, parentKey == null ? key : `${parentKey}.${key}`);
					}
				});
			} else if (VUtils.isNotBlank((value as ExternalDefType).$wt)) {
				putIntoExtMap(map, value as ExternalDefType, key, parentKey);
			} else {
				buildExtMap(map, value as ExternalDefsTypes, parentKey == null ? key : `${parentKey}.${key}`);
			}
			return map;
		}, all);
	};
	const buildIconsMap = (all: IconMap, icons: PlaygroundIconsUsage): IconMap => {
		icons.icons.forEach(icon => all.byKey[icon.$key] = icon);
		icons.applicableTo.forEach(applicableTo => {
			(applicableTo.properties ?? []).forEach(property => {
				all.byWidgetTypeAndProperty[`${applicableTo.$wt}.${property}`] = [applicableTo.$wt, property];
			});
		});
		return all;
	};

	// prepare context
	const allWidgets = options.widgets.widgets
		.reduce((map, widget) => {
			map[widget.$wt] = widget;
			return map;
		}, {} as Record<PlaygroundWidget['$wt'], PlaygroundWidget>);
	const allIndependentWidgets = options.widgets.widgets
		.filter(widget => {
			if (VUtils.isBlank(widget.$parent)) {
				return false;
			} else if (Array.isArray(widget.$parent)) {
				return widget.$parent.filter(p => VUtils.isNotBlank(p)).length !== 0;
			} else {
				return true;
			}
		})
		.reduce((map, widget) => {
			map[widget.$wt] = widget;
			return map;
		}, {} as Record<PlaygroundWidget['$wt'], PlaygroundWidget>);
	const commonWidgetAttributes = getCommonWidgetAttributes().reduce((map, attr) => {
		map[attr.name] = attr;
		return map;
	}, {});
	const extMap = buildExtMap({byKey: {}, byWidgetTypeAndProperty: {}}, options.externalDefsTypes);
	const iconMap = buildIconsMap({byKey: {}, byWidgetTypeAndProperty: {}}, options.widgets.icons);

	const lintWidgetType = (view: EditorView, node: SyntaxNodeRef, diagnostics: Array<Diagnostic>) => {
		const type = (view.state.sliceDoc(node.from, node.to) ?? '').trim();
		if (allWidgets[type] == null) {
			diagnostics.push({
				from: node.from, to: node.to,
				severity: 'error', message: `Widget[${type}] not declared.`
			});
		}
		if (node.node.parent?.name === 'WidgetDeclaration') {
			if (node.node.parent.parent?.name?.startsWith('ATXHeading')
				&& node.node.parent.parent?.name !== 'ATXHeading1'
				&& type === N2.N2WidgetType.PAGE) {
				diagnostics.push({
					from: node.from, to: node.to,
					severity: 'error', message: 'Widget[Page] is only allowed  on heading level 1.'
				});
			} else {
				let independentWidget = null;
				let tryToFindParentWidgetType = (): string => (void 0);
				if (node.node.parent.parent?.name?.startsWith('ATXHeading')) {
					independentWidget = allIndependentWidgets[type];
					tryToFindParentWidgetType = () => findParentWidgetType(node.node.parent.parent, view.state);
				} else if (node.node.parent.parent?.name === 'MightBeWidgetDeclaration'
					&& node.node.parent.parent.parent?.name === 'ListItem') {
					independentWidget = allIndependentWidgets[type];
					tryToFindParentWidgetType = () => findParentWidgetType(node.node.parent.parent.parent, view.state);
				}
				if (independentWidget != null) {
					const parents = () => {
						const {$parent} = independentWidget;
						if (Array.isArray($parent)) {
							return $parent.filter(parent => VUtils.isNotBlank(parent));
						} else {
							return [$parent];
						}
					};
					const $wt = tryToFindParentWidgetType!();
					if ($wt == null) {
						// parent widget not found
						diagnostics.push({
							from: node.from, to: node.to,
							severity: 'error',
							message: `Widget[${type}] is not allowed outside of [${parents().join(', ')}].`
						});
					} else {
						const possibleParents = parents();
						if (possibleParents.every(parent => parent !== $wt)) {
							diagnostics.push({
								from: node.from, to: node.to,
								severity: 'error',
								message: `Widget[${type}] is not allowed outside of [${possibleParents.join(', ')}].`
							});
						}
					}
				}
			}
		}
	};
	const lintWidgetAttrName = (view: EditorView, tree: Tree, node: SyntaxNodeRef, diagnostics: Array<Diagnostic>) => {
		const {$wt, property, direct} = findWidgetTypeAndProperty(node.node, view.state, tree);
		if ($wt == null && direct === true) {
			diagnostics.push({
				from: node.from, to: node.to,
				severity: 'warning', message: `Cannot apply applicable check on property[${property}].`
			});
			return;
		}
		if (property.startsWith('data-') || commonWidgetAttributes[property] != null) {
			return;
		}
		const widgetType = $wt.trim();
		if (allWidgets[widgetType] == null) {
			diagnostics.push({
				from: node.from, to: node.to,
				severity: 'error',
				message: `Property[${property}] on widget[${$wt}] is not allowed.`
			});
		} else if ((allWidgets[widgetType].properties ?? []).every(({name}) => name !== (property).trim())) {
			diagnostics.push({
				from: node.from, to: node.to,
				severity: 'error',
				message: `Property[${property}] on widget[${$wt}] is not allowed.`
			});
		}
	};
	const lintWidgetAttrValueExt = (view: EditorView, tree: Tree, node: SyntaxNodeRef, diagnostics: Array<Diagnostic>) => {
		const ext = view.state.sliceDoc(node.from, node.to);
		const key = (ext ?? '').trim().substring(ATTRIBUTE_VALUE_EXT_PREFIX.length);
		if (extMap.byKey[key] == null) {
			diagnostics.push({
				from: node.from, to: node.to,
				severity: 'error', message: `External def[${ext}] not declared.`
			});
			return;
		}
		const {$wt, property} = findWidgetTypeAndProperty(node.node, view.state, tree);
		// @ext is allowed on every property
		if ($wt != null && property != null) {
			if (extMap.byWidgetTypeAndProperty[`${$wt}.${property}`] == null) {
				// declaration not found
				diagnostics.push({
					from: node.from, to: node.to,
					severity: 'warning',
					message: `Cannot apply applicable check on external def on widget[${$wt}], property[${property}].`
				});
			}
		} else if ($wt != null) {
			// property not found
			diagnostics.push({
				from: node.from, to: node.to,
				severity: 'warning', message: `Cannot apply applicable check on external def on widget[${$wt}].`
			});
		} else if (property != null) {
			// widget type not found
			diagnostics.push({
				from: node.from,
				to: node.to,
				severity: 'warning',
				message: `Cannot apply applicable check on external def on property[${property}].`
			});
		} else {
			// neither widget type nor property found
			diagnostics.push({
				from: node.from, to: node.to,
				severity: 'warning', message: `External def is allowed on widget property only.`
			});
		}
	};
	const lintWidgetAttrValueIcon = (view: EditorView, tree: Tree, node: SyntaxNodeRef, diagnostics: Array<Diagnostic>) => {
		const icon = view.state.sliceDoc(node.from, node.to);
		const key = (icon ?? '').trim().substring(ATTRIBUTE_VALUE_ICON_PREFIX.length);
		if (iconMap.byKey[key] == null) {
			diagnostics.push({
				from: node.from, to: node.to,
				severity: 'error', message: `Icon[${icon}] not declared.`
			});
			return;
		}
		const {$wt, property} = findWidgetTypeAndProperty(node.node, view.state, tree);
		if ($wt != null && property != null) {
			if (iconMap.byWidgetTypeAndProperty[`${$wt}.${property}`] == null) {
				// declaration not found, not allowed
				diagnostics.push({
					from: node.from, to: node.to,
					severity: 'error', message: `Icon on widget[${$wt}], property[${property}] is not allowed.`
				});
			}
		} else if ($wt != null) {
			// property not found
			const exists = Object.values(iconMap.byWidgetTypeAndProperty).filter(([widgetType]) => widgetType === $wt);
			if (exists.length === 0) {
				// widget type not matched, not allowed
				diagnostics.push({
					from: node.from, to: node.to,
					severity: 'error', message: `Icon on widget[${$wt}] is not allowed.`
				});
			} else {
				// widget type matched
				const properties = exists.map(([, property]) => property).sort().join(', ');
				diagnostics.push({
					from: node.from,
					to: node.to,
					severity: 'warning',
					message: `Icon on widget[${$wt}] is allowed on property[${properties}] only.`
				});
			}
		} else if (property != null) {
			// widget type not found
			const exists = Object.values(iconMap.byWidgetTypeAndProperty).filter(([, p]) => p === property);
			if (exists.length === 0) {
				// property not matched, not allowed
				diagnostics.push({
					from: node.from, to: node.to,
					severity: 'error', message: `Icon on property[${property}] is not allowed.`
				});
			} else {
				// property matched
				const widgetTypes = exists.map(([$wt]) => $wt).sort().join(', ');
				diagnostics.push({
					from: node.from, to: node.to,
					severity: 'warning',
					message: `Icon on property[${property}] is allowed on widget[${widgetTypes}] only.`
				});
			}
		} else {
			// neither widget type nor property found
			diagnostics.push({
				from: node.from, to: node.to,
				severity: 'warning', message: `Icon is allowed on widget property only.`
			});
		}
	};

	return [
		lintGutter(),
		linter(view => {
			const diagnostics: Array<Diagnostic> = [];
			const tree = syntaxTree(view.state);
			tree.cursor().iterate(node => {
				switch (node.name) {
					case 'WidgetDeclarationType':
						lintWidgetType(view, node, diagnostics);
						break;
					case 'WidgetDeclarationAttrName':
						lintWidgetAttrName(view, tree, node, diagnostics);
						break;
					case 'WidgetDeclarationAttrValueExt':
						lintWidgetAttrValueExt(view, tree, node, diagnostics);
						break;
					case 'WidgetDeclarationAttrValueIcon':
						lintWidgetAttrValueIcon(view, tree, node, diagnostics);
						break;
				}
			});
			return diagnostics;
		})
	];
};
