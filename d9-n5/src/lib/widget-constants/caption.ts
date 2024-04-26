import {N2} from '@rainbow-d9/n3';
import {PlaygroundIcons} from '../icons';
import {PlaygroundWidget, PlaygroundWidgetGroupKey, PlaygroundWidgetProperty} from '../types';
import {Click, Fill, Ink, LeadsDecorateElements, TailsDecorateElements} from './attributes';

export const CaptionProperties: Array<PlaygroundWidgetProperty> = [
	{name: 'labelOnValue', label: 'Boolean.', description: 'Default false. Content read from model or not.'},
	{name: 'label', label: 'Text.', description: 'Static content, ignored when "text" declared.'},
	{name: 'text', label: 'Text.', description: 'Static content, works on "labelOnValue" is false.'},
	{name: 'valueToLabel', label: 'Snippet.', description: 'Snippet to compute display label.'},
	Click
];

export const CAPTIONS: Array<PlaygroundWidget> = [
	{
		$wt: N2.N2WidgetType.CAPTION, label: 'Caption.',
		properties: [...CaptionProperties, LeadsDecorateElements, TailsDecorateElements],
		icon: PlaygroundIcons.CAPTION, group: PlaygroundWidgetGroupKey.DISPLAY,
		template: `Caption::[caption]
- text: Hello world
- leads: $icons.x; $icons.y
- tails:
  - first tail
  - last tail
`
	},
	{
		$wt: N2.N2WidgetType.LABEL,
		label: 'Label. Shortcut of "Caption".', description: 'Read text from model.',
		properties: [
			...CaptionProperties.filter(({name}) => name !== 'labelOnValue'),
			LeadsDecorateElements, TailsDecorateElements
		],
		icon: PlaygroundIcons.LABEL, group: PlaygroundWidgetGroupKey.DISPLAY,
		template: `Label::[caption]::[property]
- valueToLabel: \`value ?? 'An empty value.'\`
- leads: $icons.x; $icons.y
- tails:
  - first tail
  - last tail
`
	},
	{
		$wt: N2.N2WidgetType.BADGE, label: 'Badge. Shortcut of "Caption".', description: 'With ink and fill mode.',
		properties: [...CaptionProperties, Ink, Fill, LeadsDecorateElements, TailsDecorateElements],
		icon: '', group: PlaygroundWidgetGroupKey.NOT_CARE, notInToolbar: true
	}
];
