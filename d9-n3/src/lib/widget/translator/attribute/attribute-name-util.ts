import {MonitorNodeAttributes} from '@d9/n1';
import {WidgetType} from '../../../semantic';
import {AnyAttributeName, WidgetPropertyName} from './types';

export enum D9PropertyNames {
	PROPERTY = '$pp', POSITION = '$pos'
}

export enum AttributeNames {
	DISABLED = 'disabled',
	VISIBLE = 'visible',
	VALID = 'validate',
	REACTION = 'watch',
	PROPERTY = 'property',
	// position and alias
	PLACE = 'place',
	POSITION = 'position',
	POS = 'pos'
}

/**
 * Widget type could be used as prefix, such as "Dropdown.sort", it is effective only for "Dropdown".
 * If no widget type prefixed, it is for all widgets.
 */
export type CustomAttributeName = Uncapitalize<AnyAttributeName> | `${WidgetType}.${Uncapitalize<AnyAttributeName>}`;

export class AttributeNameUtils {
	private static CUSTOMIZED_NAMES_MAPPING: Record<CustomAttributeName, WidgetPropertyName> = {};
	private static MAPPED_ATTRIBUTE_NAMES: Readonly<Record<AttributeNames, MonitorNodeAttributes | D9PropertyNames>> = {
		[AttributeNames.DISABLED]: MonitorNodeAttributes.DISABLED,
		[AttributeNames.VISIBLE]: MonitorNodeAttributes.VISIBLE,
		[AttributeNames.VALID]: MonitorNodeAttributes.VALID,
		[AttributeNames.REACTION]: MonitorNodeAttributes.REACTION,
		[AttributeNames.PROPERTY]: D9PropertyNames.PROPERTY,
		[AttributeNames.PLACE]: D9PropertyNames.POSITION,
		[AttributeNames.POSITION]: D9PropertyNames.POSITION,
		[AttributeNames.POS]: D9PropertyNames.POSITION
	};

	// noinspection JSUnusedLocalSymbols
	private constructor() {
		// do nothing, avoid extend
	}

	public static register(mapping: Record<CustomAttributeName, WidgetPropertyName>): void {
		if (mapping == null) {
			return;
		}
		Object.keys(mapping).forEach(key => AttributeNameUtils.CUSTOMIZED_NAMES_MAPPING[key] = mapping[key]);
	}

	/**
	 * delete all if keys is ignored
	 */
	public static unregister(keys?: Array<CustomAttributeName>): void {
		if (keys == null || keys.length === 0) {
			// clear all
			Object.keys(AttributeNameUtils.CUSTOMIZED_NAMES_MAPPING).forEach(key => delete AttributeNameUtils.CUSTOMIZED_NAMES_MAPPING[key]);
		} else {
			keys.forEach(key => delete AttributeNameUtils.CUSTOMIZED_NAMES_MAPPING[key]);
		}
	}

	public static mapAttributeName($wt: WidgetType, key: AnyAttributeName): WidgetPropertyName {
		const lowerCaseKey = key.substring(0, 1).toLowerCase() + key.substring(1);
		return AttributeNameUtils.CUSTOMIZED_NAMES_MAPPING[`${$wt}.${lowerCaseKey}`]
			?? AttributeNameUtils.CUSTOMIZED_NAMES_MAPPING[lowerCaseKey]
			?? AttributeNameUtils.MAPPED_ATTRIBUTE_NAMES[lowerCaseKey]
			?? lowerCaseKey;
	}
}