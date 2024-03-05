import React, {SVGProps} from 'react';

export const CaptionIcon = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="playground-caption" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
	            viewBox="0 0 24 24">
		<path
			d="M1.6 18.3L5.8 5.9h2.5l4.2 12.4h-2.4L9.2 15H4.9l-1.1 3.4H1.6zM7 8.1l-1.6 5.2h3.3L7 8.1zM15.7 16.9l-.1 1.5h-2.1V5.2h2.2V10h.1c.4-.8 1.2-1.5 2.8-1.5 2.3 0 3.7 1.7 3.7 4.4v1c0 2.9-1.4 4.5-3.7 4.5-1.6.1-2.5-.6-2.9-1.5zm4.3-3v-.8c0-1.8-.8-2.8-2.1-2.8s-2.2 1.1-2.2 2.8v.9c0 1.5.7 2.7 2.2 2.7 1.3 0 2.1-.9 2.1-2.8z"/>
	</svg>;
};
