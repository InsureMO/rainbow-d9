import {Undefinable, VUtils} from '@rainbow-d9/n1';
import {CalendarFixedTimeAt} from '@rainbow-d9/n2';
import {
	AttributeValueBuild,
	MonitorHandlerDetective,
	SpecificWidgetTranslator,
	ValidatorUtils,
	WidgetPropertyName
} from '../widget';
import {N2WidgetType} from './types';

export const N2CalendarBuildFixedTimeAt = (value: Undefinable<string>): Undefinable<CalendarFixedTimeAt> => {
	if (VUtils.isBlank(value)) {
		return (void 0);
	}
	value = value.trim().toLowerCase();
	if (value === 'start' || value === '0') {
		return {hour: 0, minute: 0, second: 0, millisecond: 0};
	} else if (value === 'end') {
		return {hour: 23, minute: 59, second: 59, millisecond: 999};
	}
	const parts = value.split('.').map(part => part.split(':')).flat();
	if (parts.length !== 3 && parts.length !== 4) {
		return (void 0);
	}
	const numbers = parts.map(part => VUtils.isNotNegative(part));
	if (numbers.some(number => !number.test)) {
		return (void 0);
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [h, m, s, ms] = numbers.map(number => (number as any).value);
	if (ms == null) {
		if (h > 23 || m > 59 || s > 59) {
			return (void 0);
		} else if (h === 23 && m === 59 && s === 59) {
			return {hour: 23, minute: 59, second: 59, millisecond: 999};
		} else {
			return {hour: h, minute: m, second: s, millisecond: 0};
		}
	} else if (ms > 999) {
		return (void 0);
	} else {
		return {hour: h, minute: m, second: s, millisecond: ms};
	}
};

export const N2CalendarFixedTimeAtBuild: AttributeValueBuild<CalendarFixedTimeAt> = {
	accept: (key: WidgetPropertyName) => key === 'fixedTimeAt',
	build: N2CalendarBuildFixedTimeAt
};

export const N2CalendarInitTimeAtBuild: AttributeValueBuild<CalendarFixedTimeAt> = {
	accept: (key: WidgetPropertyName) => key === 'initTimeAt',
	build: N2CalendarBuildFixedTimeAt
};

export class N2DateTranslator extends SpecificWidgetTranslator<N2WidgetType.DATE> {
	public getSupportedType(): N2WidgetType.DATE {
		return N2WidgetType.DATE;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [N2CalendarFixedTimeAtBuild, N2CalendarInitTimeAtBuild];
	}

	public getValidationHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			ValidatorUtils.DETECT_REQUIRED,
			...super.getValidationHandlerDetectives()
		];
	}
}

export class N2DateTimeTranslator extends SpecificWidgetTranslator<N2WidgetType.DATETIME> {
	public getSupportedType(): N2WidgetType.DATETIME {
		return N2WidgetType.DATETIME;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [N2CalendarFixedTimeAtBuild, N2CalendarInitTimeAtBuild];
	}

	public getValidationHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			ValidatorUtils.DETECT_REQUIRED,
			...super.getValidationHandlerDetectives()
		];
	}
}

export class N2CalendarTranslator extends SpecificWidgetTranslator<N2WidgetType.CALENDAR> {
	public getSupportedType(): N2WidgetType.CALENDAR {
		return N2WidgetType.CALENDAR;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [N2CalendarFixedTimeAtBuild, N2CalendarInitTimeAtBuild];
	}

	public getValidationHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			ValidatorUtils.DETECT_REQUIRED,
			...super.getValidationHandlerDetectives()
		];
	}
}
