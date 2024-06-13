import {useForceUpdate} from '@rainbow-d9/n1';
import {useEffect} from 'react';
import {EditDialogEventTypes, useEditDialogEventBus} from '../edit-dialog-event-bus';
import {ConfigurableElement, ConfigurableModel} from '../types';

export const useElementVisible = (element: ConfigurableElement, model: ConfigurableModel) => {
	const {visibleOn, visible} = element;

	const {on, off} = useEditDialogEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		if (visibleOn == null || visibleOn.length === 0) {
			return;
		}
		const onElementValueChanged = (anchor: string) => {
			if (visibleOn.includes(anchor)) {
				forceUpdate();
			}
		};
		on(EditDialogEventTypes.ELEMENT_VALUE_CHANGED, onElementValueChanged);
		return () => {
			off(EditDialogEventTypes.ELEMENT_VALUE_CHANGED, onElementValueChanged);
		};
	}, [on, off, forceUpdate, visibleOn]);

	return visible == null || visible(model);
};