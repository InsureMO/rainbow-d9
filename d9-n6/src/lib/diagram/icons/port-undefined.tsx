import React, {SVGProps} from 'react';

export const PortUndefined = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="o23-port-undefined" viewBox="0 0 24 24" fill="none"
	            xmlns="http://www.w3.org/2000/svg">
		<path
			d="M12 22C10.9808 22 10.62 21.8424 9.89856 21.5273C7.23896 20.3655 3 17.6294 3 11.9914V10.4168C3 7.21918 3 5.62039 3.37752 5.08252C3.75503 4.54465 5.25825 4.02996 8.26484 3.00079L8.83765 2.80472C10.4049 2.26824 11.1885 2 11.9999 2"
			stroke="currentColor" strokeWidth="1.5"/>
		<path opacity="0.5"
		      d="M12.0001 22C13.0193 22 13.3801 21.8424 14.1015 21.5273C16.7611 20.3655 21.0001 17.6294 21.0001 11.9914V10.4168C21.0001 7.21918 21.0001 5.62039 20.6226 5.08252C20.245 4.54465 18.7417 4.02996 15.7351 3.00079L15.1623 2.80472C13.595 2.26824 12.8114 2 12 2"
		      stroke="currentColor" strokeWidth="1.5"/>
	</svg>;
};
