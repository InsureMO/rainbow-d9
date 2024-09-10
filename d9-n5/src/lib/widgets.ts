import {CssVars} from '@rainbow-d9/n2';

export const PlaygroundCssConstants = {
	BACKGROUND_COLOR: CssVars.BACKGROUND_COLOR,
	HOVER_COLOR: CssVars.HOVER_COLOR,
	DANGER_COLOR: CssVars.DANGER_COLOR,
	BUTTON_ACTIVE_COLOR: CssVars.PRIMARY_COLOR,
	TOOLTIP_SHADOW: CssVars.WAIVE_HOVER_SHADOW,
	WIDGET_DECLARATION_INSTRUCTION_COLOR: 'rgb(134, 54, 153)',
	WIDGET_DECLARATION_SPLITTER_COLOR: 'rgb(85, 85, 85, 0.7)',
	WIDGET_DECLARATION_TYPE_COLOR: 'rgb(134, 54, 153)',
	WIDGET_DECLARATION_HEADLINE_COLOR: 'rgb(55, 122, 41)',
	WIDGET_DECLARATION_PROPERTY_COLOR: 'rgb(70, 141, 142)',
	WIDGET_DECLARATION_ID_COLOR: 'rgb(70, 141, 142)',
	WIDGET_DECLARATION_FLAG_COLOR: 'rgb(114, 113, 64)',
	WIDGET_DECLARATION_ATTR_NAME_COLOR: 'rgb(79, 148, 149)',
	WIDGET_DECLARATION_ATTR_VALUE_ICON_COLOR: 'rgb(55, 122, 41)',
	WIDGET_DECLARATION_ATTR_VALUE_STR_COLOR: 'rgb(55, 122, 41)',
	WIDGET_DECLARATION_ATTR_VALUE_EXT_COLOR: 'rgb(10, 56, 172)',
	WIDGET_WRAPPER_SHADOW: '0 0 5px 2px rgba(0,0,0,0.2)',
	WIDGET_WRAPPER_TOOLBAR_COLOR: 'rgba(0,0,0,0.4)',
	WIDGET_WRAPPER_TOOLBAR_FILTER: 'drop-shadow(2px 4px 6px rgb(0,0,0))',
	CODE_MIRROR_SEARCH_PANEL_BACKGROUND_COLOR: CssVars.BACKGROUND_COLOR,
	CODE_MIRROR_SEARCH_PANEL_BUTTON_BACKGROUND_COLOR: 'transparent'
};
export const createPlaygroundCssVars = (variables: typeof PlaygroundCssConstants) => {
	return {
		Z_INDEX: 9999999,
		TOOLBAR_BACKGROUND_COLOR: `var(--d9-playground-toolbar-background-color, ${variables.BACKGROUND_COLOR})`,
		TOOLBAR_BUTTON_SIZE: 'var(--d9-playground-toolbar-button-size, 30px)',
		TOOLBAR_BUTTON_ACTIVE_COLOR: `var(--d9-playground-toolbar-button-active-color, ${variables.BUTTON_ACTIVE_COLOR})`,
		TOOLBAR_BUTTON_HOVER_COLOR: `var(--d9-playground-toolbar-hover-color, ${variables.HOVER_COLOR})`,
		TOOLBAR_TOOLTIP_BACKGROUND_COLOR: `var(--d9-playground-toolbar-tooltip-background-color, ${variables.BACKGROUND_COLOR})`,
		TOOLBAR_TOOLTIP_SHADOW: `var(--d9-playground-toolbar-tooltip-shadow, ${variables.TOOLTIP_SHADOW})`,
		SLIDER_BACKGROUND_COLOR: `var(--d9-playground-slider-background-color, ${variables.HOVER_COLOR})`,
		WIDGET_DECLARATION_INSTRUCTION_COLOR: `var(--d9-playground-widget-declaration-instruction-color, ${variables.WIDGET_DECLARATION_INSTRUCTION_COLOR})`,
		WIDGET_DECLARATION_SPLITTER_COLOR: `var(--d9-playground-widget-declaration-splitter-color, ${variables.WIDGET_DECLARATION_SPLITTER_COLOR})`,
		WIDGET_DECLARATION_TYPE_COLOR: `var(--d9-playground-widget-declaration-type-color, ${variables.WIDGET_DECLARATION_TYPE_COLOR})`,
		WIDGET_DECLARATION_HEADLINE_COLOR: `var(--d9-playground-widget-declaration-headline-color, ${variables.WIDGET_DECLARATION_HEADLINE_COLOR})`,
		WIDGET_DECLARATION_PROPERTY_COLOR: `var(--d9-playground-widget-declaration-property-color, ${variables.WIDGET_DECLARATION_PROPERTY_COLOR})`,
		WIDGET_DECLARATION_ID_COLOR: `var(--d9-playground-widget-declaration-id-color, ${variables.WIDGET_DECLARATION_ID_COLOR})`,
		WIDGET_DECLARATION_FLAG_COLOR: `var(--d9-playground-widget-declaration-flag-color, ${variables.WIDGET_DECLARATION_FLAG_COLOR})`,
		WIDGET_DECLARATION_ATTR_NAME_COLOR: `var(--d9-playground-widget-declaration-attr-name-color, ${variables.WIDGET_DECLARATION_ATTR_NAME_COLOR})`,
		WIDGET_DECLARATION_ATTR_VALUE_ICON_COLOR: `var(--d9-playground-widget-declaration-attr-name-color, ${variables.WIDGET_DECLARATION_ATTR_VALUE_ICON_COLOR})`,
		WIDGET_DECLARATION_ATTR_VALUE_STR_COLOR: `var(--d9-playground-widget-declaration-attr-name-color, ${variables.WIDGET_DECLARATION_ATTR_VALUE_STR_COLOR})`,
		WIDGET_DECLARATION_ATTR_VALUE_EXT_COLOR: `var(--d9-playground-widget-declaration-attr-name-color, ${variables.WIDGET_DECLARATION_ATTR_VALUE_EXT_COLOR})`,
		VIEWER_ERROR_COLOR: `var(--d9-playground-viewer-error-color, ${variables.DANGER_COLOR})`,
		TEMPLATE_DIALOG_WIDTH: 'var(--d9-playground-template-dialog-width, 70vw)',
		TEMPLATE_DIALOG_HEIGHT: 'var(--d9-playground-template-dialog-height, 60vh)',
		TEMPLATE_DIALOG_MARGIN_TOP: 'var(--d9-playground-template-dialog-margin-top, min(10vh, calc(20vh - 60px)))',
		TEMPLATE_DIALOG_MARGIN_LEFT: 'var(--d9-playground-template-dialog-margin-left, 15vw)',
		TEMPLATE_DIALOG_PADDING: 'var(--d9-playground-template-dialog-padding, 32px 32px 16px)',
		TEMPLATE_DIALOG_BODY_MARGIN_BOTTOM: 'var(--d9-playground-template-dialog-margin-bottom, 16px)',
		WIDGET_WRAPPER_Z_INDEX: 2000000000,
		WIDGET_WRAPPER_BORDER_RADIUS: 'var(--d9-playground-ww-border-radius, 4px)',
		WIDGET_WRAPPER_SHADOW: `var(--d9-playground-ww-shadow, ${variables.WIDGET_WRAPPER_SHADOW})`,
		WIDGET_WRAPPER_TOOLBAR_COLOR: `var(--d9-playground-ww-toolbar-color, ${variables.WIDGET_WRAPPER_TOOLBAR_COLOR})`,
		WIDGET_WRAPPER_TOOLBAR_FILTER: `var(--d9-playground-ww-toolbar-filter, ${variables.WIDGET_WRAPPER_TOOLBAR_FILTER})`,
		CODE_MIRROR_SEARCH_PANEL_BACKGROUND_COLOR: `var(--d9-playground-cm-search-panel-background-color, ${variables.CODE_MIRROR_SEARCH_PANEL_BACKGROUND_COLOR})`,
		CODE_MIRROR_SEARCH_PANEL_BUTTON_BACKGROUND_COLOR: `var(--d9-playground-cm-search-panel-button-background-color, ${variables.CODE_MIRROR_SEARCH_PANEL_BUTTON_BACKGROUND_COLOR})`
	};
};

export const PlaygroundCssVars: ReturnType<typeof createPlaygroundCssVars> = createPlaygroundCssVars(PlaygroundCssConstants);
