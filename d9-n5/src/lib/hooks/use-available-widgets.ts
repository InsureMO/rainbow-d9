import {useEffect, useState} from 'react';
import {PlaygroundWidgets} from '../types';
import {
	computeConstants,
	computeIcons,
	computeReferences,
	computeWidgetGroups,
	computeWidgets
} from '../widget-constants';

export interface AvailableWidgets {
	groups: PlaygroundWidgets['groups'];
	widgets: PlaygroundWidgets['widgets'];
	icons: PlaygroundWidgets['icons'];
	constants: PlaygroundWidgets['constants'];
	extensions: PlaygroundWidgets['extensions'];
}

export const useAvailableWidgets = (widgets: PlaygroundWidgets, useN2: boolean) => {
	const [availableWidgets, setAvailableWidgets] = useState<AvailableWidgets>(() => {
		return {
			groups: computeWidgetGroups(widgets?.groups ?? [], useN2),
			widgets: computeWidgets(widgets?.widgets ?? [], useN2),
			icons: computeIcons(widgets?.icons ?? [], useN2),
			constants: computeConstants(widgets?.constants ?? [], useN2),
			extensions: computeReferences(widgets?.extensions ?? [], useN2)
		};
	});
	useEffect(() => {
		setAvailableWidgets({
			groups: computeWidgetGroups(widgets?.groups ?? [], useN2),
			widgets: computeWidgets(widgets?.widgets ?? [], useN2),
			icons: computeIcons(widgets?.icons ?? [], useN2),
			constants: computeConstants(widgets?.constants ?? [], useN2),
			extensions: computeReferences(widgets?.extensions ?? [], useN2)
		});
	}, [widgets, useN2]);

	return availableWidgets;
};
