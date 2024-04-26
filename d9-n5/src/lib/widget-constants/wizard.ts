import {N2} from '@rainbow-d9/n3';
import {PlaygroundIcons} from '../icons';
import {PlaygroundWidget, PlaygroundWidgetGroupKey} from '../types';

export const WIZARD: Array<PlaygroundWidget> = [
	{
		$wt: N2.N2WidgetType.WIZARD_SHARED,
		label: 'Shared part for all wizard steps.', description: 'Valid only within the confines of the "Wizard".',
		properties: [
			{name: 'lead', label: 'Boolean.', description: 'Default false. Put share part on lead or tail.'}
		],
		$parent: N2.N2WidgetType.WIZARD,
		icon: '', group: PlaygroundWidgetGroupKey.NOT_CARE, notInToolbar: true
	},
	{
		$wt: N2.N2WidgetType.WIZARD_STEP,
		label: 'Wizard step.', description: 'Valid only within the confines of the "Wizard".',
		properties: [
			{name: 'title', label: 'Text, Various.'},
			{name: 'marker', label: 'Text.', description: 'Global identify this tab when global event fired.'},
			{name: 'data', label: 'Snippet.', description: 'Asynchronously retrieve tab data.'}
		],
		$parent: N2.N2WidgetType.WIZARD,
		icon: '', group: PlaygroundWidgetGroupKey.NOT_CARE, notInToolbar: true
	},
	{
		$wt: N2.N2WidgetType.WIZARD,
		properties: [
			{name: 'balloon', label: 'Boolean.', description: 'Default true. Steps in balloon style.'},
			{name: 'emphasisActive', label: 'Boolean.', description: 'Default true. Emphasis active step title.'},
			{name: 'freeWalk', label: 'Boolean.', description: 'Default false. Could free walk between steps.'},
			{
				name: 'omitWalker', label: 'Boolean.',
				description: 'Default false. Omit default previous and next button in step body.'
			},
			{name: 'reached', label: 'Text, Number.', description: 'Step reached, marker or index.'}
		],
		icon: PlaygroundIcons.WIZARD, group: PlaygroundWidgetGroupKey.CONTAINERS,
		template: `Wizard::::[property]
- balloon: false
- reached: 1
- WStep::[caption]::[property1]
  - Input::[caption]::[property]
- WStep::::[property2]
  - title:
    - valueToLabel: \`'Step #2'\`
  - Checkbox::[caption]::[property2]
- WStep::[caption]::[property3]
- WStep::[caption]::[property4]
`
	}
];
