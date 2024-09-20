import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {isBannerEnabled, isSideMenuEnabled, isSideMenuFold} from '../utils';
import {AppEventTypes, useAppEventBus} from './app-event-bus';
import {ExternalMessage, ExternalMessageType, SwitchBannerMessage, SwitchSideMenuMessage} from './types';

// noinspection CssUnresolvedCustomProperty
const LayoutController = styled.div.attrs({[DOM_KEY_WIDGET]: 'app-frame-layout-controller'})`
    display: none;
    position: relative;

    + div[data-w=app-frame] {
    }

    &[data-side-menu-enabled=true][data-side-menu-fold=true] + div[data-w=app-frame] {
        > div[data-w=app-banner] {
            margin-left: var(--app-side-menu-fold-width);
            width: calc(100vw - var(--app-side-menu-fold-width));
            min-width: calc(100vw - var(--app-side-menu-fold-width));
        }

        > div[data-w=app-side-menu] {
            width: var(--app-side-menu-fold-width);
        }
    }

    &[data-side-menu-enabled=true][data-side-menu-fold=false] + div[data-w=app-frame] {
        > div[data-w=app-banner] {
            margin-left: var(--app-side-menu-width);
            width: calc(100vw - var(--app-side-menu-width));
            min-width: calc(100vw - var(--app-side-menu-width));
        }

        > div[data-w=app-side-menu] {
            width: var(--app-side-menu-width);
        }
    }
`;

interface LayoutControllerState {
	sideMenuEnabled: boolean;
	sideMenuFold: boolean;
	bannerEnabled: boolean;
}

export const AppFrameLayoutController = () => {
	const {on, off, fire} = useAppEventBus();
	const [state, setState] = useState<LayoutControllerState>({
		sideMenuEnabled: isSideMenuEnabled(),
		sideMenuFold: isSideMenuFold(),
		bannerEnabled: isBannerEnabled()
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
		const onMessage = (event: MessageEvent<ExternalMessage>) => {
			const {data} = event;
			switch (data.type) {
				case ExternalMessageType.SWITCH_SIDE_MENU: {
					// window.postMessage({type: 'switch-side-menu', enabled: false})
					// noinspection PointlessBooleanExpressionJS
					const enabled = !!((data as SwitchSideMenuMessage).enabled ?? false);
					setState(state => ({...state, sideMenuEnabled: enabled}));
					fire(AppEventTypes.SWITCH_SIDE_MENU_ENABLED, enabled);
					break;
				}
				case ExternalMessageType.SWITCH_BANNER: {
					// window.postMessage({type: 'switch-banner', enabled: false})
					// noinspection PointlessBooleanExpressionJS
					const enabled = !!((data as SwitchBannerMessage).enabled ?? false);
					setState(state => ({...state, bannerEnabled: enabled}));
					fire(AppEventTypes.SWITCH_BANNER_ENABLED, enabled);
					break;
				}
				default:
					break;
			}
		};
		on(AppEventTypes.ASK_SIDE_MENU_ENABLED, onAskSideMenuEnabled);
		on(AppEventTypes.SWITCH_SIDE_MENU_FOLD, onSwitchSideMenuFold);
		on(AppEventTypes.ASK_BANNER_ENABLED, onAskBannerEnabled);
		window.addEventListener('message', onMessage);
		return () => {
			off(AppEventTypes.ASK_SIDE_MENU_ENABLED, onAskSideMenuEnabled);
			off(AppEventTypes.SWITCH_SIDE_MENU_FOLD, onSwitchSideMenuFold);
			off(AppEventTypes.ASK_BANNER_ENABLED, onAskBannerEnabled);
			window.removeEventListener('message', onMessage);
		};
	}, [on, off, fire]);

	return <LayoutController data-side-menu-enabled={state.sideMenuEnabled} data-side-menu-fold={state.sideMenuFold}
	                         data-banner-enabled={state.bannerEnabled}/>;
};
