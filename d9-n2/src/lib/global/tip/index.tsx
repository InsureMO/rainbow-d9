import {VUtils} from '@rainbow-d9/n1';
import React, {MutableRefObject, ReactNode, useEffect, useRef, useState} from 'react';
import {useCollapseFixedThing} from '../../hooks';
import {GlobalEventTypes, useGlobalEventBus} from '../global-event-bus';
import {TipBody, TipContainer, TipHeader, TipLabel, TipTitle} from './widgets';

export interface TipOptions {
	ref: MutableRefObject<HTMLElement>;
	title?: ReactNode;
	body?: ReactNode;
	minWidth?: string | number;
	maxWidth?: string | number;
	maxHeight?: string | number;
	tag?: string;
	/** data attribute prefix, data-, data-di- */
	prefix?: string;
}

interface TipState {
	ref?: MutableRefObject<HTMLElement>;
	title?: ReactNode;
	body?: ReactNode;
	minWidth?: string | number;
	maxWidth?: string | number;
	maxHeight?: string | number;
	tag?: string;
	visible: boolean;
	top?: number;
	left?: number;
}

export const Tip = () => {
	const {on, off} = useGlobalEventBus();
	const ref = useRef<HTMLDivElement>(null);
	const [state, setState] = useState<TipState>({visible: false});
	useEffect(() => {
		const onShowTip = (options: TipOptions) => {
			const {ref, prefix = 'data'} = options;
			const title = options.title ?? ref.current.getAttribute(`${prefix}-tip-title`);
			const body = options.body ?? ref.current.getAttribute(`${prefix}-tip-body`);
			const minWidth = options.minWidth ?? ref.current.getAttribute(`${prefix}-tip-min-width`);
			const maxWidth = options.maxWidth ?? ref.current.getAttribute(`${prefix}-tip-max-width`);
			const maxHeight = options.maxHeight ?? ref.current.getAttribute(`${prefix}-tip-max-height`);
			const tag = options.tag ?? ref.current.getAttribute(`${prefix}-tip-tag`);
			if (VUtils.isBlank(body)) {
				return;
			}
			setState({ref, title, body, visible: false, minWidth, maxWidth, maxHeight, tag});
		};
		const onHideTip = (ref: MutableRefObject<HTMLElement>) => {
			if (ref.current !== state.ref?.current) {
				return;
			} else {
				setState({visible: false});
			}
		};
		on(GlobalEventTypes.SHOW_TIP, onShowTip);
		on(GlobalEventTypes.HIDE_TIP, onHideTip);
		return () => {
			off(GlobalEventTypes.SHOW_TIP, onShowTip);
			off(GlobalEventTypes.HIDE_TIP, onHideTip);
		};
	}, [on, off, state.ref]);
	useEffect(() => {
		if (state.ref != null && !state.visible) {
			const {top, left, width, height} = state.ref.current.getBoundingClientRect();
			const {width: myWidth, height: myHeight} = ref.current.getBoundingClientRect();
			const {top: myTop} = ((): { top: number; onTop: boolean } => {
				if (top - myHeight - 6 >= 0) {
					// put on top
					return {top: top - myHeight - 4, onTop: true};
				} else if (top + height + myHeight + 6 < window.innerHeight) {
					// put on bottom
					return {top: top + height + 4, onTop: false};
				} else {
					// put on top
					return {top: top - myHeight - 4, onTop: true};
				}
			})();
			const myLeft = (() => {
				if (width > myWidth) {
					return left + (width - myWidth) / 2;
				} else {
					return left - (myWidth - width) / 2;
				}
			})();
			setState(state => ({...state, visible: true, top: myTop, left: myLeft}));
		}
	}, [state.ref, state.visible]);
	useCollapseFixedThing({
		containerRef: state.ref,
		visible: state.visible,
		hide: () => setState({visible: false})
	});

	if (state.ref == null) {
		return null;
	}

	return <TipContainer visible={state.visible}
	                     minWidth={state.minWidth} maxWidth={state.maxWidth} maxHeight={state.maxHeight}
	                     tag={state.tag}
	                     top={state.top} left={state.left}
	                     ref={ref}>
		{state.title != null
			? <TipHeader><TipTitle>{state.title}</TipTitle></TipHeader>
			: null}
		<TipBody>
			{(typeof state.body === 'string') ? <TipLabel>{state.body}</TipLabel> : state.body}
		</TipBody>
	</TipContainer>;
};

export const useTip = (options: TipOptions) => {
	const {ref} = options;
	const {fire} = useGlobalEventBus();
	useEffect(() => {
		if (ref.current == null || fire == null) {
			return;
		}

		const onMouseEnter = () => {
			fire(GlobalEventTypes.SHOW_TIP, options);
		};
		const onMouseLeave = () => {
			fire(GlobalEventTypes.HIDE_TIP, ref);
		};
		const onFocusIn = () => {
			fire(GlobalEventTypes.SHOW_TIP, options);
		};
		const onFocusOut = () => {
			fire(GlobalEventTypes.HIDE_TIP, ref);
		};
		const onClick = () => {
			fire(GlobalEventTypes.SHOW_TIP, options);
		};

		const {current} = ref;

		current.addEventListener('mouseenter', onMouseEnter);
		current.addEventListener('mouseleave', onMouseLeave);
		current.addEventListener('focusin', onFocusIn);
		current.addEventListener('focusout', onFocusOut);
		current.addEventListener('click', onClick);
		return () => {
			current.removeEventListener('mouseenter', onMouseEnter);
			current.removeEventListener('mouseleave', onMouseLeave);
			current.removeEventListener('focusin', onFocusIn);
			current.removeEventListener('focusout', onFocusOut);
			current.removeEventListener('click', onClick);
		};
	}, [fire, ref, options]);
};
