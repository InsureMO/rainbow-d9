import {BaseModel, PropValue, useThrottler, VUtils} from '@rainbow-d9/n1';
import React, {MutableRefObject, ReactNode, useEffect, useRef, useState} from 'react';
import {useCollapseFixedThing} from '../../hooks';
import {toIntlLabel} from '../../intl-label';
import {ModelCarriedHandler} from '../../types';
import {GlobalEventTypes, useGlobalEventBus} from '../global-event-bus';
import {TipBody, TipContainer, TipHeader, TipLabel, TipTitle} from './widgets';

export interface TipOptions {
	ref: MutableRefObject<HTMLElement>;
	title?: ReactNode;
	body?: ReactNode;
	minWidth?: string | number;
	maxWidth?: string | number;
	maxHeight?: string | number;
	/** show time in seconds */
	delay?: number;
	tag?: string;
	/** data attribute prefix, data-, data-di- */
	prefix?: string;
}

export interface TipBuildOptions extends ModelCarriedHandler<BaseModel, PropValue> {
}

export interface TipAttachableWidget {
	tip?: Omit<TipOptions, 'ref' | 'prefix'> | ((options: TipBuildOptions) => Omit<TipOptions, 'ref' | 'prefix'>);
}

export const buildTip = (options: {
	tip?: TipAttachableWidget['tip']
} & TipBuildOptions): Omit<TipOptions, 'ref' | 'prefix'> => {
	const {tip, ...rest} = options;
	if (tip == null) {
		return {};
	} else if (typeof tip === 'function') {
		return tip(rest);
	} else {
		return tip;
	}
};

interface TipState {
	ref?: MutableRefObject<HTMLElement>;
	title?: ReactNode;
	body?: ReactNode;
	minWidth?: string | number;
	maxWidth?: string | number;
	maxHeight?: string | number;
	delay?: number;
	tag?: string;
	visible: 'visible' | 'hidden' | 'ready';
	top?: number;
	left?: number;
	hideTimeout?: number;
}

export const Tip = () => {
	const {on, off} = useGlobalEventBus();
	const ref = useRef<HTMLDivElement>(null);
	const [state, setState] = useState<TipState>({visible: 'hidden'});
	const {replace} = useThrottler();
	useEffect(() => {
		const paint = (options: TipOptions, keepPosition: boolean) => {
			replace(() => {
				const {ref, prefix = 'data'} = options;
				const {current: node} = ref;
				if (node == null) {
					return;
				}

				const body = options.body ?? node.getAttribute(`${prefix}-tip-body`);
				if (VUtils.isBlank(body)) {
					return;
				}
				const title = options.title ?? node.getAttribute(`${prefix}-tip-title`);
				const minWidth = options.minWidth ?? node.getAttribute(`${prefix}-tip-min-width`);
				const maxWidth = options.maxWidth ?? node.getAttribute(`${prefix}-tip-max-width`);
				const maxHeight = options.maxHeight ?? node.getAttribute(`${prefix}-tip-max-height`);
				const delay = (() => {
					const value = options.delay ?? node.getAttribute(`${prefix}-tip-delay`);
					const ret = VUtils.isNumber(value);
					return ret.test ? ret.value : (void 0);
				})();
				const tag = options.tag ?? node.getAttribute(`${prefix}-tip-tag`);
				// console.log('switch to ready');
				setState(state => {
					if (state.hideTimeout) {
						window.clearTimeout(state.hideTimeout);
					}
					return {
						ref, title, body, visible: 'ready', minWidth, maxWidth, maxHeight, delay, tag,
						...(keepPosition ? {top: state.top, left: state.left} : {})
					};
				});
			}, 30);
		};
		const onShowTip = (options: TipOptions) => paint(options, false);
		const onRepaintTip = (options: TipOptions) => paint(options, true);
		const onHideTip = (ref: MutableRefObject<HTMLElement>) => {
			if (ref.current !== state.ref?.current) {
				return;
			} else {
				setState(state => {
					if (state.hideTimeout) {
						window.clearTimeout(state.hideTimeout);
					}
					return {visible: 'hidden'};
				});
			}
		};
		on(GlobalEventTypes.SHOW_TIP, onShowTip);
		on(GlobalEventTypes.HIDE_TIP, onHideTip);
		on(GlobalEventTypes.REPAINT_TIP, onRepaintTip);
		return () => {
			off(GlobalEventTypes.SHOW_TIP, onShowTip);
			off(GlobalEventTypes.HIDE_TIP, onHideTip);
			off(GlobalEventTypes.REPAINT_TIP, onRepaintTip);
		};
	}, [on, off, replace, state.ref]);
	useEffect(() => {
		if (state.ref != null && state.visible === 'ready') {
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
			// console.log(top, left, width, height, myTop, myLeft, myWidth, myHeight);
			const hideTimeout = (() => {
				if (state.delay != null) {
					return setTimeout(() => setState({visible: 'hidden'}), state.delay * 1000);
				} else {
					return (void 0);
				}
			})();
			// console.log('switch to visible');
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			setState(state => ({...state, visible: 'visible', top: myTop, left: myLeft, hideTimeout}));
		}
	}, [on, off, state.ref, state.visible, state.delay]);
	useCollapseFixedThing({
		containerRef: state.ref,
		visible: state.visible !== 'hidden',
		hide: () => {
			if (state.hideTimeout) {
				window.clearTimeout(state.hideTimeout);
			}
			setState({visible: 'hidden'});
		}
	});

	if (state.ref == null) {
		return null;
	}

	// console.log(state);
	return <TipContainer visible={state.visible !== 'hidden'}
	                     minWidth={state.minWidth} maxWidth={state.maxWidth} maxHeight={state.maxHeight}
	                     tag={state.tag}
	                     top={state.top} left={state.left}
	                     ref={ref}>
		{state.title != null
			? <TipHeader><TipTitle>{toIntlLabel(state.title)}</TipTitle></TipHeader>
			: null}
		<TipBody>
			{(typeof state.body === 'string') ? <TipLabel>{toIntlLabel(state.body)}</TipLabel> : state.body}
		</TipBody>
	</TipContainer>;
};

export const useTip = (options: TipOptions) => {
	const {ref} = options;
	const {fire} = useGlobalEventBus();
	const shown = useRef(false);
	const {replace} = useThrottler();
	useEffect(() => {
		if (ref.current == null || fire == null) {
			return;
		}

		const show = () => {
			replace(() => {
				if (shown.current === true) {
					fire(GlobalEventTypes.REPAINT_TIP, options);
				} else {
					fire(GlobalEventTypes.SHOW_TIP, options);
					shown.current = true;
				}
			}, 30);
		};
		const hide = () => {
			replace(() => {
				shown.current = false;
				fire(GlobalEventTypes.HIDE_TIP, ref);
			}, 30);
		};
		const onMouseEnter = show;
		const onMouseLeave = hide;
		const onFocusIn = show;
		const onFocusOut = hide;
		const onClick = show;

		const {current} = ref;

		current.addEventListener('mouseenter', onMouseEnter);
		current.addEventListener('mouseleave', onMouseLeave);
		current.addEventListener('focusin', onFocusIn);
		current.addEventListener('focusout', onFocusOut);
		current.addEventListener('click', onClick);

		if (shown.current === true) {
			// This is very troublesome here. Because components may refresh multiple times due to various reasons,
			// such as value changes, validation information, and so on, it will result in sending multiple events.
			// Multiple events will cause confusion in the visible state, ultimately leading to abnormal tip display.
			// Therefore, here we use throttling to eliminate continuous refresh occurrences.
			replace(() => {
				fire(GlobalEventTypes.REPAINT_TIP, options);
			}, 70);
		}

		return () => {
			current.removeEventListener('mouseenter', onMouseEnter);
			current.removeEventListener('mouseleave', onMouseLeave);
			current.removeEventListener('focusin', onFocusIn);
			current.removeEventListener('focusout', onFocusOut);
			current.removeEventListener('click', onClick);
		};
	}, [fire, replace, ref, options]);
};

export * from './widgets';
