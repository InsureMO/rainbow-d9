import {N2} from '@rainbow-d9/n3';
import {PlaygroundIcons} from '../icons';
import {PlaygroundWidget, PlaygroundWidgetGroupKey, PlaygroundWidgetProperty} from '../types';
import {Click, Fill, Ink, LeadsDecorateElements, TailsDecorateElements} from './attributes';

export const ButtonProperties: Array<PlaygroundWidgetProperty> = [
	Ink, Fill, {name: 'text', label: 'Text.', description: 'Label.'}, Click
];

export const BUTTONS: Array<PlaygroundWidget> = [
	{
		$wt: N2.N2WidgetType.BUTTON, label: 'Button',
		properties: [...ButtonProperties, LeadsDecorateElements, TailsDecorateElements],
		icon: PlaygroundIcons.BUTTON, group: PlaygroundWidgetGroupKey.DISPLAY,
		template: `Button::[caption]
- ink: success
- fill: plain
- leads: $icons.x; $icons.y
- tails:
  - first tail
  - last tail
- click: validate me
- validateScopes: scope1, scope2
`
	},
	{
		$wt: N2.N2WidgetType.LINK, label: 'Link. Shortcut of "Button".', description: 'With link style.',
		properties: [
			...ButtonProperties.filter(({name}) => name !== 'fill'),
			LeadsDecorateElements, TailsDecorateElements
		],
		icon: PlaygroundIcons.LINK, group: PlaygroundWidgetGroupKey.DISPLAY,
		template: `Link::[caption]
- ink: warn
- leads: $icons.x; $icons.y
- tails:
  - first tail
  - last tail
- click: validate me
- validateScopes: scope1, scope2
`
	}
];