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
		headers, fixedLeadColumns = 0, fixedTailColumns = 0,
		$wrapped: {$model}, $array: {removable = false}, $pp
	} = props;

	const elements = ((MUtils.getValue($model, $pp) || []) as unknown as Array<BaseModel>);
	const maxRowIndex = rowIndexStartsFrom + elements.length;
	const rowIndexColumnWidth = computeRowIndexColumnWidth(maxRowIndex);
	const rowOperatorsColumnWidth = computeRowOperatorsColumnWidth(operatorsColumnWidth, expandable, removable);
	const columnsWidth = (headers || []).map(({width}) => toCssSize(width));
	let tailGrabberAppended = false;
	// if there is fixed tail column, no 1fr column is needed
	if (fixedTailColumns <= 0 && columnsWidth.every((width) => !width.includes('fr'))) {
		// append 1fr column to end, minus 1px to fix the horizontal scroll bar
		columnsWidth.push('1fr');
		tailGrabberAppended = true;
	}
	columnsWidth.push(rowOperatorsColumnWidth);
	columnsWidth.unshift(rowIndexColumnWidth);

	const columnsCount = columnsWidth.length;
	const stickyOffsets: Array<[boolean, string | undefined, string | undefined]> = columnsWidth.map((width, index) => {
		if (index === 0) {
			return [true, '0', (void 0)];
		} else if (index === columnsCount - 1) {
			return [true, (void 0), '0'];
		} else if (index <= fixedLeadColumns) {
			return [true, `calc(${columnsWidth.slice(0, index).join(' + ')})`, (void 0)];
		} else if (index >= columnsCount - 1 - fixedTailColumns) {
			return [true, (void 0), `calc(${columnsWidth.slice(index + 1).join(' + ')})`];
		} else {
			return [false, (void 0), (void 0)];
		}
	});

	return {
		maxRowIndex,
		rowIndexColumnWidth, columnsWidth, rowOperatorsColumnWidth, tailGrabberAppended,
		stickyOffsets
	};
};
