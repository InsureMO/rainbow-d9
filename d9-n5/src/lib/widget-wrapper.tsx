import {NodeDef, WidgetProps} from '@rainbow-d9/n1';
import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import {NodeDefExt} from '@rainbow-d9/n3';
import React, {ReactNode, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {PlaygroundEventTypes, usePlaygroundEventBus} from './playground-event-bus';

export const PLAYGROUND_WIDGET_WRAPPER = 'PWW';
const WidgetWrapperAnchor = styled.span.attrs({[DOM_KEY_WIDGET]: 'd9-playground-widget-wrapper-anchor'})`
    display: none;
`;
export const PlaygroundWidgetWrapper = (props: NodeDef & NodeDefExt & WidgetProps & { children: ReactNode }) => {
	const ref = useRef<HTMLSpanElement>(null);
	const {on, off} = usePlaygroundEventBus();
	useEffect(() => {
		const onAskNodeDef = ($key: string, widgetType: string, callback: (def: NodeDef & NodeDefExt) => void) => {
			if ($key !== props['data-for-playground-key']) {
				return;
			}
			if (ref.current.nextElementSibling.getAttribute('data-w') !== widgetType) {
				return;
			}
			callback(props);
		};
		on(PlaygroundEventTypes.ASK_NODE_DEF, onAskNodeDef);
		return () => {
			off(PlaygroundEventTypes.ASK_NODE_DEF, onAskNodeDef);
		};
	}, [on, off, props]);

	return <><WidgetWrapperAnchor ref={ref}/>{props.children}</>;
};
