import {BaseModel, PropValue} from '@rainbow-d9/n1';
import dayjs, {Dayjs} from 'dayjs';
import React, {useEffect, useState} from 'react';
import {useGlobalHandlers} from '../../global';
import {IntlLabel} from '../../intl-label';
import {useCalendarEventBus} from '../event/calendar-event-bus';
import {CalendarEventTypes} from '../event/calendar-event-bus-types';
import {CalendarProps} from '../types';
import {getDefaultCalendarYMFormat} from '../utils';
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

export interface CalendarDatePickerProps {
	$root: BaseModel;
	$model: PropValue;
	value: Dayjs;
	dateFormat: string;
	time: boolean;
	couldPerform?: CalendarProps['couldPerform'];
}

interface DatePickerState {
	visible: boolean;
	current: Dayjs;
}

export const DatePicker = (props: CalendarDatePickerProps) => {
	const {$root, $model, value, dateFormat, time, couldPerform} = props;

	const globalHandlers = useGlobalHandlers();
	const {on, off, fire} = useCalendarEventBus();
	const [state, setState] = useState<DatePickerState>({visible: true, current: value});

	useEffect(() => {
		const onOpen = () => setState(state => ({...state, visible: false}));
		const onClose = () => setState({current: value, visible: true});
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
	}, [on, off, value]);

	if (!state.visible) {
		return null;
	}

	const today = dayjs();
	const todayYear = today.year();
	const todayMonth = today.month();
	const todayDate = today.date();

	const onDateChange = (date: Dayjs, isDateChanged?: true) => () => {
		const newValue = date.clone().hour(value.hour()).minute(value.minute()).second(value.second()).millisecond(value.millisecond());
		const couldPerformValue = couldPerform == null ? true : (couldPerform({
			root: $root, model: $model, valueToCheck: newValue, checkType: 'date', global: globalHandlers
		}) !== false);
		if (couldPerformValue) {
			if (!time) {
				fire(CalendarEventTypes.VALUE_SELECTED, newValue, isDateChanged);
			} else {
				fire(CalendarEventTypes.VALUE_SELECTED, newValue);
			}
		}
		setState(state => ({...state, current: newValue}));
	};
	const onTodayClicked = onDateChange(today);
	const onYesterdayClicked = onDateChange(today.subtract(1, 'day'));
	const onWeekendClicked = onDateChange(today.day(6));
	const onPrevWeekendClicked = onDateChange(today.day(6).subtract(1, 'week'));
	const onMonthEndClicked = onDateChange(today.date(1).add(1, 'month').subtract(1, 'day'));
	const onPrevMonthEndClicked = onDateChange(today.date(1).subtract(1, 'day'));
	const onYearEndClicked = onDateChange(today.month(11).date(31));
	const onPrevYearEndClicked = onDateChange(today.month(11).date(31).subtract(1, 'year'));

	const onGotoPrevMonthClicked = () => onDateChange(state.current.subtract(1, 'month'))();
	const onGotoNextMonthClicked = () => onDateChange(state.current.add(1, 'month'))();

	const currentYear = state.current.year();
	const currentMonth = state.current.month();
	// const currentDate = state.current.date();
	const currentDisplayMonth = (() => {
		let format = getDefaultCalendarYMFormat();
		// Buddhist era
		if (dateFormat.includes('B')) {
			format = format.replace(/Y/g, 'B');
		}
		return state.current.format(format);
	})();
	const firstDayOfDisplayMonth = state.current.clone().date(1);
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
				const valueToPerform = state.current.clone().year(year).month(month).date(date);
				const couldPerformValue = couldPerform == null ? true : (couldPerform({
					root: $root, model: $model, valueToCheck: valueToPerform, checkType: 'date', global: globalHandlers
				}) !== false);
				const click = couldPerformValue ? onDateChange(dayjs().year(year).month(month).date(date), true) : (void 0);
				return <DatePickerBodyDateCell key={`${year}/${month}/${date}`}
				                               data-current-month={year === currentYear && month === currentMonth}
				                               data-current={year === value.year() && month === value.month() && date === value.date()}
				                               data-today={year === todayYear && month === todayMonth && date === todayDate}
				                               data-could-perform={couldPerformValue}
				                               onClick={click}>
					<span>{date}</span>
				</DatePickerBodyDateCell>;
			})}
		</DatePickerBody>
	</DatePickerContainer>;
};
