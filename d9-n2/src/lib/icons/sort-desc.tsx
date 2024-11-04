import React, {SVGProps} from 'react';

export const SortDesc = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="sort-desc" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M4 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path opacity="0.7" d="M6 13H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path opacity="0.4" d="M8 18H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path d="M17 20V4L20 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>;
};
