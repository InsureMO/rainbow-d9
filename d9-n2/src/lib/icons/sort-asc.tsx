import React, {SVGProps} from 'react';

export const SortAsc = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="sort-asc" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M4 16L13 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path opacity="0.7" d="M6 11H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path opacity="0.3" d="M8 6L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path d="M17 4L17 20L20 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
		      strokeLinejoin="round"/>
	</svg>;
};
