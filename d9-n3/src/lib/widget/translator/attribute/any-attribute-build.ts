import {Nullable, Undefinable, VUtils} from '@rainbow-d9/n1';
import {ParsedListItemAttributePair} from '../../../semantic';
import {FALSE_VALUES, TRUE_VALUES} from './constants';
import {AttributeValueBuild, WidgetPropertyName} from './types';

export class AnyAttributeBuild implements AttributeValueBuild<string | number | boolean> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public accept(_key: WidgetPropertyName) {
		return true;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public build(value: Undefinable<string>, _list: ParsedListItemAttributePair): Nullable<string | number | boolean> {
		value = (value || '').trim();
		if (VUtils.isBlank(value)) {
			return value;
		} else if (TRUE_VALUES.includes(value)) {
			return true;
		} else if (FALSE_VALUES.includes(value)) {
			return false;
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
	}
}