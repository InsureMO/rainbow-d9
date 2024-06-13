import {useForceUpdate} from '@rainbow-d9/n1';
import {useEffect} from 'react';
import {EditDialogEventTypes, useEditDialogEventBus} from '../edit-dialog-event-bus';
import {ConfigurableElement} from '../types';

export const useElementValueChange = (element: ConfigurableElement) => {
	const {anchor} = element;

	const {on, off} = useEditDialogEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onElementValueChanged = (anchorOfChanged: string) => {
			if (anchor === anchorOfChanged) {
				forceUpdate();
			}
		};
		on(EditDialogEventTypes.ELEMENT_VALUE_CHANGED, onElementValueChanged);
		return () => {
			off(EditDialogEventTypes.ELEMENT_VALUE_CHANGED, onElementValueChanged);
		};
	}, [on, off, forceUpdate, anchor]);
};