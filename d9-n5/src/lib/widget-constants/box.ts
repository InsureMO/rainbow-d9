import {N2} from '@rainbow-d9/n3';
import {PlaygroundIcons} from '../icons';
import {PlaygroundWidget, PlaygroundWidgetGroupKey} from '../types';

export const BOX: PlaygroundWidget = {
	$wt: N2.N2WidgetType.BOX, label: 'Box, for customized layout.',
	icon: PlaygroundIcons.BOX, group: PlaygroundWidgetGroupKey.CONTAINERS,
	template: `Box::[title]
`
};
