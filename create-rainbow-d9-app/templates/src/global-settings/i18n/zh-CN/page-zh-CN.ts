import {intlForPageAuthZhCN} from './page-auth-zh-CN';
import {intlForPageCommonZhCN} from './page-common-zh-CN';

export const intlForPageZhCN = {
	page: {
		...intlForPageCommonZhCN,
		...intlForPageAuthZhCN,
		lazy: '正在加载页面, 请稍候...',
		home: '首页, 修改/src/work-area/home/index.tsx实现自定义渲染行为.'
	}
};
