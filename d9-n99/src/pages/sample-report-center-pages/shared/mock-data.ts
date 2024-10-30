const reports = () => {
	return [
		{
			value: 'nb', label: 'New Business', children: []
		},
		{value: 'uw', label: 'Underwriting', children: []},
		{value: 'cs', label: 'Customer Service', children: []},
		{value: 'claim', label: 'Claim', children: []},
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
		{
			value: 'sc', label: 'Sales Channel', children: [
				{
					value: 'asia', label: 'Asia', children: [
						{value: 'jp', label: 'Japan', children: []}
					]
				}
			]
		}
	];
};
export const MockData = {reports};