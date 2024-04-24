import {BaseModel, Nullable, PropValue} from '@rainbow-d9/n1';
import dayjs, {Dayjs} from 'dayjs';
import React, {RefObject, useState} from 'react';
import {CssVars} from '../constants';
import {DropdownPopup, DropdownPopupState, DropdownPopupStateActive} from '../dropdown-assist';
import {DatePicker} from './date-picker';
import {CalendarPopupHeader} from './popup-header';
import {TimePicker} from './time-picker';
import {CalendarProps} from './types';
import {useValueChange} from './use-value-change';
import {checkDateParts} from './utils';
import {PopupContainer} from './widgets';
import {YearMonthPicker} from './year-month-picker';

interface CalendarPopupProps extends Required<Pick<CalendarProps, 'date' | 'dateFormat' | 'time' | 'timeFormat' | 'initTimeAt' | 'couldPerform'>> {
	$root: BaseModel;
	$model: PropValue;
	initValue?: Nullable<Dayjs>;
	popupRef: RefObject<HTMLDivElement>;
	popupState: DropdownPopupState;
	popupShown: boolean;
	autoConfirmOnDate: boolean;
	confirm: (value: Dayjs) => void;
}

export const CalendarPopup = (props: CalendarPopupProps) => {
	const {
		$root, $model, initValue,
		popupRef, popupState, popupShown,
		date = true, dateFormat, time = false, timeFormat, initTimeAt,
		autoConfirmOnDate, couldPerform,
		confirm
	} = props;

	const [value, setValue] = useState(() => {
		if (initValue != null) {
			return initValue;
		} else {
			let date = dayjs();
			if (initTimeAt != null) {
				date = date.hour(initTimeAt.hour)
					.minute(initTimeAt.minute)
					.second(initTimeAt.second)
					.millisecond(initTimeAt.millisecond);
			}
			return date;
		}
	});
	useValueChange((value: Dayjs, isDateChanged?: true) => {
		setValue(value);
		if (autoConfirmOnDate && isDateChanged) {
			confirm(value);
		}
	});

	const {hasDate} = checkDateParts(dateFormat);

	return <DropdownPopup {...popupState}
	                      minWidth={CssVars.CALENDAR_POPUP_WIDTH_VALUE} maxWidth={CssVars.CALENDAR_POPUP_WIDTH_VALUE}
	                      minHeight={CssVars.CALENDAR_POPUP_HEIGHT_VALUE}
	                      maxHeight={CssVars.CALENDAR_POPUP_HEIGHT_VALUE}
	                      shown={popupShown && popupState.active === DropdownPopupStateActive.ACTIVE} ref={popupRef}>
		<PopupContainer>
			<CalendarPopupHeader date={date} dateFormat={dateFormat} time={time} timeFormat={timeFormat}
			                     value={value} confirm={confirm}/>
			{date && hasDate
				? <DatePicker $root={$root} $model={$model} value={value} dateFormat={dateFormat} time={time}
				              couldPerform={couldPerform}/>
				: null}
			{time
				? <TimePicker $root={$root} $model={$model} value={value} date={date} timeFormat={timeFormat}
				              couldPerform={couldPerform}/>
				: null}
			{date
				? <YearMonthPicker $root={$root} $model={$model} value={value} dateFormat={dateFormat}
				                   couldPerform={couldPerform}/>
				: null}
		</PopupContainer>
	</DropdownPopup>;
};