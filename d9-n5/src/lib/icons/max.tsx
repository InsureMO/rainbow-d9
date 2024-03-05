import React, {SVGProps} from 'react';

export const MaxIcon = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="playground-max" viewBox="0 0 24 24" fill="none"
	            xmlns="http://www.w3.org/2000/svg">
		<path d="M17 7H14M17 7V10M17 7L13.5 10.5M7 17H10M7 17V14M7 17L10.5 13.5" stroke="currentColor" strokeWidth="1.5"
		      strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M7 7H10M7 7V10M7 7L10.5 10.5M17 17H14M17 17V14M17 17L13.5 13.5" stroke="currentColor" strokeWidth="1.5"
		      strokeLinecap="round" strokeLinejoin="round"/>
		<path
			d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
			stroke="currentColor" strokeWidth="1.5"/>
	</svg>;
};
