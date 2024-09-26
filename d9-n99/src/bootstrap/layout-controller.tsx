import {useForceUpdate} from '@rainbow-d9/n1';
import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {isAuthenticated} from '../services';
import {
	isBannerEnabled,
	isI18NSwitcherEnabled,
	isSideMenuBodyEnabledOnAuthOnly,
	isSideMenuEnabled,
	isSideMenuFold,
	isThemeSwitcherEnabled,
	setSideMenuFold
} from '../utils';
import {AppEventTypes, SideMenuAndBannerEnablement, useAppEventBus} from './app-event-bus';
import {
	ExternalMessage,
	ExternalMessageType,
	SwitchBannerMessage,
	SwitchFeatureMessage,
	SwitchI18NSwitchMessage,
	SwitchSideMenuMessage,
	SwitchThemeSwitchMessage
} from './types';
import {useAuthenticatedChanged} from './use-authenticated-changed';

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
            box-shadow: none;

            > div[data-w=app-side-menu-header] {
                border-bottom: var(--app-banner-bottom-border);

                > span[data-type=icon] {
                    background: var(--app-side-menu-header-logo-unauthenticated-background);
                }

                > span[data-type=text] {
                    color: var(--app-side-menu-header-text-unauthenticated-color);
                }

                > span[data-type=fold-button] {
                    display: none;
                }
            }

            ~ div[data-w=app-work-area] {
                margin-left: 0;
                width: 100vw;
                min-width: 100vw;
                transition: none;
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
	const state = useRef<LayoutControllerState>({
		sideMenuEnabled: isSideMenuEnabled(),
		sideMenuFold: isSideMenuFold(),
		bannerEnabled: isBannerEnabled(),
		themeSwitcherEnabled: isThemeSwitcherEnabled(),
		i18nSwitcherEnabled: isI18NSwitcherEnabled()
	});
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onSwitchSideMenuEnabled = (enabled: boolean) => {
			if (state.current.sideMenuEnabled !== enabled) {
				state.current.sideMenuEnabled = enabled;
				forceUpdate();
			}
		};
		const onAskSideMenuEnabled = (onReply: (enabled: boolean) => void) => {
			onReply(state.current.sideMenuEnabled);
		};
		const onSwitchSideMenuFold = (fold: boolean) => {
			if (state.current.sideMenuFold !== fold) {
				setSideMenuFold(fold);
				state.current.sideMenuFold = fold;
				forceUpdate();
			}
		};
		const onAskSideMenuFold = (onReply: (fold: boolean) => void) => {
			if (state.current.sideMenuFold) {
				const sideMenuBodyEnableOnAuthOnly = isSideMenuBodyEnabledOnAuthOnly();
				const authenticated = isAuthenticated();
				if (sideMenuBodyEnableOnAuthOnly && !authenticated) {
					// show side menu when not authenticated
					onReply(false);
				} else {
					onReply(state.current.sideMenuFold);
				}
			} else {
				onReply(state.current.sideMenuFold);
			}
		};
		const onSwitchBannerEnabled = (enabled: boolean) => {
			if (state.current.bannerEnabled !== enabled) {
				state.current.bannerEnabled = enabled;
				forceUpdate();
			}
		};
		const onAskBannerEnabled = (onReply: (enabled: boolean) => void) => {
			onReply(state.current.bannerEnabled);
		};
		const onSwitchThemeSwitcherEnabled = (enabled: boolean) => {
			if (state.current.themeSwitcherEnabled !== enabled) {
				state.current.themeSwitcherEnabled = enabled;
			}
		};
		const onAskThemeSwitcherEnabled = (onReply: (enabled: boolean) => void) => {
			onReply(state.current.themeSwitcherEnabled);
		};
		const onSwitchI18NSwitcherEnabled = (enabled: boolean) => {
			if (state.current.i18nSwitcherEnabled !== enabled) {
				state.current.i18nSwitcherEnabled = enabled;
			}
		};
		const onAskI18NSwitcherEnabled = (onReply: (enabled: boolean) => void) => {
			onReply(state.current.i18nSwitcherEnabled);
		};
		const onSwitchSideMenuAndBannerEnabled = (enablement: SideMenuAndBannerEnablement, switched?: () => void) => {
			let changed = false;
			// theme and i18n switcher must be set first.
			// in case the side menu or banner is enabled already, fire event to notify switch switcher
			// in case the side menu or banner is disabled, no listener on switcher switching, but the state is set first
			// and when the side menu or banner is enabled, the switcher renderer will check the state and render accordingly
			if (enablement.themeSwitcherEnabled != null && state.current.themeSwitcherEnabled !== enablement.themeSwitcherEnabled) {
				state.current.themeSwitcherEnabled = enablement.themeSwitcherEnabled;
				changed = true;
				fire(AppEventTypes.SWITCH_THEME_SWITCHER_ENABLED, enablement.themeSwitcherEnabled);
			}
			if (enablement.i18nSwitcherEnabled != null && state.current.i18nSwitcherEnabled !== enablement.i18nSwitcherEnabled) {
				state.current.i18nSwitcherEnabled = enablement.i18nSwitcherEnabled;
				changed = true;
				fire(AppEventTypes.SWITCH_I18N_SWITCHER_ENABLED, enablement.i18nSwitcherEnabled);
			}
			// same for side menu fold, must be set before side menu enabled
			if (enablement.sideMenuFold != null && state.current.sideMenuFold !== enablement.sideMenuFold) {
				state.current.sideMenuFold = enablement.sideMenuFold;
				changed = true;
			}
			if (enablement.sideMenuEnabled != null && state.current.sideMenuEnabled !== enablement.sideMenuEnabled) {
				state.current.sideMenuEnabled = enablement.sideMenuEnabled;
				changed = true;
				fire(AppEventTypes.SWITCH_SIDE_MENU_ENABLED, enablement.sideMenuEnabled);
			}
			if (enablement.bannerEnabled != null && state.current.bannerEnabled !== enablement.bannerEnabled) {
				state.current.bannerEnabled = enablement.bannerEnabled;
				changed = true;
				fire(AppEventTypes.SWITCH_BANNER_ENABLED, enablement.bannerEnabled);
			}
			if (changed) {
				forceUpdate();
			}
			switched?.();
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
			state.current[prop] = enabled;
			forceUpdate();
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
					state.current.sideMenuEnabled = enabled;
					state.current.sideMenuFold = isSideMenuFold();
					forceUpdate();
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
		on(AppEventTypes.SWITCH_SIDE_MENU_ENABLED, onSwitchSideMenuEnabled);
		on(AppEventTypes.ASK_SIDE_MENU_ENABLED, onAskSideMenuEnabled);
		on(AppEventTypes.SWITCH_SIDE_MENU_FOLD, onSwitchSideMenuFold);
		on(AppEventTypes.ASK_SIDE_MENU_FOLD, onAskSideMenuFold);
		on(AppEventTypes.SWITCH_BANNER_ENABLED, onSwitchBannerEnabled);
		on(AppEventTypes.ASK_BANNER_ENABLED, onAskBannerEnabled);
		on(AppEventTypes.SWITCH_THEME_SWITCHER_ENABLED, onSwitchThemeSwitcherEnabled);
		on(AppEventTypes.ASK_THEME_SWITCHER_ENABLED, onAskThemeSwitcherEnabled);
		on(AppEventTypes.SWITCH_I18N_SWITCHER_ENABLED, onSwitchI18NSwitcherEnabled);
		on(AppEventTypes.ASK_I18N_SWITCHER_ENABLED, onAskI18NSwitcherEnabled);
		on(AppEventTypes.SWITCH_SIDE_MENU_AND_BANNER_ENABLED, onSwitchSideMenuAndBannerEnabled);
		window.addEventListener('message', onMessage);
		return () => {
			off(AppEventTypes.SWITCH_SIDE_MENU_ENABLED, onSwitchSideMenuEnabled);
			off(AppEventTypes.ASK_SIDE_MENU_ENABLED, onAskSideMenuEnabled);
			off(AppEventTypes.SWITCH_SIDE_MENU_FOLD, onSwitchSideMenuFold);
			off(AppEventTypes.ASK_SIDE_MENU_FOLD, onAskSideMenuFold);
			off(AppEventTypes.SWITCH_BANNER_ENABLED, onSwitchBannerEnabled);
			off(AppEventTypes.ASK_BANNER_ENABLED, onAskBannerEnabled);
			off(AppEventTypes.SWITCH_THEME_SWITCHER_ENABLED, onSwitchThemeSwitcherEnabled);
			off(AppEventTypes.ASK_THEME_SWITCHER_ENABLED, onAskThemeSwitcherEnabled);
			off(AppEventTypes.SWITCH_I18N_SWITCHER_ENABLED, onSwitchI18NSwitcherEnabled);
			off(AppEventTypes.ASK_I18N_SWITCHER_ENABLED, onAskI18NSwitcherEnabled);
			off(AppEventTypes.SWITCH_SIDE_MENU_AND_BANNER_ENABLED, onSwitchSideMenuAndBannerEnabled);
			window.removeEventListener('message', onMessage);
		};
	}, [on, off, fire, forceUpdate]);
	useAuthenticatedChanged();

	const sideMenuBodyEnableOnAuthOnly = isSideMenuBodyEnabledOnAuthOnly();
	const authenticated = isAuthenticated();
	const sideMenuFold = (sideMenuBodyEnableOnAuthOnly && !authenticated) ? false : state.current.sideMenuFold;

	return <LayoutController data-side-menu-enabled={state.current.sideMenuEnabled}
	                         data-side-menu-fold={sideMenuFold}
	                         data-banner-enabled={state.current.bannerEnabled}/>;
};
