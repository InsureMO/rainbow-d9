import {N2} from '@rainbow-d9/n3';
import {PlaygroundIcons} from '../icons';
import {PlaygroundWidget, PlaygroundWidgetGroupKey} from '../types';

export const SECTION: PlaygroundWidget = {
	$wt: N2.N2WidgetType.SECTION,
	icon: PlaygroundIcons.SECTION, group: PlaygroundWidgetGroupKey.CONTAINERS,
	properties: [
		{name: 'title', label: 'Text.'},
		{name: 'collapsible', label: 'Boolean.', description: 'Section could be folded.'},
		{name: 'marker', label: 'Text.', description: 'Global identify this section when global event fired.'}
	],
	template: `Section::[title]
- collapsible
- marker: global-unique-marker
`
};
