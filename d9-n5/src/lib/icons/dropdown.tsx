import React, {SVGProps} from 'react';

export const DropdownIcon = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="playground-dropdown" viewBox="-3 -3 20 20" xmlns="http://www.w3.org/2000/svg">
		<path fill="currentColor"
		      d="M15 4h-14c-0.6 0-1 0.4-1 1v6c0 0.6 0.4 1 1 1h14c0.6 0 1-0.4 1-1v-6c0-0.6-0.4-1-1-1zM10 11h-9v-6h9v6zM13 8.4l-2-1.4h4l-2 1.4z"></path>
		<path fill="currentColor" d="M2 6h1v4h-1v-4z"></path>
	</svg>;
};
