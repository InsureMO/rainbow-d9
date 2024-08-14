import {BaseModel, PropValue} from '@rainbow-d9/n1';
import {Dayjs} from 'dayjs';
import React, {useEffect, useRef, useState} from 'react';
import {useGlobalHandlers} from '../../global';
import {IntlLabel} from '../../intl-label';
import {useCalendarEventBus} from '../event/calendar-event-bus';
import {CalendarEventTypes} from '../event/calendar-event-bus-types';
import {CalendarProps} from '../types';
import {checkDateParts} from '../utils';
import {
	MonthSelector,
	MonthSelectorOption,
	YearMonthPickerContainer,
	YearMonthPickerLabel,
	YearSelector,
	YearSelectorOption
} from './widgets';

export interface CalendarYearMonthPickerProps {
	$root: BaseModel;
	$model: PropValue;
	value: Dayjs;
	dateFormat: string;
	couldPerform?: CalendarProps['couldPerform'];
}

export const YearMonthPicker = (props: CalendarYearMonthPickerProps) => {
	const {$root, $model, value, dateFormat, couldPerform} = props;

	const globalHandlers = useGlobalHandlers();
	const {on, off, fire} = useCalendarEventBus();
	const yearSelectorRef = useRef<HTMLDivElement>(null);
	const [visible, setVisible] = useState(!checkDateParts(dateFormat).hasDate);

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
	const monthLabels: Array<[Array<string>, string]> = [
		[['calendar', 'jan'], 'Jan'],
		[['calendar', 'feb'], 'Feb'],
		[['calendar', 'mar'], 'Mar'],
		[['calendar', 'apr'], 'Apr'],
		[['calendar', 'may'], 'May'],
		[['calendar', 'jun'], 'Jun'],
		[['calendar', 'jul'], 'Jul'],
		[['calendar', 'aug'], 'Aug'],
		[['calendar', 'sep'], 'Sep'],
		[['calendar', 'oct'], 'Oct'],
		[['calendar', 'nov'], 'Nov'],
		[['calendar', 'dec'], 'Dec']
	];

	const yearFormat = dateFormat.includes('B') ? 'BBBB' : 'YYYY';

	return <YearMonthPickerContainer>
		<YearMonthPickerLabel>Year</YearMonthPickerLabel>
		<YearMonthPickerLabel>Month</YearMonthPickerLabel>
		<YearSelector ref={yearSelectorRef}>
			{new Array(200).fill(1).map((_, index) => maxYear - index).map(year => {
				const valueToPerform = value.clone().year(year);
				const couldPerformValue = couldPerform == null ? true : (couldPerform({
					root: $root, model: $model, valueToCheck: valueToPerform, checkType: 'year', global: globalHandlers
				}) !== false);
				const click = couldPerformValue ? onYearChange(year) : (void 0);
				return <YearSelectorOption data-year={year} data-current={year === value.year()}
				                           data-could-perform={couldPerformValue}
				                           onClick={click} key={year}>
					{valueToPerform.format(yearFormat)}
				</YearSelectorOption>;
			})}
		</YearSelector>
		<MonthSelector>
			{new Array(12).fill(1).map((_, month) => {
				const valueToPerform = value.clone().month(month);
				const couldPerformValue = couldPerform == null ? true : (couldPerform({
					root: $root, model: $model, valueToCheck: valueToPerform, checkType: 'month', global: globalHandlers
				}) !== false);
				const click = couldPerformValue ? onMonthChange(month) : (void 0);
				return <MonthSelectorOption onClick={click} data-current={value.month() === month}
				                            data-could-perform={couldPerformValue}
				                            key={month}>
					<IntlLabel keys={monthLabels[month][0]} value={monthLabels[month][1]}/>
				</MonthSelectorOption>;
			})}
		</MonthSelector>
	</YearMonthPickerContainer>;
};