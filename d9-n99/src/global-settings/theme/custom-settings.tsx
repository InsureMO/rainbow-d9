import {AppTheme, ThemeCode, ThemeKind} from './types';

export const buildAvailableThemes = (light: AppTheme, dark: AppTheme): Array<AppTheme> => {
	return [light, dark];
};

export const customToKind = (_code: ThemeCode): ThemeKind | undefined => {
	return (void 0);
};
