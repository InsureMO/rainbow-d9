import {N2} from '@rainbow-d9/n3';
import {PlaygroundIcons} from '../icons';
import {PlaygroundWidget, PlaygroundWidgetGroupKey} from '../types';
import {ValidationRequired, ValueChanged} from './attributes';
import {CheckboxesProperties} from './checkboxes';

export const RADIOS: Array<PlaygroundWidget> = [
	{
		$wt: N2.N2WidgetType.RADIO, label: 'Radio button.',
		properties: [
			{
				name: 'values', label: 'Text.',
				description: 'One or two values, connected by ",". First is true value, second is false value.'
			},
			ValueChanged,
			ValidationRequired
		],
		icon: PlaygroundIcons.RADIO, group: PlaygroundWidgetGroupKey.OPTIONS, tooltip: 'Radio button',
		template: `Radio::[caption]::[property]
- values: 1, 0
`
	},
	{
		$wt: N2.N2WidgetType.RADIOS, label: 'Radio button group.',
		properties: [
			...CheckboxesProperties.filter(({name}) => name !== 'single' && name !== 'boolOnSingle'),
			ValueChanged,
			ValidationRequired
		],
		icon: PlaygroundIcons.RADIOS, group: PlaygroundWidgetGroupKey.OPTIONS, tooltip: 'Radio button group',
		template: `Radios::[caption]::[property]
- options:
  - Y: Yes
  - N: No
  - U: Unknown
`
	}
];
