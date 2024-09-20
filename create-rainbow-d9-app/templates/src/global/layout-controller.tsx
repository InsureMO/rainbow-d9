import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {isSideMenuFold} from '../utils';
import {AppEventTypes, useAppEventBus} from './app-event-bus';

// noinspection CssUnresolvedCustomProperty
const LayoutController = styled.div.attrs({[DOM_KEY_WIDGET]: 'app-frame-layout-controller'})`
    display: none;
    position: relative;

    + div[data-w=app-frame] {
    }

    &[data-side-menu-fold=true] + div[data-w=app-frame] {
        > div[data-w=app-banner] {
            margin-left: var(--app-side-menu-fold-width);
            width: calc(100vw - var(--app-side-menu-fold-width));
            min-width: calc(100vw - var(--app-side-menu-fold-width));
        }

        > div[data-w=app-side-menu] {
            width: var(--app-side-menu-fold-width);
        }
    }

    &[data-side-menu-fold=false] + div[data-w=app-frame] {
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
	sideMenuFold: boolean;
}

export const AppFrameLayoutController = () => {
	const {on, off} = useAppEventBus();
	const [state, setState] = useState<LayoutControllerState>({sideMenuFold: isSideMenuFold()});
	useEffect(() => {
		const onSwitchSideMenuFold = (fold: boolean) => {
			setState(state => ({...state, sideMenuFold: fold}));
		};
		on(AppEventTypes.SWITCH_SIDE_MENU_FOLD, onSwitchSideMenuFold);
		return () => {
			off(AppEventTypes.SWITCH_SIDE_MENU_FOLD, onSwitchSideMenuFold);
		};
	}, [on, off]);

	return <LayoutController data-side-menu-fold={state.sideMenuFold}/>;
};
