export const getAppName = () => import.meta.env.VITE_APP_TITLE || 'Frontend';
export const isThemeEnabled = () => import.meta.env.VITE_THEME_ENABLED === 'true';
export const getDefaultThemeCode = () => import.meta.env.VITE_THEME_DEFAULT_CODE;
export const getDefaultLightThemeCode = () => import.meta.env.VITE_THEME_DEFAULT_LIGHT || 'light';
export const getDefaultDarkThemeCode = () => import.meta.env.VITE_THEME_DEFAULT_DARK || 'dark';
export const isThemeFollowSystemEnabled = () => import.meta.env.VITE_THEME_FOLLOW_SYSTEM === 'true';

export const isI18NEnabled = () => import.meta.env.VITE_I18N_ENABLED === 'true';
export const getDefaultLangCode = () => import.meta.env.VITE_I18N_DEFAULT_CODE || navigator.language || 'en-US';

export const isSideMenuEnabled = () => import.meta.env.VITE_DISABLE_SIDE_MENU !== 'true';
export const isBannerEnabled = () => import.meta.env.VITE_DISABLE_BANNER !== 'true';
export const isThemeSwitcherEnabled = () => isThemeEnabled() && import.meta.env.VITE_DISABLE_THEME_SWITCHER !== 'true';
export const isI18NSwitcherEnabled = () => isI18NEnabled() && import.meta.env.VITE_DISABLE_I18N_SWITCHER !== 'true';
export const isUserProfileEnabled = () => import.meta.env.VITE_DISABLE_USER_PROFILE !== 'true';
