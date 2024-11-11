import {NodeDef, WidgetProps} from '@rainbow-d9/n1';
import {DOM_KEY_WIDGET, SDP} from '@rainbow-d9/n2';
import {NodeDefExt} from '@rainbow-d9/n3';
import React, {ReactNode, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {PlaygroundEventTypes, usePlaygroundEventBus} from './playground-event-bus';

export const PLAYGROUND_WIDGET_WRAPPER = 'PWW';
const WidgetWrapperAnchor = styled.span.attrs<SDP>({[DOM_KEY_WIDGET]: 'd9-playground-widget-wrapper-anchor'})`
    display: none;
`;
export const PlaygroundWidgetWrapper = (props: NodeDef & NodeDefExt & WidgetProps & { children: ReactNode }) => {
	const ref = useRef<HTMLSpanElement>(null);
	const {on, off} = usePlaygroundEventBus();
	useEffect(() => {
		const onAskNodeDef = ($key: string, _widgetType: string, callback: (def: NodeDef & NodeDefExt) => void) => {
			if ($key !== props['data-for-playground-key']) {
				return;
			}
			// if widget is wrapped by form cell, then form cell has the same $key with this widget
			// and since widget wrapper is wrapped at outermost, which means the next sibling of widget wrapper is form cell
			// otherwise, the next sibling of widget wrapper is the widget itself
			// therefore in either way, call callback function directly since the props is same
			callback(props);
		};
		on(PlaygroundEventTypes.ASK_NODE_DEF, onAskNodeDef);
		return () => {
			off(PlaygroundEventTypes.ASK_NODE_DEF, onAskNodeDef);
		};
	}, [on, off, props]);

	return <><WidgetWrapperAnchor ref={ref}/>{props.children}</>;
};
