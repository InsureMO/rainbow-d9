const STORAGE_PREFIX = 'd9-n99-';
const SIDE_MENU_FOLD_KEY = `${STORAGE_PREFIX}side-menu-fold`;
export const isSideMenuFold = () => localStorage.getItem(SIDE_MENU_FOLD_KEY) === 'true';
export const setSideMenuFold = (fold: boolean) => localStorage.setItem(SIDE_MENU_FOLD_KEY, fold ? 'true' : 'false');

const THEME_FOLLOW_SYSTEM_KEY = `${STORAGE_PREFIX}theme-follow-system`;
export const isThemeFollowSystem = () => localStorage.getItem(THEME_FOLLOW_SYSTEM_KEY) === 'true';
export const setThemeFollowSystem = (follow: boolean) => localStorage.setItem(THEME_FOLLOW_SYSTEM_KEY, follow ? 'true' : 'false');
