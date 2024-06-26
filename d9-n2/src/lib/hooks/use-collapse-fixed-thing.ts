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
			if (containerRef == null || containerRef.current == null) {
				return;
			}
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			if (notInMe(containerRef.current!, event.target)) {
				hide();
			}
		};
		events.forEach(event => {
			window.addEventListener(event, collapse, true);
		});
		return () => {
			events.forEach(event => {
				window.removeEventListener(event, collapse, true);
			});
		};
	}, [containerRef, events, visible, hide]);
};
