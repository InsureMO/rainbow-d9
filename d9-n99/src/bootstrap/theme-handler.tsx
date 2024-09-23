import {useEffect, useState} from 'react';
import {ThemeCode, ThemeKind, toKind} from '../global-settings';
import {
	getDefaultDarkThemeCode,
	getDefaultLightThemeCode,
	getDefaultThemeCode,
	isThemeEnabled,
	isThemeFollowSystem,
	isThemeFollowSystemEnabled
} from '../utils';
import {AppEventTypes, useAppEventBus} from './app-event-bus';

export interface ThemeState {
	code: ThemeCode;
	kind: ThemeKind;
}

const matchPrefersTheme = () => window.matchMedia('(prefers-color-scheme: dark)');
const getThemeCodeBySystem = (matcher?: MediaQueryListEvent | MediaQueryList) => {
	return (matcher ?? matchPrefersTheme()).matches ? getDefaultDarkThemeCode() : getDefaultLightThemeCode();
};
export const ThemeHandler = () => {
	const {on, off, fire} = useAppEventBus();
	const [state, setState] = useState<ThemeState>(() => {
		let code;
		if (isThemeFollowSystemEnabled() && isThemeFollowSystem()) {
			// detect when theme follows system
			code = getThemeCodeBySystem();
		} else {
			// when default theme code not settings, detect system prefers
			code = getDefaultThemeCode() || getThemeCodeBySystem();
		}
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
					const code = getThemeCodeBySystem();
					onChangeTheme(code);
				}
			};
			// listen to browser theme event
			const themeMedia = matchPrefersTheme();
			const onThemeMediaChange = (event: MediaQueryListEvent) => {
				if (isThemeFollowSystemEnabled() && isThemeFollowSystem()) {
					// only effective when theme follows system
					const code = getThemeCodeBySystem(event);
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
