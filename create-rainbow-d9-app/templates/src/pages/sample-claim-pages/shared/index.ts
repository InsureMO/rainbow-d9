import {registerPageIntlLabels} from '../../../global-settings';
import {enUSIntlLabels} from './intl-labels-enUS';
import {zhCNIntlLabels} from './intl-labels-zhCN';
import './mock-code-tables.ts';

registerPageIntlLabels('claim')
	.lang('en-US').labels(enUSIntlLabels)
	.lang('zh-CN').labels(zhCNIntlLabels);
