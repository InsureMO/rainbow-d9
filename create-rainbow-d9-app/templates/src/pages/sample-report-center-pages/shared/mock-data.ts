import {registerMockCodeTables} from '../../../mock-services';

registerMockCodeTables({
	yesNo: [
		{label: 'Yes', value: true},
		{label: 'No', value: false}
	],
	agentStatus: [
		{label: 'Enabled', value: 'enabled'},
		{label: 'Disabled', value: 'disabled'}
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
		case 'tbr':
		default:
			return 'enabled';
	}
};
const askMockReportColumns = () => {
	return [
		{sourceFieldName: 'issue_date', dataType: 'date'},
		{sourceFieldName: 'agent_code', dataType: 'string'},
		{sourceFieldName: 'agent_name', dataType: 'string'},
		{sourceFieldName: 'agent_status', dataType: 'string'},
		{sourceFieldName: 'agent_enabled', dataType: 'boolean'},
		{sourceFieldName: 'amount', dataType: 'number'}
	];
};
const askReportCriteria = (code: string) => {
	switch (code) {
		case 'tbr':
			return [
				{fieldName: 'issue_date', displayName: 'Issue Date', dataType: 'date', required: false},
				{fieldName: 'agent_code', displayName: 'Agent Code', dataType: 'string', required: true},
				{fieldName: 'agent_enabled', displayName: 'Agent Enabled', dataType: 'boolean', required: true},
				{
					fieldName: 'agent_status', displayName: 'Agent Status',
					dataType: 'codes', codesName: 'agentStatus',
					required: true
				},
				{fieldName: 'amount', displayName: 'Amount', dataType: 'number', required: true}
			];
		case 'glr':
			return [
				{fieldName: 'issue_date', displayName: 'Issue Date', dataType: 'date', required: false},
				{fieldName: 'agent_code', displayName: 'Agent Code', dataType: 'string', required: true},
				{
					fieldName: 'agent_status', displayName: 'Agent Status',
					dataType: 'codes', codesName: 'agentStatus',
					required: true
				},
				{fieldName: 'agent_enabled', displayName: 'Agent Enabled', dataType: 'boolean', required: true},
				{fieldName: 'amount', displayName: 'Amount', dataType: 'number', required: true}
			];
		case 'rpb':
			return [
				{fieldName: 'issue_date', displayName: 'Issue Date', dataType: 'date', required: false}
			];
		case 'rcb':
		default:
			return (void 0);
	}
};
export const MockData = {reports, statusOfReport, askMockReportColumns, askReportCriteria};