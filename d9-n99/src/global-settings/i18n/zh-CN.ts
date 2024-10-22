import {intlForBizZhCN} from './zh-CN/biz-zh-CN';
import {intlForCommonZhCN} from './zh-CN/common-zh-CN';
import {intlForPageZhCN} from './zh-CN/page-zh-CN';
import {intlForValidationZhCN} from './zh-CN/validation-zh-CN';

export const intlForN2ZhCN = {
	// d9 n2
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
		total: '共', unknownItemCount: '???', items: '条.'
	}
};
export const intlForAppZhCN = {
	app: {name: '前端'},
	theme: {light: '浅色主题', dark: '深色主题', system: '跟随系统'},
	i18n: {'en-US': '英文', 'zh-CN': '简体中文'},
	menus: {
		preferences: '使用偏好', language: '语言', theme: '颜色主题'
	},
	...intlForCommonZhCN,
	...intlForBizZhCN,
	...intlForPageZhCN,
	...intlForValidationZhCN,
	actions: {
		logout: {
			label: '退出系统',
			confirm: '确认要退出系统吗?'
		}
	}
};
