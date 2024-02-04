import { r as reactExports, R as React, j as jsxRuntimeExports } from "./react-2UUL7v68.js";
import { V as VUtils, r as registerWidget, f as useCreateEventBus, M as MUtils, P as PPUtils, u as useThrottler, d as useForceUpdate, e as Wrapper, S as StandaloneRoot } from "./rainbow-d9-n1-jTcDTd2r.js";
import { C as CssVars, D as DOM_KEY_WIDGET, a as DOM_ID_WIDGET, d as utils$1, $ as $d9n2, u as useGlobalEventBus, b as useGlobalHandlers, G as GlobalEventTypes, U as UnwrappedButton, B as ButtonInk, e as ButtonFill, I as IntlLabel, L as LabelLike, i as index$2, c as GlobalEventPrefix, f as useAlert, g as useDialog, h as DialogHeader, j as DialogTitle, k as DialogBody, l as DialogFooter, m as GlobalRoot } from "./rainbow-d9-n2-xBIHUtXP.js";
import { a as color, n as nanoid } from "./vendor-bTA5rkJY.js";
import { q as qe } from "./styled-components-5-wX-M_G.js";
import { i as index$1, p as parseDoc } from "./rainbow-d9-n3-oFgPum1O.js";
var PlanElementType;
(function(PlanElementType2) {
  PlanElementType2["CATEGORY"] = "PolicyElementCategory";
  PlanElementType2["COVERAGE"] = "PolicyCoverage";
  PlanElementType2["BENEFIT"] = "PolicyBenefit";
  PlanElementType2["LIMIT_DEDUCTIBLE"] = "PolicyLimitDeductible";
})(PlanElementType || (PlanElementType = {}));
var PlanElementValueEditType;
(function(PlanElementValueEditType2) {
  PlanElementValueEditType2["FIXED"] = "fixed";
  PlanElementValueEditType2["OPTIONS"] = "options";
  PlanElementValueEditType2["NUMBER"] = "number";
})(PlanElementValueEditType || (PlanElementValueEditType = {}));
var PlanSelectionGlobalEventPrefix;
(function(PlanSelectionGlobalEventPrefix2) {
  PlanSelectionGlobalEventPrefix2["RELOAD_DEFS"] = "plan-selection-reload-defs";
})(PlanSelectionGlobalEventPrefix || (PlanSelectionGlobalEventPrefix = {}));
const PlanSelectionCssVars = {
  BACKGROUND_COLOR: `var(--d9-plan-selection-background-color, ${CssVars.BACKGROUND_COLOR})`,
  HEADER_TITLE_PADDING: "var(--d9-plan-selection-header-title-padding, 16px 0)",
  HEADER_TITLE_FONT_SIZE: "var(--d9-plan-selection-header-title-font-size, 2em)",
  HEADER_TITLE_FONT_WEIGHT: `var(--d9-plan-selection-header-title-font-weight, ${CssVars.FONT_BOLD})`,
  HEADER_TITLE_COLOR: `var(--d9-plan-selection-header-title-color, ${CssVars.INVERT_COLOR})`,
  HEADER_ODD_BACKGROUND_COLOR: `var(--d9-plan-selection-header-odd-background-color, rgb(56,74,90))`,
  HEADER_EVEN_BACKGROUND_COLOR: `var(--d9-plan-selection-header-even-background-color, rgb(96,126,154))`,
  HEADER_SUB_TITLE_PADDING: "var(--d9-plan-selection-header-sub-title-padding, 12px 0 4px)",
  PREMIUM_FONT_SIZE: "var(--d9-plan-selection-premium-font-size, 18px)",
  PREMIUM_FONT_WEIGHT: `var(--d9-plan-selection-premium-font-weight, ${CssVars.FONT_BOLD})`,
  PREMIUM_COLOR: "var(--d9-plan-selection-premium-color, rgb(202,92,84))",
  PREMIUM_DESCRIPTION_FONT_SIZE: "var(--d9-plan-selection-premium-desc-font-size, 16px)",
  PREMIUM_DESCRIPTION_FONT_WEIGHT: `var(--d9-plan-selection-premium-desc-font-weight, ${CssVars.FONT_BOLD})`,
  PREMIUM_DESCRIPTION_COLOR: "var(--d9-plan-selection-premium-desc-color, rgb(146,183,140))",
  ODD_BACKGROUND_COLOR: `var(--d9-plan-selection-odd-background-color, rgb(245,245,245))`,
  EVEN_BACKGROUND_COLOR: `var(--d9-plan-selection-even-background-color, ${CssVars.INVERT_COLOR})`,
  ELEMENT_MIN_HEIGHT: `var(--d9-plan-selection-element-min-height, 40px)`,
  ELEMENT_INDENT: `var(--d9-plan-selection-element-indent, 16px)`,
  ELEMENT_PADDING: `var(--d9-plan-selection-element-padding, 4px 12px)`,
  ELEMENT_VALUE_GAP: `var(--d9-plan-selection-element-value-gap, 4px)`,
  ELEMENT_VALUE_LABEL_COLOR: `var(--d9-plan-selection-element-value-label-color, #888)`,
  ELEMENT_VALUE_COLOR: `var(--d9-plan-selection-element-value-color, rgb(118, 187, 175))`,
  ELEMENT_VALUE_UNIT_GAP: `var(--d9-plan-selection-element-value-unit-gap, 12px)`,
  ELEMENT_OPTIONS_VALUE_MIN_WIDTH: `var(--d9-plan-selection-element-options-value-min-width, 60px)`,
  ELEMENT_UNIT_FONT_FAMILY: `var(--d9-plan-selection-element-unit-font-family, ${CssVars.FONT_FAMILY})`,
  ELEMENT_UNIT_FONT_SIZE: `var(--d9-plan-selection-element-unit-font-size, ${CssVars.FONT_SIZE})`,
  ELEMENT_UNIT_LABEL_COLOR: `var(--d9-plan-selection-element-unit-label-color, #888)`,
  FOOTER_OPERATOR_PADDING: "var(--d9-plan-selection-footer-operator-padding, 16px 0)",
  FOOTER_OPERATOR_FONT_SIZE: "var(--d9-plan-selection-footer-operator-font-size, 16px)",
  FOOTER_OPERATOR_FONT_WEIGHT: `var(--d9-plan-selection-footer-operator-font-weight, ${CssVars.FONT_BOLD})`,
  FOOTER_OPERATOR_COLOR: `var(--d9-plan-selection-footer-operator-color, ${CssVars.INVERT_COLOR})`,
  FOOTER_OPERATOR_BACKGROUND_COLOR: `var(--d9-plan-selection-footer-operator-background-color, rgb(241,156,56))`,
  FOOTER_OPERATOR_SHADOW: `var(--d9-plan-selection-footer-operator-background-shadow, 0 0 0 3px ${color("rgb(241,156,56)").alpha(0.4)})`,
  FOOTER_OPERATOR_HOVER_SHADOW: `var(--d9-plan-selection-footer-operator-background-hover-shadow, 0 0 0 3px ${color("rgb(241,156,56)").alpha(0.2)})`
};
const APlanSelection = qe.div.attrs(({ id, "data-w": dataW, columnCount, computedColumnWidth, computedLineHeaderWidth, maxHeight }) => {
  return {
    [DOM_KEY_WIDGET]: dataW || "d9-plan-selection",
    [DOM_ID_WIDGET]: id,
    "data-v-scroll": "",
    "data-h-scroll": "",
    style: {
      "--grid-template-columns": `${utils$1.toCssSize(computedLineHeaderWidth)} repeat(${columnCount}, ${utils$1.toCssSize(computedColumnWidth)})`,
      "--max-height": utils$1.toCssSize(maxHeight)
    }
  };
})`
    display: grid;
    position: relative;
    grid-template-columns: var(--grid-template-columns);
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    max-height: var(--max-height);
    background-color: ${PlanSelectionCssVars.BACKGROUND_COLOR};
    overflow: auto;

    &[data-visible=false] {
        display: none;
    }
`;
const PlanSelectionTopLeftCorner = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-plan-selection-top-left-corner" })`
    display: flex;
    position: sticky;
    flex-direction: column;
    top: 0;
    left: 0;
    justify-content: flex-end;
    border-bottom: ${CssVars.BORDER};
    background-color: ${PlanSelectionCssVars.BACKGROUND_COLOR};
    z-index: 3;
`;
const PlanSelectionPagination = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-plan-selection-pagination" })`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: flex-end;

    > span {
        display: flex;
        position: relative;
        column-gap: 0.5em;
        font-family: ${CssVars.FONT_FAMILY};
        font-size: ${CssVars.FONT_SIZE};
        color: ${CssVars.FONT_COLOR};

        &:last-child {
            margin-right: 12px;
        }
    }
`;
const APlanHeader = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-plan-selection-header" })`
    display: flex;
    position: sticky;
    flex-direction: column;
    top: 0;
    border-bottom: ${CssVars.BORDER};
    background-color: ${PlanSelectionCssVars.BACKGROUND_COLOR};
    z-index: 2;

    > div[data-w=d9-plan-selection-header-title] {
        background-color: ${PlanSelectionCssVars.HEADER_EVEN_BACKGROUND_COLOR};
    }

    > div[data-w=d9-plan-selection-header-sub-title] {
        background-color: ${PlanSelectionCssVars.EVEN_BACKGROUND_COLOR};
    }

    &[data-odd=true] {
        > div[data-w=d9-plan-selection-header-title] {
            background-color: ${PlanSelectionCssVars.HEADER_ODD_BACKGROUND_COLOR};
        }

        > div[data-w=d9-plan-selection-header-sub-title] {
            background-color: ${PlanSelectionCssVars.ODD_BACKGROUND_COLOR};
        }
    }
`;
const PlanHeaderTitle = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-plan-selection-header-title" })`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    padding: ${PlanSelectionCssVars.HEADER_TITLE_PADDING};

    > span[data-w=d9-caption] {
        font-size: ${PlanSelectionCssVars.HEADER_TITLE_FONT_SIZE};
        font-weight: ${PlanSelectionCssVars.HEADER_TITLE_FONT_WEIGHT};
        color: ${PlanSelectionCssVars.HEADER_TITLE_COLOR};
        height: unset;
        min-height: ${CssVars.INPUT_HEIGHT};
    }
`;
const PlanHeaderSubTitle = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-plan-selection-header-sub-title" })`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${PlanSelectionCssVars.HEADER_SUB_TITLE_PADDING};

    > span[data-w=d9-caption] {
        height: unset;
        min-height: ${CssVars.INPUT_HEIGHT};

        &[data-plan-premium=true] {
            font-size: ${PlanSelectionCssVars.PREMIUM_FONT_SIZE};
            font-weight: ${PlanSelectionCssVars.PREMIUM_FONT_WEIGHT};
            color: ${PlanSelectionCssVars.PREMIUM_COLOR};

            > span[data-w=d9-deco-lead], > span[data-w=d9-deco-tail] {
                font-size: ${PlanSelectionCssVars.PREMIUM_FONT_SIZE};
                color: ${PlanSelectionCssVars.PREMIUM_COLOR};
                fill: ${PlanSelectionCssVars.PREMIUM_COLOR};
            }
        }

        &[data-plan-premium-desc=true] {
            font-size: ${PlanSelectionCssVars.PREMIUM_DESCRIPTION_FONT_SIZE};
            font-weight: ${PlanSelectionCssVars.PREMIUM_DESCRIPTION_FONT_WEIGHT};
            color: ${PlanSelectionCssVars.PREMIUM_DESCRIPTION_COLOR};
            margin-top: -4px;

            > span[data-w=d9-deco-lead], > span[data-w=d9-deco-tail] {
                font-size: ${PlanSelectionCssVars.PREMIUM_DESCRIPTION_FONT_SIZE};
                color: ${PlanSelectionCssVars.PREMIUM_DESCRIPTION_COLOR};
                fill: ${PlanSelectionCssVars.PREMIUM_DESCRIPTION_COLOR};
            }
        }
    }
`;
const PlanElementColumnHeader = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-plan-selection-element-header" })`
    display: flex;
    position: sticky;
    left: 0;
    align-items: center;
    min-height: ${PlanSelectionCssVars.ELEMENT_MIN_HEIGHT};
    border-bottom: ${CssVars.BORDER};
    background-color: ${PlanSelectionCssVars.BACKGROUND_COLOR};
    z-index: 1;
`;
const PlanElementColumnHeaderTitle = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-plan-selection-element-header-title" })`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: flex-start;

    > span[data-w=d9-caption] {
        min-height: ${CssVars.INPUT_HEIGHT};

        &[data-plan-element-level="0"] {
            margin-left: ${PlanSelectionCssVars.ELEMENT_INDENT};
            font-weight: ${CssVars.FONT_BOLD};
        }

        &[data-plan-element-level="1"] {
            margin-left: calc(${PlanSelectionCssVars.ELEMENT_INDENT} * 2);
        }

        &[data-plan-element-level="2"] {
            margin-left: calc(${PlanSelectionCssVars.ELEMENT_INDENT} * 3);
        }

        &[data-plan-element-level="3"] {
            margin-left: calc(${PlanSelectionCssVars.ELEMENT_INDENT} * 4);
        }
    }
`;
const PlanElementCell = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-plan-selection-element-cell" })`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: ${PlanSelectionCssVars.ELEMENT_VALUE_GAP};
    border-bottom: ${CssVars.BORDER};
    background-color: ${PlanSelectionCssVars.EVEN_BACKGROUND_COLOR};
    padding: ${PlanSelectionCssVars.ELEMENT_PADDING};

    &[data-odd=true] {
        background-color: ${PlanSelectionCssVars.ODD_BACKGROUND_COLOR};
    }

    &[data-element-lack=true] { /** element no available for this plan */
        justify-content: center;

        > svg[data-icon=times] {
            height: calc(${CssVars.INPUT_HEIGHT} / 5 * 2);
            width: calc(${CssVars.INPUT_HEIGHT} / 5 * 2);
            fill: ${CssVars.DANGER_COLOR};
        }
    }

    &[data-element-cateogry=true] { /** category element */
        justify-content: center;

        > svg[data-icon=check] {
            height: calc(${CssVars.INPUT_HEIGHT} / 5 * 3);
            width: calc(${CssVars.INPUT_HEIGHT} / 5 * 3);
            fill: ${CssVars.SUCCESS_COLOR};
        }
    }

    > div[data-w=d9-checkbox] { /** no values available for this element */
        padding: calc((${CssVars.INPUT_HEIGHT}) / 6);
        border-color: transparent;
        margin: auto;

        &[data-element-pinned=true] { /** element is pinned */
            fill: ${CssVars.SUCCESS_COLOR};

            &[disabled], &[data-disabled=true] {
                &:before {
                    display: none;
                }
            }
        }

        &[data-element-pinned=false] { /** element is not pinned */

            &[data-checked=true] { /** use success color */
                fill: ${CssVars.SUCCESS_COLOR};

                &:hover:before {
                    box-shadow: ${CssVars.SUCCESS_HOVER_SHADOW};
                }

                &:focus-within:before {
                    box-shadow: ${CssVars.SUCCESS_HOVER_SHADOW};
                }

                &:hover,
                &:focus-within {
                    fill: ${CssVars.SUCCESS_COLOR};

                    &:before {
                        border-color: ${CssVars.SUCCESS_COLOR};
                    }
                }

                &:before {
                    border-color: ${CssVars.SUCCESS_COLOR};
                }
            }

            &[data-checked=false] { /** use danger color */
                fill: ${CssVars.DANGER_COLOR};

                &:hover:before {
                    box-shadow: ${CssVars.DANGER_HOVER_SHADOW};
                }

                &:focus-within:before {
                    box-shadow: ${CssVars.DANGER_HOVER_SHADOW};
                }

                &:hover,
                &:focus-within {
                    fill: ${CssVars.DANGER_COLOR};

                    &:before {
                        border-color: ${CssVars.DANGER_COLOR};
                    }
                }

                &:before {
                    border-color: ${CssVars.DANGER_COLOR};
                }
            }
        }
    }

    > div[data-w=d9-form-cell] {
        display: grid;
        grid-template-columns: 35% 65%;
        width: 100%;

        > span[data-r=d9-fc-caption] { /** value label */
            grid-row: 1;
            grid-column: 1;
            font-size: ${CssVars.FONT_SIZE};
            font-weight: unset;
            color: ${PlanSelectionCssVars.ELEMENT_VALUE_LABEL_COLOR};
            white-space: normal;
            overflow: unset;
        }

        > div[data-w=d9-box] { /** value editor or renderer */
            grid-row: 1;
            grid-column: 2;

            > div[data-w=d9-dropdown][data-plan-element-options-value=true],
            > div[data-w=d9-dropdown][data-plan-element-number-value=true],
            > input[data-w=d9-input][data-plan-element-number-value=true] {
                width: unset;
                min-width: ${PlanSelectionCssVars.ELEMENT_OPTIONS_VALUE_MIN_WIDTH};
            }

            > div[data-w=d9-dropdown][data-plan-element-options-value=true] > span[data-w=d9-dropdown-label],
            > div[data-w=d9-dropdown][data-plan-element-number-value=true] > span[data-w=d9-dropdown-label],
            > input[data-w=d9-input][data-plan-element-number-value=true],
            > span[data-w=d9-caption][data-plan-element-fix-value=true] {
                color: ${PlanSelectionCssVars.ELEMENT_VALUE_COLOR};
            }
        }

        > div[data-w=d9-form-cell-invalid-msg] { /** invalid message */
            grid-column: 2;

            &:empty {
                display: none;
            }
        }
    }
`;
const PlanElementUnitLabel = qe.span.attrs({ [DOM_KEY_WIDGET]: "d9-plan-selection-element-unit" })`
    display: flex;
    position: relative;
    align-items: center;
    height: ${CssVars.INPUT_HEIGHT};
    font-family: ${PlanSelectionCssVars.ELEMENT_UNIT_FONT_FAMILY};
    font-size: ${PlanSelectionCssVars.ELEMENT_UNIT_FONT_SIZE};
    color: ${PlanSelectionCssVars.ELEMENT_UNIT_LABEL_COLOR};

    &:not(:empty) { /** fixed value with unit */
        margin-left: ${PlanSelectionCssVars.ELEMENT_VALUE_UNIT_GAP};
    }
`;
const PlanSelectionBottomLeftCorner = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-plan-selection-bottom-left-corner" })`
    display: block;
    position: sticky;
    bottom: 0;
    left: 0;
    border-top: ${CssVars.BORDER};
    border-bottom: ${CssVars.BORDER};
    margin-top: calc(${CssVars.BORDER_WIDTH} * -1);
    background-color: ${PlanSelectionCssVars.BACKGROUND_COLOR};
    z-index: 3;
`;
const PlanFooter = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-plan-selection-footer" })`
    display: flex;
    position: sticky;
    bottom: 0;
    flex-direction: column;
    border-top: ${CssVars.BORDER};
    border-bottom: ${CssVars.BORDER};
    margin-top: calc(${CssVars.BORDER_WIDTH} * -1);
    z-index: 2;

    > div[data-w=d9-plan-selection-footer-operator] {
        background-color: ${PlanSelectionCssVars.EVEN_BACKGROUND_COLOR};
    }

    &[data-odd=true] {
        > div[data-w=d9-plan-selection-footer-operator] {
            background-color: ${PlanSelectionCssVars.ODD_BACKGROUND_COLOR};
        }
    }
`;
const PlanFooterOperator = qe.div.attrs({ [DOM_KEY_WIDGET]: "d9-plan-selection-footer-operator" })`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    padding: ${PlanSelectionCssVars.FOOTER_OPERATOR_PADDING};

    > button[data-w=d9-button] {
        font-size: ${PlanSelectionCssVars.FOOTER_OPERATOR_FONT_SIZE};
        font-weight: ${PlanSelectionCssVars.FOOTER_OPERATOR_FONT_WEIGHT};
        height: unset;
        min-height: ${CssVars.INPUT_HEIGHT};

        &[data-ink=primary][data-plan-buy=true] {
            color: ${PlanSelectionCssVars.FOOTER_OPERATOR_COLOR};
            border-color: ${PlanSelectionCssVars.FOOTER_OPERATOR_BACKGROUND_COLOR};
            background-color: ${PlanSelectionCssVars.FOOTER_OPERATOR_BACKGROUND_COLOR};

            &:hover {
                box-shadow: ${PlanSelectionCssVars.FOOTER_OPERATOR_HOVER_SHADOW};
            }

            &:focus, &:active {
                box-shadow: ${PlanSelectionCssVars.FOOTER_OPERATOR_SHADOW};
            }

            > span[data-w=d9-deco-lead] {
                > svg[data-icon=cart] {
                    height: calc(${CssVars.FONT_SIZE} * 0.8);
                    margin-top: 2px;
                }
            }
        }
    }
`;
var PlanSelectionEventTypes;
(function(PlanSelectionEventTypes2) {
  PlanSelectionEventTypes2["ELEMENT_VALUE_CHANGED"] = "element-value-changed";
  PlanSelectionEventTypes2["PREMIUM_CALCULATED"] = "premium-calculated";
  PlanSelectionEventTypes2["SWITCH_PAGE"] = "switch-page";
})(PlanSelectionEventTypes || (PlanSelectionEventTypes = {}));
const Context = reactExports.createContext({});
Context.displayName = "PlanSelectionEventBus";
const PlanSelectionEventBusProvider = (props) => {
  const { children } = props;
  const bus = useCreateEventBus("plan-selection");
  return React.createElement(Context.Provider, { value: bus }, children);
};
const usePlanSelectionEventBus = () => reactExports.useContext(Context);
const redressPlanMarker = (content) => {
  if (VUtils.isNotBlank(content.marker)) {
    return content.marker;
  }
  return VUtils.generateUniqueId();
};
const isCategoryPlanElementDef = (def) => {
  return def.type === PlanElementType.CATEGORY;
};
const isElementOptionsValueDef = (def) => {
  return def.editType == PlanElementValueEditType.OPTIONS;
};
const isElementNumberValueDef = (def) => {
  return def.editType == PlanElementValueEditType.NUMBER;
};
const computeColumnWidth = (columns, columnWidth, lineHeaderWidth) => {
  if (VUtils.isNotBlank(columnWidth)) {
    if (VUtils.isNotBlank(lineHeaderWidth)) {
      return [columnWidth, lineHeaderWidth];
    } else {
      return [columnWidth, `calc(100% - (${utils$1.toCssSize(columnWidth)} * ${columns}))`];
    }
  } else if (VUtils.isNotBlank(lineHeaderWidth)) {
    return [`calc((100% - ${utils$1.toCssSize(lineHeaderWidth)}) / ${columns})`, lineHeaderWidth];
  } else if (columns <= 0) {
    return ["minmax(20%, 1fr)", "minmax(40%, 1.5fr)"];
  } else {
    switch (columns) {
      case 1:
        return ["40%", "60%"];
      case 2:
        return ["30%", "40%"];
      case 3:
        return ["20%", "40%"];
      case 4:
        return ["15%", "40%"];
      default:
        return ["1fr", "3fr"];
    }
  }
};
const findSelectedPlan = (plans2, code) => {
  let found = plans2[code];
  if (found == null) {
    found = { code, selected: false, elements: {} };
    plans2[code] = found;
  }
  return found;
};
const createPlanModelProxy = (plan, def) => {
  return new Proxy(plan, {
    get: (target, prop) => {
      if (prop === "$def") {
        return def;
      } else if (prop === "$revoke") {
        return () => plan;
      }
      return target[prop];
    }
  });
};
const guardPlanTitle = (options) => {
  const { def, planDef, elementValueChanged } = options;
  return def != null ? def(planDef, elementValueChanged) : [{ $wt: "Caption", text: planDef.name }];
};
const guardPlanSubTitle = (options) => {
  const { def, currencySymbol, premiumDescription, planDef, elementValueChanged } = options;
  return def != null ? def(planDef, elementValueChanged, currencySymbol, premiumDescription) : [
    elementValueChanged ? {
      $wt: "Caption",
      "data-plan-premium": true,
      text: "???",
      leads: [currencySymbol].filter((x) => VUtils.isNotBlank(x))
    } : {
      $wt: "Label",
      $pp: "premium.due",
      "data-plan-premium": true,
      valueToLabel: (value, formats) => {
        try {
          return value == null ? "" : formats.nf0(value);
        } catch (e) {
          console.error(e);
          return value == null ? "" : value;
        }
      },
      leads: [currencySymbol].filter((x) => VUtils.isNotBlank(x))
    },
    {
      $wt: "Caption",
      "data-plan-premium-desc": true,
      text: premiumDescription
    }
  ];
};
const guardElementTitle = (options) => {
  const { def, orderedDef, elementLevel } = options;
  const { def: elementDef } = orderedDef;
  const domElementAttr = {};
  switch (elementDef.type) {
    case PlanElementType.CATEGORY:
      domElementAttr["data-plan-element-category"] = true;
      break;
    case PlanElementType.COVERAGE:
      domElementAttr["data-plan-element-coverage"] = true;
      break;
    case PlanElementType.BENEFIT:
      domElementAttr["data-plan-element-benefit"] = true;
      break;
    case PlanElementType.LIMIT_DEDUCTIBLE:
      domElementAttr["data-plan-element-limit-deductible"] = true;
      break;
    default:
      domElementAttr["data-plan-element-unknown"] = true;
      break;
  }
  return def != null ? def(elementDef, elementLevel) : [{
    $wt: "Caption",
    text: elementDef.name,
    "data-plan-element-level": elementLevel,
    ...domElementAttr
  }];
};
const guardPlanOperators = (options) => {
  const { def, planDef, planModel, text, click } = options;
  return def != null ? def(planDef, planModel) : [{
    $wt: "Button",
    text: VUtils.isBlank(text) ? "Buy" : text,
    leads: ["$icons.cart"],
    "data-plan-buy": true,
    click
  }];
};
const buildPlanOrElementDefCodesMap = (elements) => {
  return elements().reduce((map, element) => {
    map[element.code] = {
      def: element,
      children: element.children == null || element.children.length === 0 ? void 0 : buildPlanOrElementDefCodesMap(() => element.children ?? [])
    };
    return map;
  }, {});
};
const findPlanElementDef = (map, codes) => {
  var _a;
  return (_a = codes.reduce((map2, code, index) => {
    var _a2;
    if (index === 0) {
      return map2 == null ? void 0 : map2[code];
    } else {
      return (_a2 = map2 == null ? void 0 : map2.children) == null ? void 0 : _a2[code];
    }
  }, map)) == null ? void 0 : _a.def;
};
const orderDef = (children, ordered, orderedCodeMap) => {
  children().forEach((element) => {
    let exists = orderedCodeMap[element.code];
    if (exists != null)
      ;
    else {
      const displayOrder = element.displayOrder ?? 0;
      const children2 = [];
      exists = { displayOrder, map: {}, ordered: children2 };
      orderedCodeMap[element.code] = exists;
      ordered.push({
        code: element.code,
        name: element.name,
        description: element.description,
        displayOrder,
        children: children2,
        def: element
      });
    }
    orderDef(() => element.children ?? [], exists.ordered, exists.map);
  });
};
const orderPlanDefs = (defs) => {
  if (defs == null || defs.length === 0) {
    return void 0;
  }
  const ordered = [];
  const map = {};
  defs.forEach((def) => orderDef(() => def.elements ?? [], ordered, map));
  const sort = (ordered2) => {
    const original = [...ordered2];
    ordered2 = ordered2.sort((a, b) => {
      if (a.displayOrder < b.displayOrder) {
        return -1;
      } else if (a.displayOrder > b.displayOrder) {
        return 1;
      } else {
        return original.indexOf(a) - original.indexOf(b);
      }
    });
    ordered2.forEach(({ children }) => {
      if (children != null && children.length !== 0) {
        sort(children);
      }
    });
    return ordered2;
  };
  return sort(ordered);
};
const useDefs = (options) => {
  const { defs, valuesInit, valuesClear, $wrapped: { $root, $model } } = options;
  const { on, off } = useGlobalEventBus();
  const globalHandlers = useGlobalHandlers();
  const [state, setState] = reactExports.useState({
    initialized: false,
    marker: redressPlanMarker(options)
  });
  reactExports.useEffect(() => {
    const loadDefs = async (beforeChangeState) => {
      let loadedDefs;
      if (typeof defs === "function") {
        loadedDefs = await defs({ root: $root, model: $model, global: globalHandlers });
      } else {
        loadedDefs = defs;
      }
      await beforeChangeState(loadedDefs);
      setState((state2) => {
        return {
          initialized: true,
          marker: state2.marker,
          defs: loadedDefs,
          orderedDefs: orderPlanDefs(loadedDefs)
        };
      });
    };
    if (!state.initialized) {
      (async () => await loadDefs(async (defs2) => {
        if (valuesInit != null) {
          await valuesInit({ defs: defs2, root: $root, model: $model, global: globalHandlers });
        }
      }))();
    }
    const onCustomEvent = async (_key, prefix, clipped) => {
      if (!state.initialized || prefix !== PlanSelectionGlobalEventPrefix.RELOAD_DEFS || clipped !== state.marker) {
        return;
      }
      setState((state2) => ({ initialized: false, marker: state2.marker }));
      await loadDefs(async (defs2) => {
        if (valuesClear != null) {
          await valuesClear({ defs: defs2, root: $root, model: $model, global: globalHandlers });
        }
      });
    };
    on(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
    return () => {
      off(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
    };
  }, [
    globalHandlers,
    on,
    off,
    state.initialized,
    state.marker,
    defs,
    valuesInit,
    valuesClear,
    $root,
    $model
  ]);
  return state;
};
const useLayout = (planDefsInitialized, planDefs, columns, columnWidth, lineHeaderWidth) => {
  const { on, off } = usePlanSelectionEventBus();
  const [state, setState] = reactExports.useState({
    initialized: false,
    displayPlanDefs: [],
    computedColumnCount: -1,
    computedColumnWidth: -1,
    computedLineHeaderWidth: -1
  });
  reactExports.useEffect(() => {
    if (!planDefsInitialized) {
      return;
    }
    const defs = planDefs ?? [];
    const planCount = defs.length;
    let computedColumnCount = Math.min(planCount, columns);
    let computedColumnWidth;
    let computedLineHeaderWidth;
    if (computedColumnCount <= 0) {
      computedColumnCount = planCount;
      [computedColumnWidth, computedLineHeaderWidth] = computeColumnWidth(-1, columnWidth, lineHeaderWidth);
      setState({
        initialized: true,
        displayPlanDefs: defs,
        computedColumnCount,
        computedColumnWidth,
        computedLineHeaderWidth
      });
    } else {
      [computedColumnWidth, computedLineHeaderWidth] = computeColumnWidth(computedColumnCount, columnWidth, lineHeaderWidth);
      if (computedColumnCount < planCount) {
        const pageCount = Math.ceil(planCount / computedColumnCount);
        setState((state2) => {
          const originalPageNumber = state2.pageNumber;
          let pageNumber;
          if (originalPageNumber == null) {
            pageNumber = 1;
          } else if (originalPageNumber > pageCount) {
            pageNumber = pageCount;
          } else {
            pageNumber = originalPageNumber;
          }
          const displayPlanDefs = defs.slice((pageNumber - 1) * computedColumnCount, pageNumber * computedColumnCount);
          return {
            initialized: true,
            displayPlanDefs,
            pageCount,
            pageNumber,
            pageSize: computedColumnCount,
            computedColumnCount,
            computedColumnWidth,
            computedLineHeaderWidth
          };
        });
      } else {
        setState({
          initialized: true,
          displayPlanDefs: defs,
          computedColumnCount,
          computedColumnWidth,
          computedLineHeaderWidth
        });
      }
    }
  }, [planDefsInitialized, planDefs, columns, columnWidth, lineHeaderWidth]);
  reactExports.useEffect(() => {
    const onSwitchPage = (pageNumber) => {
      const defs = planDefs ?? [];
      setState((state2) => {
        const displayPlanDefs = defs.slice((pageNumber - 1) * state2.pageSize, pageNumber * state2.pageSize);
        const computedColumnCount = displayPlanDefs.length;
        const [computedColumnWidth, computedLineHeaderWidth] = computeColumnWidth(computedColumnCount, columnWidth, lineHeaderWidth);
        return {
          ...state2,
          displayPlanDefs,
          pageNumber,
          computedColumnCount,
          computedColumnWidth,
          computedLineHeaderWidth
        };
      });
    };
    on(PlanSelectionEventTypes.SWITCH_PAGE, onSwitchPage);
    return () => {
      off(PlanSelectionEventTypes.SWITCH_PAGE, onSwitchPage);
    };
  }, [on, off, planDefs, columnWidth, lineHeaderWidth]);
  return state;
};
const useElementDefaultValue = (options) => {
  const { model, $pp, defaultValues } = options;
  reactExports.useEffect(() => {
    const existsValue = MUtils.getValue(model, $pp);
    if (VUtils.isNotBlank(existsValue)) {
      return;
    }
    const values = typeof defaultValues === "function" ? defaultValues() : defaultValues;
    for (let index = 0; index < values.length; index++) {
      const defaultValue = values[index];
      if (VUtils.isNotBlank(defaultValue)) {
        MUtils.setValue(model, $pp, defaultValue);
        break;
      }
    }
  }, []);
};
const PlanSelectionValueHandler = (props) => {
  const { calculationDelay = 1, calculate } = props;
  const { on, off, fire } = usePlanSelectionEventBus();
  const changes = reactExports.useRef(null);
  const { replace } = useThrottler();
  reactExports.useEffect(() => {
    const onElementValueChanged = (options) => {
      const { root, model, ...rest } = options;
      if (changes.current == null) {
        changes.current = { root, model, changes: [rest] };
      } else {
        changes.current.changes.push(rest);
      }
      replace(() => {
        const event = changes.current;
        changes.current = null;
        if (calculate != null) {
          (async () => {
            await calculate(event);
            event.changes.map((change) => change.planDef).forEach((planDef) => fire(PlanSelectionEventTypes.PREMIUM_CALCULATED, { planDef }));
          })();
        }
      }, calculationDelay * 1e3);
    };
    on(PlanSelectionEventTypes.ELEMENT_VALUE_CHANGED, onElementValueChanged);
    return () => {
      off(PlanSelectionEventTypes.ELEMENT_VALUE_CHANGED, onElementValueChanged);
    };
  }, [on, off, fire, replace, changes, calculate, calculationDelay]);
  return React.createElement(React.Fragment, null);
};
const PlanHeader = (props) => {
  const { $root, $p2r, plans: plans2, displayIndex, planDef, planTitle, planSubTitle, currencySymbol, premiumDescription } = props;
  const { on, off } = usePlanSelectionEventBus();
  const [elementValueChanged, setElementValueChanged] = reactExports.useState(false);
  const forceUpdate = useForceUpdate();
  reactExports.useEffect(() => {
    const onElementValueChanged = (options) => {
      if (planDef !== options.planDef) {
        return;
      }
      setElementValueChanged(true);
    };
    const onPremiumCalculated = (options) => {
      if (planDef !== options.planDef) {
        return;
      }
      if (elementValueChanged) {
        setElementValueChanged(false);
      } else {
        forceUpdate();
      }
    };
    on(PlanSelectionEventTypes.ELEMENT_VALUE_CHANGED, onElementValueChanged);
    on(PlanSelectionEventTypes.PREMIUM_CALCULATED, onPremiumCalculated);
    return () => {
      off(PlanSelectionEventTypes.ELEMENT_VALUE_CHANGED, onElementValueChanged);
      off(PlanSelectionEventTypes.PREMIUM_CALCULATED, onPremiumCalculated);
    };
  }, [on, off, forceUpdate, planDef, elementValueChanged]);
  const planData = findSelectedPlan(plans2, planDef.code);
  const model = createPlanModelProxy(planData, planDef);
  const $myWrapped = {
    $root,
    $model: model,
    $p2r: PPUtils.concat($p2r, planDef.code),
    $onValueChange: VUtils.noop,
    $avs: {}
  };
  const odd = displayIndex % 2 === 0;
  return React.createElement(
    APlanHeader,
    { "data-odd": odd },
    React.createElement(PlanHeaderTitle, null, guardPlanTitle({ def: planTitle, planDef, elementValueChanged }).map((label) => {
      return React.createElement(LabelLike, { key: nanoid(), label, "$wrapped": $myWrapped });
    })),
    React.createElement(PlanHeaderSubTitle, null, guardPlanSubTitle({
      def: planSubTitle,
      currencySymbol,
      premiumDescription,
      planDef,
      elementValueChanged
    }).map((label) => {
      return React.createElement(LabelLike, { key: nanoid(), label, "$wrapped": $myWrapped });
    }))
  );
};
$d9n2.intl.labels["en-US"].planSelection = {
  pagination: { page: "Page", of: "of", pages: "pages" }
};
const PlanHeaders = (props) => {
  const { $root, $p2r, displayPlanDefs, plans: plans2, planTitle, planSubTitle, currencySymbol, premiumDescription, pageCount, pageNumber } = props;
  const { fire } = usePlanSelectionEventBus();
  const onSwitchPageClicked = (pageNumber2) => () => {
    fire(PlanSelectionEventTypes.SWITCH_PAGE, pageNumber2);
  };
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(PlanSelectionTopLeftCorner, null, pageNumber != null ? React.createElement(
      PlanSelectionPagination,
      null,
      pageNumber != 1 ? React.createElement(UnwrappedButton, { ink: ButtonInk.WARN, fill: ButtonFill.LINK, leads: ["$icons.angleLeft"], onClick: onSwitchPageClicked(pageNumber - 1) }) : null,
      React.createElement(
        "span",
        null,
        React.createElement(
          "span",
          null,
          React.createElement(IntlLabel, { keys: ["planSelection", "pagination", "page"], value: "Page" })
        ),
        React.createElement("span", null, pageNumber),
        React.createElement(
          "span",
          null,
          React.createElement(IntlLabel, { keys: ["planSelection", "pagination", "of"], value: "of" })
        ),
        React.createElement("span", null, pageCount),
        React.createElement(
          "span",
          null,
          React.createElement(IntlLabel, { keys: ["planSelection", "pagination", "pages"], value: "pages" })
        )
      ),
      pageNumber !== pageCount ? React.createElement(UnwrappedButton, { ink: ButtonInk.WARN, fill: ButtonFill.LINK, leads: ["$icons.angleRight"], onClick: onSwitchPageClicked(pageNumber + 1) }) : null
    ) : null),
    displayPlanDefs.map((planDef, displayIndex) => {
      return React.createElement(PlanHeader, { "$root": $root, "$p2r": $p2r, plans: plans2, displayIndex, planDef, planTitle, planSubTitle, currencySymbol, premiumDescription, key: planDef.code });
    })
  );
};
const PlanElementPin = (props) => {
  const { $root, $p2r, plans: plans2, plan, planDef, element, elementDef } = props;
  const { pinned = true } = elementDef;
  const { fire } = usePlanSelectionEventBus();
  const onSelectedChanged = (value) => {
    fire(PlanSelectionEventTypes.ELEMENT_VALUE_CHANGED, {
      root: $root,
      model: plans2,
      $p2r: PPUtils.concat($p2r, "selected"),
      planDef,
      plan,
      elementDef,
      element,
      value
    });
  };
  const def = {
    $wt: "Checkbox",
    $pp: "selected",
    $root,
    $model: element,
    $p2r,
    "data-element-pinned": pinned,
    emptyWhenFalse: false,
    $disabled: pinned,
    valueChanged: ({ newValue }) => onSelectedChanged(newValue)
  };
  return React.createElement(Wrapper, { ...def });
};
const PlanElementUnit = (props) => {
  const { valueDef, $root, $p2r, values: valuesModel } = props;
  const { unit } = valueDef;
  const unit$wrapped = {
    $root,
    $model: valuesModel,
    $p2r,
    $onValueChange: VUtils.noop,
    $avs: {}
  };
  return React.createElement(
    PlanElementUnitLabel,
    null,
    React.createElement(LabelLike, { label: unit, "$wrapped": unit$wrapped })
  );
};
const PlanElementFixedValue = (props) => {
  const { elementDef, valueDef, plan: planModel, elementCodes, $root, $p2r, element: elementModel, values: valuesModel, elementFixedValue } = props;
  const { code: $pp, label, defaultValue } = valueDef;
  useElementDefaultValue({ model: valuesModel, $pp, defaultValues: [defaultValue] });
  const root = planModel;
  if (elementFixedValue == null) {
    const def = {
      $wt: "Box.FC",
      $root,
      $model: valuesModel,
      $p2r,
      $pp: ".",
      label,
      $nodes: [
        {
          $wt: "Label",
          $pp,
          "data-plan-element-fix-value": true,
          valueToLabel: (value, formats) => {
            try {
              return value == null ? "" : formats.nf0(value);
            } catch (e) {
              console.error(e);
              return value == null ? "" : `${value}`;
            }
          }
        },
        {
          $wt: "Caption",
          text: React.createElement(PlanElementUnit, { valueDef, "$root": $root, "$p2r": $p2r, values: valuesModel })
        }
      ]
    };
    return React.createElement(Wrapper, { ...def });
  } else {
    return React.createElement(React.Fragment, null, elementFixedValue({
      elementDef,
      valueDef,
      plan: planModel,
      elementCodes,
      $p2r,
      element: elementModel,
      values: valuesModel
    }).map((def) => {
      return React.createElement(Wrapper, { ...def, "$root": root, "$model": valuesModel, "$p2r": $p2r });
    }));
  }
};
const PlanElementOptionsValue = (props) => {
  var _a;
  const { planDef, elementDef, valueDef, plan: planModel, plans: plans2, $root, $p2r, elementCodes, element: elementModel, values: valuesModel, elementOptionsValue } = props;
  const { code: $pp, label, defaultValue, options } = valueDef;
  const { fire } = usePlanSelectionEventBus();
  useElementDefaultValue({ model: valuesModel, $pp, defaultValues: [defaultValue, (_a = options == null ? void 0 : options[0]) == null ? void 0 : _a.value] });
  const onValueChanged = async (value) => {
    fire(PlanSelectionEventTypes.ELEMENT_VALUE_CHANGED, {
      root: $root,
      model: plans2,
      $p2r: PPUtils.concat($p2r, $pp),
      planDef,
      plan: planModel,
      elementDef,
      element: elementModel,
      value
    });
  };
  const root = planModel;
  if (elementOptionsValue == null) {
    const language = utils$1.locale();
    const format = utils$1.nfXWithLocale(language, 0);
    const def = {
      $wt: "Box.FC",
      $root,
      $model: valuesModel,
      $p2r,
      $pp: ".",
      label,
      $nodes: [
        {
          $wt: "Dropdown",
          $pp,
          "data-plan-element-options-value": true,
          clearable: false,
          options: (options ?? []).map((option) => {
            const { label: label2, value, stringify } = option;
            let displayLabel = VUtils.isBlank(label2) ? value : label2;
            if (typeof displayLabel === "number") {
              displayLabel = format(displayLabel);
            } else if (typeof displayLabel === "string" && VUtils.isNotBlank(displayLabel)) {
              const value2 = Number(displayLabel);
              if (!isNaN(value2)) {
                displayLabel = format(value2);
              }
            }
            return {
              label: displayLabel,
              value,
              stringify: stringify != null ? () => stringify(displayLabel) ?? "" : void 0
            };
          }),
          valueChanged: ({ newValue }) => onValueChanged(newValue)
        },
        {
          $wt: "Caption",
          text: React.createElement(PlanElementUnit, { valueDef, "$root": $root, "$p2r": $p2r, values: valuesModel })
        }
      ]
    };
    return React.createElement(Wrapper, { ...def });
  } else {
    return React.createElement(React.Fragment, null, elementOptionsValue({
      elementDef,
      valueDef,
      plan: planModel,
      $p2r,
      elementCodes,
      element: elementModel,
      values: valuesModel,
      onValueChanged
    }).map((def) => {
      return React.createElement(Wrapper, { ...def, "$root": root, "$model": valuesModel, "$p2r": $p2r });
    }));
  }
};
const checkMinMaxStep = (valueDef) => {
  let { min, max, step } = valueDef;
  [min, max, step] = [min, max, step].map((value) => {
    const tested = VUtils.isPositive(value);
    return tested.test ? tested.value : void 0;
  });
  if (min != null && max != null && min > max) {
    [min, max] = [max, min];
  }
  return { min, max, step };
};
const PlanElementNumberValueDefaultValidator = (options) => {
  const { valueDef: { code: $pp }, min = 0, max, step } = options;
  return (options2) => {
    const { value: model } = options2;
    const value = MUtils.getValue(model, $pp);
    if (VUtils.isBlank(value)) {
      return { valid: false, failReason: "Value should be a number." };
    }
    const tested = VUtils.isNumber(value);
    if (!tested.test) {
      return { valid: false, failReason: "Value should be a number." };
    }
    const testedValue = tested.value;
    if (max != null && testedValue > max) {
      return {
        valid: false,
        failReason: `Value should be less than or equals ${max}.`
      };
    }
    if (testedValue < min) {
      return {
        valid: false,
        failReason: `Value should be greater than or equals ${min}.`
      };
    }
    if (step != null && (testedValue - min) % step !== 0) {
      return {
        valid: false,
        failReason: min === 0 ? `Value should be a multiple of ${step}.` : `Value should start from ${min} and plus a multiple of ${step}.`
      };
    }
    return { valid: true };
  };
};
const PlanElementNumberValue = (props) => {
  const { planDef, elementDef, valueDef, plan: planModel, plans: plans2, $root, $p2r, elementCodes, element: elementModel, values: valuesModel, elementNumberValue, elementNumberValueValidator } = props;
  const { code: $pp, label, defaultValue, min } = valueDef;
  const { fire } = usePlanSelectionEventBus();
  useElementDefaultValue({ model: valuesModel, $pp, defaultValues: [defaultValue, min ?? 0] });
  const onValueChanged = async (value) => {
    fire(PlanSelectionEventTypes.ELEMENT_VALUE_CHANGED, {
      root: $root,
      model: plans2,
      $p2r: PPUtils.concat($p2r, $pp),
      planDef,
      plan: planModel,
      elementDef,
      element: elementModel,
      value
    });
  };
  const root = planModel;
  if (elementNumberValue == null) {
    const { min: min2, max, step } = checkMinMaxStep(valueDef);
    const useOptions = max != null && step != null;
    let editorDef;
    if (useOptions) {
      const language = utils$1.locale();
      const format = utils$1.nfXWithLocale(language, 0);
      const values = (() => {
        const values2 = [max];
        let value = max;
        while (value > (min2 ?? 0)) {
          value = value - step;
          values2.push(value);
        }
        return values2;
      })();
      editorDef = {
        $wt: "Dropdown",
        $pp,
        "data-plan-element-number-value": true,
        clearable: false,
        options: values.map((value) => {
          return { label: format(value), value };
        }),
        valueChanged: ({ newValue }) => onValueChanged(newValue)
      };
    } else {
      editorDef = {
        $wt: "Number",
        $pp,
        "data-plan-element-number-value": true,
        valueChanged: ({ newValue }) => onValueChanged(newValue)
      };
    }
    const def = {
      $wt: "Box.FC",
      $root,
      $model: valuesModel,
      $p2r,
      $pp: ".",
      label,
      $valid: useOptions ? void 0 : {
        $watch: [$pp],
        $handle: elementNumberValueValidator != null ? elementNumberValueValidator({ elementDef, valueDef }) : PlanElementNumberValueDefaultValidator({ elementDef, valueDef, min: min2, max, step })
      },
      $nodes: [
        editorDef,
        {
          $wt: "Caption",
          text: React.createElement(PlanElementUnit, { valueDef, "$root": $root, "$p2r": $p2r, values: valuesModel })
        }
      ]
    };
    return React.createElement(Wrapper, { ...def });
  } else {
    return React.createElement(React.Fragment, null, elementNumberValue({
      elementDef,
      valueDef,
      plan: planModel,
      elementCodes,
      $p2r,
      element: elementModel,
      values: valuesModel,
      onValueChanged
    }).map((def) => {
      return React.createElement(Wrapper, { ...def, "$root": root, "$model": valuesModel, "$p2r": $p2r });
    }));
  }
};
const getElementModel = (plan, $elementToPlans, elementDef) => {
  const { code, pinned = true } = elementDef;
  let elementModel = MUtils.getValue(plan, $elementToPlans);
  if (elementModel == null) {
    elementModel = { code, selected: pinned };
    MUtils.setValue(plan, $elementToPlans, elementModel);
  } else {
    MUtils.setValue(elementModel, `code`, elementDef.code);
    if (pinned === true) {
      MUtils.setValue(elementModel, `selected`, true);
    }
  }
  return elementModel;
};
const getValuesModel = (element) => {
  let valuesModel = MUtils.getValue(element, "values");
  if (valuesModel == null) {
    valuesModel = {};
    MUtils.setValue(element, "values", valuesModel);
  }
  return valuesModel;
};
const PlanElementValues = (props) => {
  const { elementDef, elementCodes, planDef, plan: planModel, plans: plans2, $root, elementFixedValue, elementOptionsValue, elementNumberValue, elementNumberValueValidator } = props;
  const { values = [] } = elementDef;
  const $elementToPlans = elementCodes.map((code, index) => {
    if (index === 0) {
      return `elements.${code}`;
    } else {
      return `children.${code}`;
    }
  }).join(".");
  const element$p2r = PPUtils.concat(props.$p2r, $elementToPlans);
  const elementModel = getElementModel(planModel, $elementToPlans, elementDef);
  if (values.length === 0) {
    return React.createElement(PlanElementPin, { "$root": $root, "$p2r": element$p2r, plans: plans2, plan: planModel, planDef, element: elementModel, elementDef });
  }
  const value$p2r = PPUtils.concat(element$p2r, "values");
  const valuesModel = getValuesModel(elementModel);
  return React.createElement(React.Fragment, null, values.map((valueDef) => {
    const { code } = valueDef;
    if (isElementNumberValueDef(valueDef)) {
      return React.createElement(PlanElementNumberValue, { planDef, elementDef, valueDef, elementCodes, "$root": $root, "$p2r": value$p2r, plans: plans2, plan: planModel, element: elementModel, values: valuesModel, elementNumberValue, elementNumberValueValidator, key: code });
    } else if (isElementOptionsValueDef(valueDef)) {
      return React.createElement(PlanElementOptionsValue, { planDef, elementDef, valueDef, elementCodes, "$root": $root, "$p2r": value$p2r, plans: plans2, plan: planModel, element: elementModel, values: valuesModel, elementOptionsValue, key: code });
    } else {
      return React.createElement(PlanElementFixedValue, { planDef, elementDef, valueDef, elementCodes, "$root": $root, "$p2r": value$p2r, plans: plans2, plan: planModel, element: elementModel, values: valuesModel, elementFixedValue, key: code });
    }
  }));
};
const PlanElement = (props) => {
  const { orderedDef, displayPlanDefs, displayPlanDefCodesMap, elementTitle, elementLevel, ancestorCodes, plansModel, $root, $p2r, elementFixedValue, elementOptionsValue, elementNumberValue, elementNumberValueValidator } = props;
  const model = createPlanModelProxy(plansModel, orderedDef);
  const $titleWrapped = { $root, $model: model, $p2r, $onValueChange: VUtils.noop, $avs: {} };
  const elementCode = orderedDef.code;
  const elementCodes = ancestorCodes == null ? [elementCode] : [...ancestorCodes, elementCode];
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      PlanElementColumnHeader,
      null,
      React.createElement(PlanElementColumnHeaderTitle, null, guardElementTitle({ def: elementTitle, orderedDef, elementLevel }).map((label) => {
        return React.createElement(LabelLike, { key: nanoid(), label, "$wrapped": $titleWrapped });
      }))
    ),
    displayPlanDefs.map((planDef, displayIndex) => {
      const odd = displayIndex % 2 === 0;
      const { code: planCode } = planDef;
      const planDefCodesMap = displayPlanDefCodesMap[planCode];
      const elementDef = findPlanElementDef(planDefCodesMap, elementCodes);
      const key = `${planCode}	${elementCodes.join("	")}`;
      if (elementDef == null) {
        return React.createElement(
          PlanElementCell,
          { "data-odd": odd, "data-element-lack": true, key },
          React.createElement(index$2.Times, null)
        );
      } else if (isCategoryPlanElementDef(elementDef)) {
        return React.createElement(
          PlanElementCell,
          { "data-odd": odd, "data-element-cateogry": true, key },
          React.createElement(index$2.Check, null)
        );
      } else {
        const planData = findSelectedPlan(plansModel, planDef.code);
        return React.createElement(
          PlanElementCell,
          { "data-odd": odd, key },
          React.createElement(PlanElementValues, { elementDef, elementCodes, planDef, plan: planData, plans: plansModel, "$root": $root, "$p2r": PPUtils.concat($p2r, planCode), elementFixedValue, elementOptionsValue, elementNumberValue, elementNumberValueValidator })
        );
      }
    }),
    (orderedDef.children ?? []).map((childOrderedDef) => {
      return React.createElement(PlanElement, { orderedDef: childOrderedDef, displayPlanDefs, displayPlanDefCodesMap, elementTitle, elementLevel: elementLevel + 1, ancestorCodes: elementCodes, plansModel, "$root": $root, "$p2r": $p2r, elementFixedValue, elementOptionsValue, elementNumberValue, elementNumberValueValidator, key: childOrderedDef.code });
    })
  );
};
const PlanBodies = (props) => {
  const { $root, $p2r, displayPlanDefs, orderedDefs, plans: plans2, elementTitle, elementOptionsValue, elementNumberValue, elementNumberValueValidator, elementFixedValue } = props;
  const displayPlanDefCodesMap = displayPlanDefs.reduce((map, def) => {
    map[def.code] = buildPlanOrElementDefCodesMap(() => def.elements ?? []);
    return map;
  }, {});
  return React.createElement(React.Fragment, null, (orderedDefs ?? []).map((orderedDef) => {
    return React.createElement(PlanElement, { orderedDef, displayPlanDefs, displayPlanDefCodesMap, elementTitle, elementLevel: 0, plansModel: plans2, "$root": $root, "$p2r": $p2r, elementOptionsValue, elementNumberValue, elementNumberValueValidator, elementFixedValue, key: orderedDef.code });
  }));
};
const PlanFooters = (props) => {
  const { $root, $p2r, displayPlanDefs, plans: plans2, planOperators, buyText, buy } = props;
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(PlanSelectionBottomLeftCorner, null),
    displayPlanDefs.map((planDef, displayIndex) => {
      const planData = findSelectedPlan(plans2, planDef.code);
      const odd = displayIndex % 2 === 0;
      const model = createPlanModelProxy(planData, planDef);
      const $myWrapped = {
        $root,
        $model: model,
        $p2r: PPUtils.concat($p2r, planDef.code),
        $onValueChange: VUtils.noop,
        $avs: {}
      };
      return React.createElement(
        PlanFooter,
        { "data-odd": odd, key: planDef.code },
        React.createElement(PlanFooterOperator, null, guardPlanOperators({
          def: planOperators,
          planDef,
          planModel: planData,
          text: buyText,
          click: buy
        }).map((label) => {
          return React.createElement(LabelLike, { key: nanoid(), label, "$wrapped": $myWrapped });
        }))
      );
    })
  );
};
const InternalPlanSelection = (props) => {
  const { $pp, $wrapped, columns = 3, columnWidth, lineHeaderWidth, maxHeight, currencySymbol, premiumDescription, buyText, buy, planTitle, planSubTitle, elementTitle, elementFixedValue, elementOptionsValue, elementNumberValue, elementNumberValueValidator, planOperators, calculate, calculationDelay = 1, ...rest } = props;
  const { $root, $p2r, $avs: { $disabled, $visible } } = $wrapped;
  const { initialized: planDefsInitialized, defs: planDefs, orderedDefs } = useDefs(props);
  const layout = useLayout(planDefsInitialized, planDefs, columns, columnWidth, lineHeaderWidth);
  if (!layout.initialized) {
    return null;
  }
  let plansData = MUtils.getValue($wrapped.$model, $pp);
  if (plansData == null) {
    plansData = {};
    MUtils.setValue($wrapped.$model, $pp, plansData);
  }
  const $p2rOfPlans = PPUtils.concat($p2r, $pp);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(PlanSelectionValueHandler, { calculate, calculationDelay }),
    React.createElement(
      APlanSelection,
      { ...rest, "data-disabled": $disabled, "data-visible": $visible, columnCount: layout.computedColumnCount, computedColumnWidth: layout.computedColumnWidth, computedLineHeaderWidth: layout.computedLineHeaderWidth, maxHeight, id: PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id) },
      React.createElement(PlanHeaders, { "$root": $root, "$p2r": $p2rOfPlans, displayPlanDefs: layout.displayPlanDefs, plans: plansData, planTitle, planSubTitle, currencySymbol, premiumDescription, pageCount: layout.pageCount, pageNumber: layout.pageNumber }),
      React.createElement(PlanBodies, { "$root": $root, "$p2r": $p2rOfPlans, displayPlanDefs: layout.displayPlanDefs, orderedDefs, plans: plansData, elementTitle, elementOptionsValue, elementNumberValue, elementNumberValueValidator, elementFixedValue }),
      React.createElement(PlanFooters, { "$root": $root, "$p2r": $p2rOfPlans, displayPlanDefs: layout.displayPlanDefs, plans: plansData, planOperators, buyText, buy })
    )
  );
};
const PlanSelection = (props) => {
  return React.createElement(
    PlanSelectionEventBusProvider,
    null,
    React.createElement(InternalPlanSelection, { ...props })
  );
};
const PlanSelectionDefsBuild = index$1.createSnippetBuild("defs", (parsed) => new Function("options", parsed));
const PlanSelectionValuesInitBuild = index$1.createSnippetBuild("valuesInit", (parsed) => new Function("options", parsed));
const PlanSelectionValuesClearBuild = index$1.createSnippetBuild("valuesClear", (parsed) => new Function("options", parsed));
const PlanSelectionTitleBuild = index$1.createSnippetBuild("planTitle", (parsed) => new Function("def", "elementValueChanged", parsed));
const PlanSelectionSubTitleBuild = index$1.createSnippetBuild("planSubTitle", (parsed) => new Function("def", "elementValueChanged", "currencySymbol", "premiumDescription", parsed));
const PlanSelectionElementTitleBuild = index$1.createSnippetBuild("elementTitle", (parsed) => new Function("def", "level", parsed));
const PlanSelectionElementFixedValueBuild = index$1.createSnippetBuild("elementFixedValue", (parsed) => new Function("options", parsed));
const PlanSelectionElementOptionsValueBuild = index$1.createSnippetBuild("elementOptionsValue", (parsed) => new Function("options", parsed));
const PlanSelectionElementNumberValueBuild = index$1.createSnippetBuild("elementNumberValue", (parsed) => new Function("options", parsed));
const PlanSelectionElementNumberValueValidatorBuild = index$1.createSnippetBuild("elementNumberValueValidator", (parsed) => new Function("options", parsed));
const PlanSelectionPlanOperatorsBuild = index$1.createSnippetBuild("planOperators", (parsed) => new Function("def", "plan", parsed));
const PlanSelectionCalculateBuild = index$1.createSnippetBuild("calculate", (parsed) => new Function("event", parsed));
class AbstractPlanSelectionTranslator extends index$1.SpecificWidgetTranslator {
  beautifyProperties(def) {
    return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
  }
  shouldWrapByFormCell() {
    return false;
  }
  getAttributeValueBuilders() {
    return [
      PlanSelectionDefsBuild,
      PlanSelectionValuesInitBuild,
      PlanSelectionValuesClearBuild,
      PlanSelectionTitleBuild,
      PlanSelectionSubTitleBuild,
      PlanSelectionElementTitleBuild,
      PlanSelectionElementFixedValueBuild,
      PlanSelectionElementOptionsValueBuild,
      PlanSelectionElementNumberValueBuild,
      PlanSelectionElementNumberValueValidatorBuild,
      PlanSelectionPlanOperatorsBuild,
      PlanSelectionCalculateBuild
    ];
  }
}
const registerPlanSelect = (widgetHelper, widgetType) => {
  widgetType = VUtils.isBlank(widgetType) ? "PlanSelect" : widgetType;
  registerWidget({ key: widgetType, JSX: PlanSelection, container: false, array: false });
  const TranslatorClass = class extends AbstractPlanSelectionTranslator {
    getSupportedType() {
      return widgetType;
    }
  };
  const repo = widgetHelper.repository;
  repo.register(new TranslatorClass(repo));
};
const CustomEventHandler = () => {
  const { on, off } = useGlobalEventBus();
  reactExports.useEffect(() => {
    const onCustomEvent = (key, prefix, clipped, _models) => {
      if (prefix !== GlobalEventPrefix.CUSTOM) {
        console.log(`Custom event[key=${key}, prefix=${prefix}, clipped=${clipped}] captured.`);
      } else {
        alert(clipped);
      }
    };
    on && on(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
    return () => {
      off && off(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
    };
  }, [on, off]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, {});
};
const useDemoMarkdown = (markdown2) => {
  const [state, setState] = reactExports.useState(() => {
    const def = parseDoc(markdown2).node;
    return { def, markdown: markdown2 };
  });
  reactExports.useEffect(() => {
    if (markdown2 === state.markdown) {
      return;
    }
    setState({ def: parseDoc(markdown2).node, markdown: markdown2 });
  }, [markdown2, state.markdown]);
  return state.def;
};
const markdown$1 = "# Page:: Demo Dialog\n\n- Label::Property A::propA\n	- valueToLabel: `'This is property \"A\".'` \n";
const DEFAULT_STYLES = { width: "80vw", height: "80vh", margin: "10vh auto" };
const N2DemoDialogHandler = () => {
  const def = useDemoMarkdown(markdown$1);
  const { on, off } = useGlobalEventBus();
  const { show: showAlert } = useAlert();
  const { show: showDialog, hide: hideDialog } = useDialog();
  reactExports.useEffect(() => {
    const onCustomEvent = async (key, prefix, clipped, models) => {
      if (prefix === GlobalEventPrefix.DIALOG) {
        const dialogKey = clipped.trim();
        if (VUtils.isNotEmpty(dialogKey)) {
          showDialog(/* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "This is a demo dialog." }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: models == null ? void 0 : models.root }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(UnwrappedButton, { onClick: () => hideDialog(), children: "Close" }) })
          ] }), DEFAULT_STYLES);
        } else {
          console.log(`Custom event[key=${key}] is ignored since no dialog key detected.`);
        }
      } else if (prefix === GlobalEventPrefix.ALERT) {
        await showAlert(clipped.trim());
      }
    };
    on(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
    return () => {
      off(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
    };
  }, [on, off, showAlert, showDialog, hideDialog, def]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, {});
};
const plans = {
  plan1: {
    code: "plan1",
    premium: {
      due: 123456
    }
  },
  plan2: {
    code: "plan2",
    premium: {
      due: 654321
    }
  }
};
const DemoData = {
  plans
};
const markdown = "# Page::Demo Tab\n\n## Section::# 100. ThaiCloud Plan Selection\n\n- PlanSelect::::plans\n	- maxHeight: 800\n	- columns: 3\n	- defs: @ext.defs\n	- currencySymbol: ฿\n	- premiumDescription: After Tax\n	- buy: @ext.buy\n	- calculationDelay: 3\n	- calculate: @ext.calculate\n";
$d9n2.intl.labels["en-US"] = {
  "Standard Plan #1": "标准保障计划 #1",
  "After Tax": "税后",
  "Fire & Theft": "火灾和盗抢",
  "Personal Accident - Death & Disability for Driver": "个人意外 - 驾驶员身故和残疾",
  "Sum Insured": "保额",
  "Limit": "限额",
  "Per Accident": "每次事故",
  "฿": "泰铢",
  "Buy": "购买"
};
const ThaiPlanSelection = () => {
  const def = useDemoMarkdown(markdown);
  const externalDefs = {
    defs: async () => {
      return [
        {
          code: "plan1",
          name: "Standard Plan #1",
          elements: [
            {
              code: "V",
              name: "Voluntary",
              type: PlanElementType.CATEGORY,
              children: [
                {
                  code: "ODFTD",
                  name: "Own Damage & Fire & Theft Deductible",
                  type: PlanElementType.COVERAGE,
                  values: [
                    {
                      code: "si",
                      label: "Sum Insured",
                      defaultValue: 95e4,
                      options: [{ value: 9e5 }, { value: 95e4 }, { value: 1e6 }],
                      editType: PlanElementValueEditType.OPTIONS
                    },
                    {
                      code: "limit",
                      label: "Limit",
                      options: [{ value: 2e5 }, { value: 3e5 }, { value: 5e5 }],
                      editType: PlanElementValueEditType.OPTIONS,
                      unit: "Per Accident"
                    }
                  ]
                },
                {
                  code: "FT",
                  name: "Fire & Theft",
                  type: PlanElementType.COVERAGE,
                  values: [
                    {
                      code: "si",
                      label: "Sum Insured",
                      editType: PlanElementValueEditType.NUMBER,
                      min: 1e3,
                      max: 5e3,
                      step: 1e3
                    }
                  ]
                },
                {
                  code: "TPLBI",
                  name: "Third Party Liability - Bodily Injury",
                  type: PlanElementType.COVERAGE,
                  values: [
                    {
                      code: "si",
                      label: "Sum Insured",
                      defaultValue: 5e4,
                      editType: PlanElementValueEditType.NUMBER
                    },
                    {
                      code: "limit1",
                      label: "Limit",
                      defaultValue: 1e3,
                      editType: PlanElementValueEditType.NUMBER,
                      max: 5e3,
                      unit: "Per Accident"
                    },
                    {
                      code: "limit2",
                      label: "Limit",
                      defaultValue: 5e3,
                      editType: PlanElementValueEditType.NUMBER,
                      min: 5e3,
                      step: 1e3,
                      unit: "Per Person"
                    }
                  ]
                },
                {
                  code: "TPLPDD",
                  name: "Third Party Liability - Property Damage Deductible",
                  type: PlanElementType.COVERAGE
                }
              ]
            },
            {
              code: "PADDD",
              name: "Personal Accident - Death & Disability for Driver",
              type: PlanElementType.COVERAGE
            },
            {
              code: "PADDP",
              name: "Personal Accident - Death & Disability for Passenger",
              type: PlanElementType.COVERAGE
            },
            {
              code: "PATDD",
              name: "Personal Accident - Temporary Disability for Driver",
              type: PlanElementType.COVERAGE
            },
            {
              code: "PATDP",
              name: "Personal Accident - Temporary Disability for Passenger",
              type: PlanElementType.COVERAGE
            },
            {
              code: "ME",
              name: "Medical Expense",
              type: PlanElementType.COVERAGE
            },
            {
              code: "BBCC",
              name: "Bail Bond in Criminal Cases",
              type: PlanElementType.COVERAGE
            },
            {
              code: "VC",
              name: "Vehicle Collision",
              type: PlanElementType.COVERAGE
            },
            {
              code: "SC",
              name: "Special Cews",
              type: PlanElementType.CATEGORY,
              children: [
                {
                  code: "ND",
                  name: "Natural Disaster",
                  type: PlanElementType.COVERAGE,
                  values: [
                    {
                      code: "si",
                      label: "Sum Insured",
                      defaultValue: 5e6,
                      editType: PlanElementValueEditType.FIXED
                    },
                    {
                      code: "limit",
                      label: "Limit",
                      defaultValue: 1e6,
                      editType: PlanElementValueEditType.FIXED,
                      unit: "Per Accident"
                    }
                  ],
                  displayOrder: 200
                }
              ]
            }
          ]
        },
        {
          code: "plan2",
          name: "Standard Plan #2",
          elements: [
            {
              code: "V",
              name: "Voluntary",
              type: PlanElementType.CATEGORY,
              children: [
                {
                  code: "ODFTD",
                  name: "Own Damage & Fire & Theft Deductible",
                  type: PlanElementType.COVERAGE,
                  values: [
                    {
                      code: "si",
                      label: "Sum Insured",
                      defaultValue: 85e4,
                      options: [{ value: 8e5 }, { value: 85e4 }, { value: 9e5 }],
                      editType: PlanElementValueEditType.OPTIONS
                    },
                    {
                      code: "limit",
                      label: "Limit",
                      options: [{ value: 2e5 }, { value: 3e5 }, { value: 5e5 }],
                      editType: PlanElementValueEditType.OPTIONS,
                      unit: "Per Accident"
                    }
                  ]
                }
              ]
            },
            {
              code: "SC",
              name: "Special Cews",
              type: PlanElementType.CATEGORY,
              children: [
                {
                  code: "F",
                  name: "Flood",
                  type: PlanElementType.COVERAGE,
                  pinned: false,
                  displayOrder: 100
                }
              ]
            }
          ]
        },
        {
          code: "plan3",
          name: "Standard Plan #3",
          elements: []
        },
        {
          code: "plan4",
          name: "Standard Plan #4",
          elements: []
        },
        {
          code: "plan5",
          name: "Standard Plan #5",
          elements: []
        },
        {
          code: "plan6",
          name: "Standard Plan #6",
          elements: []
        },
        {
          code: "plan7",
          name: "Standard Plan #7",
          elements: []
        }
      ];
    },
    buy: (options) => {
      console.log(options);
      console.log(options.model.$revoke());
    },
    calculate: async (event) => {
      const { changes } = event;
      [...new Set(changes.map((change) => change.planDef.code))].map((code) => {
        return { code, premium: Math.ceil(5e4 + Math.random() * 1e4) };
      }).forEach(({ code, premium }) => {
        MUtils.setValue(DemoData.plans, `${code}.premium.due`, premium);
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlobalRoot, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomEventHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(N2DemoDialogHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: DemoData, externalDefs })
  ] });
};
const ThaiPlanSelectionData = DemoData;
const ThaiPlanSelectionMarkdown = markdown;
export {
  CustomEventHandler as C,
  N2DemoDialogHandler as N,
  PlanSelectionCssVars as P,
  ThaiPlanSelection as T,
  ThaiPlanSelectionData as a,
  ThaiPlanSelectionMarkdown as b,
  registerPlanSelect as r,
  useDemoMarkdown as u
};
