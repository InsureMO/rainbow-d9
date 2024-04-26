import {N2} from '@rainbow-d9/n3';
import {PlaygroundIcons} from '../icons';
import {PlaygroundWidgetGroupKey, PlaygroundWidgetProperty} from '../types';
import {OptionItemsProperties, ValidationLength, ValidationRequired, ValueChanged} from './attributes';

export const CheckboxesProperties: Array<PlaygroundWidgetProperty> = [
	...OptionItemsProperties.filter(({name}) => name !== 'noMatched'),
	{name: 'columns', label: 'Number.', description: 'Display columns when not on compact mode.'},
	{name: 'compact', label: 'Boolean.', description: 'Default true. Try to fit as many as possible onto one line.'},
	{
		name: 'single', label: 'Boolean.',
		description: 'Default false. Use primitive value of model instead of an array.'
	},
	{name: 'boolOnSingle', label: 'Boolean.', description: 'Default false. Use false when no option checked.'}
];

export const CHECKBOXES = [
	{
		$wt: N2.N2WidgetType.CHECKBOX,
		properties: [
			{
				name: 'values', label: 'Text.',
				description: 'One or two values, connected by ",". First is true value, second is false value.'
			},
			{
				name: 'emptyWhenFalse', label: 'Boolean.',
				description: 'Default false. Use times icon when it is false.'
			},
			ValueChanged,
			ValidationRequired
		],
		icon: PlaygroundIcons.CHECKBOX, group: PlaygroundWidgetGroupKey.OPTIONS,
		template: `Checkbox::[caption]::[property]
- values: 1, 0
`
	},
	{
		$wt: N2.N2WidgetType.CHECKBOXES, label: 'Checkbox group.',
		properties: [...CheckboxesProperties, ValueChanged, ValidationRequired, ValidationLength],
		icon: PlaygroundIcons.CHECKS, group: PlaygroundWidgetGroupKey.OPTIONS, tooltip: 'Checkbox group',
		notInToolbar: true
	},
	{
		$wt: N2.N2WidgetType.CHECKS, label: 'Checkbox group. Shortcut of "Checkboxes".',
		properties: [...CheckboxesProperties, ValueChanged, ValidationRequired, ValidationLength],
		icon: PlaygroundIcons.CHECKS, group: PlaygroundWidgetGroupKey.OPTIONS, tooltip: 'Checkbox group',
		template: `Checks::[caption]::[property]
- options: 1: Pizza; 2: Hamburger; 3: Noodle
`
	}
];