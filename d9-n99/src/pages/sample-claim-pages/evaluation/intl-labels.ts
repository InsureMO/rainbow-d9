import {registerPageIntlLabels} from '../../../global-settings';

registerPageIntlLabels('claim-evaluation')
	.lang('en-US')
	.labels({
		title: 'Claim - Evaluation',
		menu: {label: 'Evaluation'},
		criteria: {title: 'Filter by...', category: 'Category', priority: 'Priority'}
	})
	.lang('zh-CN')
	.labels({
		title: '理赔评估',
		menu: {label: '理赔评估'},
		criteria: {title: '条件过滤...', category: '分类', priority: '优先级'}
	});
