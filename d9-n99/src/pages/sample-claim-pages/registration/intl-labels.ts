import {registerPageIntlLabels} from '../../../global-settings';

registerPageIntlLabels('claim-registration')
	.lang('en-US')
	.labels({
		title: 'Registration',
		'find-insured': {title: 'Claim - Registration - Find Insured'},
		create: {title: 'Claim - Registration - Create'},
		menu: {label: 'Registration'},
		criteria: {
			keywords: {placeholder: 'Enter to trigger search, could be registration No., policy No. or insured name.'}
		},
		results: {
			'related-policies': 'Related Policies', 'ongoing-claims': 'Ongoing Claims'
		},
		'case-no': 'Registration of Case No.:',
		'reg-no': 'Registration No.',
		'submission-channel': 'Submission Channel',
		'manual-register': 'Manual Registration',
		status: 'Case Status',
		insured: {title: 'Insured Information'},
		claim: {
			title: 'Claim Information', type: 'Claim Type', 'notification-date': 'Notification Date',
			'event-date': 'Event Date', nature: 'Claim Nature', 'incident-code': 'Incident Code',
			'case-classification': 'Case Classification', 'previous-case-no': 'Previous Case No.',
			'diagnosis-code': 'Diagnosis Code', details: 'Event Details'
		},
		reporter: {
			title: 'Reporter Information', relationship: 'Relationship with Insured', via: 'Report Via',
			name: 'Reporter Name', 'type-of-pass': 'Type of Pass',
			'notification-method': 'Notification Method', 'handling-producer': 'Handling Producer',
			'producer-mobile': 'Producer Mobile No.', 'producer-email': 'Producer Email'
		},
		action: {
			register: 'Register',
			'change-insured': 'Change Insured', 'search-reporter': 'Search Reporter',
			comment: 'Comment'
		}
	})
	.lang('zh-CN')
	.labels({
		title: '理赔报案',
		'find-insured': {title: '理赔报案 - 查找被保人'},
		create: {title: '理赔报案 - 创建报案'},
		menu: {label: '理赔报案'},
		criteria: {
			keywords: {placeholder: '根据报案号, 保单号或被保人搜索. 回车开始搜索.'}
		},
		results: {
			'related-policies': '相关保单', 'ongoing-claims': '进行中理赔'
		},
		'case-no': '报案案件号:',
		'reg-no': '报案号',
		'submission-channel': '报案渠道',
		'manual-register': '手工记录',
		status: '处理状态',
		insured: {title: '被保人信息'},
		claim: {
			title: '理赔信息', type: '理赔类型', 'notification-date': '通知日期',
			'event-date': '发生日期', nature: '理赔性质', 'incident-code': '事件代码',
			'case-classification': '案件分类', 'previous-case-no': '上次案件号',
			'diagnosis-code': '诊断编码', details: '事件说明'
		},
		reporter: {
			title: '报案人信息', relationship: '与被保人关系', via: '报案方式',
			name: '报案人姓名', 'type-of-pass': '护照类型',
			'notification-method': '通知方式', 'handling-producer': '理赔专员',
			'producer-mobile': '专员手机号码', 'producer-email': '专员电子邮箱'
		},
		action: {
			register: '报案',
			'change-insured': '重新选择被保人', 'search-reporter': '查找报案人',
			comment: '备注'
		}
	});
