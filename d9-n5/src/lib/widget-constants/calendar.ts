import {N2} from '@rainbow-d9/n3';
import {PlaygroundIcons} from '../icons';
import {PlaygroundWidget, PlaygroundWidgetGroupKey, PlaygroundWidgetProperty} from '../types';
import {Clearable, Please, ValidationRequired, ValueChanged} from './attributes';

export const CalendarProperties: Array<PlaygroundWidgetProperty> = [
	Please, Clearable,
	{name: 'date', label: 'Boolean. Allow date part or not.', description: 'Default true.'},
	{name: 'dateFormat', label: 'Text.', description: 'Default value depends on system settings.'},
	{name: 'time', label: 'Boolean. Allow time part or not.', description: 'Default false.'},
	{
		name: 'timeFormat',
		label: 'Text.',
		description: 'Default value depends on system settings, works only when "time" is true.'
	},
	{name: 'storeFormat', label: 'Text.', description: 'Default value depends on system settings.'},
	{
		name: 'fixedTimeAt', label: 'Text.',
		description: 'Default value depends on system settings, works only when "time" is false. "start", "0", "end", "HH:mm:ss", "HH:mm:ss.SSS".'
	},
	{
		name: 'initTimeAt', label: 'Text.',
		description: '"start", "0", "end", "HH:mm:ss", "HH:mm:ss.SSS".'
	},
	{name: 'autoConfirm', label: 'Boolean.', description: 'Confirm selection when blurred.'},
	{
		name: 'autoConfirmOnDate', label: 'Boolean.',
		description: 'Confirm selection when date clicked when no time part.'
	},
	{name: 'useCalendarIcon', label: 'Boolean.', description: 'Use calendar icon instead of caret.'},
	{name: 'couldPerform', label: 'Snippet.', description: 'Check given date could be performed or not.'}
];

export const CALENDARS: Array<PlaygroundWidget> = [
	{
		$wt: N2.N2WidgetType.CALENDAR, label: 'Date picker.',
		properties: [...CalendarProperties, ValueChanged, ValidationRequired],
		icon: PlaygroundIcons.DATE, group: PlaygroundWidgetGroupKey.INPUTS, tooltip: 'Date picker',
		notInToolbar: true
	},
	{
		$wt: N2.N2WidgetType.DATE, label: 'Date picker. Shortcut of "Calendar"',
		properties: [
			...CalendarProperties.filter(({name}) => !['date', 'time', 'timeFormat'].includes(name)),
			ValueChanged,
			ValidationRequired
		],
		icon: PlaygroundIcons.DATE, group: PlaygroundWidgetGroupKey.INPUTS, tooltip: 'Date picker',
		template: `Date::[caption]::[property]
- dateFormat: YYYY/MM/DD
- fixedTimeAt: start
- initTimeAt: start
- useCalendarIcon
`
	},
	{
		$wt: N2.N2WidgetType.DATETIME, label: 'Datetime picker.',
		properties: [
			...CalendarProperties.filter(({name}) => !['date', 'time', 'fixedTimeAt'].includes(name)),
			ValueChanged,
			ValidationRequired
		],
		icon: PlaygroundIcons.DATETIME, group: PlaygroundWidgetGroupKey.INPUTS, tooltip: 'Datetime picker',
		template: `DateTime::[caption]::[property]
- initTimeAt: 12:30:00
`
	},
	{
		$wt: N2.N2WidgetType.TIME, label: 'Datetime picker.',
		properties: [
			...CalendarProperties.filter(({name}) => !['date', 'dateFormat', 'autoConfirmOnDate', 'time', 'fixedTimeAt'].includes(name)),
			ValueChanged,
			ValidationRequired
		],
		icon: PlaygroundIcons.TIME, group: PlaygroundWidgetGroupKey.INPUTS, tooltip: 'Time picker',
		template: `Time::[caption]::[property]
- initTimeAt: 12:30:00
`
	}
];
