export const isThemeEnabled = () => import.meta.env.VITE_THEME_ENABLED === 'true';
export const getDefaultThemeCode = () => import.meta.env.VITE_THEME_DEFAULT_CODE || 'light';
export const getDefaultLightThemeCode = () => import.meta.env.VITE_THEME_DEFAULT_LIGHT || 'light';
export const getDefaultDarkThemeCode = () => import.meta.env.VITE_THEME_DEFAULT_DARK || 'dark';