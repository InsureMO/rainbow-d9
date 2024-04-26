import {Semantic} from '@rainbow-d9/n3';
import {PlaygroundIcons} from '../icons';
import {
	PlaygroundConstant,
	PlaygroundIcon,
	PlaygroundIconApplicableTo,
	PlaygroundIconsUsage,
	PlaygroundReference,
	PlaygroundWidget,
	PlaygroundWidgetGroup,
	PlaygroundWidgetGroupKey,
	PlaygroundWidgetProperty
} from '../types';
import {BOX} from './box';
import {BUTTONS} from './button';
import {BUTTON_BAR} from './button-bar';
import {CALENDARS} from './calendar';
import {CAPTIONS} from './caption';
import {CHECKBOXES} from './checkboxes';
import {DECORATE_INPUTS} from './decorate-inputs';
import {DROPDOWNS} from './dropdown';
import {EChartsWidgets} from './echarts';
import {INPUTS} from './inputs';
import {PAGE} from './page';
import {PAGINATION} from './pagination';
import {RADIOS} from './radios';
import {RIBS} from './ribs';
import {SECTION} from './section';
import {TABLE} from './table';
import {TABS} from './tabs';
import {TEXTAREA} from './textarea';
import {TREES} from './tree';
import {WIZARD} from './wizard';

export const N2Widgets: Array<PlaygroundWidget> = [
	PAGE, SECTION, BOX, BUTTON_BAR,

	...INPUTS, ...DECORATE_INPUTS, TEXTAREA,
	...CALENDARS, ...CHECKBOXES, ...RADIOS, ...DROPDOWNS,
	...CAPTIONS, ...BUTTONS,

	...TABLE, ...RIBS, ...TABS, ...WIZARD, ...TREES, PAGINATION
];

export const WIDGET_DECLARATION_SPLITTER = Semantic.AbstractSemanticNodeWidgetParser.WIDGET_TITLE_SPLITTER;
export const ATTRIBUTE_DECLARATION_SPLITTER = ':';
export const ATTRIBUTE_DECLARATION_JOINT = ',';
export const ATTRIBUTE_DECLARATION_EXCLAMATION_MARK = '!';
export const ATTRIBUTE_VALUE_CONST_START = '$';
export const ATTRIBUTE_VALUE_ICON_SYMBOL = '$icons';
export const ATTRIBUTE_VALUE_ICON_PREFIX = `${ATTRIBUTE_VALUE_ICON_SYMBOL}.`;
export const ATTRIBUTE_VALUE_REF_START = '@';
export const ATTRIBUTE_VALUE_EXT_SYMBOL = '@ext';
export const ATTRIBUTE_VALUE_EXT_PREFIX = `${ATTRIBUTE_VALUE_EXT_SYMBOL}.`;

export const N2WidgetGroups: Array<PlaygroundWidgetGroup> = [
	{icon: PlaygroundIcons.CONTAINER_GROUP, tooltip: 'Container', key: PlaygroundWidgetGroupKey.CONTAINERS},
	{icon: PlaygroundIcons.INPUT_GROUP, tooltip: 'Input', key: PlaygroundWidgetGroupKey.INPUTS},
	{icon: PlaygroundIcons.OPTIONS_GROUP, tooltip: 'Choices', key: PlaygroundWidgetGroupKey.OPTIONS},
	{icon: PlaygroundIcons.DISPLAY_GROUP, tooltip: 'Label & Chart', key: PlaygroundWidgetGroupKey.DISPLAY}
];

export const computeWidgetGroups = (groups: Array<PlaygroundWidgetGroup>, useN2: boolean) => {
	return [...(useN2 ? N2WidgetGroups : []), ...groups];
};

export const computeWidgets = (widgets: Array<PlaygroundWidget>, options: { useN2: boolean, useCharts: boolean }) => {
	return [
		...(options.useN2 ? N2Widgets : []),
		...(options.useCharts ? EChartsWidgets : []),
		...widgets
	];
};

export const N2Icons: Array<PlaygroundIcon> = [
	{$key: 'back'},
	{$key: 'date'},
	{$key: 'time'},
	{$key: 'check'},
	{$key: 'times'},
	{$key: 'remove'},
	{$key: 'expand'},
	{$key: 'collapse'},
	{$key: 'edit'},
	{$key: 'view'},
	{$key: 'forward'},
	{$key: 'backward'},
	{$key: 'caretLeft'},
	{$key: 'caretRight'},
	{$key: 'caretDown'},
	{$key: 'arrowDown'},
	{$key: 'angleLeft'},
	{$key: 'angleRight'},
	{$key: 'spinner'},
	{$key: 'cart'}
];

export const N2IconsApplicableTo: Array<PlaygroundIconApplicableTo> = [
	{$wt: 'Button', properties: ['leads', 'tails']},
	{$wt: 'Label', properties: ['leads', 'tails']},
	{$wt: 'Caption', properties: ['leads', 'tails']},
	{$wt: 'Badge', properties: ['leads', 'tails']},
	{$wt: 'DecoInput', properties: ['leads', 'tails']},
	{$wt: 'DecoNumber', properties: ['leads', 'tails']},
	{$wt: 'DecoPwd', properties: ['leads', 'tails']}
];

export const computeIcons = (icons: PlaygroundIconsUsage, useN2: boolean): PlaygroundIconsUsage => {
	return {
		icons: [...(useN2 ? N2Icons : []), ...icons.icons],
		applicableTo: [...(useN2 ? N2IconsApplicableTo : []), ...icons.applicableTo]
	};
};

export const computeConstants = (constants: Array<PlaygroundConstant>, useN2: boolean): Array<PlaygroundConstant> => {
	return [
		...(useN2 ? [{$prefix: ATTRIBUTE_VALUE_ICON_SYMBOL, label: 'Pre-built icon constant.'}] : []),
		...constants
	];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const computeReferences = (references: Array<PlaygroundReference>, _useN2: boolean): Array<PlaygroundReference> => {
	return [
		{$prefix: ATTRIBUTE_VALUE_EXT_SYMBOL, label: 'Reference to pre-built function.'},
		...references
	];
};

export const CommonWidgetAttributes: Array<PlaygroundWidgetProperty> = [
	{name: '$fc', label: 'Boolean.', description: 'Force wrap widget to form cell.'},
	{
		name: 'holdPositionWhenInvisible', label: 'Boolean.',
		description: 'Hold position when widget is invisible, works when form cell wrapped.'
	},
	{name: '$pp', label: 'Text.', description: 'Model property name.'},
	{name: 'property', label: 'Text.', description: 'Alias of "$pp".'},
	{name: '$pos', label: 'Text.', description: 'Position in grid.'},
	{name: 'place', label: 'Text.', description: 'Alias of "$pos".'},
	{name: 'pos', label: 'Text.', description: 'Alias of "$pos".'},
	{name: 'position', label: 'Text.', description: 'Alias of "$pos".'},
	{
		name: '$mpos', label: 'Text.',
		description: 'Position in grid, priority only takes effect in the mobile environment.'
	},
	{name: 'mpos', label: 'Text.', description: 'Alias of "$mpos".'},
	{name: 'renderOn', label: 'Text, Snippet.', description: 'Alias of "$renderOn".'},
	{
		name: '$renderOn', label: 'Text, Snippet.',
		description: 'Render on specific devices, could be one of "desktop", "mobile", "touchable" "tablet", or connected by "," or ";".'
	},
	{name: '$disabled', label: 'Boolean, Various.', description: 'Disablement.'},
	{name: 'disabled', label: 'Boolean, Various.', description: 'Alias of "$disabled".'},
	{name: '$visible', label: 'Boolean, Various.', description: 'Visibility.'},
	{name: 'visible', label: 'Boolean, Various.', description: 'Alias of "$visible".'},
	{name: '$valid', label: 'Various.', description: 'Validation rules.'},
	{name: 'validate', label: 'Various.', description: 'Alias of "$valid".'},
	{name: '$validationScopes', label: 'Text.', description: 'Multiple scopes connected by "," or ";".'},
	{name: 'validateScopes', label: 'Text.', description: 'Alias of "$validationScopes".'},
	{name: 'watch', label: 'Various.', description: 'Monitor other property changes.'},
	{name: 'repaint', label: 'Various.', description: 'Monitor other property changes, and repaint myself.'},
	{name: 'clearMe', label: 'Various.', description: 'Monitor other property changes, and clear my value.'},
	{name: 'label', label: 'Various.', description: 'Label for form cell.'},
	{
		name: 'style', label: 'Text.',
		description: 'CSS style, could be [[[name: value]; name: value]...] or a JSON string.'
	}
];

export const getCommonWidgetAttributes = (): Array<PlaygroundWidgetProperty> => {
	return CommonWidgetAttributes;
};

export * from './attributes';
export * from './box';
export * from './button';
export * from './button-bar';
export * from './calendar';
export * from './caption';
export * from './checkboxes';
export * from './decorate-inputs';
export * from './dropdown';
export * from './echarts';
export * from './inputs';
export * from './page';
export * from './pagination';
export * from './radios';
export * from './ribs';
export * from './section';
export * from './table';
export * from './tabs';
export * from './textarea';
export * from './tree';
export * from './wizard';
