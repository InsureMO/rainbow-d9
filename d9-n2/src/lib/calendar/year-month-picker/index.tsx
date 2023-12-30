import {Dayjs} from 'dayjs';
import React, {useEffect, useRef, useState} from 'react';
import {IntlLabel} from '../../intl-label';
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
				<IntlLabel keys={['calendar', 'jan']} value="Jan"/>
			</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(1)} data-current={value.month() === 1}>
				<IntlLabel keys={['calendar', 'feb']} value="Feb"/>
			</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(2)} data-current={value.month() === 2}>
				<IntlLabel keys={['calendar', 'mar']} value="Mar"/>
			</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(3)} data-current={value.month() === 3}>
				<IntlLabel keys={['calendar', 'apr']} value="Apr"/>
			</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(4)} data-current={value.month() === 4}>
				<IntlLabel keys={['calendar', 'may']} value="May"/>
			</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(5)} data-current={value.month() === 5}>
				<IntlLabel keys={['calendar', 'jun']} value="Jun"/>
			</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(6)} data-current={value.month() === 6}>
				<IntlLabel keys={['calendar', 'jul']} value="Jul"/>
			</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(7)} data-current={value.month() === 7}>
				<IntlLabel keys={['calendar', 'aug']} value="Aug"/>
			</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(8)} data-current={value.month() === 8}>
				<IntlLabel keys={['calendar', 'sep']} value="Sep"/>
			</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(9)} data-current={value.month() === 9}>
				<IntlLabel keys={['calendar', 'oct']} value="Oct"/>
			</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(10)} data-current={value.month() === 10}>
				<IntlLabel keys={['calendar', 'nov']} value="Nov"/>
			</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(11)} data-current={value.month() === 11}>
				<IntlLabel keys={['calendar', 'dec']} value="Dec"/>
			</MonthSelectorOption>
		</MonthSelector>
	</YearMonthPickerContainer>;
};