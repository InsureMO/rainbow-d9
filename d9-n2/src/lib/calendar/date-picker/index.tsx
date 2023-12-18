import dayjs, {Dayjs} from 'dayjs';
import React, {useEffect, useState} from 'react';
import {I18NVars} from '../../constants';
import {useCalendarEventBus} from '../event/calendar-event-bus';
import {CalendarEventTypes} from '../event/calendar-event-bus-types';
import {LeftCaret, RightCaret} from '../widgets';
import {computeCalendarDays} from './utils';
import {
	DatePickerBody,
	DatePickerBodyDateCell,
	DatePickerBodyHeaderCell,
	DatePickerContainer,
	DatePickerHeader,
	DatePickerHeaderMonthChangeButton,
	DatePickerHeaderOperators,
	DatePickerHeaderTodayButton,
	DatePickerHeaderYearMonth,
	DatePickerShortcut,
	DatePickerShortcutButton
} from './widgets';

export const DatePicker = (props: { value: Dayjs, dateFormat: string }) => {
	const {value, dateFormat} = props;

	const {on, off, fire} = useCalendarEventBus();
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const onOpen = () => setVisible(false);
		const onClose = () => setVisible(true);
		on(CalendarEventTypes.OPEN_YEAR_MONTH_PICKER, onOpen);
		on(CalendarEventTypes.OPEN_TIME_PICKER, onOpen);
		on(CalendarEventTypes.CLOSE_YEAR_MONTH_PICKER, onClose);
		on(CalendarEventTypes.CLOSE_TIME_PICKER, onClose);
		return () => {
			off(CalendarEventTypes.OPEN_YEAR_MONTH_PICKER, onOpen);
			off(CalendarEventTypes.OPEN_TIME_PICKER, onOpen);
			off(CalendarEventTypes.CLOSE_YEAR_MONTH_PICKER, onClose);
			off(CalendarEventTypes.CLOSE_TIME_PICKER, onClose);
		};
	}, [on, off]);

	if (!visible) {
		return null;
	}

	const today = dayjs();
	const todayYear = today.year();
	const todayMonth = today.month();
	const todayDate = today.date();

	const onDateClicked = (date: Dayjs) => () => {
		const newValue = date.clone().hour(value.hour()).minute(value.minute()).second(value.second()).millisecond(value.millisecond());
		fire(CalendarEventTypes.VALUE_SELECTED, newValue);
	};
	const onTodayClicked = onDateClicked(today);
	const onYesterdayClicked = onDateClicked(today.subtract(1, 'day'));
	const onWeekendClicked = onDateClicked(today.day(6));
	const onPrevWeekendClicked = onDateClicked(today.day(6).subtract(1, 'week'));
	const onMonthEndClicked = onDateClicked(today.date(1).add(1, 'month').subtract(1, 'day'));
	const onPrevMonthEndClicked = onDateClicked(today.date(1).subtract(1, 'day'));
	const onYearEndClicked = onDateClicked(today.month(11).date(31));
	const onPrevYearEndClicked = onDateClicked(today.month(11).date(31).subtract(1, 'year'));

	const onGotoPrevMonthClicked = () => onDateClicked(value.subtract(1, 'month'))();
	const onGotoNextMonthClicked = () => onDateClicked(value.add(1, 'month'))();

	const currentYear = value.year();
	const currentMonth = value.month();
	const currentDate = value.date();
	const currentDisplayMonth = (() => {
		let format = 'MMM YYYY';
		// Buddhist era
		if (dateFormat.includes('B')) {
			format = 'MMM BBBB';
		}
		return value.format(format);
	})();
	const firstDayOfDisplayMonth = value.clone().date(1);
	const days = computeCalendarDays(firstDayOfDisplayMonth);

	return <DatePickerContainer>
		<DatePickerShortcut>
			<DatePickerShortcutButton onClick={onTodayClicked}>{I18NVars.CALENDAR.TODAY}</DatePickerShortcutButton>
			<DatePickerShortcutButton
				onClick={onYesterdayClicked}>{I18NVars.CALENDAR.YESTERDAY}</DatePickerShortcutButton>
			<DatePickerShortcutButton
				onClick={onWeekendClicked}>{I18NVars.CALENDAR.THIS_WEEKEND}</DatePickerShortcutButton>
			<DatePickerShortcutButton
				onClick={onPrevWeekendClicked}>{I18NVars.CALENDAR.PREV_WEEKEND}</DatePickerShortcutButton>
			<DatePickerShortcutButton
				onClick={onMonthEndClicked}>{I18NVars.CALENDAR.THIS_MONTH_END}</DatePickerShortcutButton>
			<DatePickerShortcutButton
				onClick={onPrevMonthEndClicked}>{I18NVars.CALENDAR.PREV_MONTH_END}</DatePickerShortcutButton>
			<DatePickerShortcutButton
				onClick={onYearEndClicked}>{I18NVars.CALENDAR.THIS_YEAR_END}</DatePickerShortcutButton>
			<DatePickerShortcutButton
				onClick={onPrevYearEndClicked}>{I18NVars.CALENDAR.PREV_YEAR_END}</DatePickerShortcutButton>
		</DatePickerShortcut>
		<DatePickerHeader>
			<DatePickerHeaderYearMonth>{currentDisplayMonth}</DatePickerHeaderYearMonth>
			<DatePickerHeaderOperators>
				<DatePickerHeaderTodayButton
					onClick={onTodayClicked}>{I18NVars.CALENDAR.TODAY}</DatePickerHeaderTodayButton>
				<DatePickerHeaderMonthChangeButton onClick={onGotoPrevMonthClicked}>
					<LeftCaret/>
				</DatePickerHeaderMonthChangeButton>
				<DatePickerHeaderMonthChangeButton onClick={onGotoNextMonthClicked}>
					<RightCaret/>
				</DatePickerHeaderMonthChangeButton>
			</DatePickerHeaderOperators>
		</DatePickerHeader>
		<DatePickerBody>
			<DatePickerBodyHeaderCell>{I18NVars.CALENDAR.SUNDAY}</DatePickerBodyHeaderCell>
			<DatePickerBodyHeaderCell>{I18NVars.CALENDAR.MONDAY}</DatePickerBodyHeaderCell>
			<DatePickerBodyHeaderCell>{I18NVars.CALENDAR.TUESDAY}</DatePickerBodyHeaderCell>
			<DatePickerBodyHeaderCell>{I18NVars.CALENDAR.WEDNESDAY}</DatePickerBodyHeaderCell>
			<DatePickerBodyHeaderCell>{I18NVars.CALENDAR.THURSDAY}</DatePickerBodyHeaderCell>
			<DatePickerBodyHeaderCell>{I18NVars.CALENDAR.FRIDAY}</DatePickerBodyHeaderCell>
			<DatePickerBodyHeaderCell>{I18NVars.CALENDAR.SATURDAY}</DatePickerBodyHeaderCell>
			{days.map(({year, month, date}) => {
				return <DatePickerBodyDateCell key={`${year}/${month}/${date}`}
				                               data-current-month={year === currentYear && month === currentMonth}
				                               data-current={year === currentYear && month === currentMonth && date === currentDate}
				                               data-today={year === todayYear && month === todayMonth && date === todayDate}
				                               onClick={onDateClicked(dayjs().year(year).month(month).date(date))}>
					<span>{date}</span>
				</DatePickerBodyDateCell>;
			})}
		</DatePickerBody>
	</DatePickerContainer>;
};
