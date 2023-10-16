import {BaseModel, EnhancedPropsForArray, MUtils, VUtils} from '@rainbow-d9/n1';
import {CssVars} from '../constants';
import {toCssSize} from '../utils';
import {TableHeaderDef, TableProps} from './types';

export const computeRowOperatorCount = (options: {
	expandable?: boolean;
	removable?: boolean;
}): number => {
	const {expandable = false, removable = false} = options;
	return (expandable ? 1 : 0) + (removable ? 1 : 0);
};
export const computeRowIndexColumnWidth = (maxRowIndex: number): string => {
	if (maxRowIndex <= 9999) {
		return CssVars.TABLE_ROW_INDEX_COLUMN_WIDTH;
	} else {
		return `calc(${CssVars.TABLE_ROW_INDEX_COLUMN_WIDTH} + (${CssVars.TABLE_ROW_INDEX_COLUMN_WIDTH} - ${CssVars.TABLE_CELL_PADDING} * 2) / 4 * ${`${maxRowIndex}`.length - 4})`;
	}
};
export const computeRowOperatorsColumnWidth = (buttonCount: number): string => {
	if (buttonCount === 0) {
		return '0px';
	}
	return `calc(${buttonCount} * (${CssVars.TABLE_CELL_HEIGHT} - 6px) + ${buttonCount - 1} * 8px + ${CssVars.BUTTON_INDENT} * 2)`;
};
export const computeRowWidth = (headers: Array<TableHeaderDef>, rowIndexColumnWidth: string, rowOperatorsColumnWidth: string) => {
	return `calc(${rowIndexColumnWidth} + ${rowOperatorsColumnWidth} + ${headers.map(({width}) => toCssSize(width)).join(' + ')})`;
};
export const computeFixedColumnHeaderHeight = (headerHeight?: string | number): string => {
	if (VUtils.isBlank(headerHeight)) {
		return CssVars.TABLE_HEADER_HEIGHT;
	} else {
		return `calc(${toCssSize(headerHeight)} - ${CssVars.TABLE_HEADER_BORDER_SIZE})`;
	}
};
export const computeFixedColumnHeight = (options: {
	maxBodyHeight?: string | number;
	horizontalScrolled: boolean;
}): string | undefined => {
	const {maxBodyHeight, horizontalScrolled} = options;

	if (VUtils.isNotBlank(maxBodyHeight)) {
		return `calc(${CssVars.TABLE_HEADER_BORDER_SIZE} + ${toCssSize(maxBodyHeight)} - ${horizontalScrolled ? `${CssVars.HORIZONTAL_SCROLLER_HEIGHT}px` : '0px'})`;
	} else {
		return (void 0);
	}
};
export const computeWidthOfFixedColumns = (props: Omit<TableProps, 'children' | '$array'> & {
	$array: EnhancedPropsForArray
}) => {
	const {
		maxBodyHeight, headerHeight, rowIndexStartsFrom, expandable,
		$wrapped: {$model}, $array: {removable}, $pp
	} = props;

	const elements = ((MUtils.getValue($model, $pp) || []) as unknown as Array<BaseModel>);
	const maxRowIndex = rowIndexStartsFrom + elements.length;
	const rowIndexColumnWidth = computeRowIndexColumnWidth(maxRowIndex);
	const rowOperatorsColumnWidth = computeRowOperatorsColumnWidth(computeRowOperatorCount({expandable, removable}));

	return {
		maxRowIndex, rowIndexColumnWidth, rowOperatorsColumnWidth,
		headerHeight, maxBodyHeight
	};
};