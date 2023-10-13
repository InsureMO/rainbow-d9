import {nanoid} from 'nanoid';
import {CSSProperties} from 'react';
import {ContainerDef, NodeDef, NodeUniqueKey, NodeValidationScope, Reaction} from '../types';
import {VUtils} from './value-utils';

export interface NodeUtilsType {
	/**
	 * generate unique react key which used to identify react node in loop
	 */
	generateReactKey: () => NodeUniqueKey;
	readonly getDefKey: (def: Pick<NodeDef, '$key'>) => NodeUniqueKey;
	readonly getChildNodes: (def: ContainerDef, from?: string) => Array<NodeDef>;
	readonly inheritValidationScopes: (parentDef: Pick<NodeDef, '$validationScopes'>, def: Pick<NodeDef, '$validationScopes'>) => void;
	readonly reactWithRepaint: () => Reaction.REPAINT;
	readonly reactWithClear: () => Reaction.CLEAR_VALUE;
	asGridPos: (def: NodeDef) => Partial<Pick<CSSProperties, 'gridColumn' | 'gridRow'>>;
	readonly computeStyle: (def: NodeDef) => Partial<CSSProperties>;
}

export const NUtils: NodeUtilsType = {
	generateReactKey: () => nanoid(),
	getDefKey: (def: Pick<NodeDef, '$key'>) => {
		if (VUtils.isBlank(def.$key)) {
			// use nanoid if there is no key declared, and set back to def
			def.$key = NUtils.generateReactKey();
		}
		return def.$key;
	},
	getChildNodes: (def: ContainerDef, from?: string): Array<NodeDef> => {
		if (VUtils.isBlank(from)) {
			return def.$nodes || [];
		} else {
			return def[from] || [];
		}
	},
	inheritValidationScopes: (parentDef: Pick<NodeDef, '$validationScopes'>, def: Pick<NodeDef, '$validationScopes'>) => {
		def.$validationScopes = (parentDef.$validationScopes || [])
			.filter(scope => VUtils.isNotBlank(scope))
			.map(scope => scope.trim()).reduce((all, scope) => {
				if (all.map[scope] == null) {
					all.list.push(scope);
				}
				return all;
			}, (() => {
				const list = (def.$validationScopes || [])
					.filter(scope => VUtils.isNotBlank(scope))
					.map(scope => scope.trim());
				const map = list.reduce((map, scope) => {
					map[scope] = true;
					return map;
				}, {} as Record<NodeValidationScope, true>);
				return {list, map};
			})()).list;
	},
	reactWithRepaint: () => Reaction.REPAINT,
	reactWithClear: () => Reaction.CLEAR_VALUE,
	asGridPos: (def: NodeDef) => {
		if (def.$pos == null) {
			return {gridColumn: 'span 3'};
		}
		const {$col, $cols, $row, $rows} = def.$pos;
		const pos: Partial<Pick<CSSProperties, 'gridColumn' | 'gridRow'>> = {};
		switch (true) {
			case $col == null && $cols == null:
				pos.gridColumn = 'span 3';
				break;
			case $col == null && $cols != null:
				pos.gridColumn = `span ${$cols}`;
				break;
			case $col != null && $cols == null:
				pos.gridColumn = `${$col}`;
				break;
			case $col != null && $cols != null:
				pos.gridColumn = `${$col} / span ${$cols}`;
				break;
		}
		switch (true) {
			case $row == null && $rows == null:
				break;
			case $row == null && $rows != null:
				pos.gridRow = `span ${$rows}`;
				break;
			case $row != null && $rows == null:
				pos.gridRow = `${$row}`;
				break;
			case $row != null && $rows != null:
				pos.gridRow = `${$row} / span ${$rows}`;
				break;
		}
		return pos;
	},
	computeStyle: (def: NodeDef) => {
		const pos = NUtils.asGridPos(def);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const style = ((def as any).style as CSSProperties) ?? {};
		style.gridRow = style.gridRow || pos.gridRow;
		style.gridColumn = style.gridColumn || pos.gridColumn;
		return style;
	}
};
