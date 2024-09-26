import {LangCode, ThemeCode} from '../global-settings';
import {Authentication} from '../services';
import {isBlank} from './data-utils';

const STORAGE_PREFIX = 'd9-n99-';
const SIDE_MENU_FOLD_KEY = `${STORAGE_PREFIX}side-menu-fold`;
export const isSideMenuFold = () => localStorage.getItem(SIDE_MENU_FOLD_KEY) === 'true';
export const setSideMenuFold = (fold: boolean) => localStorage.setItem(SIDE_MENU_FOLD_KEY, fold ? 'true' : 'false');

const THEME_KEY = `${STORAGE_PREFIX}theme`;
export const isThemeFollowSystem = () => localStorage.getItem(THEME_KEY) === 'system';
export const setThemeFollowSystem = () => localStorage.setItem(THEME_KEY, 'system');
export const getThemeCode = (): ThemeCode | undefined => ((localStorage.getItem(THEME_KEY) as ThemeCode) ?? '').trim() || (void 0);
export const setThemeCode = (code: ThemeCode) => localStorage.setItem(THEME_KEY, code);

const LANGUAGE_KEY = `${STORAGE_PREFIX}language`;
export const getLangCode = (): LangCode | undefined => ((localStorage.getItem(LANGUAGE_KEY) as LangCode) ?? '').trim() || (void 0);
export const setLangCode = (code: LangCode) => localStorage.setItem(LANGUAGE_KEY, code);

const AUTH_KEY = `${STORAGE_PREFIX}auth`;
export const getAuthentication = (): Authentication | undefined => {
	const authInStorage = sessionStorage.getItem(AUTH_KEY);
	if (authInStorage == null || authInStorage.trim().length === 0) {
		return (void 0);
	}
	try {
		const auth = JSON.parse(atob(authInStorage)) as Authentication;
		if (isBlank(auth.displayName) || isBlank(auth.token)) {
			return (void 0);
		} else {
			return auth;
		}
	} catch {
		return (void 0);
	}
};
export const setAuthentication = (auth: Authentication) => {
	sessionStorage.setItem(AUTH_KEY, btoa(JSON.stringify(auth)));
};
