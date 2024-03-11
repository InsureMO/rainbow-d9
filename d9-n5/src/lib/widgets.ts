import {CssVars} from '@rainbow-d9/n2';
import {N2} from '@rainbow-d9/n3';
import {ATTRIBUTE_VALUE_EXT_SYMBOL, ATTRIBUTE_VALUE_ICON_SYMBOL} from './editor/enhance';
import {
	PlaygroundConstant,
	PlaygroundIcon,
	PlaygroundReference,
	PlaygroundWidget,
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
export const N2Widgets: Array<PlaygroundWidget> = [
	{$wt: N2.N2WidgetType.PAGE, description: 'Only one allowed, and always at the highest level.'},

	{
		$wt: N2.N2WidgetType.INPUT, label: 'Input box.', properties: [
			AutoSelect,
			{
				name: 'valueToNumber',
				label: 'Boolean. Treat as a number.',
				description: 'Default false. Attempt to synchronize with the data model as a number.'
			}
		]
	},
	{
		$wt: N2.N2WidgetType.NUMBER, properties: [AutoSelect]
	},
	{$wt: N2.N2WidgetType.DECORATE_INPUT, properties: [AutoSelect, LeadsDecorateElements, TailsDecorateElements]},
	{$wt: N2.N2WidgetType.DECORATE_NUMBER, properties: [AutoSelect, LeadsDecorateElements, TailsDecorateElements]},
	{$wt: N2.N2WidgetType.TEXTAREA, properties: [AutoSelect]},
	{$wt: N2.N2WidgetType.CHECKBOX},
	{$wt: N2.N2WidgetType.CHECKBOXES},
	{$wt: N2.N2WidgetType.CHECKS},
	{$wt: N2.N2WidgetType.RADIO},
	{$wt: N2.N2WidgetType.RADIOS},
	{$wt: N2.N2WidgetType.BUTTON, properties: [LeadsDecorateElements, TailsDecorateElements]},
	{$wt: N2.N2WidgetType.BUTTON_BAR},
	{$wt: N2.N2WidgetType.CAPTION, properties: [LeadsDecorateElements, TailsDecorateElements]},
	{$wt: N2.N2WidgetType.LABEL, properties: [LeadsDecorateElements, TailsDecorateElements]},
	{$wt: N2.N2WidgetType.BADGE},
	{$wt: N2.N2WidgetType.DROPDOWN},
	{$wt: N2.N2WidgetType.MULTI_DROPDOWN},
	{$wt: N2.N2WidgetType.CALENDAR},
	{$wt: N2.N2WidgetType.DATE},
	{$wt: N2.N2WidgetType.DATETIME},

	{$wt: N2.N2WidgetType.RIBS},
	{$wt: N2.N2WidgetType.READONLY_RIBS},

	{$wt: N2.N2WidgetType.TABLE_ROW_OPERATORS},
	{$wt: N2.N2WidgetType.TABLE},

	{$wt: N2.N2WidgetType.SECTION},
	{$wt: N2.N2WidgetType.BOX},
	{$wt: N2.N2WidgetType.TAB},
	{$wt: N2.N2WidgetType.TABS},
	{$wt: N2.N2WidgetType.WIZARD_SHARED},
	{$wt: N2.N2WidgetType.WIZARD_STEP},
	{$wt: N2.N2WidgetType.WIZARD},
	{$wt: N2.N2WidgetType.TREE},

	{$wt: N2.N2WidgetType.PAGINATION}
];

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