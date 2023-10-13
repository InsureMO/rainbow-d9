import {Dayjs} from 'dayjs';
import React, {useEffect, useRef, useState} from 'react';
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
		const nowYear = new Date().getFullYear();
		yearSelectorRef.current.querySelector(`span[data-year="${nowYear}"]`)?.scrollIntoView();
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
				return <YearSelectorOption data-year={year} onClick={onYearChange(year)} key={year}>
					{year}
				</YearSelectorOption>;
			})}
		</YearSelector>
		<MonthSelector>
			<MonthSelectorOption onClick={onMonthChange(0)}>Jan</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(1)}>Feb</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(2)}>Mar</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(3)}>Apr</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(4)}>May</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(5)}>Jun</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(6)}>Jul</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(7)}>Aug</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(8)}>Sep</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(9)}>Oct</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(10)}>Nov</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(11)}>Dec</MonthSelectorOption>
		</MonthSelector>
	</YearMonthPickerContainer>;
};