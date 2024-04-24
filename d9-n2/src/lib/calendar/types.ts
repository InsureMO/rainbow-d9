import {BaseModel, PropValue, ValueChangeableNodeDef, WidgetProps} from '@rainbow-d9/n1';
import {Dayjs} from 'dayjs';
import {ReactNode} from 'react';
import {GlobalEventHandlers, ModelCarriedHandler, OmitHTMLProps, OmitNodeDef} from '../types';

export type CalendarFixedTimeAt = { hour: number, minute: number, second: number, millisecond: number };

export interface CalendarValidRangeOptions<R extends BaseModel, M extends PropValue>
	extends ModelCarriedHandler<R, M>, GlobalEventHandlers {
	valueToCheck?: Dayjs;
	checkType: 'year' | 'month' | 'date' | 'hour' | 'minute' | 'second';
}

export type CalendarDef = ValueChangeableNodeDef & OmitHTMLProps<HTMLDivElement> & {
	please?: ReactNode;
	clearable?: boolean;
	date?: boolean;
	dateFormat?: string;
	time?: boolean;
	timeFormat?: string;
	storeFormat?: string;
	/** only works when time is false */
	fixedTimeAt?: CalendarFixedTimeAt;
	/** the initial time when value is null */
	initTimeAt?: CalendarFixedTimeAt;
	couldPerform?: <R extends BaseModel, M extends PropValue>(options: CalendarValidRangeOptions<R, M>) => boolean;
	/** auto confirm when focus blurred, default true */
	autoConfirm?: boolean;
	/** when no time is set, auto confirm on date selection, default false */
	autoConfirmOnDate?: boolean;
	useCalendarIcon?: boolean;
};
/** widget definition, with html attributes */
export type CalendarProps = OmitNodeDef<CalendarDef> & WidgetProps;
