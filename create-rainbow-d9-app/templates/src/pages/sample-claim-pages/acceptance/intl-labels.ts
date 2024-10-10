import {registerPageIntlLabels} from '../../../global-settings';

registerPageIntlLabels('claim-acceptance')
	.lang('en-US')
	.labels({
		title: 'Claim - Acceptance',
		menu: {label: 'Acceptance'},
		criteria: {title: 'Filter by...', category: 'Category', priority: 'Priority'}
	})
	.lang('zh-CN')
	.labels({
		title: '理赔受理',
		menu: {label: '理赔受理'},
		criteria: {title: '条件过滤...', category: '分类', priority: '优先级'}
	});
