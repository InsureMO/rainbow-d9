import {CssVars} from '@rainbow-d9/n2';
import {N2} from '@rainbow-d9/n3';
import {PlaygroundWidget} from './types';

export const PlaygroundCssVars = {
	Z_INDEX: 9999999,
	TOOLBAR_BACKGROUND_COLOR: `var(--d9-playground-toolbar-background-color, ${CssVars.BACKGROUND_COLOR})`,
	TOOLBAR_BUTTON_SIZE: 'var(--d9-playground-toolbar-button-size, 30px)',
	TOOLBAR_BUTTON_ACTIVE_COLOR: `var(--d9-playground-toolbar-button-active-color, ${CssVars.PRIMARY_COLOR})`,
	TOOLBAR_BUTTON_HOVER_COLOR: `var(--d9-playground-toolbar-hover-color, ${CssVars.HOVER_COLOR})`,
	TOOLBAR_TOOLTIP_BACKGROUND_COLOR: `var(--d9-playground-toolbar-tooltip-background-color, ${CssVars.BACKGROUND_COLOR})`,
	TOOLBAR_TOOLTIP_SHADOW: `var(--d9-playground-toolbar-tooltip-shadow, ${CssVars.WAIVE_HOVER_SHADOW})`,
	SLIDER_BACKGROUND_COLOR: `VAR(--d9-playground-slider-background-color, ${CssVars.HOVER_COLOR})`
};

export const N2Widgets: Array<PlaygroundWidget> = [
	{$wt: N2.N2WidgetType.PAGE, description: 'Only one allowed, and always at the highest level.'},

	{$wt: N2.N2WidgetType.INPUT, label: 'Input box.'},
	{$wt: N2.N2WidgetType.NUMBER},
	{$wt: N2.N2WidgetType.DECORATE_INPUT},
	{$wt: N2.N2WidgetType.DECORATE_NUMBER},
	{$wt: N2.N2WidgetType.TEXTAREA},
	{$wt: N2.N2WidgetType.CHECKBOX},
	{$wt: N2.N2WidgetType.CHECKBOXES},
	{$wt: N2.N2WidgetType.CHECKS},
	{$wt: N2.N2WidgetType.RADIO},
	{$wt: N2.N2WidgetType.RADIOS},
	{$wt: N2.N2WidgetType.BUTTON},
	{$wt: N2.N2WidgetType.BUTTON_BAR},
	{$wt: N2.N2WidgetType.CAPTION},
	{$wt: N2.N2WidgetType.LABEL},
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