import React, {SVGProps} from 'react';

export const ArrowDown = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M19.9201 8.9502L13.4001 15.4702C12.6301 16.2402 11.3701 16.2402 10.6001 15.4702L4.08008 8.9502"
			stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
			strokeLinejoin="round"/>
	</svg>;
};
