import {MUtils, Nullable, PPUtils, VUtils} from '@rainbow-d9/n1';
import dayjs, {Dayjs} from 'dayjs';
import React, {ForwardedRef, forwardRef, MouseEvent} from 'react';
import styled from 'styled-components';
import {CssVars, DOM_KEY_WIDGET} from '../constants';
import {DropdownOptionValue} from '../dropdown';
import {
	DropdownContainer,
	DropdownLabel,
	DropdownPopupStateActive,
	DropdownStick,
	getDropdownPosition,
	isDropdownPopupActive,
	isPopupAtBottom,
	useDropdownControl
} from '../dropdown-assist';
import {useGlobalHandlers} from '../global';
import {Date} from '../icons';
import {useDualRefs} from '../utils';
import {useCalendarEventBus} from './event/calendar-event-bus';
import {CalendarEventTypes} from './event/calendar-event-bus-types';
import {CalendarPopup} from './popup';
import {CalendarProps} from './types';
import {
	FIX_TIME_AT_START_OF_DAY,
	getDefaultCalendarDateFormat,
	getDefaultCalendarDatetimeFormat,
	getDefaultCalendarTimeFormat,
	isCalendarAutoConfirm,
	isCalendarAutoConfirmOnDate,
	isStickIconUseCalendar
} from './utils';
import {CalendarValueHolder} from './value-holder';

const computeFormat = (options: { date?: string, time?: string }): string => {
	const {date, time} = options;
	if (VUtils.isBlank(time)) {
		return date;
	} else if (VUtils.isBlank(date)) {
		return time;
	} else {
		return `${date} ${time}`;
	}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DropdownStickCalendar = styled(Date as any).attrs({[DOM_KEY_WIDGET]: 'd9-dropdown-caret'})`
    height: calc(${CssVars.INPUT_HEIGHT} * 2 / 5);
    fill: ${CssVars.FONT_COLOR};
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
`;

export const Picker = forwardRef((props: CalendarProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {
		$pp, $wrapped: {$onValueChange, $root, $model, $p2r, $avs: {$disabled, $visible}},
		please = '', clearable = true,
		date, dateFormat = getDefaultCalendarDateFormat(), time, timeFormat = getDefaultCalendarTimeFormat(),
		storeFormat = getDefaultCalendarDatetimeFormat(),
		fixedTimeAt = FIX_TIME_AT_START_OF_DAY, initTimeAt,
		couldPerform,
		autoConfirm = isCalendarAutoConfirm(), autoConfirmOnDate = isCalendarAutoConfirmOnDate(),
		useCalendarIcon = isStickIconUseCalendar(),
		...rest
	} = props;

	const globalHandlers = useGlobalHandlers();
	const {fire} = useCalendarEventBus();
	const {
		containerRef, popupRef,
		popupState, setPopupState,
		popupShown, setPopupShown
	} = useDropdownControl({
		askPopupMaxHeight: () => CssVars.CALENDAR_POPUP_HEIGHT_VALUE,
		askPopupMaxWidth: () => CssVars.CALENDAR_POPUP_WIDTH_VALUE,
		fixWidth: true
	});
	useDualRefs(containerRef, ref);

	const showPopup = () => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const {top, left, width, height} = getDropdownPosition(containerRef.current!);
		const bottom = isPopupAtBottom(top, height, () => CssVars.CALENDAR_POPUP_HEIGHT_VALUE);
		setPopupState(state => ({
			...state,
			active: DropdownPopupStateActive.WILL_ACTIVE, atBottom: bottom,
			top, left, width, height,
			minWidth: width, maxHeight: CssVars.CALENDAR_POPUP_HEIGHT_VALUE
		}));
	};
	const onClicked = () => {
		if ($disabled || isDropdownPopupActive(popupState.active)) {
			return;
		}
		showPopup();
	};
	const redressTimePart = (value: Nullable<Dayjs>): Dayjs => {
		if (value == null) {
			return null;
		}
		if (!time) {
			// no time part, only redress time when fixedTimeAt is given
			if (fixedTimeAt != null) {
				return value.hour(fixedTimeAt.hour)
					.minute(fixedTimeAt.minute)
					.second(fixedTimeAt.second)
					.millisecond(fixedTimeAt.millisecond);
			}
		} else if (!(timeFormat ?? '').includes('m')) {
			// no minute and second, always redress minute/second/millisecond
			return value.minute(fixedTimeAt?.minute ?? 0)
				.second(fixedTimeAt?.second ?? 0)
				.millisecond(fixedTimeAt?.millisecond ?? 0);
		} else if (!(timeFormat ?? '').includes('s')) {
			// no second, always redress second/millisecond
			return value.second(fixedTimeAt?.second ?? 0)
				.millisecond(fixedTimeAt?.millisecond ?? 0);
		} else {
			// time exists, always redress millisecond
			return value.millisecond(fixedTimeAt?.millisecond ?? 0);
		}
		return value;
	};
	const onBlurred = async () => {
		if (!autoConfirm) {
			return;
		}
		if ($disabled || !isDropdownPopupActive(popupState.active)) {
			// do nothing
			return;
		}

		fire(CalendarEventTypes.ASK_VALUE, async (newValue: Nullable<Dayjs>) => {
			newValue = redressTimePart(newValue);
			if (VUtils.isBlank(value)) {
				if (newValue != null) {
					// no value assigned in model, use new value
					await $onValueChange(newValue.format(storeFormat), true, {global: globalHandlers});
				}
				setPopupState(state => ({...state, active: DropdownPopupStateActive.HIDDEN}));
			} else {
				const originalValue = dayjs(value as string, storeFormat);
				if (!originalValue.isSame(newValue)) {
					// old value is not same as new value, use new value
					await $onValueChange(newValue.format(storeFormat), true, {global: globalHandlers});
					setPopupState(state => ({...state, active: DropdownPopupStateActive.HIDDEN}));
				} else {
					// close popup
					setPopupState(state => ({...state, active: DropdownPopupStateActive.HIDDEN}));
				}
			}
		});
	};

	const onClearClicked = async (event: MouseEvent<HTMLSpanElement>) => {
		if ($disabled) {
			return;
		}
		event.preventDefault();
		event.stopPropagation();
		const value = MUtils.getValue($model, $pp) as DropdownOptionValue;
		if (value != null) {
			await $onValueChange(null, true, {global: globalHandlers});
			fire(CalendarEventTypes.VALUE_CLEARED);
		}
		showPopup();
	};
	const onConfirm = async (value: Dayjs) => {
		if ($disabled) {
			return;
		}

		await $onValueChange(redressTimePart(value).format(storeFormat), true, {global: globalHandlers});
		setPopupShown(false);
	};

	const value = MUtils.getValue($model, $pp) as Nullable<string>;
	const valueAssigned = VUtils.isNotBlank(value);
	const label = (() => {
		if (VUtils.isBlank(value)) {
			return please || '';
		} else if (date === false) {
			// time only
			return dayjs(value, storeFormat).format(timeFormat);
		} else if (time) {
			// both date time
			const datetimeFormat = computeFormat({date: dateFormat, time: timeFormat});
			return dayjs(value, storeFormat).format(datetimeFormat);
		} else {
			// date only
			return dayjs(value, storeFormat).format(dateFormat);
		}
	})();

	const initValueForPopup = ((): Nullable<Dayjs> => {
		if (VUtils.isBlank(value)) {
			return null;
		}
		const parsed = dayjs(value, storeFormat);
		return parsed.isValid() ? parsed : null;
	})();

	return <DropdownContainer active={popupState.active} atBottom={popupState.atBottom}
	                          role="input" tabIndex={0}
	                          {...rest}
	                          data-w="d9-calendar"
	                          data-disabled={$disabled} data-visible={$visible}
	                          onClick={onClicked} onBlur={onBlurred}
	                          id={PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id)}
	                          ref={containerRef}>
		<CalendarValueHolder initValue={initValueForPopup}/>
		<DropdownLabel data-please={!valueAssigned}>{label}</DropdownLabel>
		<DropdownStick valueAssigned={valueAssigned} clearable={clearable} clear={onClearClicked}
		               disabled={$disabled} icon={useCalendarIcon ? <DropdownStickCalendar/> : (void 0)}/>
		{isDropdownPopupActive(popupState.active)
			? <CalendarPopup $root={$root} $model={$model} initValue={initValueForPopup}
			                 popupRef={popupRef} popupState={popupState} popupShown={popupShown}
			                 date={date} dateFormat={dateFormat} time={time} timeFormat={timeFormat}
			                 initTimeAt={initTimeAt} autoConfirmOnDate={autoConfirmOnDate}
			                 couldPerform={couldPerform}
			                 confirm={onConfirm}/>
			: null}
	</DropdownContainer>;
});
