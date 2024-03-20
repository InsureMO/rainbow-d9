import {syntaxTree} from '@codemirror/language';
import {Diagnostic, linter, lintGutter} from '@codemirror/lint';
import {EditorView} from '@codemirror/view';
import {SyntaxNodeRef} from '@lezer/common';
import {ExternalDefKeys, VUtils} from '@rainbow-d9/n1';
import {ExternalDefsTypes, ExternalDefType, PlaygroundWidget, PlaygroundWidgets} from '../../types';
import {ATTRIBUTE_VALUE_EXT_PREFIX} from '../../widget-constants';

type ExtMapByKey = Record<ExternalDefKeys, ExternalDefType>;
/** key is [WidgetType.Property] or [WidgetType] */
type ExtMapByWidgetTypeAndProperty = Record<string, ExtMapByKey>;

interface ExtMap {
	byKey: ExtMapByKey;
	byWidgetTypeAndProperty: ExtMapByWidgetTypeAndProperty;
}

export const createWidgetLinter = (options: {
	widgets: Required<PlaygroundWidgets>;
	externalDefsTypes: ExternalDefsTypes;
}) => {
	const putIntoExtMap = (map: ExtMap, edt: ExternalDefType, key: string, parentKey?: string) => {
		const id = parentKey == null ? key : `${parentKey}.${key}`;
		map.byKey[id] = edt;
		(edt.properties ?? [])
			.filter(x => VUtils.isNotBlank(x))
			.map(property => {
				const $wtAndPp = `${edt.$wt}.${property}`;
				if (map.byWidgetTypeAndProperty[$wtAndPp] == null) {
					map.byWidgetTypeAndProperty[$wtAndPp] = {[id]: edt};
				} else {
					map.byWidgetTypeAndProperty[$wtAndPp][id] = edt;
				}
			});
	};
	const buildExtMap = (all: ExtMap, externalDefsTypes: ExternalDefsTypes, parentKey?: string) => {
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

	// prepare context
	const allWidgets = options.widgets.widgets.reduce((map, widget) => {
		map[widget.$wt] = widget;
		return map;
	}, {} as Record<PlaygroundWidget['$wt'], PlaygroundWidget>);
	const extMap = buildExtMap({byKey: {}, byWidgetTypeAndProperty: {}}, options.externalDefsTypes);

	const lintWidgetType = (view: EditorView, node: SyntaxNodeRef, diagnostics: Array<Diagnostic>) => {
		const type = view.state.sliceDoc(node.from, node.to);
		if (allWidgets[(type ?? '').trim()] == null) {
			diagnostics.push({
				from: node.from, to: node.to,
				severity: 'error', message: `Widget[${type}] not declared.`
				// actions: [{
				// 	name: 'Remove', apply: (view, from, to) => {
				// 		view.dispatch({changes: {from, to}});
				// 	}
				// }]
			});
		}
	};
	const lintWidgetAttrValueExt = (view: EditorView, node: SyntaxNodeRef, diagnostics: Array<Diagnostic>) => {
		const ext = view.state.sliceDoc(node.from, node.to);
		const key = (ext ?? '').trim().substring(ATTRIBUTE_VALUE_EXT_PREFIX.length);
		if (extMap.byKey[key] == null) {
			diagnostics.push({
				from: node.from, to: node.to,
				severity: 'error', message: `External def[${ext}] not declared.`
			});
		}
	};
	const lintWidgetAttrValueIcon = (view: EditorView, node: SyntaxNodeRef, diagnostics: Array<Diagnostic>) => {
		const ext = view.state.sliceDoc(node.from, node.to);

	};

	return [
		lintGutter(),
		linter(view => {
			const diagnostics: Array<Diagnostic> = [];
			syntaxTree(view.state).cursor().iterate(node => {
				switch (node.name) {
					case 'WidgetDeclarationType':
						lintWidgetType(view, node, diagnostics);
						break;
					case 'WidgetDeclarationAttrValueExt':
						lintWidgetAttrValueExt(view, node, diagnostics);
						break;
					case 'WidgetDeclarationAttrValueIcon':
						lintWidgetAttrValueIcon(view, node, diagnostics);
						break;
				}
			});
			return diagnostics;
		})
	];
};
