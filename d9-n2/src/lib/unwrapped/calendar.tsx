import {MonitorNodeDef, NodeAttributeValues, PropValue, VUtils} from '@d9/n1';
import React from 'react';
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

const UnwrappedCalendar = (props: UnwrappedCalendarProps) => {
	const {value, onValueChange, disabled, visible, ...rest} = props;

	const $onValueChange = onValueChange;
	const $avs = {$disabled: disabled, $visible: visible} as NodeAttributeValues;
	const $root = {value};

	return <Calendar {...rest} $wrapped={{$onValueChange, $avs, $root, $model: $root, $p2r: '.'}}
	                 $pp="value"
	                 id={rest.id ?? VUtils.generateUniqueId()} />;
};

type UnwrappedDateCalendarProps = Omit<UnwrappedCalendarProps, 'time' | 'timeFormat'>;

const UnwrappedDateCalendar = (props: UnwrappedDateCalendarProps) => {
	return <UnwrappedCalendar {...props} time={false} />;
};

type UnwrappedDateTimeCalendarProps = Omit<UnwrappedCalendarProps, 'time'>;

const UnwrappedDateTimeCalendar = (props: UnwrappedDateTimeCalendarProps) => {
	return <UnwrappedCalendar {...props} time={true} />;
};

export {
	UnwrappedCalendar, UnwrappedCalendarProps,
	UnwrappedDateCalendar, UnwrappedDateCalendarProps,
	UnwrappedDateTimeCalendar, UnwrappedDateTimeCalendarProps
};
