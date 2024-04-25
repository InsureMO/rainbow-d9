import React, {useEffect, useRef, useState} from 'react';
import {useTreeEventBus} from './event/tree-event-bus';
import {TreeEventTypes} from './event/tree-event-bus-types';
import {TreeSearchInput} from './widgets';

export interface TreeSearchBoxState {
	value: string;
	visible: boolean;
}

export const TreeSearchBox = (props: { disabled: boolean }) => {
	const {disabled} = props;

	const ref = useRef<HTMLDivElement>(null);
	const {on, off, fire} = useTreeEventBus();
	const [state, setState] = useState<TreeSearchBoxState>({value: '', visible: false});
	useEffect(() => {
		if (disabled) {
			return;
		}
		const onOpenSearchBox = () => {
			if (state.visible) {
				return;
			}
			setState({value: '', visible: true});
		};
		const onHideSearchBox = () => {
			if (!state.visible) {
				return;
			}
			fire(TreeEventTypes.DISCARD_FILTER);
			setState({value: '', visible: false});
		};
		on(TreeEventTypes.OPEN_SEARCH_BOX, onOpenSearchBox);
		on(TreeEventTypes.HIDE_SEARCH_BOX, onHideSearchBox);
		return () => {
			off(TreeEventTypes.OPEN_SEARCH_BOX, onOpenSearchBox);
			off(TreeEventTypes.HIDE_SEARCH_BOX, onHideSearchBox);
		};
	}, [on, off, fire, disabled, state.visible]);
	useEffect(() => {
		if (disabled) {
			return;
		}
		if (state.visible) {
			ref.current?.querySelector('input')?.focus();
		} else {
			ref.current?.parentElement?.focus();
		}
	}, [disabled, state.visible]);

	const onValueChange = (value: string) => {
		setState(state => ({...state, value}));
		fire(TreeEventTypes.FILTER_CHANGED, value);
	};

	return <TreeSearchInput visible={state.visible} value={state.value} onValueChange={onValueChange}
	                        leads={['$icons.search']}
	                        placeholder="tree.filter.placeholder"
	                        ref={ref}/>;
};
