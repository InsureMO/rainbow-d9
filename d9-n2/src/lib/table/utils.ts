import {BaseModel, MUtils} from '@rainbow-d9/n1';
import {CssVars} from '../constants';
import {toCssSize} from '../utils';
import {TableProps} from './types';

export const computeRowIndexColumnWidth = (maxRowIndex: number): string => {
	return `calc(${CssVars.TABLE_ROW_INDEX_COLUMN_WIDTH} + ${CssVars.TABLE_ROW_INDEX_COLUMN_CHAR_WIDTH} * ${Math.max(3, `${maxRowIndex}`.length)})`;
};
export const computeRowOperatorsColumnWidth = (operatorsColumnWidth: number, expandable: boolean, removable: boolean): string => {
	if (operatorsColumnWidth != null && operatorsColumnWidth > 0) {
		return toCssSize(operatorsColumnWidth);
	}

	const buttonCount = (expandable ? 1 : 0) + (removable ? 1 : 0);
	if (buttonCount > 0) {
		return `calc(${buttonCount} * (${CssVars.TABLE_CELL_HEIGHT} - 6px) + ${buttonCount - 1} * 8px + ${CssVars.BUTTON_INDENT} * 2)`;
	} else {
		return '0px';
	}
};

export const computeColumnsWidth = (props: Omit<TableProps, 'children'>) => {
	const {
		rowIndexStartsFrom = 1,
		operatorsColumnWidth = -1, expandable = false,
		headers,
		$wrapped: {$model}, $array: {removable = false}, $pp
	} = props;

	const elements = ((MUtils.getValue($model, $pp) || []) as unknown as Array<BaseModel>);
	const maxRowIndex = rowIndexStartsFrom + elements.length;
	const rowIndexColumnWidth = computeRowIndexColumnWidth(maxRowIndex);
	const rowOperatorsColumnWidth = computeRowOperatorsColumnWidth(operatorsColumnWidth, expandable, removable);
	const columnsWidth = (headers || []).map(({width}) => toCssSize(width));
	let tailGrabberAppended = false;
	if (columnsWidth.every((width) => !width.includes('fr'))) {
		// append 1fr column to end, minus 1px to fix the horizontal scroll bar
		columnsWidth.push('1fr');
		tailGrabberAppended = true;
	}
	columnsWidth.push(rowOperatorsColumnWidth);
	columnsWidth.unshift(rowIndexColumnWidth);

	return {maxRowIndex, rowIndexColumnWidth, columnsWidth, rowOperatorsColumnWidth, tailGrabberAppended};
};
