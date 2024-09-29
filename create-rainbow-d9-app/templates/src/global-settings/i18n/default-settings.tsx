import {$d9n2, IntlLabel} from '@rainbow-d9/n2';
import {buildAvailableLanguages, buildIntlLabels} from './custom-settings';
import {intlForAppEnUS} from './en-US';
import {AppLanguage, LangCode} from './types';
import {intlForAppZhCN, intlForN2ZhCN} from './zh-CN';

/**
 * available themes, using in theme switcher
 */
export const askAvailableLanguages = (): Array<AppLanguage> => {
	return buildAvailableLanguages({
		code: 'en-US',
		icon: <span data-type="lang-emoji">🇺🇸</span>, text: <IntlLabel keys={['i18n.en-US']} value="English"/>,
		active: (code: LangCode) => 'en-US' === code
	}, {
		code: 'zh-CN',
		icon: <span data-type="lang-emoji">🇨🇳</span>,
		text: <IntlLabel keys={['i18n.zh-CN']} value="Simplified Chinese"/>,
		active: (code: LangCode) => 'zh-CN' === code
	});
};

// default use en-US, language code must follow javascript standard
// add your own language labels here
const {'en-US': enUs, 'zh-CN': zhCN, ...rest} = $d9n2.intl.labels;
$d9n2.intl.labels = {
	...buildIntlLabels({
		'en-US': {...enUs, ...intlForAppEnUS},
		'zh-CN': {...zhCN, ...intlForN2ZhCN, ...intlForAppZhCN}
	}),
	...rest
};
