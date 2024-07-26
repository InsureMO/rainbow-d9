import React, {SVGProps} from 'react';

export const FoldSubNodes = (props: Omit<SVGProps<SVGSVGElement>, 'xmlns' | 'viewBox'>) => {
	return <svg {...props} data-icon="o23-fold-sub-nodes" viewBox="0 0 24 24" fill="none"
	            xmlns="http://www.w3.org/2000/svg">
		<path
			d="M11.3357 5.47875L7.36344 9.00968C5.79482 10.404 5.0105 11.1012 5.0105 11.9993C5.0105 12.8975 5.79481 13.5946 7.36344 14.989L11.3357 18.5199C12.0517 19.1563 12.4098 19.4746 12.7049 19.342C13.0001 19.2095 13.0001 18.7305 13.0001 17.7725V15.4279C16.6001 15.4279 20.5001 17.1422 22.0001 19.9993C22.0001 10.8565 16.6668 8.57075 13.0001 8.57075V6.22616C13.0001 5.26817 13.0001 4.78917 12.7049 4.65662C12.4098 4.52407 12.0517 4.8423 11.3357 5.47875Z"
			stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
		<path opacity="0.5"
		      d="M8.46129 4.5L3.24509 9.34362C2.45098 10.081 1.99976 11.1158 1.99976 12.1994C1.99976 13.3418 2.50097 14.4266 3.37087 15.1671L8.46129 19.5"
		      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
	</svg>;
};
