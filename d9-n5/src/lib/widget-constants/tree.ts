import {N2} from '@rainbow-d9/n3';
import {PlaygroundIcons} from '../icons';
import {PlaygroundWidget, PlaygroundWidgetGroupKey} from '../types';
import {ValidationLength, ValidationRequired, ValueChanged} from './attributes';
import {DropdownProperties} from './dropdown';

export const TREES: Array<PlaygroundWidget> = [
	{
		$wt: N2.N2WidgetType.TREE,
		properties: [
			{name: 'height', label: 'Number.', description: 'In pixels.'},
			{name: 'initExpandLevel', label: 'Number.', description: 'Default -1. Starts from 0.'},
			{name: 'showIndex', label: 'Boolean.', description: 'Default false. Show node index or not.'},
			{name: 'detective', label: 'Snippet.', description: 'Tree nodes builder.'}
		],
		icon: PlaygroundIcons.TREE, group: PlaygroundWidgetGroupKey.CONTAINERS,
		template: `Tree::::tree
- showIndex
- initExpandLevel: 0
- height: 400
`
	},
	{
		$wt: N2.N2WidgetType.DROPDOWN_TREE, label: 'Dropdown with tree.',
		properties: [
			{name: 'couldSelect', label: 'Snippet.', description: 'Check if the selected node can be used as a value.'},
			...DropdownProperties, ValueChanged, ValidationRequired
		],
		icon: PlaygroundIcons.DROPDOWN_TREE, group: PlaygroundWidgetGroupKey.OPTIONS,
		template: `DropdownTree::[caption]::[property]
- !clearable
- please: a placeholder text
- options: @ext.options
`
	},
	{
		$wt: N2.N2WidgetType.DDT, label: 'Dropdown with tree. Shortcut of "DropdownTree".',
		properties: [
			{name: 'couldSelect', label: 'Snippet.', description: 'Check if the selected node can be used as a value.'},
			...DropdownProperties, ValueChanged, ValidationRequired
		],
		icon: PlaygroundIcons.DROPDOWN_TREE, group: PlaygroundWidgetGroupKey.OPTIONS,
		template: `DDT::[caption]::[property]
- !clearable
- please: a placeholder text
- options: @ext.options
`, notInToolbar: true
	},
	{
		$wt: N2.N2WidgetType.MULTI_DROPDOWN_TREE, label: 'Dropdown allows multiple choices, with tree.',
		properties: [
			{name: 'couldSelect', label: 'Snippet.', description: 'Check if the selected node can be used as a value.'},
			...DropdownProperties, ValueChanged, ValidationRequired, ValidationLength
		],
		icon: PlaygroundIcons.DROPDOWN_TREE, group: PlaygroundWidgetGroupKey.OPTIONS,
		template: `MultiDropdownTree::[caption]::[property]
- !clearable
- please: a placeholder text
- options: @ext.options
`
	},
	{
		$wt: N2.N2WidgetType.MDDT, label: 'Dropdown allows multiple choices, with tree. Shortcut of "DropdownTree".',
		properties: [
			{name: 'couldSelect', label: 'Snippet.', description: 'Check if the selected node can be used as a value.'},
			...DropdownProperties, ValueChanged, ValidationRequired, ValidationLength
		],
		icon: PlaygroundIcons.DROPDOWN_TREE, group: PlaygroundWidgetGroupKey.OPTIONS,
		template: `MDDT::[caption]::[property]
- !clearable
- please: a placeholder text
- options: @ext.options
`, notInToolbar: true
	}
];

