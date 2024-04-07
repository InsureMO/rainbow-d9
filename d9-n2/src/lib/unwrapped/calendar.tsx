import {MonitorNodeDef, NodeAttributeValues, PropValue, VUtils} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef} from 'react';
import {Calendar, CalendarProps} from '../calendar';

/** Calendar configuration definition */
type UnwrappedCalendarProps =
	Omit<CalendarProps, 'value' | '$wrapped' | keyof MonitorNodeDef>
	& {
	value?: PropValue;
	onValueChange: (value: PropValue) => void;
	disabled?: boolean;
	visible?: boolean;
};

const UnwrappedCalendar = forwardRef((props: UnwrappedCalendarProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {$pp = 'value', value, onValueChange, disabled, visible, ...rest} = props;

	const $onValueChange = onValueChange;
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root = {[$pp]: value};

	return <Calendar {...rest} $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                 $pp={$pp}
	                 id={rest.id ?? VUtils.generateUniqueId()}
	                 ref={ref}/>;
});

type UnwrappedDateCalendarProps = Omit<UnwrappedCalendarProps, 'time' | 'timeFormat'>;

const UnwrappedDateCalendar = forwardRef((props: UnwrappedDateCalendarProps, ref: ForwardedRef<HTMLDivElement>) => {
	return <UnwrappedCalendar {...props} time={false} ref={ref}/>;
});

type UnwrappedDateTimeCalendarProps = Omit<UnwrappedCalendarProps, 'time'>;

const UnwrappedDateTimeCalendar = forwardRef((props: UnwrappedDateTimeCalendarProps, ref: ForwardedRef<HTMLDivElement>) => {
	return <UnwrappedCalendar {...props} time={true} ref={ref}/>;
});

export {
	UnwrappedCalendar, UnwrappedCalendarProps,
	UnwrappedDateCalendar, UnwrappedDateCalendarProps,
	UnwrappedDateTimeCalendar, UnwrappedDateTimeCalendarProps
};
