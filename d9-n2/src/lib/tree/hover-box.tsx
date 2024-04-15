import React, {useEffect, useState} from 'react';
import {useTreeEventBus} from './event/tree-event-bus';
import {TreeEventTypes} from './event/tree-event-bus-types';
import {TreeHoverShade} from './widgets';

interface TreeHoverState {
	top?: number;
	height?: number;
	visible: boolean;
}

export const TreeHoverBox = () => {
	const {on, off} = useTreeEventBus();
	const [state, setState] = useState<TreeHoverState>({visible: false});
	useEffect(() => {
		const onShowHoverBox = (top: number, height: number) => {
			setState({visible: true, top, height});
		};
		const onHideHoverBox = () => setState({visible: false});
		on(TreeEventTypes.SHOW_HOVER_BOX, onShowHoverBox);
		on(TreeEventTypes.HIDE_HOVER_BOX, onHideHoverBox);
		return () => {
			off(TreeEventTypes.SHOW_HOVER_BOX, onShowHoverBox);
			off(TreeEventTypes.HIDE_HOVER_BOX, onHideHoverBox);
		};
	}, [on, off]);
	return <TreeHoverShade top={state.top ?? 0} height={state.height ?? 0} visible={state.visible}/>;
};
