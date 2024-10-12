import {getAppName} from '../../utils';

export const intlForAppEnUS = {
	app: {name: getAppName()},
	dropdown: {
		placeholder: {'please-select': 'Please select...', all: 'All', any: 'Any', unknown: 'Unknown'}
	},
	biz: {
		'policy-no': 'Policy No.',
		'insured-name': 'Insured Name',
		'id-type': 'ID Type', 'id-no': 'ID Number', gender: 'Gender', dob: 'DOB',
		postcode: 'Postcode', mobile: 'Mobile No.', email: 'Email',
		address1: 'Address line 1', address2: 'Address line 2',
		address3: 'Address line 3', address4: 'Address line 4'
	},
	page: {
		common: {
			title: {
				fuzzy: 'Fuzzy Search',
				advanced: 'Advanced Search'
			},
			button: {
				'show-advanced-search': 'Show Advanced Search', 'hide-advanced-search': 'Hide Advanced Search',
				search: 'Search', 'reset-criteria': 'Reset', save: 'Save', submit: 'Submit'
			}
		},
		authentication: {
			username: {placeholder: 'Username'},
			pwd: {placeholder: 'Password'},
			code2fa: {placeholder: 'Authentication code'}
		}
	},
	validation: {
		input: {
			failed: 'The input information is incorrect, please check and try again.'
		}
	}
};
