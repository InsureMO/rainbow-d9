import React, {useEffect, useRef, useState} from 'react';
import {UnwrappedDecorateInput} from '../unwrapped/decorate-input';
import {useTreeEventBus} from './event/tree-event-bus';
import {TreeEventTypes} from './event/tree-event-bus-types';

export interface TreeSearchBoxState {
	value: string;
	visible: boolean;
}

export const TreeSearchBox = () => {
	const ref = useRef<HTMLDivElement>(null);
	const {on, off, fire} = useTreeEventBus();
	const [state, setState] = useState<TreeSearchBoxState>({value: '', visible: false});
	useEffect(() => {
		const onSwitchSearchBox = () => {
			if (state.visible) {
				// hide
				fire(TreeEventTypes.DISCARD_FILTER);
			}
			setState({value: '', visible: !state.visible});
		};
		on(TreeEventTypes.SWITCH_SEARCH_BOX, onSwitchSearchBox);
		return () => {
			off(TreeEventTypes.SWITCH_SEARCH_BOX, onSwitchSearchBox);
		};
	}, [on, off, fire, state.visible]);
	useEffect(() => {
		if (state.visible) {
			ref.current?.querySelector('input')?.focus();
		} else {
			ref.current?.parentElement?.focus();
		}
	}, [state.visible]);

	const onValueChange = (value: string) => {
		setState(state => ({...state, value}));
		fire(TreeEventTypes.FILTER_CHANGED, value);
	};

	return <UnwrappedDecorateInput visible={state.visible} value={state.value} onValueChange={onValueChange}
	                               leads={['$icons.search']}
	                               ref={ref}/>;
};
