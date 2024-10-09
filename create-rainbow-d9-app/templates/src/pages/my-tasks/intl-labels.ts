import {registerPageIntlLabels} from '../../global-settings';

registerPageIntlLabels('my-tasks')
	.lang('en-US')
	.labels({
		criteria: {title: 'Filter by...', category: 'Category', priority: 'Priority'}
	})
	.lang('zh-CN')
	.labels({
		criteria: {title: '条件过滤...', category: '分类', priority: '优先级'}
	});
