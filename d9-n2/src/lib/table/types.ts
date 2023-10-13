import {ArrayContainerDef, ArrayContainerWidgetProps, NodeDef} from '@d9/n1';
import {ReactNode} from 'react';
import {OmitHTMLProps, OmitNodeDef} from '../types';

export interface TableHeaderDef extends Pick<NodeDef, '$key'> {
	label: ReactNode;
	width: number | string;
	/** index of {@link TableDef#$nodes}, used to render body cell */
	index: number;
}

/** Table configuration definition */
export type TableDef = Omit<ArrayContainerDef, '$nodes'> & OmitHTMLProps<HTMLDivElement> & {
	headers: Array<TableHeaderDef>;
	headerHeight?: number | string;
	expandable?: boolean;
	/** cells which defined in headers should be hidden when expanded or not, default false */
	hideClassicCellsOnExpandable?: boolean;
	/** click to expand row or not, default false */
	clickToExpand?: boolean;
	maxBodyHeight?: number | string;
	rowIndexStartsFrom?: number;
};
/** Table widget definition, with html attributes */
export type TableProps = OmitNodeDef<TableDef> & ArrayContainerWidgetProps;

export type CellWidth = { width?: number | string };

export interface CellOptions {
	$options: CellWidth;
}

export interface RowOptions {
	$options: {
		headers: Array<TableHeaderDef>;
		headerHeight?: number | string;
		rowIndexColumnWidth: string;
		rowOperatorsColumnWidth: string;
	};
}

export interface ContentOptions {
	headerHeight?: number | string;
	maxBodyHeight?: number | string;
	rowIndexColumnWidth: string;
	rowOperatorsColumnWidth: string;
}

export interface BodyCellExpandAreaOptions {
	$options: {
		columnCount: number;
		expanded: boolean;
	};
}
