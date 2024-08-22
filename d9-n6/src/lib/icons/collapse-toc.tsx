import React, {SVGProps} from 'react';

export const CollapseToc = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="o23-collapse-toc" viewBox="0 0 24 24" fill="none"
	            xmlns="http://www.w3.org/2000/svg">
		<path d="M19 13L12 7L5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
		      strokeLinejoin="round"/>
		<path opacity="0.5" d="M19 17L12 11L5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
		      strokeLinejoin="round"/>
	</svg>;
};
