import {DataAttributeCalculator, ExternalDefIndicator, Nullable, Undefinable} from '@rainbow-d9/n1';
import {ParsedListItemAttributePair} from '../../../semantic';
import {tryBoolAndNumOnAttrValue} from './any-attribute-build';
import {createSyncSnippetBuild} from './snippet-attribute-build';
import {AttributeValueBuild, WidgetPropertyName} from './types';

export class DataPrefixAttributeBuild implements AttributeValueBuild<ExternalDefIndicator | DataAttributeCalculator | string | number | boolean> {
	private snippetBuild = createSyncSnippetBuild('$pp.', ['options'], false);

	public accept(key: WidgetPropertyName) {
		return key.startsWith('data-');
	}

	public build(value: Undefinable<string>, list: ParsedListItemAttributePair): Nullable<ExternalDefIndicator | DataAttributeCalculator | string | number | boolean> {
		const parsed = tryBoolAndNumOnAttrValue(value);
		const type = typeof parsed;
		if (type === 'boolean' || type === 'number' || type === 'bigint') {
			return parsed;
		} else if (type === 'string') {
			const str = parsed as string;
			if (str.startsWith('$pp.')) {
				return str;
			} else {
				return this.snippetBuild.build(str, list);
			}
		} else {
			return parsed;
		}
	}
}