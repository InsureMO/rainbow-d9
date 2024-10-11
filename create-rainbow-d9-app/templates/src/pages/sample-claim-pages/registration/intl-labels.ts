import {registerPageIntlLabels} from '../../../global-settings';

registerPageIntlLabels('claim-registration')
	.lang('en-US')
	.labels({
		title: 'Claim - Registration',
		menu: {label: 'Registration'},
		criteria: {
			keywords: {placeholder: 'Enter to trigger search, could be registration No., policy No. or insured name.'},
			'advanced-search': 'Advanced Search'
		}
	})
	.lang('zh-CN')
	.labels({
		title: '理赔报案',
		menu: {label: '理赔报案'},
		criteria: {
			keywords: {placeholder: '根据报案号, 保单号或被保人搜索. 回车开始搜索.'},
			'advanced-search': '高级搜索'
		}
	});
