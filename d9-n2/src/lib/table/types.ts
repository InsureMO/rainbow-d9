import {ArrayContainerDef, ArrayContainerWidgetProps, NodeDef} from '@rainbow-d9/n1';
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
	fixedLeadColumns?: number;
	fixedTailColumns?: number;
	/** cells which defined in headers should be hidden when expanded or not, default false */
	hideClassicCellsOnExpandable?: boolean;
	/** click to expand row or not, default false */
	clickToExpand?: boolean;
	maxBodyHeight?: number | string;
	operatorsColumnWidth?: number;
	rowIndexStartsFrom?: number;
};
/** Table widget definition, with html attributes */
export type TableProps = OmitNodeDef<TableDef> & ArrayContainerWidgetProps;

