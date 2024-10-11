import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import styled from 'styled-components';
import {Banner} from '../header';
import {SideMenu} from '../left-side';
import {WorkArea} from '../work-area';
import {AppFrameLayoutController} from './layout-controller';

// noinspection CssUnresolvedCustomProperty
const Container = styled.div.attrs({[DOM_KEY_WIDGET]: 'app-frame'})`
    display: block;
    position: relative;
    min-width: 100vw;
    min-height: 100vh;

    div[data-w=d9-box] {
        &[data-type-input-box] {
            display: flex;
            align-items: center;

            > *:hover {
                z-index: 1;
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
    }

    div[data-w=d9-section] {
        &[data-next-to-banner] {
            margin-top: var(--app-page-next-to-banner-margin);
        }
    }

    div[data-w=d9-button-bar] {
        &[data-narrow-up-in-search] {
            margin-top: var(--app-page-narrow-up-in-search-margin);
        }
    }

    div[data-w=d9-form-cell] {
        &[data-hide-caption] > span[data-r=d9-fc-caption] {
            display: none;
        }
    }

    span[data-w=d9-caption] {
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
            border-color: transparent;
            background-color: transparent;

            &:hover, &:focus-within {
                border-color: transparent;
                box-shadow: none;
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
        }

        div[data-w=d9-dropdown] {
            &[data-as-label][disabled],
            &[data-as-label][data-disabled=true] {
                height: var(--d9-input-height);
            }
        }

        div[data-w=d9-table-row-operators] {
            > button[data-w=d9-button][data-role=d9-table-row-operator][data-text-row-operator] {
                width: unset;
                padding: 0 8px;
            }
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
