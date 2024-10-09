import {getAppName} from '../../utils';

export const intlForAppEnUS = {
	app: {name: getAppName()},
	dropdown: {
		placeholder: {all: 'All', any: 'Any'}
	},
	page: {
		authentication: {
			username: {placeholder: 'Username'},
			pwd: {placeholder: 'Password'},
			code2fa: {placeholder: 'Authentication code'}
		}
	}
};
