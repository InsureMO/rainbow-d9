import React, {ReactNode} from 'react';
import {
	ConfigurableElement,
	ConfigurableElementBadgeCount,
	ConfigurableElementBadgeNotAvailable
} from '../../edit-dialog';
import {PipelineFileDefModel} from './types';

export const elementExposeHeaders: ConfigurableElement = {
	code: 'exposeHeaders', label: 'Expose Headers', anchor: 'expose-headers',
	badge: (model: PipelineFileDefModel): ReactNode => {
		const count = Object.keys(model.exposeHeaders ?? {}).length;
		if (count !== 0) {
			return <ConfigurableElementBadgeCount count={count}/>;
		} else {
			return <ConfigurableElementBadgeNotAvailable/>;
		}
	}
};
