import React, {SVGProps} from 'react';

export const SortNone = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="sort-none" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M19 10L5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path opacity="0.5" d="M19 14L5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path opacity="0.5" d="M19 6L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path d="M19 18L5 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
	</svg>;
};