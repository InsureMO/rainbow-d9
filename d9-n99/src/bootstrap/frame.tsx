import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {Banner} from '../header';
import {SideMenu} from '../left-side';
import {isEmptyFCErrorCollapsed} from '../utils';
import {WorkArea} from '../work-area';
import {AppFrameLayoutController} from './layout-controller';

// noinspection CssUnresolvedCustomProperty,CssNoGenericFontName
const Container = styled.div.attrs({
	[DOM_KEY_WIDGET]: 'app-frame',
	id: 'app-frame',
	'data-collapse-fc-empty-error': isEmptyFCErrorCollapsed()
})`
    display: block;
    position: relative;
    min-width: 100vw;
    min-height: 100vh;

    &[data-collapse-fc-empty-error=true] {
        div[data-w=d9-form-cell-invalid-msg]:empty {
            height: 0;
            min-height: 0;
            // padding still exists
            // padding: 0;
        }

        div[data-w=d9-button-bar] {
            &[data-narrow-up-in-search] {
                margin-top: 0;
            }
        }
    }

    div[data-w=d9-page] {
        &[data-fix-bottom-button-bar] {
            padding-bottom: var(--app-page-bottom-bar-height);
        }
    }

    div[data-w=d9-box] {
        &[data-space-grabber] {
            flex-grow: 1;
        }

        &[data-as-table-cell] {
            width: 100%;
        }

        &[data-labels] {
            gap: 8px;
        }

        &[data-dense-labels] {
            gap: 4px;
        }

        &[data-fix-title] {
            position: fixed;
            background-color: var(--app-work-area-background);
            margin: var(--app-page-fix-title-box-margin);
            padding: var(--app-page-fix-title-box-padding);
            height: var(--app-page-fix-title-box-height);
            width: 100%;
            z-index: var(--app-page-fix-title-box-z-index);

            > span[data-w=d9-caption] {
                font-family: var(--app-page-fix-title-box-font-family);
                font-size: var(--app-page-fix-title-box-font-size);
                font-weight: var(--app-page-fix-title-box-font-weight);
                color: var(--app-page-fix-title-box-font-color);
                height: unset;

                &:not(:first-child) {
                    margin-left: var(--app-page-fix-title-box-spacing);
                }
            }

            + div {
                margin-top: var(--app-page-fix-title-box-height);
            }
        }

        &[data-type-input-box] {
            display: flex;
            align-items: center;

            > *:hover + * {
                z-index: 11;
            }

            > *:first-child {
                width: auto;
                border-bottom-right-radius: 0;
                border-top-right-radius: 0;
            }

            > *:last-child {
                flex-grow: 1;
                width: auto;
                border-bottom-left-radius: 0;
                border-top-left-radius: 0;
                margin-left: -1px;
            }
        }

        &[data-as-button-bar] {
            display: flex;
            align-items: center;
            gap: var(--app-page-button-bar-spacing);

            &[data-sparse] {
                gap: calc(var(--app-page-button-bar-spacing) * 2);
            }
        }

        &[data-done-at] {
            > div[data-w=d9-dropdown]:first-child {
                width: unset;
                padding: 0;
            }

            > span[data-w=d9-caption]:last-child:not(:empty):before {
                content: ',';
                margin-right: 4px;
            }
        }

        &[data-sb-from-dept] {
            > div[data-w=d9-dropdown] {
                width: unset;
                padding: 0;
            }

            > div[data-w=d9-dropdown]:last-child:before {
                content: ',';
                margin-right: 4px;
            }
        }

        &[data-slash-joined] {
            > *:not(:first-child):before {
                content: '/';
                margin-right: 4px;
            }
        }
    }

    div[data-w=d9-section] {
        div[data-w=d9-section-header-title] {
            font-family: var(--app-section-header-title-font-family);
        }

        &[data-next-to-banner] {
            margin-top: var(--app-page-next-to-banner-margin);
        }

        &[data-2nd] div[data-w=d9-section-header-title] {
            font-size: var(--app-2nd-section-header-title-font-size);
        }
    }

    div[data-w=d9-tabs] {
        div[data-w=d9-tab-title],
        div[data-w=d9-tab-title] > span[data-w=d9-caption]:first-child,
        div[data-w=d9-tab-title] > span[data-w=d9-badge]:last-child {
            font-family: var(--app-tab-title-font-family);
        }

        div[data-w=d9-tab-title] > span[data-w=d9-badge]:last-child {
            margin-left: 12px;
        }

        div[data-w=d9-tab-body] > div[data-w=d9-section] > div[data-w=d9-section-body] > div[data-w=d9-section]:first-child {
            margin-top: calc(var(--d9-section-body-padding, 8px) * -1);
        }
    }

    div[data-w=d9-button-bar] {
        &[data-narrow-up-in-search] {
            margin-top: var(--app-page-narrow-up-in-search-margin);
        }

        &[data-fix-bottom] {
            position: fixed;
            bottom: 0;
            right: 0;
            background-color: var(--app-page-bottom-bar-background-color);
            padding: var(--app-page-bottom-bar-padding);
            height: var(--app-page-bottom-bar-height);
            border-radius: 0;
            z-index: var(--app-page-bottom-bar-z-index);
        }
    }

    div[data-w=d9-form-cell] {
        &[data-hide-caption] > span[data-r=d9-fc-caption] {
            display: none;
        }

        &[data-required=true]:not([data-hide-asterisk]) > span[data-r=d9-fc-caption]::after {
            content: '*';
            color: var(--d9-danger-color);
            margin-left: 4px;
        }

        > span[data-w=d9-caption][data-r=d9-fc-caption] {
            color: var(--app-fc-caption-color);
            font-weight: var(--app-fc-caption-font-weight);
        }
    }

    span[data-w=d9-caption] {
        &[data-as-link] {
            color: var(--d9-primary-color);
        }

        &[data-not-available] {
            font-family: var(--app-caption-not-available-font-family);
            font-size: var(--app-caption-not-available-font-size);
        }

        &[data-as-section-title] {
            font-size: var(--d9-section-header-title-font-size);
            font-weight: var(--d9-section-header-title-font-weight);

            &[data-2nd] {
                font-size: var(--app-2nd-section-header-title-font-size);
            }
        }

        &[data-vertical-list] {
            flex-direction: column;
            height: auto;

            > span[data-w=d9-caption] {
                min-height: var(--d9-input-height);

                &:not(:first-child) {
                    margin-top: -8px;
                }
            }
        }

        &[data-clickable=true][data-fill=link] {
            color: var(--d9-primary-color);
        }
    }

    div[data-w=d9-dropdown] {
        &[data-as-label][disabled],
        &[data-as-label][data-disabled=true] {
            border: 0;
            background-color: transparent;

            &:hover, &:focus-within {
                box-shadow: none;
            }
        }

        &[data-normal-placeholder] {
            > span[data-w=d9-dropdown-label][data-please=true] {
                color: var(--d9-font-color);
            }
        }
    }

    button[data-w=d9-button] {
        &[data-fit-link] {
            padding: 0;
            justify-self: flex-start;
        }
    }

    div[data-w=d9-deco-input] {
        &:hover {
            > span[data-w=d9-deco-tail] > svg {
                fill: var(--d9-primary-color);
                transition: fill var(--d9-transition-duration) var(--d9-transition-timing-function);
            }
        }

        &[data-di-eat-leads], &[data-di-eat-tails], &[data-di-eat-both] {
            border: var(--d9-border);
            border-radius: var(--d9-border-radius);
            transition: box-shadow var(--d9-transition-duration) var(--d9-transition-timing-function), border-color var(--d9-transition-duration) var(--d9-transition-timing-function);

            &:hover {
                border-color: var(--d9-primary-color);
                box-shadow: var(--d9-primary-shadow);
            }

            > input {
                border: 0;
                box-shadow: none;

                &:hover, &:focus {
                    border-color: transparent;
                    box-shadow: none;
                }
            }
        }

        &[data-di-eat-both] > span[data-w=d9-deco-lead],
        &[data-di-eat-leads] > span[data-w=d9-deco-lead],
        &[data-di-eat-both] > span[data-w=d9-deco-tail],
        &[data-di-eat-tails] > span[data-w=d9-deco-tail] {
            border: 0;
        }

        svg[data-icon=search] {
            transform: scale(0.7);
        }
    }

    div[data-w=d9-table] {
        &[data-next-to-search] {
            margin-top: var(--app-page-next-to-search-margin);
        }

        &[data-fat-row] {
            div[data-w=d9-table-row-cell] > *:first-child:last-child {
                align-self: flex-start;
            }
        }

        //&[data-operators-hover-only] {
        //    div[data-w=d9-table-row-operators] > button {
        //        pointer-events: none;
        //        opacity: 0;
        //        transition: all var(--d9-transition-duration) var(--d9-transition-timing-function);
        //    }
        //
        //    div[data-w=d9-table-row-operators]:hover > button,
        //    div[data-w=d9-table-row-cell]:hover ~ div[data-w=d9-table-row-operators] > button {
        //        pointer-events: auto;
        //        opacity: 1;
        //    }
        //
        //    div[data-w=d9-table-row-cell]:hover ~ div[data-w=d9-table-row-operators] ~ div[data-w=d9-table-row-operators] > button {
        //        pointer-events: none;
        //        opacity: 0;
        //    }
        //}

        div[data-w=d9-table-row-cell] {
            span[data-w=d9-caption]:not([data-clickable=true]) {
                color: var(--d9-font-color);
            }

            > div[data-w=d9-box] {
                width: 100%;

                > input[data-w=d9-input],
                > div[data-w=d9-dropdown],
                > div[data-w=d9-calendar] {
                    &[data-in-table-cell-and-box] {
                        width: calc(100% + calc(var(--d9-input-indent) * 2));
                        height: calc(var(--d9-table-cell-height) - 6px);
                        margin: 0 calc(var(--d9-input-indent) * -1);

                        &:not(&:hover), &:not(&:focus), &:not(&:focus-within) {
                            border-color: transparent;
                        }
                    }
                }
            }
        }

        div[data-w=d9-dropdown] {
            &[data-as-label][disabled],
            &[data-as-label][data-disabled=true] {
                height: var(--d9-input-height);
            }
        }

        div[data-w=d9-table-row-operators] {
            > button[data-w=d9-button][data-role=d9-table-row-operator] {
                &[data-r=expand], &[data-r=collapse], &[data-r=remove] {
                    transform: scale(0.9);
                }
            }

            > button[data-w=d9-button][data-role=d9-table-row-operator][data-text-row-operator] {
                width: unset;
                padding: 0 8px;

                &[data-fit-link] {
                    padding: 0;
                }
            }
        }

        [data-w=d9-table-no-data-row] {
            color: var(--app-fc-caption-color);
            font-weight: var(--app-fc-caption-font-weight);
        }
    }

    div[data-w=d9-ribs] {
        &[data-hide-header] > div[data-w=d9-rib-row] > div[data-w=d9-rib-row-header] {
            display: none;
        }

        &[data-as-section] > div[data-w=d9-rib-row] > div[data-w=d9-rib-row-header] {
            padding-left: 0;
            border-radius: 0;
            background-color: unset;
            border-bottom: var(--d9-section-header-border);

            > div[data-w=d9-rib-row-operators] {
                padding-right: 0;

                > button[data-role=expand], > button[data-role=collapse] {
                    border-color: transparent;
                    color: unset;

                    &:hover {
                        box-shadow: var(--d9-primary-hover-shadow);
                    }

                    &:focus, &:active {
                        border-color: var(--d9-primary-color);
                        background-color: var(--d9-primary-color);
                        box-shadow: var(--d9-primary-shadow);
                    }

                    &:hover, &:focus, &:active {
                        border-color: var(--d9-primary-color);
                        background-color: var(--d9-primary-color);

                        > span {
                            color: var(--d9-invert-color);
                            fill: var(--d9-invert-color);
                        }
                    }
                }
            }
        }

        > [data-w=d9-rib-no-data-row] {
            color: var(--app-fc-caption-color);
            font-weight: var(--app-fc-caption-font-weight);
        }
    }
`;

export const AppFrame = () => {
	return <>
		{/** controller for control the layout of frame */}
		<AppFrameLayoutController/>
		<Container>
			<SideMenu/>
			<Banner/>
			<WorkArea/>
		</Container>
	</>;
};
