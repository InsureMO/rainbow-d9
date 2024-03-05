import React, {SVGProps} from 'react';

export const LabelIcon = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="playground-label" viewBox="0 0 24 24" fill="none"
	            xmlns="http://www.w3.org/2000/svg">
		<path d="M7 6V14.5925C7 16.3108 9.02384 17.2291 10.317 16.0976L11 15.5" stroke="currentColor" strokeWidth="2"
		      strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M4 9H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M14 9L19 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M19 9L14 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>;
};
