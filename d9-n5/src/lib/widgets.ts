import {CssVars} from '@rainbow-d9/n2';
import {N2} from '@rainbow-d9/n3';
import {ATTRIBUTE_VALUE_EXT_SYMBOL, ATTRIBUTE_VALUE_ICON_SYMBOL} from './editor/enhance';
import {PlaygroundIcons} from './icons';
import {
	PlaygroundConstant,
	PlaygroundIcon,
	PlaygroundReference,
	PlaygroundWidget,
	PlaygroundWidgetGroup,
	PlaygroundWidgetGroupKey,
	PlaygroundWidgetProperty
} from './types';

export const PlaygroundCssVars = {
	Z_INDEX: 9999999,
	TOOLBAR_BACKGROUND_COLOR: `var(--d9-playground-toolbar-background-color, ${CssVars.BACKGROUND_COLOR})`,
	TOOLBAR_BUTTON_SIZE: 'var(--d9-playground-toolbar-button-size, 30px)',
	TOOLBAR_BUTTON_ACTIVE_COLOR: `var(--d9-playground-toolbar-button-active-color, ${CssVars.PRIMARY_COLOR})`,
	TOOLBAR_BUTTON_HOVER_COLOR: `var(--d9-playground-toolbar-hover-color, ${CssVars.HOVER_COLOR})`,
	TOOLBAR_TOOLTIP_BACKGROUND_COLOR: `var(--d9-playground-toolbar-tooltip-background-color, ${CssVars.BACKGROUND_COLOR})`,
	TOOLBAR_TOOLTIP_SHADOW: `var(--d9-playground-toolbar-tooltip-shadow, ${CssVars.WAIVE_HOVER_SHADOW})`,
	SLIDER_BACKGROUND_COLOR: `var(--d9-playground-slider-background-color, ${CssVars.HOVER_COLOR})`,
	WIDGET_DECLARATION_INSTRUCTION_COLOR: 'var(--d9-playground-widget-declaration-instruction-color, rgb(134, 54, 153))',
	WIDGET_DECLARATION_SPLITTER_COLOR: 'var(--d9-playground-widget-declaration-splitter-color, rgb(85, 85, 85, 0.7))',
	WIDGET_DECLARATION_TYPE_COLOR: 'var(--d9-playground-widget-declaration-type-color, rgb(134, 54, 153))',
	WIDGET_DECLARATION_HEADLINE_COLOR: 'var(--d9-playground-widget-declaration-headline-color, rgb(55, 122, 41))',
	WIDGET_DECLARATION_PROPERTY_COLOR: 'var(--d9-playground-widget-declaration-property-color, rgb(70, 141, 142))',
	WIDGET_DECLARATION_ID_COLOR: 'var(--d9-playground-widget-declaration-id-color, rgb(70, 141, 142))',
	WIDGET_DECLARATION_FLAG_COLOR: 'var(--d9-playground-widget-declaration-flag-color, rgb(114, 113, 64))',
	WIDGET_DECLARATION_ATTR_NAME_COLOR: 'var(--d9-playground-widget-declaration-attr-name-color, rgb(79, 148, 149))',
	WIDGET_DECLARATION_ATTR_VALUE_ICON_COLOR: 'var(--d9-playground-widget-declaration-attr-name-color, rgb(55, 122, 41))',
	WIDGET_DECLARATION_ATTR_VALUE_STR_COLOR: 'var(--d9-playground-widget-declaration-attr-name-color, rgb(55, 122, 41))',
	WIDGET_DECLARATION_ATTR_VALUE_EXT_COLOR: 'var(--d9-playground-widget-declaration-attr-name-color, rgb(10, 56, 172))'
};

const AutoSelect: PlaygroundWidgetProperty = {
	name: 'autoSelect', label: 'Boolean. Select all content automatically.', description: 'Default true.'
};
const DecorateElements = (name: 'leads' | 'tails'): PlaygroundWidgetProperty => {
	return {
		name, label: 'Decorations.',
		description: 'A string or a predefined icon. Icons need to start with “$icons.” Multiple decorations can be connected with “;”.'
	};
};
const LeadsDecorateElements = DecorateElements('leads');
const TailsDecorateElements = DecorateElements('tails');

export const N2WidgetGroups: Array<PlaygroundWidgetGroup> = [
	{icon: PlaygroundIcons.CONTAINER_GROUP, tooltip: 'Container', key: PlaygroundWidgetGroupKey.CONTAINERS},
	{icon: PlaygroundIcons.INPUT_GROUP, tooltip: 'Input', key: PlaygroundWidgetGroupKey.INPUTS},
	{icon: PlaygroundIcons.OPTIONS_GROUP, tooltip: 'Choices', key: PlaygroundWidgetGroupKey.OPTIONS},
	{icon: PlaygroundIcons.DISPLAY_GROUP, tooltip: 'Label & Chart', key: PlaygroundWidgetGroupKey.DISPLAY}
];
// 	[PlaygroundWidgetGroup.INPUTS];
// :
// [
// 	{key: 'Link', icon: PlaygroundIcons.LINK, tooltip: 'Hyperlink'},
// 	{key: 'Password', icon: PlaygroundIcons.PASSWORD, tooltip: 'Password'},
// ],
export const N2Widgets: Array<PlaygroundWidget> = [
	{
		$wt: N2.N2WidgetType.PAGE, description: 'Only one allowed, and always at the highest level.',
		icon: '', group: PlaygroundWidgetGroupKey.NOT_CARE, notInToolbar: true
	},

	// inputs
	{
		$wt: N2.N2WidgetType.INPUT, label: 'Input box.', properties: [
			AutoSelect,
			{
				name: 'valueToNumber',
				label: 'Boolean. Treat as a number.',
				description: 'Default false. Attempt to synchronize with the data model as a number.'
			}
		], icon: PlaygroundIcons.INPUT, group: PlaygroundWidgetGroupKey.INPUTS
	},
	{
		$wt: N2.N2WidgetType.NUMBER, properties: [AutoSelect],
		icon: PlaygroundIcons.NUMBER_INPUT, group: PlaygroundWidgetGroupKey.INPUTS, tooltip: 'Number input'
	},
	{
		$wt: N2.N2WidgetType.PASSWORD, properties: [AutoSelect],
		icon: PlaygroundIcons.PASSWORD, group: PlaygroundWidgetGroupKey.INPUTS, tooltip: 'Password input'
	},
	{
		$wt: N2.N2WidgetType.DECORATE_INPUT, properties: [AutoSelect, LeadsDecorateElements, TailsDecorateElements],
		icon: PlaygroundIcons.DECO_INPUT, group: PlaygroundWidgetGroupKey.INPUTS, tooltip: 'Decorable input'
	},
	{
		$wt: N2.N2WidgetType.DECORATE_NUMBER, properties: [AutoSelect, LeadsDecorateElements, TailsDecorateElements],
		icon: PlaygroundIcons.DECO_NUMBER, group: PlaygroundWidgetGroupKey.INPUTS, tooltip: 'Decorable number input'
	},
	{
		$wt: N2.N2WidgetType.DECORATE_PASSWORD, properties: [AutoSelect, LeadsDecorateElements, TailsDecorateElements],
		icon: PlaygroundIcons.DECO_PASSWORD, group: PlaygroundWidgetGroupKey.INPUTS, tooltip: 'Decorable password input'
	},
	{
		$wt: N2.N2WidgetType.TEXTAREA, properties: [AutoSelect],
		icon: PlaygroundIcons.TEXTAREA, group: PlaygroundWidgetGroupKey.INPUTS
	},
	{
		$wt: N2.N2WidgetType.CALENDAR,
		icon: PlaygroundIcons.DATE, group: PlaygroundWidgetGroupKey.INPUTS, tooltip: 'Date picker',
		notInToolbar: true
	},
	{
		$wt: N2.N2WidgetType.DATE,
		icon: PlaygroundIcons.DATE, group: PlaygroundWidgetGroupKey.INPUTS, tooltip: 'Date picker'
	},
	{
		$wt: N2.N2WidgetType.DATETIME,
		icon: PlaygroundIcons.DATETIME, group: PlaygroundWidgetGroupKey.INPUTS, tooltip: 'Datetime picker'
	},

	// options
	{
		$wt: N2.N2WidgetType.CHECKBOX,
		icon: PlaygroundIcons.CHECKBOX, group: PlaygroundWidgetGroupKey.OPTIONS
	},
	{
		$wt: N2.N2WidgetType.CHECKBOXES,
		icon: PlaygroundIcons.CHECKS, group: PlaygroundWidgetGroupKey.OPTIONS, tooltip: 'Checkbox group',
		notInToolbar: true
	},
	{
		$wt: N2.N2WidgetType.CHECKS,
		icon: PlaygroundIcons.CHECKS, group: PlaygroundWidgetGroupKey.OPTIONS, tooltip: 'Checkbox group'
	},
	{
		$wt: N2.N2WidgetType.RADIO,
		icon: PlaygroundIcons.RADIO, group: PlaygroundWidgetGroupKey.OPTIONS, tooltip: 'Radio button'
	},
	{
		$wt: N2.N2WidgetType.RADIOS,
		icon: PlaygroundIcons.RADIOS, group: PlaygroundWidgetGroupKey.OPTIONS, tooltip: 'Radio button group'
	},
	{
		$wt: N2.N2WidgetType.DROPDOWN,
		icon: PlaygroundIcons.DROPDOWN, group: PlaygroundWidgetGroupKey.OPTIONS
	},
	{
		$wt: N2.N2WidgetType.MULTI_DROPDOWN,
		icon: PlaygroundIcons.MULTI_DROPDOWN, group: PlaygroundWidgetGroupKey.OPTIONS, tooltip: 'Multiple choices'
	},

	// display
	{
		$wt: N2.N2WidgetType.CAPTION, properties: [LeadsDecorateElements, TailsDecorateElements],
		icon: PlaygroundIcons.CAPTION, group: PlaygroundWidgetGroupKey.DISPLAY
	},
	{
		$wt: N2.N2WidgetType.LABEL, properties: [LeadsDecorateElements, TailsDecorateElements],
		icon: PlaygroundIcons.LABEL, group: PlaygroundWidgetGroupKey.DISPLAY
	},
	{
		$wt: N2.N2WidgetType.BUTTON, properties: [LeadsDecorateElements, TailsDecorateElements],
		icon: PlaygroundIcons.BUTTON, group: PlaygroundWidgetGroupKey.DISPLAY
	},
	{
		$wt: N2.N2WidgetType.LINK, properties: [LeadsDecorateElements, TailsDecorateElements],
		icon: PlaygroundIcons.LINK, group: PlaygroundWidgetGroupKey.DISPLAY
	},
	// TODO CHART

	// containers
	{
		$wt: N2.N2WidgetType.SECTION,
		icon: PlaygroundIcons.SECTION, group: PlaygroundWidgetGroupKey.CONTAINERS
	},
	{
		$wt: N2.N2WidgetType.BOX,
		icon: PlaygroundIcons.BOX, group: PlaygroundWidgetGroupKey.CONTAINERS
	},
	{
		$wt: N2.N2WidgetType.TABLE_ROW_OPERATORS,
		icon: '', group: PlaygroundWidgetGroupKey.NOT_CARE, notInToolbar: true
	},
	{
		$wt: N2.N2WidgetType.TABLE,
		icon: PlaygroundIcons.TABLE, group: PlaygroundWidgetGroupKey.CONTAINERS
	},
	{
		$wt: N2.N2WidgetType.RIBS,
		icon: PlaygroundIcons.RIBS, group: PlaygroundWidgetGroupKey.CONTAINERS
	},
	{
		$wt: N2.N2WidgetType.READONLY_RIBS,
		icon: '', group: PlaygroundWidgetGroupKey.NOT_CARE, notInToolbar: true
	},
	{
		$wt: N2.N2WidgetType.BUTTON_BAR,
		icon: PlaygroundIcons.BUTTON_BAR, group: PlaygroundWidgetGroupKey.CONTAINERS, tooltip: 'Button bar'
	},
	{
		$wt: N2.N2WidgetType.BADGE,
		icon: '', group: PlaygroundWidgetGroupKey.NOT_CARE, notInToolbar: true
	},
	{
		$wt: N2.N2WidgetType.TAB,
		icon: '', group: PlaygroundWidgetGroupKey.NOT_CARE, notInToolbar: true
	},
	{
		$wt: N2.N2WidgetType.TABS,
		icon: PlaygroundIcons.TABS, group: PlaygroundWidgetGroupKey.CONTAINERS
	},
	{
		$wt: N2.N2WidgetType.WIZARD_SHARED,
		icon: '', group: PlaygroundWidgetGroupKey.NOT_CARE, notInToolbar: true
	},
	{
		$wt: N2.N2WidgetType.WIZARD_STEP,
		icon: '', group: PlaygroundWidgetGroupKey.NOT_CARE, notInToolbar: true
	},
	{
		$wt: N2.N2WidgetType.WIZARD,
		icon: PlaygroundIcons.WIZARD, group: PlaygroundWidgetGroupKey.CONTAINERS
	},
	{
		$wt: N2.N2WidgetType.TREE,
		icon: PlaygroundIcons.TREE, group: PlaygroundWidgetGroupKey.CONTAINERS
	},

	{
		$wt: N2.N2WidgetType.PAGINATION,
		icon: '', group: PlaygroundWidgetGroupKey.NOT_CARE, notInToolbar: true
	}
];

export const computeWidgetGroups = (groups: Array<PlaygroundWidgetGroup>, useN2: boolean) => {
	return [
		...(useN2 ? N2WidgetGroups : []), ...groups
	];
};
export const computeWidgets = (widgets: Array<PlaygroundWidget>, useN2: boolean) => {
	return [...(useN2 ? N2Widgets : []), ...widgets];
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

export const computeIcons = (icons: Array<PlaygroundIcon>, useN2: boolean) => {
	return [...(useN2 ? N2Icons : []), ...icons];
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
	{name: '$fc', label: 'Force wrap widget to form cell.'},
	{name: 'holdPositionWhenInvisible', label: 'Hold position when widget is invisible, works when form cell wrapped.'},
	{name: '$pp', label: 'Model property name.'},
	{name: 'property', label: 'Alias of "$pp".'},
	{name: '$pos', label: 'Position in grid.'},
	{name: 'place', label: 'Alias of "$pos".'},
	{name: 'pos', label: 'Alias of "$pos".'},
	{name: 'position', label: 'Alias of "$pos".'},
	{name: '$mpos', label: 'Position in grid, priority only takes effect in the mobile environment.'},
	{name: '$mpos', label: 'Alias of "$mpos".'},
	{name: '$disabled', label: 'Disablement.'},
	{name: 'disabled', label: 'Alias of "$disabled".'},
	{name: '$visible', label: 'Visibility.'},
	{name: 'visible', label: 'Alias of "$visible".'},
	{name: '$valid', label: 'Validation rules.'},
	{name: 'validate', label: 'Alias of "$valid".'},
	{name: '$validationScopes'},
	{name: 'validateScopes', label: 'Alias of "$validationScopes".'},
	{name: 'watch', label: 'Monitor other property changes.'},
	{name: 'repaint', label: 'Monitor other property changes, and repaint myself.'},
	{name: 'clearMe', label: 'Monitor other property changes, and clear my value.'}
];

export const getCommonWidgetAttributes = (): Array<PlaygroundWidgetProperty> => {
	return CommonWidgetAttributes;
};