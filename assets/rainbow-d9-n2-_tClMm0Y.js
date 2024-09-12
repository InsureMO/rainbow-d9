var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { a as color, M as MaskedNumber, e as MaskedDate, g as MaskedFunction, j as MaskedPattern, k as MaskedRange, p as MaskedRegExp, q as MaskedDynamic } from "./vendor-sNtEpvVF.js";
import { R as React, r as reactExports, q as qe, W as We, u as useIMask } from "./react-base-gRR87lLo.js";
import { c as createLogger, V as VUtils, P as PPUtils, r as registerWidget, a as useThrottler, u as useRootEventBus, M as MUtils, N as NUtils, d as Wrapper, e as useForceUpdate, f as MBUtils, b as useWrapperEventBus, W as WrapperEventTypes, g as useCreateEventBus, h as PROPERTY_PATH_ME, i as useDefaultAttributeValues, j as useAttributesWatch, R as RootEventTypes } from "./rainbow-d9-n1-PPIp1Bx6.js";
import { d as dayjs } from "./dayjs-YCMHfch8.js";
const DOM_KEY_WIDGET = "data-w";
const DOM_ID_WIDGET = "data-wid";
const ICON_PREFIX = "$icons.";
const CssConstants = {
  FONT_FAMILY: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Tahoma", "Verdana", "Arial"',
  FONT_COLOR: "rgb(102,102,102)",
  BG_COLOR: "rgb(255,255,255)",
  PRIMARY_COLOR: "rgb(13,110,253)",
  DANGER_COLOR: "rgb(220,53,89)",
  SUCCESS_COLOR: "rgb(25,135,84)",
  WARN_COLOR: "rgb(255,193,7)",
  INFO_COLOR: "rgb(25,157,178)",
  WAIVE_COLOR: "rgb(180,180,180)",
  HOVER_COLOR: "rgb(238,243,252)",
  INVERT_COLOR: "rgb(255,255,255)",
  DISABLE_COLOR: "rgb(235,235,235)",
  PLACEHOLDER_COLOR: "rgb(179, 179, 179)",
  BORDER_COLOR: "rgb(206,212,218)",
  SHADOW_COLOR: "rgb(0,0,0)",
  WAIVE_SHADOW_COLOR: "rgb(0,0,0)",
  CAPTION_FONT_COLOR: "rgb(126,126,126)",
  TAB_ACTIVE_COLOR: "rgb(13,110,253)",
  WIZARD_STEP_DONE_COLOR: "rgb(223,230,245)",
  WIZARD_STEP_ACTIVE_COLOR: "rgb(13,110,253)",
  RIB_COLOR: "rgb(238,241,245)",
  TREE_LINE_COLOR: "rgb(206,212,218)",
  SCROLL_THUMB_COLOR: "rgb(193, 193, 193)",
  SCROLL_TRACK_COLOR: "rgba(229, 229, 229, 0.5)"
};
const createCssVars = (variables) => {
  return {
    INPUT_HEIGHT_VALUE: 32,
    VERTICAL_SCROLLER_WIDTH: 4,
    HORIZONTAL_SCROLLER_HEIGHT: 6,
    FONT_FAMILY: `var(--d9-font-family, ${variables.FONT_FAMILY})`,
    FONT_SIZE: `var(--d9-font-size, 14px)`,
    FONT_BOLD: "var(--d9-font-bold, 600)",
    FONT_VARIANT: "var(--d9-font-variant, petite-caps)",
    LINE_HEIGHT: "var(--d9-line-height, 24px)",
    BACKGROUND_COLOR: `var(--d9-background-color, ${variables.BG_COLOR})`,
    FONT_COLOR: `var(--d9-font-color, ${variables.FONT_COLOR})`,
    PRIMARY_COLOR: `var(--d9-primary-color, ${variables.PRIMARY_COLOR})`,
    DANGER_COLOR: `var(--d9-danger-color, ${variables.DANGER_COLOR})`,
    SUCCESS_COLOR: `var(--d9-success-color, ${variables.SUCCESS_COLOR})`,
    WARN_COLOR: `var(--d9-warn-color, ${variables.WARN_COLOR})`,
    INFO_COLOR: `var(--d9-info-color, ${variables.INFO_COLOR})`,
    WAIVE_COLOR: `var(--d9-waive-color, ${variables.WAIVE_COLOR})`,
    HOVER_COLOR: `var(--d9-hover-color, ${variables.HOVER_COLOR})`,
    INVERT_COLOR: `var(--d9-invert-color, ${variables.INVERT_COLOR})`,
    DISABLE_COLOR: `var(--d9-disable-color, ${variables.DISABLE_COLOR})`,
    PLACEHOLDER_COLOR: `var(--d9-placeholder-color, ${variables.PLACEHOLDER_COLOR})`,
    PLAIN_SHADOW: `var(--d9-plain-shadow, 0 0 0 3px ${color(variables.SHADOW_COLOR).alpha(0.06)})`,
    HOVER_SHADOW: `var(--d9-hover-shadow, 0 0 0 3px ${color(variables.SHADOW_COLOR).alpha(0.1)})`,
    PRIMARY_SHADOW: `var(--d9-primary-shadow, 0 0 0 3px ${color(variables.PRIMARY_COLOR).alpha(0.4)})`,
    PRIMARY_HOVER_SHADOW: `var(--d9-primary-hover-shadow, 0 0 0 3px ${color(variables.PRIMARY_COLOR).alpha(0.2)})`,
    DANGER_SHADOW: `var(--d9-danger-shadow, 0 0 0 3px ${color(variables.DANGER_COLOR).alpha(0.4)})`,
    DANGER_HOVER_SHADOW: `var(--d9-danger-hover-shadow, 0 0 0 3px ${color(variables.DANGER_COLOR).alpha(0.2)})`,
    SUCCESS_SHADOW: `var(--d9-success-shadow, 0 0 0 3px ${color(variables.SUCCESS_COLOR).alpha(0.4)})`,
    SUCCESS_HOVER_SHADOW: `var(--d9-success-hover-shadow, 0 0 0 3px ${color(variables.SUCCESS_COLOR).alpha(0.2)})`,
    WARN_SHADOW: `var(--d9-warn-shadow, 0 0 0 3px ${color(variables.WARN_COLOR).alpha(0.4)})`,
    WARN_HOVER_SHADOW: `var(--d9-warn-hover-shadow, 0 0 0 3px ${color(variables.WARN_COLOR).alpha(0.2)})`,
    INFO_SHADOW: `var(--d9-info-shadow, 0 0 0 3px ${color(variables.INFO_COLOR).alpha(0.4)})`,
    INFO_HOVER_SHADOW: `var(--d9-info-hover-shadow, 0 0 0 3px ${color(variables.INFO_COLOR).alpha(0.2)})`,
    WAIVE_SHADOW: `var(--d9-waive-shadow, 0 0 0 3px ${color(variables.WAIVE_SHADOW_COLOR).alpha(0.2)})`,
    WAIVE_HOVER_SHADOW: `var(--d9-waive-hover-shadow, 0 0 0 3px ${color(variables.WAIVE_SHADOW_COLOR).alpha(0.1)})`,
    BORDER_COLOR: `var(--d9-border-color, ${variables.BORDER_COLOR})`,
    BORDER_WIDTH: `var(--d9-border-width, 1px)`,
    BORDER: `var(--d9-border, 1px solid var(--d9-border-color, ${variables.BORDER_COLOR}))`,
    BORDER_RADIUS: "var(--d9-border-radius, 4px)",
    GRID_COLUMNS: "var(--d9-grid-columns, 12)",
    GRID_COLUMN_GAP: "var(--d9-grid-column-gap, 16px)",
    GRID_ROW_GAP: "var(--d9-grid-row-gap, 0)",
    SCROLL_TRACK_COLOR: `var(--d9-scroll-track-color, ${variables.SCROLL_TRACK_COLOR})`,
    SCROLL_THUMB_COLOR: `var(--d9-scroll-thumb-color, ${variables.SCROLL_THUMB_COLOR})`,
    SCROLL_BORDER_RADIUS: "var(--d9-scroll-border-radius, 2px)",
    SCROLL_HEIGHT: "var(--d9-scroll-height, 6px)",
    SCROLL_WIDTH: "var(--d9-scroll-width, 4px)",
    SECTION_HEADER_HEIGHT: "var(--d9-section-header-height, 44px)",
    SECTION_HEADER_OFFSET: "var(--d9-section-header-offset, calc(44px / 3))",
    SECTION_HEADER_BORDER: `var(--d9-section-header-border, 2px solid var(--d9-border-color, ${variables.BORDER_COLOR}))`,
    SECTION_HEADER_FONT_FAMILY: `var(--d9-section-header-font-family, ${variables.FONT_FAMILY})`,
    SECTION_HEADER_FONT_SIZE: "var(--d9-section-header-title-font-size, 16px)",
    SECTION_HEADER_FONT_WEIGHT: "var(--d9-section-header-title-font-weight, 600)",
    SECTION_BODY_PADDING: "var(--d9-section-body-padding, 8px)",
    TAB_TITLE_HEIGHT: "var(--d9-tab-title-height, 40px)",
    TAB_TITLE_OFFSET: "var(--d9-tab-title-offset, 0)",
    TAB_TITLE_ACTIVE_COLOR: `var(--d9-tab-title-active-color, ${variables.TAB_ACTIVE_COLOR})`,
    TAB_TITLE_PADDING: "var(--d9-tab-title-padding, 16px)",
    TAB_TITLE_FONT_FAMILY: `var(--d9-tab-title-font-family, ${variables.FONT_FAMILY})`,
    TAB_TITLE_FONT_SIZE: `var(--d9-tab-title-font-size, 16px)`,
    TAB_TITLE_FONT_WEIGHT: `var(--d9-tab-title-font-weight, 600)`,
    WIZARD_STEP_TITLE_HEIGHT: "var(--d9-wizard-step-title-height, 40px)",
    WIZARD_STEP_TITLE_OFFSET: "var(--d9-wizard-step-title-offset, 0)",
    WIZARD_STEP_TITLE_DONE_COLOR: `var(--d9-wizard-step-title-done-color, ${variables.WIZARD_STEP_DONE_COLOR})`,
    WIZARD_STEP_TITLE_ACTIVE_COLOR: `var(--d9-wizard-step-title-active-color, ${variables.WIZARD_STEP_ACTIVE_COLOR})`,
    WIZARD_STEP_TITLE_PADDING: "var(--d9-wizard-step-title-padding, 16px)",
    WIZARD_STEP_TITLE_FONT_FAMILY: `var(--d9-wizard-step-title-font-family, ${variables.FONT_FAMILY})`,
    WIZARD_STEP_TITLE_FONT_SIZE: `var(--d9-wizard-step-title-font-size, 16px)`,
    WIZARD_STEP_TITLE_FONT_WEIGHT: `var(--d9-wizard-step-title-font-weight, 600)`,
    WIZARD_STEP_BALLOON_HEIGHT: `var(--d9-wizard-step-balloon-height, 40px)`,
    CAPTION_FONT_FAMILY: `var(--d9-caption-font-family, ${variables.FONT_FAMILY})`,
    CAPTION_FONT_SIZE: "var(--d9-caption-font-size, 14px)",
    CAPTION_FONT_COLOR: `var(--d9-caption-font-color, ${variables.CAPTION_FONT_COLOR})`,
    INPUT_HEIGHT: "var(--d9-input-height, 32px)",
    INPUT_INDENT: "var(--d9-input-indent, 10px)",
    BUTTON_INDENT: "var(--d9-button-indent, 16px)",
    BUTTON_ICON_GAP: "var(--d9-button-icon-gap, 8px)",
    DROPDOWN_Z_INDEX: "var(--d9-dropdown-z-index, 999)",
    CALENDAR_POPUP_HEIGHT_VALUE: 290,
    CALENDAR_POPUP_WIDTH_VALUE: 364,
    CALENDAR_GUTTER_SIZE: "var(--d9-calendar-gutter-size, 10px)",
    CALENDAR_POPUP_HEADER_HEIGHT: "var(--d9-calendar-popup-header-height, 32px)",
    CALENDAR_DATE_CELL_SIZE: `var(--d9-calendar-date-cell-size, 32px)`,
    CALENDAR_LIGHT_DATE_COLOR: `var(--d9-calendar-light-date-color, ${color(variables.FONT_COLOR).lighten(0.5)})`,
    RIB_BORDER_RADIUS: "var(--d9-rib-border-radius, 4px)",
    RIB_BUTTON_HEIGHT: "var(--d9-rib-button-height, 26px)",
    RIB_GAP_SIZE: "var(--d9-rib-gap-size, 8px)",
    RIB_HEADER_PADDING: "var(--d9-rib-header-padding, 4px 0 4px 16px)",
    RIB_HEADER_BACKGROUND_COLOR: `var(--d9-rib-header-background-color, ${variables.RIB_COLOR})`,
    RIB_FOOTER_HEIGHT: "var(--d9-rib-footer-height, 44px)",
    TABLE_BUTTON_HEIGHT: "var(--d9-table-button-height, 26px)",
    TABLE_ROW_INDEX_COLUMN_CHAR_WIDTH: "var(--d9-table-row-index-column-char-width, 8px)",
    TABLE_ROW_INDEX_COLUMN_WIDTH: "var(--d9-table-row-index-column-width, 20px)",
    TABLE_ROW_INDEX_OPACITY: "var(--d9-table-row-index-opacity, 0.7)",
    TABLE_HEADER_HEIGHT: "var(--d9-table-header-height, 36px)",
    TABLE_HEADER_FONT_FAMILY: `var(--d9-table-header-font-family, ${variables.FONT_FAMILY})`,
    TABLE_HEADER_FONT_SIZE: "var(--d9-table-header-font-size, 1em)",
    TABLE_HEADER_FONT_WEIGHT: "var(--d9-table-header-font-weight, 600)",
    TABLE_HEADER_BORDER: `var(--d9-table-header-border, 2px solid var(--d9-border-color, ${variables.BORDER_COLOR}))`,
    TABLE_HEADER_BORDER_SIZE: "var(--d9-table-header-border-size, 2px)",
    TABLE_HEADER_BACKGROUND_COLOR: `var(--d9-table-header-background-color, ${variables.BG_COLOR})`,
    TABLE_CELL_HEIGHT: "var(--d9-table-cell-height, 32px)",
    TABLE_CELL_PADDING: "var(--d9-table-cell-padding, 14px)",
    TABLE_CELL_BORDER: `var(--d9-table-cell-border, 1px solid var(--d9-border-color, ${variables.BORDER_COLOR}))`,
    TABLE_FOOTER_HEIGHT: "var(--d9-table-footer-height, 44px)",
    TABLE_ODD_ROW_BACKGROUND_COLOR: `var(--d9-table-odd-row-background-color, ${variables.RIB_COLOR})`,
    TREE_LINE_COLOR: `var(--d9-tree-line-color, ${variables.TREE_LINE_COLOR})`,
    FORM_CELL_INVALID_MESSAGE_HEIGHT: "var(--d9-form-cell-invalid-message-height, 22px)",
    FORM_CELL_INVALID_MESSAGE_PADDING: "var(--d9-form-cell-invalid-message-padding, 4px)",
    FORM_CELL_INVALID_MESSAGE_FONT_SIZE: "var(--d9-form-cell-invalid-message-font-size, 0.8em)",
    FORM_CELL_INVALID_MESSAGE_FONT_WEIGHT: "var(--d9-form-cell-invalid-message-font-weight, 600)",
    FORM_CELL_INVALID_MESSAGE_COLOR: `var(--d9-form-cell-invalid-message-color, ${variables.DANGER_COLOR})`,
    TRANSITION_DURATION: "var(--d9-transition-duration, 300ms)",
    TRANSITION_TIMING_FUNCTION: "var(--d9-transition-timing-function, ease-in-out)",
    DIALOG_SHADOW: `var(--d9-dialog-shadow, 0 0 18px 6px ${color(variables.SHADOW_COLOR).alpha(0.4)})`,
    DIALOG_WIDTH: "var(--d9-dialog-width, 600px)",
    DIALOG_MARGIN_TOP: "var(--d9-dialog-margin-top, 25vh)",
    DIALOG_MARGIN_LEFT: "var(--d9-dialog-margin-left, calc(50vw - var(--d9-dialog-width, 600px) / 2))",
    DIALOG_PADDING: "var(--d9-dialog-padding, 32px 32px 16px)",
    DIALOG_HEADER_MARGIN: "var(--d9-dialog-header-margin, -32px -32px 0)",
    DIALOG_HEADER_PADDING: "var(--d9-dialog-header-padding, 16px)",
    DIALOG_HEADER_MIN_HEIGHT: "var(--d9-dialog-header-min-height, 56px)",
    DIALOG_HEADER_FONT_FAMILY: `var(--d9-dialog-header-font-family, ${variables.FONT_FAMILY})`,
    DIALOG_HEADER_FONT_SIZE: "var(--d9-dialog-header-font-size, 1.2em)",
    DIALOG_BODY_MIN_HEIGHT: "var(--d9-dialog-body-min-height, 80px)",
    DIALOG_FOOTER_BUTTON_GAP_SIZE: "var(--d9-dialog-footer-button-gap-size, 8px)",
    DIALOG_Z_INDEX: 99989,
    ALERT_WIDTH: "var(--d9-alert-width, 400px)",
    ALERT_MARGIN_TOP: "var(--d9-alert-margin-top, 25vh)",
    ALERT_MARGIN_LEFT: "var(--d9-alert-margin-left, calc(50vw - var(--d9-alert-width, 400px) / 2))",
    ALERT_PADDING: "var(--d9-alert-padding, 32px 32px 16px)",
    ALERT_MIN_HEIGHT: "var(--d9-alert-min-height, 60px)",
    ALERT_MAX_HEIGHT: "var(--d9-alert-max-height, 30vh)",
    ALERT_MARGIN_BOTTOM: "var(--d9-alert-margin-bottom, 32px)",
    ALERT_Z_INDEX: 99999,
    REMOTE_REQUEST_COLOR: `var(--d9-remote-request-color, ${variables.INFO_COLOR})`,
    REMOTE_REQUEST_Z_INDEX: 99999,
    TIP_Z_INDEX: 999999,
    TIP_BORDER: `var(--d9-tip-border, 1px solid var(--d9-border-color, ${variables.BORDER_COLOR}))`,
    TIP_BORDER_RADIUS: "var(--d9-tip-border-radius, 8px)",
    TIP_SHADOW: `var(--d9-tip-shadow, 0 0 6px 2px ${color(variables.SHADOW_COLOR).alpha(0.2)})`,
    TIP_HEADER_HEIGHT: "var(--d9-tip-header-height, 44px)",
    TIP_HEADER_BORDER: `var(--d9-tip-header-border, 2px solid var(--d9-border-color, ${variables.BORDER_COLOR}))`,
    TIP_HEADER_PADDING: "var(--d9-tip-header-padding, 16px)",
    TIP_HEADER_FONT_SIZE: "var(--d9-tip-header-title-font-size, 16px)",
    TIP_HEADER_FONT_WEIGHT: "var(--d9-tip-header-title-font-weight, 400)",
    TIP_BODY_PADDING: "var(--d9-tip-body-padding, 16px)"
  };
};
const CssVars = createCssVars(CssConstants);
const $d9 = window;
$d9.$d9n2 = $d9.$d9n2 ?? {
  intl: {
    language: navigator.language || "en-US",
    labels: {
      "en-US": {
        alert: { confirm: "Ok" },
        dialog: { confirm: "Yes", discard: "No" },
        options: { noAvailable: "No available options.", noMatched: "No matched options." },
        calendar: {
          confirm: "Ok",
          today: "Today",
          hour: "Hour",
          minute: "Minute",
          second: "Second",
          yesterday: "Yesterday",
          thisWeekEnd: "This Weekend",
          prevWeekend: "Prev Weekend",
          thisMonthEnd: "This Month End",
          prevMonthEnd: "Prev month End",
          thisYearEnd: "This Year End",
          prevYearEnd: "Prev Year End",
          jan: "Jan",
          feb: "Feb",
          mar: "Mar",
          apr: "Apr",
          may: "May",
          jun: "Jun",
          jul: "Jul",
          aug: "Aug",
          sep: "Sep",
          oct: "Oct",
          nov: "Nov",
          dec: "Dec",
          sunday: "S",
          monday: "M",
          tuesday: "T",
          wednesday: "W",
          thursday: "T",
          friday: "F",
          saturday: "S"
        },
        ribs: {
          noElement: "No data found.",
          createItem: "Create New Element",
          removeItem: "Remove"
        },
        table: {
          headers: { index: void 0, operators: void 0 },
          noElement: "No data found.",
          createItem: "Create New Element",
          removeItem: "Remove"
        },
        wizard: { previous: "Previous", next: "Next" },
        tree: { filter: { placeholder: "Filter..." } },
        pagination: {
          page: "",
          of: "of",
          pages: "pages,",
          afterSize: "items per page,",
          total: "total",
          unknownItemCount: "???",
          items: "items."
        }
      }
    }
  }
};
const $d9n2 = $d9.$d9n2;
const AngleLeft = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "angle-left", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 320 512" },
    React.createElement("path", { opacity: "1", d: "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" })
  );
};
const AngleRight = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "angle-right", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 320 512" },
    React.createElement("path", { opacity: "1", d: "M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" })
  );
};
const ArrowDown = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "arrow-down", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
    React.createElement("path", { opacity: "1", d: "M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" })
  );
};
const Back = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "back", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
    React.createElement("path", { d: "M205 34.8c11.5 5.1 19 16.6 19 29.2v64H336c97.2 0 176 78.8 176 176c0 113.3-81.5 163.9-100.2 174.1c-2.5 1.4-5.3 1.9-8.1 1.9c-10.9 0-19.7-8.9-19.7-19.7c0-7.5 4.3-14.4 9.8-19.5c9.4-8.8 22.2-26.4 22.2-56.7c0-53-43-96-96-96H224v64c0 12.6-7.4 24.1-19 29.2s-25 3-34.4-5.4l-160-144C3.9 225.7 0 217.1 0 208s3.9-17.7 10.6-23.8l160-144c9.4-8.5 22.9-10.6 34.4-5.4z" })
  );
};
const Backward = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "forward", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 320 512" },
    React.createElement("path", { opacity: "1", d: "M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241V96c0-17.7-14.3-32-32-32S0 78.3 0 96V416c0 17.7 14.3 32 32 32s32-14.3 32-32V271l11.5 9.6 192 160z" })
  );
};
const CaretDown = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "caret-down", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 320 512" },
    React.createElement("path", { d: "M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" })
  );
};
const CaretLeft = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "caret-left", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 512" },
    React.createElement("path", { d: "M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" })
  );
};
const CaretRight = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "caret-right", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 512" },
    React.createElement("path", { d: "M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" })
  );
};
const Cart = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "cart", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 576 512" },
    React.createElement("path", { d: "M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" })
  );
};
const Check = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "check", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512" },
    React.createElement("path", { opacity: "1", d: "M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" })
  );
};
const Collapse = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "collapse", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512" },
    React.createElement("path", { d: "M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V64zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32H96v64c0 17.7 14.3 32 32 32s32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V64zM320 320c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z" })
  );
};
const Date$1 = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "date", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512" },
    React.createElement("path", { d: "M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" })
  );
};
const Edit = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "edit", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
    React.createElement("path", { opacity: "1", d: "M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" })
  );
};
const Expand = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "expand", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512" },
    React.createElement("path", { d: "M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z" })
  );
};
const Forward = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "forward", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 320 512" },
    React.createElement("path", { opacity: "1", d: "M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z" })
  );
};
const Plus = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "plus", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512" },
    React.createElement("path", { d: "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" })
  );
};
const Remove = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "remove", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512" },
    React.createElement("path", { d: "M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" })
  );
};
const Search = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "search", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
    React.createElement("path", { d: "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" })
  );
};
const Spinner = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "spinner", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
    React.createElement("path", { d: "M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z" })
  );
};
const Time = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "time", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512" },
    React.createElement("path", { d: "M256 512C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256s-114.6 256-256 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" })
  );
};
const Times = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "times", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 320 512" },
    React.createElement("path", { d: "M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" })
  );
};
const View = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "view", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 22 22" },
    React.createElement("path", { d: "M19,19a1,1,0,0,0-1,1,2.006,2.006,0,0,1-2,2H4a2.006,2.006,0,0,1-2-2V4A2.006,2.006,0,0,1,4,2H16a2,2,0,0,1,2,2,1,1,0,0,0,2,0,4,4,0,0,0-4-4H4A4,4,0,0,0,0,4V20a4,4,0,0,0,4,4H16a3.995,3.995,0,0,0,4-4A1,1,0,0,0,19,19Z" }),
    React.createElement("circle", { cx: "5", cy: "14", r: "1" }),
    React.createElement("circle", { cx: "5", cy: "6", r: "1" }),
    React.createElement("circle", { cx: "5", cy: "10", r: "1" }),
    React.createElement("circle", { cx: "5.014", cy: "18", r: "1" }),
    React.createElement("path", { d: "M15.752,19a1.018,1.018,0,0,0,0-2H8.838a1.019,1.019,0,0,0,0,2Z" }),
    React.createElement("path", { d: "M23.56,17.29l-2.83-2.83a1.466,1.466,0,0,0-1.14-.43l-1.04-1.05A5.482,5.482,0,0,0,11.48,5h-2.6A.95.95,0,0,0,8,6a.947.947,0,0,0,.881,1h.465a5.451,5.451,0,0,0-.734,2.062A.988.988,0,0,0,8,10a.973.973,0,0,0,.655.946A5.46,5.46,0,0,0,9.554,13H8.881a1.008,1.008,0,0,0,0,2h3.3a5.492,5.492,0,0,0,4.945-.61l1.05,1.05a1.466,1.466,0,0,0,.43,1.14l2.83,2.83a1.509,1.509,0,0,0,2.12,0A1.491,1.491,0,0,0,23.56,17.29Zm-7.05-4.97a3.513,3.513,0,0,1-4.95,0,2.789,2.789,0,0,1-.28-.32h3.04A1.69,1.69,0,0,0,16,10.32V9.68A1.69,1.69,0,0,0,14.32,8H11.06a3.38,3.38,0,0,1,.5-.63,3.5,3.5,0,0,1,4.95,4.95Z" })
  );
};
const XMark = (props) => {
  return React.createElement(
    "svg",
    { ...props, "data-icon": "xmark", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 384 512" },
    React.createElement("path", { d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" })
  );
};
const _IconsRegistrar = class _IconsRegistrar {
  constructor() {
  }
  static register(icons) {
    Object.keys(icons).forEach((key) => {
      _IconsRegistrar._icons[key] = icons[key];
    });
  }
  static find(key, defaultIcon) {
    const icon = _IconsRegistrar._icons[key];
    return icon ?? defaultIcon;
  }
};
__publicField(_IconsRegistrar, "_icons", {});
let IconsRegistrar = _IconsRegistrar;
IconsRegistrar.register({
  back: () => React.createElement(Back, null),
  date: () => React.createElement(Date$1, null),
  time: () => React.createElement(Time, null),
  check: () => React.createElement(Check, null),
  times: () => React.createElement(Times, null),
  remove: () => React.createElement(Remove, null),
  expand: () => React.createElement(Expand, null),
  collapse: () => React.createElement(Collapse, null),
  edit: () => React.createElement(Edit, null),
  view: () => React.createElement(View, null),
  forward: () => React.createElement(Forward, null),
  backward: () => React.createElement(Backward, null),
  caretLeft: () => React.createElement(CaretLeft, null),
  caretRight: () => React.createElement(CaretRight, null),
  caretDown: () => React.createElement(CaretDown, null),
  arrowDown: () => React.createElement(ArrowDown, null),
  angleLeft: () => React.createElement(AngleLeft, null),
  angleRight: () => React.createElement(AngleRight, null),
  spinner: () => React.createElement(Spinner, null),
  search: () => React.createElement(Search, null),
  plus: () => React.createElement(Plus, null),
  xmark: () => React.createElement(XMark, null),
  cart: () => React.createElement(Cart, null)
});
var index$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  AngleLeft,
  AngleRight,
  ArrowDown,
  Back,
  Backward,
  CaretDown,
  CaretLeft,
  CaretRight,
  Cart,
  Check,
  Collapse,
  Date: Date$1,
  Edit,
  Expand,
  Forward,
  Plus,
  Registrar: IconsRegistrar,
  Remove,
  Search,
  Spinner,
  Time,
  Times,
  View,
  XMark
});
var GlobalEventTypes;
(function(GlobalEventTypes2) {
  GlobalEventTypes2["LANGUAGE_CHANGED"] = "language-changed";
  GlobalEventTypes2["INVOKE_REMOTE_REQUEST"] = "invoke-remote-request";
  GlobalEventTypes2["SHOW_ALERT"] = "show-alert";
  GlobalEventTypes2["HIDE_ALERT"] = "hide-alert";
  GlobalEventTypes2["SHOW_DIALOG"] = "show-dialog";
  GlobalEventTypes2["HIDE_DIALOG"] = "hide-dialog";
  GlobalEventTypes2["SHOW_YES_NO_DIALOG"] = "show-yes-no-dialog";
  GlobalEventTypes2["SHOW_TIP"] = "show-tip";
  GlobalEventTypes2["HIDE_TIP"] = "hide-tip";
  GlobalEventTypes2["REPAINT_TIP"] = "repaint-tip";
  GlobalEventTypes2["CUSTOM_EVENT"] = "custom-event";
})(GlobalEventTypes || (GlobalEventTypes = {}));
const Context$7 = reactExports.createContext({});
Context$7.displayName = "GlobalEventBus";
const GlobalEventBusProvider = (props) => {
  const { children } = props;
  const bus = useCreateEventBus("d9-global");
  return React.createElement(Context$7.Provider, { value: bus }, children);
};
const useGlobalEventBus = () => reactExports.useContext(Context$7);
const CALENDAR_YM_FORMAT = "MMM YYYY";
const CALENDAR_DATE_FORMAT = "YYYY/MM/DD";
const CALENDAR_TIME_FORMAT = "HH:mm:ss";
const CALENDAR_DATETIME_FORMAT = `${CALENDAR_DATE_FORMAT} ${CALENDAR_TIME_FORMAT}`;
const DEFAULTS$1 = {
  YM_FORMAT: CALENDAR_YM_FORMAT,
  DATE_FORMAT: CALENDAR_DATE_FORMAT,
  TIME_FORMAT: CALENDAR_TIME_FORMAT,
  DATETIME_FORMAT: CALENDAR_DATETIME_FORMAT,
  AUTO_CONFIRM: true,
  AUTO_CONFIRM_ON_DATE: false,
  USE_CALENDAR_ICON: false
};
const setCalendarDefaults = (defaults) => {
  DEFAULTS$1.YM_FORMAT = defaults.ymFormat ?? DEFAULTS$1.YM_FORMAT;
  DEFAULTS$1.DATE_FORMAT = defaults.dateFormat ?? DEFAULTS$1.DATE_FORMAT;
  DEFAULTS$1.TIME_FORMAT = defaults.timeFormat ?? DEFAULTS$1.TIME_FORMAT;
  DEFAULTS$1.DATETIME_FORMAT = defaults.datetimeFormat ?? DEFAULTS$1.DATETIME_FORMAT;
  DEFAULTS$1.AUTO_CONFIRM = defaults.autoConfirm ?? DEFAULTS$1.AUTO_CONFIRM;
  DEFAULTS$1.AUTO_CONFIRM_ON_DATE = defaults.autoConfirmOnDate ?? DEFAULTS$1.AUTO_CONFIRM_ON_DATE;
  DEFAULTS$1.USE_CALENDAR_ICON = defaults.useCalendarIcon ?? DEFAULTS$1.USE_CALENDAR_ICON;
};
const getDefaultCalendarYMFormat = () => DEFAULTS$1.YM_FORMAT;
const getDefaultCalendarDateFormat = () => DEFAULTS$1.DATE_FORMAT;
const getDefaultCalendarTimeFormat = () => DEFAULTS$1.TIME_FORMAT;
const getDefaultCalendarDatetimeFormat = () => DEFAULTS$1.DATETIME_FORMAT;
const isCalendarAutoConfirm = () => DEFAULTS$1.AUTO_CONFIRM;
const isCalendarAutoConfirmOnDate = () => DEFAULTS$1.AUTO_CONFIRM_ON_DATE;
const isStickIconUseCalendar = () => DEFAULTS$1.USE_CALENDAR_ICON;
const FIX_TIME_AT_START_OF_DAY = { hour: 0, minute: 0, second: 0, millisecond: 0 };
const FIX_TIME_AT_END_OF_DAY = { hour: 23, minute: 59, second: 59, millisecond: 59 };
const toStartOfDay = (datetime) => {
  return datetime.hour(0).minute(0).second(0).millisecond(0);
};
const toEndOfDay = (datetime) => {
  return datetime.hour(23).minute(59).second(59).millisecond(999);
};
const checkTimeParts = (timeFormat) => {
  const hasMinute = (timeFormat ?? "").includes("m");
  const hasSecond = hasMinute && (timeFormat ?? "").includes("s");
  return { hasMinute, hasSecond };
};
const checkDateParts = (dateFormat) => {
  return { hasDate: (dateFormat ?? "").toLowerCase().includes("d") };
};
var utils$3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  FIX_TIME_AT_END_OF_DAY,
  FIX_TIME_AT_START_OF_DAY,
  checkDateParts,
  checkTimeParts,
  getDefaultCalendarDateFormat,
  getDefaultCalendarDatetimeFormat,
  getDefaultCalendarTimeFormat,
  getDefaultCalendarYMFormat,
  isCalendarAutoConfirm,
  isCalendarAutoConfirmOnDate,
  isStickIconUseCalendar,
  setCalendarDefaults,
  toEndOfDay,
  toStartOfDay
});
const toCssSize = (size) => {
  const ret = VUtils.isNumber(size);
  if (ret.test) {
    return `${size}px`;
  } else {
    return `${size ?? ""}`;
  }
};
const omitGridCellStyle = (style) => {
  const { gridColumn, gridRow, gridArea, ...rest } = style || {};
  return rest;
};
const computeGridCellStyle = (style) => {
  if (style == null) {
    return void 0;
  }
  const gridCellStyles = [];
  if (VUtils.isNotBlank(style.gridColumn)) {
    gridCellStyles.push(`grid-column: ${style.gridColumn};`);
  }
  if (VUtils.isNotBlank(style.gridRow)) {
    gridCellStyles.push(`grid-row: ${style.gridRow};`);
  }
  if (VUtils.isNotBlank(style.gridArea)) {
    gridCellStyles.push(`grid-area: ${style.gridArea};`);
  }
  return gridCellStyles.join("");
};
const locale = () => $d9n2.intl.language ?? (navigator == null ? void 0 : navigator.language) ?? "en-US";
const nf = (fractionDigits, grouping) => {
  return new Intl.NumberFormat(void 0, {
    useGrouping: grouping == null ? true : grouping,
    minimumFractionDigits: fractionDigits || 0,
    maximumFractionDigits: fractionDigits || 0
  });
};
const wrapNf = (format) => {
  return (value) => value == null ? "" : format(value);
};
const nf0 = wrapNf(nf(0).format);
const nf1 = wrapNf(nf(1).format);
const nf2 = wrapNf(nf(2).format);
const nf3 = wrapNf(nf(3).format);
const nfWithLocale = (locale2) => {
  return (fractionDigits, grouping) => {
    return new Intl.NumberFormat(VUtils.isBlank(locale2) ? void 0 : locale2.replace(/_/g, "-"), {
      useGrouping: grouping == null ? true : grouping,
      minimumFractionDigits: fractionDigits || 0,
      maximumFractionDigits: fractionDigits || 0
    });
  };
};
const nfXWithLocale = (locale2, fractionDigits) => {
  return wrapNf(nfWithLocale(locale2)(fractionDigits).format);
};
const detectNumberFormat = (locale2) => {
  const formatted = new Intl.NumberFormat(locale2 ?? void 0, { useGrouping: true }).format(12345678909876e-4);
  const matched = formatted.match(/\D/g);
  return [matched[0], matched[matched.length - 1]];
};
const df = (value, options) => {
  if (VUtils.isBlank(value)) {
    return value;
  }
  const fromFormat = (options == null ? void 0 : options.from) || getDefaultCalendarDatetimeFormat();
  const toFormat = (options == null ? void 0 : options.to) || getDefaultCalendarDateFormat();
  const parsed = dayjs(value, fromFormat);
  if (parsed.isValid()) {
    return parsed.format(toFormat);
  } else {
    return value;
  }
};
const useDualRefs = (ref, forwardedRef) => {
  reactExports.useEffect(() => {
    if (typeof forwardedRef === "function") {
      forwardedRef(ref.current);
    } else if (typeof forwardedRef === "object" && forwardedRef !== null) {
      forwardedRef.current = ref.current;
    }
  }, [ref, forwardedRef]);
};
const N2Logger = createLogger();
var utils$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  N2Logger,
  computeGridCellStyle,
  detectNumberFormat,
  df,
  locale,
  nf,
  nf0,
  nf1,
  nf2,
  nf3,
  nfWithLocale,
  nfXWithLocale,
  omitGridCellStyle,
  toCssSize,
  useDualRefs,
  wrapNf
});
var ButtonFill;
(function(ButtonFill2) {
  ButtonFill2["LINK"] = "link";
  ButtonFill2["PLAIN"] = "plain";
  ButtonFill2["FILL"] = "fill";
})(ButtonFill || (ButtonFill = {}));
var ButtonInk;
(function(ButtonInk2) {
  ButtonInk2["PRIMARY"] = "primary";
  ButtonInk2["DANGER"] = "danger";
  ButtonInk2["SUCCESS"] = "success";
  ButtonInk2["WAIVE"] = "waive";
  ButtonInk2["WARN"] = "warn";
  ButtonInk2["INFO"] = "info";
})(ButtonInk || (ButtonInk = {}));
const AButton = qe.button.attrs(({ id, hasOneLeadOrTail, [DOM_KEY_WIDGET]: dataW }) => {
  return {
    [DOM_KEY_WIDGET]: dataW ?? "d9-button",
    [DOM_ID_WIDGET]: id,
    style: {
      padding: hasOneLeadOrTail ? 0 : void 0
    }
  };
})`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    font-variant: ${CssVars.FONT_VARIANT};
    height: ${CssVars.INPUT_HEIGHT};
    padding: 0 ${CssVars.BUTTON_INDENT};
    color: ${CssVars.INVERT_COLOR};
    fill: ${CssVars.INVERT_COLOR};
    border: ${CssVars.BORDER};
    border-radius: ${CssVars.BORDER_RADIUS};
    outline: none;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    // fill
    // default
    border-color: ${CssVars.PRIMARY_COLOR};
    background-color: ${CssVars.PRIMARY_COLOR};

    &:hover {
        box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
    }

    &:focus, &:active {
        box-shadow: ${CssVars.PRIMARY_SHADOW};
    }

    &[data-ink=primary] {
        border-color: ${CssVars.PRIMARY_COLOR};
        background-color: ${CssVars.PRIMARY_COLOR};

        &:hover {
            box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
        }

        &:focus, &:active {
            box-shadow: ${CssVars.PRIMARY_SHADOW};
        }
    }

    &[data-ink=danger] {
        border-color: ${CssVars.DANGER_COLOR};
        background-color: ${CssVars.DANGER_COLOR};

        &:hover {
            box-shadow: ${CssVars.DANGER_HOVER_SHADOW};
        }

        &:focus, &:active {
            box-shadow: ${CssVars.DANGER_SHADOW};
        }
    }

    &[data-ink=success] {
        border-color: ${CssVars.SUCCESS_COLOR};
        background-color: ${CssVars.SUCCESS_COLOR};

        &:hover {
            box-shadow: ${CssVars.SUCCESS_HOVER_SHADOW};
        }

        &:focus, &:active {
            box-shadow: ${CssVars.SUCCESS_SHADOW};
        }
    }

    &[data-ink=warn] {
        border-color: ${CssVars.WARN_COLOR};
        background-color: ${CssVars.WARN_COLOR};

        &:hover {
            box-shadow: ${CssVars.WARN_HOVER_SHADOW};
        }

        &:focus, &:active {
            box-shadow: ${CssVars.WARN_SHADOW};
        }
    }

    &[data-ink=info] {
        border-color: ${CssVars.INFO_COLOR};
        background-color: ${CssVars.INFO_COLOR};

        &:hover {
            box-shadow: ${CssVars.INFO_HOVER_SHADOW};
        }

        &:focus, &:active {
            box-shadow: ${CssVars.INFO_SHADOW};
        }
    }

    &[data-ink=waive] {
        border-color: ${CssVars.WAIVE_COLOR};
        background-color: ${CssVars.WAIVE_COLOR};

        &:hover {
            box-shadow: ${CssVars.WAIVE_HOVER_SHADOW};
        }

        &:focus, &:active {
            box-shadow: ${CssVars.WAIVE_SHADOW};
        }
    }

    &[data-fill=link] {
        color: ${CssVars.FONT_COLOR};
        background-color: transparent;
        border-color: transparent;
        text-decoration: underline;
        box-shadow: none;

        &:hover {
            color: ${CssVars.PRIMARY_COLOR};
            box-shadow: none;
        }

        &:focus, &:active {
            box-shadow: none;
        }

        &[data-ink=primary] {
            color: ${CssVars.PRIMARY_COLOR};

            &:hover {
                color: ${CssVars.PRIMARY_COLOR};
            }

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.PRIMARY_COLOR};
                fill: ${CssVars.PRIMARY_COLOR};
            }
        }

        &[data-ink=danger] {
            color: ${CssVars.DANGER_COLOR};

            &:hover {
                color: ${CssVars.DANGER_COLOR};
            }

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.DANGER_COLOR};
                fill: ${CssVars.DANGER_COLOR};
            }
        }

        &[data-ink=success] {
            color: ${CssVars.SUCCESS_COLOR};

            &:hover {
                color: ${CssVars.SUCCESS_COLOR};
            }

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.SUCCESS_COLOR};
                fill: ${CssVars.SUCCESS_COLOR};
            }
        }

        &[data-ink=warn] {
            color: ${CssVars.WARN_COLOR};

            &:hover {
                color: ${CssVars.WARN_COLOR};
            }

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.WARN_COLOR};
                fill: ${CssVars.WARN_COLOR};
            }
        }

        &[data-ink=info] {
            color: ${CssVars.INFO_COLOR};

            &:hover {
                color: ${CssVars.INFO_COLOR};
            }

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.INFO_COLOR};
                fill: ${CssVars.INFO_COLOR};
            }
        }

        &[data-ink=waive] {
            color: ${CssVars.WAIVE_COLOR};

            &:hover {
                color: ${CssVars.WAIVE_COLOR};
            }

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.WAIVE_COLOR};
                fill: ${CssVars.WAIVE_COLOR};
            }
        }

        > span[data-w=d9-deco-lead],
        > span[data-w=d9-deco-tail] {
            color: ${CssVars.FONT_COLOR};
            fill: ${CssVars.FONT_COLOR};
        }
    }

    &[data-fill=plain] {
        background-color: transparent;
        border-color: ${CssVars.PRIMARY_COLOR};

        &[data-ink=primary] {
            color: ${CssVars.PRIMARY_COLOR};
            border-color: ${CssVars.PRIMARY_COLOR};

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.PRIMARY_COLOR};
                fill: ${CssVars.PRIMARY_COLOR};
            }
        }

        &[data-ink=danger] {
            color: ${CssVars.DANGER_COLOR};
            border-color: ${CssVars.DANGER_COLOR};

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.DANGER_COLOR};
                fill: ${CssVars.DANGER_COLOR};
            }
        }

        &[data-ink=success] {
            color: ${CssVars.SUCCESS_COLOR};
            border-color: ${CssVars.SUCCESS_COLOR};

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.SUCCESS_COLOR};
                fill: ${CssVars.SUCCESS_COLOR};
            }
        }

        &[data-ink=warn] {
            color: ${CssVars.WARN_COLOR};
            border-color: ${CssVars.WARN_COLOR};

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.WARN_COLOR};
                fill: ${CssVars.WARN_COLOR};
            }
        }

        &[data-ink=info] {
            color: ${CssVars.INFO_COLOR};
            border-color: ${CssVars.INFO_COLOR};

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.INFO_COLOR};
                fill: ${CssVars.INFO_COLOR};
            }
        }

        &[data-ink=waive] {
            color: ${CssVars.WAIVE_COLOR};
            border-color: ${CssVars.WAIVE_COLOR};

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.WAIVE_COLOR};
                fill: ${CssVars.WAIVE_COLOR};
            }
        }
    }

    &[disabled], &[data-disabled=true] {
        cursor: default;
        color: ${CssVars.WAIVE_COLOR};
        border-color: ${CssVars.DISABLE_COLOR};
        background-color: ${CssVars.DISABLE_COLOR};

        &[data-fill=plain], &[data-fill=plain][data-ink] {
            border-color: ${CssVars.WAIVE_COLOR};
        }

        &[data-fill=link], &[data-fill=link][data-ink] {
            border-color: transparent;
            background-color: transparent;
        }

        &[data-fill=link], &[data-fill=link][data-ink],
        &[data-fill=plain], &[data-fill=plain][data-ink] {
            color: ${CssVars.WAIVE_COLOR};

            &:hover, &:focus, &:active {
                box-shadow: none;
            }

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.WAIVE_COLOR};
                fill: ${CssVars.WAIVE_COLOR};
            }
        }

        &:hover, &:focus, &:active {
            box-shadow: none;
        }

        > span[data-w=d9-deco-lead],
        > span[data-w=d9-deco-tail] {
            color: ${CssVars.WAIVE_COLOR};
            fill: ${CssVars.WAIVE_COLOR};
        }
    }

    &[data-visible=false] {
        display: none;
    }

    > span[data-w=d9-deco-lead],
    > span[data-w=d9-deco-tail] {
        color: ${CssVars.INVERT_COLOR};
        fill: ${CssVars.INVERT_COLOR};
    }

    > svg:first-child:not(:last-child) {
        margin-right: ${CssVars.BUTTON_ICON_GAP};
    }

    > span[data-role=text] {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    > svg:last-child:not(:first-child) {
        margin-left: ${CssVars.BUTTON_ICON_GAP};
    }
`;
const Decorator$2 = qe.span`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    height: ${CssVars.INPUT_HEIGHT};
    min-width: ${CssVars.INPUT_HEIGHT};
    padding: 0 ${CssVars.INPUT_INDENT};
    background-color: transparent;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    > svg {
        height: calc((${CssVars.FONT_SIZE}) * 1.2);
    }
`;
const LeadDecorator$2 = qe(Decorator$2).attrs({
  [DOM_KEY_WIDGET]: "d9-deco-lead"
})`
`;
const TailDecorator$2 = qe(Decorator$2).attrs({
  [DOM_KEY_WIDGET]: "d9-deco-tail"
})`
`;
const Button = reactExports.forwardRef((props, ref) => {
  const { head, text, tail, ink = ButtonInk.PRIMARY, fill = ButtonFill.FILL, click, leads, tails, tip, $wrapped, ...rest } = props;
  const { $root, $model, $p2r, $avs: { $disabled, $visible }, $vfs } = $wrapped;
  const globalHandlers = useGlobalHandlers();
  const buttonRef = reactExports.useRef(null);
  useDualRefs(buttonRef, ref);
  useTip({ ref: buttonRef, ...buildTip({ tip, root: $root, model: $model }) });
  const onClicked = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if ($disabled) {
      return;
    }
    const $mightInArray$wrapped = $wrapped;
    click && await click({
      root: $root,
      model: $model,
      $arrayHolder: $mightInArray$wrapped.$arrayHolder,
      $array: $mightInArray$wrapped.$array,
      validators: $vfs,
      global: globalHandlers
    }, event);
  };
  const transformedLeads = transformDecorators(leads);
  const transformedTails = transformDecorators(tails);
  const hasNoText = text == null || VUtils.isPrimitive(text) && VUtils.isBlank(text);
  const hasNoHead = head == null || VUtils.isPrimitive(head) && VUtils.isBlank(head);
  const hasNoTail = tail == null || VUtils.isPrimitive(tail) && VUtils.isBlank(tail);
  const hasOneLeadOrTail = hasNoText && hasNoHead && hasNoTail && [...transformedLeads, ...transformedTails].length === 1;
  return React.createElement(
    AButton,
    { ...rest, "data-ink": ink, "data-fill": fill, "data-disabled": $disabled ?? false, "data-visible": $visible, hasOneLeadOrTail, onClick: onClicked, id: PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id), ref: buttonRef },
    transformedLeads.map((lead, index) => {
      return React.createElement(LeadDecorator$2, { key: index }, lead);
    }),
    head,
    hasNoText ? null : React.createElement("span", { "data-role": "text" }, toIntlLabel(text)),
    tail,
    transformedTails.map((tail2, index) => {
      return React.createElement(TailDecorator$2, { key: index }, tail2);
    })
  );
});
const Link = reactExports.forwardRef((props, ref) => {
  return React.createElement(Button, { ...props, fill: ButtonFill.LINK, ref });
});
registerWidget({ key: "Button", JSX: Button, container: false, array: false });
registerWidget({ key: "Link", JSX: Link, container: false, array: false });
const UnwrappedButton = reactExports.forwardRef((props, ref) => {
  const { onClick, ink = ButtonInk.PRIMARY, fill = ButtonFill.FILL, children, disabled, visible, ...rest } = props;
  const $onValueChange = VUtils.noop;
  const $avs = { $disabled: disabled, $visible: visible };
  const $root = {};
  const click = (options, event) => {
    if (onClick) {
      onClick(event);
    }
  };
  return React.createElement(Button, { ...rest, ink, fill, "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, text: children, click, id: rest.id ?? VUtils.generateUniqueId(), ref });
});
reactExports.forwardRef((props, ref) => {
  const { onClick, ink = ButtonInk.PRIMARY, children, disabled, visible, ...rest } = props;
  const $onValueChange = VUtils.noop;
  const $avs = { $disabled: disabled, $visible: visible };
  const $root = {};
  const click = (options, event) => {
    if (onClick) {
      onClick(event);
    }
  };
  return React.createElement(Link, { ...rest, ink, "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, text: children, click, id: rest.id ?? VUtils.generateUniqueId(), ref });
});
const AlertContainer = qe.div.attrs(({ visible }) => {
  return {
    [DOM_KEY_WIDGET]: "alert",
    style: {
      opacity: visible ? 1 : void 0,
      pointerEvents: visible ? "auto" : void 0
    }
  };
})`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    opacity: 0;
    pointer-events: none;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    z-index: ${CssVars.ALERT_Z_INDEX};
`;
const AlertDialog = qe.div.attrs(({ visible }) => {
  return {
    [DOM_KEY_WIDGET]: "alert-dialog",
    style: {
      transform: visible ? "none" : void 0
    }
  };
})`
    display: flex;
    flex-direction: column;
    width: ${CssVars.ALERT_WIDTH};
    margin-top: ${CssVars.ALERT_MARGIN_TOP};
    margin-left: ${CssVars.ALERT_MARGIN_LEFT};
    padding: ${CssVars.ALERT_PADDING};
    background-color: ${CssVars.BACKGROUND_COLOR};
    border-radius: ${CssVars.BORDER_RADIUS};
    box-shadow: ${CssVars.DIALOG_SHADOW};
    transform: scale(0.75);
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
`;
const AlertBody = qe.div.attrs({ [DOM_KEY_WIDGET]: "alert-body", "data-v-scroll": "" })`
    flex-grow: 1;
    min-height: ${CssVars.ALERT_MIN_HEIGHT};
    max-height: ${CssVars.ALERT_MAX_HEIGHT};
    margin-bottom: ${CssVars.ALERT_MARGIN_BOTTOM};
    overflow: auto;
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    color: ${CssVars.CAPTION_FONT_COLOR};
`;
const AlertFooter = qe.div.attrs({ [DOM_KEY_WIDGET]: "alert-footer" })`
    display: flex;
    justify-content: flex-end;
`;
const AlertLabel = qe.span.attrs({ [DOM_KEY_WIDGET]: "alert-label" })`
    font-variant: ${CssVars.FONT_VARIANT};
    min-height: ${CssVars.INPUT_HEIGHT};
`;
const Alert = () => {
  const { on, off, fire } = useGlobalEventBus();
  const [alert, setAlert] = reactExports.useState({ visible: false });
  reactExports.useEffect(() => {
    const show = (content, onHide) => {
      if (alert.visible) {
        return;
      }
      const padding = window.innerWidth - document.body.clientWidth;
      if (padding > 0) {
        document.body.style.paddingRight = `${padding}px`;
      }
      document.body.style.overflowY = "hidden";
      setAlert({ visible: true, content, onHide });
    };
    const hide = () => {
      document.body.style.paddingRight = "";
      document.body.style.overflowY = "";
      const onHide = alert.onHide;
      setAlert({ visible: false, content: alert.content });
      onHide && onHide();
    };
    on(GlobalEventTypes.SHOW_ALERT, show);
    on(GlobalEventTypes.HIDE_ALERT, hide);
    return () => {
      off(GlobalEventTypes.SHOW_ALERT, show);
      off(GlobalEventTypes.HIDE_ALERT, hide);
    };
  }, [on, off, alert.content, alert.onHide, alert.visible]);
  const onHideClicked = () => fire && fire(GlobalEventTypes.HIDE_ALERT);
  return React.createElement(
    AlertContainer,
    { visible: alert.visible },
    React.createElement(
      AlertDialog,
      { visible: alert.visible },
      React.createElement(AlertBody, null, toIntlLabel(alert.content)),
      React.createElement(
        AlertFooter,
        null,
        React.createElement(
          UnwrappedButton,
          { ink: ButtonInk.PRIMARY, onClick: onHideClicked },
          React.createElement(IntlLabel, { keys: ["alert", "confirm"], value: "Ok" })
        )
      )
    )
  );
};
const DialogContainer = qe.div.attrs(({ visible }) => {
  return {
    [DOM_KEY_WIDGET]: "dialog",
    style: {
      opacity: visible ? 1 : void 0,
      pointerEvents: visible ? "auto" : void 0
    }
  };
})`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: transparent;
    opacity: 0;
    pointer-events: none;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    z-index: ${CssVars.DIALOG_Z_INDEX};
`;
const DialogWrapper = qe.div.attrs({ [DOM_KEY_WIDGET]: "dialog-wrapper" })`
    margin-top: ${CssVars.DIALOG_MARGIN_TOP};
    margin-left: ${CssVars.DIALOG_MARGIN_LEFT};
    width: ${CssVars.DIALOG_WIDTH};
    padding: ${CssVars.DIALOG_PADDING};
    display: flex;
    flex-direction: column;
    background-color: ${CssVars.BACKGROUND_COLOR};
    border-radius: ${CssVars.BORDER_RADIUS};
    box-shadow: ${CssVars.DIALOG_SHADOW};
`;
const DialogHeader = qe.div.attrs({ [DOM_KEY_WIDGET]: "dialog-header" })`
    display: flex;
    position: relative;
    padding: 0 ${CssVars.DIALOG_HEADER_PADDING};
    min-height: ${CssVars.DIALOG_HEADER_MIN_HEIGHT};
    margin: ${CssVars.DIALOG_HEADER_MARGIN};
    align-items: center;
`;
const DialogTitle = qe.div.attrs({ [DOM_KEY_WIDGET]: "dialog-title" })`
    font-family: ${CssVars.DIALOG_HEADER_FONT_FAMILY};
    font-size: ${CssVars.DIALOG_HEADER_FONT_SIZE};
    text-transform: uppercase;
`;
const DialogBody = qe.div.attrs({ [DOM_KEY_WIDGET]: "dialog-body" })`
    flex-grow: 1;
    min-height: ${CssVars.DIALOG_BODY_MIN_HEIGHT};
`;
const DialogFooter = qe.div.attrs({ [DOM_KEY_WIDGET]: "dialog-footer" })`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    > button {
        :not(:last-child) {
            margin-right: ${CssVars.DIALOG_FOOTER_BUTTON_GAP_SIZE};
        }
    }
`;
const DialogLabel = qe.span.attrs({ [DOM_KEY_WIDGET]: "dialog-label" })`
    font-variant: ${CssVars.FONT_VARIANT};
    line-height: ${CssVars.LINE_HEIGHT};
    min-height: ${CssVars.LINE_HEIGHT};
`;
const YesNoContent = (props) => {
  const { question, onYes, onNo } = props;
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      DialogBody,
      null,
      React.createElement(DialogLabel, null, toIntlLabel(question))
    ),
    React.createElement(
      DialogFooter,
      null,
      React.createElement(
        UnwrappedButton,
        { ink: ButtonInk.PRIMARY, onClick: onYes },
        React.createElement(IntlLabel, { keys: ["dialog", "confirm"], value: "Yes" })
      ),
      React.createElement(
        UnwrappedButton,
        { ink: ButtonInk.WAIVE, onClick: onNo },
        React.createElement(IntlLabel, { keys: ["dialog", "discard"], value: "No" })
      )
    )
  );
};
const YesNoDialog = () => {
  const { fire, on, off } = useGlobalEventBus();
  reactExports.useEffect(() => {
    const show = (question, onYes, onNo) => {
      fire && fire(GlobalEventTypes.SHOW_DIALOG, React.createElement(YesNoContent, { question, onYes, onNo }));
    };
    on(GlobalEventTypes.SHOW_YES_NO_DIALOG, show);
    return () => {
      off(GlobalEventTypes.SHOW_YES_NO_DIALOG, show);
    };
  }, [on, off, fire]);
  return React.createElement(reactExports.Fragment, null);
};
const Dialog = () => {
  const { on, off } = useGlobalEventBus();
  const [dialog, setDialog] = reactExports.useState({ visible: false });
  const [functions] = reactExports.useState({
    show: (content, wrapperStyle) => {
      if (dialog.visible) {
        return;
      }
      const padding = window.innerWidth - document.body.clientWidth;
      if (padding > 0) {
        document.body.style.paddingRight = `${padding}px`;
      }
      document.body.style.overflowY = "hidden";
      setDialog({ visible: true, content, wrapperStyle });
    },
    hide: () => {
      document.body.style.paddingRight = "";
      document.body.style.overflowY = "";
      setDialog(({ content, wrapperStyle }) => {
        return { visible: false, content, wrapperStyle };
      });
    }
  });
  reactExports.useEffect(() => {
    on(GlobalEventTypes.SHOW_DIALOG, functions.show);
    on(GlobalEventTypes.HIDE_DIALOG, functions.hide);
    return () => {
      off(GlobalEventTypes.SHOW_DIALOG, functions.show);
      off(GlobalEventTypes.HIDE_DIALOG, functions.hide);
    };
  }, [on, off, functions.show, functions.hide]);
  const onTransitionEnd = () => {
    if (!dialog.visible) {
      setDialog({ visible: false });
    }
  };
  return React.createElement(
    DialogContainer,
    { visible: dialog.visible, onTransitionEnd },
    React.createElement(DialogWrapper, { style: dialog.wrapperStyle }, dialog.content)
  );
};
const SpinnerKeyFrames = We`
	0% {
		transform : rotate(0deg);
	}
	100% {
		transform : rotate(360deg);
	}
`;
const RemoteRequestContainer = qe.div.attrs(({ visible }) => {
  return {
    [DOM_KEY_WIDGET]: "remote-request",
    style: {
      opacity: visible ? 0.5 : 0
    }
  };
})`
    display: flex;
    position: fixed;
    right: 16px;
    bottom: 16px;
    user-select: none;
    pointer-events: none;
    z-index: ${CssVars.REMOTE_REQUEST_Z_INDEX};
    transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    > svg {
        height: 40px;
        width: 40px;
        animation: 2s linear infinite ${SpinnerKeyFrames};
        fill: ${CssVars.REMOTE_REQUEST_COLOR};
    }
`;
const RemoteRequest = (props) => {
  const { clearAccount, on200: doOn200, on401: doOn401, on403: doOn403 } = props;
  const { on, off, fire } = useGlobalEventBus();
  const [count] = reactExports.useState({ value: 0 });
  const forceUpdate = useForceUpdate();
  reactExports.useEffect(() => {
    const on401 = () => {
      fire && fire(GlobalEventTypes.SHOW_ALERT, React.createElement(AlertLabel, null, "Unauthorized."), () => {
        clearAccount();
        doOn401();
      });
    };
    const on403 = () => {
      fire && fire(GlobalEventTypes.SHOW_ALERT, React.createElement(AlertLabel, null, "Access denied."), () => {
        doOn403();
      });
    };
    const onOtherError = () => {
      fire && fire(GlobalEventTypes.SHOW_ALERT, React.createElement(AlertLabel, null, "Unpredicted error occurred, contact your administrator for more details."));
    };
    const onInvokeRemoteRequest = async (request, success, failure, disableAlert) => {
      count.value = count.value + 1;
      if (count.value === 1) {
        forceUpdate();
      }
      try {
        const data = await request();
        doOn200 && doOn200();
        success && success(data);
      } catch (e) {
        N2Logger.error(e, "RemoteRequest");
        if (!disableAlert) {
          if (e.status === 401) {
            on401();
            return;
          } else if (e.status === 403) {
            on403();
          } else {
            onOtherError();
          }
        }
        failure && failure(e);
      } finally {
        count.value = count.value - 1;
        if (count.value === 0) {
          forceUpdate();
        }
      }
    };
    on(GlobalEventTypes.INVOKE_REMOTE_REQUEST, onInvokeRemoteRequest);
    return () => {
      off(GlobalEventTypes.INVOKE_REMOTE_REQUEST, onInvokeRemoteRequest);
    };
  }, [on, off, fire, forceUpdate, clearAccount, doOn200, doOn401, doOn403, count]);
  return React.createElement(
    RemoteRequestContainer,
    { visible: count.value > 0 },
    React.createElement(Spinner, null)
  );
};
const notInMe = (me, target) => {
  const body = document.body;
  if (target === window) {
    return true;
  }
  let parent = target;
  while (parent != null) {
    if (parent === me) {
      return false;
    }
    if (parent === body || parent == null) {
      return true;
    }
    parent = parent == null ? void 0 : parent.parentElement;
  }
  return true;
};
const useCollapseFixedThing = (options) => {
  const { containerRef, visible = true, hide, events = ["scroll", "focus", "click"] } = options;
  reactExports.useEffect(() => {
    if (!visible) {
      return;
    }
    const collapse = (event) => {
      if ((containerRef == null ? void 0 : containerRef.current) != null && notInMe(containerRef.current, event.target)) {
        hide();
      }
    };
    events.forEach((event) => {
      window.addEventListener(event, collapse, true);
    });
    const collapseOnBlur = () => {
      setTimeout(() => {
        const node = document.querySelector(":focus");
        if (node == null || (containerRef == null ? void 0 : containerRef.current) != null && notInMe(containerRef.current, node)) {
          hide();
        }
      }, 10);
    };
    {
      window.addEventListener("blur", collapseOnBlur, true);
    }
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, collapse, true);
      });
      window.removeEventListener("blur", collapseOnBlur, true);
    };
  }, [containerRef, events, visible, hide]);
};
const TipContainer = qe.div.attrs(({ visible, minWidth, maxWidth, maxHeight, tag, top, left }) => {
  const shown = visible === true && top != null && left != null;
  return {
    [DOM_KEY_WIDGET]: "d9-tip",
    ...VUtils.isNotBlank(tag) ? { [tag]: "" } : {},
    style: {
      "--min-width": toCssSize(minWidth),
      "--max-width": toCssSize(maxWidth),
      "--max-height": toCssSize(maxHeight),
      "--top": toCssSize(top),
      "--left": toCssSize(left),
      opacity: shown ? 1 : 0,
      pointerEvents: shown ? "auto" : "none"
    }
  };
})`
    display: grid;
    position: fixed;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    min-width: var(--min-width);
    max-width: var(--max-width);
    max-height: var(--max-height);
    top: var(--top);
    left: var(--left);
    background-color: ${CssVars.BACKGROUND_COLOR};
    border: ${CssVars.TIP_BORDER};
    border-radius: ${CssVars.TIP_BORDER_RADIUS};
    box-shadow: ${CssVars.TIP_SHADOW};
    z-index: ${CssVars.TIP_Z_INDEX};
    overflow: hidden;
`;
const TipHeader = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-tip-header" })`
    display: flex;
    position: relative;
    align-items: center;
    height: ${CssVars.TIP_HEADER_HEIGHT};
    min-height: ${CssVars.TIP_HEADER_HEIGHT};
    border-bottom: ${CssVars.TIP_HEADER_BORDER};
`;
const TipTitle = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-tip-header-title" })`
    display: flex;
    position: relative;
    align-items: center;
    flex-grow: 1;
    font-family: ${CssVars.CAPTION_FONT_FAMILY};
    font-size: ${CssVars.TIP_HEADER_FONT_SIZE};
    font-weight: ${CssVars.TIP_HEADER_FONT_WEIGHT};
    color: ${CssVars.CAPTION_FONT_COLOR};
    padding: 0 ${CssVars.TIP_HEADER_PADDING};
`;
const TipBody = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-tip-body" })`
    display: flex;
    position: relative;
    padding: 0 ${CssVars.TIP_BODY_PADDING};
`;
const TipLabel = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-tip-label" })`
    display: flex;
    position: relative;
    align-items: center;
    min-height: ${CssVars.INPUT_HEIGHT};
    line-height: ${CssVars.LINE_HEIGHT};
    padding: calc((${CssVars.INPUT_HEIGHT} - ${CssVars.LINE_HEIGHT}) / 2) 0;
`;
const buildTip = (options) => {
  const { tip, ...rest } = options;
  if (tip == null) {
    return {};
  } else if (typeof tip === "function") {
    return tip(rest);
  } else {
    return tip;
  }
};
const Tip = () => {
  const { on, off } = useGlobalEventBus();
  const ref = reactExports.useRef(null);
  const [state, setState] = reactExports.useState({ visible: "hidden" });
  const { replace } = useThrottler();
  reactExports.useEffect(() => {
    const paint = (options, keepPosition) => {
      replace(() => {
        const { ref: ref2, prefix = "data" } = options;
        const { current: node } = ref2;
        if (node == null) {
          return;
        }
        const body = options.body ?? node.getAttribute(`${prefix}-tip-body`);
        if (VUtils.isBlank(body)) {
          return;
        }
        const title = options.title ?? node.getAttribute(`${prefix}-tip-title`);
        const minWidth = options.minWidth ?? node.getAttribute(`${prefix}-tip-min-width`);
        const maxWidth = options.maxWidth ?? node.getAttribute(`${prefix}-tip-max-width`);
        const maxHeight = options.maxHeight ?? node.getAttribute(`${prefix}-tip-max-height`);
        const delay = (() => {
          const value = options.delay ?? node.getAttribute(`${prefix}-tip-delay`);
          const ret = VUtils.isNumber(value);
          return ret.test ? ret.value : void 0;
        })();
        const tag = options.tag ?? node.getAttribute(`${prefix}-tip-tag`);
        setState((state2) => {
          if (state2.hideTimeout) {
            window.clearTimeout(state2.hideTimeout);
          }
          return {
            ref: ref2,
            title,
            body,
            visible: "ready",
            minWidth,
            maxWidth,
            maxHeight,
            delay,
            tag,
            ...keepPosition ? { top: state2.top, left: state2.left } : {}
          };
        });
      }, 30);
    };
    const onShowTip = (options) => paint(options, false);
    const onRepaintTip = (options) => paint(options, true);
    const onHideTip = (ref2) => {
      var _a;
      if (ref2.current !== ((_a = state.ref) == null ? void 0 : _a.current)) {
        return;
      } else {
        setState((state2) => {
          if (state2.hideTimeout) {
            window.clearTimeout(state2.hideTimeout);
          }
          return { visible: "hidden" };
        });
      }
    };
    on(GlobalEventTypes.SHOW_TIP, onShowTip);
    on(GlobalEventTypes.HIDE_TIP, onHideTip);
    on(GlobalEventTypes.REPAINT_TIP, onRepaintTip);
    return () => {
      off(GlobalEventTypes.SHOW_TIP, onShowTip);
      off(GlobalEventTypes.HIDE_TIP, onHideTip);
      off(GlobalEventTypes.REPAINT_TIP, onRepaintTip);
    };
  }, [on, off, replace, state.ref]);
  reactExports.useEffect(() => {
    if (state.ref != null && state.visible === "ready") {
      const { top, left, width, height } = state.ref.current.getBoundingClientRect();
      const { width: myWidth, height: myHeight } = ref.current.getBoundingClientRect();
      const { top: myTop } = (() => {
        if (top - myHeight - 6 >= 0) {
          return { top: top - myHeight - 4, onTop: true };
        } else if (top + height + myHeight + 6 < window.innerHeight) {
          return { top: top + height + 4, onTop: false };
        } else {
          return { top: top - myHeight - 4, onTop: true };
        }
      })();
      const myLeft = (() => {
        if (width > myWidth) {
          return left + (width - myWidth) / 2;
        } else {
          return left - (myWidth - width) / 2;
        }
      })();
      const hideTimeout = (() => {
        if (state.delay != null) {
          return setTimeout(() => setState({ visible: "hidden" }), state.delay * 1e3);
        } else {
          return void 0;
        }
      })();
      setState((state2) => ({ ...state2, visible: "visible", top: myTop, left: myLeft, hideTimeout }));
    }
  }, [on, off, state.ref, state.visible, state.delay]);
  useCollapseFixedThing({
    containerRef: state.ref,
    visible: state.visible !== "hidden",
    hide: () => {
      if (state.hideTimeout) {
        window.clearTimeout(state.hideTimeout);
      }
      setState({ visible: "hidden" });
    }
  });
  if (state.ref == null) {
    return null;
  }
  return React.createElement(
    TipContainer,
    { visible: state.visible !== "hidden", minWidth: state.minWidth, maxWidth: state.maxWidth, maxHeight: state.maxHeight, tag: state.tag, top: state.top, left: state.left, ref },
    state.title != null ? React.createElement(
      TipHeader,
      null,
      React.createElement(TipTitle, null, toIntlLabel(state.title))
    ) : null,
    React.createElement(TipBody, null, typeof state.body === "string" ? React.createElement(TipLabel, null, toIntlLabel(state.body)) : state.body)
  );
};
const useTip = (options) => {
  const { ref } = options;
  const { fire } = useGlobalEventBus();
  const shown = reactExports.useRef(false);
  const { replace } = useThrottler();
  reactExports.useEffect(() => {
    if (ref.current == null || fire == null) {
      return;
    }
    const show = () => {
      replace(() => {
        if (shown.current === true) {
          fire(GlobalEventTypes.REPAINT_TIP, options);
        } else {
          fire(GlobalEventTypes.SHOW_TIP, options);
          shown.current = true;
        }
      }, 30);
    };
    const hide = () => {
      replace(() => {
        shown.current = false;
        fire(GlobalEventTypes.HIDE_TIP, ref);
      }, 30);
    };
    const onMouseEnter = show;
    const onMouseLeave = hide;
    const onFocusIn = show;
    const onFocusOut = hide;
    const onClick = show;
    const { current } = ref;
    current.addEventListener("mouseenter", onMouseEnter);
    current.addEventListener("mouseleave", onMouseLeave);
    current.addEventListener("focusin", onFocusIn);
    current.addEventListener("focusout", onFocusOut);
    current.addEventListener("click", onClick);
    if (shown.current === true) {
      replace(() => {
        fire(GlobalEventTypes.REPAINT_TIP, options);
      }, 70);
    }
    return () => {
      current.removeEventListener("mouseenter", onMouseEnter);
      current.removeEventListener("mouseleave", onMouseLeave);
      current.removeEventListener("focusin", onFocusIn);
      current.removeEventListener("focusout", onFocusOut);
      current.removeEventListener("click", onClick);
    };
  }, [fire, replace, ref, options]);
};
const useRemoteRequest = () => {
  const { fire } = useGlobalEventBus();
  const [functions] = reactExports.useState(() => {
    const doRemoteRequest = async (request, disableAlert) => {
      return new Promise((resolve, reject) => {
        if (fire == null) {
          reject();
        } else {
          fire && fire(GlobalEventTypes.INVOKE_REMOTE_REQUEST, request, resolve, reject, disableAlert);
        }
      });
    };
    return {
      request: doRemoteRequest,
      neverFailRequest: async (request, disableAlert) => {
        try {
          const result = await doRemoteRequest(request, disableAlert);
          return { failed: false, result };
        } catch (error) {
          return { failed: true, error };
        }
      }
    };
  });
  return functions;
};
const useAlert = () => {
  const { fire } = useGlobalEventBus();
  const [functions] = reactExports.useState(() => {
    return {
      show: async (content) => {
        return new Promise((resolve) => {
          if (fire == null) {
            resolve();
          } else {
            fire && fire(GlobalEventTypes.SHOW_ALERT, content, resolve);
          }
        });
      },
      hide: () => {
        fire && fire(GlobalEventTypes.HIDE_ALERT);
      }
    };
  });
  return functions;
};
const useDialog = () => {
  const { fire } = useGlobalEventBus();
  const [functions] = reactExports.useState(() => {
    return {
      show: (content, wrapperStyle) => {
        fire && fire(GlobalEventTypes.SHOW_DIALOG, content, wrapperStyle);
      },
      hide: () => {
        fire && fire(GlobalEventTypes.HIDE_DIALOG);
      }
    };
  });
  return functions;
};
const useYesNoDialog = () => {
  const { fire } = useGlobalEventBus();
  const [functions] = reactExports.useState(() => {
    return {
      show: async (content) => {
        return new Promise((resolve, reject) => {
          if (fire == null) {
            reject();
          } else {
            fire && fire(GlobalEventTypes.SHOW_YES_NO_DIALOG, content, resolve, reject);
          }
        });
      },
      hide: () => {
        fire && fire(GlobalEventTypes.HIDE_DIALOG);
      }
    };
  });
  return functions;
};
var GlobalEventPrefix;
(function(GlobalEventPrefix2) {
  GlobalEventPrefix2["ALERT"] = "alert";
  GlobalEventPrefix2["DIALOG"] = "dialog";
  GlobalEventPrefix2["TAB"] = "tab";
  GlobalEventPrefix2["WIZARD_STEP"] = "wstep";
  GlobalEventPrefix2["EXPAND_SECTION"] = "expand-section";
  GlobalEventPrefix2["COLLAPSE_SECTION"] = "collapse-section";
  GlobalEventPrefix2["REFRESH_TREE"] = "refresh-tree";
  GlobalEventPrefix2["REFRESH_TREE_NODE"] = "refresh-tree-node";
  GlobalEventPrefix2["REFRESH_TREE_CHILD_NODES"] = "refresh-tree-child-nodes";
  GlobalEventPrefix2["RECALC_TREE_CHILD_NODES"] = "recalc-tree-child-nodes";
  GlobalEventPrefix2["REFRESH_TREE_NODE_AND_CHILDREN"] = "refresh-tree-node-and-children";
  GlobalEventPrefix2["RECALC_TREE_NODE_AND_CHILDREN"] = "recalc-tree-node-and-children";
  GlobalEventPrefix2["EXPAND_TREE_NODE"] = "expand-tree-node";
  GlobalEventPrefix2["COLLAPSE_TREE_NODE"] = "collapse-tree-node";
  GlobalEventPrefix2["EXPAND_RIBS_ELEMENT"] = "expand-ribs-element";
  GlobalEventPrefix2["COLLAPSE_RIBS_ELEMENT"] = "collapse-ribs-element";
  GlobalEventPrefix2["EXPAND_TABLE_ROW"] = "expand-table-row";
  GlobalEventPrefix2["COLLAPSE_TABLE_ROW"] = "collapse-table-row";
  GlobalEventPrefix2["CUSTOM"] = "custom";
  GlobalEventPrefix2["SECTION_EXPANDED"] = "section-expanded";
  GlobalEventPrefix2["SECTION_COLLAPSED"] = "section-collapsed";
  GlobalEventPrefix2["TAB_CHANGED"] = "tab-changed";
  GlobalEventPrefix2["WIZARD_STEP_CHANGED"] = "wstep-changed";
  GlobalEventPrefix2["TREE_NODE_CLICKED"] = "tree-node-clicked";
  GlobalEventPrefix2["TREE_NODE_DOUBLE_CLICKED"] = "tree-node-double-clicked";
  GlobalEventPrefix2["TREE_NODE_CONTEXT_MENU"] = "tree-node-context-menu";
})(GlobalEventPrefix || (GlobalEventPrefix = {}));
const useCustomGlobalEvent = () => {
  const { fire } = useGlobalEventBus();
  const [func] = reactExports.useState(() => {
    return async (key, prefix, clipped, models) => {
      return new Promise((resolve) => {
        fire && fire(GlobalEventTypes.CUSTOM_EVENT, key, prefix, clipped, models);
        resolve();
      });
    };
  });
  return func;
};
const useSimpleCustomGlobalEvent = () => {
  const { fire } = useGlobalEventBus();
  const [func] = reactExports.useState(() => {
    return async (prefix, clipped, models) => {
      return new Promise((resolve) => {
        fire && fire(GlobalEventTypes.CUSTOM_EVENT, `${prefix}:${clipped ?? ""}`, prefix, clipped, models);
        resolve();
      });
    };
  });
  return func;
};
const useGlobalHandlers = () => {
  const alert = useAlert();
  const dialog = useDialog();
  const yesNoDialog = useYesNoDialog();
  const remoteRequest = useRemoteRequest();
  const customEvent = useCustomGlobalEvent();
  const scEvent = useSimpleCustomGlobalEvent();
  const { fire } = useRootEventBus() ?? {};
  const [handlers] = reactExports.useState({
    alert,
    dialog,
    yesNoDialog,
    remoteRequest,
    custom: customEvent,
    sc: scEvent,
    root: fire == null ? void 0 : { fire }
  });
  return handlers;
};
const GlobalRoot = (props) => {
  const { avoidDefaultAlert = false, avoidDefaultDialog = false, avoidDefaultYesNoDialog = false, avoidDefaultRemoteRequest = false, avoidDefaultTips = false, defaultRemoteRequestProps: { clearAccount = VUtils.noop, on200, on401 = VUtils.noop, on403 = VUtils.noop } = {}, children } = props;
  return React.createElement(
    GlobalEventBusProvider,
    null,
    avoidDefaultAlert ? null : React.createElement(Alert, null),
    avoidDefaultDialog ? null : React.createElement(Dialog, null),
    avoidDefaultYesNoDialog ? null : React.createElement(YesNoDialog, null),
    avoidDefaultTips ? null : React.createElement(Tip, null),
    avoidDefaultRemoteRequest ? null : React.createElement(RemoteRequest, { clearAccount, on200, on401, on403 }),
    children
  );
};
var index$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Alert,
  AlertLabel,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogLabel,
  DialogTitle,
  GlobalEventBusProvider,
  get GlobalEventPrefix() {
    return GlobalEventPrefix;
  },
  get GlobalEventTypes() {
    return GlobalEventTypes;
  },
  GlobalRoot,
  RemoteRequest,
  Tip,
  TipBody,
  TipContainer,
  TipHeader,
  TipLabel,
  TipTitle,
  YesNoDialog,
  buildTip,
  useAlert,
  useCustomGlobalEvent,
  useDialog,
  useGlobalEventBus,
  useGlobalHandlers,
  useRemoteRequest,
  useSimpleCustomGlobalEvent,
  useTip,
  useYesNoDialog
});
const toIntlLabel = (text, ...replacements) => {
  if (typeof text === "string") {
    return React.createElement(IntlLabel, { keys: [`${text}`], value: text, replacements });
  } else {
    return text;
  }
};
const useLanguage = () => {
  const { on, off } = useGlobalEventBus();
  const forceUpdate = useForceUpdate();
  reactExports.useEffect(() => {
    const onLanguageChanged = () => {
      forceUpdate();
    };
    on && on(GlobalEventTypes.LANGUAGE_CHANGED, onLanguageChanged);
    return () => {
      off && off(GlobalEventTypes.LANGUAGE_CHANGED, onLanguageChanged);
    };
  }, [on, off, forceUpdate]);
};
const replaceTemplate = (template, values) => {
  values = values ?? [];
  for (let index = 0; index < values.length; index++) {
    template = template.replace(new RegExp("\\{" + index + "\\}", "g"), `${values[index] ?? ""}`);
  }
  return template;
};
const internationalize = (label, keys) => {
  var _a;
  let found = label;
  if (keys != null && keys.length !== 0) {
    const language = locale();
    const key = [...keys].join(".");
    if (VUtils.isBlank(key)) {
      return label;
    } else {
      const possible = (_a = $d9n2.intl.labels[language]) == null ? void 0 : _a[key];
      if (possible != null && typeof possible == "string") {
        found = possible;
      } else {
        found = MUtils.getValue($d9n2.intl.labels, `${language}.${key}`);
      }
      if (found == null || VUtils.isBlank(found)) {
        return label;
      } else {
        return found;
      }
    }
  } else {
    return label;
  }
};
const IntlLabel = (props) => {
  const { keys, value, replacements } = props;
  useLanguage();
  let label = replaceTemplate(internationalize("", keys) ?? "", replacements);
  label = VUtils.isBlank(label) ? value : label;
  return React.createElement(React.Fragment, null, label);
};
const transformDecorator = (decorator) => {
  if (typeof decorator === "string") {
    if (decorator.startsWith(ICON_PREFIX)) {
      const Found = IconsRegistrar.find(decorator.substring(ICON_PREFIX.length), decorator);
      if (typeof Found === "function") {
        return React.createElement(Found, null);
      }
    } else {
      return React.createElement(IntlLabel, { keys: [decorator], value: decorator });
    }
  }
  return decorator;
};
const transformDecorators = (decorators) => {
  return (decorators ?? []).filter((decorator) => decorator != null).map(transformDecorator);
};
var OptionItemSort;
(function(OptionItemSort2) {
  OptionItemSort2[OptionItemSort2["ASC"] = 0] = "ASC";
  OptionItemSort2[OptionItemSort2["DESC"] = 1] = "DESC";
})(OptionItemSort || (OptionItemSort = {}));
const NO_OPTION_ITEM = [];
const NO_MATCHED_OPTION_ITEM = "__no_matched__";
const NO_AVAILABLE_OPTION_ITEM = "__no_available__";
const REACTION_REFRESH_OPTIONS = "reaction-refresh-options";
const useOptionItems = (props) => {
  const { options = NO_OPTION_ITEM, noAvailable, $wrapped: { $root, $model } } = props;
  const globalHandlers = useGlobalHandlers();
  const { on: onGlobal, off: offGlobal } = useGlobalEventBus();
  const { on, off } = useWrapperEventBus();
  const [candidates, setCandidates] = reactExports.useState(() => {
    return { initialized: false, options: NO_OPTION_ITEM };
  });
  reactExports.useEffect(() => {
    if (!candidates.initialized) {
      if (VUtils.isFunction(options)) {
        (async () => {
          setCandidates({
            initialized: true,
            options: await options({ root: $root, model: $model, global: globalHandlers })
          });
        })();
      } else {
        setCandidates({ initialized: true, options: options ?? NO_OPTION_ITEM });
      }
    } else if (!VUtils.isFunction(options) && options !== candidates.options) {
      setCandidates({ initialized: true, options });
    }
  }, [globalHandlers, candidates.initialized, candidates.options, options, $root, $model]);
  reactExports.useEffect(() => {
    if (on != null && off != null) {
      const onUnhandledReactionOccurred = (command) => {
        if (command !== REACTION_REFRESH_OPTIONS) {
          return;
        }
        setCandidates((candidates2) => ({ initialized: false, options: candidates2.options }));
      };
      const onLanguageChanged = () => {
        setCandidates((candidates2) => ({ initialized: false, options: candidates2.options }));
      };
      on(WrapperEventTypes.UNHANDLED_REACTION_OCCURRED, onUnhandledReactionOccurred);
      onGlobal && onGlobal(GlobalEventTypes.LANGUAGE_CHANGED, onLanguageChanged);
      return () => {
        off(WrapperEventTypes.UNHANDLED_REACTION_OCCURRED, onUnhandledReactionOccurred);
        offGlobal && offGlobal(GlobalEventTypes.LANGUAGE_CHANGED, onLanguageChanged);
      };
    }
  }, [on, off, onGlobal, offGlobal]);
  const askOptions = () => {
    return candidates.initialized ? candidates.options : VUtils.isFunction(options) ? NO_OPTION_ITEM : options ?? NO_OPTION_ITEM;
  };
  const createAskDisplayOptions = (shouldTakeOver, takeOver) => {
    return () => {
      const options2 = askOptions();
      if (options2.length === 0) {
        return [{ value: NO_AVAILABLE_OPTION_ITEM, label: toIntlLabel(noAvailable) }];
      }
      if (shouldTakeOver != null && shouldTakeOver()) {
        return takeOver != null ? takeOver(options2) : options2;
      } else {
        return options2;
      }
    };
  };
  return { askOptions, createAskDisplayOptions };
};
const Context$6 = reactExports.createContext({});
Context$6.displayName = "TreeEventBus";
const TreeEventBusProvider = (props) => {
  const { children } = props;
  const bus = useCreateEventBus("tree");
  return React.createElement(Context$6.Provider, { value: bus }, children);
};
const useTreeEventBus = () => reactExports.useContext(Context$6);
var TreeEventTypes;
(function(TreeEventTypes2) {
  TreeEventTypes2["OPEN_SEARCH_BOX"] = "switch-search-box";
  TreeEventTypes2["HIDE_SEARCH_BOX"] = "hide-search-box";
  TreeEventTypes2["DISCARD_FILTER"] = "discard-filter";
  TreeEventTypes2["FILTER_CHANGED"] = "filter-changed";
  TreeEventTypes2["ASK_MARKER_ADDER"] = "ask-marker-adder";
  TreeEventTypes2["SCROLL_NODE_INTO_VIEW"] = "scroll-node-into-view";
  TreeEventTypes2["SHOW_HOVER_BOX"] = "show-hover-box";
  TreeEventTypes2["HIDE_HOVER_BOX"] = "hide-hover-box";
  TreeEventTypes2["CONTENT_MOUSE_MOVE"] = "content-mouse-move";
  TreeEventTypes2["CONTENT_MOUSE_LEAVE"] = "content-mouse-leave";
  TreeEventTypes2["ASK_MOUSE_POSITION"] = "ask-mouse-position";
})(TreeEventTypes || (TreeEventTypes = {}));
const Context$5 = reactExports.createContext({});
Context$5.displayName = "TreeNodeEventBus";
const TreeNodeEventBusProvider = (props) => {
  const { children } = props;
  const bus = useCreateEventBus("tree-node");
  return React.createElement(Context$5.Provider, { value: bus }, children);
};
const useTreeNodeEventBus = () => reactExports.useContext(Context$5);
var TreeNodeEventTypes;
(function(TreeNodeEventTypes2) {
  TreeNodeEventTypes2["SWITCH_MY_EXPAND"] = "switch-my-expand";
  TreeNodeEventTypes2["SWITCH_MY_EXPAND_FROM_CHILD"] = "switch-my-expand-from-child";
  TreeNodeEventTypes2["SWITCH_PARENT_EXPAND"] = "switch-parent-expand";
  TreeNodeEventTypes2["SWITCH_MY_CHECKED"] = "switch-my-checked";
  TreeNodeEventTypes2["SWITCH_MY_CHECKED_FROM_CHILD"] = "switch-my-checked-from-child";
  TreeNodeEventTypes2["SWITCH_CHILDREN_CHECKED"] = "switch-children-checked";
  TreeNodeEventTypes2["SWITCH_PARENT_CHECKED"] = "switch-parent-checked";
  TreeNodeEventTypes2["REFRESH_NODE"] = "refresh-node";
  TreeNodeEventTypes2["REFRESH_CHILD_NODES"] = "refresh-child-nodes";
  TreeNodeEventTypes2["REFRESH_CHILD_NODES_ON_REMOVED"] = "refresh-child-nodes-on-removed";
  TreeNodeEventTypes2["CHILD_ADDED"] = "child-added";
  TreeNodeEventTypes2["CHILD_PLACEHOLDER_REPLACED"] = "child-placeholder-replaced";
  TreeNodeEventTypes2["CHILD_PLACEHOLDER_REMOVED"] = "child-placeholder-removed";
  TreeNodeEventTypes2["NODE_REMOVED"] = "node-removed";
})(TreeNodeEventTypes || (TreeNodeEventTypes = {}));
const TreeNodeEventBridge = (props) => {
  const { node, expandParent, nodeCheckedChanged, nodeRemoved } = props;
  const { on, off } = useTreeNodeEventBus();
  reactExports.useEffect(() => {
    const onExpandParent = (_marker, expanded) => {
      if (expanded) {
        expandParent(expanded);
      }
    };
    const onNodeCheckedChanged = (_marker, checked) => {
      nodeCheckedChanged(checked);
    };
    const onNodeRemoved = (_marker, removedNode) => {
      nodeRemoved(removedNode);
    };
    on && on(TreeNodeEventTypes.SWITCH_PARENT_EXPAND, onExpandParent);
    on && on(TreeNodeEventTypes.SWITCH_PARENT_CHECKED, onNodeCheckedChanged);
    on && on(TreeNodeEventTypes.NODE_REMOVED, onNodeRemoved);
    return () => {
      off && off(TreeNodeEventTypes.SWITCH_PARENT_EXPAND, onExpandParent);
      off && off(TreeNodeEventTypes.SWITCH_PARENT_CHECKED, onNodeCheckedChanged);
      off && off(TreeNodeEventTypes.NODE_REMOVED, onNodeRemoved);
    };
  }, [on, off, node, expandParent, nodeCheckedChanged, nodeRemoved]);
  return React.createElement(reactExports.Fragment, null);
};
const ACaption = qe.span.attrs(({ id, [DOM_KEY_WIDGET]: dataW }) => {
  return {
    [DOM_KEY_WIDGET]: dataW ?? "d9-caption",
    [DOM_ID_WIDGET]: id
  };
})`
    display: flex;
    position: relative;
    align-items: center;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    font-family: ${CssVars.CAPTION_FONT_FAMILY};
    font-size: ${CssVars.CAPTION_FONT_SIZE};
    color: ${CssVars.CAPTION_FONT_COLOR};
    height: ${CssVars.INPUT_HEIGHT};
    background-color: transparent;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &[data-visible=false] {
        display: none;
    }

    &[data-clickable=true] {
        cursor: pointer;
        text-decoration: underline;
    }

    &[data-w=d9-badge] {
        justify-content: center;
        height: calc(${CssVars.INPUT_HEIGHT} / 4 * 3);
        border-radius: calc(${CssVars.INPUT_HEIGHT} / 8 * 3);
        padding: 0 ${CssVars.INPUT_INDENT};

        &[data-fill=fill] {
            background-color: ${CssVars.PRIMARY_COLOR};
            color: ${CssVars.INVERT_COLOR};
            fill: ${CssVars.INVERT_COLOR};

            &[data-ink=primary] {
                background-color: ${CssVars.PRIMARY_COLOR};
            }

            &[data-ink=danger] {
                background-color: ${CssVars.DANGER_COLOR};
            }

            &[data-ink=success] {
                background-color: ${CssVars.SUCCESS_COLOR};
            }

            &[data-ink=warn] {
                background-color: ${CssVars.WARN_COLOR};
            }

            &[data-ink=info] {
                background-color: ${CssVars.INFO_COLOR};
            }

            &[data-ink=waive] {
                background-color: ${CssVars.WAIVE_COLOR};
            }
        }

        &[data-fill=plain] {
            color: ${CssVars.PRIMARY_COLOR};
            fill: ${CssVars.PRIMARY_COLOR};
            border: ${CssVars.BORDER};
            border-color: ${CssVars.PRIMARY_COLOR};

            &[data-ink=primary] {
                color: ${CssVars.PRIMARY_COLOR};
                fill: ${CssVars.PRIMARY_COLOR};
                border-color: ${CssVars.PRIMARY_COLOR};
            }

            &[data-ink=danger] {
                color: ${CssVars.DANGER_COLOR};
                fill: ${CssVars.DANGER_COLOR};
                border-color: ${CssVars.DANGER_COLOR};
            }

            &[data-ink=success] {
                color: ${CssVars.SUCCESS_COLOR};
                fill: ${CssVars.SUCCESS_COLOR};
                border-color: ${CssVars.SUCCESS_COLOR};
            }

            &[data-ink=warn] {
                color: ${CssVars.WARN_COLOR};
                fill: ${CssVars.WARN_COLOR};
                border-color: ${CssVars.WARN_COLOR};
            }

            &[data-ink=info] {
                color: ${CssVars.INFO_COLOR};
                fill: ${CssVars.INFO_COLOR};
                border-color: ${CssVars.INFO_COLOR};
            }

            &[data-ink=waive] {
                color: ${CssVars.WAIVE_COLOR};
                fill: ${CssVars.WAIVE_COLOR};
                border-color: ${CssVars.WAIVE_COLOR};
            }
        }
    }
`;
const formatter = new Proxy({ nf, nf0, nf1, nf2, nf3 }, {
  get(target, p) {
    const func = target[p];
    if (p === "df") {
      return df;
    }
    const language = locale();
    if (language === "en" || language === "en-US") {
      if (func != null) {
        return func;
      } else if (/^nf\d{1,2}$/.test(p)) {
        const f = wrapNf(nf(Number(p.slice(2))).format);
        target[p] = f;
        return f;
      }
    } else if (p === "nf") {
      return nfWithLocale(language);
    } else if (/^nf\d{1,2}$/.test(p)) {
      return nfXWithLocale(language, Number(p.slice(2)));
    } else {
      return null;
    }
  }
});
const Decorator$1 = qe.span`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    color: ${CssVars.FONT_COLOR};
    fill: ${CssVars.FONT_COLOR};
    height: ${CssVars.INPUT_HEIGHT};
    min-width: ${CssVars.INPUT_HEIGHT};
    padding: 0 ${CssVars.INPUT_INDENT};
    background-color: transparent;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    > span[data-w=d9-deco-lead],
    > span[data-w=d9-deco-tail] {
        color: ${CssVars.FONT_COLOR};
        fill: ${CssVars.FONT_COLOR};
    }

    > svg {
        height: calc((${CssVars.FONT_SIZE}) * 1.2);
    }
`;
const LeadDecorator$1 = qe(Decorator$1).attrs({
  [DOM_KEY_WIDGET]: "d9-deco-lead"
})`
`;
const TailDecorator$1 = qe(Decorator$1).attrs({
  [DOM_KEY_WIDGET]: "d9-deco-tail"
})`
`;
const Caption = reactExports.forwardRef((props, ref) => {
  const { label: _label, text: _text, leads, tails, labelOnValue, valueToLabel, click, tip, $pp, $wrapped, ...rest } = props;
  const { $root, $model, $p2r, $avs: { $disabled, $visible }, $vfs } = $wrapped;
  const label = _text ?? _label;
  const globalHandlers = useGlobalHandlers();
  const captionRef = reactExports.useRef(null);
  useDualRefs(captionRef, ref);
  useTip({ ref: captionRef, ...buildTip({ tip, root: $root, model: $model }) });
  const onClicked = click != null ? async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if ($disabled) {
      return;
    }
    const $mightInArray$wrapped = $wrapped;
    click && await click({
      root: $root,
      model: $model,
      $arrayHolder: $mightInArray$wrapped.$arrayHolder,
      $array: $mightInArray$wrapped.$array,
      validators: $vfs,
      global: globalHandlers
    }, event);
  } : void 0;
  const children = (() => {
    let value;
    if (labelOnValue && valueToLabel == null) {
      value = MUtils.getValue($model, $pp) ?? "";
    } else if (labelOnValue && valueToLabel != null) {
      value = valueToLabel(MUtils.getValue($model, $pp), formatter, {
        global: globalHandlers,
        root: $root,
        model: $model
      }) ?? "";
    } else if (label != null) {
      value = React.createElement(LabelLike, { "$wrapped": $wrapped, "$validationScopes": props, label });
    } else {
      value = "";
    }
    try {
      if (Array.isArray(value)) {
        value = value.filter((item) => item != null).map((item) => {
          if (typeof item === "object" && !reactExports.isValidElement(item)) {
            return JSON.stringify(item);
          } else {
            return item;
          }
        });
      } else if (value == null) {
        return null;
      } else if (typeof value === "object" && !reactExports.isValidElement(value)) {
        value = JSON.stringify(value);
      }
    } catch {
    }
    return value;
  })();
  return React.createElement(
    ACaption,
    { ...rest, "data-disabled": $disabled, "data-visible": $visible, id: PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id), onClick: onClicked, "data-clickable": onClicked != null, ref: captionRef },
    transformDecorators(leads).map((lead, index) => {
      return React.createElement(LeadDecorator$1, { key: index }, lead);
    }),
    children,
    transformDecorators(tails).map((tail, index) => {
      return React.createElement(TailDecorator$1, { key: index }, tail);
    })
  );
});
const Label = reactExports.forwardRef((props, ref) => {
  return React.createElement(Caption, { ...props, labelOnValue: true, ref });
});
const Badge = reactExports.forwardRef((props, ref) => {
  const { ink, fill = ButtonFill.FILL, ...rest } = props;
  return React.createElement(Caption, { ...rest, "data-w": "d9-badge", "data-ink": ink, "data-fill": fill, ref });
});
registerWidget({ key: "Badge", JSX: Badge, container: false, array: false });
registerWidget({ key: "Label", JSX: Label, container: false, array: false });
registerWidget({ key: "Caption", JSX: Caption, container: false, array: false });
const LabelLike = (props) => {
  const { label, $wrapped, $validationScopes, wrapByCaption = false, ...rest } = props;
  if (label == null || React.isValidElement(label) || typeof label === "string" || VUtils.isBlank(label.$wt)) {
    if (wrapByCaption) {
      if (typeof label === "string") {
        return React.createElement(Caption, { label: toIntlLabel(label), "$wrapped": $wrapped, ...rest });
      } else {
        return React.createElement(Caption, { label, "$wrapped": $wrapped, ...rest });
      }
    } else {
      return React.createElement(React.Fragment, null, toIntlLabel(label));
    }
  } else {
    const def = label;
    const { $key: keyOfChild, ...more } = def;
    NUtils.getDefKey(def);
    NUtils.inheritValidationScopes($validationScopes, def);
    return React.createElement(Wrapper, { "$root": $wrapped.$root, "$model": $wrapped.$model, "$p2r": $wrapped.$p2r, ...rest, ...more });
  }
};
const ACheckbox = qe.div.attrs(({ id }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-checkbox",
    [DOM_ID_WIDGET]: id
  };
})`
    display: block;
    position: relative;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    padding: calc((${CssVars.INPUT_HEIGHT}) / 6) 0;
    width: ${CssVars.INPUT_HEIGHT};
    height: ${CssVars.INPUT_HEIGHT};
    fill: ${CssVars.FONT_COLOR};
    cursor: pointer;

    &[data-visible=false] {
        display: none;
    }

    &[data-checked=true] {
        > svg {
            opacity: 1;
        }
    }

    &[data-checked=false] {
        &[data-empty-when-false=true] {
            > svg {
                opacity: 0;
            }
        }
    }

    &[disabled], &[data-disabled=true] {
        cursor: default;

        &:before {
            background-color: ${CssVars.DISABLE_COLOR};
        }

        &:hover, &:focus-within {
            fill: ${CssVars.FONT_COLOR};

            &:before {
                border-color: ${CssVars.BORDER_COLOR};
                box-shadow: none;
            }
        }
    }

    &:hover:before {
        box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
    }

    &:focus-within:before {
        box-shadow: ${CssVars.PRIMARY_SHADOW};
    }

    &:hover,
    &:focus-within {
        fill: ${CssVars.PRIMARY_COLOR};

        &:before {
            border-color: ${CssVars.PRIMARY_COLOR};
        }
    }

    &:before {
        content: '';
        display: block;
        position: absolute;
        width: calc((${CssVars.INPUT_HEIGHT}) / 3 * 2);
        height: calc((${CssVars.INPUT_HEIGHT}) / 3 * 2);
        border: ${CssVars.BORDER};
        border-radius: ${CssVars.BORDER_RADIUS};
        transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
        z-index: 0;
    }

    > svg {
        position: relative;
        width: calc((${CssVars.INPUT_HEIGHT}) / 3);
        height: calc((${CssVars.INPUT_HEIGHT}) / 3);
        margin-top: calc((${CssVars.INPUT_HEIGHT}) / 6);
        margin-left: calc((${CssVars.INPUT_HEIGHT}) / 6);
        transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    }
`;
const Checkbox = reactExports.forwardRef((props, ref) => {
  const { values = [true, false], emptyWhenFalse = true, tip, $pp, $wrapped: { $onValueChange, $root, $model, $avs: { $disabled, $visible } }, ...rest } = props;
  const globalHandlers = useGlobalHandlers();
  const checkRef = reactExports.useRef(null);
  useDualRefs(checkRef, ref);
  useTip({ ref: checkRef, ...buildTip({ tip, root: $root, model: $model }) });
  const onValueChange = async () => {
    const oldValue = MUtils.getValue($model, $pp);
    const newValue = oldValue == values[0] ? values[1] : values[0];
    await $onValueChange(newValue, true, { global: globalHandlers });
  };
  const onClick = async (event) => {
    if ($disabled) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    await onValueChange();
  };
  const onKeyUp = async (event) => {
    const { key } = event;
    if (key === " ") {
      await onValueChange();
    }
  };
  const value = MUtils.getValue($model, $pp);
  const checked = (value ?? "") == (values[0] ?? "");
  return React.createElement(ACheckbox, { "data-disabled": $disabled, "data-visible": $visible, tabIndex: 0, "data-checked": checked, "data-empty-when-false": emptyWhenFalse, onClick, onKeyUp, ...rest, ref: checkRef }, checked ? React.createElement(Check, null) : emptyWhenFalse ? React.createElement(Check, null) : React.createElement(Times, null));
});
registerWidget({ key: "Checkbox", JSX: Checkbox, container: false, array: false });
const UnwrappedCheckbox = reactExports.forwardRef((props, ref) => {
  const { $pp = "value", value, onValueChange, disabled, visible, ...rest } = props;
  const $onValueChange = onValueChange;
  const $avs = { $disabled: disabled, $visible: visible };
  const $root = { [$pp]: value };
  return React.createElement(Checkbox, { ...rest, "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, "$pp": $pp, id: rest.id ?? VUtils.generateUniqueId(), ref });
});
var TreeNodeCheckedChangeFrom;
(function(TreeNodeCheckedChangeFrom2) {
  TreeNodeCheckedChangeFrom2[TreeNodeCheckedChangeFrom2["FROM_CHILD"] = -1] = "FROM_CHILD";
  TreeNodeCheckedChangeFrom2[TreeNodeCheckedChangeFrom2["FROM_SELF"] = 0] = "FROM_SELF";
  TreeNodeCheckedChangeFrom2[TreeNodeCheckedChangeFrom2["FROM_PARENT"] = 1] = "FROM_PARENT";
})(TreeNodeCheckedChangeFrom || (TreeNodeCheckedChangeFrom = {}));
const InputMaskTypes = {
  number: MaskedNumber,
  date: MaskedDate,
  func: MaskedFunction,
  pattern: MaskedPattern,
  range: MaskedRange,
  regexp: MaskedRegExp,
  enum: MaskedRange,
  dynamic: MaskedDynamic
};
const AnInput = qe.input.attrs(({ id, autoSelect, onFocus }) => {
  if (!autoSelect) {
    return {
      [DOM_KEY_WIDGET]: "d9-input",
      [DOM_ID_WIDGET]: id
    };
  }
  return {
    [DOM_KEY_WIDGET]: "d9-input",
    [DOM_ID_WIDGET]: id,
    onFocus: (event) => {
      event.target.select();
      onFocus && onFocus(event);
    }
  };
})`
    display: block;
    position: relative;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    color: ${CssVars.FONT_COLOR};
    height: ${CssVars.INPUT_HEIGHT};
    padding: 0 ${CssVars.INPUT_INDENT};
    background-color: transparent;
    border: ${CssVars.BORDER};
    border-radius: ${CssVars.BORDER_RADIUS};
    outline: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-visible=false] {
        display: none;
    }

    &[data-disabled=true] {
        text-overflow: unset;
        background-color: ${CssVars.DISABLE_COLOR};

        &:hover, &:focus {
            border-color: ${CssVars.BORDER_COLOR};
            box-shadow: none;
        }
    }

    &::placeholder {
        color: ${CssVars.PLACEHOLDER_COLOR};
    }

    &:hover {
        border-color: ${CssVars.PRIMARY_COLOR};
        box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
    }

    &:focus {
        border-color: ${CssVars.PRIMARY_COLOR};
        box-shadow: ${CssVars.PRIMARY_SHADOW};
    }
`;
const stringifyInputValue = (options) => {
  const { $model, $pp, value } = options;
  if (value == null) {
    return "";
  }
  switch (typeof value) {
    case "object":
      console.error(`Value is an object, check your declaration and model please.`, $model, $pp);
      return "";
    case "function":
      console.error(`Value is a function, check your declaration and model please.`, $model, $pp);
      return "";
    case "symbol":
      console.error(`Value is a symbol, check your declaration and model please.`, $model, $pp);
      return "";
    default:
      return value.toString != null ? value.toString() : `${value}`;
  }
};
const Input = reactExports.forwardRef((props, ref) => {
  const { autoSelect = true, valueToNumber = false, mask, tip, $pp, $wrapped: { $onValueChange, $root, $model, $p2r, $avs: { $disabled, $visible } }, ...rest } = props;
  const valueRef = reactExports.useRef({ value: MUtils.getValue($model, $pp) });
  const globalHandlers = useGlobalHandlers();
  const onValueChanged = async (value) => {
    if (`${valueRef.current.value ?? ""}` !== `${value ?? ""}`) {
      valueRef.current.value = value;
      if (valueToNumber && !value.includes(" ")) {
        const tested = VUtils.isNumber(value);
        if (tested.test) {
          await $onValueChange(tested.value, true, { global: globalHandlers });
        } else {
          await $onValueChange(value, true, { global: globalHandlers });
        }
      } else {
        await $onValueChange(value, true, { global: globalHandlers });
      }
    }
  };
  const hasMask = VUtils.isNotBlank(mask);
  const maskOptions = hasMask ? typeof mask === "function" ? mask(InputMaskTypes) : {
    mask,
    lazy: false
  } : void 0;
  const maskValueInitializedRef = reactExports.useRef(false);
  const { ref: inputRef } = useIMask(maskOptions, {
    onAccept: (_, mask2) => {
      if (maskValueInitializedRef.current) {
        onValueChanged(mask2.unmaskedValue);
      } else {
        mask2.unmaskedValue = `${valueRef.current.value ?? ""}`;
        maskValueInitializedRef.current = true;
      }
    }
  });
  useDualRefs(inputRef, ref);
  useTip({ ref: inputRef, ...buildTip({ tip, root: $root, model: $model }) });
  const onChange = async (event) => {
    if (hasMask) {
      return;
    }
    await onValueChanged(event.target.value);
  };
  const valueFromModel = MUtils.getValue($model, $pp);
  if (valueRef.current.value == valueFromModel || `${valueFromModel}.` == valueRef.current.value)
    ;
  else {
    valueRef.current.value = valueFromModel;
  }
  const displayValue = hasMask ? void 0 : stringifyInputValue({ $model, $pp, value: valueRef.current.value });
  return React.createElement(AnInput, { ...rest, autoSelect, disabled: $disabled, "data-disabled": $disabled, "data-visible": $visible, value: displayValue, onChange, id: PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id), ref: inputRef });
});
const NumberInput = reactExports.forwardRef((props, ref) => {
  const { format, grouping = false, ...rest } = props;
  useLanguage();
  let mask = void 0;
  if (VUtils.isNotBlank(format)) {
    mask = () => {
      if (typeof format === "function") {
        return { ...MaskedNumber.DEFAULTS, ...format() };
      } else {
        return { ...MaskedNumber.DEFAULTS, ...format };
      }
    };
  } else if (grouping) {
    const [groupingSeparator, decimalSeparator] = detectNumberFormat(locale());
    mask = () => ({ ...MaskedNumber.DEFAULTS, thousandsSeparator: groupingSeparator, radix: decimalSeparator });
  }
  return React.createElement(Input, { ...rest, mask, "data-number": true, valueToNumber: true, ref });
});
const PasswordInput = reactExports.forwardRef((props, ref) => {
  return React.createElement(Input, { ...props, type: "password", valueToNumber: false, ref });
});
registerWidget({ key: "Number", JSX: NumberInput, container: false, array: false });
registerWidget({ key: "Input", JSX: Input, container: false, array: false });
registerWidget({ key: "Pwd", JSX: PasswordInput, container: false, array: false });
const DecorateInputContainer = qe.div.attrs(({ id }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-deco-input",
    [DOM_ID_WIDGET]: VUtils.isBlank(id) ? void 0 : id
  };
})`
    display: flex;
    position: relative;
    align-items: center;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    width: 100%;
    height: ${CssVars.INPUT_HEIGHT};

    &[data-placeholder=true] {
        > input[data-w=d9-input]:not(:nth-last-child(2)) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
    }

    &[data-placeholder=false] {
        > input[data-w=d9-input]:not(:last-child) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
    }

    &[data-visible=false] {
        display: none;
    }

    > input[data-w=d9-input] {
        flex-grow: 1;
        z-index: 1;

        &:not([value=""]) {
            + span[data-w=d9-deco-input-placeholder] {
                color: transparent;
            }
        }

        &:not(:first-child) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            margin-left: calc(${CssVars.BORDER_WIDTH} * -1);
        }
    }
`;
const Decorator = qe.span`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    color: ${CssVars.FONT_COLOR};
    fill: ${CssVars.FONT_COLOR};
    height: ${CssVars.INPUT_HEIGHT};
    min-width: ${CssVars.INPUT_HEIGHT};
    padding: 0 ${CssVars.INPUT_INDENT};
    background-color: transparent;
    border: ${CssVars.BORDER};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &[data-w=d9-deco-lead]:not(:first-child),
    &[data-w=d9-deco-tail] {
        margin-left: calc(${CssVars.BORDER_WIDTH} * -1);
    }

    > svg {
        height: calc((${CssVars.FONT_SIZE}) * 1.2);
    }
`;
const LeadDecorator = qe(Decorator).attrs({
  [DOM_KEY_WIDGET]: "d9-deco-lead"
})`
    &:first-child {
        border-top-left-radius: ${CssVars.BORDER_RADIUS};
        border-bottom-left-radius: ${CssVars.BORDER_RADIUS};
    }
`;
const TailDecorator = qe(Decorator).attrs({
  [DOM_KEY_WIDGET]: "d9-deco-tail"
})`
    &:last-child {
        border-top-right-radius: ${CssVars.BORDER_RADIUS};
        border-bottom-right-radius: ${CssVars.BORDER_RADIUS};
    }
`;
const Placeholder = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-deco-input-placeholder" })`
    display: block;
    position: absolute;
    top: var(--top, 0);
    left: var(--left, 0);
    width: var(--width, 0);
    height: var(--height, 0);
    line-height: var(--height, 0);
    color: ${CssVars.PLACEHOLDER_COLOR};
    background-color: transparent;
    padding: 0 ${CssVars.INPUT_INDENT};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    pointer-events: none;
    user-select: none;
    z-index: 2;
`;
const Decorate = reactExports.forwardRef((props, forwardedRef) => {
  const { id, placeholder, leads, tails, children, ...rest } = props;
  const ref = reactExports.useRef(null);
  useDualRefs(ref, forwardedRef);
  reactExports.useEffect(() => {
    if (ref.current == null) {
      return null;
    }
    const node = ref.current.querySelector("span[data-w=d9-deco-input-placeholder]");
    if (node == null) {
      return;
    }
    const computePlaceholderSize = () => {
      if (ref.current == null) {
        return;
      }
      const { left: containerLeft } = ref.current.getBoundingClientRect();
      const input = ref.current.querySelector("input");
      const { left, width, height } = input.getBoundingClientRect();
      const { borderTopWidth, borderBottomWidth, borderLeftWidth, borderRightWidth } = window.getComputedStyle(input);
      node.style.setProperty("--top", `${Number((borderTopWidth ?? "0").replace("px", ""))}px`);
      node.style.setProperty("--left", `${left - containerLeft + Number((borderLeftWidth ?? "0").replace("px", ""))}px`);
      node.style.setProperty("--width", `${width - Number((borderLeftWidth ?? "0").replace("px", "")) - Number((borderRightWidth ?? "0").replace("px", ""))}px`);
      node.style.setProperty("--height", `${height - Number((borderTopWidth ?? "0").replace("px", "")) - Number((borderBottomWidth ?? "0").replace("px", ""))}px`);
    };
    const resizeObserver = new ResizeObserver(() => {
      computePlaceholderSize();
    });
    resizeObserver.observe(ref.current);
    computePlaceholderSize();
    return () => {
      resizeObserver == null ? void 0 : resizeObserver.disconnect();
    };
  });
  const hasPlaceholder = VUtils.isNotBlank(placeholder);
  return React.createElement(
    DecorateInputContainer,
    { id: VUtils.isBlank(id) ? void 0 : `di-${id}`, "data-placeholder": hasPlaceholder, ...rest, ref },
    transformDecorators(leads).map((lead, index) => {
      return React.createElement(LeadDecorator, { key: index }, lead);
    }),
    children,
    hasPlaceholder ? React.createElement(Placeholder, null, toIntlLabel((placeholder ?? "").trim())) : null,
    transformDecorators(tails).map((tail, index) => {
      return React.createElement(TailDecorator, { key: index }, tail);
    })
  );
});
const askDecorateAttrs = (props, rest) => {
  const deviceTags = MBUtils.pickDeviceTags(props);
  const decorateAttrs = Object.keys(rest).reduce((attrs, key) => {
    var _a, _b;
    if (key.startsWith("data-di-")) {
      attrs[key] = rest[key];
      delete rest[key];
    } else if (["data-valid", "data-visible", "data-disabled"].includes(key)) {
      attrs[key] = rest[key];
    } else if (key === "$wrapped") {
      attrs["data-disabled"] = ((_a = rest[key].$avs) == null ? void 0 : _a.$disabled) ?? false;
      attrs["data-visible"] = ((_b = rest[key].$avs) == null ? void 0 : _b.$visible) ?? true;
    }
    return attrs;
  }, {});
  return { tags: deviceTags, attrs: decorateAttrs };
};
const DecorateInput = reactExports.forwardRef((props, ref) => {
  const { placeholder, leads, tails, diTip, className, style, ...rest } = props;
  const { $wrapped: { $root, $model, $p2r } } = rest;
  const { tags: deviceTags, attrs: decorateAttrs } = askDecorateAttrs(props, rest);
  const decorateRef = reactExports.useRef(null);
  useDualRefs(decorateRef, ref);
  useTip({ ref: decorateRef, prefix: "data-di", ...buildTip({ tip: diTip, root: $root, model: $model }) });
  const computePlaceholder = () => {
    if (VUtils.isBlank(placeholder)) {
      return void 0;
    }
    if (VUtils.isNotBlank(rest.mask)) {
      return void 0;
    }
    return placeholder;
  };
  return React.createElement(
    Decorate,
    { ...deviceTags, ...decorateAttrs, placeholder: computePlaceholder(), leads, tails, className, style, id: PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id), ref: decorateRef },
    React.createElement(Input, { ...rest })
  );
});
const DecorateNumberInput = reactExports.forwardRef((props, ref) => {
  const { placeholder, leads, tails, diTip, className, style, ...rest } = props;
  const { $pp, $wrapped: { $p2r, $root, $model, $onValueChange } } = rest;
  const { tags: deviceTags, attrs: decorateAttrs } = askDecorateAttrs(props, rest);
  const decorateRef = reactExports.useRef(null);
  useDualRefs(decorateRef, ref);
  useTip({ ref: decorateRef, prefix: "data-di", ...buildTip({ tip: diTip, root: $root, model: $model }) });
  const [omitPlaceholder, setOmitPlaceholder] = reactExports.useState(() => {
    return VUtils.isNotEmpty(MUtils.getValue($model, $pp));
  });
  const computePlaceholder = () => {
    if (VUtils.isBlank(placeholder)) {
      return void 0;
    }
    if (omitPlaceholder) {
      return void 0;
    }
    return placeholder;
  };
  rest.$wrapped.$onValueChange = async (newValue, doForceUpdate, ...args) => {
    setOmitPlaceholder(VUtils.isNotEmpty(newValue));
    $onValueChange(newValue, doForceUpdate, ...args);
  };
  return React.createElement(
    Decorate,
    { ...deviceTags, ...decorateAttrs, placeholder: computePlaceholder(), leads, tails, className, style, id: PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id), ref: decorateRef },
    React.createElement(NumberInput, { ...rest })
  );
});
const DecoratePasswordInput = reactExports.forwardRef((props, ref) => {
  const { placeholder, leads, tails, diTip, className, style, ...rest } = props;
  const { $wrapped: { $p2r, $root, $model } } = rest;
  const { tags: deviceTags, attrs: decorateAttrs } = askDecorateAttrs(props, rest);
  const decorateRef = reactExports.useRef(null);
  useDualRefs(decorateRef, ref);
  useTip({ ref: decorateRef, prefix: "data-di", ...buildTip({ tip: diTip, root: $root, model: $model }) });
  return React.createElement(
    Decorate,
    { ...deviceTags, ...decorateAttrs, placeholder, leads, tails, className, style, id: PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id), ref: decorateRef },
    React.createElement(PasswordInput, { ...rest })
  );
});
registerWidget({ key: "DecoInput", JSX: DecorateInput, container: false, array: false });
registerWidget({ key: "DecoNumber", JSX: DecorateNumberInput, container: false, array: false });
registerWidget({ key: "DecoPwd", JSX: DecoratePasswordInput, container: false, array: false });
const UnwrappedDecorateInput = reactExports.forwardRef((props, ref) => {
  const { $pp = "value", value, onValueChange, disabled, visible, ...rest } = props;
  const $onValueChange = onValueChange;
  const $avs = { $disabled: disabled, $visible: visible };
  const $root = { [$pp]: value };
  return React.createElement(DecorateInput, { ...rest, "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, "$pp": $pp, id: rest.id ?? VUtils.generateUniqueId(), ref });
});
reactExports.forwardRef((props, ref) => {
  const { $pp = "value", value, onValueChange, disabled, visible, ...rest } = props;
  const $onValueChange = onValueChange;
  const $avs = { $disabled: disabled, $visible: visible };
  const $root = { [$pp]: value };
  return React.createElement(DecorateNumberInput, { ...rest, "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, "$pp": $pp, id: rest.id ?? VUtils.generateUniqueId(), ref });
});
reactExports.forwardRef((props, ref) => {
  const { $pp = "value", value, onValueChange, disabled, visible, ...rest } = props;
  const $onValueChange = onValueChange;
  const $avs = { $disabled: disabled, $visible: visible };
  const $root = { [$pp]: value };
  return React.createElement(DecoratePasswordInput, { ...rest, "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, "$pp": $pp, id: rest.id ?? VUtils.generateUniqueId(), ref });
});
const ATree = qe.div.attrs(({ id, [DOM_KEY_WIDGET]: dataW, height }) => {
  return {
    [DOM_KEY_WIDGET]: dataW || "d9-tree",
    [DOM_ID_WIDGET]: id,
    style: { "--height": toCssSize(height) }
  };
})`
    display: flex;
    position: relative;
    flex-direction: column;
    align-self: start;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    height: var(--height);
    border: ${CssVars.BORDER};
    border-radius: ${CssVars.BORDER_RADIUS};
    overflow: hidden;

    &[data-visible=false] {
        display: none;
    }
`;
const TreeSearchInput = qe(UnwrappedDecorateInput)`
    min-height: ${CssVars.INPUT_HEIGHT};
    background-color: ${CssVars.BACKGROUND_COLOR};
    border-top-left-radius: ${CssVars.BORDER_RADIUS};
    border-top-right-radius: ${CssVars.BORDER_RADIUS};
    border-bottom: ${CssVars.BORDER};
    overflow: hidden;
    transition: border-bottom-color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-visible=false] {
        height: 0;
        min-height: 0;
        border-bottom: 0;
    }

    &:focus-within {
        border-bottom-color: ${CssVars.PRIMARY_COLOR};
    }

    > span[data-w=d9-deco-lead] {
        border-top: 0;
        border-left: 0;
        border-bottom: 0;
        border-bottom-left-radius: 0;

        > svg {
            opacity: 0.3;
            height: calc(${CssVars.FONT_SIZE} * 0.9);
        }
    }

    > input[data-w=d9-input] {
        border: 0;
        border-bottom-right-radius: 0;

        &:hover, &:focus {
            box-shadow: none;
        }
    }
`;
const TreeContentContainer = qe.div.attrs({
  [DOM_KEY_WIDGET]: "d9-tree-content-container",
  "data-v-scroll": "",
  "data-h-scroll": ""
})`
    display: flex;
    position: relative;
    flex-grow: 1;
    flex-direction: column;
    align-self: stretch;
    border-bottom-left-radius: ${CssVars.BORDER_RADIUS};
    border-bottom-right-radius: ${CssVars.BORDER_RADIUS};
    overflow: auto;
`;
const TreeNodeWrapper = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-tree-node-wrapper" })`
    display: flex;
    position: relative;
    flex-direction: column;

    &[data-last-of-parent=false]:after {
        content: '';
        display: ${({ level }) => level === 0 ? "none" : "block"};
        position: absolute;
        top: 0;
        left: ${({ level }) => 13.5 + 20 * (level - 1)}px;
        width: 1px;
        height: 100%;
        background-color: ${CssVars.TREE_LINE_COLOR};
    }
`;
const TreeNode$1 = qe.div.attrs({})`
    display: flex;
    position: relative;
    height: ${CssVars.INPUT_HEIGHT};
    min-height: ${CssVars.INPUT_HEIGHT};
    padding-left: ${({ level }) => 20 * level}px;
    align-items: center;
    white-space: nowrap;

    &:before {
        content: '';
        display: ${({ level }) => level === 0 ? "none" : "block"};
        position: absolute;
        top: 0;
        left: ${({ level }) => 13.5 + 20 * (level - 1)}px;
        width: 8px;
        height: 50%;
        border-left: 1px solid ${CssVars.TREE_LINE_COLOR};
        border-bottom: 1px solid ${CssVars.TREE_LINE_COLOR};
        border-bottom-left-radius: 4px;
    }
`;
const TreeNodeContainer = qe(TreeNode$1).attrs({ [DOM_KEY_WIDGET]: "d9-tree-node-container" })`
    cursor: pointer;

    &[data-expanded=true] {
        > svg:first-child {
            transform: rotateZ(90deg);
        }
    }

    &[data-expanded=false] ~ *:not(div[data-w=d9-tree-node-operators]) {
        display: none;
    }
`;
const TreeNodeOperators = qe.div.attrs(({ top, right }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-tree-node-operators",
    style: {
      "--top": `${top}px`,
      "--right": `${right}px`
    }
  };
})`
    display: flex;
    position: fixed;
    top: var(--top);
    right: var(--right);
    margin-right: 8px;
    align-items: center;
    background-color: ${CssVars.BACKGROUND_COLOR};
    border-radius: ${CssVars.BORDER_RADIUS};
    opacity: 1;
    z-index: ${CssVars.DROPDOWN_Z_INDEX};
    transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-visible=false] {
        opacity: 0;
        pointer-events: none;
        user-select: none;
        transition: none;
    }

    &:hover > button {
        opacity: 1;
    }

    > button {
        height: calc(${CssVars.INPUT_HEIGHT} * 3 / 4);
        opacity: 0.3;
        transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

        &:first-child {
            border-top-left-radius: calc(${CssVars.INPUT_HEIGHT} * 3 / 8);
            border-bottom-left-radius: calc(${CssVars.INPUT_HEIGHT} * 3 / 8);
        }

        &:last-child {
            border-top-right-radius: calc(${CssVars.INPUT_HEIGHT} * 3 / 8);
            border-bottom-right-radius: calc(${CssVars.INPUT_HEIGHT} * 3 / 8);
        }

        &:not(:last-child) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }

        &:not(:first-child) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            overflow: visible;

            &:before {
                content: '';
                display: block;
                position: absolute;
                top: 20%;
                left: -1px;
                height: 60%;
                width: 1px;
                background-color: ${CssVars.INVERT_COLOR};
            }
        }

        &:hover {
            z-index: 1;
        }

        > span[data-w=d9-deco-lead] {
            height: calc(${CssVars.INPUT_HEIGHT} * 3 / 4);
            min-width: calc(${CssVars.INPUT_HEIGHT} * 3 / 4);
            padding: 0;

            > svg {
                height: calc(${CssVars.FONT_SIZE} * 0.8);
            }
        }
    }
`;
const TreeNodeContent = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-tree-node-content" })`
    display: flex;
    position: relative;
    flex-grow: 1;
    align-items: center;
    align-self: stretch;
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    color: ${CssVars.FONT_COLOR};

    &[data-operator=true] {
        text-decoration: underline;
        font-size: 0.8em;
        color: ${CssVars.PRIMARY_COLOR};
        opacity: 0.7;
    }
`;
const TreeNodeToggle = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-tree-node-toggle" })`
    display: inline-block;
    width: 28px;
    height: 28px;
    margin-left: 0;

    &[data-expanded=true] > svg:first-child {
        transform: rotate(90deg);
    }

    > svg:first-child {
        height: 12px;
        width: 12px;
        margin: 8px;
        fill: ${CssVars.FONT_COLOR};
        transition: transform ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    }
`;
const TreeNodeIndex = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-tree-node-index" })`
    display: flex;
    position: relative;
    align-items: center;
    margin-right: 8px;
    font-weight: 500;
    font-size: 0.8em;

    &:first-child {
        padding-left: 9px;
    }
`;
const TreeNodeLabel = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-tree-node-label" })`
    display: flex;
    position: relative;
    align-items: center;
    align-self: stretch;

    &:first-child {
        padding-left: 9px;
    }
`;
const TreeHoverShade = qe.div.attrs(({ top, height, visible }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-tree-node-hover-shade",
    style: {
      "--top": toCssSize(top),
      "--height": toCssSize(height),
      "--visible": visible ? "block" : "none"
    }
  };
})`
    display: var(--visible);
    position: absolute;
    background-color: ${CssVars.HOVER_COLOR};
    top: var(--top);
    left: 0;
    width: 100%;
    height: var(--height);
    user-select: none;
    pointer-events: none;
    z-index: -1;
`;
const useTreeNodeExpand = (ref, state) => {
  const { fire: fireTree } = useTreeEventBus();
  const { on, off, fire } = useTreeNodeEventBus();
  const forceUpdate = useForceUpdate();
  reactExports.useEffect(() => {
    const onSwitchExpand = (fromMyself) => (marker, expanded, locateToMarker) => {
      if (expanded != state.current) {
        state.current = expanded;
        forceUpdate();
        fire && fire(TreeNodeEventTypes.SWITCH_PARENT_EXPAND, marker, state.current);
        if (fromMyself && expanded && ref.current != null) {
          const allExpanded = (element) => {
            if (element.getAttribute("data-expanded") !== "true") {
              return false;
            } else {
              const wrapper = element.parentElement;
              if (wrapper.parentElement.getAttribute(DOM_KEY_WIDGET) === "d9-tree-content-container") {
                return true;
              } else {
                return allExpanded(wrapper.parentElement.firstElementChild);
              }
            }
          };
          const tryToScroll = () => {
            setTimeout(() => {
              if (!allExpanded(ref.current.closest("div[data-w=d9-tree-node-container]"))) {
                tryToScroll();
              } else {
                const wrapper = ref.current.closest("div[data-w=d9-tree-node-wrapper]");
                const { top, height } = wrapper.getBoundingClientRect();
                const treeContainer = wrapper.closest("div[data-w=d9-tree-content-container]");
                const { top: treeTop, height: treeHeight } = treeContainer.getBoundingClientRect();
                if (top + height < treeTop + treeHeight)
                  ;
                else if (height > treeHeight) {
                  treeContainer.scrollTo({
                    top: treeContainer.scrollTop + top - treeTop,
                    behavior: "smooth"
                  });
                } else {
                  treeContainer.scrollTo({
                    top: treeContainer.scrollTop + top + height - treeTop - treeHeight,
                    behavior: "smooth"
                  });
                }
                if (VUtils.isNotBlank(locateToMarker)) {
                  fireTree(TreeEventTypes.SCROLL_NODE_INTO_VIEW, locateToMarker);
                }
              }
            }, 100);
          };
          tryToScroll();
        }
      }
    };
    const onSwitchMyExpand = onSwitchExpand(true);
    const onSwitchMyExpandFromChild = onSwitchExpand(false);
    on && on(TreeNodeEventTypes.SWITCH_MY_EXPAND, onSwitchMyExpand);
    on && on(TreeNodeEventTypes.SWITCH_MY_EXPAND_FROM_CHILD, onSwitchMyExpandFromChild);
    return () => {
      off && off(TreeNodeEventTypes.SWITCH_MY_EXPAND, onSwitchMyExpand);
      off && off(TreeNodeEventTypes.SWITCH_MY_EXPAND_FROM_CHILD, onSwitchMyExpandFromChild);
    };
  }, [on, off, fire, fireTree, forceUpdate, ref, state]);
};
const useTreeNodeCheckedChanged = () => {
  const { on, off, fire } = useTreeNodeEventBus();
  const forceUpdate = useForceUpdate();
  reactExports.useEffect(() => {
    const onSwitchMyChecked = (marker, checked) => {
      forceUpdate();
      fire && fire(TreeNodeEventTypes.SWITCH_CHILDREN_CHECKED, marker, checked);
      fire && fire(TreeNodeEventTypes.SWITCH_PARENT_CHECKED, marker, checked);
    };
    const onSwitchMyCheckedFromChild = (marker, checked) => {
      forceUpdate();
      fire && fire(TreeNodeEventTypes.SWITCH_PARENT_CHECKED, marker, checked);
    };
    on && on(TreeNodeEventTypes.SWITCH_MY_CHECKED, onSwitchMyChecked);
    on && on(TreeNodeEventTypes.SWITCH_MY_CHECKED_FROM_CHILD, onSwitchMyCheckedFromChild);
    return () => {
      off && off(TreeNodeEventTypes.SWITCH_MY_CHECKED, onSwitchMyChecked);
      off && off(TreeNodeEventTypes.SWITCH_MY_CHECKED_FROM_CHILD, onSwitchMyCheckedFromChild);
    };
  }, [on, off, fire, forceUpdate]);
};
const TreeNodeRenderer = (props) => {
  const { initExpandLevel, showIndex, $wrapped, node, displayIndex, lastOfParent, level } = props;
  const ref = reactExports.useRef(null);
  const operatorsRef = reactExports.useRef(null);
  const expanded = reactExports.useRef(level <= initExpandLevel);
  const { fire: fireGlobal } = useGlobalEventBus();
  const globalHandlers = useGlobalHandlers();
  const { on: onTree, off: offTree, fire: fireTree } = useTreeEventBus();
  const { on, off, fire } = useTreeNodeEventBus();
  const [operators, setOperators] = reactExports.useState({ visible: false, top: 0, right: 0 });
  useTreeNodeExpand(ref, expanded);
  useTreeNodeCheckedChanged();
  const forceUpdate = useForceUpdate();
  reactExports.useEffect(() => {
    const onRefreshNode = (_marker) => {
      forceUpdate();
    };
    on && on(TreeNodeEventTypes.REFRESH_NODE, onRefreshNode);
    return () => {
      off && off(TreeNodeEventTypes.REFRESH_CHILD_NODES, onRefreshNode);
    };
  }, [on, off, forceUpdate, node]);
  reactExports.useEffect(() => {
    const onScrollNodeIntoView = (marker) => {
      var _a;
      if (node.marker !== marker) {
        return;
      }
      (_a = ref.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    };
    onTree(TreeEventTypes.SCROLL_NODE_INTO_VIEW, onScrollNodeIntoView);
    return () => {
      offTree(TreeEventTypes.SCROLL_NODE_INTO_VIEW, onScrollNodeIntoView);
    };
  }, [onTree, offTree, node, ref]);
  const onToggleClicked = (event) => {
    event.stopPropagation();
    event.preventDefault();
    fire && fire(TreeNodeEventTypes.SWITCH_MY_EXPAND, node.marker, !expanded.current);
  };
  const onEntityClicked = (event) => {
    event.preventDefault();
    event.stopPropagation();
    node.click && node.click(node, { global: globalHandlers });
    const clipped = node.marker;
    const key = `${GlobalEventPrefix.TREE_NODE_CLICKED}:${clipped}`;
    fireGlobal && fireGlobal(GlobalEventTypes.CUSTOM_EVENT, key, GlobalEventPrefix.TREE_NODE_CLICKED, clipped, {
      root: $wrapped.$root,
      model: $wrapped.$model,
      value: node.value
    });
  };
  const onEntityDoubleClicked = (event) => {
    event.preventDefault();
    event.stopPropagation();
    node.dblClick && node.dblClick(node, { global: globalHandlers });
    const clipped = node.marker;
    const key = `${GlobalEventPrefix.TREE_NODE_DOUBLE_CLICKED}:${clipped}`;
    fireGlobal && fireGlobal(GlobalEventTypes.CUSTOM_EVENT, key, GlobalEventPrefix.TREE_NODE_DOUBLE_CLICKED, clipped, {
      root: $wrapped.$root,
      model: $wrapped.$model,
      value: node.value
    });
  };
  const onEntityContextMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    node.contextMenu && node.contextMenu(node, { global: globalHandlers }, event);
    const clipped = node.marker;
    const key = `${GlobalEventPrefix.TREE_NODE_CONTEXT_MENU}:${clipped}`;
    fireGlobal && fireGlobal(GlobalEventTypes.CUSTOM_EVENT, key, GlobalEventPrefix.TREE_NODE_CONTEXT_MENU, clipped, {
      root: $wrapped.$root,
      model: $wrapped.$model,
      value: node.value
    });
  };
  const onMouseEnter = () => {
    const { top: treeTop, left: treeLeft, width: treeWidth } = ref.current.closest("div[data-w=d9-tree]").getBoundingClientRect();
    const { top, height } = ref.current.getBoundingClientRect();
    fireTree(TreeEventTypes.SHOW_HOVER_BOX, top - treeTop, height);
    if (!hasOperators || operators.visible) {
      return;
    }
    const { height: operatorsHeight } = operatorsRef.current.getBoundingClientRect();
    if (top - operatorsHeight < treeTop) {
      setOperators({ visible: true, top: top + height, right: window.innerWidth - (treeLeft + treeWidth) });
    } else {
      setOperators({
        visible: true,
        top: top - operatorsHeight,
        right: window.innerWidth - (treeLeft + treeWidth)
      });
    }
  };
  const onMouseLeave = () => {
    fireTree(TreeEventTypes.HIDE_HOVER_BOX);
    if (!hasOperators) {
      return;
    }
    setOperators((state) => ({ ...state, visible: false }));
  };
  const onAddClicked = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOperators((state) => ({ ...state, visible: false }));
    try {
      const added = await node.add(node, { global: globalHandlers });
      if (added == null) {
        fire(TreeNodeEventTypes.CHILD_ADDED, node.marker);
      } else if (Array.isArray(added)) {
        const [placeholder, promise] = added;
        fire(TreeNodeEventTypes.CHILD_ADDED, node.marker, placeholder, true);
        try {
          const added2 = await promise;
          fire(TreeNodeEventTypes.CHILD_PLACEHOLDER_REPLACED, node.marker, added2 ?? void 0);
        } catch {
          fire(TreeNodeEventTypes.CHILD_PLACEHOLDER_REMOVED, node.marker, placeholder);
        }
      } else {
        fire(TreeNodeEventTypes.CHILD_ADDED, node.marker, added, false);
      }
    } catch {
    }
  };
  const onRemoveClicked = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOperators((state) => ({ ...state, visible: false }));
    try {
      await node.remove(node, { global: globalHandlers });
      fire(TreeNodeEventTypes.NODE_REMOVED, node.marker, node);
    } catch {
    }
  };
  const $p2r = PPUtils.concat($wrapped.$p2r, node.$ip2r);
  const checkable = (node.checkable ?? false) && node.checked != null && node.check != null;
  let checked = void 0;
  let check = void 0;
  let onCheckValueChanged = void 0;
  if (checkable) {
    checked = node.checked(node);
    check = node.check;
    onCheckValueChanged = async (value) => {
      await check(node, value, TreeNodeCheckedChangeFrom.FROM_SELF, { global: globalHandlers });
      fire && fire(TreeNodeEventTypes.SWITCH_MY_CHECKED, node.marker, value);
    };
  }
  const addable = (node.addable ?? false) && node.add != null;
  const removable = (node.removable ?? false) && node.remove != null;
  const hasOperators = addable || removable;
  const label = React.createElement(
    TreeNodeLabel,
    null,
    checkable ? React.createElement(UnwrappedCheckbox, { "$pp": NUtils.generateReactKey(), value: checked, onValueChange: onCheckValueChanged, "data-tree-node-check": true }) : null,
    React.createElement(LabelLike, { "$wrapped": { ...$wrapped, $model: node.value, $p2r }, label: node.label })
  );
  const children = node.$displayChildren ?? node.$children ?? [];
  return React.createElement(
    TreeNodeContainer,
    { "data-expanded": expanded.current, "data-last-of-parent": lastOfParent, level, onClick: onEntityClicked, onDoubleClick: onEntityDoubleClicked, onContextMenu: onEntityContextMenu, onMouseEnter, onMouseLeave, ref },
    hasOperators ? React.createElement(
      TreeNodeOperators,
      { "data-visible": operators.visible, top: operators.top, right: operators.right, ref: operatorsRef },
      addable ? React.createElement(UnwrappedButton, { onClick: onAddClicked, leads: ["$icons.plus"], ink: ButtonInk.PRIMARY, fill: ButtonFill.FILL }) : null,
      removable ? React.createElement(UnwrappedButton, { onClick: onRemoveClicked, leads: ["$icons.xmark"], ink: ButtonInk.PRIMARY, fill: ButtonFill.FILL }) : null
    ) : null,
    React.createElement(
      TreeNodeContent,
      null,
      children.length !== 0 ? React.createElement(
        TreeNodeToggle,
        { "data-expanded": expanded.current, onClick: onToggleClicked },
        React.createElement(AngleRight, null)
      ) : null,
      showIndex && VUtils.isNotBlank(displayIndex) ? React.createElement(
        React.Fragment,
        null,
        React.createElement(
          TreeNodeIndex,
          null,
          "# ",
          displayIndex,
          "."
        ),
        label
      ) : label
    )
  );
};
const useRefreshTreeNode = (node, $wrapped) => {
  const { fire } = useTreeNodeEventBus();
  const { on: onGlobal, off: offGlobal } = useGlobalEventBus();
  reactExports.useEffect(() => {
    const onCustomEvent = (_, prefix, clipped) => {
      if (clipped !== node.marker) {
        return;
      }
      switch (prefix) {
        case GlobalEventPrefix.REFRESH_TREE_NODE:
          fire && fire(TreeNodeEventTypes.REFRESH_NODE, node.marker);
          break;
        case GlobalEventPrefix.REFRESH_TREE_CHILD_NODES:
          fire && fire(TreeNodeEventTypes.REFRESH_CHILD_NODES, node.marker, false);
          break;
        case GlobalEventPrefix.RECALC_TREE_CHILD_NODES:
          fire && fire(TreeNodeEventTypes.REFRESH_CHILD_NODES, node.marker, true);
          break;
        case GlobalEventPrefix.REFRESH_TREE_NODE_AND_CHILDREN:
          fire && fire(TreeNodeEventTypes.REFRESH_NODE, node.marker);
          fire && fire(TreeNodeEventTypes.REFRESH_CHILD_NODES, node.marker, false);
          break;
        case GlobalEventPrefix.RECALC_TREE_NODE_AND_CHILDREN:
          fire && fire(TreeNodeEventTypes.REFRESH_NODE, node.marker);
          fire && fire(TreeNodeEventTypes.REFRESH_CHILD_NODES, node.marker, true);
          break;
        case GlobalEventPrefix.EXPAND_TREE_NODE:
          fire && fire(TreeNodeEventTypes.SWITCH_MY_EXPAND, node.marker, true);
          break;
        case GlobalEventPrefix.COLLAPSE_TREE_NODE:
          fire && fire(TreeNodeEventTypes.SWITCH_MY_EXPAND, node.marker, false);
          break;
      }
    };
    onGlobal && onGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
    return () => {
      offGlobal && offGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
    };
  }, [onGlobal, offGlobal, fire, node, $wrapped]);
};
const TreeNodeRefresher = (props) => {
  const { node, $wrapped } = props;
  useRefreshTreeNode(node, $wrapped);
  return React.createElement(reactExports.Fragment, null);
};
const TreeNode = (props) => {
  const { initExpandLevel, showIndex, detect, $wrapped, node, displayIndex, lastOfParent, level } = props;
  const { fire } = useTreeNodeEventBus();
  const expandParent = (expanded) => fire && fire(TreeNodeEventTypes.SWITCH_MY_EXPAND_FROM_CHILD, node.marker, expanded);
  const nodeCheckedChanged = (checked) => fire && fire(TreeNodeEventTypes.SWITCH_MY_CHECKED_FROM_CHILD, node.marker, checked);
  const nodeRemoved = (removedNode) => fire && fire(TreeNodeEventTypes.REFRESH_CHILD_NODES_ON_REMOVED, node.marker, removedNode);
  return React.createElement(
    TreeNodeEventBusProvider,
    null,
    React.createElement(TreeNodeRefresher, { node, "$wrapped": $wrapped }),
    React.createElement(TreeNodeEventBridge, { node, expandParent, nodeCheckedChanged, nodeRemoved }),
    React.createElement(
      TreeNodeWrapper,
      { "data-last-of-parent": lastOfParent, level },
      React.createElement(TreeNodeRenderer, { initExpandLevel, showIndex, "$wrapped": $wrapped, node, displayIndex, lastOfParent, level }),
      React.createElement(ChildTreeNodes, { node, detect, initExpandLevel, level, showIndex, displayIndex, "$wrapped": $wrapped })
    )
  );
};
const ChildTreeNodes = (props) => {
  const { node, displayChildren, initExpandLevel, level, showIndex, displayIndex, detect, $wrapped } = props;
  const { fire: fireTree } = useTreeEventBus();
  const { on, off, fire } = useTreeNodeEventBus();
  const globalHandlers = useGlobalHandlers();
  const forceUpdate = useForceUpdate();
  reactExports.useEffect(() => {
    const recomputeDisplayChildren = () => {
      if (node.$displayChildren == null) {
        return;
      }
      if (node.$children == null || node.$children.length === 0) {
        node.$displayChildren = [];
        return;
      }
      const map = /* @__PURE__ */ new Map();
      node.$children.forEach((child, index) => map.set(child, index));
      node.$displayChildren = node.$displayChildren.filter((child) => map.has(child));
      const displayMap = /* @__PURE__ */ new Map();
      node.$displayChildren.forEach((child, index) => displayMap.set(child, index));
      node.$children.forEach((child) => {
        if (!displayMap.has(child)) {
          node.$displayChildren.push(child);
        }
      });
      node.$displayChildren.sort((c1, c2) => map.get(c1) - map.get(c2));
    };
    const onRefreshChildNodes = (_marker, redetect) => {
      if (redetect === true) {
        node.$children = detect(node, { global: globalHandlers }) ?? [];
      }
      recomputeDisplayChildren();
      forceUpdate();
    };
    const refreshNodeContent = () => {
      const children2 = node.$children ?? [];
      if (children2.length === 0) {
        fire && fire(TreeNodeEventTypes.SWITCH_MY_EXPAND, node.marker, false);
      }
    };
    const onRefreshChildNodesOnRemoved = (_marker, _removedNode) => {
      recomputeDisplayChildren();
      forceUpdate();
      refreshNodeContent();
    };
    const fillMarkerAndBuildHierarchy = () => {
      fireTree(TreeEventTypes.ASK_MARKER_ADDER, (add) => {
        node.$children.forEach((child) => {
          add(child);
          if (child.$parent == null) {
            child.$parent = node;
          }
        });
      });
    };
    const scrollToAdded = (childNode) => {
      fire && fire(TreeNodeEventTypes.SWITCH_MY_EXPAND, node.marker, true, childNode == null ? void 0 : childNode.marker);
    };
    const onChildAdded = (_marker, addedNode, _placeholder) => {
      recomputeDisplayChildren();
      fillMarkerAndBuildHierarchy();
      forceUpdate();
      scrollToAdded(addedNode);
    };
    const onChildPlaceholderReplaced = (_marker, addedNode) => {
      recomputeDisplayChildren();
      fillMarkerAndBuildHierarchy();
      forceUpdate();
      scrollToAdded(addedNode);
    };
    const onChildPlaceholderRemoved = (_marker, _placeholderNode) => {
      recomputeDisplayChildren();
      forceUpdate();
      refreshNodeContent();
    };
    on && on(TreeNodeEventTypes.REFRESH_CHILD_NODES, onRefreshChildNodes);
    on && on(TreeNodeEventTypes.REFRESH_CHILD_NODES_ON_REMOVED, onRefreshChildNodesOnRemoved);
    on && on(TreeNodeEventTypes.CHILD_ADDED, onChildAdded);
    on && on(TreeNodeEventTypes.CHILD_PLACEHOLDER_REPLACED, onChildPlaceholderReplaced);
    on && on(TreeNodeEventTypes.CHILD_PLACEHOLDER_REMOVED, onChildPlaceholderRemoved);
    return () => {
      off && off(TreeNodeEventTypes.REFRESH_CHILD_NODES, onRefreshChildNodes);
      off && off(TreeNodeEventTypes.REFRESH_CHILD_NODES_ON_REMOVED, onRefreshChildNodesOnRemoved);
      off && off(TreeNodeEventTypes.CHILD_ADDED, onChildAdded);
      off && off(TreeNodeEventTypes.CHILD_PLACEHOLDER_REPLACED, onChildPlaceholderReplaced);
      off && off(TreeNodeEventTypes.CHILD_PLACEHOLDER_REMOVED, onChildPlaceholderRemoved);
    };
  }, [on, off, fire, fireTree, forceUpdate, node, detect, globalHandlers]);
  reactExports.useEffect(() => {
    const onNodeCheckedChanged = (_marker, _checked) => {
      forceUpdate();
    };
    on(TreeNodeEventTypes.SWITCH_CHILDREN_CHECKED, onNodeCheckedChanged);
    return () => {
      off(TreeNodeEventTypes.SWITCH_CHILDREN_CHECKED, onNodeCheckedChanged);
    };
  }, [on, off, forceUpdate, node]);
  const children = displayChildren ?? node.$displayChildren ?? node.$children ?? [];
  const childrenCount = children.length;
  const hasChild = childrenCount !== 0;
  if (!hasChild) {
    return null;
  }
  return React.createElement(React.Fragment, null, children.map((child, index) => {
    const last = index === childrenCount - 1;
    const myDisplayIndex = VUtils.isBlank(displayIndex) ? `${index + 1}` : `${displayIndex}.${index + 1}`;
    return React.createElement(TreeNode, { initExpandLevel, showIndex, detect, "$wrapped": $wrapped, node: child, displayIndex: myDisplayIndex, lastOfParent: last, level: level + 1, key: child.$ip2p });
  }).filter((x) => x != null));
};
const NO_MATCHED_TREE_NODE = "__no_matched__";
const TreeContentMouseStateHolder = () => {
  const { on, off } = useTreeEventBus();
  const [mouse, setMouse] = reactExports.useState({ x: 0, y: 0, inside: false });
  reactExports.useEffect(() => {
    const onContentMouseMove = (x, y) => setMouse({ x, y, inside: true });
    const onContentMouseLeave = () => setMouse({ x: 0, y: 0, inside: false });
    const onAskMousePosition = (callback) => {
      if (mouse.inside) {
        callback(mouse.x, mouse.y);
      }
    };
    on(TreeEventTypes.CONTENT_MOUSE_MOVE, onContentMouseMove);
    on(TreeEventTypes.CONTENT_MOUSE_LEAVE, onContentMouseLeave);
    on(TreeEventTypes.ASK_MOUSE_POSITION, onAskMousePosition);
    return () => {
      off(TreeEventTypes.CONTENT_MOUSE_MOVE, onContentMouseMove);
      off(TreeEventTypes.CONTENT_MOUSE_LEAVE, onContentMouseLeave);
      off(TreeEventTypes.ASK_MOUSE_POSITION, onAskMousePosition);
    };
  }, [on, off, mouse]);
  return React.createElement(reactExports.Fragment, null);
};
const TreeContent = (props) => {
  const { root, $pp, initExpandLevel, showIndex, noMatched = React.createElement(IntlLabel, { keys: ["tree", "node", "noMatched"], value: "No matched node." }), detect, $wrapped, refresh } = props;
  const { $p2r } = $wrapped;
  const [filter, setFilter] = reactExports.useState("");
  const { on, off, fire } = useTreeEventBus();
  reactExports.useEffect(() => {
    const onDiscardFilter = () => setFilter("");
    const onFilterChanged = (filter2) => setFilter(`${filter2 ?? ""}`.trim());
    on(TreeEventTypes.DISCARD_FILTER, onDiscardFilter);
    on(TreeEventTypes.FILTER_CHANGED, onFilterChanged);
    return () => {
      off(TreeEventTypes.DISCARD_FILTER, onDiscardFilter);
      off(TreeEventTypes.FILTER_CHANGED, onFilterChanged);
    };
  }, [on, off]);
  const node$p2r = PPUtils.absolute($p2r, $pp);
  const children = () => {
    if (VUtils.isBlank(filter)) {
      const removeDisplayChildren = (node) => {
        (node.$children ?? []).forEach((child) => removeDisplayChildren(child));
        delete node.$displayChildren;
      };
      removeDisplayChildren(root);
      return root.$children ?? [];
    }
    const matches = filter.trim().toLowerCase();
    const onlyChecked = matches === ":checked";
    const onlyUnchecked = matches === ":unchecked";
    const filtered = (node) => {
      const children2 = (node.$children ?? []).map((child) => filtered(child)).filter((x) => x != null);
      node.$displayChildren = children2;
      switch (true) {
        case children2.length !== 0:
        case (onlyChecked && node.checkable && node.checked(node)):
        case (onlyUnchecked && node.checkable && node.checked(node) === false):
        case (node.stringify != null && (node.stringify(node) ?? "").toLowerCase().includes(matches)):
        case (typeof node.label === "string" && internationalize(node.label, [node.label]).toLowerCase().includes(matches)):
          return node;
        default:
          return null;
      }
    };
    return (root.$children ?? []).map((child) => filtered(child)).filter((x) => x != null);
  };
  root.$displayChildren = children();
  if (root.$displayChildren.length === 0) {
    const def = {
      value: NO_MATCHED_TREE_NODE,
      label: toIntlLabel(noMatched),
      checkable: false,
      removable: false,
      addable: false,
      $ip2r: PPUtils.absolute($p2r, $pp),
      $ip2p: $pp
    };
    return React.createElement(
      TreeContentContainer,
      null,
      React.createElement(TreeNode, { initExpandLevel: 0, showIndex: false, detect, "$wrapped": { ...$wrapped, $p2r: node$p2r }, node: def, displayIndex: "0", lastOfParent: true, level: 0 })
    );
  } else {
    const expandParent = VUtils.noop;
    const nodeCheckedChanged = VUtils.noop;
    const onMouseMove = (event) => {
      fire(TreeEventTypes.CONTENT_MOUSE_MOVE, event.clientX, event.clientY);
    };
    const onMouseLeave = () => {
      fire(TreeEventTypes.CONTENT_MOUSE_LEAVE);
    };
    const onScroll = () => {
      fire(TreeEventTypes.ASK_MOUSE_POSITION, (x, y) => {
        const element = document.elementFromPoint(x, y);
        const node = element.closest("div[data-w=d9-tree-node-container]");
        if (node == null) {
          return;
        }
        const { top: treeTop } = node.closest("div[data-w=d9-tree]").getBoundingClientRect();
        const { top, height } = node.getBoundingClientRect();
        fire(TreeEventTypes.SHOW_HOVER_BOX, top - treeTop, height);
      });
    };
    return React.createElement(
      TreeContentContainer,
      { onMouseMove, onMouseLeave, onScroll },
      React.createElement(TreeContentMouseStateHolder, null),
      React.createElement(
        TreeNodeEventBusProvider,
        null,
        React.createElement(TreeNodeEventBridge, { node: root, expandParent, nodeCheckedChanged, nodeRemoved: refresh }),
        React.createElement(ChildTreeNodes, { node: root, displayChildren: root.$displayChildren, detect, initExpandLevel, level: -1, showIndex, displayIndex: "", "$wrapped": { ...$wrapped, $p2r: node$p2r } })
      )
    );
  }
};
const TreeHoverBox = () => {
  const { on, off } = useTreeEventBus();
  const [state, setState] = reactExports.useState({ visible: false });
  reactExports.useEffect(() => {
    const onShowHoverBox = (top, height) => {
      setState({ visible: true, top, height });
    };
    const onHideHoverBox = () => setState({ visible: false });
    on(TreeEventTypes.SHOW_HOVER_BOX, onShowHoverBox);
    on(TreeEventTypes.HIDE_HOVER_BOX, onHideHoverBox);
    return () => {
      off(TreeEventTypes.SHOW_HOVER_BOX, onShowHoverBox);
      off(TreeEventTypes.HIDE_HOVER_BOX, onHideHoverBox);
    };
  }, [on, off]);
  return React.createElement(TreeHoverShade, { top: state.top ?? 0, height: state.height ?? 0, visible: state.visible });
};
const TreeSearchBox = (props) => {
  const { disabled } = props;
  const ref = reactExports.useRef(null);
  const { on, off, fire } = useTreeEventBus();
  const [state, setState] = reactExports.useState({ value: "", visible: false });
  reactExports.useEffect(() => {
    if (disabled) {
      return;
    }
    const onOpenSearchBox = () => {
      if (state.visible) {
        return;
      }
      setState({ value: "", visible: true });
    };
    const onHideSearchBox = () => {
      if (!state.visible) {
        return;
      }
      fire(TreeEventTypes.DISCARD_FILTER);
      setState({ value: "", visible: false });
    };
    on(TreeEventTypes.OPEN_SEARCH_BOX, onOpenSearchBox);
    on(TreeEventTypes.HIDE_SEARCH_BOX, onHideSearchBox);
    return () => {
      off(TreeEventTypes.OPEN_SEARCH_BOX, onOpenSearchBox);
      off(TreeEventTypes.HIDE_SEARCH_BOX, onHideSearchBox);
    };
  }, [on, off, fire, disabled, state.visible]);
  reactExports.useEffect(() => {
    var _a, _b, _c, _d;
    if (disabled) {
      return;
    }
    if (state.visible) {
      (_b = (_a = ref.current) == null ? void 0 : _a.querySelector("input")) == null ? void 0 : _b.focus();
    } else {
      (_d = (_c = ref.current) == null ? void 0 : _c.parentElement) == null ? void 0 : _d.focus();
    }
  }, [disabled, state.visible]);
  const onValueChange = (value) => {
    setState((state2) => ({ ...state2, value }));
    fire(TreeEventTypes.FILTER_CHANGED, value);
  };
  return React.createElement(TreeSearchInput, { visible: state.visible, value: state.value, onValueChange, leads: ["$icons.search"], placeholder: "tree.filter.placeholder", ref });
};
const useMarker = () => {
  const markers = reactExports.useRef({});
  const { on, off } = useTreeEventBus();
  const [funcs] = reactExports.useState(() => {
    const generate = (node) => {
      let marker = NUtils.generateReactKey();
      while (markers[marker] === true) {
        marker = NUtils.generateReactKey();
      }
      markers[marker] = true;
      if (node != null) {
        node.marker = marker;
      }
      return marker;
    };
    const add = (node) => {
      if (VUtils.isBlank(node.marker)) {
        markers[generate(node)] = true;
      } else {
        markers[node.marker] = true;
      }
    };
    const deleteMarker = (node) => {
      if (VUtils.isNotBlank(node.marker)) {
        delete markers[node.marker];
      }
    };
    return { generate, add, delete: deleteMarker };
  });
  reactExports.useEffect(() => {
    const onAskMarkerAdder = (callback) => callback(funcs.add);
    on(TreeEventTypes.ASK_MARKER_ADDER, onAskMarkerAdder);
    return () => {
      off(TreeEventTypes.ASK_MARKER_ADDER, onAskMarkerAdder);
    };
  }, [on, off, funcs.add]);
  return funcs;
};
const defaultTreeNodesDetective = (parentNode, _options) => {
  if (parentNode == null || parentNode.value == null) {
    return [];
  }
  let nodes;
  let parent$ip2r;
  if (Array.isArray(parentNode.value)) {
    nodes = parentNode.value;
    parent$ip2r = parentNode.$ip2r;
  } else {
    nodes = parentNode.value.children ?? [];
    parent$ip2r = `${parentNode.$ip2r}.children`;
  }
  return nodes.map((item, index) => {
    if (item == null) {
      return null;
    } else {
      const $ip2p = `[${index}]`;
      const $ip2r = PPUtils.concat(parent$ip2r, $ip2p);
      return {
        value: item,
        $ip2r,
        $ip2p,
        label: VUtils.isPrimitive(item) ? `${item ?? ""}` : item.label ?? "",
        checkable: false,
        addable: false,
        removable: false
      };
    }
  }).filter((item) => item != null);
};
const buildTreeNodesDetective = (detective, markers) => {
  const detect = detective ?? defaultTreeNodesDetective;
  const beautifyTreeNodes = (nodes) => {
    return (nodes ?? []).map((node) => {
      node.checkable = node.checkable ?? false;
      node.addable = node.addable ?? false;
      node.removable = node.removable ?? false;
      markers.add(node);
      if (node.$children != null) {
        beautifyTreeNodes(node.$children);
      }
      return node;
    });
  };
  const detectChildren = (node, _options) => {
    node.$children = detect(node, _options);
    if (node.$children != null && node.$children.length === 0) {
      delete node.$children;
    }
    if (node.$children != null) {
      node.$children.forEach((child) => {
        child.$parent = node;
        detectChildren(child, _options);
      });
    }
  };
  return (parentNode, _options) => {
    const nodes = detect(parentNode, _options);
    (nodes || []).forEach((node) => detectChildren(node, _options));
    return beautifyTreeNodes(nodes);
  };
};
const InternalTree = reactExports.forwardRef((props, ref) => {
  const { $pp, initExpandLevel = -1, showIndex = false, detective, height = 300, marker, noMatched, disableSearchBox = false, children, $wrapped, ...rest } = props;
  const { $p2r, $avs: { $disabled, $visible } } = $wrapped;
  const { on, off } = useGlobalEventBus();
  const globalHandlers = useGlobalHandlers();
  const { fire } = useTreeEventBus();
  const forceUpdate = useForceUpdate();
  reactExports.useEffect(() => {
    const onCustomEvent = (_, prefix, clipped) => {
      if (prefix !== GlobalEventPrefix.REFRESH_TREE || clipped !== marker) {
        return;
      }
      forceUpdate();
    };
    on && on(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
    return () => {
      off && off(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
    };
  }, [on, off, forceUpdate, marker]);
  const markers = useMarker();
  const onKeyDown = (event) => {
    if (disableSearchBox) {
      return;
    }
    const isCtrlKey = event.ctrlKey || event.metaKey;
    const isFKey = event.key === "f";
    if (isCtrlKey && isFKey) {
      event.preventDefault();
      fire(TreeEventTypes.OPEN_SEARCH_BOX);
    } else if (event.key === "Escape") {
      fire(TreeEventTypes.HIDE_SEARCH_BOX);
    }
  };
  const detect = buildTreeNodesDetective(detective, markers);
  const rootNodeValue = MUtils.getValue($wrapped.$model, $pp);
  const rootNodeDef = {
    value: rootNodeValue,
    $ip2r: PROPERTY_PATH_ME,
    $ip2p: PROPERTY_PATH_ME,
    label: "",
    checkable: false,
    addable: false,
    removable: false,
    marker
  };
  rootNodeDef.$children = detect(rootNodeDef, { global: globalHandlers }) ?? [];
  return React.createElement(
    ATree,
    { ...rest, "data-disabled": $disabled, "data-visible": $visible, height, id: PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id), onKeyDown, tabIndex: disableSearchBox ? void 0 : 0, ref },
    React.createElement(TreeHoverBox, null),
    React.createElement(TreeSearchBox, { disabled: disableSearchBox }),
    children,
    React.createElement(TreeContent, { root: rootNodeDef, initExpandLevel, showIndex, noMatched, detect, "$pp": $pp, "$wrapped": $wrapped, refresh: () => forceUpdate() })
  );
});
const Tree = reactExports.forwardRef((props, ref) => {
  return React.createElement(
    TreeEventBusProvider,
    null,
    React.createElement(InternalTree, { ...props, ref })
  );
});
registerWidget({ key: "Tree", JSX: Tree, container: false, array: false });
var DropdownPopupStateActive;
(function(DropdownPopupStateActive2) {
  DropdownPopupStateActive2["WILL_ACTIVE"] = "will-active";
  DropdownPopupStateActive2["ACTIVE"] = "active";
  DropdownPopupStateActive2["HIDDEN"] = "hidden";
})(DropdownPopupStateActive || (DropdownPopupStateActive = {}));
const isDropdownPopupActive = (active) => {
  return [DropdownPopupStateActive.ACTIVE, DropdownPopupStateActive.WILL_ACTIVE].includes(active);
};
const DropdownContainer = qe.div.attrs(({ id, active, atBottom }) => {
  return {
    [DOM_ID_WIDGET]: id,
    "data-active": isDropdownPopupActive(active),
    "data-at-bottom": !!atBottom
  };
})`
    display: flex;
    position: relative;
    align-items: center;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    padding: 0 ${CssVars.INPUT_INDENT};
    outline: none;
    appearance: none;
    border: ${CssVars.BORDER};
    border-radius: ${CssVars.BORDER_RADIUS};
    height: ${CssVars.INPUT_HEIGHT};
    background-color: transparent;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    cursor: pointer;
    width: 100%;

    &[data-visible=false] {
        display: none;
    }

    &[disabled], &[data-disabled=true] {
        border-color: ${CssVars.BORDER_COLOR};
        background-color: ${CssVars.DISABLE_COLOR};
        cursor: default;

        &:hover, &:focus-within {
            border-color: ${CssVars.BORDER_COLOR};
            box-shadow: none;

            > span[data-w=d9-dropdown-stick] {
                opacity: 0;
            }
        }
    }

    &:hover {
        box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
    }

    &:focus-within {
        box-shadow: ${CssVars.PRIMARY_SHADOW};
    }

    &:hover,
    &:focus-within {
        border-color: ${CssVars.PRIMARY_COLOR};

        > span[data-w=d9-dropdown-stick] {
            opacity: 0.8;

            &[data-clear=true] {
                > svg {
                    fill: ${CssVars.DANGER_COLOR};
                }
            }
        }
    }
`;
const DropdownLabel = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-dropdown-label" })`
    flex-grow: 1;
    display: flex;
    align-items: center;
    color: ${CssVars.FONT_COLOR};
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    height: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-x: hidden;

    &[data-please=true] {
        color: ${CssVars.PLACEHOLDER_COLOR};
    }

    &[data-please=false] ~ &[data-please=true] {
        display: none;
    }
`;
const DropdownStickCaret = qe(CaretDown).attrs({ [DOM_KEY_WIDGET]: "d9-dropdown-caret" })`
    height: calc(${CssVars.INPUT_HEIGHT} * 2 / 5);
    fill: ${CssVars.FONT_COLOR};
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
`;
const DropdownStickClear = qe(Times).attrs({ [DOM_KEY_WIDGET]: "d9-dropdown-clear" })`
    height: calc(${CssVars.INPUT_HEIGHT} * 2 / 5);
    fill: ${CssVars.FONT_COLOR};
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
`;
const DropdownStickContainer = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-dropdown-stick" })`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    height: calc(${CssVars.INPUT_HEIGHT} * 3 / 4);
    width: calc(${CssVars.INPUT_HEIGHT} * 3 / 4);
    border-radius: calc(${CssVars.BORDER_RADIUS});
    margin-left: 8px;
    margin-right: calc(${CssVars.INPUT_INDENT} * -1 + 4px);
    opacity: 0;
    transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    overflow: hidden;

    &[data-clear=true] {
        > svg {
            fill: ${CssVars.DANGER_COLOR};
        }
    }

    &[data-disabled=true] {
        display: none;
    }

    &:before {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: transparent;
        z-index: -1;
        transition: background-color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    }
`;
const DropdownStick = (props) => {
  const { valueAssigned, clearable, clear, disabled, icon, ...rest } = props;
  const onClearClicked = (event) => {
    clear(event);
  };
  if (valueAssigned && clearable) {
    return React.createElement(
      DropdownStickContainer,
      { "data-clear": true, "data-disabled": disabled, onClick: onClearClicked, ...rest },
      React.createElement(DropdownStickClear, null)
    );
  } else {
    return React.createElement(DropdownStickContainer, { "data-disabled": disabled, ...rest }, icon == null ? React.createElement(DropdownStickCaret, null) : icon);
  }
};
const DropdownPopupContainer = qe.div.attrs(({ atBottom, shown, vScroll, hScroll, top, left, height, minWidth, maxWidth, minHeight, maxHeight }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-dropdown-popup",
    "data-v-scroll": vScroll ? "" : void 0,
    "data-h-scroll": hScroll ? "" : void 0,
    "data-at-bottom": atBottom,
    style: {
      "--opacity": shown ? 1 : 0,
      "--pointer-events": shown ? "auto" : "none",
      "--top": atBottom ? toCssSize(shown ? top + height + 3 : top + height + 29) : "unset",
      "--bottom": atBottom ? "unset" : toCssSize(shown ? `calc(100vh - ${top}px + 3px)` : `calc(100vh - ${top}px + 29px)`),
      "--left": toCssSize(left),
      "--min-width": toCssSize(minWidth),
      "--max-width": toCssSize(maxWidth),
      "--min-height": toCssSize(minHeight),
      "--max-height": toCssSize(maxHeight),
      "--overflow-y": vScroll ? "auto" : "hidden",
      "--overflow-x": hScroll ? "auto" : "hidden"
    }
  };
})`
    display: block;
    position: fixed;
    top: var(--top);
    left: var(--left);
    bottom: var(--bottom);
    min-width: var(--min-width);
    max-width: var(--max-width);
    min-height: var(--min-height);
    max-height: var(--max-height);
    color: ${CssVars.FONT_COLOR};
    background-color: ${CssVars.BACKGROUND_COLOR};
    border: ${CssVars.BORDER};
    border-color: ${CssVars.PRIMARY_COLOR};
    border-radius: ${CssVars.BORDER_RADIUS};
    box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
    transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, top ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, bottom ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    z-index: ${CssVars.DROPDOWN_Z_INDEX};
    overflow-x: var(--overflow-x);
    overflow-y: var(--overflow-y);
    opacity: var(--opacity);
    pointer-events: var(--pointer-events);
`;
const DropdownPopup = reactExports.forwardRef((props, ref) => {
  const { shown, vScroll, hScroll, children, ...state } = props;
  return React.createElement(DropdownPopupContainer, { shown, vScroll, hScroll, ...state, ref }, children);
});
const getDropdownPosition = (container) => {
  const rect = container.getBoundingClientRect();
  return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
};
const isPopupAtBottom = (top, height, askPopupHeight) => {
  const popupHeight = askPopupHeight();
  switch (true) {
    case top + height + popupHeight + 2 < window.innerHeight:
      return true;
    case top - popupHeight - 2 >= 0:
      return false;
    default:
      return true;
  }
};
const MAX_WIDTH_MARGIN = 8;
const useDropdownControl = (options) => {
  const { askPopupMaxHeight, askPopupMaxWidth, afterPopupShown, afterPopupHide, fixWidth = false } = options;
  const containerRef = reactExports.useRef(null);
  const popupRef = reactExports.useRef(null);
  const [popupState, setPopupState] = reactExports.useState({
    active: DropdownPopupStateActive.HIDDEN,
    atBottom: true,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    minWidth: 0,
    maxHeight: askPopupMaxHeight()
  });
  const [popupShown, setPopupShown] = reactExports.useState(false);
  const expectMaxWidth = askPopupMaxWidth();
  reactExports.useEffect(() => {
    if (isDropdownPopupActive(popupState.active)) {
      setPopupShown(true);
      const { left, width } = popupRef.current.getBoundingClientRect();
      let toBeWidth = width;
      if (!fixWidth) {
        const { width: containerWidth } = containerRef.current.getBoundingClientRect();
        toBeWidth = Math.max(width, containerWidth);
        popupRef.current.style.minWidth = `${toBeWidth}px`;
        const shouldAdjustWidth = (allowWordWrap) => {
          if (popupRef.current.scrollHeight === popupRef.current.clientHeight) {
            return false;
          }
          const children = popupRef.current.children;
          if (children.length <= 2) {
            return false;
          }
          const height = children.item(1).clientHeight;
          for (let index = 2, count = children.length; index < count; index++) {
            const child = children.item(index);
            if (child.clientHeight !== height) {
              return !allowWordWrap;
            }
          }
          return allowWordWrap;
        };
        if (shouldAdjustWidth(false)) {
          const maxWidth = Math.max(containerWidth, expectMaxWidth ?? (MBUtils.isMobile() ? window.innerWidth - MAX_WIDTH_MARGIN * 2 : window.innerWidth / 2));
          popupRef.current.style.minWidth = `${maxWidth}px`;
          if (shouldAdjustWidth(true)) {
            toBeWidth = maxWidth;
          } else {
            const widthDiff = maxWidth - toBeWidth;
            let ratio = 0.5;
            let offset = 0.5;
            let computedWidth = toBeWidth + widthDiff * ratio;
            while (maxWidth - computedWidth > 10 && computedWidth - toBeWidth > 10) {
              popupRef.current.style.minWidth = `${computedWidth}px`;
              if (shouldAdjustWidth(false)) {
                ratio = ratio + offset / 2;
              } else {
                ratio = ratio - offset / 2;
              }
              offset = offset / 2;
              computedWidth = toBeWidth + widthDiff * ratio;
            }
            toBeWidth = computedWidth;
          }
        }
        popupRef.current.style.minWidth = "";
      }
      if (left + toBeWidth + MAX_WIDTH_MARGIN > window.innerWidth) {
        const { left: parentLeft, width: parentWidth } = popupRef.current.parentElement.getBoundingClientRect();
        let left2 = parentLeft + parentWidth - toBeWidth;
        if (left2 <= MAX_WIDTH_MARGIN) {
          left2 = window.innerWidth - toBeWidth - MAX_WIDTH_MARGIN;
          if (left2 > MAX_WIDTH_MARGIN) {
            left2 = MAX_WIDTH_MARGIN;
          }
        }
        setPopupState((state) => ({
          ...state,
          active: DropdownPopupStateActive.ACTIVE,
          left: left2,
          minWidth: toBeWidth,
          maxWidth: toBeWidth
        }));
      } else {
        setPopupState((state) => ({ ...state, active: DropdownPopupStateActive.ACTIVE }));
      }
      afterPopupShown && afterPopupShown();
    }
  }, [popupState.active, afterPopupShown, expectMaxWidth, fixWidth]);
  reactExports.useEffect(() => {
    if (!popupShown) {
      setPopupState((state) => ({ ...state, active: DropdownPopupStateActive.HIDDEN }));
    }
  }, [popupShown]);
  useCollapseFixedThing({
    containerRef,
    visible: [DropdownPopupStateActive.ACTIVE, DropdownPopupStateActive.WILL_ACTIVE].includes(popupState.active),
    hide: () => {
      setPopupShown(false);
      afterPopupHide && afterPopupHide();
    }
  });
  return {
    containerRef,
    popupRef,
    popupState,
    setPopupState,
    popupShown,
    setPopupShown
  };
};
const useFilterableDropdownOptions = (props) => {
  const { optionSort, maxWidth, noAvailable = React.createElement(IntlLabel, { keys: ["options", "noAvailable"], value: "No available option." }), noMatched = React.createElement(IntlLabel, { keys: ["options", "noMatched"], value: "No matched option." }), filterable = true, takeoverFilter, filterChanged, $wrapped: { $avs: { $disabled } } } = props;
  const filterInputRef = reactExports.useRef(null);
  const [filter, setFilter] = reactExports.useState("");
  const [functions] = reactExports.useState(() => {
    return {
      afterPopupShown: () => {
        var _a;
        return (_a = filterInputRef.current) == null ? void 0 : _a.focus();
      },
      afterPopupHide: () => setTimeout(async () => {
        setFilter("");
        filterChanged && await filterChanged("", "hide");
      }, 100)
    };
  });
  const { containerRef, popupRef, popupState, setPopupState, popupShown, setPopupShown } = useDropdownControl({
    askPopupMaxHeight: () => 8 * CssVars.INPUT_HEIGHT_VALUE + 2,
    askPopupMaxWidth: () => maxWidth,
    afterPopupShown: functions.afterPopupShown,
    afterPopupHide: functions.afterPopupHide
  });
  const { askOptions, createAskDisplayOptions } = useOptionItems({ ...props, noAvailable });
  const askDisplayOptions = createAskDisplayOptions(() => {
    return (takeoverFilter ?? true) && VUtils.isNotBlank(filter) || optionSort != null;
  }, (options) => {
    const transformed = options.map((option) => {
      let str = "";
      if (option.stringify != null) {
        str = option.stringify(option);
      } else if (["string", "number", "boolean"].includes(typeof option.label)) {
        const label = `${option.label}`;
        str = internationalize(label, [label]);
      }
      return { str: (str || "").toLowerCase(), option };
    });
    let remained = transformed;
    if (VUtils.isNotBlank(filter)) {
      const filterText = filter.trim().toLowerCase();
      remained = transformed.filter(({ str }) => str.includes(filterText));
    }
    if (optionSort == OptionItemSort.ASC) {
      remained.sort((a, b) => a.str.localeCompare(b.str));
    } else if (optionSort == OptionItemSort.DESC) {
      remained.sort((a, b) => b.str.localeCompare(a.str));
    }
    return remained.length === 0 ? [{ value: NO_MATCHED_OPTION_ITEM, label: toIntlLabel(noMatched) }] : remained.map(({ option }) => option);
  });
  const displayOptions = askDisplayOptions();
  const fixFilterExists = DropdownDefaults.DEFAULTS.FIX_FILTER && VUtils.isNotBlank(filter);
  const popupHeight = 2 + CssVars.INPUT_HEIGHT_VALUE * Math.min(displayOptions.length + (fixFilterExists ? 1 : 0), 8);
  const repaintPopup = () => {
    if ($disabled) {
      return;
    }
    const { top, left, width, height } = getDropdownPosition(containerRef.current);
    const bottom = isPopupAtBottom(top, height, () => popupHeight);
    setPopupState((state) => ({
      ...state,
      active: DropdownPopupStateActive.WILL_ACTIVE,
      atBottom: bottom,
      top,
      left,
      width,
      height,
      minWidth: width,
      minHeight: popupHeight
    }));
  };
  const onClicked = () => {
    if ($disabled || isDropdownPopupActive(popupState.active)) {
      return;
    }
    repaintPopup();
  };
  const onFocused = () => {
    var _a;
    if ($disabled || isDropdownPopupActive(popupState.active)) {
      return;
    }
    (_a = filterInputRef.current) == null ? void 0 : _a.focus();
  };
  const onKeyUp = async (event) => {
    if (!isDropdownPopupActive(popupState.active)) {
      return;
    }
    const { key } = event;
    if (key === "Escape") {
      setFilter("");
      filterChanged && await filterChanged("", "search");
    }
  };
  const onFilterChanged = async (event) => {
    if ($disabled || filterable === false) {
      return;
    }
    setFilter(event.target.value);
    filterChanged && await filterChanged(event.target.value, "search");
  };
  const onAnyInputEvent = (event) => {
    var _a, _b;
    if (filterable === false || event.target === filterInputRef.current) {
      return;
    }
    if (!isDropdownPopupActive(popupState.active)) {
      onClicked();
    }
    (_a = filterInputRef.current) == null ? void 0 : _a.dispatchEvent(new Event("keydown", event));
    (_b = filterInputRef.current) == null ? void 0 : _b.focus();
  };
  return {
    filterInputRef,
    filter,
    setFilter,
    askOptions,
    askDisplayOptions,
    displayOptions,
    containerRef,
    popupState,
    setPopupState,
    popupHeight,
    popupRef,
    popupShown,
    setPopupShown,
    afterPopupStateChanged: functions,
    repaintPopup,
    onClicked,
    onFocused,
    onKeyUp,
    onFilterChanged,
    onAnyInputEvent
  };
};
const OptionFilter = qe.div.attrs(({ "data-w": widgetKey, active, atBottom, top, left, height }) => {
  const fixFilter = DropdownDefaults.DEFAULTS.FIX_FILTER ?? false;
  return {
    [DOM_KEY_WIDGET]: widgetKey,
    "data-filter-active": active,
    "data-fix-filter": fixFilter,
    style: {
      "--position": fixFilter ? "sticky" : "fixed",
      "--opacity": fixFilter ? 1 : active ? 1 : 0,
      "--top": fixFilter ? 0 : atBottom ? top + height - 10 : void 0,
      "--bottom": fixFilter ? void 0 : atBottom ? void 0 : `calc(100vh - ${top}px - 10px)`,
      "--left": fixFilter ? 0 : left - 10,
      "--height": fixFilter ? active ? CssVars.INPUT_HEIGHT : 0 : `calc(${CssVars.INPUT_HEIGHT} / 5 * 4)`,
      "--width": fixFilter ? "100%" : void 0,
      "--font-size": fixFilter ? CssVars.FONT_SIZE : `calc(${CssVars.FONT_SIZE} - 2px)`,
      "--padding": fixFilter ? 0 : `0 ${CssVars.INPUT_INDENT}`,
      "--border-radius": fixFilter ? 0 : CssVars.BORDER_RADIUS
    }
  };
})`
    display: flex;
    position: var(--position);
    top: var(--top);
    bottom: var(--bottom);
    left: var(--left);
    align-items: center;
    font-family: ${CssVars.FONT_FAMILY};
    font-size: var(--font-size);
    height: var(--height);
    width: var(--width);
    padding: var(--padding);
    border-radius: var(--border-radius);
    background-color: ${CssVars.BACKGROUND_COLOR};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    opacity: var(--opacity);
    z-index: calc(${CssVars.DROPDOWN_Z_INDEX} + 1);

    &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${CssVars.INFO_COLOR};
        border-radius: ${CssVars.BORDER_RADIUS};
        opacity: 0.9;
        z-index: -1;
    }

    &[data-fix-filter=true] {
        &[data-filter-active=true] {
            border-bottom: ${CssVars.BORDER};
        }

        &:before {
            display: none;
        }

        > span:first-child {
            display: none;
        }

        > span:nth-child(2) {
            display: flex;
        }

        > input {
            color: ${CssVars.FONT_COLOR};
            caret-color: unset;
            caret-shape: unset;
            padding: 0 ${CssVars.INPUT_INDENT};
            width: 100%;
            height: 100%;
        }
    }

    > span:first-child {
        color: ${CssVars.INVERT_COLOR};
        font-weight: ${CssVars.FONT_BOLD};
        margin-right: 4px;
    }

    > span:nth-child(2) {
        display: none;
        position: relative;
        align-items: center;
        justify-content: center;
        min-width: ${CssVars.INPUT_HEIGHT};
        height: 100%;
        border-right: ${CssVars.BORDER};
        color: ${CssVars.FONT_COLOR};
        fill: ${CssVars.FONT_COLOR};

        > svg {
            height: ${CssVars.FONT_SIZE};
        }
    }

    > input {
        font-size: var(--font-size);
        border-radius: 0;
        border: 0;
        outline: none;
        background-color: transparent;
        color: ${CssVars.INVERT_COLOR};
        caret-color: transparent;
        caret-shape: revert;
    }
`;
var DropdownTreeEventTypes;
(function(DropdownTreeEventTypes2) {
  DropdownTreeEventTypes2["FILTER_CHANGED"] = "filter-changed";
})(DropdownTreeEventTypes || (DropdownTreeEventTypes = {}));
const Context$4 = reactExports.createContext({});
Context$4.displayName = "DropdownTreeEventBus";
const DropdownTreeEventBusProvider = (props) => {
  const { children } = props;
  const bus = useCreateEventBus("dropdown-tree");
  return React.createElement(Context$4.Provider, { value: bus }, children);
};
const useDropdownTreeEventBus = () => reactExports.useContext(Context$4);
const DropdownTreeFilterBridge = () => {
  const { on, off } = useDropdownTreeEventBus();
  const { fire } = useTreeEventBus();
  reactExports.useEffect(() => {
    const onFilterChanged = (filter) => {
      fire(TreeEventTypes.FILTER_CHANGED, filter);
    };
    on(DropdownTreeEventTypes.FILTER_CHANGED, onFilterChanged);
    return () => {
      off(DropdownTreeEventTypes.FILTER_CHANGED, onFilterChanged);
    };
  }, [on, off, fire]);
  return React.createElement(reactExports.Fragment, null);
};
const computeDropdownTreePopupHeight = (allOptions, filter) => {
  const allOptionCount = (() => {
    const countChildren = (option) => {
      return (option.children ?? []).reduce((count, option2) => {
        const childrenCount = countChildren(option2);
        return count + 1 + childrenCount;
      }, 0);
    };
    return allOptions.reduce((count, option) => {
      return count + countChildren(option);
    }, 0);
  })();
  const fixFilterExists = DropdownDefaults.DEFAULTS.FIX_FILTER && VUtils.isNotBlank(filter);
  return 2 + CssVars.INPUT_HEIGHT_VALUE * Math.min(allOptionCount + (fixFilterExists ? 1 : 0), 8);
};
const DropdownDefaults = {
  DEFAULTS: { FIX_FILTER: false }
};
const DropdownUtils = {
  setDropdownDefaults: (defaults) => {
    DropdownDefaults.DEFAULTS.FIX_FILTER = defaults.fixFilter ?? DropdownDefaults.DEFAULTS.FIX_FILTER;
  }
};
var ButtonBarAlignment;
(function(ButtonBarAlignment2) {
  ButtonBarAlignment2["LEFT"] = "left";
  ButtonBarAlignment2["CENTER"] = "center";
  ButtonBarAlignment2["RIGHT"] = "right";
})(ButtonBarAlignment || (ButtonBarAlignment = {}));
const AButtonBar = qe.div.attrs(({ id, [DOM_KEY_WIDGET]: dataW }) => {
  return {
    [DOM_KEY_WIDGET]: dataW ?? "d9-button-bar",
    [DOM_ID_WIDGET]: id
  };
})`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: end;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    height: calc(${CssVars.INPUT_HEIGHT} + 16px);
    padding: 8px 0;
    border-radius: ${CssVars.BORDER_RADIUS};
    outline: none;

    &[data-alignment=left] {
        justify-content: start;

        > button:not(:first-child) {
            margin-left: 8px;
        }
    }

    &[data-alignment=center] {
        justify-content: center;

        > button:not(:first-child) {
            margin-left: 8px;
        }
    }

    > button:not(:last-child) {
        margin-right: 8px;
    }
`;
const ButtonBar = reactExports.forwardRef((props, ref) => {
  const { alignment = ButtonBarAlignment.RIGHT, children, ...rest } = props;
  return React.createElement(AButtonBar, { ...rest, "data-alignment": alignment, ref }, children);
});
registerWidget({ key: "ButtonBar", JSX: ButtonBar, container: true, array: false });
const Option$2 = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-dropdown-option" })`
    display: flex;
    position: relative;
    align-items: center;
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    line-height: calc(${CssVars.FONT_SIZE} * 1.4);
    padding: calc(${CssVars.INPUT_HEIGHT} / 8) ${CssVars.INPUT_INDENT};
    min-height: ${CssVars.INPUT_HEIGHT};
    //overflow: hidden;
    //white-space: nowrap;
    //text-overflow: ellipsis;

    &[data-can-click=false] {
        cursor: default;
    }

    &:hover {
        background-color: ${CssVars.HOVER_COLOR};
    }
`;
const Dropdown = reactExports.forwardRef((props, ref) => {
  var _a;
  const { options, optionSort, noAvailable, noMatched, $pp, $wrapped: { $onValueChange, $root, $model, $p2r, $avs: { $disabled, $visible } }, please = "", clearable = true, tip, ...rest } = props;
  const globalHandlers = useGlobalHandlers();
  const { askOptions, displayOptions, filterInputRef, filter, onFilterChanged, containerRef, popupState, popupHeight, popupRef, popupShown, setPopupShown, afterPopupStateChanged, onClicked, onFocused, onKeyUp, onAnyInputEvent } = useFilterableDropdownOptions(props);
  useDualRefs(containerRef, ref);
  useTip({ ref: containerRef, ...buildTip({ tip, root: $root, model: $model }) });
  const forceUpdate = useForceUpdate();
  const onOptionClicked = (option) => async (event) => {
    if ($disabled) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    await $onValueChange(option.value, true, { global: globalHandlers });
    setPopupShown(false);
    if (filter !== "") {
      afterPopupStateChanged.afterPopupHide();
    }
    setTimeout(() => {
      var _a2;
      return (_a2 = containerRef.current) == null ? void 0 : _a2.focus();
    }, 30);
  };
  const onClearClicked = async (event) => {
    if ($disabled) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const value2 = MUtils.getValue($model, $pp);
    if (value2 != null) {
      await $onValueChange(null, true, { global: globalHandlers });
    }
    if (!isDropdownPopupActive(popupState.active)) {
      onClicked();
    } else {
      forceUpdate();
    }
  };
  const value = MUtils.getValue($model, $pp);
  const selected = value != null;
  const label = (value == null ? please : ((_a = askOptions().find((option) => option.value == value)) == null ? void 0 : _a.label) ?? please) || "";
  const deviceTags = MBUtils.pickDeviceTags(props);
  return React.createElement(
    DropdownContainer,
    { active: popupState.active, atBottom: popupState.atBottom, role: "input", tabIndex: 0, ...rest, "data-w": "d9-dropdown", "data-disabled": $disabled, "data-visible": $visible, "data-clearable": clearable, onFocus: onFocused, onClick: onClicked, onKeyDown: onAnyInputEvent, id: PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id), ref: containerRef },
    React.createElement(DropdownLabel, { "data-please": !selected }, toIntlLabel(label)),
    React.createElement(DropdownStick, { valueAssigned: selected, clearable, clear: onClearClicked, disabled: $disabled }),
    isDropdownPopupActive(popupState.active) ? React.createElement(
      DropdownPopup,
      { ...{ ...popupState, minHeight: popupHeight }, shown: popupShown && popupState.active === DropdownPopupStateActive.ACTIVE, ...deviceTags, vScroll: true, ref: popupRef },
      React.createElement(
        OptionFilter,
        { ...{ ...popupState, active: !!filter }, "data-w": "d9-dropdown-option-filter" },
        React.createElement("span", null, "?:"),
        React.createElement(
          "span",
          null,
          React.createElement(Search, null)
        ),
        React.createElement("input", { value: filter, onChange: onFilterChanged, onKeyUp, ref: filterInputRef })
      ),
      displayOptions.map((option, index) => {
        const { value: value2, label: label2 } = option;
        const canClick = ![NO_MATCHED_OPTION_ITEM, NO_AVAILABLE_OPTION_ITEM].includes(`${value2}`);
        return React.createElement(Option$2, { key: `${value2}-${index}`, "data-can-click": canClick, onClick: canClick ? onOptionClicked(option) : void 0 }, toIntlLabel(label2));
      })
    ) : null
  );
});
registerWidget({ key: "Dropdown", JSX: Dropdown, container: false, array: false });
const MultiDropdownContainer = qe(DropdownContainer)`
    align-self: start;
    flex-wrap: wrap;
    height: unset;
    min-height: ${CssVars.INPUT_HEIGHT};
    padding-right: calc(${CssVars.INPUT_HEIGHT} - ${CssVars.INPUT_INDENT} + 4px);
`;
const MultiDropdownLabel = qe(DropdownLabel)`
    flex-grow: unset;
    border: ${CssVars.BORDER};
    border-radius: ${CssVars.BORDER_RADIUS};
    color: ${CssVars.FONT_COLOR};
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    height: unset;
    min-height: calc(${CssVars.INPUT_HEIGHT} - 6px);
    padding: 0 calc(${CssVars.INPUT_INDENT} / 2);
    margin: 2px 8px 2px -4px;
    white-space: normal;

    > span:first-child {
        display: flex;
        position: relative;
        flex-grow: 1;
        align-items: center;
    }

    > span:last-child {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        height: calc(${CssVars.INPUT_HEIGHT} * 3 / 4);
        width: calc(${CssVars.INPUT_HEIGHT} * 3 / 4);
        opacity: 0.2;
        transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

        > svg {
            height: calc(${CssVars.INPUT_HEIGHT} * 2 / 5);
            fill: ${CssVars.DANGER_COLOR};
        }
    }

    &:hover {
        > span:last-child {
            opacity: 0.6;

            &:hover {
                opacity: 1;
            }
        }
    }
`;
const MultiDropdownStick = qe(DropdownStick)`
    position: absolute;
    right: ${CssVars.INPUT_INDENT};
`;
const MultiOption = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-multi-dropdown-option" })`
    display: flex;
    position: relative;
    align-items: center;
    padding: calc(${CssVars.INPUT_HEIGHT} / 8) ${CssVars.INPUT_INDENT};
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    line-height: calc(${CssVars.FONT_SIZE} * 1.4);
    min-height: ${CssVars.INPUT_HEIGHT};
    //overflow: hidden;
    //white-space: nowrap;
    //text-overflow: ellipsis;

    > span:first-child {
        display: flex;
        position: relative;
        flex-grow: 1;
        align-items: center;
    }

    > svg:last-child {
        fill: ${CssVars.PRIMARY_COLOR};
        height: calc(${CssVars.INPUT_HEIGHT} / 3);
        min-width: calc(${CssVars.INPUT_HEIGHT} / 3);
        margin-left: 8px;
        margin-right: calc(${CssVars.INPUT_INDENT} * -1 + 12px);
        opacity: 0.7;
    }

    &[data-can-click=false] {
        cursor: default;
    }

    &:hover {
        background-color: ${CssVars.HOVER_COLOR};
    }
`;
const MultiDropdown = reactExports.forwardRef((props, ref) => {
  const { options, optionSort, noAvailable, noMatched, $pp, $wrapped: { $onValueChange, $root, $model, $p2r, $avs: { $disabled, $visible } }, please = "", clearable = true, tip, ...rest } = props;
  const globalHandlers = useGlobalHandlers();
  const { askOptions, displayOptions, filterInputRef, filter, onFilterChanged, containerRef, popupState, popupHeight, popupRef, popupShown, repaintPopup, onClicked, onFocused, onKeyUp, onAnyInputEvent } = useFilterableDropdownOptions(props);
  const forceUpdate = useForceUpdate();
  useDualRefs(containerRef, ref);
  useTip({ ref: containerRef, ...buildTip({ tip, root: $root, model: $model }) });
  const currentValuesToArray = () => {
    const values2 = MUtils.getValue($model, $pp);
    if (values2 == null) {
      return [];
    } else if (VUtils.isPrimitive(values2)) {
      return [values2];
    } else {
      return values2;
    }
  };
  const hasValues = (values2) => {
    if (values2 == null) {
      return false;
    } else if (typeof values2 === "string") {
      return VUtils.isNotEmpty(values2);
    } else if (Array.isArray(values2)) {
      return values2.length !== 0;
    }
    return true;
  };
  const hasValue = (value, values2) => {
    if (value == null) {
      return true;
    } else if (values2 == null) {
      return false;
    } else {
      return values2.some((v) => v == value);
    }
  };
  const onOptionClicked = (option) => async (event) => {
    if ($disabled) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const values2 = currentValuesToArray();
    if (!hasValues(values2)) {
      await $onValueChange([option.value], true, { global: globalHandlers });
    } else if (!hasValue(option.value, values2)) {
      await $onValueChange([...values2, option.value], true, { global: globalHandlers });
    } else {
      return;
    }
    repaintPopup();
    setTimeout(() => {
      var _a;
      return (_a = containerRef.current) == null ? void 0 : _a.focus();
    }, 30);
  };
  const onRemoveClicked = (value) => async (event) => {
    if ($disabled) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const values2 = currentValuesToArray();
    if (!hasValues(values2)) {
      return;
    }
    await $onValueChange(values2.filter((v) => v != value), true, { global: globalHandlers });
    repaintPopup();
  };
  const onClearClicked = async (event) => {
    if ($disabled) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const values2 = currentValuesToArray();
    if (values2 != null && values2.length !== 0) {
      await $onValueChange(null, true, { global: globalHandlers });
    }
    forceUpdate();
    if (!isDropdownPopupActive(popupState.active)) {
      setTimeout(() => onClicked(), 100);
    } else {
      setTimeout(() => repaintPopup(), 100);
    }
  };
  const values = currentValuesToArray();
  const selected = values != null;
  const optionsAsMap = askOptions().reduce((map, option) => {
    map[`${option.value}`] = option;
    return map;
  }, {});
  const deviceTags = MBUtils.pickDeviceTags(props);
  return React.createElement(
    MultiDropdownContainer,
    { active: popupState.active, atBottom: popupState.atBottom, role: "input", tabIndex: 0, ...rest, "data-w": "d9-multi-dropdown", "data-disabled": $disabled, "data-visible": $visible, "data-clearable": clearable, onFocus: onFocused, onClick: onClicked, onKeyDown: onAnyInputEvent, id: PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id), ref: containerRef },
    values.map((value) => {
      var _a;
      const v = `${value}`;
      return React.createElement(
        MultiDropdownLabel,
        { "data-please": false, key: v },
        React.createElement("span", null, toIntlLabel((_a = optionsAsMap[v]) == null ? void 0 : _a.label)),
        $disabled ? null : React.createElement(
          "span",
          { onClick: onRemoveClicked(value) },
          React.createElement(Times, null)
        )
      );
    }),
    React.createElement(DropdownLabel, { "data-please": true }, toIntlLabel(please)),
    React.createElement(MultiDropdownStick, { valueAssigned: selected, clearable, clear: onClearClicked, disabled: $disabled }),
    isDropdownPopupActive(popupState.active) ? React.createElement(
      DropdownPopup,
      { ...{ ...popupState, minHeight: popupHeight }, shown: popupShown && popupState.active === DropdownPopupStateActive.ACTIVE, ...deviceTags, vScroll: true, ref: popupRef },
      React.createElement(
        OptionFilter,
        { ...{ ...popupState, active: !!filter }, "data-w": "d9-multi-dropdown-option-filter" },
        React.createElement("span", null, "?:"),
        React.createElement(
          "span",
          null,
          React.createElement(Search, null)
        ),
        React.createElement("input", { value: filter, onChange: onFilterChanged, onKeyUp, ref: filterInputRef })
      ),
      displayOptions.map((option, index) => {
        const { value, label } = option;
        const canClick = ![NO_MATCHED_OPTION_ITEM, NO_AVAILABLE_OPTION_ITEM].includes(`${value}`);
        const selected2 = values.includes(value);
        return React.createElement(
          MultiOption,
          { key: `${value}-${index}`, "data-can-click": canClick, onClick: canClick ? onOptionClicked(option) : void 0 },
          React.createElement("span", null, toIntlLabel(label)),
          selected2 ? React.createElement(Check, null) : null
        );
      })
    ) : null
  );
});
registerWidget({ key: "MultiDropdown", JSX: MultiDropdown, container: false, array: false });
const Context$3 = reactExports.createContext({});
Context$3.displayName = "CalendarEventBus";
const CalendarEventBusProvider = (props) => {
  const { children } = props;
  const bus = useCreateEventBus("calendar");
  return React.createElement(Context$3.Provider, { value: bus }, children);
};
const useCalendarEventBus = () => reactExports.useContext(Context$3);
var CalendarEventTypes;
(function(CalendarEventTypes2) {
  CalendarEventTypes2["OPEN_YEAR_MONTH_PICKER"] = "open-year-month-picker";
  CalendarEventTypes2["CLOSE_YEAR_MONTH_PICKER"] = "close-year-month-picker";
  CalendarEventTypes2["OPEN_TIME_PICKER"] = "open-time-picker";
  CalendarEventTypes2["CLOSE_TIME_PICKER"] = "close-time-picker";
  CalendarEventTypes2["INIT_POPUP_VALUE"] = "init-popup-value";
  CalendarEventTypes2["VALUE_SELECTED"] = "value-selected";
  CalendarEventTypes2["VALUE_CLEARED"] = "value-cleared";
  CalendarEventTypes2["ASK_VALUE"] = "ask-value";
})(CalendarEventTypes || (CalendarEventTypes = {}));
const PopupContainer = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-calendar-popup-wrapper" })`
    display: flex;
    position: relative;
    flex-direction: column;
    background-color: ${CssVars.BACKGROUND_COLOR};
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
`;
const LeftCaret = qe(CaretLeft)`
    height: ${CssVars.FONT_SIZE};
    width: calc(${CssVars.FONT_SIZE} + 2px);
    fill: ${CssVars.FONT_COLOR};
`;
const RightCaret = qe(CaretRight)`
    height: ${CssVars.FONT_SIZE};
    width: calc(${CssVars.FONT_SIZE} + 2px);
    fill: ${CssVars.FONT_COLOR};
`;
const getLastDateOfMonth = (year, month) => {
  switch (month + 1) {
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      return year % 400 === 0 ? 29 : year % 100 === 0 ? 28 : year % 4 === 0 ? 29 : 28;
    default:
      return 31;
  }
};
const computeCalendarDays = (firstDate) => {
  const weekday = firstDate.day();
  const year = firstDate.year();
  const month = firstDate.month();
  const lastDate = getLastDateOfMonth(year, month);
  const days = new Array(lastDate).fill(1).map((v, index) => {
    return { year, month, date: index + 1 };
  });
  if (weekday !== 0) {
    const previousMonth = month === 0 ? 11 : month - 1;
    const previousYear = month === 0 ? year - 1 : year;
    let previousLastDate = getLastDateOfMonth(previousYear, previousMonth);
    for (let index = weekday - 1; index >= 0; index--) {
      days.unshift({ year: previousYear, month: previousMonth, date: previousLastDate-- });
    }
  }
  const length = days.length;
  if (length < 42) {
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    let date = 1;
    for (let index = days.length; index < 42; index++) {
      days.push({ year: nextYear, month: nextMonth, date: date++ });
    }
  }
  return days;
};
const DatePickerContainer = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-calendar-date-picker" })`
    display: grid;
    grid-template-columns: 1fr auto;
    cursor: default;
`;
const DatePickerShortcut = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-calendar-date-picker-shortcuts" })`
    display: flex;
    flex-direction: column;
    grid-row: span 2;
    border-right: ${CssVars.BORDER};
`;
const DatePickerShortcutButton = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-calendar-date-picker-shortcut-button" })`
    display: flex;
    align-items: center;
    height: ${CssVars.CALENDAR_DATE_CELL_SIZE};
    padding: 0 ${CssVars.CALENDAR_GUTTER_SIZE};
    font-size: 0.8em;
    font-variant: ${CssVars.FONT_VARIANT};
    cursor: pointer;
    user-select: none;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &:hover {
        background-color: ${CssVars.HOVER_COLOR};
    }
`;
const DatePickerHeader = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-calendar-date-picker-header" })`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${CssVars.INPUT_HEIGHT};
    padding: 0 ${CssVars.CALENDAR_GUTTER_SIZE};
`;
const DatePickerHeaderYearMonth = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-calendar-date-picker-header-ym" })`
    font-weight: ${CssVars.FONT_BOLD};
    font-variant: ${CssVars.FONT_VARIANT};
`;
const DatePickerHeaderOperators = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-calendar-date-picker-header-operators" })`
    display: flex;
    align-items: center;
`;
const DatePickerHeaderButton = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-calendar-date-picker-header-button" })`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${CssVars.FONT_BOLD};
    border-radius: ${CssVars.BORDER_RADIUS};
    user-select: none;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    cursor: pointer;

    &:hover {
        background-color: ${CssVars.HOVER_COLOR};
    }
`;
const DatePickerHeaderTodayButton = qe(DatePickerHeaderButton)`
    transform: scale(0.8);
    transform-origin: right;
    padding: 2px 6px;
    font-variant: ${CssVars.FONT_VARIANT};
`;
const DatePickerHeaderMonthChangeButton = qe(DatePickerHeaderButton)`
    height: 20px;
    width: 24px;
`;
const DatePickerBody = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-calendar-date-picker-body" })`
    display: grid;
    grid-template-columns: repeat(7, minmax(${CssVars.CALENDAR_DATE_CELL_SIZE}, 1fr));
    grid-template-rows: repeat(7, ${CssVars.CALENDAR_DATE_CELL_SIZE});
`;
const DatePickerBodyHeaderCell = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-calendar-date-picker-body-header-cell" })`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    text-align: center;
    color: ${CssVars.PRIMARY_COLOR};
    font-weight: ${CssVars.FONT_BOLD};
    opacity: 0.7;
    cursor: default;

    &:first-child,
    &:nth-child(7) {
        color: ${CssVars.DANGER_COLOR};
    }
`;
const DatePickerBodyDateCell = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-calendar-date-picker-body-date-cell" })`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    text-align: center;
    cursor: pointer;

    &:before {
        content: '';
        display: block;
        position: absolute;
        top: calc(${CssVars.CALENDAR_DATE_CELL_SIZE} / 10);
        left: calc(50% - ${CssVars.CALENDAR_DATE_CELL_SIZE} * 2 / 5);
        height: calc(${CssVars.CALENDAR_DATE_CELL_SIZE} * 4 / 5);
        width: calc(${CssVars.CALENDAR_DATE_CELL_SIZE} * 4 / 5);
        border-radius: 100%;
        background-color: ${CssVars.HOVER_COLOR};
        opacity: 0;
        z-index: 0;
        transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    }

    &:hover:before {
        opacity: 1;
    }

    &[data-current-month=false] {
        color: ${CssVars.CALENDAR_LIGHT_DATE_COLOR};

        &:hover {
            color: ${CssVars.PRIMARY_COLOR};
        }
    }

    &[data-today=true] {
        font-weight: ${CssVars.FONT_BOLD};
        color: ${CssVars.PRIMARY_COLOR};
    }

    &[data-could-perform=false] {
        cursor: default;

        &[data-current-month=false]:hover {
            color: ${CssVars.CALENDAR_LIGHT_DATE_COLOR};
        }

        &:before {
            display: none;
        }

        &:after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${CssVars.WAIVE_COLOR};
            opacity: 0.15;
            z-index: 0;
        }

        &:hover:before {
            opacity: 0;
        }
    }

    &[data-current=true] {
        color: ${CssVars.INVERT_COLOR};

        &:before {
            background-color: ${CssVars.INVERT_COLOR};
            opacity: 1;
            z-index: 0;
        }

        &:after {
            content: '';
            display: block;
            position: absolute;
            top: calc(${CssVars.CALENDAR_DATE_CELL_SIZE} / 10 + 3px);
            left: calc(50% - (${CssVars.CALENDAR_DATE_CELL_SIZE} * 2 / 5 - 3px));
            height: calc(${CssVars.CALENDAR_DATE_CELL_SIZE} * 4 / 5 - 6px);
            width: calc(${CssVars.CALENDAR_DATE_CELL_SIZE} * 4 / 5 - 6px);
            border-radius: 100%;
            background-color: ${CssVars.PRIMARY_COLOR};
            z-index: 1;
        }

        > span {
            font-size: 0.8em;
        }
    }

    > span {
        z-index: 2;
    }
`;
const DatePicker = (props) => {
  const { $root, $model, value, dateFormat, time, couldPerform } = props;
  const globalHandlers = useGlobalHandlers();
  const { on, off, fire } = useCalendarEventBus();
  const [state, setState] = reactExports.useState({ visible: true, current: value });
  reactExports.useEffect(() => {
    const onOpen = () => setState((state2) => ({ ...state2, visible: false }));
    const onClose = () => setState({ current: value, visible: true });
    on(CalendarEventTypes.OPEN_YEAR_MONTH_PICKER, onOpen);
    on(CalendarEventTypes.OPEN_TIME_PICKER, onOpen);
    on(CalendarEventTypes.CLOSE_YEAR_MONTH_PICKER, onClose);
    on(CalendarEventTypes.CLOSE_TIME_PICKER, onClose);
    return () => {
      off(CalendarEventTypes.OPEN_YEAR_MONTH_PICKER, onOpen);
      off(CalendarEventTypes.OPEN_TIME_PICKER, onOpen);
      off(CalendarEventTypes.CLOSE_YEAR_MONTH_PICKER, onClose);
      off(CalendarEventTypes.CLOSE_TIME_PICKER, onClose);
    };
  }, [on, off, value]);
  if (!state.visible) {
    return null;
  }
  const today = dayjs();
  const todayYear = today.year();
  const todayMonth = today.month();
  const todayDate = today.date();
  const onDateChange = (date, isDateChanged) => () => {
    const newValue = date.clone().hour(value.hour()).minute(value.minute()).second(value.second()).millisecond(value.millisecond());
    const couldPerformValue = couldPerform == null ? true : couldPerform({
      root: $root,
      model: $model,
      valueToCheck: newValue,
      checkType: "date",
      global: globalHandlers
    }) !== false;
    if (couldPerformValue) {
      if (!time) {
        fire(CalendarEventTypes.VALUE_SELECTED, newValue, isDateChanged);
      } else {
        fire(CalendarEventTypes.VALUE_SELECTED, newValue);
      }
    }
    setState((state2) => ({ ...state2, current: newValue }));
  };
  const onTodayClicked = onDateChange(today);
  const onYesterdayClicked = onDateChange(today.subtract(1, "day"));
  const onWeekendClicked = onDateChange(today.day(6));
  const onPrevWeekendClicked = onDateChange(today.day(6).subtract(1, "week"));
  const onMonthEndClicked = onDateChange(today.date(1).add(1, "month").subtract(1, "day"));
  const onPrevMonthEndClicked = onDateChange(today.date(1).subtract(1, "day"));
  const onYearEndClicked = onDateChange(today.month(11).date(31));
  const onPrevYearEndClicked = onDateChange(today.month(11).date(31).subtract(1, "year"));
  const onGotoPrevMonthClicked = () => onDateChange(state.current.subtract(1, "month"))();
  const onGotoNextMonthClicked = () => onDateChange(state.current.add(1, "month"))();
  const currentYear = state.current.year();
  const currentMonth = state.current.month();
  const currentDisplayMonth = (() => {
    let format = getDefaultCalendarYMFormat();
    if (dateFormat.includes("B")) {
      format = format.replace(/Y/g, "B");
    }
    return state.current.format(format);
  })();
  const firstDayOfDisplayMonth = state.current.clone().date(1);
  const days = computeCalendarDays(firstDayOfDisplayMonth);
  return React.createElement(
    DatePickerContainer,
    null,
    React.createElement(
      DatePickerShortcut,
      null,
      React.createElement(
        DatePickerShortcutButton,
        { onClick: onTodayClicked },
        React.createElement(IntlLabel, { keys: ["calendar", "today"], value: "Today" })
      ),
      React.createElement(
        DatePickerShortcutButton,
        { onClick: onYesterdayClicked },
        React.createElement(IntlLabel, { keys: ["calendar", "yesterday"], value: "Yesterday" })
      ),
      React.createElement(
        DatePickerShortcutButton,
        { onClick: onWeekendClicked },
        React.createElement(IntlLabel, { keys: ["calendar", "thisWeekEnd"], value: "This Weekend" })
      ),
      React.createElement(
        DatePickerShortcutButton,
        { onClick: onPrevWeekendClicked },
        React.createElement(IntlLabel, { keys: ["calendar", "prevWeekend"], value: "Prev Weekend" })
      ),
      React.createElement(
        DatePickerShortcutButton,
        { onClick: onMonthEndClicked },
        React.createElement(IntlLabel, { keys: ["calendar", "thisMonthEnd"], value: "This Month End" })
      ),
      React.createElement(
        DatePickerShortcutButton,
        { onClick: onPrevMonthEndClicked },
        React.createElement(IntlLabel, { keys: ["calendar", "prevMonthEnd"], value: "Prev month End" })
      ),
      React.createElement(
        DatePickerShortcutButton,
        { onClick: onYearEndClicked },
        React.createElement(IntlLabel, { keys: ["calendar", "thisYearEnd"], value: "This Year End" })
      ),
      React.createElement(
        DatePickerShortcutButton,
        { onClick: onPrevYearEndClicked },
        React.createElement(IntlLabel, { keys: ["calendar", "prevYearEnd"], value: "Prev Year End" })
      )
    ),
    React.createElement(
      DatePickerHeader,
      null,
      React.createElement(DatePickerHeaderYearMonth, null, currentDisplayMonth),
      React.createElement(
        DatePickerHeaderOperators,
        null,
        React.createElement(
          DatePickerHeaderTodayButton,
          { onClick: onTodayClicked },
          React.createElement(IntlLabel, { keys: ["calendar", "today"], value: "Today" })
        ),
        React.createElement(
          DatePickerHeaderMonthChangeButton,
          { onClick: onGotoPrevMonthClicked },
          React.createElement(LeftCaret, null)
        ),
        React.createElement(
          DatePickerHeaderMonthChangeButton,
          { onClick: onGotoNextMonthClicked },
          React.createElement(RightCaret, null)
        )
      )
    ),
    React.createElement(
      DatePickerBody,
      null,
      React.createElement(
        DatePickerBodyHeaderCell,
        null,
        React.createElement(IntlLabel, { keys: ["calendar", "sunday"], value: "S" })
      ),
      React.createElement(
        DatePickerBodyHeaderCell,
        null,
        React.createElement(IntlLabel, { keys: ["calendar", "monday"], value: "M" })
      ),
      React.createElement(
        DatePickerBodyHeaderCell,
        null,
        React.createElement(IntlLabel, { keys: ["calendar", "tuesday"], value: "T" })
      ),
      React.createElement(
        DatePickerBodyHeaderCell,
        null,
        React.createElement(IntlLabel, { keys: ["calendar", "wednesday"], value: "W" })
      ),
      React.createElement(
        DatePickerBodyHeaderCell,
        null,
        React.createElement(IntlLabel, { keys: ["calendar", "thursday"], value: "T" })
      ),
      React.createElement(
        DatePickerBodyHeaderCell,
        null,
        React.createElement(IntlLabel, { keys: ["calendar", "friday"], value: "F" })
      ),
      React.createElement(
        DatePickerBodyHeaderCell,
        null,
        React.createElement(IntlLabel, { keys: ["calendar", "saturday"], value: "S" })
      ),
      days.map(({ year, month, date }) => {
        const valueToPerform = state.current.clone().year(year).month(month).date(date);
        const couldPerformValue = couldPerform == null ? true : couldPerform({
          root: $root,
          model: $model,
          valueToCheck: valueToPerform,
          checkType: "date",
          global: globalHandlers
        }) !== false;
        const click = couldPerformValue ? onDateChange(dayjs().year(year).month(month).date(date), true) : void 0;
        return React.createElement(
          DatePickerBodyDateCell,
          { key: `${year}/${month}/${date}`, "data-current-month": year === currentYear && month === currentMonth, "data-current": year === value.year() && month === value.month() && date === value.date(), "data-today": year === todayYear && month === todayMonth && date === todayDate, "data-could-perform": couldPerformValue, onClick: click },
          React.createElement("span", null, date)
        );
      })
    )
  );
};
const PopupHeaderContainer = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-calendar-popup-header" })`
    display: flex;
    align-items: center;
    border-bottom: ${CssVars.BORDER};
    height: ${CssVars.CALENDAR_POPUP_HEADER_HEIGHT};
    padding: 0 ${CssVars.CALENDAR_GUTTER_SIZE};
    cursor: default;
`;
const PopupHeaderDateLabel = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-calendar-popup-date-label" })`
    font-size: 0.8em;
    font-weight: ${CssVars.FONT_BOLD};
    font-variant: ${CssVars.FONT_VARIANT};
    margin-right: 0.5em;
`;
const PopupHeaderTimeLabel = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-calendar-popup-header-time-label" })`
    font-size: 0.8em;
    font-weight: ${CssVars.FONT_BOLD};
    font-variant: ${CssVars.FONT_VARIANT};
`;
const PopupHeaderPlaceholder = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-calendar-popup-header-placeholder" })`
    flex-grow: 1;
`;
const PopupHeaderTimeButton = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-calendar-popup-header-time-button" })`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    color: ${CssVars.FONT_COLOR};
    height: calc(${CssVars.CALENDAR_POPUP_HEADER_HEIGHT} - 4px);
    width: calc(${CssVars.CALENDAR_POPUP_HEADER_HEIGHT} - 4px);
    max-height: ${CssVars.INPUT_HEIGHT};
    font-size: 0.8em;
    font-weight: ${CssVars.FONT_BOLD};
    font-variant: ${CssVars.FONT_VARIANT};
    border-radius: ${CssVars.BORDER_RADIUS};
    cursor: pointer;

    &:hover {
        background-color: ${CssVars.HOVER_COLOR};;
        color: ${CssVars.PRIMARY_COLOR};

        > svg {
            fill: ${CssVars.PRIMARY_COLOR};
        }
    }
`;
const DateIcon = qe(Date$1)`
    height: ${CssVars.FONT_SIZE};
    width: calc(${CssVars.FONT_SIZE} + 2px);
    fill: ${CssVars.FONT_COLOR};
`;
const TimeIcon = qe(Time)`
    height: ${CssVars.FONT_SIZE};
    width: calc(${CssVars.FONT_SIZE} + 2px);
    fill: ${CssVars.FONT_COLOR};
`;
const BackIcon = qe(Back)`
    height: ${CssVars.FONT_SIZE};
    width: calc(${CssVars.FONT_SIZE} + 2px);
    fill: ${CssVars.FONT_COLOR};
`;
var CurrentPicker;
(function(CurrentPicker2) {
  CurrentPicker2[CurrentPicker2["DATE"] = 0] = "DATE";
  CurrentPicker2[CurrentPicker2["YEAR_MONTH"] = 1] = "YEAR_MONTH";
  CurrentPicker2[CurrentPicker2["TIME"] = 2] = "TIME";
})(CurrentPicker || (CurrentPicker = {}));
const CalendarPopupHeader = (props) => {
  const { date, dateFormat, time, timeFormat, value, confirm } = props;
  const { fire } = useCalendarEventBus();
  const [currentPicker, setCurrentPicker] = reactExports.useState(() => {
    return checkDateParts(dateFormat).hasDate ? CurrentPicker.DATE : CurrentPicker.YEAR_MONTH;
  });
  const onYearMonthClicked = () => {
    fire(CalendarEventTypes.OPEN_YEAR_MONTH_PICKER);
    setCurrentPicker(CurrentPicker.YEAR_MONTH);
  };
  const onToTimeClicked = () => {
    fire(CalendarEventTypes.OPEN_TIME_PICKER);
    setCurrentPicker(CurrentPicker.TIME);
  };
  const onBackClicked = () => {
    if (currentPicker === CurrentPicker.TIME) {
      fire(CalendarEventTypes.CLOSE_TIME_PICKER);
    } else if (currentPicker === CurrentPicker.YEAR_MONTH) {
      fire(CalendarEventTypes.CLOSE_YEAR_MONTH_PICKER);
    }
    setCurrentPicker(CurrentPicker.DATE);
  };
  const onToDayStartClicked = () => {
    const newValue = value.hour(0).minute(0).second(0).millisecond(0);
    fire(CalendarEventTypes.VALUE_SELECTED, newValue);
  };
  const onToDayEndClicked = () => {
    const newValue = value.hour(23).minute(59).second(59).millisecond(999);
    fire(CalendarEventTypes.VALUE_SELECTED, newValue);
  };
  const onConfirmClicked = () => confirm(value);
  const currentDisplayDate = value.format(dateFormat);
  const currentDisplayTime = value.format(timeFormat);
  const { hasDate } = checkDateParts(dateFormat);
  return React.createElement(
    PopupHeaderContainer,
    null,
    date ? React.createElement(PopupHeaderDateLabel, null, currentDisplayDate) : null,
    time ? React.createElement(PopupHeaderTimeLabel, null, currentDisplayTime) : null,
    React.createElement(PopupHeaderPlaceholder, null),
    date && time ? React.createElement(
      React.Fragment,
      null,
      React.createElement(PopupHeaderTimeButton, { onClick: onToDayStartClicked }, "00"),
      React.createElement(PopupHeaderTimeButton, { onClick: onToDayEndClicked }, "24"),
      currentPicker !== CurrentPicker.TIME ? React.createElement(
        PopupHeaderTimeButton,
        { onClick: onToTimeClicked },
        React.createElement(TimeIcon, null)
      ) : null
    ) : null,
    date && currentPicker !== CurrentPicker.YEAR_MONTH ? React.createElement(
      PopupHeaderTimeButton,
      { onClick: onYearMonthClicked },
      React.createElement(DateIcon, null)
    ) : null,
    date && hasDate && currentPicker !== CurrentPicker.DATE ? React.createElement(
      PopupHeaderTimeButton,
      { onClick: onBackClicked },
      React.createElement(BackIcon, null)
    ) : null,
    React.createElement(
      PopupHeaderTimeButton,
      { onClick: onConfirmClicked },
      React.createElement(IntlLabel, { keys: ["calendar", "confirm"], value: "Ok" })
    )
  );
};
const TimePickerContainer = qe.div.attrs(({ columns }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-calendar-time-picker",
    style: {
      gridTemplateColumns: `repeat(${columns}, 1fr)`
    }
  };
})`
    display: grid;
    position: relative;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: calc(${CssVars.INPUT_HEIGHT} * 1.5) 1fr;
    grid-column-gap: ${CssVars.CALENDAR_GUTTER_SIZE};
    padding: 0 ${CssVars.CALENDAR_GUTTER_SIZE} ${CssVars.CALENDAR_GUTTER_SIZE};
    cursor: default;
`;
const TimePickerLabel = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-calendar-time-picker-label" })`
    display: flex;
    align-items: center;
    font-variant: ${CssVars.FONT_VARIANT};
    font-weight: ${CssVars.FONT_BOLD}
`;
const TimePickerSelector = qe.div.attrs({
  [DOM_KEY_WIDGET]: "d9-calendar-time-picker-selector",
  "data-v-scroll": ""
})`
    display: flex;
    flex-direction: column;
    height: calc(${CssVars.CALENDAR_POPUP_HEIGHT_VALUE}px - ${CssVars.CALENDAR_POPUP_HEADER_HEIGHT} - ${CssVars.INPUT_HEIGHT} * 1.5 - ${CssVars.CALENDAR_GUTTER_SIZE});
    border-radius: ${CssVars.BORDER_RADIUS};
    border: ${CssVars.BORDER};
    overflow-y: scroll;
`;
const TimePickerSelectorOption = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-calendar-time-picker-selector-option" })`
    display: flex;
    position: relative;
    align-items: center;
    min-height: ${CssVars.INPUT_HEIGHT};
    padding: 0 ${CssVars.CALENDAR_GUTTER_SIZE};
    cursor: pointer;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-could-perform=false] {
        cursor: default;

        &:before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${CssVars.WAIVE_COLOR};
            opacity: 0.3;
            z-index: 0;
        }
    }

    &[data-current=true] {
        &:before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${CssVars.PRIMARY_COLOR};
            opacity: 0.15;
            z-index: 0;
        }
    }

    &[data-current=false]:hover {
        background-color: ${CssVars.HOVER_COLOR};
        opacity: 1;
    }
`;
const TimePicker = (props) => {
  const { $root, $model, value, date, timeFormat, couldPerform } = props;
  const hourSelectorRef = reactExports.useRef(null);
  const minuteSelectorRef = reactExports.useRef(null);
  const secondSelectorRef = reactExports.useRef(null);
  const globalHandlers = useGlobalHandlers();
  const { on, off, fire } = useCalendarEventBus();
  const [visible, setVisible] = reactExports.useState(!date);
  reactExports.useEffect(() => {
    const onOpen = () => setVisible(true);
    const onClose = () => setVisible(false);
    on(CalendarEventTypes.OPEN_TIME_PICKER, onOpen);
    on(CalendarEventTypes.OPEN_YEAR_MONTH_PICKER, onClose);
    on(CalendarEventTypes.CLOSE_TIME_PICKER, onClose);
    return () => {
      off(CalendarEventTypes.OPEN_TIME_PICKER, onOpen);
      off(CalendarEventTypes.OPEN_YEAR_MONTH_PICKER, onClose);
      off(CalendarEventTypes.CLOSE_TIME_PICKER, onClose);
    };
  }, [on, off]);
  reactExports.useEffect(() => {
    var _a, _b, _c;
    if (hourSelectorRef.current != null && visible) {
      (_a = hourSelectorRef.current.querySelector(`span[data-hour="${value.hour()}"]`)) == null ? void 0 : _a.scrollIntoView();
    }
    if (minuteSelectorRef.current != null && visible) {
      (_b = minuteSelectorRef.current.querySelector(`span[data-minute="${value.minute()}"]`)) == null ? void 0 : _b.scrollIntoView();
    }
    if (secondSelectorRef.current != null && visible) {
      (_c = secondSelectorRef.current.querySelector(`span[data-second="${value.second()}"]`)) == null ? void 0 : _c.scrollIntoView();
    }
  }, [visible]);
  if (!visible) {
    return null;
  }
  const onHourChange = (index) => () => {
    const newValue = value.hour(index);
    fire(CalendarEventTypes.VALUE_SELECTED, newValue);
  };
  const onMinuteChange = (index) => () => {
    const newValue = value.minute(index);
    fire(CalendarEventTypes.VALUE_SELECTED, newValue);
  };
  const onSecondChange = (index) => () => {
    const newValue = value.second(index);
    fire(CalendarEventTypes.VALUE_SELECTED, newValue);
  };
  const { hasMinute, hasSecond } = checkTimeParts(timeFormat);
  const columns = 3 - (!hasMinute ? 1 : 0) - (!hasSecond ? 1 : 0);
  return React.createElement(
    TimePickerContainer,
    { columns },
    React.createElement(
      TimePickerLabel,
      null,
      React.createElement(IntlLabel, { keys: ["calendar", "hour"], value: "Hour" })
    ),
    hasMinute ? React.createElement(
      TimePickerLabel,
      null,
      React.createElement(IntlLabel, { keys: ["calendar", "minute"], value: "Minute" })
    ) : null,
    hasSecond ? React.createElement(
      TimePickerLabel,
      null,
      React.createElement(IntlLabel, { keys: ["calendar", "second"], value: "Second" })
    ) : null,
    React.createElement(TimePickerSelector, { ref: hourSelectorRef }, new Array(24).fill(1).map((_, index) => {
      const valueToPerform = value.clone().hour(index);
      const couldPerformValue = couldPerform == null ? true : couldPerform({
        root: $root,
        model: $model,
        valueToCheck: valueToPerform,
        checkType: "hour",
        global: globalHandlers
      }) !== false;
      const click = couldPerformValue ? onHourChange(index) : void 0;
      return React.createElement(TimePickerSelectorOption, { "data-current": value.hour() === index, "data-hour": index, "data-could-perform": couldPerformValue, onClick: click, key: index }, `${index}`.padStart(2, "0"));
    })),
    hasMinute ? React.createElement(TimePickerSelector, { ref: minuteSelectorRef }, new Array(60).fill(1).map((_, index) => {
      const valueToPerform = value.clone().minute(index);
      const couldPerformValue = couldPerform == null ? true : couldPerform({
        root: $root,
        model: $model,
        valueToCheck: valueToPerform,
        checkType: "minute",
        global: globalHandlers
      }) !== false;
      const click = couldPerformValue ? onMinuteChange(index) : void 0;
      return React.createElement(TimePickerSelectorOption, { "data-current": value.minute() === index, "data-minute": index, "data-could-perform": couldPerformValue, onClick: click, key: index }, `${index}`.padStart(2, "0"));
    })) : null,
    hasSecond ? React.createElement(TimePickerSelector, { ref: secondSelectorRef }, new Array(60).fill(1).map((_, index) => {
      const valueToPerform = value.clone().second(index);
      const couldPerformValue = couldPerform == null ? true : couldPerform({
        root: $root,
        model: $model,
        valueToCheck: valueToPerform,
        checkType: "second",
        global: globalHandlers
      }) !== false;
      const click = couldPerformValue ? onSecondChange(index) : void 0;
      return React.createElement(TimePickerSelectorOption, { "data-current": value.second() === index, "data-second": index, "data-could-perform": couldPerformValue, onClick: click, key: index }, `${index}`.padStart(2, "0"));
    })) : null
  );
};
const useValueChange = (onChange) => {
  const { on, off } = useCalendarEventBus();
  reactExports.useEffect(() => {
    on(CalendarEventTypes.VALUE_SELECTED, onChange);
    return () => {
      off(CalendarEventTypes.VALUE_SELECTED, onChange);
    };
  }, [on, off, onChange]);
};
const YearMonthPickerContainer = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-calendar-ym-picker" })`
    display: grid;
    position: relative;
    grid-template-columns: 33% 1fr;
    grid-template-rows: calc(${CssVars.INPUT_HEIGHT} * 1.5) 1fr;
    grid-column-gap: ${CssVars.CALENDAR_GUTTER_SIZE};
    padding: 0 ${CssVars.CALENDAR_GUTTER_SIZE} ${CssVars.CALENDAR_GUTTER_SIZE};
    cursor: default;
`;
const YearMonthPickerLabel = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-calendar-ym-picker-label" })`
    display: flex;
    align-items: center;
    font-variant: ${CssVars.FONT_VARIANT};
    font-weight: ${CssVars.FONT_BOLD};

    &:nth-child(3) {
        margin-left: calc(${CssVars.CALENDAR_GUTTER_SIZE} * 2);
    }
`;
const YearSelector = qe.div.attrs({
  [DOM_KEY_WIDGET]: "d9-calendar-ym-picker-year-selector",
  "data-v-scroll": ""
})`
    display: flex;
    flex-direction: column;
    border-radius: ${CssVars.BORDER_RADIUS};
    border: ${CssVars.BORDER};
    height: calc(${CssVars.CALENDAR_POPUP_HEIGHT_VALUE}px - ${CssVars.CALENDAR_POPUP_HEADER_HEIGHT} - ${CssVars.INPUT_HEIGHT} * 1.5 - ${CssVars.CALENDAR_GUTTER_SIZE});
    overflow-y: scroll;
`;
const YearSelectorOption = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-calendar-ym-picker-year-selector-option" })`
    display: flex;
    position: relative;
    align-items: center;
    min-height: ${CssVars.INPUT_HEIGHT};
    padding: 0 ${CssVars.CALENDAR_GUTTER_SIZE};
    cursor: pointer;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-could-perform=false] {
        cursor: default;

        &:before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${CssVars.WAIVE_COLOR};
            opacity: 0.3;
            z-index: 0;
        }
    }

    &[data-current=true] {
        &:before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${CssVars.PRIMARY_COLOR};
            opacity: 0.15;
            z-index: 0;
        }
    }

    &[data-current=false]:hover {
        background-color: ${CssVars.HOVER_COLOR};
    }
`;
const MonthSelector = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-calendar-ym-picker-month-selector" })`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: ${CssVars.CALENDAR_GUTTER_SIZE};
    grid-row-gap: ${CssVars.CALENDAR_GUTTER_SIZE};
`;
const MonthSelectorOption = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-calendar-ym-picker-month-selector-option" })`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    border-radius: ${CssVars.BORDER_RADIUS};
    cursor: pointer;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-could-perform=false] {
        cursor: default;

        &:before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: ${CssVars.BORDER_RADIUS};
            background-color: ${CssVars.WAIVE_COLOR};
            opacity: 0.3;
            z-index: 0;
        }
    }

    &[data-current=true] {
        &:before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: ${CssVars.BORDER_RADIUS};
            background-color: ${CssVars.PRIMARY_COLOR};
            opacity: 0.15;
            z-index: 0;
        }
    }

    &[data-current=false]:hover {
        background-color: ${CssVars.HOVER_COLOR};
        opacity: 1;
    }
`;
const YearMonthPicker = (props) => {
  const { $root, $model, value, dateFormat, couldPerform } = props;
  const globalHandlers = useGlobalHandlers();
  const { on, off, fire } = useCalendarEventBus();
  const yearSelectorRef = reactExports.useRef(null);
  const [visible, setVisible] = reactExports.useState(!checkDateParts(dateFormat).hasDate);
  reactExports.useEffect(() => {
    const onOpen = () => setVisible(true);
    const onClose = () => setVisible(false);
    on(CalendarEventTypes.OPEN_YEAR_MONTH_PICKER, onOpen);
    on(CalendarEventTypes.OPEN_TIME_PICKER, onClose);
    on(CalendarEventTypes.CLOSE_YEAR_MONTH_PICKER, onClose);
    return () => {
      off(CalendarEventTypes.OPEN_YEAR_MONTH_PICKER, onOpen);
      off(CalendarEventTypes.OPEN_TIME_PICKER, onClose);
      off(CalendarEventTypes.CLOSE_YEAR_MONTH_PICKER, onClose);
    };
  }, [on, off]);
  reactExports.useEffect(() => {
    var _a;
    if (yearSelectorRef.current == null || !visible) {
      return;
    }
    (_a = yearSelectorRef.current.querySelector(`span[data-year="${value.year()}"]`)) == null ? void 0 : _a.scrollIntoView();
  }, [visible]);
  if (!visible) {
    return null;
  }
  const onYearChange = (year) => () => {
    const newValue = value.year(year);
    fire(CalendarEventTypes.VALUE_SELECTED, newValue);
  };
  const onMonthChange = (month) => () => {
    const newValue = value.month(month);
    fire(CalendarEventTypes.VALUE_SELECTED, newValue);
  };
  const maxYear = (/* @__PURE__ */ new Date()).getFullYear() + 99;
  const monthLabels = [
    [["calendar", "jan"], "Jan"],
    [["calendar", "feb"], "Feb"],
    [["calendar", "mar"], "Mar"],
    [["calendar", "apr"], "Apr"],
    [["calendar", "may"], "May"],
    [["calendar", "jun"], "Jun"],
    [["calendar", "jul"], "Jul"],
    [["calendar", "aug"], "Aug"],
    [["calendar", "sep"], "Sep"],
    [["calendar", "oct"], "Oct"],
    [["calendar", "nov"], "Nov"],
    [["calendar", "dec"], "Dec"]
  ];
  const yearFormat = dateFormat.includes("B") ? "BBBB" : "YYYY";
  return React.createElement(
    YearMonthPickerContainer,
    null,
    React.createElement(YearMonthPickerLabel, null, "Year"),
    React.createElement(YearMonthPickerLabel, null, "Month"),
    React.createElement(YearSelector, { ref: yearSelectorRef }, new Array(200).fill(1).map((_, index) => maxYear - index).map((year) => {
      const valueToPerform = value.clone().year(year);
      const couldPerformValue = couldPerform == null ? true : couldPerform({
        root: $root,
        model: $model,
        valueToCheck: valueToPerform,
        checkType: "year",
        global: globalHandlers
      }) !== false;
      const click = couldPerformValue ? onYearChange(year) : void 0;
      return React.createElement(YearSelectorOption, { "data-year": year, "data-current": year === value.year(), "data-could-perform": couldPerformValue, onClick: click, key: year }, valueToPerform.format(yearFormat));
    })),
    React.createElement(MonthSelector, null, new Array(12).fill(1).map((_, month) => {
      const valueToPerform = value.clone().month(month);
      const couldPerformValue = couldPerform == null ? true : couldPerform({
        root: $root,
        model: $model,
        valueToCheck: valueToPerform,
        checkType: "month",
        global: globalHandlers
      }) !== false;
      const click = couldPerformValue ? onMonthChange(month) : void 0;
      return React.createElement(
        MonthSelectorOption,
        { onClick: click, "data-current": value.month() === month, "data-could-perform": couldPerformValue, key: month },
        React.createElement(IntlLabel, { keys: monthLabels[month][0], value: monthLabels[month][1] })
      );
    }))
  );
};
const CalendarPopup = (props) => {
  const { $root, $model, initValue, popupRef, popupState, popupShown, date = true, dateFormat, time = false, timeFormat, initTimeAt, autoConfirmOnDate, couldPerform, confirm } = props;
  const [value, setValue] = reactExports.useState(() => {
    if (initValue != null) {
      return initValue;
    } else {
      let date2 = dayjs();
      if (initTimeAt != null) {
        date2 = date2.hour(initTimeAt.hour).minute(initTimeAt.minute).second(initTimeAt.second).millisecond(initTimeAt.millisecond);
      }
      return date2;
    }
  });
  useValueChange((value2, isDateChanged) => {
    setValue(value2);
    if (autoConfirmOnDate && isDateChanged) {
      confirm(value2);
    }
  });
  const { hasDate } = checkDateParts(dateFormat);
  return React.createElement(
    DropdownPopup,
    { ...popupState, minWidth: CssVars.CALENDAR_POPUP_WIDTH_VALUE, maxWidth: CssVars.CALENDAR_POPUP_WIDTH_VALUE, minHeight: CssVars.CALENDAR_POPUP_HEIGHT_VALUE, maxHeight: CssVars.CALENDAR_POPUP_HEIGHT_VALUE, shown: popupShown && popupState.active === DropdownPopupStateActive.ACTIVE, ref: popupRef },
    React.createElement(
      PopupContainer,
      null,
      React.createElement(CalendarPopupHeader, { date, dateFormat, time, timeFormat, value, confirm }),
      date && hasDate ? React.createElement(DatePicker, { "$root": $root, "$model": $model, value, dateFormat, time, couldPerform }) : null,
      time ? React.createElement(TimePicker, { "$root": $root, "$model": $model, value, date, timeFormat, couldPerform }) : null,
      date ? React.createElement(YearMonthPicker, { "$root": $root, "$model": $model, value, dateFormat, couldPerform }) : null
    )
  );
};
const CalendarValueHolder = (props) => {
  const { initValue } = props;
  const { on, off, fire } = useCalendarEventBus();
  const [value, setValue] = reactExports.useState(initValue ?? null);
  reactExports.useEffect(() => {
    setValue(initValue ?? null);
  }, [initValue]);
  useValueChange(setValue);
  reactExports.useEffect(() => {
    const onValueCleared = () => setValue(null);
    const onAskValue = (onData) => onData(value);
    on(CalendarEventTypes.VALUE_CLEARED, onValueCleared);
    on(CalendarEventTypes.ASK_VALUE, onAskValue);
    return () => {
      off(CalendarEventTypes.VALUE_CLEARED, onValueCleared);
      off(CalendarEventTypes.ASK_VALUE, onAskValue);
    };
  }, [on, off, fire, value]);
  return React.createElement(reactExports.Fragment, null);
};
const computeFormat = (options) => {
  const { date, time } = options;
  if (VUtils.isBlank(time)) {
    return date;
  } else if (VUtils.isBlank(date)) {
    return time;
  } else {
    return `${date} ${time}`;
  }
};
const DropdownStickCalendar = qe(Date$1).attrs({ [DOM_KEY_WIDGET]: "d9-dropdown-caret" })`
    height: calc(${CssVars.INPUT_HEIGHT} * 2 / 5);
    fill: ${CssVars.FONT_COLOR};
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
`;
const Picker = reactExports.forwardRef((props, ref) => {
  const { $pp, $wrapped: { $onValueChange, $root, $model, $p2r, $avs: { $disabled, $visible } }, please = "", clearable = true, date, dateFormat = getDefaultCalendarDateFormat(), time, timeFormat = getDefaultCalendarTimeFormat(), storeFormat = getDefaultCalendarDatetimeFormat(), fixedTimeAt = FIX_TIME_AT_START_OF_DAY, initTimeAt, couldPerform, autoConfirm = isCalendarAutoConfirm(), autoConfirmOnDate = isCalendarAutoConfirmOnDate(), useCalendarIcon = isStickIconUseCalendar(), tip, ...rest } = props;
  const globalHandlers = useGlobalHandlers();
  const { fire } = useCalendarEventBus();
  const { containerRef, popupRef, popupState, setPopupState, popupShown, setPopupShown } = useDropdownControl({
    askPopupMaxHeight: () => CssVars.CALENDAR_POPUP_HEIGHT_VALUE,
    askPopupMaxWidth: () => CssVars.CALENDAR_POPUP_WIDTH_VALUE,
    fixWidth: true,
    afterPopupHide: () => onBlurred()
  });
  useDualRefs(containerRef, ref);
  useTip({ ref: containerRef, ...buildTip({ tip, root: $root, model: $model }) });
  const showPopup = () => {
    const { top, left, width, height } = getDropdownPosition(containerRef.current);
    const bottom = isPopupAtBottom(top, height, () => CssVars.CALENDAR_POPUP_HEIGHT_VALUE);
    setPopupState((state) => ({
      ...state,
      active: DropdownPopupStateActive.WILL_ACTIVE,
      atBottom: bottom,
      top,
      left,
      width,
      height,
      minWidth: width,
      maxHeight: CssVars.CALENDAR_POPUP_HEIGHT_VALUE
    }));
  };
  const onClicked = () => {
    if ($disabled || isDropdownPopupActive(popupState.active)) {
      return;
    }
    showPopup();
  };
  const redressTimePart = (value2) => {
    if (value2 == null) {
      return null;
    }
    if (!time) {
      if (fixedTimeAt != null) {
        return value2.hour(fixedTimeAt.hour).minute(fixedTimeAt.minute).second(fixedTimeAt.second).millisecond(fixedTimeAt.millisecond);
      }
    } else if (!(timeFormat ?? "").includes("m")) {
      return value2.minute((fixedTimeAt == null ? void 0 : fixedTimeAt.minute) ?? 0).second((fixedTimeAt == null ? void 0 : fixedTimeAt.second) ?? 0).millisecond((fixedTimeAt == null ? void 0 : fixedTimeAt.millisecond) ?? 0);
    } else if (!(timeFormat ?? "").includes("s")) {
      return value2.second((fixedTimeAt == null ? void 0 : fixedTimeAt.second) ?? 0).millisecond((fixedTimeAt == null ? void 0 : fixedTimeAt.millisecond) ?? 0);
    } else {
      return value2.millisecond((fixedTimeAt == null ? void 0 : fixedTimeAt.millisecond) ?? 0);
    }
    return value2;
  };
  const onBlurred = async () => {
    if (!autoConfirm) {
      return;
    }
    if ($disabled || !isDropdownPopupActive(popupState.active)) {
      return;
    }
    fire(CalendarEventTypes.ASK_VALUE, async (newValue) => {
      newValue = redressTimePart(newValue);
      if (VUtils.isBlank(value)) {
        if (newValue != null) {
          await $onValueChange(newValue.format(storeFormat), true, { global: globalHandlers });
        }
      } else {
        const originalValue = dayjs(value, storeFormat);
        if (!originalValue.isSame(newValue)) {
          await $onValueChange(newValue.format(storeFormat), true, { global: globalHandlers });
        }
      }
      setPopupState((state) => ({ ...state, active: DropdownPopupStateActive.HIDDEN }));
    });
  };
  const onClearClicked = async (event) => {
    if ($disabled) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const value2 = MUtils.getValue($model, $pp);
    if (value2 != null) {
      await $onValueChange(null, true, { global: globalHandlers });
      fire(CalendarEventTypes.VALUE_CLEARED);
    }
    showPopup();
  };
  const onConfirm = async (value2) => {
    if ($disabled) {
      return;
    }
    await $onValueChange(redressTimePart(value2).format(storeFormat), true, { global: globalHandlers });
    setPopupShown(false);
  };
  const value = MUtils.getValue($model, $pp);
  const valueAssigned = VUtils.isNotBlank(value);
  const label = (() => {
    if (VUtils.isBlank(value)) {
      return please || "";
    } else if (date === false) {
      return dayjs(value, storeFormat).format(timeFormat);
    } else if (time) {
      const datetimeFormat = computeFormat({ date: dateFormat, time: timeFormat });
      return dayjs(value, storeFormat).format(datetimeFormat);
    } else {
      return dayjs(value, storeFormat).format(dateFormat);
    }
  })();
  const initValueForPopup = (() => {
    if (VUtils.isBlank(value)) {
      return null;
    }
    const parsed = dayjs(value, storeFormat);
    return parsed.isValid() ? parsed : null;
  })();
  return React.createElement(
    DropdownContainer,
    { active: popupState.active, atBottom: popupState.atBottom, role: "input", tabIndex: 0, ...rest, "data-w": "d9-calendar", "data-disabled": $disabled, "data-visible": $visible, onClick: onClicked, id: PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id), ref: containerRef },
    React.createElement(CalendarValueHolder, { initValue: initValueForPopup }),
    React.createElement(DropdownLabel, { "data-please": !valueAssigned }, label),
    React.createElement(DropdownStick, { valueAssigned, clearable, clear: onClearClicked, disabled: $disabled, icon: useCalendarIcon ? React.createElement(DropdownStickCalendar, null) : void 0 }),
    isDropdownPopupActive(popupState.active) ? React.createElement(CalendarPopup, { "$root": $root, "$model": $model, initValue: initValueForPopup, popupRef, popupState, popupShown, date, dateFormat, time, timeFormat, initTimeAt, autoConfirmOnDate, couldPerform, confirm: onConfirm }) : null
  );
});
const Calendar = reactExports.forwardRef((props, ref) => {
  return React.createElement(
    CalendarEventBusProvider,
    null,
    React.createElement(Picker, { ...props, ref })
  );
});
const DateCalendar = reactExports.forwardRef((props, ref) => {
  return React.createElement(Calendar, { ...props, date: true, time: false, ref });
});
const DateTimeCalendar = reactExports.forwardRef((props, ref) => {
  return React.createElement(Calendar, { ...props, date: true, time: true, ref });
});
const TimeCalendar = reactExports.forwardRef((props, ref) => {
  return React.createElement(Calendar, { ...props, date: false, time: true, ref });
});
registerWidget({ key: "Calendar", JSX: Calendar, container: false, array: false });
registerWidget({ key: "Date", JSX: DateCalendar, container: false, array: false });
registerWidget({ key: "DateTime", JSX: DateTimeCalendar, container: false, array: false });
registerWidget({ key: "Time", JSX: TimeCalendar, container: false, array: false });
const AFormCell = qe.div.attrs(({ id }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-form-cell",
    [DOM_ID_WIDGET]: id
  };
})`
    display: flex;
    position: relative;
    flex-direction: column;
    align-content: start;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);

    &[data-visible=false][data-hold-position-on-invisible=false] {
        display: none;
    }

    &[data-visible=false][data-hold-position-on-invisible=true] {
        opacity: 0;
        pointer-events: none;
    }
`;
const FormCellInvalidMessage = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-form-cell-invalid-msg" })`
    display: flex;
    position: relative;
    align-items: center;
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FORM_CELL_INVALID_MESSAGE_FONT_SIZE};
    font-weight: ${CssVars.FORM_CELL_INVALID_MESSAGE_FONT_WEIGHT};
    color: ${CssVars.FORM_CELL_INVALID_MESSAGE_COLOR};
    min-height: ${CssVars.FORM_CELL_INVALID_MESSAGE_HEIGHT};
    padding: ${CssVars.FORM_CELL_INVALID_MESSAGE_PADDING};
`;
const FormCell = reactExports.forwardRef((props, ref) => {
  const { label, holdPositionWhenInvisible = true, $wrapped, children, placeholder, ...rest } = props;
  const { $avs: { $disabled, $visible, $valid } } = $wrapped;
  const validation = $valid;
  const id = PPUtils.asId(PPUtils.absolute($wrapped.$p2r, props.$pp), props.id);
  const fcId = VUtils.isBlank(id) ? void 0 : `fc-${id}`;
  const fcAttrs = Object.keys(rest ?? {}).reduce((attrs, key) => {
    if (key == "style") {
      attrs.style = rest.style;
    }
    if (VUtils.isPrimitive(rest[key]) && typeof rest[key] !== "symbol") {
      attrs[key] = rest[key];
    }
    return attrs;
  }, {});
  return React.createElement(
    AFormCell,
    { ...fcAttrs, "data-disabled": $disabled, "data-visible": $visible, "data-hold-position-on-invisible": holdPositionWhenInvisible, "data-valid": (validation == null ? void 0 : validation.valid) ?? true, id: fcId, ref },
    React.createElement(LabelLike, { label, "$wrapped": $wrapped, "$validationScopes": props, wrapByCaption: true, "data-r": "d9-fc-caption" }),
    children,
    React.createElement(FormCellInvalidMessage, null, (validation == null ? void 0 : validation.valid) === false ? toIntlLabel(validation.failReason) : null)
  );
});
registerWidget({ key: "FC", JSX: FormCell, container: false, array: false });
registerWidget({ key: "FormCell", JSX: FormCell, container: false, array: false });
const ARadio = qe.div.attrs(({ id }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-radio",
    [DOM_ID_WIDGET]: id
  };
})`
    display: block;
    position: relative;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    padding: calc((${CssVars.INPUT_HEIGHT}) / 6) 0;
    width: ${CssVars.INPUT_HEIGHT};
    height: ${CssVars.INPUT_HEIGHT};
    cursor: pointer;

    &[data-checked=false]:after {
        width: 0;
        height: 0;
        margin-top: calc((${CssVars.INPUT_HEIGHT}) / 3);
        margin-left: calc((${CssVars.INPUT_HEIGHT}) / 3);
    }

    &[data-visible=false] {
        display: none;
    }

    &[disabled], &[data-disabled=true] {
        cursor: default;

        &:before {
            background-color: ${CssVars.DISABLE_COLOR};
        }

        &:hover, &:focus-within {
            &:before {
                border-color: ${CssVars.BORDER_COLOR};
                box-shadow: none;
            }

            &:after {
                background-color: ${CssVars.FONT_COLOR};
            }
        }
    }

    &:hover:before {
        box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
    }

    &:focus-within:before {
        box-shadow: ${CssVars.PRIMARY_SHADOW};
    }

    &:hover,
    &:focus-within {
        &:before {
            border-color: ${CssVars.PRIMARY_COLOR};
        }

        &:after {
            background-color: ${CssVars.PRIMARY_COLOR};
        }
    }

    &:before {
        content: '';
        display: block;
        position: absolute;
        width: calc((${CssVars.INPUT_HEIGHT}) / 3 * 2);
        height: calc((${CssVars.INPUT_HEIGHT}) / 3 * 2);
        border: ${CssVars.BORDER};
        border-radius: 100%;
        transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
        z-index: 0;
    }

    &:after {
        content: '';
        display: block;
        position: absolute;
        width: calc((${CssVars.INPUT_HEIGHT}) / 3);
        height: calc((${CssVars.INPUT_HEIGHT}) / 3);
        margin-top: calc((${CssVars.INPUT_HEIGHT}) / 6);
        margin-left: calc((${CssVars.INPUT_HEIGHT}) / 6);
        border-radius: 100%;
        background-color: ${CssVars.FONT_COLOR};
        transform-origin: center;
        transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    }
`;
const Radio = reactExports.forwardRef((props, ref) => {
  const { values = [true, false], tip, $pp, $wrapped: { $onValueChange, $root, $model, $avs: { $disabled, $visible } }, ...rest } = props;
  const globalHandlers = useGlobalHandlers();
  const radioRef = reactExports.useRef(null);
  useDualRefs(radioRef, ref);
  useTip({ ref: radioRef, ...buildTip({ tip, root: $root, model: $model }) });
  const onValueShouldChange = async () => {
    const oldValue = MUtils.getValue($model, $pp);
    if (oldValue == values[0])
      ;
    else {
      const newValue = oldValue == values[0] ? values[1] : values[0];
      await $onValueChange(newValue, true, { global: globalHandlers });
    }
  };
  const onClick = async (event) => {
    if ($disabled) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    await onValueShouldChange();
  };
  const onKeyUp = async (event) => {
    const { key } = event;
    if (key === " ") {
      await onValueShouldChange();
    }
  };
  const value = MUtils.getValue($model, $pp);
  const checked = (value ?? "") == (values[0] ?? "");
  return React.createElement(ARadio, { "data-disabled": $disabled, "data-visible": $visible, tabIndex: 0, "data-checked": checked, onClick, onKeyUp, ...rest, ref: radioRef });
});
registerWidget({ key: "Radio", JSX: Radio, container: false, array: false });
const APage = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-page" })`
    display: grid;
    position: relative;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    grid-template-columns: repeat(${CssVars.GRID_COLUMNS}, calc((100% - ${CssVars.GRID_COLUMN_GAP} * (${CssVars.GRID_COLUMNS} - 1)) / ${CssVars.GRID_COLUMNS}));
    grid-column-gap: ${CssVars.GRID_COLUMN_GAP};
    grid-row-gap: ${CssVars.GRID_ROW_GAP};
`;
const Page = reactExports.forwardRef((props, ref) => {
  const { $wrapped: { $avs: { $disabled } }, children, ...rest } = props;
  return React.createElement(APage, { ...rest, "data-disabled": $disabled, ref }, children);
});
registerWidget({ key: "Page", JSX: Page, container: true, array: false, consumePosition: false });
const useArrayCouldAddElement = (props) => {
  const { $pp, $wrapped, $array: { couldAddElement, disableOnCannotAdd = true } } = props;
  const { on, off } = useRootEventBus();
  const globalHandlers = useGlobalHandlers();
  const [disabled, setDisabled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (disableOnCannotAdd === false || couldAddElement == null) {
      return;
    }
    const { $array, absolutePathOfArray } = PPUtils.isLevelStayed($pp) ? { $array: $wrapped.$model, absolutePathOfArray: $wrapped.$p2r } : {
      $array: MUtils.getValue($wrapped.$model, $pp),
      absolutePathOfArray: PPUtils.absolute($wrapped.$p2r, $pp)
    };
    const computeEnablement = async () => {
      const could = await couldAddElement({
        root: $wrapped.$root,
        model: $array
      }, { global: globalHandlers });
      setDisabled(!could);
    };
    computeEnablement();
    const onValueChanged = async (absolutePath) => {
      if (!PPUtils.matches(absolutePathOfArray, absolutePath)) {
        return;
      }
      await computeEnablement();
    };
    on && on(RootEventTypes.VALUE_CHANGED, onValueChanged);
    return () => {
      off && off(RootEventTypes.VALUE_CHANGED, onValueChanged);
    };
  }, [
    globalHandlers,
    on,
    off,
    couldAddElement,
    disableOnCannotAdd,
    $pp,
    $wrapped.$p2r,
    $wrapped.$root,
    $wrapped.$model
  ]);
  return [disabled, setDisabled];
};
const ARibs = qe.div.attrs(({ id }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-ribs",
    [DOM_ID_WIDGET]: id
  };
})`
    display: flex;
    position: relative;
    flex-direction: column;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);

    &[data-visible=false] {
        display: none;
    }

    > button {
        margin-top: 16px;
        max-height: ${CssVars.RIB_BUTTON_HEIGHT};
    }
`;
const ARibRow = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-rib-row" })`
    display: flex;
    position: relative;
    flex-direction: column;
    margin-bottom: ${CssVars.RIB_GAP_SIZE};
`;
const ARibRowHeader = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-rib-row-header" })`
    display: grid;
    position: relative;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    grid-column-gap: ${CssVars.SECTION_BODY_PADDING};
    border-radius: ${CssVars.RIB_BORDER_RADIUS};
    background-color: ${CssVars.RIB_HEADER_BACKGROUND_COLOR};
    padding: ${CssVars.RIB_HEADER_PADDING};
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    color: ${CssVars.FONT_COLOR};
    cursor: pointer;

    &[data-expanded=true] {
        cursor: default;
    }

    &[data-show-row-index=false] {
        > div[data-w=d9-rib-row-index] {
            width: 0;
            overflow: hidden;
        }

        > div[data-w=d9-rib-row-header-content] {
            margin-left: calc(-1 * ${CssVars.SECTION_BODY_PADDING});
        }
    }
`;
const ARibRowIndex = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-rib-row-index" })`
    display: flex;
    position: relative;
    font-size: 0.8em;
    font-weight: ${CssVars.FONT_BOLD};
`;
const ARibRowHeaderContent = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-rib-row-header-content" })`
    display: block;
    position: relative;
`;
const ARibRowOperators = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-rib-row-operators" })`
    display: flex;
    position: relative;
    align-items: center;
    padding: 0 ${CssVars.BUTTON_INDENT};

    > button[data-w=d9-rib-row-operator] {
        display: flex;
        position: relative;
        align-items: center;
        height: ${CssVars.RIB_BUTTON_HEIGHT};
        width: ${CssVars.RIB_BUTTON_HEIGHT};
        padding: 0;

        &:not(:first-child) {
            margin-left: 4px;
        }
    }
`;
const ARibRowBody = qe.div.attrs(({ expanded }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-rib-row-body",
    style: {
      padding: expanded ? void 0 : 0,
      height: expanded ? void 0 : 0,
      overflow: expanded ? void 0 : "hidden"
    }
  };
})`
    display: grid;
    position: relative;
    grid-column: 1 / span 2;
    grid-template-columns: repeat(${CssVars.GRID_COLUMNS}, calc((100% - ${CssVars.GRID_COLUMN_GAP} * (${CssVars.GRID_COLUMNS} - 1)) / ${CssVars.GRID_COLUMNS}));
    grid-column-gap: ${CssVars.GRID_COLUMN_GAP};
    grid-row-gap: ${CssVars.GRID_ROW_GAP};
    padding: ${CssVars.SECTION_BODY_PADDING} 0;
`;
const ARibNoDataRow = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-rib-no-data-row" })`
    display: flex;
    position: relative;
    align-items: center;
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    color: ${CssVars.FONT_COLOR};
    min-width: 100%;
    height: ${CssVars.INPUT_HEIGHT};

    > span {
        display: flex;
        position: relative;
        align-items: center;
        min-height: ${CssVars.TABLE_CELL_HEIGHT};
        padding: 0 ${CssVars.TABLE_CELL_PADDING};
    }
`;
const ARibBottomBar = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-rib-bottom-bar" })`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: flex-end;
    height: ${CssVars.RIB_FOOTER_HEIGHT};
    margin-top: 0;
    z-index: 4;
`;
const RibBottomBarButton = (props) => {
  var _a;
  const { $wrapped, $array: { addLabel = React.createElement(IntlLabel, { keys: ["ribs", "createItem"], value: "Create New Element" }), addElement } } = props;
  const globalHandlers = useGlobalHandlers();
  const [disabled] = useArrayCouldAddElement(props);
  const onAddClicked = async () => await addElement({ global: globalHandlers });
  const button$wrapped = {
    ...$wrapped,
    $avs: { ...$wrapped.$avs ?? {}, $disabled: disabled === true ? disabled : (_a = $wrapped.$avs) == null ? void 0 : _a.$disabled }
  };
  return React.createElement(Button, { "$wrapped": button$wrapped, ink: ButtonInk.PRIMARY, text: addLabel, click: onAddClicked });
};
const RibBottomBar = (props) => {
  const { $array: { addable = false } } = props;
  if (addable === false) {
    return null;
  } else {
    return React.createElement(
      ARibBottomBar,
      null,
      React.createElement(RibBottomBarButton, { ...props })
    );
  }
};
const RibNoData = (props) => {
  const { $array: { hasElement, noElementReminder = React.createElement(IntlLabel, { keys: ["ribs", "noElement"], value: "No data found." }) } } = props;
  if (hasElement) {
    return null;
  } else {
    return React.createElement(ARibNoDataRow, null, toIntlLabel(noElementReminder));
  }
};
const RibRowExpanderSvg = qe(ArrowDown).attrs({ [DOM_KEY_WIDGET]: "d9-rib-row-header-expander-svg" })`
    height: 70%;
    color: ${CssVars.FONT_COLOR};
    opacity: 0.7;
    transition: transform ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-expanded=true] {
        transform: rotateX(180deg);
    }
`;
const SectionStyleExpander = (props) => {
  const { expanded, expand, collapse } = props;
  const $wrapped = {
    $root: {},
    $model: {},
    $p2r: ".",
    $onValueChange: VUtils.noop,
    $avs: { $disabled: false, $visible: true }
  };
  return React.createElement(Button, { "$wrapped": $wrapped, ink: ButtonInk.PRIMARY, fill: ButtonFill.PLAIN, leads: [React.createElement(RibRowExpanderSvg, { "data-expanded": expanded })], click: expanded ? collapse : expand, "data-w": "d9-rib-row-operator" });
};
const ExpandButton$1 = (props) => {
  const { onClick } = props;
  const $wrapped = {
    $root: {},
    $model: {},
    $p2r: ".",
    $onValueChange: VUtils.noop,
    $avs: { $disabled: false, $visible: true }
  };
  return React.createElement(Button, { "$wrapped": $wrapped, ink: ButtonInk.PRIMARY, fill: ButtonFill.PLAIN, leads: ["$icons.expand"], click: onClick, "data-w": "d9-rib-row-operator" });
};
const CollapseButton$1 = (props) => {
  const { onClick } = props;
  const $wrapped = {
    $root: {},
    $model: {},
    $p2r: ".",
    $onValueChange: VUtils.noop,
    $avs: { $disabled: false, $visible: true }
  };
  return React.createElement(Button, { "$wrapped": $wrapped, ink: ButtonInk.PRIMARY, fill: ButtonFill.PLAIN, leads: ["$icons.collapse"], click: onClick, "data-w": "d9-rib-row-operator" });
};
const RemoveButton$1 = (props) => {
  const { onClick } = props;
  const $wrapped = {
    $root: {},
    $model: {},
    $p2r: ".",
    $onValueChange: VUtils.noop,
    $avs: { $disabled: false, $visible: true }
  };
  return React.createElement(Button, { "$wrapped": $wrapped, ink: ButtonInk.PRIMARY, fill: ButtonFill.PLAIN, leads: ["$icons.remove"], click: onClick, "data-w": "d9-rib-row-operator" });
};
const RibRowOperators = (props) => {
  const { expanded, expand, collapse, useSectionStyleIcons, removable = false, removeElement } = props;
  const globalHandlers = useGlobalHandlers();
  const onRemoveClicked = async () => await removeElement(globalHandlers);
  return React.createElement(
    ARibRowOperators,
    { "data-expanded": expanded },
    removable ? React.createElement(RemoveButton$1, { onClick: onRemoveClicked }) : null,
    useSectionStyleIcons ? React.createElement(SectionStyleExpander, { expanded, expand, collapse }) : React.createElement(
      React.Fragment,
      null,
      !expanded ? React.createElement(ExpandButton$1, { onClick: expand }) : null,
      expanded ? React.createElement(CollapseButton$1, { onClick: collapse }) : null
    )
  );
};
const DEFAULTS = {
  USE_SECTION_STYLE_ICONS: false,
  SHOW_ROW_INDEX: true
};
const setRibsDefaults = (defaults) => {
  DEFAULTS.USE_SECTION_STYLE_ICONS = defaults.useSectionStyleIcons ?? DEFAULTS.USE_SECTION_STYLE_ICONS;
  DEFAULTS.SHOW_ROW_INDEX = defaults.showRowIndex ?? DEFAULTS.SHOW_ROW_INDEX;
};
const isUseSectionStyleIcons = () => DEFAULTS.USE_SECTION_STYLE_ICONS;
const isShowRowIndex = () => DEFAULTS.SHOW_ROW_INDEX;
var utils$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  isShowRowIndex,
  isUseSectionStyleIcons,
  setRibsDefaults
});
const RibRow = (props) => {
  const { marker = "", caption, useSectionStyleIcons = isUseSectionStyleIcons(), showRowIndex = isShowRowIndex(), initExpanded, $wrapped, $array: { elementIndex, removable, removeElement, getElementKey }, children } = props;
  const { on: onGlobal, off: offGlobal } = useGlobalEventBus();
  const [expanded, setExpanded] = reactExports.useState(() => {
    if (initExpanded) {
      return initExpanded($wrapped.$model, elementIndex);
    }
    return false;
  });
  const rowMarker = getElementKey != null ? getElementKey($wrapped.$model) : void 0;
  reactExports.useEffect(() => {
    const onCustomEvent = (_, prefix, clipped) => {
      if (clipped !== `${marker}-${rowMarker ?? elementIndex}`) {
        return;
      }
      switch (prefix) {
        case GlobalEventPrefix.EXPAND_RIBS_ELEMENT:
          setExpanded(true);
          break;
        case GlobalEventPrefix.COLLAPSE_RIBS_ELEMENT:
          setExpanded(false);
          break;
      }
    };
    onGlobal && onGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
    return () => {
      offGlobal && offGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
    };
  }, [onGlobal, offGlobal, marker, rowMarker, elementIndex]);
  const expand = () => setExpanded(true);
  const collapse = () => setExpanded(false);
  const onRowClicked = () => {
    if (!expanded) {
      setExpanded(true);
    }
  };
  return React.createElement(
    ARibRow,
    null,
    React.createElement(
      ARibRowHeader,
      { "data-expanded": expanded, "data-show-row-index": showRowIndex, onClick: onRowClicked },
      React.createElement(
        ARibRowIndex,
        null,
        "# ",
        elementIndex + 1
      ),
      React.createElement(
        ARibRowHeaderContent,
        null,
        React.createElement(LabelLike, { label: caption, "$wrapped": $wrapped, "$validationScopes": props })
      ),
      React.createElement(RibRowOperators, { expanded, expand, collapse, useSectionStyleIcons, removable, removeElement })
    ),
    React.createElement(ARibRowBody, { expanded }, children)
  );
};
const Ribs$1 = reactExports.forwardRef((props, ref) => {
  const { $wrapped: { $p2r, $avs: { $disabled, $visible } }, children, ...rest } = props;
  return React.createElement(ARibs, { ...rest, "data-disabled": $disabled, "data-visible": $visible, id: PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id), ref }, children);
});
const ImmutableRibRow = (props) => {
  const { children } = props;
  return React.createElement(ARibRow, null, children);
};
const ImmutableRibs = reactExports.forwardRef((props, ref) => {
  const { $array, children, ...rest } = props;
  return React.createElement(Ribs$1, { "$array": { ...$array, addable: false, removable: false }, ...rest, ref }, children);
});
registerWidget({
  key: "RibsView",
  JSX: ImmutableRibs,
  NO_ELEMENT: RibNoData,
  ELEMENT: ImmutableRibRow,
  container: true,
  array: true
});
const Ribs = reactExports.forwardRef((props, ref) => {
  const { children, ...rest } = props;
  return React.createElement(Ribs$1, { ...rest, ref }, children);
});
registerWidget({
  key: "Ribs",
  JSX: Ribs,
  NO_ELEMENT: RibNoData,
  ELEMENT: RibRow,
  BOTTOM: RibBottomBar,
  container: true,
  array: true
});
const Context$2 = reactExports.createContext({});
Context$2.displayName = "TableEventBus";
const TableEventBusProvider = (props) => {
  const { children } = props;
  const bus = useCreateEventBus("table");
  return React.createElement(Context$2.Provider, { value: bus }, children);
};
const useTableEventBus = () => reactExports.useContext(Context$2);
const ATable = qe.div.attrs(({ id }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-table",
    [DOM_ID_WIDGET]: id
  };
})`
    display: block;
    position: relative;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);

    &[data-visible=false] {
        display: none;
    }
`;
const ATableNoDataRow = qe.div.attrs(({ columnsCount }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-table-no-data-row",
    style: {
      gridColumn: `1 / span ${columnsCount}`
    }
  };
})`
    display: flex;
    position: sticky;
    left: 0;
    align-items: center;
    min-width: 100%;
    color: ${CssVars.FONT_COLOR};
    font-family: ${CssVars.TABLE_HEADER_FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    font-weight: ${CssVars.TABLE_HEADER_FONT_WEIGHT};
    border-bottom: ${CssVars.TABLE_CELL_BORDER};
    border-bottom-color: transparent;

    > span {
        display: flex;
        position: relative;
        align-items: center;
        min-height: ${CssVars.TABLE_CELL_HEIGHT};
        padding: 0 ${CssVars.TABLE_CELL_PADDING};
    }
`;
const ATableContent = qe.div.attrs(({ headerHeight, maxBodyHeight, columnsWidth }) => {
  let maxHeight = void 0;
  if (!VUtils.isBlank(maxBodyHeight)) {
    const computedHeaderHeight = VUtils.isBlank(headerHeight) ? `${CssVars.TABLE_HEADER_HEIGHT} - ${CssVars.TABLE_HEADER_BORDER_SIZE}` : toCssSize(headerHeight);
    maxHeight = `calc(${computedHeaderHeight} + ${toCssSize(maxBodyHeight)})`;
  }
  return {
    [DOM_KEY_WIDGET]: "d9-table-content",
    "data-h-scroll": "",
    "data-v-scroll": "",
    style: { maxHeight, gridTemplateColumns: columnsWidth.join(" ") }
  };
})`
    display: grid;
    position: relative;
    border-bottom: ${CssVars.TABLE_CELL_BORDER};
    color: ${CssVars.FONT_COLOR};
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    overflow-x: auto;
    overflow-y: auto;
`;
const ATableHeaderCell = qe.div.attrs(({ headerHeight, isGrabber, stickyOffset }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-table-header-cell",
    style: {
      height: toCssSize(headerHeight),
      padding: isGrabber ? 0 : void 0,
      left: stickyOffset[1],
      right: stickyOffset[2],
      zIndex: VUtils.isNotBlank(stickyOffset[2]) ? 6 : VUtils.isNotBlank(stickyOffset[1]) ? 5 : void 0
    }
  };
})`
    display: flex;
    position: sticky;
    top: 0;
    align-items: center;
    min-height: ${CssVars.TABLE_HEADER_HEIGHT};
    padding: 0 ${CssVars.TABLE_CELL_PADDING};
    border-bottom: ${CssVars.TABLE_HEADER_BORDER};
    background-color: ${CssVars.TABLE_HEADER_BACKGROUND_COLOR};
    font-family: ${CssVars.TABLE_HEADER_FONT_FAMILY};
    font-size: ${CssVars.TABLE_HEADER_FONT_SIZE};
    font-weight: ${CssVars.TABLE_HEADER_FONT_WEIGHT};
    overflow: hidden;
    white-space: nowrap;
    z-index: 4;
`;
const ATableBodyRowIndexCell = qe.div.attrs(({ rowIndex, rowSpan }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-table-row-index-cell",
    style: {
      backgroundColor: rowIndex % 2 === 1 ? CssVars.TABLE_ODD_ROW_BACKGROUND_COLOR : void 0,
      gridRow: rowSpan === 2 ? "span 2" : void 0
    }
  };
})`
    display: flex;
    position: sticky;
    left: 0;
    align-self: stretch;
    align-items: start;
    min-height: ${CssVars.TABLE_CELL_HEIGHT};
    padding: 0 ${CssVars.TABLE_CELL_PADDING};
    color: ${CssVars.FONT_COLOR};
    background-color: ${CssVars.BACKGROUND_COLOR};
    font-family: ${CssVars.FONT_FAMILY};
    font-size: 0.8em;
    overflow: hidden;
    white-space: nowrap;
    z-index: 2;

    > span {
        display: flex;
        position: relative;
        align-items: center;
        min-height: ${CssVars.TABLE_CELL_HEIGHT};
        font-weight: ${CssVars.FONT_BOLD};
        opacity: ${CssVars.TABLE_ROW_INDEX_OPACITY};
    }
`;
const ATableBodyCell = qe.div.attrs(({ isGrabber, rowIndex, stickyOffset }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-table-row-cell",
    style: {
      padding: isGrabber ? 0 : void 0,
      backgroundColor: rowIndex % 2 === 1 ? CssVars.TABLE_ODD_ROW_BACKGROUND_COLOR : void 0,
      position: stickyOffset[0] ? "sticky" : void 0,
      left: stickyOffset[1],
      right: stickyOffset[2],
      zIndex: VUtils.isNotBlank(stickyOffset[2]) ? 3 : VUtils.isNotBlank(stickyOffset[1]) ? 2 : void 0
    }
  };
})`
    display: flex;
    position: relative;
    align-items: center;
    min-height: ${CssVars.TABLE_CELL_HEIGHT};
    padding: 0 calc(${CssVars.TABLE_CELL_PADDING});
    background-color: ${CssVars.BACKGROUND_COLOR};

    &[data-click-to-expand=true] {
        cursor: pointer;

        &[data-expanded=true] {
            cursor: default;
        }
    }

    > input[data-w=d9-input],
    > div[data-w=d9-dropdown],
    > div[data-w=d9-calendar] {
        flex-grow: 1;
        height: calc(${CssVars.TABLE_CELL_HEIGHT} - 6px);
        margin: 0 calc(${CssVars.INPUT_INDENT} * -1);

        &:not(&:hover), &:not(&:focus), &:not(&:focus-within) {
            border-color: transparent;
        }
    }
`;
const ATableRowOperators = qe.div.attrs(({ rowIndex, rowSpan }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-table-row-operators",
    style: {
      backgroundColor: rowIndex % 2 === 1 ? CssVars.TABLE_ODD_ROW_BACKGROUND_COLOR : void 0,
      gridRow: rowSpan === 2 ? "span 2" : void 0
    }
  };
})`
    display: flex;
    position: sticky;
    align-self: stretch;
    align-items: start;
    justify-content: flex-end;
    right: 0;
    background-color: ${CssVars.BACKGROUND_COLOR};
    padding: 0 calc(${CssVars.TABLE_CELL_PADDING} / 2);
    z-index: 3;

    &:empty {
        padding: 0;
    }

    > button[data-w=d9-button][data-role=d9-table-row-operator] {
        padding: 0;
        margin-top: calc((${CssVars.TABLE_CELL_HEIGHT} - ${CssVars.TABLE_BUTTON_HEIGHT}) / 2);
        height: ${CssVars.TABLE_BUTTON_HEIGHT};
        width: ${CssVars.TABLE_BUTTON_HEIGHT};

        &:not(:first-child) {
            margin-left: 4px;
        }
    }
`;
const ATableBodyCellExpandArea = qe.div.attrs(({ columnsCount, expanded }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-table-row-expand-area",
    style: {
      gridColumn: `2 / span ${columnsCount}`,
      height: expanded ? void 0 : 0
    }
  };
})`
    display: grid;
    position: sticky;
    grid-template-columns: repeat(${CssVars.GRID_COLUMNS}, calc((100% - ${CssVars.GRID_COLUMN_GAP} * (${CssVars.GRID_COLUMNS} - 1)) / ${CssVars.GRID_COLUMNS}));
    grid-column-gap: ${CssVars.GRID_COLUMN_GAP};
    grid-row-gap: ${CssVars.GRID_ROW_GAP};
    overflow: hidden;
    z-index: 1;
`;
const ATableBottomBar = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-table-bottom-bar" })`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: flex-end;
    height: ${CssVars.TABLE_FOOTER_HEIGHT};

    > div[data-w=d9-pagination] {
        flex-grow: 1;
    }
`;
const ATableBottomBarSeparator = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-table-bottom-bar-separator" })`
    display: block;
    position: relative;
    margin: 0 12px;
    border: ${CssVars.BORDER};
    height: calc(${CssVars.INPUT_HEIGHT} * 0.6);
`;
const Table$1 = reactExports.forwardRef((props, ref) => {
  const { $wrapped, headers, pageable, children, ...rest } = props;
  const { $avs: { $disabled, $visible } } = $wrapped;
  return React.createElement(ATable, { ...rest, "data-disabled": $disabled, "data-visible": $visible, id: PPUtils.asId(PPUtils.absolute($wrapped.$p2r, props.$pp), props.id), ref }, children);
});
var TableEventTypes;
(function(TableEventTypes2) {
  TableEventTypes2["EXPAND_ROW"] = "expand-row";
  TableEventTypes2["ROW_EXPANDED"] = "row-expanded";
  TableEventTypes2["COLLAPSE_ROW"] = "collapse-row";
  TableEventTypes2["ROW_COLLAPSED"] = "row-collapsed";
  TableEventTypes2["REMOVE_ROW"] = "remove-row";
  TableEventTypes2["PAGE_CHANGED"] = "page-changed";
  TableEventTypes2["PAGE_CHANGED_BY_FILTER"] = "page-changed-by-filter";
  TableEventTypes2["FILTER_CHANGED"] = "filter-changed";
})(TableEventTypes || (TableEventTypes = {}));
const TableBottomBarButton = (props) => {
  var _a;
  const { $wrapped, $array: { addLabel = React.createElement(IntlLabel, { keys: ["table", "createItem"], value: "Create New Element" }), addElement } } = props;
  const globalHandlers = useGlobalHandlers();
  const [disabled] = useArrayCouldAddElement(props);
  const onAddClicked = async () => await addElement({ global: globalHandlers });
  const button$wrapped = {
    ...$wrapped,
    $avs: { ...$wrapped.$avs ?? {}, $disabled: disabled === true ? disabled : (_a = $wrapped.$avs) == null ? void 0 : _a.$disabled }
  };
  return React.createElement(Button, { "$wrapped": button$wrapped, ink: ButtonInk.PRIMARY, text: addLabel, click: onAddClicked });
};
const TableBottomBar = (props) => {
  const { $wrapped, pageable, $array: { addable = false } } = props;
  const { on, off, fire } = useTableEventBus();
  const forceUpdate = useForceUpdate();
  reactExports.useEffect(() => {
    if (pageable == null) {
      return;
    }
    const onPageChanged = () => {
      forceUpdate();
    };
    on(TableEventTypes.PAGE_CHANGED_BY_FILTER, onPageChanged);
    return () => {
      off(TableEventTypes.PAGE_CHANGED_BY_FILTER, onPageChanged);
    };
  }, [on, off, pageable, forceUpdate]);
  if (addable === false && pageable == null) {
    return null;
  } else {
    const onPaginationChanged = async (options) => {
      fire(TableEventTypes.PAGE_CHANGED, options.oldValue, options.newValue);
    };
    const { valueChanged, ...pageableDef } = pageable ?? {};
    return React.createElement(
      ATableBottomBar,
      null,
      pageable != null ? React.createElement(Wrapper, { ...pageableDef, valueChanged: onPaginationChanged, "$root": $wrapped.$root, "$model": $wrapped.$model, "$p2r": $wrapped.$p2r }) : null,
      pageable != null && addable !== false ? React.createElement(ATableBottomBarSeparator, null) : null,
      addable !== false ? React.createElement(TableBottomBarButton, { ...props }) : null
    );
  }
};
const UnwrappedDropdown = reactExports.forwardRef((props, ref) => {
  const { $pp = "value", value, onValueChange, disabled, visible, ...rest } = props;
  const $onValueChange = onValueChange;
  const $avs = { $disabled: disabled, $visible: visible };
  const $root = { [$pp]: value };
  return React.createElement(Dropdown, { ...rest, "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, "$pp": $pp, id: rest.id ?? VUtils.generateUniqueId(), ref });
});
const APagination = qe.div.attrs(({ id, [DOM_KEY_WIDGET]: dataW }) => {
  return {
    [DOM_KEY_WIDGET]: dataW || "d9-pagination",
    [DOM_ID_WIDGET]: id
  };
})`
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    color: ${CssVars.FONT_COLOR};

    &[data-visible=false] {
        display: none;
    }

    > div[data-page-info=true] {
        display: flex;
        position: relative;
        align-items: center;

        > span:empty {
            display: none;
        }

        > span:not(:first-child) {
            margin-left: 0.3em;
        }

        > div[data-w=d9-dropdown] {
            height: calc(${CssVars.INPUT_HEIGHT} * 0.8);
            width: unset;
            margin-left: 0.6em;
            margin-right: 0.3em;
        }
    }

    > div[data-page-buttons=true] {
        display: flex;
        position: relative;
        column-gap: 4px;

        > button {
            width: ${CssVars.INPUT_HEIGHT};
            padding: 0;
            transition: border-color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, box-shadow ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
        }
    }
`;
const guardPaginationData = ($model, $pp) => {
  let data = MUtils.getValue($model, $pp);
  if (data == null) {
    data = { pageNumber: 1, pageSize: 20, pageCount: 1, itemCount: 0 };
    MUtils.setValue($model, $pp, data);
  }
  const checkPageNumber = VUtils.isPositive(data.pageNumber);
  if (checkPageNumber.test) {
    data.pageNumber = Math.max(1, Math.floor(data.pageNumber));
  } else {
    data.pageNumber = 1;
  }
  const checkPageSize = VUtils.isPositive(data.pageSize);
  if (checkPageSize.test) {
    data.pageSize = Math.max(1, Math.floor(data.pageSize));
  } else {
    data.pageSize = 20;
  }
  const checkPageCount = VUtils.isPositive(data.pageCount);
  if (checkPageCount.test) {
    data.pageCount = Math.max(1, Math.floor(data.pageCount));
  } else {
    data.pageCount = 1;
  }
  const checkItemCount = VUtils.isNumber(data.itemCount);
  if (checkItemCount.test && data.itemCount >= 0) {
    data.itemCount = Math.floor(data.itemCount);
    const maxPageCount = Math.ceil(data.itemCount / data.pageSize);
    data.pageCount = Math.min(data.pageCount, maxPageCount);
  } else {
    data.itemCount = -1;
  }
  if (data.pageNumber > data.pageCount) {
    data.pageNumber = data.pageCount;
  }
  return data;
};
const computePageNumbers = (maxButtons, data) => {
  const offset = Math.floor((maxButtons - 1) / 2);
  const pageNumbers = new Array(maxButtons).fill(data.pageNumber).map((value, index) => {
    return value + index - offset;
  }).filter((pageNumber) => pageNumber > 0 && pageNumber <= data.pageCount);
  while (pageNumbers.length < maxButtons) {
    if (pageNumbers[pageNumbers.length - 1] < data.pageCount) {
      pageNumbers.push(pageNumbers[pageNumbers.length - 1] + 1);
    } else if (pageNumbers[0] > 1) {
      pageNumbers.unshift(pageNumbers[0] - 1);
    } else {
      break;
    }
  }
  return pageNumbers;
};
const Pagination = reactExports.forwardRef((props, ref) => {
  const { $pp, $wrapped, freeWalk = false, maxButtons = 7, possibleSizes = [], ...rest } = props;
  const { $model, $p2r, $onValueChange, $avs: { $disabled, $visible } } = $wrapped;
  const globalHandlers = useGlobalHandlers();
  const data = guardPaginationData($model, $pp);
  const onPageClicked = (pageNumber) => async () => {
    if (pageNumber !== data.pageNumber) {
      data.pageNumber = pageNumber;
      await $onValueChange(data, true, { global: globalHandlers });
    }
  };
  const buildFreeWalkOptions = () => {
    return new Array(data.pageCount).fill(1).map((_, index) => ({ value: index + 1, label: `${index + 1}` }));
  };
  const onFreeWalkChanged = async (pageNumber) => {
    if (pageNumber !== data.pageNumber) {
      data.pageNumber = pageNumber;
      await $onValueChange(data, true, { global: globalHandlers });
    }
  };
  const possibleSizesOptions = (() => {
    const options = [.../* @__PURE__ */ new Set([...possibleSizes, data.pageSize])].sort().map((size) => ({ value: size, label: `${size}` }));
    if (options.length === 1) {
      return [];
    } else {
      return options.sort((a, b) => a.value - b.value);
    }
  })();
  const onPageSizeChanged = async (pageSize) => {
    if (pageSize !== data.pageSize) {
      const currentFirstItemIndex = (data.pageNumber - 1) * data.pageSize;
      const itemCount2 = data.itemCount === -1 ? data.pageSize * data.pageCount : data.itemCount;
      data.pageSize = pageSize;
      data.pageNumber = Math.floor(currentFirstItemIndex / data.pageSize) + 1;
      data.pageCount = Math.ceil(itemCount2 / data.pageSize);
      await $onValueChange(data, true, { global: globalHandlers });
    }
  };
  const pageNumbers = computePageNumbers(maxButtons, data);
  const hasPrevious = pageNumbers[0] !== 1;
  const hasNext = pageNumbers[pageNumbers.length - 1] !== data.pageCount;
  const format = nfXWithLocale(locale(), 0);
  const pageCount = format(data.pageCount);
  const itemCount = data.itemCount === -1 ? React.createElement(IntlLabel, { keys: ["pagination", "unknownItemCount"], value: "???" }) : format(data.itemCount);
  return React.createElement(
    APagination,
    { ...rest, "data-disabled": $disabled, "data-visible": $visible, id: PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id), ref },
    React.createElement(
      "div",
      { "data-page-info": true },
      React.createElement(
        "span",
        null,
        React.createElement(IntlLabel, { keys: ["pagination", "page"], value: "" })
      ),
      freeWalk ? React.createElement(UnwrappedDropdown, { value: data.pageNumber, options: buildFreeWalkOptions(), clearable: false, "data-free-walk": true, onValueChange: onFreeWalkChanged }) : React.createElement("span", null, data.pageNumber),
      React.createElement(
        "span",
        null,
        React.createElement(IntlLabel, { keys: ["pagination", "of"], value: "of" })
      ),
      React.createElement("span", null, pageCount),
      React.createElement(
        "span",
        null,
        React.createElement(IntlLabel, { keys: ["pagination", "pages"], value: "pages," })
      ),
      possibleSizesOptions.length !== 0 ? React.createElement(UnwrappedDropdown, { value: data.pageSize, options: possibleSizesOptions, clearable: false, "data-possible-sizes": true, onValueChange: onPageSizeChanged }) : React.createElement("span", null, data.pageSize),
      React.createElement(
        "span",
        null,
        React.createElement(IntlLabel, { keys: ["pagination", "afterSize"], value: "items per page," })
      ),
      React.createElement(
        "span",
        null,
        React.createElement(IntlLabel, { keys: ["pagination", "total"], value: "total" })
      ),
      React.createElement("span", null, itemCount),
      React.createElement(
        "span",
        null,
        React.createElement(IntlLabel, { keys: ["pagination", "items"], value: "items." })
      )
    ),
    React.createElement(
      "div",
      { "data-page-buttons": true },
      hasPrevious ? React.createElement(
        React.Fragment,
        null,
        React.createElement(UnwrappedButton, { onClick: onPageClicked(1), ink: ButtonInk.PRIMARY, fill: ButtonFill.PLAIN, leads: ["$icons.backward"] }),
        React.createElement(UnwrappedButton, { onClick: onPageClicked(Math.max(pageNumbers[0] - 1, 1)), ink: ButtonInk.PRIMARY, fill: ButtonFill.PLAIN, leads: ["$icons.angleLeft"] })
      ) : null,
      pageNumbers.map((pageNumber) => {
        return React.createElement(UnwrappedButton, { key: pageNumber, onClick: onPageClicked(pageNumber), ink: ButtonInk.PRIMARY, fill: pageNumber === data.pageNumber ? ButtonFill.FILL : ButtonFill.PLAIN }, pageNumber);
      }),
      hasNext ? React.createElement(
        React.Fragment,
        null,
        React.createElement(UnwrappedButton, { onClick: onPageClicked(Math.min(pageNumbers[pageNumbers.length - 1] + 1, data.pageCount)), ink: ButtonInk.PRIMARY, fill: ButtonFill.PLAIN, leads: ["$icons.angleRight"] }),
        React.createElement(UnwrappedButton, { onClick: onPageClicked(data.pageCount), ink: ButtonInk.PRIMARY, fill: ButtonFill.PLAIN, leads: ["$icons.forward"] })
      ) : null
    )
  );
});
registerWidget({ key: "Pagination", JSX: Pagination, container: false, array: false });
const TableHeader = (props) => {
  const { headers, headerHeight, stickyOffsets, tailGrabberAppended, $wrapped: wrapped } = props;
  const $wrapped = { ...wrapped, $onValueChange: VUtils.noop };
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      ATableHeaderCell,
      { headerHeight, isGrabber: true, stickyOffset: stickyOffsets[0] },
      React.createElement(IntlLabel, { keys: ["table", "headers", "index"], value: void 0 })
    ),
    headers.map((header, index) => {
      const key = NUtils.getDefKey(header);
      return React.createElement(
        ATableHeaderCell,
        { headerHeight, stickyOffset: stickyOffsets[index + 1], key },
        React.createElement(LabelLike, { "$wrapped": $wrapped, label: header.label })
      );
    }),
    tailGrabberAppended ? React.createElement(ATableHeaderCell, { headerHeight, isGrabber: true, stickyOffset: stickyOffsets[stickyOffsets.length - 2] }) : null,
    React.createElement(
      ATableHeaderCell,
      { headerHeight, isGrabber: true, stickyOffset: stickyOffsets[stickyOffsets.length - 1] },
      React.createElement(IntlLabel, { keys: ["table", "headers", "operators"], value: void 0 })
    )
  );
};
const computeRowIndexColumnWidth = (maxRowIndex) => {
  return `calc(${CssVars.TABLE_ROW_INDEX_COLUMN_WIDTH} + ${CssVars.TABLE_ROW_INDEX_COLUMN_CHAR_WIDTH} * ${Math.max(3, `${maxRowIndex}`.length)})`;
};
const computeRowOperatorsColumnWidth = (operatorsColumnWidth, expandable, removable) => {
  if (VUtils.isNotBlank(operatorsColumnWidth)) {
    const result = VUtils.isNumber(operatorsColumnWidth);
    if (result.test) {
      if (result.value > 0) {
        return toCssSize(operatorsColumnWidth);
      }
    } else {
      return toCssSize(operatorsColumnWidth);
    }
  }
  const buttonCount = (expandable ? 1 : 0) + (removable ? 1 : 0);
  if (buttonCount > 0) {
    return `calc(${buttonCount} * ${CssVars.TABLE_BUTTON_HEIGHT} + ${buttonCount - 1} * 8px + ${CssVars.BUTTON_INDENT} * 2)`;
  } else {
    return "0px";
  }
};
const computeColumnsWidth = (props) => {
  const { rowIndexStartsFrom = 1, operatorsColumnWidth = -1, expandable = false, headers, fixedLeadColumns = 0, fixedTailColumns = 0, $wrapped: { $model }, $array: { removable = false }, $pp } = props;
  const elements = MUtils.getValue($model, $pp) || [];
  const maxRowIndex = rowIndexStartsFrom + elements.length;
  const rowIndexColumnWidth = computeRowIndexColumnWidth(maxRowIndex);
  const rowOperatorsColumnWidth = computeRowOperatorsColumnWidth(operatorsColumnWidth, expandable, removable);
  const columnsWidth = (headers || []).map(({ width }) => toCssSize(width));
  let tailGrabberAppended = false;
  if (fixedTailColumns <= 0 && columnsWidth.every((width) => !width.includes("fr"))) {
    columnsWidth.push("1fr");
    tailGrabberAppended = true;
  }
  columnsWidth.push(rowOperatorsColumnWidth);
  columnsWidth.unshift(rowIndexColumnWidth);
  const columnsCount = columnsWidth.length;
  const stickyOffsets = columnsWidth.map((width, index) => {
    if (index === 0) {
      return [true, "0", void 0];
    } else if (index === columnsCount - 1) {
      return [true, void 0, "0"];
    } else if (index <= fixedLeadColumns) {
      return [true, `calc(${columnsWidth.slice(0, index).join(" + ")})`, void 0];
    } else if (index >= columnsCount - 1 - fixedTailColumns) {
      return [true, void 0, `calc(${columnsWidth.slice(index + 1).join(" + ")})`];
    } else {
      return [false, void 0, void 0];
    }
  });
  return {
    maxRowIndex,
    rowIndexColumnWidth,
    columnsWidth,
    rowOperatorsColumnWidth,
    tailGrabberAppended,
    stickyOffsets
  };
};
const TableContent = (props) => {
  const { $pp, pageable, $wrapped, headerHeight, maxBodyHeight, children } = props;
  const { $root, $model, $p2r } = $wrapped;
  const globalHandlers = useGlobalHandlers();
  const { fire: fireWrapper } = useWrapperEventBus();
  const { on, off, fire } = useTableEventBus();
  const forceUpdate = useForceUpdate();
  reactExports.useEffect(() => {
    if (pageable == null) {
      return;
    }
    const shouldCallExternal = pageable.valueChanged != null;
    const callExternal = async (from, to) => {
      if (shouldCallExternal) {
        await pageable.valueChanged({
          root: $root,
          model: $model,
          $p2r,
          $pp,
          absolutePath: PPUtils.absolute($p2r, pageable.$pp),
          oldValue: from,
          newValue: to
        }, { global: globalHandlers });
        fireWrapper && fireWrapper(WrapperEventTypes.REPAINT);
        return true;
      } else {
        return false;
      }
    };
    const onPageChanged = async (from, to) => {
      if (!await callExternal(from, to)) {
        forceUpdate();
      }
    };
    const onFilterChanged = async () => {
      const data = MUtils.getValue($model, pageable.$pp);
      if (!await callExternal(data, data)) {
        forceUpdate();
        fire(TableEventTypes.PAGE_CHANGED_BY_FILTER, data);
      }
    };
    on(TableEventTypes.PAGE_CHANGED, onPageChanged);
    on(TableEventTypes.FILTER_CHANGED, onFilterChanged);
    return () => {
      off(TableEventTypes.PAGE_CHANGED, onPageChanged);
      off(TableEventTypes.FILTER_CHANGED, onFilterChanged);
    };
  }, [globalHandlers, fireWrapper, on, off, fire, forceUpdate, pageable, $root, $model, $p2r, $pp]);
  const { columnsWidth, tailGrabberAppended, stickyOffsets } = computeColumnsWidth(props);
  const hasPagination = pageable != null;
  const isCallExternal = (pageable == null ? void 0 : pageable.valueChanged) != null;
  const rows = (() => {
    if (!hasPagination || isCallExternal) {
      {
        return children;
      }
    }
    const data = guardPaginationData($model, pageable.$pp);
    const startIndex = (data.pageNumber - 1) * data.pageSize;
    const endIndex = startIndex + data.pageSize - 1;
    {
      return reactExports.Children.toArray(children).map((child, index) => {
        if (index >= startIndex && index <= endIndex) {
          return child;
        } else {
          return null;
        }
      }).filter((child) => child != null);
    }
  })();
  return React.createElement(
    ATableContent,
    { headerHeight, maxBodyHeight, columnsWidth },
    React.createElement(TableHeader, { headerHeight, headers: props.headers, stickyOffsets, tailGrabberAppended, "$wrapped": $wrapped }),
    rows
  );
};
const TableNoData = (props) => {
  const { headers, $array: { hasElement, noElementReminder = React.createElement(IntlLabel, { keys: ["table", "noElement"], value: "No data found." }) } } = props;
  if (hasElement) {
    return null;
  } else {
    const { tailGrabberAppended } = computeColumnsWidth(props);
    const columnsCount = headers.length + 2 + (tailGrabberAppended ? 1 : 0);
    return React.createElement(
      ATableNoDataRow,
      { columnsCount },
      React.createElement("span", null, toIntlLabel(noElementReminder))
    );
  }
};
const ExpandButton = (props) => {
  const { onClick } = props;
  const $wrapped = {
    $root: {},
    $model: {},
    $p2r: ".",
    $onValueChange: VUtils.noop,
    $avs: { $disabled: false, $visible: true }
  };
  return React.createElement(Button, { "$wrapped": $wrapped, ink: ButtonInk.PRIMARY, fill: ButtonFill.PLAIN, leads: ["$icons.expand"], click: onClick, "data-role": "d9-table-row-operator" });
};
const CollapseButton = (props) => {
  const { onClick } = props;
  const $wrapped = {
    $root: {},
    $model: {},
    $p2r: ".",
    $onValueChange: VUtils.noop,
    $avs: { $disabled: false, $visible: true }
  };
  return React.createElement(Button, { "$wrapped": $wrapped, ink: ButtonInk.PRIMARY, fill: ButtonFill.PLAIN, leads: ["$icons.collapse"], click: onClick, "data-role": "d9-table-row-operator" });
};
const RemoveButton = (props) => {
  const { onClick } = props;
  const $wrapped = {
    $root: {},
    $model: {},
    $p2r: ".",
    $onValueChange: VUtils.noop,
    $avs: { $disabled: false, $visible: true }
  };
  return React.createElement(Button, { "$wrapped": $wrapped, ink: ButtonInk.PRIMARY, fill: ButtonFill.PLAIN, leads: ["$icons.remove"], click: onClick, "data-role": "d9-table-row-operator" });
};
const CustomButton = (props) => {
  const { def, $wrapped: { $root, $array, $model, $p2r }, expandable, expanded, prebuilt: { remove, expand, collapse } } = props;
  const { prebuilt, click, ...rest } = def;
  if (!expandable && (prebuilt === "expand" || prebuilt === "collapse")) {
    return null;
  }
  if (expandable && expanded && prebuilt === "expand") {
    return null;
  }
  if (expandable && !expanded && prebuilt === "collapse") {
    return null;
  }
  const onClick = async (options, event) => {
    switch (prebuilt) {
      case "remove":
        remove();
        break;
      case "expand":
        expand();
        break;
      case "collapse":
        collapse();
        break;
      default:
        click && await click({ ...options, array: $array }, event);
        break;
    }
  };
  const operatorDef = { ...rest, $wt: rest.$wt || "Button", "data-role": "d9-table-row-operator", click: onClick };
  return React.createElement(Wrapper, { "$root": $root, "$model": $model, "$p2r": $p2r, ...operatorDef });
};
const TableRowOperators = (props) => {
  const { expandable = false, removable = false, rowIndex, rowSpan, $wrapped, omitDefaultRowOperators = false, rowOperators, initExpanded } = props;
  const { on, off, fire } = useTableEventBus();
  const [expanded, setExpanded] = reactExports.useState(() => {
    if (initExpanded) {
      return initExpanded($wrapped.$model, rowIndex);
    }
    return false;
  });
  reactExports.useEffect(() => {
    const onRowExpanded = (expandedRowIndex) => {
      if (expandedRowIndex === rowIndex) {
        setExpanded(true);
      }
    };
    const onRowCollapsed = (collapsedRowIndex) => {
      if (collapsedRowIndex === rowIndex) {
        setExpanded(false);
      }
    };
    on(TableEventTypes.ROW_EXPANDED, onRowExpanded);
    on(TableEventTypes.ROW_COLLAPSED, onRowCollapsed);
    return () => {
      off(TableEventTypes.ROW_EXPANDED, onRowExpanded);
      off(TableEventTypes.ROW_COLLAPSED, onRowCollapsed);
    };
  }, [on, off, rowIndex]);
  if (rowIndex === -1 || !removable && !expandable && (rowOperators == null || rowOperators.length === 0)) {
    return React.createElement(ATableRowOperators, { "data-expanded": false, rowIndex: 0, rowSpan });
  }
  const onRemoveElementClicked = () => fire(TableEventTypes.REMOVE_ROW, rowIndex);
  const onExpandClicked = () => {
    fire(TableEventTypes.EXPAND_ROW, rowIndex);
  };
  const onCollapseClicked = () => {
    fire(TableEventTypes.COLLAPSE_ROW, rowIndex);
  };
  const omitFold = omitDefaultRowOperators === true || omitDefaultRowOperators === "fold";
  const omitRemove = omitDefaultRowOperators === true || omitDefaultRowOperators === "remove";
  return React.createElement(
    ATableRowOperators,
    { "data-expanded": expanded, rowIndex, rowSpan },
    rowOperators == null || rowOperators.length === 0 ? null : React.createElement(React.Fragment, null, rowOperators.map((def) => {
      const key = NUtils.getDefKey(def);
      return React.createElement(CustomButton, { def, "$wrapped": $wrapped, expandable, expanded, prebuilt: {
        remove: onRemoveElementClicked,
        expand: onExpandClicked,
        collapse: onCollapseClicked
      }, key });
    })),
    !omitRemove && removable !== false ? React.createElement(RemoveButton, { onClick: onRemoveElementClicked }) : null,
    !omitFold && expandable && !expanded ? React.createElement(ExpandButton, { onClick: onExpandClicked }) : null,
    !omitFold && expandable && expanded ? React.createElement(CollapseButton, { onClick: onCollapseClicked }) : null
  );
};
const TableRow = (props) => {
  const { marker, headers, expandable = false, hideClassicCellsOnExpandable = false, clickToExpand = false, rowIndexStartsFrom = 1, omitDefaultRowOperators, rowOperators, initExpanded, $wrapped, $array: { removable, elementIndex, removeElement, getElementKey }, pageable, children } = props;
  const expandAreaRef = reactExports.useRef(null);
  const globalHandlers = useGlobalHandlers();
  const { on: onGlobal, off: offGlobal } = useGlobalEventBus();
  const { on, off, fire } = useTableEventBus();
  const [expanded, setExpanded] = reactExports.useState(() => {
    if (initExpanded) {
      return initExpanded($wrapped.$model, elementIndex);
    }
    return false;
  });
  const rowMarker = getElementKey != null ? getElementKey($wrapped.$model) : void 0;
  reactExports.useEffect(() => {
    const onCustomEvent = (_, prefix, clipped) => {
      if (clipped !== `${marker}-${rowMarker ?? elementIndex}`) {
        return;
      }
      switch (prefix) {
        case GlobalEventPrefix.EXPAND_TABLE_ROW:
          fire(TableEventTypes.EXPAND_ROW, elementIndex);
          break;
        case GlobalEventPrefix.COLLAPSE_TABLE_ROW:
          fire(TableEventTypes.COLLAPSE_ROW, elementIndex);
          break;
      }
    };
    onGlobal && onGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
    return () => {
      offGlobal && offGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
    };
  }, [onGlobal, offGlobal, fire, marker, rowMarker, elementIndex]);
  reactExports.useEffect(() => {
    const handleEvent = (func) => (rowIndex) => {
      if (rowIndex !== elementIndex) {
        return;
      }
      func();
    };
    const onExpandRow = handleEvent(() => {
      setExpanded(true);
      fire(TableEventTypes.ROW_EXPANDED, elementIndex);
    });
    const onCollapseRow = handleEvent(() => {
      setExpanded(false);
      fire(TableEventTypes.ROW_COLLAPSED, elementIndex);
    });
    const onRemoveRow = handleEvent(async () => await removeElement({ global: globalHandlers }));
    on(TableEventTypes.EXPAND_ROW, onExpandRow);
    on(TableEventTypes.COLLAPSE_ROW, onCollapseRow);
    on(TableEventTypes.REMOVE_ROW, onRemoveRow);
    return () => {
      off(TableEventTypes.EXPAND_ROW, onExpandRow);
      off(TableEventTypes.COLLAPSE_ROW, onCollapseRow);
      off(TableEventTypes.REMOVE_ROW, onRemoveRow);
    };
  }, [globalHandlers, on, off, fire, elementIndex, removeElement]);
  reactExports.useEffect(() => {
    if (expanded && expandAreaRef.current != null) {
      const contentDiv = expandAreaRef.current.closest("div[data-w=d9-table-content]");
      const { top, height } = contentDiv.getBoundingClientRect();
      const { height: headerHeight } = contentDiv.querySelector("div[data-w=d9-table-header-cell]:first-child").getBoundingClientRect();
      const { top: expandAreaTop, height: expandedAreaHeight } = expandAreaRef.current.getBoundingClientRect();
      if (top + height >= expandAreaTop + expandedAreaHeight) {
        return;
      }
      const previousDiv = expandAreaRef.current.previousSibling;
      const { top: previousTop } = previousDiv.getBoundingClientRect();
      const offset = expandAreaTop - previousTop;
      if (expandedAreaHeight + offset > height - headerHeight) {
        contentDiv.scrollTo({ top: previousDiv.offsetTop - headerHeight });
      } else {
        contentDiv.scrollTo({ top: previousDiv.offsetTop + expandedAreaHeight + offset - contentDiv.clientHeight + 1 });
      }
    }
  }, [expanded]);
  const onRowClicked = () => {
    if (expandable && clickToExpand && !expanded) {
      fire(TableEventTypes.EXPAND_ROW, elementIndex);
    }
  };
  const { tailGrabberAppended, stickyOffsets } = computeColumnsWidth(props);
  const classicCellIndexes = headers.map(({ index }) => index);
  const childrenAsArray = reactExports.Children.toArray(children);
  const classicCells = childrenAsArray.map((cell, index) => {
    if (!classicCellIndexes.includes(index)) {
      return null;
    }
    const header = headers[index];
    NUtils.getDefKey(header);
    return React.createElement(ATableBodyCell, { onClick: onRowClicked, rowIndex: elementIndex, stickyOffset: stickyOffsets[index + 1], "data-expanded": expanded, "data-click-to-expand": clickToExpand, key: header.$key }, cell);
  }).filter((x) => x != null);
  if (tailGrabberAppended) {
    classicCells.push(React.createElement(ATableBodyCell, { isGrabber: true, rowIndex: elementIndex, onClick: onRowClicked, stickyOffset: stickyOffsets[stickyOffsets.length - 2], "data-expanded": expanded, "data-click-to-expand": clickToExpand, "data-table-row-grabber": true, key: "grabber-cell" }));
  }
  const expandCells = childrenAsArray.map((cell, index) => {
    if (classicCellIndexes.includes(index)) {
      return null;
    } else {
      return cell;
    }
  });
  const expandedAreaColumnCount = classicCells.length;
  const [classic, expands, indexRowSpan, operatorsRowSpan] = (() => {
    switch (true) {
      case !expandable:
        return [React.createElement(React.Fragment, null, classicCells), null, 1, 1];
      case !expanded:
        return [
          React.createElement(React.Fragment, null, classicCells),
          React.createElement(ATableBodyCellExpandArea, { columnsCount: expandedAreaColumnCount + 1, expanded, ref: expandAreaRef }, expandCells),
          1,
          1
        ];
      case hideClassicCellsOnExpandable:
        return [
          React.createElement(ATableBodyCellExpandArea, { columnsCount: expandedAreaColumnCount, expanded, ref: expandAreaRef }, expandCells),
          null,
          1,
          1
        ];
      case !hideClassicCellsOnExpandable:
        return [
          React.createElement(React.Fragment, null, classicCells),
          React.createElement(ATableBodyCellExpandArea, { columnsCount: expandedAreaColumnCount + 1, expanded, ref: expandAreaRef }, expandCells),
          2,
          1
        ];
      default:
        return [null, null, 1, 1];
    }
  })();
  const computeRowIndexOffset = () => {
    if ((pageable == null ? void 0 : pageable.valueChanged) == null) {
      return rowIndexStartsFrom;
    } else {
      const data = guardPaginationData($wrapped.$arrayHolder, pageable.$pp);
      return (data.pageNumber - 1) * data.pageSize + 1;
    }
  };
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      ATableBodyRowIndexCell,
      { rowIndex: elementIndex, rowSpan: indexRowSpan },
      React.createElement("span", null, elementIndex + computeRowIndexOffset())
    ),
    classic,
    React.createElement(TableRowOperators, { expandable, removable, rowIndex: elementIndex, rowSpan: operatorsRowSpan, "$wrapped": $wrapped, omitDefaultRowOperators, rowOperators, initExpanded }),
    expands
  );
};
const Table = reactExports.forwardRef((props, ref) => {
  const { children, ...rest } = props;
  return React.createElement(
    TableEventBusProvider,
    null,
    React.createElement(Table$1, { ...rest, ref }, children)
  );
});
registerWidget({
  key: "Table",
  JSX: Table,
  TOP: null,
  BODY: TableContent,
  NO_ELEMENT: TableNoData,
  ELEMENT: TableRow,
  BOTTOM: TableBottomBar,
  container: true,
  array: true
});
const ABox = qe.div.attrs(({ id, [DOM_KEY_WIDGET]: dataW }) => {
  return {
    [DOM_KEY_WIDGET]: dataW || "d9-box",
    [DOM_ID_WIDGET]: id
  };
})`
    display: flex;
    position: relative;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);

    &[data-visible=false] {
        display: none;
    }
`;
const Box = reactExports.forwardRef((props, ref) => {
  const { tip, $wrapped, children, ...rest } = props;
  const { $p2r, $avs: { $disabled, $visible } } = $wrapped;
  const boxRef = reactExports.useRef(null);
  useDualRefs(boxRef, ref);
  useTip({ ref: boxRef, ...buildTip({ tip, root: $wrapped.$root, model: $wrapped.$model }) });
  return React.createElement(ABox, { ...rest, "data-disabled": $disabled, "data-visible": $visible, id: PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id), ref: boxRef }, children);
});
registerWidget({ key: "Box", JSX: Box, container: true, array: false });
const ASection = qe.div.attrs(({ id, [DOM_KEY_WIDGET]: dataW }) => {
  return {
    [DOM_KEY_WIDGET]: dataW || "d9-section",
    [DOM_ID_WIDGET]: id
  };
})`
    display: flex;
    position: relative;
    flex-direction: column;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);

    &[data-visible=false] {
        display: none;
    }
`;
const ASectionHeader = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-section-header" })`
    display: flex;
    position: relative;
    align-items: center;
    height: ${CssVars.SECTION_HEADER_HEIGHT};
    min-height: ${CssVars.SECTION_HEADER_HEIGHT};
    padding-top: ${CssVars.SECTION_HEADER_OFFSET};
    border-bottom: ${CssVars.SECTION_HEADER_BORDER};

    + div[data-w=d9-section-body] {
        padding: ${CssVars.SECTION_BODY_PADDING} 0;
    }
`;
const ASectionTitle = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-section-header-title" })`
    display: flex;
    position: relative;
    align-items: center;
    flex-grow: 1;
    font-family: ${CssVars.CAPTION_FONT_FAMILY};
    font-size: ${CssVars.SECTION_HEADER_FONT_SIZE};
    font-weight: ${CssVars.SECTION_HEADER_FONT_WEIGHT};
    color: ${CssVars.CAPTION_FONT_COLOR};
`;
const ASectionExpander = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-section-header-expander" })`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    height: calc(${CssVars.SECTION_HEADER_HEIGHT} * 0.6);
    width: calc(${CssVars.SECTION_HEADER_HEIGHT} * 0.6);
    border-radius: ${CssVars.BORDER_RADIUS};
    cursor: pointer;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &:hover {
        box-shadow: ${CssVars.PRIMARY_SHADOW};
        background-color: ${CssVars.PRIMARY_COLOR};

        > svg {
            fill: ${CssVars.INVERT_COLOR};
            opacity: 1;
        }
    }

    > svg {
        width: calc(${CssVars.SECTION_HEADER_HEIGHT} * 0.3);
        fill: ${CssVars.FONT_COLOR};
        opacity: 0.5;
        transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    }
`;
const ASectionExpanderSvg = qe(ArrowDown).attrs({ [DOM_KEY_WIDGET]: "d9-section-header-expander-svg" })`
    height: 70%;
    color: ${CssVars.FONT_COLOR};
    opacity: 0.7;
    transition: color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, transform ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-expanded=true] {
        transform: rotateX(180deg);
    }
`;
const ASectionBody = qe.div.attrs(({ expanded }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-section-body",
    style: {
      display: expanded ? void 0 : "none"
    }
  };
})`
    display: grid;
    position: relative;
    grid-template-columns: repeat(${CssVars.GRID_COLUMNS}, calc((100% - ${CssVars.GRID_COLUMN_GAP} * (${CssVars.GRID_COLUMNS} - 1)) / ${CssVars.GRID_COLUMNS}));
    grid-column-gap: ${CssVars.GRID_COLUMN_GAP};
    grid-row-gap: ${CssVars.GRID_ROW_GAP};
`;
const Section = reactExports.forwardRef((props, ref) => {
  const { $wrapped, title, collapsible, marker, children, ...rest } = props;
  const { $p2r, $avs: { $disabled, $visible } } = $wrapped;
  const { on: onGlobal, off: offGlobal } = useGlobalEventBus();
  const firstRound = reactExports.useRef(true);
  const [expanded, setExpanded] = reactExports.useState(true);
  const fireCustomEvent = useCustomGlobalEvent();
  reactExports.useEffect(() => {
    const onCustomEvent = (_, prefix, clipped) => {
      if (prefix !== GlobalEventPrefix.EXPAND_SECTION && prefix !== GlobalEventPrefix.COLLAPSE_SECTION) {
        return;
      }
      if (clipped !== marker) {
        return;
      }
      if (prefix === GlobalEventPrefix.EXPAND_SECTION) {
        setExpanded(true);
      } else {
        setExpanded(false);
      }
    };
    onGlobal && onGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
    return () => {
      offGlobal && offGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
    };
  }, [onGlobal, offGlobal, marker]);
  reactExports.useEffect(() => {
    if (firstRound.current) {
      firstRound.current = false;
      return;
    }
    const prefix = expanded ? GlobalEventPrefix.SECTION_EXPANDED : GlobalEventPrefix.SECTION_COLLAPSED;
    const key = `${prefix}:${marker ?? ""}`;
    fireCustomEvent(key, prefix, marker ?? "", { root: $wrapped.$root, model: $wrapped.$model });
  }, [onGlobal, offGlobal, fireCustomEvent, expanded, marker, $wrapped.$root, $wrapped.$model]);
  const onExpandClicked = () => {
    setExpanded(!expanded);
  };
  return React.createElement(
    ASection,
    { ...rest, "data-disabled": $disabled, "data-visible": $visible, id: PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id), ref },
    title != null ? React.createElement(
      ASectionHeader,
      null,
      React.createElement(
        ASectionTitle,
        null,
        React.createElement(LabelLike, { label: title, "$wrapped": $wrapped, "$validationScopes": props })
      ),
      collapsible ? React.createElement(
        ASectionExpander,
        { expanded, onClick: onExpandClicked },
        React.createElement(ASectionExpanderSvg, { "data-expanded": expanded })
      ) : null
    ) : null,
    React.createElement(ASectionBody, { expanded }, children)
  );
});
registerWidget({ key: "Section", JSX: Section, container: true, array: false });
const Context$1 = reactExports.createContext({});
Context$1.displayName = "TabsEventBus";
const TabsEventBusProvider = (props) => {
  const { children } = props;
  const bus = useCreateEventBus("tabs");
  return React.createElement(Context$1.Provider, { value: bus }, children);
};
const useTabsEventBus = () => reactExports.useContext(Context$1);
var TabsEventTypes;
(function(TabsEventTypes2) {
  TabsEventTypes2["FIRST_TRY_ACTIVE_TAB"] = "first-try-active-tab";
  TabsEventTypes2["TRY_ACTIVE_TAB"] = "try-active-tab";
  TabsEventTypes2["ACTIVE_TAB"] = "active-tab";
  TabsEventTypes2["REFRESH_TAB_CONTENT"] = "refresh-tab-content";
})(TabsEventTypes || (TabsEventTypes = {}));
const useTabActive = (tabIndex, marker) => {
  const { on, off } = useTabsEventBus();
  const [active, setActive] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onActiveTab = (givenTabIndex, givenMarker) => {
      if (tabIndex === givenTabIndex || marker === givenMarker) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    on(TabsEventTypes.ACTIVE_TAB, onActiveTab);
    return () => {
      off(TabsEventTypes.ACTIVE_TAB, onActiveTab);
    };
  }, [on, off, tabIndex, marker]);
  return active;
};
const useTabBodyInit = (options) => {
  const { $pp, marker, def } = options;
  const [defState, setDefState] = reactExports.useState({ initialized: false });
  reactExports.useEffect(() => {
    if (defState.initialized) {
      return;
    }
    (async () => {
      let foundDef;
      if (typeof def === "function") {
        foundDef = await def(marker);
      } else {
        foundDef = def;
      }
      if (foundDef != null && VUtils.isBlank(foundDef.$pp)) {
        foundDef.$pp = $pp;
      }
      setDefState({ initialized: true, def: foundDef });
    })();
  }, [defState.initialized, def, $pp, marker]);
  return defState;
};
const useTabContentRefresh = (tabIndex, marker) => {
  const { on, off } = useTabsEventBus();
  const forceUpdate = useForceUpdate();
  reactExports.useEffect(() => {
    const onActiveTab = (givenTabIndex, givenMarker) => {
      if (tabIndex === givenTabIndex || marker === givenMarker) {
        forceUpdate();
      }
    };
    on(TabsEventTypes.REFRESH_TAB_CONTENT, onActiveTab);
    return () => {
      off(TabsEventTypes.REFRESH_TAB_CONTENT, onActiveTab);
    };
  }, [on, off, forceUpdate, tabIndex, marker]);
};
const ATabs = qe.div.attrs(({ id }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-tabs",
    [DOM_ID_WIDGET]: id
  };
})`
    display: flex;
    position: relative;
    flex-direction: column;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);

    &[data-visible=false] {
        display: none;
    }
`;
const TabsHeader = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-tabs-header" })`
    display: flex;
    position: relative;
    flex-wrap: wrap;
    column-gap: calc(${CssVars.TAB_TITLE_PADDING} / 2);
    row-gap: calc(${CssVars.TAB_TITLE_PADDING} / 2);
    padding: calc(${CssVars.TAB_TITLE_PADDING} / 2) 0;
    border-radius: calc(${CssVars.BORDER_RADIUS} * 2);
`;
const ATabTitle = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-tab-title" })`
    display: flex;
    position: relative;
    align-items: center;
    font-family: ${CssVars.TAB_TITLE_FONT_FAMILY};
    font-size: ${CssVars.TAB_TITLE_FONT_SIZE};
    font-weight: ${CssVars.TAB_TITLE_FONT_WEIGHT};
    color: ${CssVars.CAPTION_FONT_COLOR};
    fill: ${CssVars.CAPTION_FONT_COLOR};
    border: ${CssVars.BORDER};
    border-radius: calc(${CssVars.BORDER_RADIUS} * 3);
    height: ${CssVars.TAB_TITLE_HEIGHT};
    padding: ${CssVars.TAB_TITLE_OFFSET} ${CssVars.TAB_TITLE_PADDING} 0;
    margin-top: -1px;
    margin-right: -1px;
    cursor: pointer;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-active=true] {
        background-color: ${CssVars.TAB_TITLE_ACTIVE_COLOR};
        border-color: ${CssVars.TAB_TITLE_ACTIVE_COLOR};
        color: ${CssVars.INVERT_COLOR};

        &:hover {
            background-color: ${CssVars.TAB_TITLE_ACTIVE_COLOR};
            border-color: ${CssVars.TAB_TITLE_ACTIVE_COLOR};
            box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
        }

        > span[data-w=d9-caption] {
            color: ${CssVars.INVERT_COLOR};

            > span[data-w=d9-deco-lead],
            > span[data-w=d9-deco-tail] {
                color: ${CssVars.INVERT_COLOR};
                fill: ${CssVars.INVERT_COLOR};
            }
        }
    }

    &[data-visible=false] {
        display: none;
    }

    &[data-disabled=true] {
        cursor: default;
        background-color: ${CssVars.DISABLE_COLOR};
    }

    &:hover {
        background-color: ${CssVars.HOVER_COLOR};
        border-color: ${CssVars.HOVER_COLOR};
        box-shadow: ${CssVars.HOVER_SHADOW};
    }
`;
const TabsBody = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-tabs-body" })`
    display: block;
    position: relative;
    border-top: ${CssVars.BORDER};
    padding: ${CssVars.SECTION_BODY_PADDING} 0;
    margin-top: -1px;
`;
const ATabBodyVisibility = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-tab-body-visibility" })`
    display: none;

    &[data-visible=false] + div[data-w=d9-tab-body] {
        display: none;
    }
`;
const ATabBody = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-tab-body" })`
    display: block;
    position: relative;
`;
const TabBodyVisibilityController = (props) => {
  const { tabIndex, marker } = props;
  const active = useTabActive(tabIndex, marker);
  return React.createElement(ATabBodyVisibility, { "data-visible": active });
};
const TabBodyContent = (props) => {
  const { $pp, marker, def, tabIndex, $root, $model, $p2r } = props;
  useTabContentRefresh(tabIndex, marker);
  const { initialized, def: bodyDef } = useTabBodyInit({ $pp, marker, def });
  if (!initialized) {
    return React.createElement(ATabBody, null);
  }
  return React.createElement(
    ATabBody,
    null,
    React.createElement(Wrapper, { ...bodyDef, "$root": $root, "$model": $model, "$p2r": $p2r })
  );
};
const TabBody = (props) => {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(TabBodyVisibilityController, { tabIndex: props.tabIndex, marker: props.marker }),
    React.createElement(TabBodyContent, { ...props })
  );
};
const TabTitleWorker = (props) => {
  const { $pp, title, badge, $root, $model, $p2r, tabIndex, marker, active, $defaultAttributes: attributeValues, $defaultAttributesSet: setAttributeValues, ...rest } = props;
  const { fire } = useTabsEventBus();
  useAttributesWatch({ props, attributeValues, setAttributeValues });
  const $wrapped = {
    $root,
    $model: MUtils.getValue($model, $pp),
    $p2r: PPUtils.concat($p2r, $pp),
    $avs: attributeValues,
    $onValueChange: VUtils.noop
  };
  const { $disabled, $visible } = attributeValues;
  const onTitleClicked = (event) => {
    if ($disabled) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    fire(TabsEventTypes.TRY_ACTIVE_TAB, tabIndex, marker);
  };
  return React.createElement(
    ATabTitle,
    { "data-disabled": $disabled, "data-visible": $visible, "data-active": active, ...rest, onClick: onTitleClicked },
    React.createElement(LabelLike, { "$wrapped": $wrapped, label: title, wrapByCaption: true }),
    React.createElement(LabelLike, { "$wrapped": $wrapped, label: badge })
  );
};
const TabTitle = (props) => {
  const { tabIndex, marker } = props;
  const active = useTabActive(tabIndex, marker);
  useTabContentRefresh(tabIndex, marker);
  const { initialized, $defaultAttributes, $defaultAttributesSet } = useDefaultAttributeValues(props);
  if (!initialized) {
    return null;
  }
  return React.createElement(TabTitleWorker, { ...props, active, "$defaultAttributes": $defaultAttributes, "$defaultAttributesSet": $defaultAttributesSet });
};
const redressTabMarker = (content) => {
  if (VUtils.isNotBlank(content.marker)) {
    return content.marker;
  }
  if (typeof content.title === "string") {
    content.marker = content.title;
    return content.marker;
  }
  content.marker = VUtils.generateUniqueId();
  return content.marker;
};
const findInitActiveOne = (contents, initActive) => {
  if (VUtils.isBlank(`${initActive ?? ""}`)) {
    return [(contents ?? [])[0], 0];
  }
  let found;
  if (typeof initActive === "string") {
    found = (contents ?? []).find((content) => content.marker === initActive) ?? void 0;
  } else if (typeof initActive === "number") {
    found = (contents ?? [])[initActive] ?? void 0;
  }
  if (found == null) {
    return [(contents ?? [])[0], 0];
  } else {
    return [found, (contents ?? []).indexOf(found)];
  }
};
const findActiveOne$1 = (contents, index, marker) => {
  let found = (contents ?? []).find((content) => content.marker === marker);
  if (found == null) {
    found = (contents ?? []).find((_, i) => i === index);
  }
  if (found == null) {
    return void 0;
  }
  return [found, (contents ?? []).indexOf(found)];
};
const TabsController = (props) => {
  const { $pp, $wrapped, initActive, contents } = props;
  const { on: onGlobal, off: offGlobal } = useGlobalEventBus();
  const globalHandlers = useGlobalHandlers();
  const { on, off, fire } = useTabsEventBus();
  const [activeIndex, setActiveIndex] = reactExports.useState(() => {
    const [, initActiveIndex] = findInitActiveOne(contents, initActive);
    return initActiveIndex;
  });
  const fireCustomEvent = useCustomGlobalEvent();
  reactExports.useEffect(() => {
    const activeTab = async (options) => {
      const { tabIndex, def, first } = options;
      if (def.data != null) {
        const model = MUtils.getValue($wrapped.$model, PPUtils.concat($pp, def.$pp));
        await def.data({
          root: $wrapped.$root,
          model,
          absolutePath: PPUtils.absolute($wrapped.$p2r, PPUtils.concat($pp, def.$pp)),
          propertyPath: def.$pp,
          marker: def.marker,
          firstActive: first,
          global: globalHandlers
        });
        fire(TabsEventTypes.REFRESH_TAB_CONTENT, tabIndex, def == null ? void 0 : def.marker);
      }
      setActiveIndex(tabIndex);
      fire(TabsEventTypes.ACTIVE_TAB, tabIndex, def == null ? void 0 : def.marker);
      const key = `${GlobalEventPrefix.TAB_CHANGED}:${(def == null ? void 0 : def.marker) ?? ""}`;
      fireCustomEvent(key, GlobalEventPrefix.TAB_CHANGED, (def == null ? void 0 : def.marker) ?? "", {
        root: $wrapped.$root,
        model: $wrapped.$model
      });
    };
    const createOnTabActive = (first) => async (index, marker) => {
      const activeOne = findActiveOne$1(contents, index, marker);
      if (activeOne == null) {
        return;
      }
      const [found, foundIndex] = activeOne;
      if (foundIndex === activeIndex) {
        if (first) {
          await activeTab({ tabIndex: foundIndex, def: found, first: true });
        }
      } else {
        await activeTab({ tabIndex: foundIndex, def: found, first: false });
      }
    };
    const onFirstTabActive = createOnTabActive(true);
    const onTabActive = createOnTabActive(false);
    on(TabsEventTypes.FIRST_TRY_ACTIVE_TAB, onFirstTabActive);
    on(TabsEventTypes.TRY_ACTIVE_TAB, onTabActive);
    return () => {
      off(TabsEventTypes.FIRST_TRY_ACTIVE_TAB, onFirstTabActive);
      off(TabsEventTypes.TRY_ACTIVE_TAB, onTabActive);
    };
  }, [
    on,
    off,
    fire,
    globalHandlers,
    fireCustomEvent,
    activeIndex,
    contents,
    $pp,
    $wrapped.$root,
    $wrapped.$model,
    $wrapped.$p2r
  ]);
  reactExports.useEffect(() => {
    const onCustomEvent = (_, prefix, clipped) => {
      if (prefix !== GlobalEventPrefix.TAB) {
        return;
      }
      const check = VUtils.isInteger(clipped);
      if (check.test) {
        fire(TabsEventTypes.TRY_ACTIVE_TAB, check.value, "");
      } else {
        fire(TabsEventTypes.TRY_ACTIVE_TAB, -1, (clipped ?? "").trim());
      }
    };
    onGlobal && onGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
    return () => {
      offGlobal && offGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
    };
  }, [onGlobal, offGlobal, fire]);
  reactExports.useEffect(() => {
    fire(TabsEventTypes.FIRST_TRY_ACTIVE_TAB, activeIndex, "");
  }, []);
  return React.createElement(reactExports.Fragment, null);
};
const InternalTabs = reactExports.forwardRef((props, ref) => {
  const { $pp, $wrapped, initActive, contents, ...rest } = props;
  const { $p2r, $avs: { $disabled, $visible } } = $wrapped;
  (contents ?? []).forEach((content) => redressTabMarker(content));
  return React.createElement(
    ATabs,
    { ...rest, "data-disabled": $disabled, "data-visible": $visible, id: PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id), ref },
    React.createElement(TabsHeader, null, (contents ?? []).map((content, index) => {
      const $model = MUtils.getValue($wrapped.$model, $pp);
      const { data, ...rest2 } = content;
      return React.createElement(TabTitle, { key: content.marker, "$root": $wrapped.$root, "$model": $model, "$p2r": PPUtils.concat($p2r, $pp), ...rest2, tabIndex: index, marker: content.marker });
    })),
    React.createElement(TabsBody, null, (contents ?? []).map((content, index) => {
      const $model = MUtils.getValue($wrapped.$model, $pp);
      return React.createElement(TabBody, { key: content.marker, def: content.body, "$pp": content.$pp, "$root": $wrapped.$root, "$model": $model, "$p2r": PPUtils.concat($p2r, $pp), tabIndex: index, marker: content.marker });
    })),
    React.createElement(TabsController, { "$pp": $pp, "$wrapped": $wrapped, initActive, contents })
  );
});
const Tabs = reactExports.forwardRef((props, ref) => {
  return React.createElement(
    TabsEventBusProvider,
    null,
    React.createElement(InternalTabs, { ...props, ref })
  );
});
registerWidget({ key: "Tabs", JSX: Tabs, container: false, array: false });
const Context = reactExports.createContext({});
Context.displayName = "WizardEventBus";
const WizardEventBusProvider = (props) => {
  const { children } = props;
  const bus = useCreateEventBus("wizard");
  return React.createElement(Context.Provider, { value: bus }, children);
};
const useWizardEventBus = () => reactExports.useContext(Context);
const useWizardSharedInit = (options) => {
  const { contents, shared } = options;
  const [state, setState] = reactExports.useState({ initialized: false });
  reactExports.useEffect(() => {
    if (state.initialized) {
      return;
    }
    const findSharedDef = async (def) => {
      if (def == null || def.body == null) {
        return { def: void 0, lead: void 0 };
      }
      const { $pp, body } = def;
      let foundDef;
      if (typeof body === "function") {
        foundDef = await body();
      } else {
        foundDef = body;
      }
      if (foundDef != null && VUtils.isBlank(foundDef.$pp)) {
        foundDef.$pp = $pp;
      }
      return { def: foundDef, lead: def.lead };
    };
    (async () => {
      const { def: sharedDef, lead: sharedAtLead } = await findSharedDef(shared);
      setState({ initialized: true, sharedDef, sharedAtLead });
    })();
  }, [state.initialized, contents, shared]);
  return state;
};
const redressStepMarker = (content) => {
  if (VUtils.isNotBlank(content.marker)) {
    return content.marker;
  }
  if (typeof content.title === "string") {
    content.marker = content.title;
    return content.marker;
  }
  content.marker = VUtils.generateUniqueId();
  return content.marker;
};
const findActiveOne = (contents, index, marker) => {
  let found = (contents ?? []).find((content) => content.marker === marker);
  if (found == null) {
    found = (contents ?? []).find((_, i) => i === index);
  }
  if (found == null) {
    return void 0;
  }
  return [found, (contents ?? []).indexOf(found)];
};
const AWizard = qe.div.attrs(({ id }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-wizard",
    [DOM_ID_WIDGET]: id
  };
})`
    display: flex;
    position: relative;
    flex-direction: column;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);

    &[data-visible=false] {
        display: none;
    }
`;
const WizardHeader = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-wizard-header" })`
    display: flex;
    position: relative;
    flex-wrap: wrap;
    row-gap: calc(${CssVars.WIZARD_STEP_TITLE_PADDING} / 2);
    padding: calc(${CssVars.WIZARD_STEP_TITLE_PADDING} / 2) 0;
    border-radius: calc(${CssVars.BORDER_RADIUS} * 2);

    &[data-balloon=false] {
        column-gap: calc(${CssVars.WIZARD_STEP_TITLE_PADDING} / 2);
    }
`;
const AWizardStepTitle = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-wizard-step-title" })`
    display: flex;
    position: relative;
    flex-grow: 1;
    align-items: center;
    font-family: ${CssVars.WIZARD_STEP_TITLE_FONT_FAMILY};
    font-size: ${CssVars.WIZARD_STEP_TITLE_FONT_SIZE};
    font-weight: ${CssVars.WIZARD_STEP_TITLE_FONT_WEIGHT};
    color: ${CssVars.CAPTION_FONT_COLOR};
    fill: ${CssVars.CAPTION_FONT_COLOR};
    border: ${CssVars.BORDER};
    border-radius: calc(${CssVars.BORDER_RADIUS} * 3);
    height: ${CssVars.WIZARD_STEP_TITLE_HEIGHT};
    margin-top: -1px;
    margin-right: -1px;
    cursor: pointer;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-visible=false] {
        display: none;
    }

    &[data-disabled=true] {
        cursor: default;
        background-color: ${CssVars.DISABLE_COLOR};
    }

    &[data-emphasis=true] {
        flex-grow: 4;
    }

    &[data-free-walk=false][data-done=false][data-active=false] {
        cursor: default;

        &[data-balloon=false] {
            background-color: transparent;
            border-color: ${CssVars.BORDER_COLOR};
            box-shadow: none;
        }

        &[data-balloon=true] {
            > div[data-w=d9-wizard-step-balloon] {
                > span {
                    cursor: default;

                    &:hover {
                        background-color: ${CssVars.INVERT_COLOR};
                        border-color: ${CssVars.BORDER_COLOR};
                        box-shadow: none;
                    }
                }
            }
        }
    }

    &[data-balloon=false] {
        padding: ${CssVars.WIZARD_STEP_TITLE_OFFSET} ${CssVars.WIZARD_STEP_TITLE_PADDING} 0;
        border-top-right-radius: calc(${CssVars.WIZARD_STEP_TITLE_HEIGHT} / 2);
        border-bottom-right-radius: calc(${CssVars.WIZARD_STEP_TITLE_HEIGHT} / 2);

        &[data-active=true] {
            background-color: ${CssVars.WIZARD_STEP_TITLE_ACTIVE_COLOR};
            border-color: ${CssVars.WIZARD_STEP_TITLE_ACTIVE_COLOR};
            color: ${CssVars.INVERT_COLOR};

            &:hover {
                background-color: ${CssVars.WIZARD_STEP_TITLE_ACTIVE_COLOR};
                border-color: ${CssVars.WIZARD_STEP_TITLE_ACTIVE_COLOR};
                box-shadow: ${CssVars.HOVER_SHADOW};
            }

            > span[data-w=d9-caption] {
                color: ${CssVars.INVERT_COLOR};

                > span[data-w=d9-deco-lead],
                > span[data-w=d9-deco-tail] {
                    color: ${CssVars.INVERT_COLOR};
                    fill: ${CssVars.INVERT_COLOR};
                }
            }
        }

        &[data-done=true] {
            background-color: ${CssVars.WIZARD_STEP_TITLE_DONE_COLOR};
            border-color: ${CssVars.WIZARD_STEP_TITLE_DONE_COLOR};

            &:hover {
                background-color: ${CssVars.WIZARD_STEP_TITLE_DONE_COLOR};
                border-color: ${CssVars.WIZARD_STEP_TITLE_DONE_COLOR};
                box-shadow: ${CssVars.HOVER_SHADOW};
            }
        }

        &:hover {
            background-color: ${CssVars.HOVER_COLOR};
            border-color: ${CssVars.HOVER_COLOR};
            box-shadow: ${CssVars.HOVER_SHADOW};
        }
    }

    &[data-balloon=true] {
        flex-direction: column;
        height: unset;
        background-color: transparent;
        border-color: transparent;
        padding: 0;
        cursor: default;

        &[data-active=true] {
            > div[data-w=d9-wizard-step-balloon] {
                > span {
                    border-color: ${CssVars.WIZARD_STEP_TITLE_ACTIVE_COLOR};
                    background-color: ${CssVars.WIZARD_STEP_TITLE_ACTIVE_COLOR};
                    color: ${CssVars.INVERT_COLOR};

                    &:hover {
                        box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
                    }
                }
            }
        }

        &[data-done=true] {
            > div[data-w=d9-wizard-step-balloon] {
                > span {
                    border-color: ${CssVars.WIZARD_STEP_TITLE_DONE_COLOR};
                    background-color: ${CssVars.WIZARD_STEP_TITLE_DONE_COLOR};

                    &:hover {
                        box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
                    }
                }
            }
        }

        &:hover {
            background-color: transparent;
            border-color: transparent;
            box-shadow: none;
        }
    }
`;
const AWizardStepBalloon = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-wizard-step-balloon" })`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    justify-self: stretch;

    &:before {
        content: '';
        display: block;
        position: absolute;
        height: calc(${CssVars.BORDER_WIDTH} * 2);
        width: 100%;
        top: 50%;
        left: 0;
        border-top-color: ${CssVars.BORDER_COLOR};
        border-top-style: dashed;
        border-top-width: calc(${CssVars.BORDER_WIDTH} * 2);
        z-index: 0;
    }

    > span {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        height: ${CssVars.WIZARD_STEP_BALLOON_HEIGHT};
        width: ${CssVars.WIZARD_STEP_BALLOON_HEIGHT};
        font-family: ${CssVars.WIZARD_STEP_TITLE_FONT_FAMILY};
        font-size: ${CssVars.WIZARD_STEP_TITLE_FONT_SIZE};
        font-weight: ${CssVars.WIZARD_STEP_TITLE_FONT_WEIGHT};
        color: ${CssVars.CAPTION_FONT_COLOR};
        background-color: ${CssVars.INVERT_COLOR};
        border: ${CssVars.BORDER};
        border-radius: 100%;
        cursor: pointer;
        transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

        &:hover {
            background-color: ${CssVars.HOVER_COLOR};
            border-color: ${CssVars.HOVER_COLOR};
            box-shadow: ${CssVars.HOVER_SHADOW};
        }
    }
`;
const WizardBody = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-wizard-body" })`
    display: block;
    position: relative;
    border-top: ${CssVars.BORDER};
    padding: ${CssVars.SECTION_BODY_PADDING} 0;
    margin-top: -1px;
`;
const AWizardStepBodyVisibility = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-tab-body-visibility" })`
    display: none;

    &[data-visible=false] + div[data-w=d9-wizard-step-body] {
        display: none;
    }
`;
const AWizardStepBody = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-wizard-step-body" })`
    display: grid;
    position: relative;
    grid-template-columns: repeat(${CssVars.GRID_COLUMNS}, calc((100% - ${CssVars.GRID_COLUMN_GAP} * (${CssVars.GRID_COLUMNS} - 1)) / ${CssVars.GRID_COLUMNS}));
    grid-column-gap: ${CssVars.GRID_COLUMN_GAP};
    grid-row-gap: ${CssVars.GRID_ROW_GAP};

    > div[data-w=d9-wizard-walker] {
        grid-column: span 12;
        justify-content: space-between;

        &[data-grab-all=false] {
            grid-column: 1 / span 9;

            &[data-shared-at-lead=true] {
                grid-column: 4 / span 9;
            }
        }
    }
`;
var WizardEventTypes;
(function(WizardEventTypes2) {
  WizardEventTypes2["FIRST_TRY_ACTIVE_STEP"] = "first-try-active-step";
  WizardEventTypes2["TRY_ACTIVE_STEP"] = "try-active-step";
  WizardEventTypes2["ACTIVE_STEP"] = "active-step";
  WizardEventTypes2["REFRESH_STEP_CONTENT"] = "refresh-step-content";
})(WizardEventTypes || (WizardEventTypes = {}));
const WizardController = (props) => {
  const { $pp, $wrapped, contents, reached } = props;
  const { on: onGlobal, off: offGlobal } = useGlobalEventBus();
  const globalHandlers = useGlobalHandlers();
  const { on, off, fire } = useWizardEventBus();
  const [state, setState] = reactExports.useState({ initialized: false, activeIndex: -1, reachedIndex: -1 });
  const fireCustomEvent = useCustomGlobalEvent();
  reactExports.useEffect(() => {
    const activeStep = async (options) => {
      const { stepIndex, def, first } = options;
      if (def.data != null) {
        const model = MUtils.getValue($wrapped.$model, PPUtils.concat($pp, def.$pp));
        await def.data({
          root: $wrapped.$root,
          model,
          absolutePath: PPUtils.absolute($wrapped.$p2r, PPUtils.concat($pp, def.$pp)),
          propertyPath: def.$pp,
          marker: def.marker,
          firstActive: first,
          global: globalHandlers
        });
        fire(WizardEventTypes.REFRESH_STEP_CONTENT, stepIndex, def == null ? void 0 : def.marker);
      }
      const reachedIndex = Math.max(stepIndex, state.reachedIndex);
      setState((state2) => {
        return { ...state2, activeIndex: stepIndex, reachedIndex };
      });
      fire(WizardEventTypes.ACTIVE_STEP, stepIndex, def == null ? void 0 : def.marker, reachedIndex);
      const key = `${GlobalEventPrefix.WIZARD_STEP_CHANGED}:${(def == null ? void 0 : def.marker) ?? ""}`;
      await fireCustomEvent(key, GlobalEventPrefix.WIZARD_STEP_CHANGED, (def == null ? void 0 : def.marker) ?? "", {
        root: $wrapped.$root,
        model: $wrapped.$model
      });
    };
    const createOnStepActive = (first) => async (index, marker) => {
      const activeOne = findActiveOne(contents, index, marker);
      if (activeOne == null) {
        return;
      }
      const [found, foundIndex] = activeOne;
      if (foundIndex === state.activeIndex) {
        if (first) {
          await activeStep({ stepIndex: foundIndex, def: found, first: true });
        }
      } else {
        await activeStep({ stepIndex: foundIndex, def: found, first: false });
      }
    };
    const onFirstStepActive = createOnStepActive(true);
    const onStepActive = createOnStepActive(false);
    on(WizardEventTypes.FIRST_TRY_ACTIVE_STEP, onFirstStepActive);
    on(WizardEventTypes.TRY_ACTIVE_STEP, onStepActive);
    return () => {
      off(WizardEventTypes.FIRST_TRY_ACTIVE_STEP, onFirstStepActive);
      off(WizardEventTypes.TRY_ACTIVE_STEP, onStepActive);
    };
  }, [
    on,
    off,
    fire,
    globalHandlers,
    fireCustomEvent,
    state.activeIndex,
    state.reachedIndex,
    contents,
    $pp,
    $wrapped.$root,
    $wrapped.$model,
    $wrapped.$p2r
  ]);
  reactExports.useEffect(() => {
    const onCustomEvent = (_, prefix, clipped) => {
      if (prefix !== GlobalEventPrefix.WIZARD_STEP) {
        return;
      }
      const check = VUtils.isInteger(clipped);
      if (check.test) {
        fire(WizardEventTypes.TRY_ACTIVE_STEP, check.value, "");
      } else {
        fire(WizardEventTypes.TRY_ACTIVE_STEP, -1, (clipped ?? "").trim());
      }
    };
    onGlobal && onGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
    return () => {
      offGlobal && offGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
    };
  }, [onGlobal, offGlobal, fire]);
  reactExports.useEffect(() => {
    if (state.initialized) {
      return;
    }
    const findReachedIndex = async () => {
      const find = (reached2) => {
        let foundIndex = (contents ?? []).findIndex((content) => content.marker === reached2);
        if (foundIndex === -1) {
          foundIndex = (contents ?? []).findIndex((_, index) => index == reached2);
        }
        return foundIndex === -1 ? 0 : foundIndex;
      };
      if (typeof reached === "function") {
        const reachedMarkerOrIndex = await reached();
        return find(reachedMarkerOrIndex);
      } else {
        return find(reached);
      }
    };
    (async () => {
      const reachedIndex = await findReachedIndex();
      setState({ initialized: true, activeIndex: reachedIndex, reachedIndex });
      fire(WizardEventTypes.FIRST_TRY_ACTIVE_STEP, reachedIndex, "");
    })();
  }, [fire, contents, reached, state.initialized]);
  return React.createElement(reactExports.Fragment, null);
};
const UnwrappedButtonBar = reactExports.forwardRef((props, ref) => {
  const { children, visible, ...rest } = props;
  const $onValueChange = VUtils.noop;
  const $avs = { $disabled: false, $visible: visible };
  const $root = {};
  return React.createElement(ButtonBar, { ...rest, "$nodes": [], "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, id: rest.id ?? VUtils.generateUniqueId(), ref }, children);
});
const useWizardStepActive = (stepIndex, marker) => {
  const { on, off } = useWizardEventBus();
  const [state, setState] = reactExports.useState({ active: false, done: false, reachedIndex: -1 });
  reactExports.useEffect(() => {
    const onActiveTab = (givenTabIndex, givenMarker, reachedIndex) => {
      if (stepIndex === givenTabIndex || marker === givenMarker) {
        setState({ active: true, done: false, reachedIndex });
      } else {
        setState({ active: false, done: stepIndex < givenTabIndex, reachedIndex });
      }
    };
    on(WizardEventTypes.ACTIVE_STEP, onActiveTab);
    return () => {
      off(WizardEventTypes.ACTIVE_STEP, onActiveTab);
    };
  }, [on, off, stepIndex, marker]);
  return state;
};
const useWizardStepBodyInit = (options) => {
  const { $pp, marker, def } = options;
  const [defState, setDefState] = reactExports.useState({ initialized: false });
  reactExports.useEffect(() => {
    if (defState.initialized) {
      return;
    }
    (async () => {
      let foundDef;
      if (typeof def === "function") {
        foundDef = await def(marker);
      } else {
        foundDef = def;
      }
      if (foundDef != null && VUtils.isBlank(foundDef.$pp)) {
        foundDef.$pp = $pp;
      }
      setDefState({ initialized: true, def: foundDef });
    })();
  }, [defState.initialized, def, $pp, marker]);
  return defState;
};
const useWizardStepContentRefresh = (tabIndex, marker) => {
  const { on, off } = useWizardEventBus();
  const forceUpdate = useForceUpdate();
  reactExports.useEffect(() => {
    const onActiveStep = (givenTabIndex, givenMarker) => {
      if (tabIndex === givenTabIndex || marker === givenMarker) {
        forceUpdate();
      }
    };
    on(WizardEventTypes.REFRESH_STEP_CONTENT, onActiveStep);
    return () => {
      off(WizardEventTypes.REFRESH_STEP_CONTENT, onActiveStep);
    };
  }, [on, off, forceUpdate, tabIndex, marker]);
};
const WizardStepBodyVisibilityController = (props) => {
  const { stepIndex, marker } = props;
  const { active } = useWizardStepActive(stepIndex, marker);
  return React.createElement(AWizardStepBodyVisibility, { "data-visible": active });
};
const WizardStepSharedPart = (props) => {
  const { stepIndex, marker, shared, $root, $model, $p2r } = props;
  const { active } = useWizardStepActive(stepIndex, marker);
  if (shared == null || !active) {
    return null;
  }
  return React.createElement(Wrapper, { ...shared, "$root": $root, "$model": $model, "$p2r": $p2r });
};
const computeSharedPosition = (options) => {
  const { shared, omitWalker, sharedAtLead, defs = { $pos: { $col: 1, $cols: 1 } } } = options;
  if (shared != null) {
    shared.$pos = shared.$pos ?? {};
    shared.$pos.$row = 1;
    shared.$pos.$cols = shared.$pos.$cols ?? 3;
    const $cols = shared.$pos.$cols;
    if (!omitWalker) {
      shared.$pos.$rows = 2;
    }
    defs.$pos = defs.$pos ?? {};
    defs.$pos.$cols = 12 - $cols;
    if (sharedAtLead === true) {
      shared.$pos.$col = 1;
      defs.$pos.$col = shared.$pos.$cols + 1;
    } else {
      shared.$pos.$col = defs.$pos.$cols + 1;
      defs.$pos.$col = 1;
    }
  }
};
const WizardStepBodyContent = (props) => {
  const { $pp, marker, def, $root, $model, $p2r, omitWalker = false, shared, sharedAtLead, firstStep, lastStep, previousMarker, nextMarker, stepIndex } = props;
  const { fire } = useWizardEventBus();
  useWizardStepContentRefresh(stepIndex, marker);
  const { initialized, def: bodyDef } = useWizardStepBodyInit({ $pp, marker, def });
  if (!initialized) {
    computeSharedPosition({ shared, omitWalker, sharedAtLead });
    return React.createElement(
      AWizardStepBody,
      null,
      React.createElement(WizardStepSharedPart, { stepIndex, marker, shared, "$root": $root, "$model": $model, "$p2r": $p2r })
    );
  }
  const onToPreviousClicked = async () => {
    fire(WizardEventTypes.TRY_ACTIVE_STEP, stepIndex - 1, previousMarker);
  };
  const onToNextClicked = async () => {
    fire(WizardEventTypes.TRY_ACTIVE_STEP, stepIndex + 1, nextMarker);
  };
  const defs = bodyDef;
  computeSharedPosition({ shared, omitWalker, sharedAtLead, defs });
  return React.createElement(
    AWizardStepBody,
    null,
    React.createElement(WizardStepSharedPart, { stepIndex, marker, shared, "$root": $root, "$model": $model, "$p2r": $p2r }),
    React.createElement(Wrapper, { ...defs, "$root": $root, "$model": $model, "$p2r": $p2r }),
    omitWalker ? null : React.createElement(
      UnwrappedButtonBar,
      { "data-w": "d9-wizard-walker", "data-grab-all": shared == null, "data-shared-at-lead": sharedAtLead === true },
      firstStep ? React.createElement("span", null) : React.createElement(
        UnwrappedButton,
        { onClick: onToPreviousClicked, leads: ["$icons.angleLeft"], ink: ButtonInk.WAIVE, fill: ButtonFill.FILL },
        React.createElement(IntlLabel, { keys: ["wizard", "previous"], value: "Previous" })
      ),
      lastStep ? React.createElement("span", null) : React.createElement(
        UnwrappedButton,
        { onClick: onToNextClicked, tails: ["$icons.angleRight"], ink: ButtonInk.PRIMARY, fill: ButtonFill.FILL },
        React.createElement(IntlLabel, { keys: ["wizard", "next"], value: "Next" })
      )
    )
  );
};
const WizardStepBody = (props) => {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(WizardStepBodyVisibilityController, { stepIndex: props.stepIndex, marker: props.marker }),
    React.createElement(WizardStepBodyContent, { ...props })
  );
};
const WizardStepTitleWorker = (props) => {
  const { $pp, title, $root, $model, $p2r, balloon = true, emphasisActive = true, done, active, freeWalk, reachedIndex, stepIndex, marker, $defaultAttributes: attributeValues, $defaultAttributesSet: setAttributeValues, ...rest } = props;
  const { fire } = useWizardEventBus();
  useAttributesWatch({ props, attributeValues, setAttributeValues });
  const $wrapped = {
    $root,
    $model: MUtils.getValue($model, $pp),
    $p2r: PPUtils.concat($p2r, $pp),
    $avs: attributeValues,
    $onValueChange: VUtils.noop
  };
  const { $disabled, $visible } = attributeValues;
  const onTitleClicked = (event) => {
    if ($disabled || active) {
      return;
    }
    if (!freeWalk && !done) {
      if (reachedIndex < stepIndex) {
        return;
      }
    }
    event.preventDefault();
    event.stopPropagation();
    fire(WizardEventTypes.TRY_ACTIVE_STEP, stepIndex, marker);
  };
  return React.createElement(
    AWizardStepTitle,
    { "data-disabled": $disabled, "data-visible": $visible, "data-done": done || !active && reachedIndex >= stepIndex, "data-active": active, "data-free-walk": freeWalk || reachedIndex >= stepIndex, "data-balloon": balloon, "data-emphasis": emphasisActive && active, onClick: balloon ? void 0 : onTitleClicked, ...rest },
    balloon ? React.createElement(
      AWizardStepBalloon,
      null,
      React.createElement("span", { onClick: onTitleClicked }, stepIndex + 1)
    ) : null,
    React.createElement(LabelLike, { "$wrapped": $wrapped, label: title, wrapByCaption: true })
  );
};
const WizardStepTitle = (props) => {
  const { active, done, reachedIndex } = useWizardStepActive(props.stepIndex, props.marker);
  useWizardStepContentRefresh(props.stepIndex, props.marker);
  const { initialized, $defaultAttributes, $defaultAttributesSet } = useDefaultAttributeValues(props);
  if (!initialized) {
    return null;
  }
  return React.createElement(WizardStepTitleWorker, { ...props, active, done, reachedIndex, "$defaultAttributes": $defaultAttributes, "$defaultAttributesSet": $defaultAttributesSet });
};
const InternalWizard = reactExports.forwardRef((props, ref) => {
  const { $pp, $wrapped, reached = 0, freeWalk = false, omitWalker = false, balloon = true, emphasisActive = true, contents, ...rest } = props;
  const { $p2r, $avs: { $disabled, $visible } } = $wrapped;
  const sharedState = useWizardSharedInit(props);
  (contents ?? []).forEach((content) => redressStepMarker(content));
  if (!sharedState.initialized) {
    return null;
  }
  return React.createElement(
    AWizard,
    { ...rest, "data-disabled": $disabled, "data-visible": $visible, id: PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id), ref },
    React.createElement(WizardHeader, { "data-balloon": balloon }, (contents ?? []).map((content, index) => {
      const $model = MUtils.getValue($wrapped.$model, $pp);
      return React.createElement(WizardStepTitle, { key: content.marker, "$root": $wrapped.$root, "$model": $model, "$p2r": PPUtils.concat($p2r, $pp), balloon, emphasisActive, ...content, freeWalk, stepIndex: index, marker: content.marker });
    })),
    React.createElement(WizardBody, null, (contents ?? []).map((content, index, all) => {
      const $model = MUtils.getValue($wrapped.$model, $pp);
      return React.createElement(WizardStepBody, { key: content.marker, def: content.body, "$pp": content.$pp, "$root": $wrapped.$root, "$model": $model, "$p2r": PPUtils.concat($p2r, $pp), omitWalker, shared: sharedState.sharedDef, sharedAtLead: sharedState.sharedAtLead, firstStep: index === 0, lastStep: index === all.length - 1, previousMarker: index !== 0 ? all[index - 1].marker : void 0, nextMarker: index !== all.length - 1 ? all[index + 1].marker : void 0, stepIndex: index, marker: content.marker });
    })),
    React.createElement(WizardController, { "$pp": $pp, "$wrapped": $wrapped, contents, reached })
  );
});
const Wizard = reactExports.forwardRef((props, ref) => {
  return React.createElement(
    WizardEventBusProvider,
    null,
    React.createElement(InternalWizard, { ...props, ref })
  );
});
registerWidget({ key: "Wizard", JSX: Wizard, container: false, array: false });
const ATextarea = qe.textarea.attrs(({ id, autoSelect, onFocus }) => {
  if (!autoSelect) {
    return {
      [DOM_KEY_WIDGET]: "d9-textarea",
      [DOM_ID_WIDGET]: id
    };
  }
  return {
    [DOM_KEY_WIDGET]: "d9-textarea",
    [DOM_ID_WIDGET]: id,
    onFocus: (event) => {
      event.target.select();
      onFocus && onFocus(event);
    }
  };
})`
    display: block;
    position: relative;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    color: ${CssVars.FONT_COLOR};
    height: calc(${CssVars.INPUT_HEIGHT} * 5);
    padding: calc((${CssVars.INPUT_HEIGHT} - ${CssVars.LINE_HEIGHT}) / 2 - ${CssVars.BORDER_WIDTH}) ${CssVars.INPUT_INDENT};
    background-color: transparent;
    border: ${CssVars.BORDER};
    border-radius: ${CssVars.BORDER_RADIUS};
    outline: none;
    overflow: auto;
    line-height: ${CssVars.LINE_HEIGHT};
    resize: none;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-visible=false] {
        display: none;
    }

    &[data-disabled=true] {
        background-color: ${CssVars.DISABLE_COLOR};

        &:hover, &:focus {
            border-color: ${CssVars.BORDER_COLOR};
            box-shadow: none;
        }
    }

    &:hover {
        border-color: ${CssVars.PRIMARY_COLOR};
        box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
    }

    &:focus {
        border-color: ${CssVars.PRIMARY_COLOR};
        box-shadow: ${CssVars.PRIMARY_SHADOW};
    }
`;
const Textarea = reactExports.forwardRef((props, ref) => {
  const { autoSelect = true, tip, $pp, $wrapped: { $onValueChange, $root, $model, $p2r, $avs: { $disabled, $visible } }, ...rest } = props;
  const globalHandlers = useGlobalHandlers();
  const textRef = reactExports.useRef(null);
  useDualRefs(textRef, ref);
  useTip({ ref: textRef, ...buildTip({ tip, root: $root, model: $model }) });
  const onChange = async (event) => {
    const value = event.target.value;
    await $onValueChange(value, true, { global: globalHandlers });
  };
  return React.createElement(ATextarea, { ...rest, autoSelect, disabled: $disabled, "data-disabled": $disabled, "data-visible": $visible, value: MUtils.getValue($model, $pp) ?? "", onChange, id: PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id), ref: textRef });
});
registerWidget({ key: "Textarea", JSX: Textarea, container: false, array: false });
const UnwrappedTree = reactExports.forwardRef((props, ref) => {
  const { $pp = "value", data, visible, ...rest } = props;
  const $onValueChange = VUtils.noop;
  const $avs = { $disabled: false, $visible: visible };
  const $root = { [$pp]: data };
  return React.createElement(Tree, { ...rest, "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, "$pp": $pp, id: rest.id ?? VUtils.generateUniqueId(), ref });
});
const PopupTree$1 = qe(UnwrappedTree)`
    border: 0;
`;
const InternalDropdownTree = reactExports.forwardRef((props, ref) => {
  const { options, optionSort, noAvailable, noMatched, $pp, $wrapped: { $onValueChange, $root, $model, $p2r, $avs: { $disabled, $visible } }, please = "", clearable = true, couldSelect, tip, ...rest } = props;
  const globalHandlers = useGlobalHandlers();
  const { fire } = useDropdownTreeEventBus();
  const [filterChanged] = reactExports.useState(() => async (filter2, timing) => {
    if (timing === "search") {
      fire(DropdownTreeEventTypes.FILTER_CHANGED, filter2);
    }
  });
  const { askOptions, filterInputRef, filter, onFilterChanged, containerRef, popupState, popupRef, popupShown, setPopupShown, afterPopupStateChanged, onClicked, onFocused, onKeyUp, onAnyInputEvent } = useFilterableDropdownOptions({ ...props, takeoverFilter: false, filterChanged });
  useDualRefs(containerRef, ref);
  useTip({ ref: containerRef, ...buildTip({ tip, root: $root, model: $model }) });
  const forceUpdate = useForceUpdate();
  const onClearClicked = async (event) => {
    if ($disabled) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const value2 = MUtils.getValue($model, $pp);
    if (value2 != null) {
      await $onValueChange(null, true, { global: globalHandlers });
    }
    if (!isDropdownPopupActive(popupState.active)) {
      onClicked();
    } else {
      forceUpdate();
    }
  };
  const value = MUtils.getValue($model, $pp);
  const selected = value != null;
  const allOptions = askOptions();
  const popupHeight = computeDropdownTreePopupHeight(allOptions, filter);
  const treeHeight = DropdownDefaults.DEFAULTS.FIX_FILTER && VUtils.isNotBlank(filter) ? `calc(${toCssSize(popupHeight)} - ${CssVars.INPUT_HEIGHT} - 2px)` : `calc(${toCssSize(popupHeight)} - 2px)`;
  const label = (() => {
    if (value == null) {
      return please || "";
    }
    const findOption = (option) => {
      if (option.value == value) {
        return option;
      } else if (option.children == null || option.children.length === 0) {
        return void 0;
      } else {
        for (const child of option.children) {
          const found = findOption(child);
          if (found != null) {
            return found;
          }
        }
        return void 0;
      }
    };
    for (const option of allOptions) {
      const found = findOption(option);
      if (found != null) {
        return found.label ?? (please || "");
      }
    }
    return please || "";
  })();
  const deviceTags = MBUtils.pickDeviceTags(props);
  const treeModel = {};
  const onNodeClicked = async (node) => {
    if ($disabled) {
      return;
    }
    const option = node.value;
    if ([NO_MATCHED_OPTION_ITEM, NO_AVAILABLE_OPTION_ITEM].includes(`${option.value}`)) {
      return;
    }
    if (couldSelect != null && !couldSelect(option)) {
      return;
    }
    await $onValueChange(option.value, true, { global: globalHandlers });
    setPopupShown(false);
    if (filter !== "") {
      afterPopupStateChanged.afterPopupHide();
    }
    setTimeout(() => {
      var _a;
      return (_a = containerRef.current) == null ? void 0 : _a.focus();
    }, 30);
  };
  const detective = (parentNode) => {
    if (parentNode.value === treeModel) {
      return allOptions.map((option, index) => {
        return {
          value: option,
          $ip2r: `pp${index}`,
          $ip2p: `pp${index}`,
          label: option.label,
          ...option.stringify != null ? { stringify: () => option.stringify(option) } : {},
          checkable: false,
          addable: false,
          removable: false,
          click: onNodeClicked
        };
      });
    } else {
      return (parentNode.value.children ?? []).map((option, index) => {
        return {
          value: option,
          $ip2r: PPUtils.concat(parentNode.$ip2r, `pp${index}`),
          $ip2p: `pp${index}`,
          label: option.label,
          ...option.stringify != null ? { stringify: () => option.stringify(option) } : {},
          checkable: false,
          addable: false,
          removable: false,
          click: onNodeClicked
        };
      });
    }
  };
  return React.createElement(
    DropdownContainer,
    { active: popupState.active, atBottom: popupState.atBottom, role: "input", tabIndex: 0, ...rest, "data-w": "d9-dropdown-tree", "data-disabled": $disabled, "data-visible": $visible, "data-clearable": clearable, onFocus: onFocused, onClick: onClicked, onKeyDown: onAnyInputEvent, id: PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id), ref: containerRef },
    React.createElement(DropdownLabel, { "data-please": !selected }, toIntlLabel(label)),
    React.createElement(DropdownStick, { valueAssigned: selected, clearable, clear: onClearClicked, disabled: $disabled }),
    isDropdownPopupActive(popupState.active) ? React.createElement(
      DropdownPopup,
      { ...{ ...popupState, minHeight: popupHeight }, shown: popupShown && popupState.active === DropdownPopupStateActive.ACTIVE, ...deviceTags, vScroll: true, ref: popupRef },
      React.createElement(
        OptionFilter,
        { ...{ ...popupState, active: !!filter }, "data-w": "d9-dropdown-tree-option-filter" },
        React.createElement("span", null, "?:"),
        React.createElement(
          "span",
          null,
          React.createElement(Search, null)
        ),
        React.createElement("input", { value: filter, onChange: onFilterChanged, onKeyUp, ref: filterInputRef })
      ),
      React.createElement(
        PopupTree$1,
        { data: treeModel, initExpandLevel: 0, disableSearchBox: true, detective, height: treeHeight },
        React.createElement(DropdownTreeFilterBridge, null)
      )
    ) : null
  );
});
const DropdownTree = reactExports.forwardRef((props, ref) => {
  return React.createElement(
    DropdownTreeEventBusProvider,
    null,
    React.createElement(InternalDropdownTree, { ...props, ref })
  );
});
registerWidget({ key: "DropdownTree", JSX: DropdownTree, container: false, array: false });
registerWidget({ key: "DDT", JSX: DropdownTree, container: false, array: false });
const MultiDropdownTreeContainer = qe(DropdownContainer)`
    align-self: start;
    flex-wrap: wrap;
    height: unset;
    min-height: ${CssVars.INPUT_HEIGHT};
    padding-right: calc(${CssVars.INPUT_HEIGHT} - ${CssVars.INPUT_INDENT} + 4px);
`;
const MultiDropdownTreeLabel = qe(DropdownLabel)`
    flex-grow: unset;
    border: ${CssVars.BORDER};
    border-radius: ${CssVars.BORDER_RADIUS};
    color: ${CssVars.FONT_COLOR};
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    height: unset;
    min-height: calc(${CssVars.INPUT_HEIGHT} - 6px);
    padding: 0 calc(${CssVars.INPUT_INDENT} / 2);
    margin: 2px 8px 2px -4px;
    white-space: normal;

    > span:first-child {
        display: flex;
        position: relative;
        flex-grow: 1;
        align-items: center;
    }

    > span:last-child {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        height: calc(${CssVars.INPUT_HEIGHT} * 3 / 4);
        width: calc(${CssVars.INPUT_HEIGHT} * 3 / 4);
        opacity: 0.2;
        transition: opacity ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

        > svg {
            height: calc(${CssVars.INPUT_HEIGHT} * 2 / 5);
            fill: ${CssVars.DANGER_COLOR};
        }
    }

    &:hover {
        > span:last-child {
            opacity: 0.6;

            &:hover {
                opacity: 1;
            }
        }
    }
`;
const MultiDropdownTreeStick = qe(DropdownStick)`
    position: absolute;
    right: ${CssVars.INPUT_INDENT};
`;
const PopupTree = qe(UnwrappedTree)`
    border: 0;
`;
const InternalMultiDropdownTree = reactExports.forwardRef((props, ref) => {
  const { options, optionSort, noAvailable, noMatched, $pp, $wrapped: { $onValueChange, $root, $model, $p2r, $avs: { $disabled, $visible } }, please = "", clearable = true, couldSelect, tip, ...rest } = props;
  const globalHandlers = useGlobalHandlers();
  const { fire } = useDropdownTreeEventBus();
  const [filterChanged] = reactExports.useState(() => async (filter2, timing) => {
    if (timing === "search") {
      fire(DropdownTreeEventTypes.FILTER_CHANGED, filter2);
    }
  });
  const { askOptions, filterInputRef, filter, onFilterChanged, containerRef, popupState, popupRef, popupShown, repaintPopup, onClicked, onFocused, onKeyUp, onAnyInputEvent } = useFilterableDropdownOptions({ ...props, takeoverFilter: false, filterChanged });
  const forceUpdate = useForceUpdate();
  useDualRefs(containerRef, ref);
  useTip({ ref: containerRef, ...buildTip({ tip, root: $root, model: $model }) });
  const currentValuesToArray = () => {
    const values2 = MUtils.getValue($model, $pp);
    if (values2 == null) {
      return [];
    } else if (VUtils.isPrimitive(values2)) {
      return [values2];
    } else {
      return values2;
    }
  };
  const hasValues = (values2) => {
    if (values2 == null) {
      return false;
    } else if (typeof values2 === "string") {
      return VUtils.isNotEmpty(values2);
    } else if (Array.isArray(values2)) {
      return values2.length !== 0;
    }
    return true;
  };
  const hasValue = (value, values2) => {
    if (value == null) {
      return true;
    } else if (values2 == null) {
      return false;
    } else {
      return values2.some((v) => v == value);
    }
  };
  const onRemoveClicked = (value) => async (event) => {
    if ($disabled) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const values2 = currentValuesToArray();
    if (!hasValues(values2)) {
      return;
    }
    await $onValueChange(values2.filter((v) => v != value), true, { global: globalHandlers });
    repaintPopup();
  };
  const onClearClicked = async (event) => {
    if ($disabled) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const values2 = currentValuesToArray();
    if (values2 != null && values2.length !== 0) {
      await $onValueChange(null, true, { global: globalHandlers });
    }
    forceUpdate();
    if (!isDropdownPopupActive(popupState.active)) {
      setTimeout(() => onClicked(), 100);
    } else {
      setTimeout(() => repaintPopup(), 100);
    }
  };
  const values = currentValuesToArray();
  const selected = values != null && values.length !== 0;
  const allOptions = askOptions();
  const popupHeight = computeDropdownTreePopupHeight(allOptions, filter);
  const treeHeight = DropdownDefaults.DEFAULTS.FIX_FILTER && VUtils.isNotBlank(filter) ? `calc(${toCssSize(popupHeight)} - ${CssVars.INPUT_HEIGHT} - 2px)` : `calc(${toCssSize(popupHeight)} - 2px)`;
  const optionsAsMap = (() => {
    const map = {};
    const toMap = (option) => {
      map[`${option.value}`] = option;
      (option.children ?? []).forEach(toMap);
    };
    allOptions.forEach(toMap);
    return map;
  })();
  const deviceTags = MBUtils.pickDeviceTags(props);
  const treeModel = {};
  const detective = (parentNode) => {
    let nodes;
    if (parentNode.value === treeModel) {
      nodes = allOptions.map((option, index) => {
        return {
          value: option,
          $ip2r: `pp${index}`,
          $ip2p: `pp${index}`,
          label: option.label,
          ...option.stringify != null ? { stringify: () => option.stringify(option) } : {},
          checkable: true,
          addable: false,
          removable: false
        };
      });
    } else {
      nodes = (parentNode.value.children ?? []).map((option, index) => {
        return {
          value: option,
          $ip2r: PPUtils.concat(parentNode.$ip2r, `pp${index}`),
          $ip2p: `pp${index}`,
          label: option.label,
          ...option.stringify != null ? { stringify: () => option.stringify(option) } : {},
          checkable: true,
          addable: false,
          removable: false
        };
      });
    }
    return nodes.map((node) => {
      const option = node.value;
      if (couldSelect != null && !couldSelect(option)) {
        node.checkable = false;
      } else {
        node.checked = () => {
          const values2 = currentValuesToArray();
          return hasValue(option.value, values2);
        };
        node.check = async (_, checked) => {
          const value = node.value.value;
          const values2 = currentValuesToArray();
          if (checked) {
            if (!hasValues(values2)) {
              await $onValueChange([value], true, { global: globalHandlers });
            } else {
              await $onValueChange([...values2, value], true, { global: globalHandlers });
            }
          } else {
            await $onValueChange(values2.filter((v) => v != value), true, { global: globalHandlers });
          }
          repaintPopup();
          setTimeout(() => {
            var _a;
            return (_a = containerRef.current) == null ? void 0 : _a.focus();
          }, 30);
        };
      }
      return node;
    });
  };
  return React.createElement(
    MultiDropdownTreeContainer,
    { active: popupState.active, atBottom: popupState.atBottom, role: "input", tabIndex: 0, ...rest, "data-w": "d9-multi-dropdown-tree", "data-disabled": $disabled, "data-visible": $visible, "data-clearable": clearable, onFocus: onFocused, onClick: onClicked, onKeyDown: onAnyInputEvent, id: PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id), ref: containerRef },
    values.map((value) => {
      var _a;
      const v = `${value}`;
      return React.createElement(
        MultiDropdownTreeLabel,
        { "data-please": false, key: v },
        React.createElement("span", null, toIntlLabel((_a = optionsAsMap[v]) == null ? void 0 : _a.label)),
        $disabled ? null : React.createElement(
          "span",
          { onClick: onRemoveClicked(value) },
          React.createElement(Times, null)
        )
      );
    }),
    React.createElement(DropdownLabel, { "data-please": true }, toIntlLabel(please)),
    React.createElement(MultiDropdownTreeStick, { valueAssigned: selected, clearable, clear: onClearClicked, disabled: $disabled }),
    isDropdownPopupActive(popupState.active) ? React.createElement(
      DropdownPopup,
      { ...{ ...popupState, minHeight: popupHeight }, shown: popupShown && popupState.active === DropdownPopupStateActive.ACTIVE, ...deviceTags, vScroll: true, ref: popupRef },
      React.createElement(
        OptionFilter,
        { ...{ ...popupState, active: !!filter }, "data-w": "d9-multi-dropdown-tree-option-filter" },
        React.createElement("span", null, "?:"),
        React.createElement(
          "span",
          null,
          React.createElement(Search, null)
        ),
        React.createElement("input", { value: filter, onChange: onFilterChanged, onKeyUp, ref: filterInputRef })
      ),
      React.createElement(
        PopupTree,
        { data: treeModel, initExpandLevel: 0, disableSearchBox: true, detective, height: treeHeight },
        React.createElement(DropdownTreeFilterBridge, null)
      )
    ) : null
  );
});
const MultiDropdownTree = reactExports.forwardRef((props, ref) => {
  return React.createElement(
    DropdownTreeEventBusProvider,
    null,
    React.createElement(InternalMultiDropdownTree, { ...props, ref })
  );
});
registerWidget({ key: "MultiDropdownTree", JSX: MultiDropdownTree, container: false, array: false });
registerWidget({ key: "MDDT", JSX: MultiDropdownTree, container: false, array: false });
const UnwrappedCalendar = reactExports.forwardRef((props, ref) => {
  const { $pp = "value", value, onValueChange, disabled, visible, ...rest } = props;
  const $onValueChange = onValueChange;
  const $avs = { $disabled: disabled, $visible: visible };
  const $root = { [$pp]: value };
  return React.createElement(Calendar, { ...rest, "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, "$pp": $pp, id: rest.id ?? VUtils.generateUniqueId(), ref });
});
reactExports.forwardRef((props, ref) => {
  return React.createElement(UnwrappedCalendar, { ...props, time: false, ref });
});
reactExports.forwardRef((props, ref) => {
  return React.createElement(UnwrappedCalendar, { ...props, time: true, ref });
});
const UnwrappedCaption = reactExports.forwardRef((props, ref) => {
  const { children, disabled, visible, ...rest } = props;
  const $onValueChange = VUtils.noop;
  const $avs = { $disabled: disabled, $visible: visible };
  const $root = {};
  return React.createElement(Caption, { ...rest, "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, label: children, id: rest.id ?? VUtils.generateUniqueId(), ref });
});
reactExports.forwardRef((props, ref) => {
  const { children, disabled, visible, ...rest } = props;
  const $onValueChange = VUtils.noop;
  const $avs = { $disabled: disabled, $visible: visible };
  const $root = {};
  return React.createElement(Label, { ...rest, "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, label: children, id: rest.id ?? VUtils.generateUniqueId(), ref });
});
reactExports.forwardRef((props, ref) => {
  const { children, disabled, visible, ...rest } = props;
  const $onValueChange = VUtils.noop;
  const $avs = { $disabled: disabled, $visible: visible };
  const $root = {};
  return React.createElement(Badge, { ...rest, "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, label: children, id: rest.id ?? VUtils.generateUniqueId(), ref });
});
const ACheckboxes = qe.div.attrs(({ id }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-checkboxes",
    [DOM_ID_WIDGET]: id
  };
})`
    display: flex;
    position: relative;
    flex-wrap: wrap;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    color: ${CssVars.FONT_COLOR};
`;
const Option$1 = qe.span.attrs(({ columns, compact, [DOM_KEY_WIDGET]: dataW }) => {
  return {
    [DOM_KEY_WIDGET]: dataW ?? "d9-checkboxes-option",
    style: {
      flexBasis: columns > 0 && !compact ? `${1 / columns * 100}%` : void 0
    }
  };
})`
    display: flex;
    position: relative;
    align-items: center;
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    min-height: ${CssVars.INPUT_HEIGHT};
    padding: calc(${CssVars.INPUT_HEIGHT} / 8) ${CssVars.INPUT_INDENT};
    margin-left: calc(${CssVars.INPUT_INDENT} * -1);
    margin-right: ${CssVars.INPUT_INDENT};
    border-radius: ${CssVars.BORDER_RADIUS};
    //overflow: hidden;
    //white-space: nowrap;
    //text-overflow: ellipsis;
    cursor: pointer;

    &[data-can-click=false] {
        cursor: default;
    }

    &[data-can-click=true]:hover {
        background-color: ${CssVars.HOVER_COLOR};

        > div[data-w=d9-checkbox] {
            fill: ${CssVars.PRIMARY_COLOR};

            &:before {
                border-color: ${CssVars.PRIMARY_COLOR};
                box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
            }
        }
    }

    > div[data-w=d9-checkbox] {
        display: flex;
        align-items: center;
        min-width: ${CssVars.INPUT_HEIGHT};
        height: calc(${CssVars.INPUT_HEIGHT} / 4 * 3);
        padding: 0;

        > svg {
            margin-top: 0;
        }
    }

    > span {
        display: flex;
        position: relative;
        align-items: center;
        //height: 100%;
        //overflow: hidden;
        //white-space: nowrap;
        //text-overflow: ellipsis;
    }
`;
const Separator$1 = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-checkboxes-option-separator" })`
    display: block;
    position: relative;
    height: 0;
    flex-basis: 100%;
`;
const Checkboxes = reactExports.forwardRef((props, ref) => {
  const { options, optionSort, noAvailable = React.createElement(IntlLabel, { keys: ["options", "noAvailable"], value: "No available options." }), columns = -1, compact = true, single = false, boolOnSingle = false, tip, $pp, $wrapped: { $onValueChange, $root, $model, $avs: { $disabled, $visible } }, ...rest } = props;
  const globalHandlers = useGlobalHandlers();
  const checksRef = reactExports.useRef(null);
  useDualRefs(checksRef, ref);
  useTip({ ref: checksRef, ...buildTip({ tip, root: $root, model: $model }) });
  const { createAskDisplayOptions } = useOptionItems({ ...props, noAvailable });
  const getValues = () => {
    const modelValues = MUtils.getValue($model, $pp);
    return modelValues == null ? [] : Array.isArray(modelValues) ? modelValues : [modelValues];
  };
  const onOptionClicked = (option) => async () => {
    if ($disabled) {
      return;
    }
    const values2 = getValues();
    if (values2.some((v) => v == option.value)) {
      if (single) {
        await $onValueChange(boolOnSingle ? false : void 0, true, { global: globalHandlers });
      } else {
        await $onValueChange(values2.filter((v) => v != option.value), true, { global: globalHandlers });
      }
    } else {
      if (single) {
        await $onValueChange(option.value, true, { global: globalHandlers });
      } else {
        await $onValueChange([...values2, option.value], true, { global: globalHandlers });
      }
    }
  };
  const askDisplayOptions = createAskDisplayOptions();
  const displayOptions = askDisplayOptions();
  const canClick = !$disabled;
  const values = getValues();
  if (displayOptions.length === 0 || displayOptions.length === 1 && displayOptions[0].value == NO_AVAILABLE_OPTION_ITEM) {
    return React.createElement(
      ACheckboxes,
      { "data-disabled": $disabled, "data-visible": $visible, ...rest },
      React.createElement(Option$1, { "data-can-click": false, columns: 0, compact: true, "data-w": "d9-checkboxes-no-available" }, toIntlLabel(noAvailable))
    );
  }
  return React.createElement(ACheckboxes, { "data-disabled": $disabled, "data-visible": $visible, ...rest, ref: checksRef }, displayOptions.map((option, index) => {
    const { value, label } = option;
    const valueKey = `${value}_${index + 1}`;
    const model = { [valueKey]: values.some((v) => v == value) };
    const onValueChange = async (newValue) => {
      if (newValue === true) {
        if (values.some((v) => v == value))
          ;
        else {
          if (single) {
            await $onValueChange(option.value, true, { global: globalHandlers });
          } else {
            await $onValueChange([...values, value], true, { global: globalHandlers });
          }
        }
      } else {
        if (single) {
          await $onValueChange(boolOnSingle ? false : void 0, true, { global: globalHandlers });
        } else {
          await $onValueChange(values.filter((v) => v != value), true, { global: globalHandlers });
        }
      }
    };
    const $wrapped = {
      $root: model,
      $model: model,
      $p2r: ".",
      $onValueChange: onValueChange,
      $avs: { $disabled, $visible: true }
    };
    const node = React.createElement(
      Option$1,
      { "data-can-click": canClick, columns, compact, "data-checked": model[valueKey], onClick: canClick ? onOptionClicked(option) : void 0 },
      React.createElement(Checkbox, { "$pp": valueKey, "$wrapped": $wrapped }),
      React.createElement("span", null, toIntlLabel(label))
    );
    if (columns >= 1 && compact && (index + 1) % columns === 0) {
      return React.createElement(
        reactExports.Fragment,
        { key: valueKey },
        node,
        React.createElement(Separator$1, null)
      );
    } else {
      return React.createElement(reactExports.Fragment, { key: valueKey }, node);
    }
  }));
});
registerWidget({ key: "Checkboxes", JSX: Checkboxes, container: false, array: false });
registerWidget({ key: "Checks", JSX: Checkboxes, container: false, array: false });
const UnwrappedCheckboxes = reactExports.forwardRef((props, ref) => {
  const { $pp = "value", value, onValueChange, disabled, visible, ...rest } = props;
  const $onValueChange = onValueChange;
  const $avs = { $disabled: disabled, $visible: visible };
  const $root = { [$pp]: value };
  return React.createElement(Checkboxes, { ...rest, "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, "$pp": $pp, id: rest.id ?? VUtils.generateUniqueId(), ref });
});
const UnwrappedInput = reactExports.forwardRef((props, ref) => {
  const { $pp = "value", value, onValueChange, disabled, visible, ...rest } = props;
  const $onValueChange = onValueChange;
  const $avs = { $disabled: disabled, $visible: visible };
  const $root = { [$pp]: value };
  return React.createElement(Input, { ...rest, "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, "$pp": $pp, id: rest.id ?? VUtils.generateUniqueId(), ref });
});
reactExports.forwardRef((props, ref) => {
  const { $pp = "value", value, onValueChange, disabled, visible, ...rest } = props;
  const $onValueChange = onValueChange;
  const $avs = { $disabled: disabled, $visible: visible };
  const $root = { [$pp]: value };
  return React.createElement(NumberInput, { ...rest, "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, "$pp": $pp, id: rest.id ?? VUtils.generateUniqueId(), ref });
});
reactExports.forwardRef((props, ref) => {
  const { $pp = "value", value, onValueChange, disabled, visible, ...rest } = props;
  const $onValueChange = onValueChange;
  const $avs = { $disabled: disabled, $visible: visible };
  const $root = { [$pp]: value };
  return React.createElement(PasswordInput, { ...rest, "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, "$pp": $pp, id: rest.id ?? VUtils.generateUniqueId(), ref });
});
reactExports.forwardRef((props, ref) => {
  const { $pp = "value", value, onValueChange, disabled, visible, ...rest } = props;
  const $onValueChange = onValueChange;
  const $avs = { $disabled: disabled, $visible: visible };
  const $root = { [$pp]: value };
  return React.createElement(MultiDropdown, { ...rest, "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, "$pp": $pp, id: rest.id ?? VUtils.generateUniqueId(), ref });
});
reactExports.forwardRef((props, ref) => {
  const { $pp = "value", value, onValueChange, visible, ...rest } = props;
  const $onValueChange = (value2) => {
    onValueChange(value2);
  };
  const $avs = { $disabled: false, $visible: visible };
  const $root = { [$pp]: value };
  return React.createElement(Pagination, { ...rest, "$pp": $pp, "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, id: rest.id ?? VUtils.generateUniqueId(), ref });
});
reactExports.forwardRef((props, ref) => {
  const { $pp = "value", value, onValueChange, disabled, visible, ...rest } = props;
  const $onValueChange = onValueChange;
  const $avs = { $disabled: disabled, $visible: visible };
  const $root = { [$pp]: value };
  return React.createElement(Radio, { ...rest, "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, "$pp": $pp, id: rest.id ?? VUtils.generateUniqueId(), ref });
});
const ARadios = qe.div.attrs(({ id }) => {
  return {
    [DOM_KEY_WIDGET]: "d9-radios",
    [DOM_ID_WIDGET]: id
  };
})`
    display: flex;
    position: relative;
    flex-wrap: wrap;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    color: ${CssVars.FONT_COLOR};
`;
const Option = qe.span.attrs(({ columns, compact, [DOM_KEY_WIDGET]: dataW }) => {
  return {
    [DOM_KEY_WIDGET]: dataW ?? "d9-radios-option",
    style: {
      flexBasis: columns > 0 && !compact ? `${1 / columns * 100}%` : void 0
    }
  };
})`
    display: flex;
    position: relative;
    align-items: center;
    font-family: ${CssVars.FONT_FAMILY};
    font-size: ${CssVars.FONT_SIZE};
    min-height: ${CssVars.INPUT_HEIGHT};
    padding: calc(${CssVars.INPUT_HEIGHT} / 8) ${CssVars.INPUT_INDENT};
    margin-left: calc(${CssVars.INPUT_INDENT} * -1);
    margin-right: ${CssVars.INPUT_INDENT};
    border-radius: ${CssVars.BORDER_RADIUS};
    //overflow: hidden;
    //white-space: nowrap;
    //text-overflow: ellipsis;
    cursor: pointer;

    &[data-can-click=false] {
        cursor: default;
    }

    &[data-can-click=true]:hover {
        background-color: ${CssVars.HOVER_COLOR};

        > div[data-w=d9-radio] {
            &:before {
                border-color: ${CssVars.PRIMARY_COLOR};
                box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
            }

            &:after {
                background-color: ${CssVars.PRIMARY_COLOR};
            }
        }
    }

    > div[data-w=d9-radio] {
        border-top-left-radius: ${CssVars.BORDER_RADIUS};
        border-bottom-left-radius: ${CssVars.BORDER_RADIUS};
        display: flex;
        align-items: center;
        min-width: ${CssVars.INPUT_HEIGHT};
        height: calc(${CssVars.INPUT_HEIGHT} / 4 * 3);
        padding: 0;

        &:after {
            margin-top: 0;
        }
    }

    > span {
        display: flex;
        position: relative;
        align-items: center;
        //height: 100%;
        //overflow: hidden;
        //white-space: nowrap;
        //text-overflow: ellipsis;
    }
`;
const Separator = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-radios-option-separator" })`
    display: block;
    position: relative;
    height: 0;
    flex-basis: 100%;
`;
const Radios = reactExports.forwardRef((props, ref) => {
  const { options, optionSort, noAvailable = React.createElement(IntlLabel, { keys: ["options", "noAvailable"], value: "No available options." }), columns = -1, compact = true, tip, $pp, $wrapped: { $onValueChange, $root, $model, $avs: { $disabled, $visible } }, ...rest } = props;
  const globalHandlers = useGlobalHandlers();
  const radiosRef = reactExports.useRef(null);
  useDualRefs(radiosRef, ref);
  useTip({ ref: radiosRef, ...buildTip({ tip, root: $root, model: $model }) });
  const { createAskDisplayOptions } = useOptionItems({ ...props, noAvailable });
  const onOptionClicked = (option) => async () => {
    if ($disabled) {
      return;
    }
    await $onValueChange(option.value, true, { global: globalHandlers });
  };
  const askDisplayOptions = createAskDisplayOptions();
  const displayOptions = askDisplayOptions();
  const canClick = !$disabled;
  if (displayOptions.length === 0 || displayOptions.length === 1 && displayOptions[0].value == NO_AVAILABLE_OPTION_ITEM) {
    return React.createElement(
      ARadios,
      { "data-disabled": $disabled, "data-visible": $visible, ...rest },
      React.createElement(Option, { "data-can-click": false, columns: 0, compact: true, "data-w": "d9-radios-no-available" }, toIntlLabel(noAvailable))
    );
  }
  const modelValue = MUtils.getValue($model, $pp);
  return React.createElement(ARadios, { "data-disabled": $disabled, "data-visible": $visible, ...rest, ref: radiosRef }, displayOptions.map((option, index) => {
    const { value, label } = option;
    const valueKey = `${value}_${index + 1}`;
    const model = { [valueKey]: modelValue == value };
    const onValueChange = async () => {
      await $onValueChange(value, true, { global: globalHandlers });
    };
    const $wrapped = {
      $root: model,
      $model: model,
      $p2r: ".",
      $onValueChange: onValueChange,
      $avs: { $disabled, $visible: true }
    };
    const node = React.createElement(
      Option,
      { "data-can-click": canClick, columns, compact, "data-checked": model[valueKey], onClick: canClick ? onOptionClicked(option) : void 0 },
      React.createElement(Radio, { "$pp": valueKey, "$wrapped": $wrapped }),
      React.createElement("span", null, toIntlLabel(label))
    );
    if (columns >= 1 && compact && (index + 1) % columns === 0) {
      return React.createElement(
        reactExports.Fragment,
        { key: valueKey },
        node,
        React.createElement(Separator, null)
      );
    } else {
      return React.createElement(reactExports.Fragment, { key: valueKey }, node);
    }
  }));
});
registerWidget({ key: "Radios", JSX: Radios, container: false, array: false });
reactExports.forwardRef((props, ref) => {
  const { $pp = "value", value, onValueChange, disabled, visible, ...rest } = props;
  const $onValueChange = onValueChange;
  const $avs = { $disabled: disabled, $visible: visible };
  const $root = { [$pp]: value };
  return React.createElement(Radios, { ...rest, "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, "$pp": $pp, id: rest.id ?? VUtils.generateUniqueId(), ref });
});
const UnwrappedSection = reactExports.forwardRef((props, ref) => {
  const { title, children, visible, ...rest } = props;
  const $onValueChange = VUtils.noop;
  const $avs = { $disabled: false, $visible: visible };
  const $root = {};
  return React.createElement(Section, { ...rest, title, "$nodes": [], "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, id: rest.id ?? VUtils.generateUniqueId(), ref }, children);
});
reactExports.forwardRef((props, ref) => {
  const { $pp = "value", value, title, visible, ...rest } = props;
  const $onValueChange = VUtils.noop;
  const $avs = { $disabled: false, $visible: visible };
  const $root = { [$pp]: value };
  return React.createElement(Tabs, { ...rest, title, "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, "$pp": $pp, id: rest.id ?? VUtils.generateUniqueId(), ref });
});
const UnwrappedTextarea = reactExports.forwardRef((props, ref) => {
  const { $pp = "value", value, onValueChange, disabled, visible, ...rest } = props;
  const $onValueChange = onValueChange;
  const $avs = { $disabled: disabled, $visible: visible };
  const $root = { [$pp]: value };
  return React.createElement(Textarea, { ...rest, "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, "$pp": $pp, id: rest.id ?? VUtils.generateUniqueId(), ref });
});
reactExports.forwardRef((props, ref) => {
  const { $pp = "value", value, title, visible, ...rest } = props;
  const $onValueChange = VUtils.noop;
  const $avs = { $disabled: false, $visible: visible };
  const $root = { [$pp]: value };
  return React.createElement(Wizard, { ...rest, title, "$wrapped": { $onValueChange, $avs, $root, $model: $root, $p2r: "." }, "$pp": $pp, id: rest.id ?? VUtils.generateUniqueId(), ref });
});
export {
  $d9n2 as $,
  utils$1 as A,
  ButtonInk as B,
  CssVars as C,
  DOM_KEY_WIDGET as D,
  UnwrappedButtonBar as E,
  ButtonBarAlignment as F,
  GlobalEventTypes as G,
  UnwrappedSection as H,
  IntlLabel as I,
  LabelLike as L,
  OptionItemSort as O,
  REACTION_REFRESH_OPTIONS as R,
  TreeNodeCheckedChangeFrom as T,
  UnwrappedButton as U,
  DOM_ID_WIDGET as a,
  useGlobalHandlers as b,
  GlobalEventPrefix as c,
  utils$2 as d,
  ButtonFill as e,
  CssConstants as f,
  UnwrappedCheckbox as g,
  UnwrappedDropdown as h,
  index$2 as i,
  UnwrappedInput as j,
  UnwrappedCaption as k,
  UnwrappedTextarea as l,
  UnwrappedDecorateInput as m,
  UnwrappedCheckboxes as n,
  index$1 as o,
  useAlert as p,
  useDialog as q,
  DialogHeader as r,
  DialogTitle as s,
  toIntlLabel as t,
  useGlobalEventBus as u,
  DialogBody as v,
  DialogFooter as w,
  GlobalRoot as x,
  utils$3 as y,
  DropdownUtils as z
};
