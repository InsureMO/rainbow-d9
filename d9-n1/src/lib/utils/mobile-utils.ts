export interface MobileUtilsType {
	/**
	 * get value by given property path from given model
	 */
	readonly detect: () => boolean;
	readonly createDeviceTags: () => void;
	readonly isMobile: () => boolean;
	readonly isTouchable: () => boolean;
}

const DeviceTags = {
	touchable: false
};

export const MBUtils: MobileUtilsType = {
	detect: () => {
		let hasTouchScreen = false;
		if ('maxTouchPoints' in navigator) {
			hasTouchScreen = navigator.maxTouchPoints > 0;
		} else if ('msMaxTouchPoints' in navigator) {
			// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
			// @ts-ignore
			hasTouchScreen = navigator.msMaxTouchPoints > 0;
		} else {
			const mobile = matchMedia?.('(any-pointer:coarse)').matches;
			if (mobile) {
				hasTouchScreen = true;
			} else if ('orientation' in window) {
				hasTouchScreen = true; // deprecated, but good fallback
			} else {
				// Only as a last resort, fall back to user agent sniffing
				// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
				// @ts-ignore
				const UA = navigator.userAgent;
				hasTouchScreen =
					/\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
					/\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
			}
		}
		return hasTouchScreen;
	},
	createDeviceTags: () => {
		if (MBUtils.detect()) {
			DeviceTags.touchable = true;
			document.documentElement.setAttribute('data-touchable', 'true');
		} else {
			DeviceTags.touchable = false;
			document.documentElement.removeAttribute('data-touchable');
		}
	},
	isMobile: () => DeviceTags.touchable,
	isTouchable: () => DeviceTags.touchable
};