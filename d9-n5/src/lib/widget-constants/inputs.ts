import {N2} from '@rainbow-d9/n3';
import {PlaygroundIcons} from '../icons';
import {PlaygroundWidget, PlaygroundWidgetGroupKey} from '../types';
import {
	AutoSelect,
	InputPlaceholder,
	ValidationInteger,
	ValidationLength,
	ValidationNotNegative,
	ValidationNumberRange,
	ValidationNumeric,
	ValidationPositive,
	ValidationRegex,
	ValidationRegexp,
	ValidationRequired,
	ValueChanged
} from './attributes';

export const INPUTS: Array<PlaygroundWidget> = [
	{
		$wt: N2.N2WidgetType.INPUT, label: 'Input box.',
		properties: [
			AutoSelect, InputPlaceholder,
			{
				name: 'valueToNumber', label: 'Boolean. Treat as a number.',
				description: 'Default false. Attempt to synchronize with the data model as a number.'
			},
			ValueChanged,
			ValidationRequired, ValidationRegex, ValidationRegexp, ValidationLength,
			ValidationNumeric, ValidationPositive, ValidationNotNegative, ValidationInteger, ValidationNumberRange
		],
		icon: PlaygroundIcons.INPUT, group: PlaygroundWidgetGroupKey.INPUTS,
		template: `Input::[caption]::[property]
- placeholder: a placeholder text
- required: a reminder message
- length: 5,10,15..20; Length should be 5, 10 or between 15 and 20.
`
	},
	{
		$wt: N2.N2WidgetType.NUMBER, label: 'Number input box.',
		properties: [
			AutoSelect, InputPlaceholder, ValueChanged,
			ValidationRequired, ValidationRegex, ValidationRegexp, ValidationLength,
			ValidationNumeric, ValidationPositive, ValidationNotNegative, ValidationInteger, ValidationNumberRange
		],
		icon: PlaygroundIcons.NUMBER_INPUT, group: PlaygroundWidgetGroupKey.INPUTS, tooltip: 'Number input',
		template: `Number::[caption]::[property]
- notNegative, integer
- placeholder: a placeholder text
- numberRange: ..100],(200..300],[400..; Value should <=100, or >200 and <=300, or >=400.
`
	},
	{
		$wt: N2.N2WidgetType.PASSWORD, label: 'Password input box.',
		properties: [
			AutoSelect, InputPlaceholder, ValueChanged,
			ValidationRequired, ValidationRegex, ValidationRegexp, ValidationLength
		],
		icon: PlaygroundIcons.PASSWORD, group: PlaygroundWidgetGroupKey.INPUTS, tooltip: 'Password input',
		template: `Pwd::[caption]::[property]
- placeholder: a placeholder text
- length: 12..; Minimum length is 12.
- regex: key-of-predefined-regex
`
	}
];