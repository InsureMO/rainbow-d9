import {Undefinable} from '../types';

export interface DeviceType {
	touchable: boolean;
	mobile: boolean;
	tablet: boolean;
	desktop: boolean;
}

export type AccurateDetective = (device: DeviceType) => DeviceType;

export type DeviceTag = `data-${keyof DeviceType}`
export type DeviceTags = Record<DeviceTag, boolean>;

export interface MobileUtilsType {
	readonly registerAccurateDetective: (detective: AccurateDetective) => void;
	/**
	 * detect device type
	 */
	readonly detect: () => DeviceType;
	/**
	 * won't detect again, just return the cached result, but use new object
	 */
	readonly computeDeviceTags: () => DeviceTags;
	/**
	 * use given tags or compute new tags and set them on html tag
	 */
	readonly createDeviceTagsOnHTMLTag: (tags?: DeviceTags) => void;
	readonly isMobile: () => boolean;
	readonly isTablet: () => boolean;
	readonly isDesktop: () => boolean;
	readonly isTouchable: () => boolean;
}

const REGISTERED: { detective: Undefinable<AccurateDetective> } = {
	detective: (void 0)
};

const DETECTED_DEVICE = {
	touchable: false,
	mobile: false,
	tablet: false,
	desktop: true
};

export const MBUtils: MobileUtilsType = {
	registerAccurateDetective: detective => REGISTERED.detective = detective,
	detect: () => {
		let touchable = false;
		if ('maxTouchPoints' in navigator) {
			touchable = navigator.maxTouchPoints > 0;
		} else if ('msMaxTouchPoints' in navigator) {
			// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
			// @ts-ignore
			touchable = navigator.msMaxTouchPoints > 0;
		} else {
			const mobile = matchMedia?.('(any-pointer:coarse)').matches;
			if (mobile) {
				touchable = true;
			} else if ('orientation' in window) {
				touchable = true; // deprecated, but good fallback
			} else {
				// Only as a last resort, fall back to user agent sniffing
				// eslint-disable-next-line  @typescript-eslint/ban-ts-comment
				// @ts-ignore
				const UA = navigator.userAgent;
				touchable =
					/\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
					/\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
			}
		}
		DETECTED_DEVICE.touchable = touchable;
		if (touchable) {
			const {innerWidth, innerHeight} = window;
			if (innerWidth <= 499 || innerHeight <= 499) {
				DETECTED_DEVICE.mobile = true;
				DETECTED_DEVICE.tablet = false;
				DETECTED_DEVICE.desktop = false;
			} else {
				DETECTED_DEVICE.mobile = false;
				DETECTED_DEVICE.tablet = true;
				DETECTED_DEVICE.desktop = false;
			}
		} else {
			// only desktop is not touchable
			DETECTED_DEVICE.mobile = false;
			DETECTED_DEVICE.tablet = false;
			DETECTED_DEVICE.desktop = true;
		}

		return REGISTERED.detective == null ? DETECTED_DEVICE : REGISTERED.detective(DETECTED_DEVICE);
	},
	computeDeviceTags: (): DeviceTags => {
		return Object.keys(DETECTED_DEVICE).reduce((tags, key) => {
			tags[`data-${key}`] = DETECTED_DEVICE[key];
			return tags;
		}, {} as DeviceTags);
	},
	createDeviceTagsOnHTMLTag: (tags?: DeviceTags) => {
		if (tags == null) {
			MBUtils.detect();
			tags = MBUtils.computeDeviceTags();
		}
		Object.keys(tags).forEach(tag => {
			document.documentElement.setAttribute(tag, tags[tag]);
		});
	},
	isMobile: () => DETECTED_DEVICE.touchable && DETECTED_DEVICE.mobile,
	isTablet: () => DETECTED_DEVICE.touchable && DETECTED_DEVICE.tablet,
	isDesktop: () => DETECTED_DEVICE.desktop,
	isTouchable: () => DETECTED_DEVICE.touchable
};