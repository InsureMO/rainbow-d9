import {AppLanguage} from './types';

/**
 * build available languages. customize this function to build your own
 */
export const buildAvailableLanguages = (enUs: AppLanguage, zhCN: AppLanguage): Array<AppLanguage> => {
	return [enUs, zhCN];
};
