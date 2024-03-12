import React, {SVGProps} from 'react';

export const ChartReliantIcon = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="playground-chart-reliant" viewBox="0 0 32 32"
	            xmlns="http://www.w3.org/2000/svg">
		<polygon points="4 20 4 22 8.586 22 2 28.586 3.414 30 10 23.414 10 28 12 28 12 20 4 20"/>
		<path
			d="M15,28V26a9.0133,9.0133,0,0,0,8.9448-8H16a2.0021,2.0021,0,0,1-2-2V8.0552A9.0133,9.0133,0,0,0,6,17H4A11.0125,11.0125,0,0,1,15,6a1,1,0,0,1,1,1v9h9a1,1,0,0,1,1,1A11.0125,11.0125,0,0,1,15,28Z"/>
		<path
			d="M29.0057,14H19.995A1.9957,1.9957,0,0,1,18,12V3a1.0083,1.0083,0,0,1,1.02-1A11.0125,11.0125,0,0,1,30,12.98,1.0035,1.0035,0,0,1,29.0057,14ZM20,12h7.9448A9.018,9.018,0,0,0,20,4.0552Z"/>
		<rect fill="none" width="32" height="32"/>
	</svg>;
};
