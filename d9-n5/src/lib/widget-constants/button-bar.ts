import {N2} from '@rainbow-d9/n3';
import {PlaygroundIcons} from '../icons';
import {PlaygroundWidget, PlaygroundWidgetGroupKey} from '../types';

export const BUTTON_BAR: PlaygroundWidget = {
	$wt: N2.N2WidgetType.BUTTON_BAR, label: 'Button bar.',
	properties: [{name: 'alignment', label: 'Text.', description: '"left", "center", "right".'}],
	icon: PlaygroundIcons.BUTTON_BAR, group: PlaygroundWidgetGroupKey.CONTAINERS, tooltip: 'Button bar',
	template: `ButtonBar::
- alignment: left
- Button::::
  - click:
    \`\`\`
    alert('Remove clicked');
    \`\`\`
  - leads: $icons.remove
  - disabled
- Button::::
  - click:
    \`\`\`
    alert('Check clicked');
    \`\`\`
  - fill: plain
  - leads: $icons.check
`
};
