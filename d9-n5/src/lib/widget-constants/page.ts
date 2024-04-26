import {N2} from '@rainbow-d9/n3';
import {PlaygroundWidget, PlaygroundWidgetGroupKey} from '../types';

export const PAGE: PlaygroundWidget = {
	$wt: N2.N2WidgetType.PAGE,
	description: 'Only one allowed, and always at the highest level.',
	icon: '', group: PlaygroundWidgetGroupKey.NOT_CARE, notInToolbar: true
};
