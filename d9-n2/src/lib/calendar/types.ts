import {ValueChangeableNodeDef, WidgetProps} from '@d9/n1';
import {ReactNode} from 'react';
import {OmitHTMLProps, OmitNodeDef} from '../types';

export type CalendarFixedTimeAt = { hour: number, minute: number, second: number, millisecond: number };
export type CalendarDef = ValueChangeableNodeDef & OmitHTMLProps<HTMLDivElement> & {
	please?: ReactNode;
	clearable?: boolean;
	dateFormat?: string;
	time?: boolean;
	timeFormat?: string;
	storeFormat?: string;
	/** only works when time is false */
	fixedTimeAt?: CalendarFixedTimeAt;
	autoConfirm?: boolean;
};
/** Input widget definition, with html attributes */
export type CalendarProps = OmitNodeDef<CalendarDef> & WidgetProps;
