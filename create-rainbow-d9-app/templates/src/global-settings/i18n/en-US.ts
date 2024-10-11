import {getAppName} from '../../utils';

export const intlForAppEnUS = {
	app: {name: getAppName()},
	dropdown: {
		placeholder: {all: 'All', any: 'Any'}
	},
	biz: {
		'policy-no': 'Policy No.',
		'insured-name': 'Insured Name',
		'id-type': 'ID Type', 'id-no': 'ID Number', gender: 'Gender', dob: 'DOB'
	},
	page: {
		common: {
			title: {
				fuzzy: 'Fuzzy Search',
				advanced: 'Advanced Search'
			},
			button: {
				'show-advanced-search': 'Show Advanced Search', 'hide-advanced-search': 'Hide Advanced Search',
				search: 'Search', 'reset-criteria': 'Reset'
			}
		},
		authentication: {
			username: {placeholder: 'Username'},
			pwd: {placeholder: 'Password'},
			code2fa: {placeholder: 'Authentication code'}
		}
	}
};
