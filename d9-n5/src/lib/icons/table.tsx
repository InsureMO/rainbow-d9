import React, {SVGProps} from 'react';

export const TableIcon = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="playground-table" viewBox="0 0 24 24" fill="none"
	            xmlns="http://www.w3.org/2000/svg">
		<path opacity="0.4" d="M6 6.25V8.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
		      strokeLinejoin="round"/>
		<path opacity="0.4" d="M10 6.25V8.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
		      strokeLinejoin="round"/>
		<path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor"
		      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
		<path opacity="0.4" d="M6 16V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
		      strokeLinejoin="round"/>
		<path opacity="0.4" d="M10 16V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
		      strokeLinejoin="round"/>
		<path opacity="0.4" d="M14 7.25H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
		      strokeLinejoin="round"/>
		<path opacity="0.4" d="M14 17H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
		      strokeLinejoin="round"/>
		<path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>;
};
