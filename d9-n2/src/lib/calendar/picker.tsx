import {MUtils, PPUtils, VUtils} from '@rainbow-d9/n1';
import dayjs, {Dayjs} from 'dayjs';
import React, {MouseEvent} from 'react';
import {CssVars} from '../constants';
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
import {useCalendarEventBus} from './event/calendar-event-bus';
import {CalendarEventTypes} from './event/calendar-event-bus-types';
import {CalendarPopup} from './popup';
import {CalendarProps} from './types';
import {
	FIX_TIME_AT_START_OF_DAY,
	getDefaultCalendarDateFormat,
	getDefaultCalendarDatetimeFormat,
	getDefaultCalendarTimeFormat,
	isCalendarAutoConfirm
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
export const Picker = (props: CalendarProps) => {
	const {
		$pp, $wrapped: {$onValueChange, $model, $p2r, $avs: {$disabled, $visible}},
		please = '', clearable = true,
		dateFormat = getDefaultCalendarDateFormat(), time, timeFormat = getDefaultCalendarTimeFormat(),
		storeFormat = getDefaultCalendarDatetimeFormat(), fixedTimeAt = FIX_TIME_AT_START_OF_DAY,
		initTimeAt,
		autoConfirm = isCalendarAutoConfirm(),
		...rest
	} = props;

	const {fire} = useCalendarEventBus();
	const {containerRef, popupRef, popupState, setPopupState, popupShown, setPopupShown} = useDropdownControl({
		askPopupMaxHeight: () => CssVars.CALENDAR_POPUP_HEIGHT_VALUE
	});

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
	const redressTimePart = (value: Dayjs | null): Dayjs => {
		if (!time && fixedTimeAt != null && value != null) {
			return value.hour(fixedTimeAt.hour)
				.minute(fixedTimeAt.minute)
				.second(fixedTimeAt.second)
				.millisecond(fixedTimeAt.millisecond);
		} else {
			return value;
		}
	};
	const onBlurred = async () => {
		if (!autoConfirm) {
			return;
		}
		if ($disabled || !isDropdownPopupActive(popupState.active)) {
			// do nothing
			return;
		}

		fire(CalendarEventTypes.ASK_VALUE, async (newValue: Dayjs | null) => {
			newValue = redressTimePart(newValue);
			if (VUtils.isBlank(value)) {
				if (newValue != null) {
					// no value assigned in model, use new value
					await $onValueChange(newValue.format(storeFormat));
				}
				setPopupState(state => ({...state, active: DropdownPopupStateActive.HIDDEN}));
			} else {
				const originalValue = dayjs(value as string, storeFormat);
				if (!originalValue.isSame(newValue)) {
					// old value is not same as new value, use new value
					await $onValueChange(newValue.format(storeFormat));
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
			await $onValueChange(null);
			fire(CalendarEventTypes.VALUE_CLEARED);
		}
		showPopup();
	};
	const onConfirm = async (value: Dayjs) => {
		if ($disabled) {
			return;
		}

		await $onValueChange(redressTimePart(value).format(storeFormat));
		setPopupShown(false);
	};

	const value = MUtils.getValue($model, $pp) as string | null | undefined;
	const valueAssigned = VUtils.isNotBlank(value);
	const label = (() => {
		if (VUtils.isBlank(value)) {
			return please || '';
		} else if (time) {
			const datetimeFormat = computeFormat({date: dateFormat, time: timeFormat});
			return dayjs(value, storeFormat).format(datetimeFormat);
		} else {
			return dayjs(value, storeFormat).format(dateFormat);
		}
	})();

	const initValueForPopup = ((): Dayjs | null => {
		if (VUtils.isBlank(value)) {
			return null;
		}
		const parsed = dayjs(value, storeFormat);
		return parsed.isValid() ? parsed : null;
	})();

	return <DropdownContainer active={popupState.active} atBottom={popupState.atBottom}
	                          ref={containerRef} role="input" tabIndex={0}
	                          {...rest}
	                          data-w="d9-calendar"
	                          data-disabled={$disabled} data-visible={$visible}
	                          onClick={onClicked} onBlur={onBlurred}
	                          id={PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id)}>
		<CalendarValueHolder initValue={initValueForPopup}/>
		<DropdownLabel data-please={!valueAssigned}>{label}</DropdownLabel>
		<DropdownStick valueAssigned={valueAssigned} clearable={clearable} clear={onClearClicked}
		               disabled={$disabled}/>
		{isDropdownPopupActive(popupState.active)
			? <CalendarPopup initValue={initValueForPopup}
			                 popupRef={popupRef} popupState={popupState} popupShown={popupShown}
			                 dateFormat={dateFormat} time={time} timeFormat={timeFormat} initTimeAt={initTimeAt}
			                 confirm={onConfirm}/>
			: null}
	</DropdownContainer>;
};
