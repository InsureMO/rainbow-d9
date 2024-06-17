import React, {SVGProps} from 'react';

export const Accept = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="o23-accept" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path opacity="0.5" d="M20 6L3 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path opacity="0.5" d="M10 11L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path opacity="0.5" d="M10 16H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path d="M14 13.5L16.1 16L20 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
		      strokeLinejoin="round"/>
	</svg>;
};
