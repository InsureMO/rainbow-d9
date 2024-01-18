import {VUtils} from '@rainbow-d9/n1';
import {ChartDef} from './types';

export const redressChartMarker = (content: Pick<ChartDef, 'marker'>) => {
	if (VUtils.isNotBlank(content.marker)) {
		return content.marker;
	}
	return VUtils.generateUniqueId();
};

export const askOptions = (options: ChartDef['options']) => {
	if (typeof options === 'function') {
		return options();
	}
	return options;
};

export const askSettings = (settings: ChartDef['settings']) => {
	if (typeof settings === 'function') {
		return settings();
	}
	return settings;
};
