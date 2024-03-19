import {CssVars} from '@rainbow-d9/n2';

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
	WIDGET_DECLARATION_ATTR_VALUE_EXT_COLOR: 'var(--d9-playground-widget-declaration-attr-name-color, rgb(10, 56, 172))',
	VIEWER_ERROR_COLOR: `var(--d9-playground-viewer-error-color, ${CssVars.DANGER_COLOR})`
};
