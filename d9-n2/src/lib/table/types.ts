import {
	ArrayContainerDef,
	ArrayContainerWidgetProps,
	BaseModel,
	NodeDef,
	PropertyPath,
	PropValue,
	ValueChangedOptions
} from '@rainbow-d9/n1';
import {MouseEvent, ReactNode} from 'react';
import {ButtonClickOptions, ButtonDef} from '../button';
import {PaginationDef} from '../pagination';
import {ModelCarrier, OmitHTMLProps, OmitNodeDef} from '../types';

export interface TableHeaderDef extends Pick<NodeDef, '$key'> {
	label: ReactNode | NodeDef;
	width: number | string;
	/** index of {@link TableDef#$nodes}, used to render body cell */
	index: number;
}

export type TableRowButtonDef = Omit<ButtonDef, 'click'> & {
	prebuilt?: 'expand' | 'collapse' | 'remove';
	/** click is ignored when prebuilt is set */
	click?: <R extends BaseModel, M extends PropValue>(
		options: ButtonClickOptions<R, M> & { array: Array<BaseModel> },
		event: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
};

export interface TablePaginationValueChangedOptions<R extends BaseModel, M extends PropValue, V extends PropValue>
	extends ValueChangedOptions<V>, ModelCarrier<R, M> {
	$p2r: PropertyPath;
	$pp: PropertyPath;
}

export type TablePaginationDef = Omit<PaginationDef, 'valueChanged'> & {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	valueChanged?: <NV extends PropValue>(options: TablePaginationValueChangedOptions<BaseModel, PropValue, NV>, ...args: Array<any>) => void | Promise<void>;
}

/** Table configuration definition */
export type TableDef = Omit<ArrayContainerDef, '$nodes'> & OmitHTMLProps<HTMLDivElement> & {
	marker?: string;
	headers: Array<TableHeaderDef>;
	headerHeight?: number | string;
	expandable?: boolean;
	/** width of fixed columns needs to be stable, for example, minmax, fr cannot be used */
	fixedLeadColumns?: number;
	/** width of fixed columns needs to be stable, for example, minmax, fr cannot be used */
	fixedTailColumns?: number;
	/** cells which defined in headers should be hidden when expanded or not, default false */
	hideClassicCellsOnExpandable?: boolean;
	/** click to expand row or not, default false */
	clickToExpand?: boolean;
	/** want vertical scrollable */
	maxBodyHeight?: number | string;
	/** set it when operators is customized */
	operatorsColumnWidth?: number | string;
	rowIndexStartsFrom?: number;
	/** omit default row operators */
	omitDefaultRowOperators?: boolean | 'remove' | 'fold';
	/** row operators */
	rowOperators?: Array<TableRowButtonDef>;
	pageable?: TablePaginationDef;
	initExpanded?: <R extends BaseModel>(row: R, index: number) => boolean
};

/** Table widget definition, with html attributes */
export type TableProps = OmitNodeDef<TableDef> & ArrayContainerWidgetProps;

