import {VUtils} from '@rainbow-d9/n1';
import {ChartDef} from './types';

export const redressChartMarker = (content: Pick<ChartDef, 'marker'>) => {
	if (VUtils.isNotBlank(content.marker)) {
		return content.marker;
	}
	content.marker = VUtils.generateUniqueId();
	return content.marker;
};
