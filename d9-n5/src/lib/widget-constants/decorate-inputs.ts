import {N2} from '@rainbow-d9/n3';
import {PlaygroundIcons} from '../icons';
import {PlaygroundWidgetGroupKey} from '../types';
import {
	AutoSelect,
	InputPlaceholder,
	LeadsDecorateElements,
	TailsDecorateElements,
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

export const DECORATE_INPUTS = [
	{
		$wt: N2.N2WidgetType.DECORATE_INPUT, label: 'Decorable input box.',
		properties: [
			AutoSelect, InputPlaceholder, ValueChanged,
			LeadsDecorateElements, TailsDecorateElements,
			ValidationRequired, ValidationRegex, ValidationRegexp, ValidationLength,
			ValidationNumeric, ValidationPositive, ValidationNotNegative, ValidationInteger, ValidationNumberRange
		],
		icon: PlaygroundIcons.DECO_INPUT, group: PlaygroundWidgetGroupKey.INPUTS, tooltip: 'Decorable input',
		template: `DecoInput::[caption]::[property]
- placeholder: a placeholder text
- length: 5,10,15..20; Length should be 5, 10 or between 15 and 20.
- leads: $icons.x; $icons.y
- tails:
  - first tail
  - last tail
`
	},
	{
		$wt: N2.N2WidgetType.DECORATE_NUMBER, label: 'Decorable number input box.',
		properties: [
			AutoSelect, InputPlaceholder, ValueChanged,
			LeadsDecorateElements, TailsDecorateElements,
			ValidationRequired, ValidationRegex, ValidationRegexp, ValidationLength,
			ValidationNumeric, ValidationPositive, ValidationNotNegative, ValidationInteger, ValidationNumberRange
		],
		icon: PlaygroundIcons.DECO_NUMBER, group: PlaygroundWidgetGroupKey.INPUTS, tooltip: 'Decorable number input',
		template: `DecoNumber::[caption]::[property]
- notNegative, integer
- placeholder: a placeholder text
- numberRange: ..100],(200..300],[400..; Value should <=100, or >200 and <=300, or >=400.
- leads: $icons.x; $icons.y
- tails:
  - first tail
  - last tail
`
	},
	{
		$wt: N2.N2WidgetType.DECORATE_PASSWORD,
		label: 'Decorable password input box.',
		properties: [
			AutoSelect, InputPlaceholder, ValueChanged,
			LeadsDecorateElements, TailsDecorateElements,
			ValidationRequired, ValidationRegex, ValidationRegexp, ValidationLength
		],
		icon: PlaygroundIcons.DECO_PASSWORD, group: PlaygroundWidgetGroupKey.INPUTS,
		tooltip: 'Decorable password input',
		template: `DecoPwd::[caption]::[property]
- placeholder: a placeholder text
- length: 12..; Minimum length is 12.
- regex: key-of-predefined-regex
- leads: $icons.x; $icons.y
- tails:
  - first tail
  - last tail
`
	}
];
