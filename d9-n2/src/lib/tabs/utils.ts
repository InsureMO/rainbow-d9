import {Undefinable, VUtils} from '@rainbow-d9/n1';
import {TabDef, TabsProps} from './types';

export const redressTabMarker = (content: TabDef) => {
	if (VUtils.isNotBlank(content.marker)) {
		return content.marker;
	}
	if (typeof content.title === 'string') {
		content.marker = content.title;
		return content.marker;
	}
	content.marker = VUtils.generateUniqueId();
	return content.marker;
};

export const findInitActiveOne = (contents: TabsProps['contents'], initActive?: TabsProps['initActive']): [TabDef, number] => {
	if (VUtils.isBlank(`${initActive ?? ''}`)) {
		return [(contents ?? [])[0], 0];
	}
	let found: TabDef;
	if (typeof initActive === 'string') {
		// it is a marker
		found = (contents ?? []).find((content) => content.marker === initActive) ?? (void 0);
	} else if (typeof initActive === 'number') {
		// it is tab index
		found = (contents ?? [])[initActive] ?? (void 0);
	}
	if (found == null) {
		return [(contents ?? [])[0], 0];
	} else {
		return [found, (contents ?? []).indexOf(found)];
	}
};

export const findActiveOne = (contents: TabsProps['contents'], index: number, marker: string): Undefinable<[TabDef, number]> => {
	let found = (contents ?? []).find(content => content.marker === marker);
	if (found == null) {
		found = (contents ?? []).find((_, i) => i === index);
	}
	if (found == null) {
		return (void 0);
	}
	return [found, (contents ?? []).indexOf(found)];
};
