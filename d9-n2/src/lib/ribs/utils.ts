import {DEFAULTS} from './constants';

export const setRibsDefaults = (defaults: {
	useSectionStyleIcons?: boolean;
}) => {
	DEFAULTS.USE_SECTION_STYLE_ICONS = defaults.useSectionStyleIcons ?? DEFAULTS.USE_SECTION_STYLE_ICONS;
};

export const isUseSectionStyleIcons = (): boolean => DEFAULTS.USE_SECTION_STYLE_ICONS;
