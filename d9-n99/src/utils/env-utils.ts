// app
export const getAppName = () => import.meta.env.VITE_APP_TITLE || 'Frontend';
// theme
export const isThemeEnabled = () => import.meta.env.VITE_THEME_ENABLED === 'true';
export const getDefaultThemeCode = () => import.meta.env.VITE_THEME_DEFAULT_CODE;
export const getDefaultLightThemeCode = () => import.meta.env.VITE_THEME_DEFAULT_LIGHT || 'light';
export const getDefaultDarkThemeCode = () => import.meta.env.VITE_THEME_DEFAULT_DARK || 'dark';
export const isThemeFollowSystemEnabled = () => isThemeEnabled() && import.meta.env.VITE_THEME_FOLLOW_SYSTEM === 'true';
// i18n
export const isI18NEnabled = () => import.meta.env.VITE_I18N_ENABLED === 'true';
export const getDefaultLangCode = () => import.meta.env.VITE_I18N_DEFAULT_CODE || navigator.language || 'en-US';
// side menu and banner
export const isSideMenuEnabled = () => import.meta.env.VITE_DISABLE_SIDE_MENU !== 'true';
export const isBannerEnabled = () => import.meta.env.VITE_DISABLE_BANNER !== 'true';
export const isThemeSwitcherEnabled = () => isThemeEnabled() && import.meta.env.VITE_DISABLE_THEME_SWITCHER !== 'true';
export const isI18NSwitcherEnabled = () => isI18NEnabled() && import.meta.env.VITE_DISABLE_I18N_SWITCHER !== 'true';
export const isUserProfileEnabled = () => import.meta.env.VITE_DISABLE_USER_PROFILE !== 'true';
export const isSideMenuBodyEnabledOnAuthOnly = () => import.meta.env.VITE_SIDE_MENU_BODY_ENABLED_ON_AUTH_ONLY !== 'false';
// routes
export const getBaseContext = (): string | undefined => import.meta.env.BASE_URL || (void 0);
export const getHomeRoute = (): string => import.meta.env.VITE_HOME_PAGE || '/home';
export const getUnauthenticatedRoute = (): string => import.meta.env.VITE_UNAUTHENTICATED_PAGE || '/unauthenticated';
// authentication
export const isAuthenticationEnabled = () => import.meta.env.VITE_AUTHENTICATION_ENABLED !== 'false';
