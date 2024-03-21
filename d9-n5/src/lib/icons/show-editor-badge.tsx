import React, {SVGProps} from 'react';

export const ShowEditorBadgeIcon = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="playground-show-editor-badge" viewBox="0 0 24 24" fill="none"
	            xmlns="http://www.w3.org/2000/svg">
		<path opacity="0.4"
		      d="M12.0001 7.89014L10.9301 9.75014C10.6901 10.1601 10.8901 10.5001 11.3601 10.5001H12.6301C13.1101 10.5001 13.3001 10.8401 13.0601 11.2501L12.0001 13.1101"
		      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
		<path
			d="M8.30035 18.0402V16.8802C6.00035 15.4902 4.11035 12.7802 4.11035 9.90018C4.11035 4.95018 8.66035 1.07018 13.8004 2.19018C16.0604 2.69018 18.0404 4.19018 19.0704 6.26018C21.1604 10.4602 18.9604 14.9202 15.7304 16.8702V18.0302C15.7304 18.3202 15.8404 18.9902 14.7704 18.9902H9.26035C8.16035 19.0002 8.30035 18.5702 8.30035 18.0402Z"
			stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
		<path opacity="0.4" d="M8.5 22.0002C10.79 21.3502 13.21 21.3502 15.5 22.0002" stroke="currentColor"
		      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>;
};
