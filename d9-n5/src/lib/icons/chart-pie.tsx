import React, {SVGProps} from 'react';

export const ChartPieIcon = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="playground-chart-pie" viewBox="0 0 24 24" fill="none"
	            xmlns="http://www.w3.org/2000/svg">
		<path d="M19.9497 17.9497L15 13H22C22 14.933 21.2165 16.683 19.9497 17.9497Z" stroke="currentColor"
		      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M20 10C20 6.13401 16.866 3 13 3V10H20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
		      strokeLinejoin="round"/>
		<path
			d="M2 12C2 16.4183 5.58172 20 10 20C12.2091 20 14.2091 19.1046 15.6569 17.6569L10 12V4C5.58172 4 2 7.58172 2 12Z"
			stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>;
};
