import {ConfigurableElement} from '../../../../edit-dialog';
import {Labels} from '../../../../labels';

export const createMainContentElement = (...children: Array<ConfigurableElement>): ConfigurableElement => {
	return {
		code: 'main-content', label: Labels.StepMainContent, anchor: 'main-content',
		children,
		group: true
	};
};
