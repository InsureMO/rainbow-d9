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
const InputPlaceholder: PlaygroundWidgetProperty = {name: 'placeholder', label: 'Text. Placeholder when no content.'};
const DecorateElements = (name: 'leads' | 'tails'): PlaygroundWidgetProperty => {
	return {
		name, label: 'Decorations.',
		description: 'A string or a predefined icon. Icons need to start with “$icons.” Multiple decorations can be connected with “;”.'
	};
};
const LeadsDecorateElements = DecorateElements('leads');
const TailsDecorateElements = DecorateElements('tails');
const Please: PlaygroundWidgetProperty = {name: 'please', label: 'Text. Placeholder.'};
const Clearable: PlaygroundWidgetProperty = {name: 'clearable', label: 'Boolean.', description: 'Default true.'};
const CalendarProperties: Array<PlaygroundWidgetProperty> = [
	Please, Clearable,
	{name: 'dateFormat', label: 'Text.', description: 'Default value depends on system settings.'},
	{name: 'time', label: 'Boolean. Allow time part or not.', description: 'Default false.'},
	{
		name: 'timeFormat',
		label: 'Text.',
		description: 'Default value depends on system settings, works only when "time" is true.'
	},
	{name: 'storeFormat', label: 'Text.', description: 'Default value depends on system settings.'},
	{
		name: 'fixedTimeAt', label: 'Text.',
		description: 'Default value depends on system settings, works only when "time" is false. "start", "0", "end", "HH:mm:ss", "HH:mm:ss.SSS".'
	},
	{
		name: 'initTimeAt', label: 'Text.',
		description: '"start", "0", "end", "HH:mm:ss", "HH:mm:ss.SSS".'
	},
	{name: 'autoConfirm', label: 'Boolean.', description: 'Confirm selection when blurred.'},
	{name: 'useCalendarIcon', label: 'Boolean.', description: 'Use calendar icon instead of caret.'}
];
const OptionItemsProperties: Array<PlaygroundWidgetProperty> = [
	{name: 'options', label: 'Text, Various.'},
	{name: 'optionSort', label: 'Text.', description: '"asc", "desc".'},
	{name: 'sort', label: 'Text. Shortcut of "optionSort".', description: '"asc", "desc".'},
	{name: 'noAvailable', label: 'Text.', description: 'Reminder text when no available option item.'},
	{name: 'noMatched', label: 'Text.', description: 'Reminder text when no matched option item.'}
];
const CheckboxesProperties: Array<PlaygroundWidgetProperty> = [
	...OptionItemsProperties.filter(({name}) => name !== 'noMatched'),
	{name: 'columns', label: 'Number.', description: 'Display columns when not on compact mode.'},
	{name: 'compact', label: 'Boolean.', description: 'Default true. Try to fit as many as possible onto one line.'},
	{
		name: 'single', label: 'Boolean.',
		description: 'Default false. Use primitive value of model instead of an array.'
	},
	{name: 'boolOnSingle', label: 'Boolean.', description: 'Default false. Use false when no option checked.'}
];
const DropdownProperties: Array<PlaygroundWidgetProperty> = [
	...OptionItemsProperties,
	Please, Clearable,
	{name: 'maxWidth', label: 'Number.', description: 'Max popup width, in pixels.'}
];
const Click: PlaygroundWidgetProperty = {name: 'click', label: 'Snippet.', description: 'Handle click event.'};
const CaptionProperties: Array<PlaygroundWidgetProperty> = [
	{name: 'labelOnValue', label: 'Boolean.', description: 'Default false. Content read from model or not.'},
	{name: 'label', label: 'Text.', description: 'Static content, ignored when "text" declared.'},
	{name: 'text', label: 'Text.', description: 'Static content, works on "labelOnValue" is false.'},
	{name: 'valueToLabel', label: 'Snippet.', description: 'Snippet to compute display label.'},
	Click
];
const Ink: PlaygroundWidgetProperty = {
	name: 'ink', label: 'Text.',
	description: 'Ink mode. "primary", "success", "warn", "info", "danger", "waive".'
};
const Fill: PlaygroundWidgetProperty = {
	name: 'fill', label: 'Text.', description: 'Fill mode. "link", "plain", "fill".'
};
const ButtonProperties: Array<PlaygroundWidgetProperty> = [
	Ink, Fill, {name: 'text', label: 'Text.', description: 'Label.'}, Click
];
const NoElementReminder: PlaygroundWidgetProperty = {
	name: 'noElementReminder', label: 'Text.', description: 'No item reminder text.'
};
const ArrayProperties: Array<PlaygroundWidgetProperty> = [
	NoElementReminder,
	{name: 'addable', label: 'Boolean.', description: 'Default false. Could add item or not.'},
	{name: 'addLabel', label: 'Text.', description: 'Default add button label.'},
	{
		name: 'couldAddElement', label: 'Snippet.',
		description: 'Check could add new item or not, runtime check before apply adding.'
	},
	{
		name: 'disableOnCannotAdd', label: 'Boolean.',
		description: 'Default false. Disable add button when adding new item is not allowed.'
	},
	{name: 'createElement', label: 'Snippet.', description: 'Default use empty object as new item.'},
	{name: 'elementAdded', label: 'Snippet.', description: 'Handle item added event.'},
	{name: 'removable', label: 'Boolean.', description: 'Default false. Could remove item or not.'},
	// {name: 'removeLabel', label: 'Text.', description: 'Default remove button label.'},
	{
		name: 'couldRemoveElement', label: 'Snippet.',
		description: 'Check could remove item or not, runtime check before apply removing.'
	},
	{name: 'elementRemoved', label: 'Snippet.', description: 'Handle item removed event.'}
];
const TableProperties: Array<PlaygroundWidgetProperty> = [
	{
		name: 'headers', label: 'Various.', description: 'Column headers.'
	},
	{name: 'headerHeight', label: 'Number.', description: 'In pixels.'},
	{name: 'expandable', label: 'Boolean.', description: 'Default false. Row expandable.'},
	{name: 'fixedLeadColumns', label: 'Number.', description: 'How many lead columns are fixed.'},
	{name: 'fixedTailColumns', label: 'Number.', description: 'How many tail columns are fixed.'},
	{name: 'hideClassicCellsOnExpandable', label: 'Boolean.', description: 'Default false.'},
	{name: 'clickToExpand', label: 'Boolean.', description: 'Default false.'},
	{name: 'maxBodyHeight', label: 'Number.', description: 'Maximum body height, in pixels.'},
	{name: 'operatorsColumnWidth', label: 'Number.', description: 'Operators column width.'},
	{name: 'rowIndexStartsFrom', label: 'Number.', description: 'Default 1.'},
	{
		name: 'omitDefaultRowOperators',
		label: 'Boolean, Text.',
		description: 'True to omit the remove, expand, collapse row operators. Or "remove" to omit remove only, "fold" to omit expand and collapse.'
	}
];
const RibsProperties: Array<PlaygroundWidgetProperty> = [
	{name: 'caption', label: 'Text, Various.', description: 'Caption for each item.'}
];

const ValidationRequired: PlaygroundWidgetProperty = {
	name: 'required', label: 'Boolean, Various.', description: 'Required check. Customize message after ";".'
};
const ValidationLength: PlaygroundWidgetProperty = {
	name: 'length',
	label: 'Number, Various.',
	description: 'Length check. Multiple rules connected by ",". Rule also can be "..x", "x..", "x..y". Customize message after ";".'
};
const ValidationNumeric: PlaygroundWidgetProperty = {
	name: 'numeric', label: 'Boolean, Various.', description: 'Number check. Customize message after ";".'
};
const ValidationPositive: PlaygroundWidgetProperty = {
	name: 'positive', label: 'Boolean, Various.', description: 'Positive number check. Customize message after ";".'
};
const ValidationNotNegative: PlaygroundWidgetProperty = {
	name: 'notNegative', label: 'Boolean, Various.',
	description: 'Not negative number check. Customize message after ";".'
};
const ValidationInteger: PlaygroundWidgetProperty = {
	name: 'integer', label: 'Boolean, Various.', description: 'Integer check. Customize message after ";".'
};
const ValidationNumberRange: PlaygroundWidgetProperty = {
	name: 'numberRange', label: 'Various.',
	description: 'Number range check. Multiple rules connected by ",". Rule also can be "[..x]", "(x..)", "(x..y]". Customize message after ";".'
};
const ValidationRegex: PlaygroundWidgetProperty = {
	name: 'regex', label: 'Boolean, Various.',
	description: 'Regex check. Regex could be predefined. Customize message after ";".'
};
const ValidationRegexp: PlaygroundWidgetProperty = {
	name: 'regexp', label: 'Boolean, Various.', description: 'Same as "regex".'
};

export const N2WidgetGroups: Array<PlaygroundWidgetGroup> = [
	{icon: PlaygroundIcons.CONTAINER_GROUP, tooltip: 'Container', key: PlaygroundWidgetGroupKey.CONTAINERS},
	{icon: PlaygroundIcons.INPUT_GROUP, tooltip: 'Input', key: PlaygroundWidgetGroupKey.INPUTS},
	{icon: PlaygroundIcons.OPTIONS_GROUP, tooltip: 'Choices', key: PlaygroundWidgetGroupKey.OPTIONS},
	{icon: PlaygroundIcons.DISPLAY_GROUP, tooltip: 'Label & Chart', key: PlaygroundWidgetGroupKey.DISPLAY}
];

export const N2Widgets: Array<PlaygroundWidget> = [
	{
		$wt: N2.N2WidgetType.PAGE, description: 'Only one allowed, and always at the highest level.',
		icon: '', group: PlaygroundWidgetGroupKey.NOT_CARE, notInToolbar: true
	},

	// inputs
	{
		$wt: N2.N2WidgetType.INPUT, label: 'Input box.',
		properties: [
			AutoSelect, InputPlaceholder,
			{
				name: 'valueToNumber', label: 'Boolean. Treat as a number.',
				description: 'Default false. Attempt to synchronize with the data model as a number.'
			},
			ValidationRequired, ValidationRegex, ValidationRegexp, ValidationLength,
			ValidationNumeric, ValidationPositive, ValidationNotNegative, ValidationInteger, ValidationNumberRange
		],
		icon: PlaygroundIcons.INPUT, group: PlaygroundWidgetGroupKey.INPUTS
	},
	{
		$wt: N2.N2WidgetType.NUMBER, label: 'Number input box.',
		properties: [
			AutoSelect, InputPlaceholder,
			ValidationRequired, ValidationRegex, ValidationRegexp, ValidationLength,
			ValidationNumeric, ValidationPositive, ValidationNotNegative, ValidationInteger, ValidationNumberRange
		],
		icon: PlaygroundIcons.NUMBER_INPUT, group: PlaygroundWidgetGroupKey.INPUTS, tooltip: 'Number input'
	},
	{
		$wt: N2.N2WidgetType.PASSWORD, label: 'Password input box.',
		properties: [
			AutoSelect, InputPlaceholder,
			ValidationRequired, ValidationRegex, ValidationRegexp, ValidationLength
		],
		icon: PlaygroundIcons.PASSWORD, group: PlaygroundWidgetGroupKey.INPUTS, tooltip: 'Password input'
	},
	{
		$wt: N2.N2WidgetType.DECORATE_INPUT, label: 'Decorable input box.',
		properties: [
			AutoSelect, InputPlaceholder,
			LeadsDecorateElements, TailsDecorateElements,
			ValidationRequired, ValidationRegex, ValidationRegexp, ValidationLength,
			ValidationNumeric, ValidationPositive, ValidationNotNegative, ValidationInteger, ValidationNumberRange
		],
		icon: PlaygroundIcons.DECO_INPUT, group: PlaygroundWidgetGroupKey.INPUTS, tooltip: 'Decorable input'
	},
	{
		$wt: N2.N2WidgetType.DECORATE_NUMBER, label: 'Decorable number input box.',
		properties: [
			AutoSelect, InputPlaceholder,
			LeadsDecorateElements, TailsDecorateElements,
			ValidationRequired, ValidationRegex, ValidationRegexp, ValidationLength,
			ValidationNumeric, ValidationPositive, ValidationNotNegative, ValidationInteger, ValidationNumberRange
		],
		icon: PlaygroundIcons.DECO_NUMBER, group: PlaygroundWidgetGroupKey.INPUTS, tooltip: 'Decorable number input'
	},
	{
		$wt: N2.N2WidgetType.DECORATE_PASSWORD, label: 'Decorable password input box.',
		properties: [
			AutoSelect, InputPlaceholder,
			LeadsDecorateElements, TailsDecorateElements,
			ValidationRequired, ValidationRegex, ValidationRegexp, ValidationLength
		],
		icon: PlaygroundIcons.DECO_PASSWORD, group: PlaygroundWidgetGroupKey.INPUTS, tooltip: 'Decorable password input'
	},
	{
		$wt: N2.N2WidgetType.TEXTAREA, properties: [
			AutoSelect, InputPlaceholder,
			ValidationRequired, ValidationLength
		],
		icon: PlaygroundIcons.TEXTAREA, group: PlaygroundWidgetGroupKey.INPUTS
	},
	{
		$wt: N2.N2WidgetType.CALENDAR, label: 'Date picker.',
		properties: [...CalendarProperties, ValidationRequired],
		icon: PlaygroundIcons.DATE, group: PlaygroundWidgetGroupKey.INPUTS, tooltip: 'Date picker',
		notInToolbar: true
	},
	{
		$wt: N2.N2WidgetType.DATE, label: 'Date picker. Shortcut of "Calendar"',
		properties: [
			...CalendarProperties.filter(({name}) => name !== 'time' && name !== 'timeFormat'),
			ValidationRequired
		],
		icon: PlaygroundIcons.DATE, group: PlaygroundWidgetGroupKey.INPUTS, tooltip: 'Date picker'
	},
	{
		$wt: N2.N2WidgetType.DATETIME, label: 'Datetime picker.',
		properties: [
			...CalendarProperties.filter(({name}) => name !== 'time' && name !== 'fixedTimeAt'),
			ValidationRequired
		],
		icon: PlaygroundIcons.DATETIME, group: PlaygroundWidgetGroupKey.INPUTS, tooltip: 'Datetime picker'
	},

	// options
	{
		$wt: N2.N2WidgetType.CHECKBOX,
		properties: [
			{
				name: 'values', label: 'Text.',
				description: 'One or two values, connected by ",". First is true value, second is false value.'
			},
			{
				name: 'emptyWhenFalse', label: 'Boolean.',
				description: 'Default false. Use times icon when it is false.'
			},
			ValidationRequired
		],
		icon: PlaygroundIcons.CHECKBOX, group: PlaygroundWidgetGroupKey.OPTIONS
	},
	{
		$wt: N2.N2WidgetType.CHECKBOXES, label: 'Checkbox group.',
		properties: [...CheckboxesProperties, ValidationRequired],
		icon: PlaygroundIcons.CHECKS, group: PlaygroundWidgetGroupKey.OPTIONS, tooltip: 'Checkbox group',
		notInToolbar: true
	},
	{
		$wt: N2.N2WidgetType.CHECKS, label: 'Checkbox group. Shortcut of "Checkboxes".',
		properties: [...CheckboxesProperties, ValidationRequired],
		icon: PlaygroundIcons.CHECKS, group: PlaygroundWidgetGroupKey.OPTIONS, tooltip: 'Checkbox group'
	},
	{
		$wt: N2.N2WidgetType.RADIO, label: 'Radio button.',
		properties: [
			{
				name: 'values', label: 'Text.',
				description: 'One or two values, connected by ",". First is true value, second is false value.'
			},
			ValidationRequired
		],
		icon: PlaygroundIcons.RADIO, group: PlaygroundWidgetGroupKey.OPTIONS, tooltip: 'Radio button'
	},
	{
		$wt: N2.N2WidgetType.RADIOS, label: 'Radio button group.',
		properties: [
			...CheckboxesProperties.filter(({name}) => name !== 'single' && name !== 'boolOnSingle'),
			ValidationRequired
		],
		icon: PlaygroundIcons.RADIOS, group: PlaygroundWidgetGroupKey.OPTIONS, tooltip: 'Radio button group'
	},
	{
		$wt: N2.N2WidgetType.DROPDOWN, label: 'Dropdown.',
		properties: [...DropdownProperties, ValidationRequired],
		icon: PlaygroundIcons.DROPDOWN, group: PlaygroundWidgetGroupKey.OPTIONS
	},
	{
		$wt: N2.N2WidgetType.MULTI_DROPDOWN, label: 'Dropdown allows multiple choices.',
		properties: [...DropdownProperties, ValidationRequired],
		icon: PlaygroundIcons.MULTI_DROPDOWN, group: PlaygroundWidgetGroupKey.OPTIONS, tooltip: 'Multiple choices'
	},

	// display
	{
		$wt: N2.N2WidgetType.CAPTION, label: 'Caption.',
		properties: [...CaptionProperties, LeadsDecorateElements, TailsDecorateElements],
		icon: PlaygroundIcons.CAPTION, group: PlaygroundWidgetGroupKey.DISPLAY
	},
	{
		$wt: N2.N2WidgetType.LABEL,
		label: 'Label. Shortcut of "Caption".', description: 'Read text from model.',
		properties: [
			...CaptionProperties.filter(({name}) => name !== 'labelOnValue'),
			LeadsDecorateElements, TailsDecorateElements
		],
		icon: PlaygroundIcons.LABEL, group: PlaygroundWidgetGroupKey.DISPLAY
	},
	{
		$wt: N2.N2WidgetType.BADGE, label: 'Badge. Shortcut of "Caption".', description: 'With ink and fill mode.',
		properties: [...CaptionProperties, Ink, Fill, LeadsDecorateElements, TailsDecorateElements],
		icon: '', group: PlaygroundWidgetGroupKey.NOT_CARE, notInToolbar: true
	},
	{
		$wt: N2.N2WidgetType.BUTTON, label: 'Button',
		properties: [...ButtonProperties, LeadsDecorateElements, TailsDecorateElements],
		icon: PlaygroundIcons.BUTTON, group: PlaygroundWidgetGroupKey.DISPLAY
	},
	{
		$wt: N2.N2WidgetType.LINK, label: 'Link. Shortcut of "Button".', description: 'With link style.',
		properties: [
			...ButtonProperties.filter(({name}) => name !== 'fill'),
			LeadsDecorateElements, TailsDecorateElements
		],
		icon: PlaygroundIcons.LINK, group: PlaygroundWidgetGroupKey.DISPLAY
	},
	{
		$wt: 'Chart', $key: 'ChartPie', label: 'Pie chart.',
		icon: PlaygroundIcons.CHART_PIE, group: PlaygroundWidgetGroupKey.DISPLAY, tooltip: 'Pie Chart'
	},
	{
		$wt: 'Chart', $key: 'ChartBar', label: 'Bar chart.',
		icon: PlaygroundIcons.CHART_BAR, group: PlaygroundWidgetGroupKey.DISPLAY, tooltip: 'Bar Chart'
	},
	{
		$wt: 'Chart', $key: 'ChartLine', label: 'Line chart.',
		icon: PlaygroundIcons.CHART_LINE, group: PlaygroundWidgetGroupKey.DISPLAY, tooltip: 'Line Chart'
	},
	{
		$wt: 'RelChart', label: 'Chart. Refresh depends on others.',
		icon: PlaygroundIcons.CHART_RELIANT, group: PlaygroundWidgetGroupKey.DISPLAY,
		tooltip: 'Chart depends on data'
	},
	{
		$wt: 'AutChart', label: 'Chart. Refresh autonomously.',
		icon: PlaygroundIcons.CHART_AUTONOMOUS, group: PlaygroundWidgetGroupKey.DISPLAY,
		tooltip: 'Auto refresh chart'
	},

	// containers
	{
		$wt: N2.N2WidgetType.SECTION,
		icon: PlaygroundIcons.SECTION, group: PlaygroundWidgetGroupKey.CONTAINERS,
		properties: [
			{name: 'title', label: 'Text.'},
			{name: 'collapsible', label: 'Boolean.', description: 'Section could be folded.'},
			{name: 'marker', label: 'Text.', description: 'Global identify this section when global event fired.'}
		]
	},
	{
		$wt: N2.N2WidgetType.BOX, label: 'Box, for customized layout.',
		icon: PlaygroundIcons.BOX, group: PlaygroundWidgetGroupKey.CONTAINERS
	},
	{
		$wt: N2.N2WidgetType.TABLE_ROW_OPERATORS,
		label: 'Table row operators', description: 'Valid only within the confines of the "Table".',
		$parent: N2.N2WidgetType.TABLE,
		icon: '', group: PlaygroundWidgetGroupKey.NOT_CARE,
		notInToolbar: true
	},
	{
		$wt: N2.N2WidgetType.TABLE,
		properties: [...TableProperties, ...ArrayProperties],
		icon: PlaygroundIcons.TABLE, group: PlaygroundWidgetGroupKey.CONTAINERS
	},
	{
		$wt: N2.N2WidgetType.RIBS,
		properties: [...RibsProperties, ...ArrayProperties],
		icon: PlaygroundIcons.RIBS, group: PlaygroundWidgetGroupKey.CONTAINERS
	},
	{
		$wt: N2.N2WidgetType.READONLY_RIBS, label: 'Readonly Ribs.',
		properties: [...RibsProperties, NoElementReminder],
		icon: '', group: PlaygroundWidgetGroupKey.NOT_CARE, notInToolbar: true
	},
	{
		$wt: N2.N2WidgetType.BUTTON_BAR, label: 'Button bar.',
		properties: [{name: 'alignment', label: 'Text.', description: '"left", "center", "right".'}],
		icon: PlaygroundIcons.BUTTON_BAR, group: PlaygroundWidgetGroupKey.CONTAINERS, tooltip: 'Button bar'
	},
	{
		$wt: N2.N2WidgetType.TAB, description: 'Valid only within the confines of the "Tabs".',
		properties: [
			{name: 'title', label: 'Text, Various.'},
			{name: 'marker', label: 'Text.', description: 'Global identify this tab when global event fired.'},
			{name: 'badge', label: 'Badge.', description: 'Badge in tab title.'},
			{name: 'data', label: 'Snippet.', description: 'Asynchronously retrieve tab data.'}
		],
		$parent: N2.N2WidgetType.TABS,
		icon: '', group: PlaygroundWidgetGroupKey.NOT_CARE, notInToolbar: true
	},
	{
		$wt: N2.N2WidgetType.TABS,
		properties: [
			{name: 'initActive', label: 'Text, Number.', description: 'Initial active tab, marker or index.'}
		],
		icon: PlaygroundIcons.TABS, group: PlaygroundWidgetGroupKey.CONTAINERS
	},
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
		icon: PlaygroundIcons.WIZARD, group: PlaygroundWidgetGroupKey.CONTAINERS
	},
	{
		$wt: N2.N2WidgetType.TREE,
		properties: [
			{name: 'height', label: 'Number.', description: 'In pixels.'},
			{name: 'initExpandLevel', label: 'Number.', description: 'Default -1. Starts from 0.'},
			{name: 'showIndex', label: 'Boolean.', description: 'Default false. Show node index or not.'},
			{name: 'detective', label: 'Snippet.', description: 'Tree nodes builder.'}
		],
		icon: PlaygroundIcons.TREE, group: PlaygroundWidgetGroupKey.CONTAINERS
	},

	{
		$wt: N2.N2WidgetType.PAGINATION,
		properties: [
			{name: 'freeWalk', label: 'Boolean.', description: 'Default false. Show page free walker dropdown.'},
			{name: 'maxButtons', label: 'Number.', description: 'Default 7. Maximum page buttons.'},
			{name: 'possibleSizes', label: 'Text.', description: 'Possible page size. Show page size dropdown.'}
		],
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
	{name: 'clearMe', label: 'Various.', description: 'Monitor other property changes, and clear my value.'}
];

export const getCommonWidgetAttributes = (): Array<PlaygroundWidgetProperty> => {
	return CommonWidgetAttributes;
};