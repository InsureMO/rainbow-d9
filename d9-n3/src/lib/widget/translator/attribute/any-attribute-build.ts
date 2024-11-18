import {Nullable, Undefinable, VUtils} from '@rainbow-d9/n1';
import {ParsedListItemAttributePair} from '../../../semantic';
import {FALSE_VALUES, TRUE_VALUES} from './constants';
import {AttributeValueBuild, WidgetPropertyName} from './types';

export const tryBoolOnAttrValue = (value?: string): string | boolean | null | undefined => {
	value = (value || '').trim();
	if (VUtils.isBlank(value)) {
		return value;
	} else if (TRUE_VALUES.includes(value)) {
		return true;
	} else if (FALSE_VALUES.includes(value)) {
		return false;
	} else {
		return value;
	}
};

export const tryNumOnAttrValue = (value?: string): string | number | null | undefined => {
	value = (value || '').trim();
	if (VUtils.isBlank(value)) {
		return value;
	} else {
		try {
			const v = Number(value);
			if (isNaN(v)) {
				return value;
			} else {
				return v;
			}
		} catch {
			return value;
		}
	}
};

export const tryBoolAndNumOnAttrValue = (value?: string): string | number | boolean | null | undefined => {
	const bool = tryBoolOnAttrValue(value);
	if (bool !== value) {
		return bool;
	} else {
		return tryNumOnAttrValue(value);
	}
};

export const tryBoolAndNumOnAttrValueWithPrefix = (value?: string): string | number | boolean | null | undefined => {
	value = (value || '').trim();
	if (VUtils.isBlank(value)) {
		return value;
	}
	if (value.startsWith('s:') || value.startsWith('S:')) {
		return value.substring(2);
	} else if (value.startsWith('n:') || value.startsWith('N:')) {
		return tryNumOnAttrValue(value.substring(2));
	} else {
		return tryBoolOnAttrValue(value);
	}
};

export class AnyAttributeBuild implements AttributeValueBuild<string | number | boolean> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public accept(_key: WidgetPropertyName) {
		return true;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public build(value: Undefinable<string>, _list: ParsedListItemAttributePair): Nullable<string | number | boolean> {
		return tryBoolAndNumOnAttrValue(value);
	}
}