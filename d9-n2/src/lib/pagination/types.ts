import {NodeDef, ValueChangeableNodeDef, WidgetProps} from '@rainbow-d9/n1';
import {OmitHTMLProps, OmitNodeDef} from '../types';

export interface PaginationData {
	pageSize: number;
	pageNumber: number;
	pageCount: number;
	itemCount: number;
}

/** Pagination configuration definition */
export type PaginationDef = ValueChangeableNodeDef & NodeDef & OmitHTMLProps<HTMLDivElement> & {
	freeWalk?: boolean;
	maxButtons?: number;
	possibleSizes?: Array<number>;
};
/** Pagination widget definition, with html attributes */
export type PaginationProps = OmitNodeDef<PaginationDef> & WidgetProps;
