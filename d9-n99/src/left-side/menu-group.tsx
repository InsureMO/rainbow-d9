import {useThrottler} from '@rainbow-d9/n1';
import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import ArrowIcon from '../assets/single-arrow-down.svg?react';
import {AppEventTypes, useAppEventBus} from '../bootstrap';
import {AppMenuGroup, isMenuGroup, isMenuItem, PrebuiltAppMenuCode} from '../global-settings';
import {MenuItem} from './menu-item';

interface MenuGroupProps extends AppMenuGroup {
	/** starts from 0 */
	level: number;
}

const Container = styled.div.attrs({[DOM_KEY_WIDGET]: 'app-side-menu-group'})`
    display: flex;
    position: relative;
    flex-direction: column;
`;
// noinspection CssUnresolvedCustomProperty
const Label = styled.span.attrs<{ level: number }>(({level}) => {
	return {
		[DOM_KEY_WIDGET]: 'app-side-menu-group-label',
		style: {
			'--menu-level': level
		}
	};
})<{ level: number }>`
    display: flex;
    position: relative;
    align-items: center;
    height: var(--app-side-menu-group-label-height);
    color: var(--app-side-menu-group-label-color);
    font-size: var(--app-side-menu-group-label-font-size);
    font-weight: var(--app-side-menu-group-label-font-weight);
    border-radius: var(--app-side-menu-group-border-radius);
    padding-left: calc(var(--menu-level) * var(--app-side-menu-level-indent));
    white-space: nowrap;
    cursor: pointer;
    transition: background .3s ease-in-out, padding .3s ease-in-out;

    &[data-expanded=hiding],
    &[data-expanded=showing],
    &[data-expanded=show] {
        > span[data-type=arrow] > svg {
            transform: rotateX(180deg);
        }
    }

    &:hover {
        background: var(--app-side-menu-group-label-hover-background);

        > span[data-type=icon],
        > span[data-type=text],
        > span[data-type=arrow] {
            color: var(--app-side-menu-group-label-hover-color);
        }
    }

    > span[data-type=icon],
    > span[data-type=arrow] {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        height: var(--app-side-menu-item-label-height);
        width: var(--app-side-menu-item-label-height);
        min-width: var(--app-side-menu-item-label-height);
    }

    > span[data-type=icon] {
        &:empty {
            display: none;
        }

        > svg {
            height: var(--app-side-menu-icon-size);
            width: var(--app-side-menu-icon-size);
            transition: color .3s ease-in-out;
        }
    }

    > span[data-type=text] {
        display: flex;
        position: relative;
        align-items: center;
        flex-grow: 1;
        margin-left: var(--app-side-menu-text-indent);
        transition: color .3s ease-in-out;
    }

    > span[data-type=arrow] {
        > svg {
            height: calc(var(--app-side-menu-icon-size) * 0.8);
            width: calc(var(--app-side-menu-icon-size) * 0.8);
            transition: transform .3s ease-in-out, color .3s ease-in-out;
        }
    }
`;

// noinspection CssUnresolvedCustomProperty
const Items = styled.div.attrs<{ height: number }>(({height}) => {
	return {
		[DOM_KEY_WIDGET]: 'app-side-menu-group-items',
		style: {
			'--menu-items-height': `${height}px`
		}
	};
})<{ height: number }>`
    display: flex;
    position: relative;
    flex-direction: column;
    overflow: hidden;
    transition: max-height .3s ease-in-out;

    &[data-expanded=hide] {
        max-height: 0;
    }

    &[data-expanded=showing],
    &[data-expanded=hiding] {
        max-height: var(--menu-items-height);
    }

    &[data-expanded=show] {
        max-height: unset;
    }
`;

enum ExpandState {
	HIDE = 'hide', HIDING = 'hiding', SHOWING = 'showing', SHOW = 'show'
}

interface MenuGroupState {
	enabled: boolean;
	expanded: ExpandState;
	height: number;
}

export const MenuGroup = (props: MenuGroupProps) => {
	const {code, icon, text, items, level} = props;

	const ref = useRef<HTMLDivElement>(null);
	const itemsRef = useRef<HTMLDivElement>(null);
	const {on, off, fire} = useAppEventBus();
	const {replace, clear} = useThrottler();
	const [state, setState] = useState<MenuGroupState>({enabled: false, expanded: ExpandState.HIDE, height: 0});
	useEffect(() => {
		if (state.expanded === ExpandState.SHOWING) {
			// animation ends after 300ms
			replace(() => {
				setState(state => ({...state, expanded: ExpandState.SHOW, height: 0}));
			}, 310);
		} else if (state.expanded === ExpandState.HIDING) {
			// animation starts after 10ms
			replace(() => {
				setState(state => ({...state, expanded: ExpandState.HIDE, height: 0}));
			}, 10);
		} else if (state.expanded === ExpandState.SHOW) {
			ref.current?.scrollIntoView({behavior: 'smooth', block: 'nearest'});
		}
	}, [state.expanded]);
	useEffect(() => {
		switch (code) {
			case PrebuiltAppMenuCode.THEMES: {
				const onSwitchThemeSwitcherEnabled = (enabled: boolean) => {
					setState(state => ({...state, enabled}));
				};
				on(AppEventTypes.SWITCH_THEME_SWITCHER_ENABLED, onSwitchThemeSwitcherEnabled);
				return () => {
					off(AppEventTypes.SWITCH_THEME_SWITCHER_ENABLED, onSwitchThemeSwitcherEnabled);
				};
			}
			case PrebuiltAppMenuCode.LANGUAGES: {
				const onSwitchI18NSwitcherEnabled = (enabled: boolean) => {
					setState(state => ({...state, enabled}));
				};
				on(AppEventTypes.SWITCH_I18N_SWITCHER_ENABLED, onSwitchI18NSwitcherEnabled);
				return () => {
					off(AppEventTypes.SWITCH_I18N_SWITCHER_ENABLED, onSwitchI18NSwitcherEnabled);
				};
			}
			default:
				setState(state => ({...state, enabled: true}));
				break;
		}
	}, [on, off]);
	useEffect(() => {
		switch (code) {
			case PrebuiltAppMenuCode.THEMES: {
				fire(AppEventTypes.ASK_THEME_SWITCHER_ENABLED, (enabled: boolean) => {
					setState(state => ({...state, enabled}));
				});
				break;
			}
			case PrebuiltAppMenuCode.LANGUAGES: {
				fire(AppEventTypes.ASK_I18N_SWITCHER_ENABLED, (enabled: boolean) => {
					setState(state => ({...state, enabled}));
				});
				break;
			}
			default:
				break;
		}
	}, []);

	if (!state.enabled || items == null || items.length === 0) {
		// no menu item, there is no need to show this group
		return null;
	}

	const onGroupLabelClicked = () => {
		const height = itemsRef.current!.scrollHeight;
		if (state.expanded === ExpandState.HIDE) {
			setState(state => ({...state, expanded: ExpandState.SHOWING, height}));
		} else {
			clear(false);
			setState(state => ({...state, expanded: ExpandState.HIDING, height}));
		}
	};

	return <Container data-expanded={state.expanded} ref={ref}>
		<Label level={level} data-expanded={state.expanded} onClick={onGroupLabelClicked}>
			<span data-type="icon">{icon}</span>
			<span data-type="text">{text}</span>
			<span data-type="arrow"><ArrowIcon/></span>
		</Label>
		<Items data-expanded={state.expanded} height={state.height} ref={itemsRef}>
			{items.map(menu => {
				if (isMenuGroup(menu)) {
					return <MenuGroup key={menu.code} {...menu} level={level + 1}/>;
				} else if (isMenuItem(menu)) {
					return <MenuItem key={menu.code} {...menu} level={level + 1}/>;
				} else {
					return null;
				}
			})}
		</Items>
	</Container>;
};
