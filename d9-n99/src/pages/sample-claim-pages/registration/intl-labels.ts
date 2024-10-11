import {registerPageIntlLabels} from '../../../global-settings';

registerPageIntlLabels('claim-registration')
	.lang('en-US')
	.labels({
		title: 'Claim - Registration',
		menu: {label: 'Registration'},
		criteria: {
			keywords: {placeholder: 'Registration No., Policy No., Insured Name, etc.'},
			'advanced-search': 'Advanced Search'
		}
	})
	.lang('zh-CN')
	.labels({
		title: '理赔报案',
		menu: {label: '理赔报案'},
		criteria: {
			keywords: {placeholder: '报案号, 保单号, 被保人, 等.'},
			'advanced-search': '高级搜索'
		}
	});
