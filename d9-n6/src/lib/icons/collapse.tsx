import React, {SVGProps} from 'react';

export const Collapse = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="o23-collapse" viewBox="0 0 24 24" fill="none"
	            xmlns="http://www.w3.org/2000/svg">
		<path
			d="M9.99756 6.00065C9.98309 7.70722 9.88834 8.64801 9.26793 9.26842C8.64752 9.88883 7.70673 9.98358 6.00017 9.99805"
			stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path
			d="M9.99756 17.9974C9.98309 16.2908 9.88834 15.35 9.26793 14.7296C8.64752 14.1092 7.70673 14.0145 6.00017 14"
			stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path
			d="M14 6.00065C14.0145 7.70722 14.1092 8.64801 14.7296 9.26842C15.35 9.88883 16.2908 9.98358 17.9974 9.99805"
			stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<path d="M14 17.9974C14.0145 16.2908 14.1092 15.35 14.7296 14.7296C15.35 14.1092 16.2908 14.0145 17.9974 14"
		      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		<circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
	</svg>;
};
