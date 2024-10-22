import {intlForPageAuthEnUS} from './page-auth-en-US';
import {intlForPageCommonEnUS} from './page-common-en-US';

export const intlForPageEnUS = {
	page: {
		...intlForPageCommonEnUS,
		...intlForPageAuthEnUS
	}
};
