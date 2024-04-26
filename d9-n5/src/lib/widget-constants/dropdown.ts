import {N2} from '@rainbow-d9/n3';
import {PlaygroundIcons} from '../icons';
import {PlaygroundWidgetGroupKey, PlaygroundWidgetProperty} from '../types';
import {
	Clearable,
	OptionItemsProperties,
	Please,
	ValidationLength,
	ValidationRequired,
	ValueChanged
} from './attributes';

export const DropdownProperties: Array<PlaygroundWidgetProperty> = [
	...OptionItemsProperties,
	Please, Clearable,
	{name: 'maxWidth', label: 'Number.', description: 'Max popup width, in pixels.'}
];

export const DROPDOWNS = [
	{
		$wt: N2.N2WidgetType.DROPDOWN, label: 'Dropdown.',
		properties: [...DropdownProperties, ValueChanged, ValidationRequired],
		icon: PlaygroundIcons.DROPDOWN, group: PlaygroundWidgetGroupKey.OPTIONS,
		template: `Dropdown::[caption]::[property]
- !clearable
- please: a placeholder text
- options:
  - Y: Yes
  - N: No
  - U: Unknown
`
	},
	{
		$wt: N2.N2WidgetType.MULTI_DROPDOWN, label: 'Dropdown allows multiple choices.',
		properties: [...DropdownProperties, ValueChanged, ValidationRequired, ValidationLength],
		icon: PlaygroundIcons.MULTI_DROPDOWN, group: PlaygroundWidgetGroupKey.OPTIONS, tooltip: 'Multiple choices',
		template: `MultiDropdown::[caption]::[property]
- !clearable
- please: a placeholder text
- options: 1: Pizza; 2: Hamburger; 3: Noodle
- sort: asc
`
	}
];
