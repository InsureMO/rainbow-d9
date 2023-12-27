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
            // iterate over the _list.children
            for (const child of _list.children) {
                findTextValue(child.preparsed['children']);
                // eslint-disable-next-line no-inner-declarations
                function findTextValue(node) {
                    // 如果是 Array ，则循环object
                    if (Array.isArray(node)) {
                        for (let i = 0; i < node.length; i++) {
                            findTextValue(node[i]);
                        }
                    } else if (typeof node === 'object' && 'type' in node) {
                        if (node.type === 2 || node.type == "paragraph") {
                            return findTextValue(node.children);
                        } else if (node.type === 3) {
                            return findTextValue(node.content);
                        } else if (node.type == "text") {
                            const str = node.value.toString()
                            result.push({
                                attributeName: str.split(':')[0].trim(),
                                attributeValue: str.split(':')[1].trim()
                            })
                            return node.value;
                        }
                    }
                    return null;
                }
                // iterate through the children of the sublist
                // if ('children' in child) {
                //     // the child object has a children attribute.
                //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
                //     const childrenArray = child['children'] as Array<any>;
                //     for (const childsub of childrenArray) {
                //         // extracting attributeName and attributeValue
                //         const {attributeName, attributeValue} = childsub;
                //         // add properties to the result array
                //         result.push({attributeName, attributeValue});
                //     }
                // } else {
                //     return (void 0);
                // }
            }
            return result;
        }
    }
}