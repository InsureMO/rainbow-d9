import {Nullable} from '@rainbow-d9/n1';
import {RefObject, useEffect} from 'react';

export const notInMe = (me: HTMLOrSVGElement, target: Nullable<EventTarget>): boolean => {
	const body = document.body;
	if (target === window) {
		return true;
	}
	let parent: Nullable<HTMLElement> = target as HTMLElement;
	while (parent != null) {
		if (parent === me) {
			return false;
		}
		if (parent === body || parent == null) {
			return true;
		}
		parent = parent?.parentElement;
	}
	return true;
};

const collapseFixedThingDebug = {enabled: false};
export const switchCollapseFixedThingDebug = (enabled = false) => {
	collapseFixedThingDebug.enabled = enabled;
};

export const useCollapseFixedThing = (options: {
	containerRef: RefObject<HTMLOrSVGElement>;
	popupRef?: RefObject<HTMLOrSVGElement>;
	visible?: boolean;
	hide: () => void;
	events?: Array<'scroll' | 'focus' | 'click'>
}) => {
	const {containerRef, popupRef, visible = true, hide, events = ['scroll', 'focus', 'click']} = options;

	useEffect(() => {
		if (!visible) {
			return;
		}
		// popup might be rendered in a portal,
		// therefore any scroll/focus/click event triggered outside of container or popup should hide it
		// sometimes, there is no popup, only container. in this case, check the event target is not in container
		const collapse = (event: Event) => {
			if (containerRef?.current != null && notInMe(containerRef.current, event.target)
				&& (popupRef?.current == null || notInMe(popupRef.current, event.target))) {
				hide();
			}
		};
		events.forEach(event => {
			window.addEventListener(event, collapse, true);
		});
		const collapseOnBlur = (event: FocusEvent) => {
			// collapse on blur, only when focus element or related target of blur event is not in container or popup
			// if focus element and related target is not found, ignore this event
			// sometimes, there is no popup, only container. in this case, check the event target is not in container
			setTimeout(() => {
				const node = document.querySelector(':focus') ?? event.relatedTarget;
				if (node != null
					&& containerRef?.current != null && notInMe(containerRef.current, node)
					&& (popupRef?.current == null || notInMe(popupRef.current, node))) {
					hide();
				}
			}, 10);
		};
		if (!collapseFixedThingDebug.enabled) {
			window.addEventListener('blur', collapseOnBlur, true);
		}
		return () => {
			events.forEach(event => {
				window.removeEventListener(event, collapse, true);
			});
			window.removeEventListener('blur', collapseOnBlur, true);
		};
	}, [containerRef, popupRef, events, visible, hide]);
};
