import {BaseModel, PropValue} from '@rainbow-d9/n1';
import {Dayjs} from 'dayjs';
import React, {useEffect, useRef, useState} from 'react';
import {useGlobalHandlers} from '../../global';
import {IntlLabel} from '../../intl-label';
import {useCalendarEventBus} from '../event/calendar-event-bus';
import {CalendarEventTypes} from '../event/calendar-event-bus-types';
import {CalendarProps} from '../types';
import {checkTimeParts} from '../utils';
import {TimePickerContainer, TimePickerLabel, TimePickerSelector, TimePickerSelectorOption} from './widgets';

export interface CalendarTimePickerProps {
	$root: BaseModel;
	$model: PropValue;
	value: Dayjs;
	timeFormat: string;
	couldPerform?: CalendarProps['couldPerform'];
}

export const TimePicker = (props: CalendarTimePickerProps) => {
	const {$root, $model, value, timeFormat, couldPerform} = props;

	const hourSelectorRef = useRef<HTMLDivElement>(null);
	const minuteSelectorRef = useRef<HTMLDivElement>(null);
	const secondSelectorRef = useRef<HTMLDivElement>(null);
	const globalHandlers = useGlobalHandlers();
	const {on, off, fire} = useCalendarEventBus();
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onOpen = () => setVisible(true);
		const onClose = () => setVisible(false);
		on(CalendarEventTypes.OPEN_TIME_PICKER, onOpen);
		on(CalendarEventTypes.OPEN_YEAR_MONTH_PICKER, onClose);
		on(CalendarEventTypes.CLOSE_TIME_PICKER, onClose);
		return () => {
			off(CalendarEventTypes.OPEN_TIME_PICKER, onOpen);
			off(CalendarEventTypes.OPEN_YEAR_MONTH_PICKER, onClose);
			off(CalendarEventTypes.CLOSE_TIME_PICKER, onClose);
		};
	}, [on, off]);
	useEffect(() => {
		if (hourSelectorRef.current != null && visible) {
			hourSelectorRef.current.querySelector(`span[data-hour="${value.hour()}"]`)?.scrollIntoView();
		}
		if (minuteSelectorRef.current != null && visible) {
			minuteSelectorRef.current.querySelector(`span[data-minute="${value.minute()}"]`)?.scrollIntoView();
		}
		if (secondSelectorRef.current != null && visible) {
			secondSelectorRef.current.querySelector(`span[data-second="${value.second()}"]`)?.scrollIntoView();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visible]);

	if (!visible) {
		return null;
	}

	const onHourChange = (index: number) => () => {
		const newValue = value.hour(index);
		fire(CalendarEventTypes.VALUE_SELECTED, newValue);
	};
	const onMinuteChange = (index: number) => () => {
		const newValue = value.minute(index);
		fire(CalendarEventTypes.VALUE_SELECTED, newValue);
	};
	const onSecondChange = (index: number) => () => {
		const newValue = value.second(index);
		fire(CalendarEventTypes.VALUE_SELECTED, newValue);
	};

	const {hasMinute, hasSecond} = checkTimeParts(timeFormat);
	const columns = 3 - (!hasMinute ? 1 : 0) - (!hasSecond ? 1 : 0);

	return <TimePickerContainer columns={columns}>
		<TimePickerLabel>
			<IntlLabel keys={['calendar', 'hour']} value="Hour"/>
		</TimePickerLabel>
		{hasMinute
			? <TimePickerLabel>
				<IntlLabel keys={['calendar', 'minute']} value="Minute"/>
			</TimePickerLabel>
			: null}
		{hasSecond
			? <TimePickerLabel>
				<IntlLabel keys={['calendar', 'second']} value="Second"/>
			</TimePickerLabel>
			: null}
		<TimePickerSelector ref={hourSelectorRef}>
			{new Array(24).fill(1).map((_, index) => {
				const valueToPerform = value.clone().hour(index);
				const couldPerformValue = couldPerform == null ? true : (couldPerform({
					root: $root, model: $model, valueToCheck: valueToPerform, checkType: 'hour', global: globalHandlers
				}) !== false);
				const click = couldPerformValue ? onHourChange(index) : (void 0);
				return <TimePickerSelectorOption data-current={value.hour() === index} data-hour={index}
				                                 data-could-perform={couldPerformValue}
				                                 onClick={click} key={index}>
					{`${index}`.padStart(2, '0')}
				</TimePickerSelectorOption>;
			})}
		</TimePickerSelector>
		{hasMinute
			? <TimePickerSelector ref={minuteSelectorRef}>
				{new Array(60).fill(1).map((_, index) => {
					const valueToPerform = value.clone().minute(index);
					const couldPerformValue = couldPerform == null ? true : (couldPerform({
						root: $root, model: $model,
						valueToCheck: valueToPerform, checkType: 'minute',
						global: globalHandlers
					}) !== false);
					const click = couldPerformValue ? onMinuteChange(index) : (void 0);
					return <TimePickerSelectorOption data-current={value.minute() === index} data-minute={index}
					                                 data-could-perform={couldPerformValue}
					                                 onClick={click} key={index}>
						{`${index}`.padStart(2, '0')}
					</TimePickerSelectorOption>;
				})}
			</TimePickerSelector>
			: null}
		{hasSecond
			? <TimePickerSelector ref={secondSelectorRef}>
				{new Array(60).fill(1).map((_, index) => {
					const valueToPerform = value.clone().second(index);
					const couldPerformValue = couldPerform == null ? true : (couldPerform({
						root: $root, model: $model,
						valueToCheck: valueToPerform, checkType: 'second',
						global: globalHandlers
					}) !== false);
					const click = couldPerformValue ? onSecondChange(index) : (void 0);
					return <TimePickerSelectorOption data-current={value.second() === index} data-second={index}
					                                 data-could-perform={couldPerformValue}
					                                 onClick={click} key={index}>
						{`${index}`.padStart(2, '0')}
					</TimePickerSelectorOption>;
				})}
			</TimePickerSelector>
			: null}
	</TimePickerContainer>;
};