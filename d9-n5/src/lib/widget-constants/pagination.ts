import {N2} from '@rainbow-d9/n3';
import {PlaygroundWidget, PlaygroundWidgetGroupKey} from '../types';
import {ValueChanged} from './attributes';

export const PAGINATION: PlaygroundWidget = {
	$wt: N2.N2WidgetType.PAGINATION,
	properties: [
		{name: 'freeWalk', label: 'Boolean.', description: 'Default false. Show page free walker dropdown.'},
		{name: 'maxButtons', label: 'Number.', description: 'Default 7. Maximum page buttons.'},
		{name: 'possibleSizes', label: 'Text.', description: 'Possible page size. Show page size dropdown.'},
		ValueChanged
	],
	icon: '', group: PlaygroundWidgetGroupKey.NOT_CARE, notInToolbar: true
};
