import {useEffect, useState} from 'react';
import {getDefaultDarkThemeCode, getDefaultLightThemeCode, getDefaultThemeCode, isThemeEnabled} from '../utils';
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
		const code = getDefaultThemeCode() || (window.matchMedia('(prefers-color-scheme: dark)').matches ? getDefaultDarkThemeCode() : getDefaultLightThemeCode());
		return {code, kind: toKind(code)};
	});
	useEffect(() => {
		if (isThemeEnabled()) {
			const onChangeTheme = (code: ThemeCode) => {
				const kind = toKind(code);
				setState({code, kind});
				fire(AppEventTypes.THEME_CHANGED, code, kind);
			};
			// listen to browser theme event
			const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');
			const onThemeMediaChange = (event: MediaQueryListEvent) => {
				const code = event.matches ? getDefaultDarkThemeCode() : getDefaultLightThemeCode();
				onChangeTheme(code);
			};
			themeMedia.addEventListener('change', onThemeMediaChange);
			// listen to manual theme change event
			on(AppEventTypes.CHANGE_THEME, onChangeTheme);
			return () => {
				themeMedia.removeEventListener('change', onThemeMediaChange);
				off(AppEventTypes.CHANGE_THEME, onChangeTheme);
			};
		}
	}, [on, off, fire]);

	return <div data-theme-code={state.code} data-theme-kind={state.kind} style={{display: 'none'}}/>;
};