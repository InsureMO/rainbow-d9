import {useCreateEventBus} from '@rainbow-d9/n1';
import {createContext, ReactNode, useContext} from 'react';
import {ThemeCode, ThemeKind} from './types';

export enum AppEventTypes {
	CHANGE_THEME = 'change-theme', THEME_CHANGED = 'theme-changed'
}

export interface PlaygroundEventBus {
	fire(type: AppEventTypes.CHANGE_THEME, themeCode: ThemeCode): this;
	on(type: AppEventTypes.CHANGE_THEME, listener: (themeCode: ThemeCode) => void): this;
	off(type: AppEventTypes.CHANGE_THEME, listener: (themeCode: ThemeCode) => void): this;
	fire(type: AppEventTypes.THEME_CHANGED, themeCode: ThemeCode, themeKind: ThemeKind): this;
	on(type: AppEventTypes.THEME_CHANGED, listener: (themeCode: ThemeCode, themeKind: ThemeKind) => void): this;
	off(type: AppEventTypes.THEME_CHANGED, listener: (themeCode: ThemeCode, themeKind: ThemeKind) => void): this;
}

const Context = createContext<PlaygroundEventBus>({} as PlaygroundEventBus);
Context.displayName = 'AppEventBus';

export const AppEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<PlaygroundEventBus>('n99');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppEventBus = () => useContext(Context);
