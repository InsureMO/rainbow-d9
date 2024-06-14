import {useForceUpdate} from '@rainbow-d9/n1';
import {useEffect} from 'react';
import {EditDialogEventTypes, useEditDialogEventBus} from '../edit-dialog-event-bus';
import {ConfigurableElement} from '../types';

export const useElementValueChangeBy = (element: ConfigurableElement) => {
	const {changeBy} = element;

	const {on, off} = useEditDialogEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		if (changeBy == null || changeBy.length === 0) {
			return;
		}
		const onElementValueChanged = (anchorOfChanged: string) => {
			if (changeBy.includes(anchorOfChanged)) {
				forceUpdate();
			}
		};
		on(EditDialogEventTypes.ELEMENT_VALUE_CHANGED, onElementValueChanged);
		return () => {
			off(EditDialogEventTypes.ELEMENT_VALUE_CHANGED, onElementValueChanged);
		};
	}, [on, off, forceUpdate, changeBy]);
};