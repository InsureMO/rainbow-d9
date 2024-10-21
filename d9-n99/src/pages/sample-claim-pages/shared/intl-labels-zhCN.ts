export const zhCNIntlLabels = {
	title: '理赔', menu: {label: '理赔'},
	registration: {
		menu: {label: '理赔报案'}, title: '理赔报案',
		'find-insured': {title: '理赔报案 - 查找被保人'},
		create: {title: '理赔报案 - 创建报案'},
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
			title: '理赔受理 - 受理处理', 'case-no': '受理处理 - 案件号:'
		}
	},
	evaluation: {
		menu: {label: '理赔评估'}, title: '理赔评估', 'case-no': '理赔评估 - 案件号:'
	},
	reg: {
		'case-no': '案件号', 'reg-no': '报案号',
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
	'claim-issue': {
		title: '案件问题', headline: '标题', raised: '创建于', 'last-updated': '最后修改于', status: '状态',
		description: '描述',
		'add-title': '添加问题'
	},
	'query-letter': {
		title: '问题问卷', 'doc-no': '问卷号码', 'doc-name': '问卷名称', due: '截止日期',
		raised: '创建于', 'last-updated': '最后修改于', status: '状态'
	},
	'internal-query': {
		title: '内部问卷', 'query-no': '问卷号码', 'query-type': '类型', 'query-title': '标题',
		assignee: '已指派', due: '截止日期',
		raised: '创建于', 'last-updated': '最后修改于', status: '状态'
	},
	escalation: {
		title: '案件升级', to: '指派至', due: '截止日期',
		raised: '指派于', 'last-updated': '最后修改于', status: '状态',
		headline: '标题', description: '描述',
		'add-title': '案件升级'
	},
	investigation: {
		title: '案件调查', to: '提交至', due: '截止日期',
		raised: '提交于', 'last-updated': '最后修改于', status: '状态',
		headline: '标题', description: '描述',
		'add-title': '案件调查'
	},
	'underwriting-by-claim': {
		title: '核保', type: '核保类型', 'case-no': '案件号',
		'application-date': '申请日期', raised: '提交于',
		due: '截止日期', replied: '回复于', status: '状态'
	},
	'acceptance-decision': {
		title: '受理决定',
		'policy-title': '保单信息, 保单号:', 'policy-holder': '投保人姓名',
		'current-status': '当前保单状态', 'status-at-event': '案件日期保单状态',
		currency: '保单币种', 'bankruptcy-involved': '是否涉及破产',
		'service-agent': '服务代理人', 'service-agent-mobile': '服务代理人手机号码',
		product: {
			name: '产品名称', acceptable: '可理赔?', accept: '理赔?', 'notified-amount': '通知金额',
			'sum-assured': '保额',
			'status-at-event': '案件日期产品状态', 'current-status': '当前产品状态',
			'commencement-date': '生效日', 'expiry-date': '失效日期',
			reinsurance: '再保?'
		},
		'summary-title': '受理决定批复', decision: '决定', reason: '原因',
		'price-eff-date': '有效价格日期(ILP)', 'comment-to-client': '对客户的备注'
	},
	'claim-workbench': {
		title: '理赔工作台',
		'life-assured-info': {
			title: '保险标的', 'age-at-event': '案件发生时年龄',
			'medical-or-not': {
				title: '医疗/非医疗代码信息', code: '代码', 'code-category': '代码分类',
				'lia-code-type': 'LIA代码类型', description: '医疗/非医疗代码描述'
			},
			'claim-history': {
				title: '理赔历史',
				'product-code': '产品代码', 'product-type': '产品类型',
				'claim-type': '理赔类型', 'event-date': '案件日期', 'claim-nature': '理赔性质',
				'diagnosis': '诊断代码', 'claim-status': '理赔状态',
				'claim-decision': '理赔决定', 'claimable-amount': '索赔金额',
				'settle-date': '结算日期'
			},
			'underwriting-history': {
				title: '核保历史',
				'product-code': '产品代码', 'product-type': '产品类型', 'business-type': '业务类型',
				'underwriting-decision': '核保决定', 'commencement-date': '生效日',
				'policy-status': '保单状态', 'premium-status': '缴费状态',
				'payment-frequency': '缴费周期', 'sa-unit-level': '保额/单位/级别',
				'annual-premium': '年保费',
				'auto-underwriting-indicator': '是否自动核保?'
			}
		},
		policies: {
			title: '保单信息'
		},
		policy: {
			title: '保单信息, 保单号:',
			'proposal-date': '投保日期', 'issue-date': '出单日期',
			'risk-commencement-date': '责任开始日期', currency: '币种',
			status: '保单状态', 'lapse-date': '失效日期', 'reinstatement-date': '复效日期',
			'installment-premium': '保费分期', 'next-due-date': '下次缴费日期',
			'outstanding-premium': '未缴保费', 'policy-frequency': '缴费频率',
			'policy-loan': '保单贷款', 'sales-channel': '销售渠道', 'service-agent': '服务代理人',
			party: {
				title: '当事人',
				role: '角色', name: '客户姓名', 'id-type-and-no': '证件类型 / 编号',
				'relation-with-holder': '与保单持有人的关系', 'annual-income': '年收入’',
				'smoker-status': '吸烟状况', 'risk-indicator': '风险指标',
				'medical-report': '医疗报告', declaration: '声明'
			},
			product: {
				title: '产品',
				name: '产品名称', 'life-assured': '被保险人',
				'risk-commencement-date': '风险开始日期', status: '保单状态',
				'reinstatement-date': '恢复日期', 'coverage-period': '保障期限',
				'payment-period': '缴费期限', 'sa-unit-level': '保额 / 单位 / 级别',
				'installment-premium': '分期保费', 'underwriting-decision': '核保决定',
				'loading': '加费', 'agreement': '协议',
				'lapse-terminate-date': '失效 / 终止日期',
				'inception-to-event-duration': '从生效到事件的持续时间',
				'reinstatement-to-event-duration': '从恢复到事件的持续时间'
			},
			loading: {
				title: '加费',
				'product-code': '产品代码', 'product-type': '产品类型', category: '加费类别',
				'occupation-class': '职业类别', type: '加费类型', period: '加费期限',
				'extra-premium': '额外保费'
			},
			exclusion: {
				title: '除外责任',
				'product-code': '产品代码', 'product-type': '产品类型', category: '加费类别',
				'occupation-class': '职业类别', type: '加费类型', period: '加费期限',
				'extra-premium': '额外保费'
			},
			agreement: {
				title: '协议',
				'product-code': '产品代码', 'product-type': '产品类型', type: '协议类型',
				'life-assured': '被保险人', code: '协议代码', comment: '协议备注',
				'review-period': '审核期 (月)', content: '内容'
			},
			'risk-related-cs-history': {
				title: '风险相关客户服务历史',
				'product-code': '产品代码', 'product-type': '产品类型', item: '客户服务项目',
				'application-date': '客户服务申请日期', status: '客户服务状态',
				'auto-underwriting-indicator': '自动核保指示', 'underwriting-decision': '核保决定',
				'underwriting-completion-date': '核保完成日期', underwriter: '核保人'
			}
		},
		assessment: {
			title: '评估信息'
		},
		'disbursement-plan': {
			title: '支付计划'
		},
		queries: {
			title: '内部/外部问卷'
		},
		'comment-history': {
			title: '评论历史'
		}
	},
	'assessment': {
		title: '评估'
	},
	'disbursement-plan': {
		title: '支付计划'
	},
	action: {
		image: '影像资料', 'doc-checklist': '书面资料', 'medical-bill': '医疗账单', history: '理赔历史',
		'edit-case': '编辑报案信息', 'accept-policy': '选择保单',
		'change-insured': '更改被保人信息', 'search-reporter': '查找报案人信息',
		'generate-issues-as-internal-query': '产制内部问卷',
		'generate-issues-as-query-letter': '产制问卷',
		'add-claim-issue': '添加问题',
		'add-escalation': '案件升级',
		'add-investigation': '案件调查',
		reply: '回复', reminder: '提醒', withdraw: '撤回',
		comment: '建议',
		'reload-policy': '重新加载保单'
	}
};
