import {CssVars} from '@rainbow-d9/n2';

export const PlaygroundCssVars = {
	Z_INDEX: 9999999,
	TOOLBAR_BACKGROUND_COLOR: `var(--d9-playground-toolbar-background-color, ${CssVars.BACKGROUND_COLOR})`,
	TOOLBAR_BUTTON_SIZE: 'var(--d9-playground-toolbar-button-size, 30px)',
	TOOLBAR_BUTTON_ACTIVE_COLOR: `var(--d9-playground-toolbar-button-active-color, ${CssVars.PRIMARY_COLOR})`,
	TOOLBAR_BUTTON_HOVER_COLOR: `var(--d9-playground-toolbar-hover-color, ${CssVars.HOVER_COLOR})`,
	TOOLBAR_TOOLTIP_BACKGROUND_COLOR: `var(--d9-playground-toolbar-tooltip-background-color, ${CssVars.BACKGROUND_COLOR})`,
	TOOLBAR_TOOLTIP_SHADOW: `var(--d9-playground-toolbar-tooltip-shadow, ${CssVars.WAIVE_HOVER_SHADOW})`,

	// widget declaration
	WIDGET_DECLARATION_FONT_SIZE_H1: `var(--d9-playground-widget-declaration-font-size-h1, 1em)`,
	WIDGET_DECLARATION_FONT_SIZE_H2: `var(--d9-playground-widget-declaration-font-size-h2, 1em)`,
	WIDGET_DECLARATION_FONT_SIZE_H3: `var(--d9-playground-widget-declaration-font-size-h3, 1em)`,
	WIDGET_DECLARATION_FONT_SIZE_H4: `var(--d9-playground-widget-declaration-font-size-h4, 1em)`,
	WIDGET_DECLARATION_FONT_SIZE_H5: `var(--d9-playground-widget-declaration-font-size-h5, 1em)`,
	WIDGET_DECLARATION_FONT_SIZE_H6: `var(--d9-playground-widget-declaration-font-size-h6, 1em)`,
	WIDGET_DECLARATION_TYPE_FONT_SIZE_H1: `var(--d9-playground-widget-declaration-type-font-size-h1, var(--d9-playground-widget-declaration-font-size-h1))`,
	WIDGET_DECLARATION_TYPE_FONT_SIZE_H2: `var(--d9-playground-widget-declaration-type-font-size-h2, var(--d9-playground-widget-declaration-font-size-h2))`,
	WIDGET_DECLARATION_TYPE_FONT_SIZE_H3: `var(--d9-playground-widget-declaration-type-font-size-h3, var(--d9-playground-widget-declaration-font-size-h3))`,
	WIDGET_DECLARATION_TYPE_FONT_SIZE_H4: `var(--d9-playground-widget-declaration-type-font-size-h4, var(--d9-playground-widget-declaration-font-size-h4))`,
	WIDGET_DECLARATION_TYPE_FONT_SIZE_H5: `var(--d9-playground-widget-declaration-type-font-size-h5, var(--d9-playground-widget-declaration-font-size-h5))`,
	WIDGET_DECLARATION_TYPE_FONT_SIZE_H6: `var(--d9-playground-widget-declaration-type-font-size-h6, var(--d9-playground-widget-declaration-font-size-h6))`,
	WIDGET_DECLARATION_TYPE_FONT_FAMILY: `var(--d9-playground-widget-declaration-type-font-family, ${CssVars.FONT_FAMILY})`,
	WIDGET_DECLARATION_TYPE_FONT_WEIGHT: `var(--d9-playground-widget-declaration-type-font-weight, 400)`,
	WIDGET_DECLARATION_TYPE_COLOR: `var(--d9-playground-widget-declaration-type-color, rgb(20, 64, 175))`,
	WIDGET_DECLARATION_TYPE_BACKGROUND_COLOR: `var(--d9-playground-widget-declaration-type-background-color, transparent)`,
	WIDGET_DECLARATION_TYPE_PADDING: `var(--d9-playground-widget-declaration-type-padding, 0 4px)`,
	WIDGET_DECLARATION_TYPE_BORDER: `var(--d9-playground-widget-declaration-type-border, ${CssVars.BORDER})`,
	WIDGET_DECLARATION_TYPE_BORDER_RADIUS: `var(--d9-playground-widget-declaration-type-border-radius, ${CssVars.BORDER_RADIUS})`,
	WIDGET_DECLARATION_LABEL_COLOR: `var(--d9-playground-widget-declaration-type-color, rgb(55, 122, 41))`,
	WIDGET_DECLARATION_LABEL_BACKGROUND_COLOR: `var(--d9-playground-widget-declaration-type-background-color, transparent)`,
	WIDGET_DECLARATION_LABEL_PADDING: `var(--d9-playground-widget-declaration-type-padding, 0)`,
	WIDGET_DECLARATION_LABEL_BORDER: `var(--d9-playground-widget-declaration-type-border, 0)`,
	WIDGET_DECLARATION_LABEL_BORDER_RADIUS: `var(--d9-playground-widget-declaration-type-border-radius, 0)`
};
