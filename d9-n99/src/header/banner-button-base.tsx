import {useCreateEventBus, useThrottler} from '@rainbow-d9/n1';
import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import styled from 'styled-components';

interface BannerButtonBaseProps {
	widget: string;
	children: ReactNode;
}

enum BannerMenuVisibleState {
	HIDE = 'hide', READY = 'ready', SHOW = 'show'
}

interface BannerButtonBaseState {
	visible: BannerMenuVisibleState;
}

// noinspection CssUnresolvedCustomProperty
const Container = styled.div.attrs({'data-type': 'banner-button'})`
    display: flex;
    position: relative;
    align-items: center;

    &[data-menu-visible=hide] {
        > div[data-menu] {
            display: none;
            opacity: 0;
            margin-top: 1.5em;
            pointer-events: none;
        }
    }

    &[data-menu-visible=ready] {
        > div[data-menu] {
            opacity: 0;
            margin-top: 1.5em;
            pointer-events: none;
        }
    }

    &[data-menu-visible=show] {
        > div[data-menu] {
            opacity: 1;
            margin-top: -0.5em;
        }
    }

    > div[data-menu] {
        position: absolute;
        top: 100%;
        right: 0;
        transition: opacity .3s ease-in-out, margin-top .3s ease-in-out;
    }


    + div[data-type=banner-button] {
        margin-left: var(--app-banner-button-gap);
    }
`;

enum BannerButtonEventTypes {
	HIDE = 'hide'
}

interface BannerButtonEventBus {
	fire(type: BannerButtonEventTypes.HIDE): this;
	on(type: BannerButtonEventTypes.HIDE, listener: () => void): this;
	off(type: BannerButtonEventTypes.HIDE, listener: () => void): this;
}

const Context = createContext<BannerButtonEventBus>({} as BannerButtonEventBus);
Context.displayName = 'AppEventBus';

const BannerButtonEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<BannerButtonEventBus>('banner-button');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

const useBannerButtonEventBus = () => useContext(Context);

const BannerButtonBaseContainer = (props: BannerButtonBaseProps) => {
	const {widget, children} = props;
	const {replace, clear} = useThrottler();
	const {on, off} = useBannerButtonEventBus();
	const [state, setState] = useState<BannerButtonBaseState>({visible: BannerMenuVisibleState.HIDE});
	useEffect(() => {
		// 10ms for transition
		replace(() => {
			if (state.visible === BannerMenuVisibleState.READY) {
				setState(state => ({...state, visible: BannerMenuVisibleState.SHOW}));
			}
		}, 10);
	}, [state.visible]);
	useEffect(() => {
		const onHide = () => {
			setState(state => ({...state, visible: BannerMenuVisibleState.HIDE}));
		};
		on(BannerButtonEventTypes.HIDE, onHide);
		return () => {
			off(BannerButtonEventTypes.HIDE, onHide);
		};
	}, [on, off]);

	const onMouseEnter = () => {
		replace(() => {
			if (state.visible === BannerMenuVisibleState.HIDE) {
				setState(state => ({...state, visible: BannerMenuVisibleState.READY}));
			}
		}, 30);
	};
	const onMouseLeave = () => {
		clear(false);
		replace(() => {
			setState(state => ({...state, visible: BannerMenuVisibleState.HIDE}));
		}, 30);
	};

	return <Container data-w={widget} data-menu-visible={state.visible}
	                  onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
		{children}
	</Container>;
};

export const BannerButtonBase = (props: BannerButtonBaseProps) => {
	const {children, ...rest} = props;
	return <BannerButtonEventBusProvider>
		<BannerButtonBaseContainer {...rest}>
			{children}
		</BannerButtonBaseContainer>
	</BannerButtonEventBusProvider>;
};

// noinspection CssUnresolvedCustomProperty
export const BannerButton = styled.div.attrs({[DOM_KEY_WIDGET]: 'app-banner-button'})`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    height: var(--app-banner-button-size);
    width: var(--app-banner-button-size);
    border-radius: var(--app-banner-button-border-radius);
    cursor: pointer;
    transition: background .3s ease-in-out;

    &:hover {
        background: var(--app-banner-button-hover-background);

        > svg {
            color: var(--app-banner-button-hover-color);
        }
    }

    > svg {
        height: calc(var(--app-banner-button-size) * 0.6);
        width: calc(var(--app-banner-button-size) * 0.6);
        transition: color .3s ease-in-out;
    }

    > span[data-type=lang-emoji] {
        font-size: var(--app-banner-button-lang-emoji-size);
        margin: var(--app-banner-button-lang-emoji-margin);
    }
`;

// noinspection CssUnresolvedCustomProperty
const BannerButtonMenuContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'app-banner-button-menu'})`
    display: flex;
    flex-direction: column;
    min-width: var(--app-banner-menu-min-width);
    padding: var(--app-banner-button-menu-padding);
    border-radius: var(--app-banner-button-menu-border-radius);
    box-shadow: var(--app-banner-button-menu-shadow);
    background: var(--app-banner-button-menu-background);
    overflow: hidden;
    z-index: 1;
`;

export const BannerButtonMenu = (props: { children: ReactNode }) => {
	const {children} = props;

	return <BannerButtonMenuContainer data-menu>
		{children}
	</BannerButtonMenuContainer>;
};

interface BannerButtonMenuItemProps {
	// icon should be a svg element
	icon: ReactNode;
	// text should be a span element
	text: ReactNode;
	active: boolean;
	click: () => void;
}

// noinspection CssUnresolvedCustomProperty
const BannerButtonMenuItemContainer = styled.div.attrs({[DOM_KEY_WIDGET]: 'app-banner-button-menu-item'})`
    display: grid;
    position: relative;
    grid-template-columns: var(--app-banner-button-menu-item-icon-size) 1fr;
    align-items: center;
    height: var(--app-banner-button-menu-item-height);
    padding: var(--app-banner-button-menu-item-padding);
    border-radius: var(--app-banner-button-menu-item-border-radius);
    white-space: nowrap;
    cursor: pointer;
    transition: color .3s ease-in-out, background .3s ease-in-out;

    &[data-active=true] {
        color: var(--app-banner-button-menu-item-active-color);
        background: var(--app-banner-button-menu-item-active-background);
    }

    &[data-active=false]:hover {
        color: var(--app-banner-button-menu-item-hover-color);
        background: var(--app-banner-button-menu-item-hover-background);
    }

    > svg:first-child {
        height: calc(var(--app-banner-button-menu-item-icon-size) * 0.6);
        width: calc(var(--app-banner-button-menu-item-icon-size) * 0.6);
    }

    > span[data-type=lang-emoji]:first-child {
        font-size: var(--app-banner-button-menu-item-lang-emoji-size);
        margin: var(--app-banner-button-menu-item-lang-emoji-margin);
    }

    > span:last-child {
        display: flex;
        position: relative;
        align-items: center;
    }
`;

export const BannerButtonMenuItem = (props: BannerButtonMenuItemProps) => {
	const {icon, text, active, click} = props;

	const {fire} = useBannerButtonEventBus();

	const onClick = () => {
		fire(BannerButtonEventTypes.HIDE);
		click();
	};

	return <BannerButtonMenuItemContainer data-active={active} onClick={onClick}>
		{icon}
		{text}
	</BannerButtonMenuItemContainer>;
};
