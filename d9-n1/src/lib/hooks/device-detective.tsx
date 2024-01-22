import React, {Fragment, useEffect, useState} from 'react';
import {RootEventTypes, useRootEventBus} from '../events';
import {DeviceTags, MBUtils} from '../utils';

// first run
MBUtils.createDeviceTagsOnHTMLTag();

export const DeviceDetective = () => {
	const {fire} = useRootEventBus();

	const [tags, setTags] = useState<DeviceTags>(MBUtils.computeDeviceTags());
	// run
	useEffect(() => {
		const onWindowResize = () => {
			MBUtils.detect();
			const newTags = MBUtils.computeDeviceTags();
			MBUtils.createDeviceTagsOnHTMLTag(newTags);
			setTags(newTags);
			if (fire != null) {
				const changed = Object.keys(newTags).some(key => newTags[key] !== tags[key]);
				if (changed) {
					fire(RootEventTypes.DEVICE_CHANGED, newTags);
				}
			}
		};
		window.addEventListener('resize', onWindowResize);
		return () => {
			window.removeEventListener('resize', onWindowResize);
		};
	}, [fire, tags]);
	return <Fragment/>;
};

export const useDeviceTags = () => {
	const {on, off} = useRootEventBus();
	const [tags, setTags] = useState<DeviceTags>(MBUtils.computeDeviceTags());
	useEffect(() => {
		const onDeviceChanged = (tags: DeviceTags) => setTags(tags);
		on(RootEventTypes.DEVICE_CHANGED, onDeviceChanged);
		return () => {
			off(RootEventTypes.DEVICE_CHANGED, onDeviceChanged);
		};
	}, [on, off]);

	return tags;
};
