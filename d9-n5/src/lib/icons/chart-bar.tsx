import React, {SVGProps} from 'react';

export const ChartBarIcon = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="playground-chart-bar" viewBox="0 0 24 24" fill="none"
	            xmlns="http://www.w3.org/2000/svg">
		<path
			d="M21 3L14 9L10 5L3 11M4.5 21C3.67157 21 3 20.3284 3 19.5V17.5C3 16.6716 3.67157 16 4.5 16C5.32843 16 6 16.6716 6 17.5V19.5C6 20.3284 5.32843 21 4.5 21ZM11.5 21C10.6716 21 10 20.3284 10 19.5V14.5C10 13.6716 10.6716 13 11.5 13C12.3284 13 13 13.6716 13 14.5V19.5C13 20.3284 12.3284 21 11.5 21ZM18.5 21C17.6716 21 17 20.3284 17 19.5V16.5C17 15.6716 17.6716 15 18.5 15C19.3284 15 20 15.6716 20 16.5V19.5C20 20.3284 19.3284 21 18.5 21Z"
			stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>;
};
