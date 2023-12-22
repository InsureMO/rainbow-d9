import color from 'color';

export const DOM_KEY_WIDGET = 'data-w';
export const DOM_ID_WIDGET = 'data-wid';
export const ICON_PREFIX = '$icons.';

const CssConstants = {
	FONT_FAMILY: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Tahoma", "Verdana", "Arial"',
	FONT_COLOR: 'rgb(102,102,102)',
	BG_COLOR: 'rgb(248,249,250)',
	PRIMARY_COLOR: 'rgb(13,110,253)',
	DANGER_COLOR: 'rgb(220,53,89)',
	SUCCESS_COLOR: 'rgb(25,135,84)',
	WARN_COLOR: 'rgb(255,193,7)',
	INFO_COLOR: 'rgb(25,157,178)',
	WAIVE_COLOR: 'rgb(180,180,180)',
	HOVER_COLOR: 'rgb(238,243,252)',
	INVERT_COLOR: 'rgb(255,255,255)',
	DISABLE_COLOR: 'rgb(235,235,235)',
	BORDER_COLOR: 'rgb(206,212,218)',
	SHADOW_COLOR: 'rgb(0,0,0)',
	WAIVE_SHADOW_COLOR: 'rgb(0,0,0)',
	// for widgets
	CAPTION_FONT_COLOR: 'rgb(126,126,126)',
	RIB_COLOR: 'rgb(238,241,245)'
};

export const CssVars = {
	// must be number value, used in javascript
	INPUT_HEIGHT_VALUE: 32,
	VERTICAL_SCROLLER_WIDTH: 4,
	HORIZONTAL_SCROLLER_HEIGHT: 8,

	FONT_FAMILY: `var(--d9-font-family, ${CssConstants.FONT_FAMILY})`,
	FONT_SIZE: `var(--d9-font-size, 14px)`,
	FONT_BOLD: 'var(--d9-font-bold, 600)',
	FONT_VARIANT: 'var(--d9-font-variant, petite-caps)',
	LINE_HEIGHT: 'var(--d9-line-height, 24px)',

	BACKGROUND_COLOR: `var(--d9-background-color, ${CssConstants.BG_COLOR})`,
	FONT_COLOR: `var(--d9-font-color, ${CssConstants.FONT_COLOR})`,
	PRIMARY_COLOR: `var(--d9-primary-color, ${CssConstants.PRIMARY_COLOR})`,
	DANGER_COLOR: `var(--d9-danger-color, ${CssConstants.DANGER_COLOR})`,
	SUCCESS_COLOR: `var(--d9-success-color, ${CssConstants.SUCCESS_COLOR})`,
	WARN_COLOR: `var(--d9-warn-color, ${CssConstants.WARN_COLOR})`,
	INFO_COLOR: `var(--d9-info-color, ${CssConstants.INFO_COLOR})`,
	WAIVE_COLOR: `var(--d9-waive-color, ${CssConstants.WAIVE_COLOR})`,
	HOVER_COLOR: `var(--d9-hover-color, ${CssConstants.HOVER_COLOR})`,
	INVERT_COLOR: `var(--d9-invert-color, ${CssConstants.INVERT_COLOR})`,
	DISABLE_COLOR: `var(--d9-disable-color, ${CssConstants.DISABLE_COLOR})`,

	PLAIN_SHADOW: `var(--d9-plain-shadow, 0 0 0 3px ${color(CssConstants.SHADOW_COLOR).alpha(0.06)})`,
	HOVER_SHADOW: `var(--d9-hover-shadow, 0 0 0 3px ${color(CssConstants.SHADOW_COLOR).alpha(0.1)})`,
	PRIMARY_SHADOW: `var(--d9-primary-shadow, 0 0 0 3px ${color(CssConstants.PRIMARY_COLOR).alpha(0.4)})`,
	PRIMARY_HOVER_SHADOW: `var(--d9-primary-hover-shadow, 0 0 0 3px ${color(CssConstants.PRIMARY_COLOR).alpha(0.2)})`,
	DANGER_SHADOW: `var(--d9-danger-shadow, 0 0 0 3px ${color(CssConstants.DANGER_COLOR).alpha(0.4)})`,
	DANGER_HOVER_SHADOW: `var(--d9-danger-hover-shadow, 0 0 0 3px ${color(CssConstants.DANGER_COLOR).alpha(0.2)})`,
	SUCCESS_SHADOW: `var(--d9-success-shadow, 0 0 0 3px ${color(CssConstants.SUCCESS_COLOR).alpha(0.4)})`,
	SUCCESS_HOVER_SHADOW: `var(--d9-success-hover-shadow, 0 0 0 3px ${color(CssConstants.SUCCESS_COLOR).alpha(0.2)})`,
	WARN_SHADOW: `var(--d9-warn-shadow, 0 0 0 3px ${color(CssConstants.WARN_COLOR).alpha(0.4)})`,
	WARN_HOVER_SHADOW: `var(--d9-warn-hover-shadow, 0 0 0 3px ${color(CssConstants.WARN_COLOR).alpha(0.2)})`,
	INFO_SHADOW: `var(--d9-info-shadow, 0 0 0 3px ${color(CssConstants.INFO_COLOR).alpha(0.4)})`,
	INFO_HOVER_SHADOW: `var(--d9-info-hover-shadow, 0 0 0 3px ${color(CssConstants.INFO_COLOR).alpha(0.2)})`,
	WAIVE_SHADOW: `var(--d9-waive-shadow, 0 0 0 3px ${color(CssConstants.WAIVE_SHADOW_COLOR).alpha(0.2)})`,
	WAIVE_HOVER_SHADOW: `var(--d9-waive-hover-shadow, 0 0 0 3px ${color(CssConstants.WAIVE_SHADOW_COLOR).alpha(0.1)})`,

	BORDER_COLOR: `var(--d9-border-color, ${CssConstants.BORDER_COLOR})`,
	BORDER_WIDTH: `var(--d9-border-width, 1px)`,
	BORDER: `var(--d9-border, 1px solid var(--d9-border-color, ${CssConstants.BORDER_COLOR}))`,
	BORDER_RADIUS: 'var(--d9-border-radius, 4px)',

	GRID_COLUMNS: 'var(--d9-grid-columns, 12)',
	GRID_COLUMN_GAP: 'var(--d9-grid-column-gap, 16px)',
	GRID_ROW_GAP: 'var(--d9-grid-row-gap, 0)',

	SECTION_HEADER_HEIGHT: 'var(--d9-section-header-height, 44px)',
	SECTION_HEADER_OFFSET: 'var(--d9-section-header-offset, calc(44px / 3))',
	SECTION_HEADER_BORDER: `var(--d9-section-header-border, 2px solid var(--d9-border-color, ${CssConstants.BORDER_COLOR}))`,
	SECTION_HEADER_FONT_FAMILY: `var(--d9-section-header-font-family, ${CssConstants.FONT_FAMILY})`,
	SECTION_HEADER_FONT_SIZE: 'var(--d9-section-header-title-font-size, 16px)',
	SECTION_HEADER_FONT_WEIGHT: 'var(--d9-section-header-title-font-weight, 600)',
	SECTION_BODY_PADDING: 'var(--d9-section-body-padding, 8px)',

	TAB_TITLE_HEIGHT: 'var(--d9-tab-title-height, 44px)',
	TAB_TITLE_OFFSET: 'var(--d9-tab-title-offset, calc(44px / 6))',
	TAB_TITLE_PADDING: 'var(--d9-tab-title-padding, 16px)',
	TAB_TITLE_FONT_FAMILY: `var(--d9-tab-title-font-family, ${CssConstants.FONT_FAMILY})`,
	TAB_TITLE_FONT_SIZE: `var(--d9-tab-title-font-size, 16px)`,
	TAB_TITLE_FONT_WEIGHT: `var(--d9-tab-title-font-weight, 600)`,

	CAPTION_FONT_FAMILY: `var(--d9-caption-font-family, ${CssConstants.FONT_FAMILY})`,
	CAPTION_FONT_SIZE: 'var(--d9-caption-font-size, 14px)',
	CAPTION_FONT_COLOR: `var(--d9-caption-font-color, ${CssConstants.CAPTION_FONT_COLOR})`,

	INPUT_HEIGHT: 'var(--d9-input-height, 32px)',
	INPUT_INDENT: 'var(--d9-input-indent, 10px)',

	BUTTON_INDENT: 'var(--d9-button-indent, 16px)',
	BUTTON_ICON_GAP: 'var(--d9-button-icon-gap, 8px)',

	DROPDOWN_Z_INDEX: 'var(--d9-dropdown-z-index, 999)',

	// must be number value, used in javascript
	CALENDAR_POPUP_HEIGHT_VALUE: 290,
	// must be number value, used in javascript
	CALENDAR_POPUP_WIDTH_VALUE: 364,
	CALENDAR_GUTTER_SIZE: 'var(--d9-calendar-gutter-size, 10px)',
	CALENDAR_POPUP_HEADER_HEIGHT: 'var(--d9-calendar-popup-header-height, 32px)',
	CALENDAR_DATE_CELL_SIZE: `var(--d9-calendar-date-cell-size, 32px)`,
	CALENDAR_LIGHT_DATE_COLOR: `var(--d9-calendar-light-date-color, ${color(CssConstants.FONT_COLOR).lighten(0.5)})`,

	RIB_BORDER_RADIUS: 'var(--d9-rib-border-radius, 4px)',
	RIB_BUTTON_HEIGHT: 'var(--d9-rib-button-height, 26px)',
	RIB_GAP_SIZE: 'var(--d9-rib-gap-size, 8px)',
	RIB_HEADER_BACKGROUND_COLOR: `var(--d9-rib-header-background-color, ${color(CssConstants.BORDER_COLOR).opaquer(0.7)})`,
	RIB_FOOTER_HEIGHT: 'var(--d9-rib-footer-height, 44px)',

	TABLE_BUTTON_HEIGHT: 'var(--d9-table-button-height, 26px)',
	TABLE_ROW_INDEX_COLUMN_WIDTH: 'var(--d9-table-row-index-column-width, 50px)',
	TABLE_ROW_INDEX_OPACITY: 'var(--d9-table-row-index-opacity, 0.7)',
	TABLE_ROW_INDEX_BACKGROUND_COLOR: `var(--d9-table-row-index-background-color, ${CssConstants.BG_COLOR})`,
	TABLE_HEADER_HEIGHT: 'var(--d9-table-header-height, 36px)',
	TABLE_HEADER_FONT_FAMILY: `var(--d9-table-header-font-family, ${CssConstants.FONT_FAMILY})`,
	TABLE_HEADER_FONT_SIZE: 'var(--d9-table-header-font-size, 1em)',
	TABLE_HEADER_FONT_WEIGHT: 'var(--d9-table-header-font-weight, 600)',
	TABLE_HEADER_BORDER: `var(--d9-table-header-border, 2px solid var(--d9-border-color, ${CssConstants.BORDER_COLOR}))`,
	TABLE_HEADER_BORDER_SIZE: 'var(--d9-table-header-border-size, 2px)',
	TABLE_HEADER_BACKGROUND_COLOR: `var(--d9-table-header-background-color, ${CssConstants.BG_COLOR})`,
	TABLE_CELL_HEIGHT: 'var(--d9-table-cell-height, 32px)',
	TABLE_CELL_PADDING: 'var(--d9-table-cell-padding, 10px)',
	TABLE_CELL_BORDER: `var(--d9-table-cell-border, 1px solid var(--d9-border-color, ${CssConstants.BORDER_COLOR}))`,
	TABLE_FOOTER_HEIGHT: 'var(--d9-table-footer-height, 44px)',
	TABLE_ODD_ROW_BACKGROUND_COLOR: `var(--d9-table-odd-row-background-color, ${CssConstants.RIB_COLOR})`,

	FORM_CELL_INVALID_MESSAGE_HEIGHT: 'var(--d9-form-cell-invalid-message-height, 22px)',
	FORM_CELL_INVALID_MESSAGE_PADDING: 'var(--d9-form-cell-invalid-message-padding, 4px)',
	FORM_CELL_INVALID_MESSAGE_FONT_SIZE: 'var(--d9-form-cell-invalid-message-font-size, 0.8em)',
	FORM_CELL_INVALID_MESSAGE_FONT_WEIGHT: 'var(--d9-form-cell-invalid-message-font-weight, 600)',
	FORM_CELL_INVALID_MESSAGE_COLOR: `var(--d9-form-cell-invalid-message-color, ${CssConstants.DANGER_COLOR})`,

	TRANSITION_DURATION: 'var(--d9-transition-duration, 300ms)',
	TRANSITION_TIMING_FUNCTION: 'var(--d9-transition-timing-function, ease-in-out)',

	DIALOG_SHADOW: `var(--d9-dialog-shadow, 0 0 18px 6px ${color(CssConstants.SHADOW_COLOR).alpha(0.4)})`,
	DIALOG_WIDTH: 'var(--d9-dialog-width, 600px)',
	DIALOG_MARGIN_TOP: 'var(--d9-dialog-margin-top, 25vh)',
	DIALOG_MARGIN_LEFT: 'var(--d9-dialog-margin-left, calc(50vw - var(--d9-dialog-width) / 2))',
	DIALOG_PADDING: 'var(--d9-dialog-padding, 32px 32px 16px)',
	DIALOG_HEADER_MARGIN: 'var(--d9-dialog-header-margin, -32px -32px 0)',
	DIALOG_HEADER_PADDING: 'var(--d9-dialog-header-padding, 16px)',
	DIALOG_HEADER_MIN_HEIGHT: 'var(--d9-dialog-header-min-height, 56px)',
	DIALOG_HEADER_FONT_FAMILY: `var(--d9-dialog-header-font-family, ${CssConstants.FONT_FAMILY})`,
	DIALOG_HEADER_FONT_SIZE: 'var(--d9-dialog-header-font-size, 1.2em)',
	DIALOG_BODY_MIN_HEIGHT: 'var(--d9-dialog-body-min-height, 80px)',
	DIALOG_FOOTER_BUTTON_GAP_SIZE: 'var(--d9-dialog-footer-button-gap-size, 8px)',
	DIALOG_Z_INDEX: 99989,

	ALERT_WIDTH: 'var(--d9-alert-width, 400px)',
	ALERT_MARGIN_TOP: 'var(--d9-alert-margin-top, 25vh)',
	ALERT_MARGIN_LEFT: 'var(--d9-alert-margin-left, calc(50vw - var(--d9-alert-width, 400px) / 2))',
	ALERT_PADDING: 'var(--d9-alert-padding, 32px 32px 16px)',
	ALERT_MIN_HEIGHT: 'var(--d9-alert-min-height, 60px)',
	ALERT_MAX_HEIGHT: 'var(--d9-alert-max-height, 30vh)',
	ALERT_MARGIN_BOTTOM: 'var(--d9-alert-margin-bottom, 32px)',
	ALERT_Z_INDEX: 99999,

	REMOTE_REQUEST_COLOR: `var(--d9-remote-request-color, ${CssConstants.INFO_COLOR})`,
	REMOTE_REQUEST_Z_INDEX: 99999
};

export type CssVarsType = typeof CssVars & {
	INPUT_HEIGHT_VALUE: number;
	CALENDAR_POPUP_HEIGHT_VALUE: number;
	CALENDAR_POPUP_WIDTH_VALUE: number;
}

export const I18NVars = {
	ALERT: {CONFIRM: 'Ok'},
	DIALOG: {CONFIRM: 'Yes', DISCARD: 'No'},
	CALENDAR: {
		CONFIRM: 'OK',
		TODAY: 'Today',
		HOUR: 'Hour',
		MINUTE: 'Minute',
		SECOND: 'Second',
		YESTERDAY: 'YESTERDAY',
		THIS_WEEKEND: 'THIS WEEKEND',
		PREV_WEEKEND: 'PREV WEEKEND',
		THIS_MONTH_END: 'THIS MONTH END',
		PREV_MONTH_END: 'PREV MONTH END',
		THIS_YEAR_END: 'THIS YEAR END',
		PREV_YEAR_END: 'PREV YEAR END',
		JAN: 'Jan',
		FEB: 'Feb',
		MAR: 'Mar',
		APR: 'Apr',
		MAY: 'May',
		JUN: 'Jun',
		JUL: 'Jul',
		AUG: 'Aug',
		SEP: 'Sep',
		OCT: 'Oct',
		NOV: 'Nov',
		DEC: 'Dec',
		SUNDAY: 'S',
		MONDAY: 'M',
		TUESDAY: 'T',
		WEDNESDAY: 'W',
		THURSDAY: 'T',
		FRIDAY: 'F',
		SATURDAY: 'S'
	},
	OPTIONS: {
		NO_AVAILABLE: 'No available options.',
		NO_MATCHED: 'No matched options.'
	},
	RIBS: {
		NO_ELEMENT: 'No data found.',
		CREATE_ITEM: 'Create New Element',
		REMOVE_ITEM: 'Remove'
	},
	TABLE: {
		NO_ELEMENT: 'No data found.',
		CREATE_ITEM: 'Create New Element',
		REMOVE_ITEM: 'Remove'
	}
};
