export const zhCNIntlLabels = {
	title: '理赔', menu: {label: '理赔'},
	registration: {
		menu: {label: '理赔报案'}, title: '理赔报案',
		'find-insured': {title: '理赔报案 - 查找被保人'}, create: {title: '理赔报案 - 创建报案'},
		'case-no': '报案 - 案件号:',
		criteria: {
			keywords: {placeholder: '根据报案号, 保单号或被保人搜索. 回车开始搜索.'}
		},
		results: {'related-policies': '相关保单', 'ongoing-claims': '进行中理赔'},
		action: {register: '报案'}
	},
	acceptance: {
		menu: {label: '理赔受理'}, title: '理赔受理',
		find: {title: '理赔受理 - 查找案件'},
		'claim-entry': {title: '理赔受理 - 案件信息录入', 'case-no': '案件信息录入 - 案件号:'},
		'policy-acceptance': {
			title: '理赔受理 - 受理处理', 'case-no': '受理处理 - 案件号::'
		}

	},
	evaluation: {
		menu: {label: '理赔评估'}, title: '理赔评估'
	},
	reg: {
		'case-no': '报案案件号', 'reg-no': '报案号',
		'submission-channel': '报案渠道',
		'manual-register': '手工记录',
		status: '处理状态'
	},
	insured: {title: '被保人信息'},
	claim: {
		title: '理赔信息', type: '理赔类型', 'notification-date': '通知日期',
		'event-date': '发生日期', nature: '理赔性质', 'incident-code': '事件代码',
		'case-classification': '案件分类', 'previous-case-no': '上次案件号',
		'diagnosis-code': '诊断编码', details: '事件说明',
		'type-required': '请选择理赔类型.',
		'notification-date-required': '请填写通知日期.',
		'event-date-required': '请填写发生日期.',
		'nature-required': '请选择理赔性质.'
	},
	additional: {
		title: '附加信息',
		'hospital-code': '医院代码',
		'admission-date': '入院日期',
		'discharge-date': '出院日期',
		'treat-place': '治疗地点',
		'foreign-hospital': '外国医院',
		'doctor-code': '医生代码',
		'unknown-pre-existing-conditions': '未知已存在疾病',
		'chronic-disease': '慢性病',
		'actual-ward-level': '实际病房等级',
		'voluntary-ward-upgrade': '自愿病房升级',
		'direct-billing-indicator': '是否直接结算?'
	},
	reporter: {
		title: '报案人信息', relationship: '与被保人关系', via: '报案方式',
		name: '报案人姓名', 'type-of-pass': '护照类型',
		'notification-method': '通知方式', 'handling-producer': '理赔专员',
		'producer-mobile': '专员手机号码', 'producer-email': '专员电子邮箱'
	},
	'actions-and-supporting': '操作与支持:',
	action: {
		image: '影像资料', 'doc-checklist': '书面资料', 'medical-bill': '医疗账单', history: '理赔历史',
		'edit-case': '编辑报案信息', 'accept-policy': '受理规定检查',
		'change-insured': '更改被保人信息', 'search-reporter': '查找报案人信息',
		'add-claim-issue': '添加问题',
		'generate-issues-as-internal-query': '产制内部问卷',
		'generate-issues-as-query-letter': '产制问卷',
		reply: '回复', reminder: '提醒',
		comment: '建议',
		investigation: '调查', 'escalation': '案件升级', 'reload-policy': '重新加载政策'
	}
};
