import {N2} from '@rainbow-d9/n3';
import {PlaygroundIcons} from '../icons';
import {PlaygroundWidget, PlaygroundWidgetGroupKey, PlaygroundWidgetProperty} from '../types';
import {ArrayProperties, NoElementReminder} from './attributes';

export const RibsProperties: Array<PlaygroundWidgetProperty> = [
	{name: 'caption', label: 'Text, Various.', description: 'Caption for each item.'},
	{
		name: 'useSectionStyleIcons', label: 'Boolean.',
		description: 'Use section style icons for expanding and collapsing.'
	},
	{name: 'showRowIndex', label: 'Boolean.', description: 'Show row index or not.'},
	{name: 'initExpanded', label: 'Snippet.', description: 'Check row is expanded or not on initializing.'}
];

export const RIBS: Array<PlaygroundWidget> = [
	{
		$wt: N2.N2WidgetType.RIBS,
		properties: [...RibsProperties, ...ArrayProperties],
		icon: PlaygroundIcons.RIBS, group: PlaygroundWidgetGroupKey.CONTAINERS,
		template: `Ribs::
- removable, addable, disableOnCannotAdd
- elementTitle:
  - labelOnValue
  - property: titleProperty
- Input::Property A::propA
- Input::Property B::propB
`
	},
	{
		$wt: N2.N2WidgetType.READONLY_RIBS, label: 'Readonly Ribs.',
		properties: [...RibsProperties, NoElementReminder],
		icon: '', group: PlaygroundWidgetGroupKey.NOT_CARE, notInToolbar: true
	}
];
