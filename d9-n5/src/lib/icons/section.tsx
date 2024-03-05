import React, {SVGProps} from 'react';

export const SectionIcon = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="playground-section" viewBox="0 0 24 24" fill="none"
	            xmlns="http://www.w3.org/2000/svg">
		<path d="M1.99609 8.5H11.4961" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"
		      strokeLinecap="round"
		      strokeLinejoin="round"/>
		<path opacity="0.4" d="M5.99609 16.5H7.99609" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"
		      strokeLinecap="round" strokeLinejoin="round"/>
		<path opacity="0.4" d="M10.4961 16.5H14.4961" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10"
		      strokeLinecap="round" strokeLinejoin="round"/>
		<path
			d="M21.9961 12.03V16.11C21.9961 19.62 21.1061 20.5 17.5561 20.5H6.43609C2.88609 20.5 1.99609 19.62 1.99609 16.11V7.89C1.99609 4.38 2.88609 3.5 6.43609 3.5H14.4961"
			stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
		<g opacity="0.4">
			<path
				d="M19.0764 4.13031L15.3664 7.84031C15.2264 7.98031 15.0864 8.26031 15.0564 8.46031L14.8564 9.88031C14.7864 10.3903 15.1464 10.7503 15.6564 10.6803L17.0764 10.4803C17.2764 10.4503 17.5564 10.3103 17.6964 10.1703L21.4064 6.46031C22.0464 5.82031 22.3464 5.08031 21.4064 4.14031C20.4564 3.19031 19.7164 3.49031 19.0764 4.13031Z"
				stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
				strokeLinejoin="round"/>
			<path d="M18.5469 4.66016C18.8669 5.79016 19.7469 6.67016 20.8669 6.98016" stroke="currentColor"
			      strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
		</g>
	</svg>;
};
