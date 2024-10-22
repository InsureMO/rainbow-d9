import {getAppName} from '../../utils';
import {intlForBizEnUS} from './en-US/biz-en-US';
import {intlForCommonEnUS} from './en-US/common-en-US';
import {intlForPageEnUS} from './en-US/page-en-US';
import {intlForValidationEnUS} from './en-US/validation-en-US';

export const intlForAppEnUS = {
	app: {name: getAppName()},
	...intlForCommonEnUS,
	...intlForBizEnUS,
	...intlForPageEnUS,
	...intlForValidationEnUS
};
