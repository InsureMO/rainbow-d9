import {DOM_KEY_WIDGET, IntlLabel} from '@rainbow-d9/n2';
import {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import FoldMenu from '../assets/double-alt-arrow-left.svg?react';
import Logo from '../assets/logo.svg?react';
import {AppEventTypes, useAppEventBus} from '../global';
import {isSideMenuFold, setSideMenuFold} from '../utils';

// noinspection CssUnresolvedCustomProperty,CssNoGenericFontName
const Header = styled.div.attrs({[DOM_KEY_WIDGET]: 'app-side-menu-header'})`
    display: grid;
    position: relative;
    grid-template-columns: var(--app-side-menu-header-height) 1fr auto;
    align-items: center;
    height: var(--app-side-menu-header-height);
    padding-right: var(--app-side-menu-padding);
    border-bottom: var(--app-side-menu-header-bottom-border);

    > span:first-child {
        display: flex;
        position: relative;
        align-items: center;
        justify-self: center;
        justify-content: center;
        height: calc(var(--app-side-menu-header-height) * 0.5);
        width: calc(var(--app-side-menu-header-height) * 0.5);
        border-radius: calc(var(--app-side-menu-header-height) * 0.5 / 3);
        background: white;

        > svg {
            // LOGO
            margin-top: calc(var(--app-side-menu-header-height) * -0.02);
            height: calc(var(--app-side-menu-header-height) * 0.35);
            width: calc(var(--app-side-menu-header-height) * 0.35);
            color: var(--app-logo-color);
            filter: drop-shadow(-2px -1px 0px var(--app-logo-color-2)) drop-shadow(2px 1px 0px var(--app-logo-color-3));
        }
    }

    > span:nth-child(2) {
        display: block;
        position: relative;
        align-items: center;
        color: var(--app-side-menu-header-text-color);
        font-family: var(--app-side-menu-header-font-family);
        font-size: var(--app-side-menu-header-font-size);
        font-weight: var(--app-side-menu-header-font-weight);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    > span:last-child {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        height: var(--app-side-menu-header-fold-button-size);
        width: var(--app-side-menu-header-fold-button-size);
        border-radius: calc(var(--app-side-menu-header-fold-button-size) / 5);
        background: var(--app-side-menu-header-fold-button-background);
        cursor: pointer;

        &[data-fold=true] > svg {
            transform: rotateY(180deg);
        }

        &:hover > svg {
            color: var(--app-side-menu-header-fold-button-hover-color);
        }

        > svg {
            height: 60%;
            width: 75%;
            color: var(--app-side-menu-header-fold-button-color);
            transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
        }
    }
`;

interface SideMenuHeaderState {
	fold: boolean; // is fold or not, could be unfolded when mouse hover
	foldOnHandsOff: boolean; // is folded or not
}

export const SideMenuHeader = () => {
	const {fire} = useAppEventBus();
	const ref = useRef<HTMLDivElement>(null);
	const [state, setState] = useState<SideMenuHeaderState>(() => {
		const fold = isSideMenuFold();
		// initial same
		return {fold, foldOnHandsOff: fold};
	});
	useEffect(() => {
		if (ref.current == null) {
			return;
		}
		const onMouseEnter = () => {
			if (!state.fold) {
				return;
			}
			setSideMenuFold(false);
			setState(state => ({...state, fold: false}));
			fire(AppEventTypes.SWITCH_SIDE_MENU_FOLD, false);
		};
		const onMouseLeave = () => {
			if (!state.foldOnHandsOff) {
				return;
			}
			setSideMenuFold(true);
			setState(state => ({...state, fold: true}));
			fire(AppEventTypes.SWITCH_SIDE_MENU_FOLD, true);
		};
		ref.current.parentElement!.addEventListener('mouseenter', onMouseEnter);
		ref.current.parentElement!.addEventListener('mouseleave', onMouseLeave);
		return () => {
			ref.current?.parentElement?.removeEventListener('mouseenter', onMouseEnter);
			ref.current?.parentElement?.removeEventListener('mouseleave', onMouseLeave);
		};
	}, [fire, state.fold, state.foldOnHandsOff]);

	const onFoldSwitchClick = () => {
		if (state.foldOnHandsOff) {
			setSideMenuFold(false);
			setState({fold: false, foldOnHandsOff: false});
			fire(AppEventTypes.SWITCH_SIDE_MENU_FOLD, false);
		} else {
			setSideMenuFold(true);
			setState({fold: true, foldOnHandsOff: true});
			fire(AppEventTypes.SWITCH_SIDE_MENU_FOLD, true);
		}
	};

	return <Header data-fold={state.fold} data-fold-on-hands-off={state.foldOnHandsOff} ref={ref}>
		<span><Logo/></span>
		<span><IntlLabel keys={['app.name']} value="n99"/></span>
		<span onClick={onFoldSwitchClick} data-fold={state.foldOnHandsOff}><FoldMenu/></span>
	</Header>;
};
