import React, {Fragment, useEffect} from 'react';
import {MBUtils} from '../utils';

// first run
MBUtils.createDeviceTags();

export const DeviceDetective = () => {
	// run
	useEffect(() => {
		window.addEventListener('resize', MBUtils.createDeviceTags);
		return () => {
			window.removeEventListener('resize', MBUtils.createDeviceTags);
		};
	}, []);
	return <Fragment/>;
};
