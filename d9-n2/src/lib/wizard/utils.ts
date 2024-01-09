import {Undefinable, VUtils} from '@rainbow-d9/n1';
import {WizardProps, WizardStepDef} from './types';

export const redressStepMarker = (content: WizardStepDef) => {
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

export const findActiveOne = (contents: WizardProps['contents'], index: number, marker: string): Undefinable<[WizardStepDef, number]> => {
	// noinspection DuplicatedCode
	let found = (contents ?? []).find(content => content.marker === marker);
	if (found == null) {
		found = (contents ?? []).find((_, i) => i === index);
	}
	if (found == null) {
		return (void 0);
	}
	return [found, (contents ?? []).indexOf(found)];
};
