import {AppTheme} from './types';

export const buildAvailableThemes = (light: AppTheme, dark: AppTheme): Array<AppTheme> => {
	return [light, dark];
};