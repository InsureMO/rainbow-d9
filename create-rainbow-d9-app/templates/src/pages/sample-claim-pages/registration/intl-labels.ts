import {registerPageIntlLabels} from '../../../global-settings';

registerPageIntlLabels('claim-registration')
	.lang('en-US')
	.labels({
		title: 'Claim - Registration',
		menu: {label: 'Registration'},
		criteria: {title: 'Filter by...', category: 'Category', priority: 'Priority'}
	})
	.lang('zh-CN')
	.labels({
		title: '理赔报案',
		menu: {label: '理赔报案'},
		criteria: {title: '条件过滤...', category: '分类', priority: '优先级'}
	});
