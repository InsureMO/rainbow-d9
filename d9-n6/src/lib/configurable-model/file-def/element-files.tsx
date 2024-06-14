import React, {ReactNode} from 'react';
import {ConfigurableElement, ConfigurableElementBadgeChecked, ConfigurableElementBadgeIgnored} from '../../edit-dialog';
import {PipelineFileDefModel} from './types';

export const elementFiles: ConfigurableElement = {
	code: 'files', label: 'Files', anchor: 'files',
	badge: (model: PipelineFileDefModel): ReactNode => {
		if (model.files != null && model.files !== false) {
			return <ConfigurableElementBadgeChecked/>;
		} else {
			return <ConfigurableElementBadgeIgnored/>;
		}
	}
};
