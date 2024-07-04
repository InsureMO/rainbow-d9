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
	visible?: boolean;
	hide: () => void;
	events?: Array<'scroll' | 'focus' | 'click'>
}) => {
	const {containerRef, visible = true, hide, events = ['scroll', 'focus', 'click']} = options;

	useEffect(() => {
		if (!visible) {
			return;
		}
		const collapse = (event: Event) => {
			if (containerRef?.current != null && notInMe(containerRef.current, event.target)) {
				hide();
			}
		};
		events.forEach(event => {
			window.addEventListener(event, collapse, true);
		});
		const collapseOnBlur = () => {
			setTimeout(() => {
				const node = document.querySelector(':focus');
				if (node == null || (containerRef?.current != null && notInMe(containerRef.current, node))) {
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
	}, [containerRef, events, visible, hide]);
};
