import dayjs, {Dayjs} from 'dayjs';
import React, {useEffect, useState} from 'react';
import {IntlLabel} from '../../intl-label';
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
			<DatePickerShortcutButton onClick={onTodayClicked}>
				<IntlLabel keys={['calendar', 'today']} value="Today"/>
			</DatePickerShortcutButton>
			<DatePickerShortcutButton onClick={onYesterdayClicked}>
				<IntlLabel keys={['calendar', 'yesterday']} value="Yesterday"/>
			</DatePickerShortcutButton>
			<DatePickerShortcutButton onClick={onWeekendClicked}>
				<IntlLabel keys={['calendar', 'thisWeekEnd']} value="This Weekend"/>
			</DatePickerShortcutButton>
			<DatePickerShortcutButton onClick={onPrevWeekendClicked}>
				<IntlLabel keys={['calendar', 'prevWeekend']} value="Prev Weekend"/>
			</DatePickerShortcutButton>
			<DatePickerShortcutButton onClick={onMonthEndClicked}>
				<IntlLabel keys={['calendar', 'thisMonthEnd']} value="This Month End"/>
			</DatePickerShortcutButton>
			<DatePickerShortcutButton onClick={onPrevMonthEndClicked}>
				<IntlLabel keys={['calendar', 'prevMonthEnd']} value="Prev month End"/>
			</DatePickerShortcutButton>
			<DatePickerShortcutButton onClick={onYearEndClicked}>
				<IntlLabel keys={['calendar', 'thisYearEnd']} value="This Year End"/>
			</DatePickerShortcutButton>
			<DatePickerShortcutButton onClick={onPrevYearEndClicked}>
				<IntlLabel keys={['calendar', 'prevYearEnd']} value="Prev Year End"/>
			</DatePickerShortcutButton>
		</DatePickerShortcut>
		<DatePickerHeader>
			<DatePickerHeaderYearMonth>{currentDisplayMonth}</DatePickerHeaderYearMonth>
			<DatePickerHeaderOperators>
				<DatePickerHeaderTodayButton onClick={onTodayClicked}>
					<IntlLabel keys={['calendar', 'today']} value="Today"/>
				</DatePickerHeaderTodayButton>
				<DatePickerHeaderMonthChangeButton onClick={onGotoPrevMonthClicked}>
					<LeftCaret/>
				</DatePickerHeaderMonthChangeButton>
				<DatePickerHeaderMonthChangeButton onClick={onGotoNextMonthClicked}>
					<RightCaret/>
				</DatePickerHeaderMonthChangeButton>
			</DatePickerHeaderOperators>
		</DatePickerHeader>
		<DatePickerBody>
			<DatePickerBodyHeaderCell><IntlLabel keys={['calendar', 'sunday']} value="S"/></DatePickerBodyHeaderCell>
			<DatePickerBodyHeaderCell><IntlLabel keys={['calendar', 'monday']} value="M"/></DatePickerBodyHeaderCell>
			<DatePickerBodyHeaderCell><IntlLabel keys={['calendar', 'tuesday']} value="T"/></DatePickerBodyHeaderCell>
			<DatePickerBodyHeaderCell><IntlLabel keys={['calendar', 'wednesday']} value="W"/></DatePickerBodyHeaderCell>
			<DatePickerBodyHeaderCell><IntlLabel keys={['calendar', 'thursday']} value="T"/></DatePickerBodyHeaderCell>
			<DatePickerBodyHeaderCell><IntlLabel keys={['calendar', 'friday']} value="F"/></DatePickerBodyHeaderCell>
			<DatePickerBodyHeaderCell><IntlLabel keys={['calendar', 'saturday']} value="S"/></DatePickerBodyHeaderCell>
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
