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
	dropdown: {
		placeholder: {'please-select': '请选择...', all: '所有...', any: '任何...', unknown: '未知'}
	},
	biz: {
		'policy-no': '保单号',
		'insured-name': '被保人姓名', 'id-type': '证件类型', 'id-no': '证件号码', gender: '性别', dob: '出生日期',
		postcode: '邮政编码', mobile: '手机号码', email: '电子邮箱',
		address1: '地址栏 #1', address2: '地址栏 #2',
		address3: '地址栏 #3', address4: '地址栏 #4'
	},
	page: {
		common: {
			title: {
				search: '查询', fuzzy: '模糊查询', advanced: '高级查询'
			},
			button: {
				'show-advanced-search': '使用高级查询', 'hide-advanced-search': '隐藏高级查询',
				search: '开始查找', 'reset-criteria': '重置条件',
				save: '暂存', submit: '提交', discard: '放弃', cancel: '取消', close: '关闭', delete: '删除',
				edit: '编辑', view: '查看',
				next: '下一步', previous: '上一步', back: '回退',
				'work-on': '继续'
			}
		},
		authentication: {
			title: '欢迎',
			username: {placeholder: '用户名', required: '请填写用户名.'},
			pwd: {placeholder: '密码', required: '请填写密码.'},
			'username-pwd': {required: '请填写用户名和密码.'},
			code2fa: {placeholder: '验证码', required: '请填写验证码.'},
			failed: '认证失败, 请检查用户名和密码是否正确.',
			failed2fa: '认证失败, 请检查验证码是否正确.',
			'no-auth-enabled': '未启用登录页, 修改/src/work-area/unauthenticated/no-authentication.tsx实现自定义SSO.'
		},
		lazy: '正在加载页面, 请稍候...',
		home: '首页, 修改/src/work-area/home/index.tsx实现自定义渲染行为.'
	},
	validation: {
		input: {
			failed: '输入信息有误, 请检查后再操作.'
		}
	},
	actions: {
		logout: {
			label: '退出系统',
			confirm: '确认要退出系统吗?'
		}
	}
};
