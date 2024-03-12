import React, {SVGProps} from 'react';

export const ChartAutonomousIcon = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="playground-chart-autonomous" viewBox="0 0 24 24" fill="none"
	            xmlns="http://www.w3.org/2000/svg">
		<path d="M4.02 5.97C2.75 7.65 2 9.74 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2"
		      stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
		<path opacity="0.34" d="M5 12C5 15.87 8.13 19 12 19C15.87 19 19 15.87 19 12C19 8.13 15.87 5 12 5"
		      stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
		<path opacity="0.34" d="M12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8" stroke="#292D32" strokeWidth="1.5"
		      strokeLinecap="round" strokeLinejoin="round"/>
	</svg>;
};
