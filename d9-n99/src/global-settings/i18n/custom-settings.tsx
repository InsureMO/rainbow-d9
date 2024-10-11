import {$D9N2I18NLabels, $D9N2LanguagePacks} from '@rainbow-d9/n2';
import {AppLanguage} from './types';

/**
 * build available languages. customize this function to build your own
 */
export const buildAvailableLanguages = (enUs: AppLanguage, zhCN: AppLanguage): Array<AppLanguage> => {
	return [enUs, zhCN];
};

export const buildIntlLabels = (packs: { 'en-US': $D9N2I18NLabels, 'zh-CN': $D9N2I18NLabels }): $D9N2LanguagePacks => {
	return packs;
};
