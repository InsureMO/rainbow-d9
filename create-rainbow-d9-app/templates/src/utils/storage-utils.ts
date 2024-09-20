const SIDE_MENU_FOLD_KEY = 'sideMenuFold';
export const isSideMenuFold = () => localStorage.getItem(SIDE_MENU_FOLD_KEY) === 'true';
export const setSideMenuFold = (fold: boolean) => localStorage.setItem(SIDE_MENU_FOLD_KEY, fold ? 'true' : 'false');
