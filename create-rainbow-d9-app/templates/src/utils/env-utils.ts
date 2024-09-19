export const getAppName = () => import.meta.env.VITE_APP_TITLE || 'D9 Frontend';
export const isThemeEnabled = () => import.meta.env.VITE_THEME_ENABLED === 'true';
export const getDefaultThemeCode = () => import.meta.env.VITE_THEME_DEFAULT_CODE || 'light';
export const getDefaultLightThemeCode = () => import.meta.env.VITE_THEME_DEFAULT_LIGHT || 'light';
export const getDefaultDarkThemeCode = () => import.meta.env.VITE_THEME_DEFAULT_DARK || 'dark';

export const isI18NEnabled = () => import.meta.env.VITE_I18N_ENABLED === 'true';
export const getDefaultLangCode = () => import.meta.env.VITE_I18N_DEFAULT_CODE || navigator.language || 'en-US';
