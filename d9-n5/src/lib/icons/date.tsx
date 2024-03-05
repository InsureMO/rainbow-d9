import React, {SVGProps} from 'react';

export const DateIcon = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="playground-date" viewBox="0 0 24 24" fill="none"
	            xmlns="http://www.w3.org/2000/svg">
		<path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
		      strokeLinejoin="round"/>
		<path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
		      strokeLinejoin="round"/>
		<path opacity="0.4" d="M3.5 9.08984H20.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"
		      strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
		      stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
		      strokeLinejoin="round"/>
		<path opacity="0.4" d="M11.9955 13.7002H12.0045" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
		      strokeLinejoin="round"/>
		<path opacity="0.4" d="M8.29431 13.7002H8.30329" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
		      strokeLinejoin="round"/>
		<path opacity="0.4" d="M8.29492 16.7002H8.3039" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
		      strokeLinejoin="round"/>
	</svg>;
};
