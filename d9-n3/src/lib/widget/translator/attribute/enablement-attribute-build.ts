import {MonitorNodeAttributes} from '@rainbow-d9/n1';
import {ParsedListItemAttributePair} from '../../../semantic';
import {Nullable, Undefinable} from '../../../utility-types';
import {AttributeValueBuild, WidgetPropertyName} from './types';

export class EnablementAttributeBuild implements AttributeValueBuild<Array<{
	attributeName: string,
	attributeValue: string
}>> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public accept(key: WidgetPropertyName) {
		return MonitorNodeAttributes.DISABLED === key;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public build(value: Undefinable<string>, _list: ParsedListItemAttributePair): Nullable<Array<{
		attributeName: string,
		attributeValue: string
	}>> {
		if (_list == null) {
			return (void 0);
		} else {
			const result: { attributeName: string, attributeValue: string }[] = [];
			// 遍历_list.children
			for (const child of _list.children) {
				// 遍历子列表的children
				if ('children' in child) {
					// child对象有children属性
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const childrenArray = child['children'] as Array<any>;
					for (const childsub of childrenArray) {
						// 提取 attributeName 和 attributeValue
						const {attributeName, attributeValue} = childsub;
						// 将属性添加到 result 数组中
						result.push({attributeName, attributeValue});
					}
				} else {
					return (void 0);
				}
			}
			return result;
		}
	}
}