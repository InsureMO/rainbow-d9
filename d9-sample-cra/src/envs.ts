import {MUtils, N1Logger, PPUtils, VUtils} from '@rainbow-d9/n1';
// import all n2 widgets
import '@rainbow-d9/n2';
import {CalendarUtils, CssVars} from '@rainbow-d9/n2';
import {registerN2Widgets, Widget} from '@rainbow-d9/n3';
import {registerPlanSelect, PlanSelectionCssVars} from '@rainbow-d9/thai-plan-selection';
import dayjs from 'dayjs';
import ArraySupport from 'dayjs/plugin/arraySupport';
import BuddhistEra from 'dayjs/plugin/buddhistEra';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import Duration from 'dayjs/plugin/duration';
import IsToday from 'dayjs/plugin/isToday';
import ObjectSupport from 'dayjs/plugin/objectSupport';
import QuarterOfYear from 'dayjs/plugin/quarterOfYear';
import RelativeTime from 'dayjs/plugin/relativeTime';
import UTC from 'dayjs/plugin/utc';
import WeekOfYear from 'dayjs/plugin/weekOfYear';
import {createGlobalStyle} from 'styled-components';

// datetime functions
dayjs.extend(WeekOfYear);
dayjs.extend(QuarterOfYear);
dayjs.extend(Duration);
dayjs.extend(IsToday);
dayjs.extend(RelativeTime);
dayjs.extend(ArraySupport);
dayjs.extend(ObjectSupport);
dayjs.extend(CustomParseFormat);
dayjs.extend(UTC);
dayjs.extend(BuddhistEra);

(() => {
	// d9 logger
	if (process.env.REACT_APP_ENABLE_D9_LOGGER === 'true') {
		N1Logger.enableLevel('debug');
	}
	// register widgets to n3
	const widgetsHelper = Widget.createOrGetTranslateHelperSingleton();
	registerN2Widgets(widgetsHelper);
	registerPlanSelect(widgetsHelper);
	// set widgets parameters
	// calendar
	CalendarUtils.setCalendarDefaults({
		dateFormat: 'DD/MM/YYYY'
		// timeFormat: askDisplayTimeFormat(),
		// datetimeFormat: askDateTimeFormat()
	});
})();

// noinspection CssUnresolvedCustomProperty,CssNoGenericFontName
export const GlobalStyles: any = createGlobalStyle`
    *, *:before, *:after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    *:focus-visible {
        outline: none;
    }

    html {
        width: 100%;
    }

    body {
        margin: 0;
        //font-family             : var(--font-family);
        //font-size               : var(--font-size);
        //color                   : var(--font-color);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        position: relative;
        //background-color        : var(--bg-color);
        overflow-x: hidden;
        width: 100%;
    }

    *, *:before, *:after {
        box-sizing: border-box;
    }

    div[data-w=d9-demo] {
        --d9-font-family: Roboto;
        --d9-font-color: #555;
        --d9-font-size: 14px;
        --d9-border-color: #eee;
        --d9-input-height: 32px;
        --d9-common-tabs-font-size: 20px;
        --d9-common-tabs-font-weight: 600;
        --d9-common-tabs-padding: 16px;
        --d9-section-header-title-font-size: 16px;
        --d9-section-header-title-font-weight: 500;
        --d9-section-header-border: 1px solid #eee;
        --d9-caption-font-color: #555;
        --d9-table-header-font-family: Roboto;
        --d9-table-header-font-size: 12px;
        --d9-table-header-font-weight: 400;
        --d9-table-cell-height: 32px;

        div[data-v-scroll],
        div[data-h-scroll] {
            &::-webkit-scrollbar {
                background-color: transparent;
                height: 6px;
                width: 4px;
            }

            &::-webkit-scrollbar-track {
                background-color: rgba(229, 229, 229, 0.5);
                border-radius: 2px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgb(193, 193, 193);
                border-radius: 2px;
            }
        }

        div[data-w=d9-section-header-title] {
            > span[data-w=d9-caption] {
                font-size: var(--d9-section-header-title-font-size);
            }
        }

        span[data-r=d9-fc-caption] {
            font-size: 12px;
            font-weight: 300;
            color: #888;
        }

        div[data-w=d9-table-header-cell],
        div[data-w=d9-table-row-index-cell],
        div[data-w=d9-table-no-data-row] {
            color: #888;
        }

        div[data-w=d9-table-header-cell] {
            text-transform: uppercase;
        }

        div[data-w=d9-dropdown][data-as-label=true][data-disabled=true] {
            background-color: transparent;
            border: 0 transparent;
            cursor: text;
            padding: 0;
            font-family: var(--d9-font-family);
            font-size: var(--d9-font-size);
            min-height: var(--d9-input-height);
            color: var(--d9-font-color);
            margin: 0;

            > span[data-clear=true] {
                display: none;
            }
        }

        div[data-w=d9-plan-selection] {
            --d9-plan-selection-background-color: ${CssVars.INVERT_COLOR};

            div[data-w=d9-plan-selection-element-header-title] {
                > span[data-w=d9-caption] {
                    &[data-plan-element-level="0"] {
                        margin-left: 0;
                    }

                    &[data-plan-element-level="1"] {
                        margin-left: ${PlanSelectionCssVars.ELEMENT_INDENT};
                    }

                    &[data-plan-element-level="2"] {
                        margin-left: calc(${PlanSelectionCssVars.ELEMENT_INDENT} * 2);
                    }

                    &[data-plan-element-level="3"] {
                        margin-left: calc(${PlanSelectionCssVars.ELEMENT_INDENT} * 3);
                    }
                }
            }
        }
    }
`;

// attach anything on window, then you can use it in snippet
window.VUtils = VUtils;
window.PPUtils = PPUtils;
window.MUtils = MUtils;
