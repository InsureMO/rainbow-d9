import {registerPageIntlLabels} from '../../../global-settings';
import {enUSIntlLabels} from './intl-labels-enUS';
import {zhCNIntlLabels} from './intl-labels-zhCN';
import './mock-code-tables.ts';
import * as Services from './services';

registerPageIntlLabels('claim')
	.lang('en-US').labels(enUSIntlLabels)
	.lang('zh-CN').labels(zhCNIntlLabels);

export * from './types';
export * from './ui-config';
export * from './ui-actions';

export const SharedServices = Services;
