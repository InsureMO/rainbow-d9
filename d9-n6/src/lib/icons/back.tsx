import React, {SVGProps} from 'react';

export const Back = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="o23-back" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M9.5 7L4.5 12L9.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
		      strokeLinejoin="round"/>
		<path opacity="0.5" d="M4.5 12L14.5 12C16.1667 12 19.5 13 19.5 17" stroke="currentColor" strokeWidth="1.5"
		      strokeLinecap="round"/>
	</svg>;
};
