import {$d9n2, $D9N2I18NLabels, IntlLabel} from '@rainbow-d9/n2';
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

/**
 * be careful, don't replace the exists labels unless you know what you are doing
 */
const registerIntlLabels = (pageKey: string, lang: LangCode, labels: $D9N2I18NLabels) => {
	let pack = $d9n2.intl.labels[lang];
	if (pack == null) {
		pack = {};
		$d9n2.intl.labels[lang] = pack;
	}
	pack[pageKey] = labels;
};

class IntlLabelsRegistrarForPageAndLang {
	constructor(private forPage: IntlLabelsRegistrarForPage, private langCode: LangCode) {
	}

	public labels(labels: $D9N2I18NLabels) {
		registerIntlLabels(this.forPage.pageKey, this.langCode, labels);
		return this.forPage;
	}
}

class IntlLabelsRegistrarForPage {
	constructor(public pageKey: string) {
	}

	public lang(langCode: LangCode) {
		return new IntlLabelsRegistrarForPageAndLang(this, langCode);
	}
}

export const registerPageIntlLabels = (pageKey: string): IntlLabelsRegistrarForPage => {
	return new IntlLabelsRegistrarForPage(pageKey);
};


