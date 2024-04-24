import {BaseModel, PropValue, Undefinable} from '../types';
import {MUtils} from '../utils';

export type DataAttributeName = `data-${string}`;
export type DataAttributeDefName = `@data-${string}`;

export type DataAttributeCalculatorOptions = {
	root: BaseModel;
	model: PropValue;
}
export type DataAttributeCalculator = (options: DataAttributeCalculatorOptions) => Undefinable<string>;

export type DataAttributes = Partial<Record<DataAttributeName | DataAttributeDefName, boolean | string | DataAttributeCalculator>>;

export interface DataAttributesBeautifierOptions {
	root: BaseModel;
	model: PropValue;
}

/**
 * do when attribute value is:
 * 0. check the def
 * 1. boolean, do nothing,
 * 2. string, starts with "$pp.", treated as property path, get value from model, otherwise, do nothing,
 * 3. function, call it with model and root model, use return value as attribute value.
 * note this function is for every renderer, not for useEffect hook
 */
export const beautifyDataAttributes = (attributes: DataAttributes, options: DataAttributesBeautifierOptions) => {
	if (attributes == null) {
		return;
	}
	Object.keys(attributes)
		.filter(key => key.startsWith('data-'))
		.map(key => [key, `@${key}`])
		.forEach(([key, defKey]) => {
			if (attributes[defKey] == null) {
				// maybe first round, or no need backup to def key
				const value = attributes[key];
				const type = typeof value;
				if (value == null || value === true || value === false) {
					// no def key, original value is boolean, do nothing
				} else if (type === 'string') {
					if (value.startsWith('$pp.')) {
						// copy def to def key
						attributes[defKey] = value;
						// rewrite value from model
						attributes[key] = MUtils.getValue(options.model, value.substring(4));
					} else {
						// just a string, do nothing
					}
				} else if (type === 'function') {
					attributes[defKey] = value;
					attributes[key] = value({root: options.root, model: options.model});
				} else {
					// types rather than string or function, do nothing
				}
			} else if (typeof attributes[defKey] === 'string') {
				// def key already copied, starts with "$pp.", rewrite value from model
				attributes[key] = MUtils.getValue(options.model, attributes[defKey].substring(4));
			} else if (typeof attributes[defKey] === 'function') {
				// def key already copied, call it with model and root model
				attributes[key] = attributes[defKey]({root: options.root, model: options.model});
			} else {
				// just do nothing, never happen
			}
		});
};