import {registerPageIntlLabels} from '../../../global-settings';
import {markdown as claimBaseSection} from './claim-base-section.d9';
import {markdown as insuredBaseSection} from './insured-base-section.d9';
import {enUSIntlLabels} from './intl-labels-enUS';
import {zhCNIntlLabels} from './intl-labels-zhCN';
import './mock-code-tables.ts';
import {markdown as registrationBaseSection} from './registration-base-section.d9';
import {markdown as reporterBaseSection} from './reporter-base-section.d9';
import * as Services from './services';

registerPageIntlLabels('claim')
	.lang('en-US').labels(enUSIntlLabels)
	.lang('zh-CN').labels(zhCNIntlLabels);

export const SharedMarkdown = {
	registrationBaseSection, insuredBaseSection, claimBaseSection, reporterBaseSection
};

export const SharedServices = Services;
