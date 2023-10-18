import {PropertyPath, PropValue} from '../types';
import {N1Logger} from './logger';
import {PPUtils} from './property-path-utils';
import {VUtils} from './value-utils';

export interface ModelUtilsType {
	/**
	 * get value by given property path from given model
	 */
	readonly getValue: (model: PropValue, path?: PropertyPath) => PropValue;
	/**
	 * set given value to given model on given property path.
	 * returns old value after set
	 */
	readonly setValue: (model: PropValue, path: PropertyPath, value: PropValue) => PropValue;
}

export const MUtils: ModelUtilsType = {
	getValue: (model: PropValue, path?: PropertyPath): PropValue => {
		if (PPUtils.isLevelStayed(path)) {
			// returns parent itself if property points me
			return model;
		}
		if (model == null) {
			return null;
		}

		return PPUtils.segments(PPUtils.relative(path)).reduce((fromModel, segment) => {
			if (fromModel == null) {
				// cannot know what the accurate type of parent, return null anyway.
				return null;
			}
			if (VUtils.isPrimitive(fromModel)) {
				// cannot get property from primitive value, raise exception here
				N1Logger.error('Root is ', model, ', direct parent is ', fromModel, 'MUtils');
				N1Logger.error(`Cannot retrieve value from model by path[${path}].`, 'MUtils');
				return null;
			}

			if (Array.isArray(fromModel)) {
				// get values from every item and merge into one array
				return fromModel.map(item => {
					if (item == null) {
						return null;
					}
					if (VUtils.isPrimitive(item)) {
						N1Logger.error('Root is ', model, ', direct parent is ', item, 'MUtils');
						N1Logger.error(`Cannot retrieve value from model by path[${path}].`, 'MUtils');
						return null;
					}
					return item[segment];
				});
			} else {
				// get value from model directly
				return fromModel[segment];
			}
		}, model);
	},
	setValue: (model: PropValue, path: PropertyPath, value: PropValue): PropValue => {
		const oldValue = MUtils.getValue(model, path);

		const segments = PPUtils.segments(PPUtils.relative(path));
		const count = segments.length;
		const valueIndex = count - 1;
		segments.reduce((toModel, segment, index) => {
			if (toModel == null || VUtils.isPrimitive(toModel)) {
				// null or primitive value detected won't stop the reducing, output error log on last round only
				if (index === valueIndex) {
					N1Logger.error('Root is ', model, ', direct parent is ', toModel, 'MUtils');
					N1Logger.error(`Cannot set value into model by path[${path}].`, 'MUtils');
				}
				return toModel;
			}
			if (index === valueIndex) {
				toModel[segment] = value;
				// returns undefined since it is the last one
				return (void 0);
			} else {
				const value = toModel[segment];
				if (value == null) {
					// create one, and return. it must be an object
					const newOne = {};
					toModel[segment] = newOne;
					return newOne;
				} else if (VUtils.isPrimitive(toModel)) {
					// reducing continue, and will be caught by first if check, and output error log
					return toModel;
				} else {
					return value;
				}
			}
		}, model);

		return oldValue;
	}
};

