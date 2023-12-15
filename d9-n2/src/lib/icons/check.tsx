import React, {SVGProps} from 'react';

export const Check = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox' | 'fill'>) => {
	return <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M9 12L10.5 13.5V13.5C10.7761 13.7761 11.2239 13.7761 11.5 13.5V13.5L15 10" stroke="currentColor"
		      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>;
};
