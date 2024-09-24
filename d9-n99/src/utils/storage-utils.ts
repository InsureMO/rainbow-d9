import {ThemeCode} from '../global-settings';

const STORAGE_PREFIX = 'd9-n99-';
const SIDE_MENU_FOLD_KEY = `${STORAGE_PREFIX}side-menu-fold`;
export const isSideMenuFold = () => localStorage.getItem(SIDE_MENU_FOLD_KEY) === 'true';
export const setSideMenuFold = (fold: boolean) => localStorage.setItem(SIDE_MENU_FOLD_KEY, fold ? 'true' : 'false');

const THEME_KEY = `${STORAGE_PREFIX}theme`;
export const isThemeFollowSystem = () => localStorage.getItem(THEME_KEY) === 'system';
export const setThemeFollowSystem = () => localStorage.setItem(THEME_KEY, 'system');
export const getThemeCode = (): ThemeCode | undefined => ((localStorage.getItem(THEME_KEY) as ThemeCode) ?? '').trim() || (void 0);
export const setThemeCode = (code: ThemeCode) => localStorage.setItem(THEME_KEY, code);
