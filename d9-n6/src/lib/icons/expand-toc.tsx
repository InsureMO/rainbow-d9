import React, {SVGProps} from 'react';

export const ExpandToc = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="o23-expand-toc" viewBox="0 0 24 24" fill="none"
	            xmlns="http://www.w3.org/2000/svg">
		<path d="M19 11L12 17L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
		      strokeLinejoin="round"/>
		<path opacity="0.5" d="M19 7L12 13L5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
		      strokeLinejoin="round"/>
	</svg>;
};
