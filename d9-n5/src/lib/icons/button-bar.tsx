import React, {SVGProps} from 'react';

export const ButtonBarIcon = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="playground-button-bar" viewBox="0 0 24 24" fill="none"
	            xmlns="http://www.w3.org/2000/svg">
		<path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor"
		      opacity="0.4"
		      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
		<path d="M17.5004 17.0801H15.6504" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
		      strokeLinejoin="round"/>
		<path d="M12.97 17.0801H6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
		      strokeLinejoin="round"/>
		<path d="M17.5007 13.3198H11.9707" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
		      strokeLinejoin="round" display="none"/>
		<path d="M9.27 13.3198H6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
		      strokeLinejoin="round" display="none"/>
	</svg>;
};
