import {registerMockCodeTables} from '../../../mock-services';

registerMockCodeTables({
	yesNo: [
		{label: 'Yes', value: true},
		{label: 'No', value: false}
	]
});
const reports = (omitEmptyCategory: boolean = false) => {
	return [
		...(!omitEmptyCategory ?
			[
				{value: 'nb', label: 'New Business', children: []},
				{value: 'uw', label: 'Underwriting', children: []},
				{value: 'cs', label: 'Customer Service', children: []},
				{value: 'claim', label: 'Claim', children: []}
			] : []),
		{
			value: 'fn', label: 'Finance', children: [
				{value: 'tbr', label: 'Trail Balance Report'},
				{value: 'glr', label: 'General Ledger Report'}
			]
		},
		{
			value: 'ri', label: 'Reinsurance', children: [
				{value: 'rpb', label: 'RI Premium Bordereaux'},
				{value: 'rcb', label: 'RI Claim Bordereaux'}
			]
		},
		...(!omitEmptyCategory ?
			[{
				value: 'sc', label: 'Sales Channel', children: [
					{
						value: 'asia', label: 'Asia', children: [
							{value: 'jp', label: 'Japan', children: []}
						]
					}
				]
			}] : [])
	];
};
const statusOfReport = (code: string) => {
	switch (code) {
		case 'glr':
			return 'disabled';
		case 'rpb':
			return 'draft';
		case 'rcb':
			return 'submitted';
		default:
			return 'enabled';
	}
};
export const MockData = {reports, statusOfReport};