import {DEFAULTS} from './constants';

export const setRibsDefaults = (defaults: {
	useSectionStyleIcons?: boolean; showRowIndex?: boolean;
}) => {
	DEFAULTS.USE_SECTION_STYLE_ICONS = defaults.useSectionStyleIcons ?? DEFAULTS.USE_SECTION_STYLE_ICONS;
	DEFAULTS.SHOW_ROW_INDEX = defaults.showRowIndex ?? DEFAULTS.SHOW_ROW_INDEX;
};

export const isUseSectionStyleIcons = (): boolean => DEFAULTS.USE_SECTION_STYLE_ICONS;
export const isShowRowIndex = (): boolean => DEFAULTS.SHOW_ROW_INDEX;
