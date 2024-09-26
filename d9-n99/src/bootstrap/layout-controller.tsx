import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {
	isBannerEnabled,
	isI18NSwitcherEnabled,
	isSideMenuEnabled,
	isSideMenuFold,
	isThemeSwitcherEnabled
} from '../utils';
import {AppEventTypes, useAppEventBus} from './app-event-bus';
import {
	ExternalMessage,
	ExternalMessageType,
	SwitchBannerMessage,
	SwitchFeatureMessage,
	SwitchI18NSwitchMessage,
	SwitchSideMenuMessage,
	SwitchThemeSwitchMessage
} from './types';

// noinspection CssUnresolvedCustomProperty
const LayoutController = styled.div.attrs({[DOM_KEY_WIDGET]: 'app-frame-layout-controller'})`
    display: none;
    position: relative;

    + div[data-w=app-frame] {
        > div[data-w=app-banner] + div[data-w=app-work-area] {
            margin-top: var(--app-banner-height);
        }
    }

    &[data-side-menu-enabled=true][data-side-menu-fold=true] + div[data-w=app-frame] {
        > div[data-w=app-side-menu] {
            width: var(--app-side-menu-fold-width);

            > div[data-w=app-side-menu-body] {
                padding: var(--app-side-menu-fold-body-padding);

                span[data-w=app-side-menu-group-label],
                span[data-w=app-side-menu-item-label] {
                    padding-left: 0;

                    span[data-type=text],
                    span[data-type=arrow] {
                        opacity: 0;
                        transition: opacity .3s ease-in-out;
                    }
                }
            }
        }

        > div[data-w=app-banner] {
            margin-left: var(--app-side-menu-fold-width);
            width: calc(100vw - var(--app-side-menu-fold-width));
            min-width: calc(100vw - var(--app-side-menu-fold-width));
        }

        > div[data-w=app-work-area] {
            margin-left: var(--app-side-menu-fold-width);
            width: calc(100vw - var(--app-side-menu-fold-width));
            min-width: calc(100vw - var(--app-side-menu-fold-width));
        }
    }

    &[data-side-menu-enabled=true][data-side-menu-fold=false] + div[data-w=app-frame] {
        > div[data-w=app-side-menu] {
            width: var(--app-side-menu-width);
        }

        > div[data-w=app-banner] {
            margin-left: var(--app-side-menu-width);
            width: calc(100vw - var(--app-side-menu-width));
            min-width: calc(100vw - var(--app-side-menu-width));
        }

        > div[data-w=app-work-area] {
            margin-left: var(--app-side-menu-width);
            width: calc(100vw - var(--app-side-menu-width));
            min-width: calc(100vw - var(--app-side-menu-width));
        }
    }

    &[data-side-menu-enabled=true][data-side-menu-fold] + div[data-w=app-frame] {
        > div[data-w=app-side-menu][data-unauthenticated=true] {
            height: var(--app-banner-height);
            min-height: var(--app-banner-height);
            max-height: var(--app-banner-height);
            background: var(--app-side-menu-unauthenticated-background);
            box-shadow: var(--app-banner-shadow);

            > div[data-w=app-side-menu-header] {
                border-bottom-color: transparent;

                > span[data-type=icon] {
                    background: var(--app-side-menu-header-logo-unauthenticated-background);
                }

                > span[data-type=fold-button] {
                    display: none;
                }
            }

            ~ div[data-w=app-work-area] {
                margin-left: 0;
                width: 100vw;
                min-width: 100vw;
            }
        }
    }
`;

interface LayoutControllerState {
	sideMenuEnabled: boolean;
	sideMenuFold: boolean;
	bannerEnabled: boolean;
	themeSwitcherEnabled: boolean;
	i18nSwitcherEnabled: boolean;
}

export const AppFrameLayoutController = () => {
	const {on, off, fire} = useAppEventBus();
	const [state, setState] = useState<LayoutControllerState>({
		sideMenuEnabled: isSideMenuEnabled(),
		sideMenuFold: isSideMenuFold(),
		bannerEnabled: isBannerEnabled(),
		themeSwitcherEnabled: isThemeSwitcherEnabled(),
		i18nSwitcherEnabled: isI18NSwitcherEnabled()
	});
	useEffect(() => {
		const onAskSideMenuEnabled = (onReply: (enabled: boolean) => void) => {
			onReply(state.sideMenuEnabled);
		};
		const onSwitchSideMenuFold = (fold: boolean) => {
			setState(state => ({...state, sideMenuFold: fold}));
		};
		const onAskBannerEnabled = (onReply: (enabled: boolean) => void) => {
			onReply(state.bannerEnabled);
		};
		const onAskThemeSwitcherEnabled = (onReply: (enabled: boolean) => void) => {
			onReply(state.themeSwitcherEnabled);
		};
		const onAskI18NSwitcherEnabled = (onReply: (enabled: boolean) => void) => {
			onReply(state.i18nSwitcherEnabled);
		};
		type SwitchFeatureOptions = { data: SwitchFeatureMessage } & (
			{ prop: 'sideMenuEnabled'; event: AppEventTypes.SWITCH_SIDE_MENU_ENABLED }
			| { prop: 'bannerEnabled', event: AppEventTypes.SWITCH_BANNER_ENABLED }
			| { prop: 'themeSwitcherEnabled', event: AppEventTypes.SWITCH_THEME_SWITCHER_ENABLED }
			| { prop: 'i18nSwitcherEnabled', event: AppEventTypes.SWITCH_I18N_SWITCHER_ENABLED }
			)

		const switchFeature = (options: SwitchFeatureOptions) => {
			const {data, prop, event} = options;
			// noinspection PointlessBooleanExpressionJS
			const enabled = !!(data.enabled ?? false);
			setState(state => ({...state, [prop]: enabled}));
			// @ts-ignore
			fire(event, enabled);
		};
		const onMessage = (event: MessageEvent<ExternalMessage>) => {
			const {data} = event;
			switch (data.type) {
				case ExternalMessageType.SWITCH_SIDE_MENU: {
					// window.postMessage({type: 'switch-side-menu', enabled: false})
					// noinspection PointlessBooleanExpressionJS
					const enabled = !!((data as SwitchSideMenuMessage).enabled ?? false);
					// retrieve side menu fold from api, make sure it is same as side menu internal state
					setState(state => ({...state, sideMenuEnabled: enabled, sideMenuFold: isSideMenuFold()}));
					fire(AppEventTypes.SWITCH_SIDE_MENU_ENABLED, enabled);
					break;
				}
				case ExternalMessageType.SWITCH_BANNER: {
					// window.postMessage({type: 'switch-banner', enabled: false})
					switchFeature({
						data: data as SwitchBannerMessage,
						prop: 'bannerEnabled', event: AppEventTypes.SWITCH_BANNER_ENABLED
					});
					break;
				}
				case ExternalMessageType.SWITCH_THEME_SWITCHER: {
					// window.postMessage({type: 'switch-theme-switcher', enabled: false})
					switchFeature({
						data: data as SwitchThemeSwitchMessage,
						prop: 'themeSwitcherEnabled', event: AppEventTypes.SWITCH_THEME_SWITCHER_ENABLED
					});
					break;
				}
				case ExternalMessageType.SWITCH_I18N_SWITCHER: {
					// window.postMessage({type: 'switch-i18n-switcher', enabled: false})
					switchFeature({
						data: data as SwitchI18NSwitchMessage,
						prop: 'i18nSwitcherEnabled', event: AppEventTypes.SWITCH_I18N_SWITCHER_ENABLED
					});
					break;
				}
				default:
					break;
			}
		};
		on(AppEventTypes.ASK_SIDE_MENU_ENABLED, onAskSideMenuEnabled);
		on(AppEventTypes.SWITCH_SIDE_MENU_FOLD, onSwitchSideMenuFold);
		on(AppEventTypes.ASK_BANNER_ENABLED, onAskBannerEnabled);
		on(AppEventTypes.ASK_THEME_SWITCHER_ENABLED, onAskThemeSwitcherEnabled);
		on(AppEventTypes.ASK_I18N_SWITCHER_ENABLED, onAskI18NSwitcherEnabled);
		window.addEventListener('message', onMessage);
		return () => {
			off(AppEventTypes.ASK_SIDE_MENU_ENABLED, onAskSideMenuEnabled);
			off(AppEventTypes.SWITCH_SIDE_MENU_FOLD, onSwitchSideMenuFold);
			off(AppEventTypes.ASK_BANNER_ENABLED, onAskBannerEnabled);
			off(AppEventTypes.ASK_THEME_SWITCHER_ENABLED, onAskThemeSwitcherEnabled);
			off(AppEventTypes.ASK_I18N_SWITCHER_ENABLED, onAskI18NSwitcherEnabled);
			window.removeEventListener('message', onMessage);
		};
	}, [on, off, fire]);

	return <LayoutController data-side-menu-enabled={state.sideMenuEnabled} data-side-menu-fold={state.sideMenuFold}
	                         data-banner-enabled={state.bannerEnabled}/>;
};
