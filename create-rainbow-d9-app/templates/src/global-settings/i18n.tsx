import {$d9n2, IntlLabel} from '@rainbow-d9/n2';
import {ReactNode} from 'react';
import {getAppName} from '../utils';

/** lang code must follow javascript standard */
export type LangCode = string;

export interface AppLanguage {
	code: LangCode;
	icon: ReactNode;
	text: ReactNode;
	active: (code: LangCode) => boolean;
}

/**
 * available themes, using in theme switcher
 */
export const askAvailableLanguages = (): Array<AppLanguage> => {
	return [
		{
			code: 'en-US',
			icon: <span data-type="lang-emoji">🇺🇸</span>, text: <IntlLabel keys={['i18n.en-US']} value="English"/>,
			active: (code: LangCode) => 'en-US' === code
		},
		{
			code: 'zh-CN',
			icon: <span data-type="lang-emoji">🇨🇳</span>,
			text: <IntlLabel keys={['i18n.zh-CN']} value="Simplified Chinese"/>,
			active: (code: LangCode) => 'zh-CN' === code
		}
	];
};

// default use en-US, language code must follow javascript standard
// add your own language labels here
const {'en-US': enUs, 'zh-CN': zhCN, ...rest} = $d9n2.intl.labels;
$d9n2.intl.labels = {
	'en-US': {
		...enUs,
		app: {name: getAppName()},
		theme: {light: 'Light', dark: 'Dark', system: 'Follow System'},
		i18n: {'en-US': 'English', 'zh-CN': 'Simplified Chinese'}
	},
	'zh-CN': {
		...zhCN,
		alert: {confirm: '确认'},
		dialog: {confirm: '是', discard: '否'},
		options: {noAvailable: '没有可选项.', noMatched: '没有匹配项.'},
		calendar: {
			confirm: '确认',
			today: '今天', hour: '时', minute: '分', second: '秒',
			yesterday: '昨天',
			thisWeekEnd: '本周', prevWeekend: '上周',
			thisMonthEnd: '本月底', prevMonthEnd: '上月底',
			thisYearEnd: '今年末', prevYearEnd: '上年末',
			jan: '一月', feb: '二月', mar: '三月', apr: '四月', may: '五月', jun: '六月',
			jul: '七月', aug: '八月', sep: '九月', oct: '十月', nov: '十一月', dec: '十二月',
			sunday: '日', monday: '一', tuesday: '二', wednesday: '三',
			thursday: '四', friday: '五', saturday: '六'
		},
		ribs: {
			noElement: '没有数据.',
			createItem: '新建',
			removeItem: '删除'
		},
		table: {
			// headers: {index: (void 0), operators: (void 0)},
			noElement: '没有数据.',
			createItem: '新建',
			removeItem: '删除'
		},
		wizard: {previous: '上一步', next: '下一步'},
		tree: {filter: {placeholder: '筛选...'}},
		pagination: {
			page: '第', of: '页, 共', pages: '页,', afterSize: '条每页,',
			total: '公', unknownItemCount: '???', items: '条.'
		},
		app: {name: '前端'},
		theme: {light: '白天', dark: '黑夜', system: '跟随系统'},
		i18n: {'en-US': '英文', 'zh-CN': '简体中文'}
	},
	...rest
};
