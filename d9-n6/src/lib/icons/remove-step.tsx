import React, {SVGProps} from 'react';

export const RemoveStep = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="o23-remove-step" viewBox="0 0 24 24" fill="none"
	            xmlns="http://www.w3.org/2000/svg">
		<path d="M2 15.3V9C2 5.5 4 4 7 4H17C20 4 22 5.5 22 9V15C22 18.5 20 20 17 20H8.5" stroke="currentColor"
		      strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
		<path opacity="0.4"
		      d="M12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5C10.6193 9.5 9.5 10.6193 9.5 12C9.5 13.3807 10.6193 14.5 12 14.5Z"
		      stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
		      strokeLinejoin="round"/>
		<path opacity="0.4" d="M18.5 9.5V14.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"
		      strokeLinecap="round" strokeLinejoin="round"/>
		<path
			d="M9 18C9 18.75 8.78998 19.46 8.41998 20.06C7.72998 21.22 6.46 22 5 22C3.54 22 2.27002 21.22 1.58002 20.06C1.21002 19.46 1 18.75 1 18C1 15.79 2.79 14 5 14C7.21 14 9 15.79 9 18Z"
			stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M6.06897 19.0402L3.95898 16.9302" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"
		      strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M6.03967 16.96L3.92969 19.0699" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"
		      strokeLinecap="round" strokeLinejoin="round"/>
	</svg>;
};
