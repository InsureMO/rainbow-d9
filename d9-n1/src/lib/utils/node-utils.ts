import {nanoid} from 'nanoid';
import {CSSProperties} from 'react';
import {ContainerDef, DeviceTags, NodeDef, NodePosition, NodeUniqueKey, NodeValidationScope, Reaction} from '../types';
import {VUtils} from './value-utils';

export type StyledNodeDef = Pick<NodeDef, '$pos' | '$mpos'> & Pick<HTMLElement, 'style'> & Partial<DeviceTags>;
export type NodeGridPos = Partial<Pick<CSSProperties, 'gridColumn' | 'gridRow'>>;

export interface NodeUtilsType {
	/**
	 * generate unique react key which used to identify react node in loop
	 */
	readonly generateReactKey: () => NodeUniqueKey;
	readonly getDefKey: (def: Pick<NodeDef, '$key'>) => NodeUniqueKey;
	readonly getChildNodes: (def: ContainerDef, from?: string) => Array<NodeDef>;
	readonly inheritValidationScopes: (parentDef: Pick<NodeDef, '$validationScopes'>, def: Pick<NodeDef, '$validationScopes'>) => void;
	readonly reactWithRepaint: () => Reaction.REPAINT;
	readonly reactWithClear: () => Reaction.CLEAR_VALUE;
	readonly asGridPosByDefault: ($pos: NodePosition, defaultCols: number) => NodeGridPos;
	/**
	 * mobile assumes the grid system of parent is in 12 columns,
	 * and default grab all columns for each widget when $mpos is declared, not matter it is partial or not.
	 * when $mpos is not declared, take the $cols as 4 times of original $cols value, but max is 12.
	 * and other properties from $pos will be ignored.
	 */
	readonly asGridPosForMobile: (def: StyledNodeDef) => NodeGridPos;
	/**
	 * non-mobile assumes the grid system of parent is in 12 columns,
	 * and default grab 3 columns for each widget when $pos.$cols is not declared.
	 */
	readonly asGridPosForNonMobile: (def: StyledNodeDef) => NodeGridPos;
	readonly asGridPos: (def: StyledNodeDef) => NodeGridPos;
	readonly computeStyle: (def: StyledNodeDef) => Partial<CSSProperties>;
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
		def.$validationScopes = (parentDef?.$validationScopes || [])
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
	asGridPosByDefault: ($pos: NodePosition, defaultCols: number): NodeGridPos => {
		if ($pos == null) {
			return {gridColumn: `span ${defaultCols}`};
		}
		const {$col, $cols, $row, $rows} = $pos;
		const pos: NodeGridPos = {};
		switch (true) {
			case $col == null && $cols == null:
				pos.gridColumn = `span ${defaultCols}`;
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
	asGridPosForMobile: (def: StyledNodeDef): NodeGridPos => {
		if (def.$mpos != null) {
			// specify the grid position for mobile
			return NUtils.asGridPosByDefault(def.$mpos, 12);
		} else if (def.$pos != null) {
			const {$cols} = def.$pos;
			return {gridColumn: `span ${Math.min(12, $cols * 4)}`};
		} else {
			return {gridColumn: 'span 12'};
		}
	},
	asGridPosForNonMobile: (def: StyledNodeDef): NodeGridPos => {
		return NUtils.asGridPosByDefault(def.$pos, 3);
	},
	asGridPos: (def: StyledNodeDef): NodeGridPos => {
		const {'data-mobile': mobile} = def;
		if (mobile) {
			return NUtils.asGridPosForMobile(def);
		} else {
			return NUtils.asGridPosForNonMobile(def);
		}
	},
	computeStyle: (def: StyledNodeDef) => {
		const pos = NUtils.asGridPos(def);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const style = (def.style ?? {}) as CSSProperties;
		style.gridRow = style.gridRow || pos.gridRow;
		style.gridColumn = style.gridColumn || pos.gridColumn;
		if (VUtils.isNotBlank(style.gridRow)) {
			// use "-" to break the css, otherwise it will read ancestor's variable, which leads to wrong layout
			style['--grid-row'] = style.gridRow ?? '-';
			delete style.gridRow;
		} else {
			style['--grid-row'] = '-';
		}
		if (VUtils.isNotBlank(style.gridColumn)) {
			// use "-" to break the css, otherwise it will read ancestor's variable, which leads to wrong layout
			style['--grid-column'] = style.gridColumn ?? '-';
			delete style.gridColumn;
		} else {
			style['--grid-row'] = '-';
		}
		return style;
	}
};
