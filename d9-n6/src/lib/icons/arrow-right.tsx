import React, {SVGProps} from 'react';

export const ArrowRight = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="o23-arrow-right" viewBox="0 0 24 24" fill="none"
	            xmlns="http://www.w3.org/2000/svg">
		<path d="M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008"
		      stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
		      strokeLinejoin="round"/>
	</svg>;
};
