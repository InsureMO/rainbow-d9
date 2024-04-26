import {N2} from '@rainbow-d9/n3';
import {PlaygroundIcons} from '../icons';
import {PlaygroundWidget, PlaygroundWidgetGroupKey} from '../types';

export const TABS: Array<PlaygroundWidget> = [
	{
		$wt: N2.N2WidgetType.TAB, description: 'Valid only within the confines of the "Tabs".',
		properties: [
			{name: 'title', label: 'Text, Various.'},
			{name: 'marker', label: 'Text.', description: 'Global identify this tab when global event fired.'},
			{name: 'badge', label: 'Badge.', description: 'Badge in tab title.'},
			{name: 'data', label: 'Snippet.', description: 'Asynchronously retrieve tab data.'}
		],
		$parent: N2.N2WidgetType.TABS,
		icon: '', group: PlaygroundWidgetGroupKey.NOT_CARE, notInToolbar: true
	},
	{
		$wt: N2.N2WidgetType.TABS,
		properties: [
			{name: 'initActive', label: 'Text, Number.', description: 'Initial active tab, marker or index.'}
		],
		icon: PlaygroundIcons.TABS, group: PlaygroundWidgetGroupKey.CONTAINERS,
		template: `Tabs::
- Tab::[caption]::[property1]
  - Input::[caption]::[property]
- Tab::::[property2]
  - title:
    - valueToLabel: \`'Tab2 title'\`
  - badge: Badge
    - property: count
    - labelOnValue
    - ink: info
  - Checkbox::[caption]::[property]
`
	}
];
