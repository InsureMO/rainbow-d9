import {useEffect, useState} from 'react';
import {
	getDefaultDarkThemeCode,
	getDefaultLightThemeCode,
	getDefaultThemeCode,
	isThemeEnabled,
	isThemeFollowSystem,
	isThemeFollowSystemEnabled
} from '../utils';
import {AppEventTypes, useAppEventBus} from './app-event-bus';
import {ThemeCode, ThemeKind} from './types';

export interface ThemeState {
	code: ThemeCode;
	kind: ThemeKind;
}

/**
 * get theme kind from theme code
 */
const toKind = (code: ThemeCode) => {
	switch (true) {
		case code.toLowerCase().includes('dark'):
			return ThemeKind.DARK;
		case code.toLowerCase().includes('light'):
		default:
			return ThemeKind.LIGHT;
	}
};

export const ThemeHandler = () => {
	const {on, off, fire} = useAppEventBus();
	const [state, setState] = useState<ThemeState>(() => {
		// use default theme code or by media query detection
		const code = getDefaultThemeCode()
			// when default theme code not settings, detect system prefers
			|| (window.matchMedia('(prefers-color-scheme: dark)').matches ? getDefaultDarkThemeCode() : getDefaultLightThemeCode());
		return {code, kind: toKind(code)};
	});
	useEffect(() => {
		if (isThemeEnabled()) {
			const onChangeTheme = (code: ThemeCode) => {
				const kind = toKind(code);
				setState({code, kind});
				fire(AppEventTypes.THEME_CHANGED, code, kind);
			};
			const onChangeThemeBySystem = () => {
				if (isThemeFollowSystemEnabled() && isThemeFollowSystem()) {
					const code = window.matchMedia('(prefers-color-scheme: dark)').matches ? getDefaultDarkThemeCode() : getDefaultLightThemeCode();
					onChangeTheme(code);
				}
			};
			// listen to browser theme event
			const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');
			const onThemeMediaChange = (event: MediaQueryListEvent) => {
				if (isThemeFollowSystemEnabled() && isThemeFollowSystem()) {
					// only effective when theme follows system
					const code = event.matches ? getDefaultDarkThemeCode() : getDefaultLightThemeCode();
					onChangeTheme(code);
				}
			};
			themeMedia.addEventListener('change', onThemeMediaChange);
			// listen to manual theme change event
			on(AppEventTypes.CHANGE_THEME, onChangeTheme);
			on(AppEventTypes.CHANGE_THEME_BY_SYSTEM, onChangeThemeBySystem);
			return () => {
				themeMedia.removeEventListener('change', onThemeMediaChange);
				off(AppEventTypes.CHANGE_THEME, onChangeTheme);
				off(AppEventTypes.CHANGE_THEME_BY_SYSTEM, onChangeThemeBySystem);
			};
		}
	}, [on, off, fire]);
	useEffect(() => {
		const onAskTheme = (onReply: (code: ThemeCode, kind: ThemeKind) => void) => {
			onReply(state.code, state.kind);
		};
		on(AppEventTypes.ASK_THEME, onAskTheme);
		return () => {
			off(AppEventTypes.ASK_THEME, onAskTheme);
		};
	}, [on, off, state.code, state.kind]);

	return <div data-theme-code={state.code} data-theme-kind={state.kind} style={{display: 'none'}}/>;
};