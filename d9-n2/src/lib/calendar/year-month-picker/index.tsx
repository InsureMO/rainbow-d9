import {Dayjs} from 'dayjs';
import React, {useEffect, useRef, useState} from 'react';
import {I18NVars} from '../../constants';
import {useCalendarEventBus} from '../event/calendar-event-bus';
import {CalendarEventTypes} from '../event/calendar-event-bus-types';
import {
	MonthSelector,
	MonthSelectorOption,
	YearMonthPickerContainer,
	YearMonthPickerLabel,
	YearSelector,
	YearSelectorOption
} from './widgets';

export const YearMonthPicker = (props: { value: Dayjs }) => {
	const {value} = props;

	const {on, off, fire} = useCalendarEventBus();
	const yearSelectorRef = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onOpen = () => setVisible(true);
		const onClose = () => setVisible(false);
		on(CalendarEventTypes.OPEN_YEAR_MONTH_PICKER, onOpen);
		on(CalendarEventTypes.OPEN_TIME_PICKER, onClose);
		on(CalendarEventTypes.CLOSE_YEAR_MONTH_PICKER, onClose);
		return () => {
			off(CalendarEventTypes.OPEN_YEAR_MONTH_PICKER, onOpen);
			off(CalendarEventTypes.OPEN_TIME_PICKER, onClose);
			off(CalendarEventTypes.CLOSE_YEAR_MONTH_PICKER, onClose);
		};
	}, [on, off]);
	useEffect(() => {
		if (yearSelectorRef.current == null || !visible) {
			return;
		}
		yearSelectorRef.current.querySelector(`span[data-year="${value.year()}"]`)?.scrollIntoView();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visible]);

	if (!visible) {
		return null;
	}

	const onYearChange = (year: number) => () => {
		const newValue = value.year(year);
		fire(CalendarEventTypes.VALUE_SELECTED, newValue);
	};
	const onMonthChange = (month: number) => () => {
		const newValue = value.month(month);
		fire(CalendarEventTypes.VALUE_SELECTED, newValue);
	};

	const maxYear = new Date().getFullYear() + 99;

	return <YearMonthPickerContainer>
		<YearMonthPickerLabel>Year</YearMonthPickerLabel>
		<YearMonthPickerLabel>Month</YearMonthPickerLabel>
		<YearSelector ref={yearSelectorRef}>
			{new Array(200).fill(1).map((_, index) => maxYear - index).map(year => {
				return <YearSelectorOption data-year={year} data-current={year === value.year()}
				                           onClick={onYearChange(year)} key={year}>
					{year}
				</YearSelectorOption>;
			})}
		</YearSelector>
		<MonthSelector>
			<MonthSelectorOption onClick={onMonthChange(0)} data-current={value.month() === 0}>
				{I18NVars.CALENDAR.JAN}
			</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(1)} data-current={value.month() === 1}>
				{I18NVars.CALENDAR.FEB}
			</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(2)} data-current={value.month() === 2}>
				{I18NVars.CALENDAR.MAR}
			</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(3)} data-current={value.month() === 3}>
				{I18NVars.CALENDAR.APR}
			</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(4)} data-current={value.month() === 4}>
				{I18NVars.CALENDAR.MAY}
			</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(5)} data-current={value.month() === 5}>
				{I18NVars.CALENDAR.JUN}
			</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(6)} data-current={value.month() === 6}>
				{I18NVars.CALENDAR.JUL}
			</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(7)} data-current={value.month() === 7}>
				{I18NVars.CALENDAR.AUG}
			</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(8)} data-current={value.month() === 8}>
				{I18NVars.CALENDAR.SEP}
			</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(9)} data-current={value.month() === 9}>
				{I18NVars.CALENDAR.OCT}
			</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(10)} data-current={value.month() === 10}>
				{I18NVars.CALENDAR.NOV}
			</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(11)} data-current={value.month() === 11}>
				{I18NVars.CALENDAR.DEC}
			</MonthSelectorOption>
		</MonthSelector>
	</YearMonthPickerContainer>;
};