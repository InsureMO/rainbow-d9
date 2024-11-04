import React, {SVGProps} from 'react';

export const SortNone = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="sort-none" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path opacity="0.5" d="M4 17H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path opacity="0.5" d="M4 12L11 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path opacity="0.5" d="M4 7L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path d="M17 4L17 20M17 4L14 8M17 4L20 8M17 20L20 16M17 20L14 16" stroke="currentColor" strokeWidth="1.5"
		      strokeLinecap="round" strokeLinejoin="round"/>
	</svg>;
};