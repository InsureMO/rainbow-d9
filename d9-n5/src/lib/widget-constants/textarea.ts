import {N2} from '@rainbow-d9/n3';
import {PlaygroundIcons} from '../icons';
import {PlaygroundWidget, PlaygroundWidgetGroupKey} from '../types';
import {AutoSelect, InputPlaceholder, ValidationLength, ValidationRequired, ValueChanged} from './attributes';

export const TEXTAREA: PlaygroundWidget = {
	$wt: N2.N2WidgetType.TEXTAREA, properties: [
		AutoSelect, InputPlaceholder, ValueChanged,
		ValidationRequired, ValidationLength
	],
	icon: PlaygroundIcons.TEXTAREA, group: PlaygroundWidgetGroupKey.INPUTS,
	template: `Textarea::[caption]::[property]
- placeholder: a placeholder text
- length: 10..; Minimum length is 10.
`
};
