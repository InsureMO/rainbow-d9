import dayjs, {Dayjs} from 'dayjs';
import React, {RefObject, useState} from 'react';
import {CssVars} from '../constants';
import {DropdownPopup, DropdownPopupState, DropdownPopupStateActive} from '../dropdown-assist';
import {DatePicker} from './date-picker';
import {CalendarPopupHeader} from './popup-header';
import {TimePicker} from './time-picker';
import {CalendarProps} from './types';
import {useValueChange} from './use-value-change';
import {PopupContainer} from './widgets';
import {YearMonthPicker} from './year-month-picker';

interface CalendarPopupProps extends Required<Pick<CalendarProps, 'dateFormat' | 'time' | 'timeFormat'>> {
	initValue?: Dayjs | null;
	popupRef: RefObject<HTMLDivElement>;
	popupState: DropdownPopupState;
	popupShown: boolean;
	confirm: (value: Dayjs) => void;
}

export const CalendarPopup = (props: CalendarPopupProps) => {
	const {
		initValue,
		popupRef, popupState, popupShown,
		dateFormat, time, timeFormat,
		confirm
	} = props;

	const [value, setValue] = useState(() => initValue || dayjs());
	useValueChange(setValue);

	return <DropdownPopup {...popupState}
	                      minWidth={CssVars.CALENDAR_POPUP_WIDTH_VALUE} maxWidth={CssVars.CALENDAR_POPUP_WIDTH_VALUE}
	                      minHeight={CssVars.CALENDAR_POPUP_HEIGHT_VALUE}
	                      maxHeight={CssVars.CALENDAR_POPUP_HEIGHT_VALUE}
	                      shown={popupShown && popupState.active === DropdownPopupStateActive.ACTIVE} ref={popupRef}>
		<PopupContainer>
			<CalendarPopupHeader dateFormat={dateFormat} time={time} timeFormat={timeFormat}
			                     value={value} confirm={confirm} />
			<DatePicker value={value} />
			{time ? <TimePicker value={value} /> : null}
			<YearMonthPicker value={value} />
		</PopupContainer>
	</DropdownPopup>;
};