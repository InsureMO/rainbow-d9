const STORGE_PREFIX = 'd9-n99-';
const SIDE_MENU_FOLD_KEY = `${STORGE_PREFIX}side-menu-fold`;
export const isSideMenuFold = () => localStorage.getItem(SIDE_MENU_FOLD_KEY) === 'true';
export const setSideMenuFold = (fold: boolean) => localStorage.setItem(SIDE_MENU_FOLD_KEY, fold ? 'true' : 'false');
