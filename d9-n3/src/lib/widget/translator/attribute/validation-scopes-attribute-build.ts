import {NodeValidationScope, VUtils} from '@rainbow-d9/n1';
import {ParsedListItemAttributePair} from '../../../semantic';
import {Nullable, Undefinable} from '../../../utility-types';
import {D9PropertyNames} from './attribute-name-util';
import {AttributeValueBuild, WidgetPropertyName} from './types';

export class ValidationScopesAttributeBuild implements AttributeValueBuild<Array<NodeValidationScope>> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public accept(key: WidgetPropertyName) {
		return D9PropertyNames.VALIDATION_SCOPES === key;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public build(value: Undefinable<string>, _list: ParsedListItemAttributePair): Nullable<Array<NodeValidationScope>> {
		value = (value || '').trim();
		if (VUtils.isBlank(value)) {
			return (void 0);
		} else {
			const scopes = value.split(/[,;\s]/).map(scope => scope.trim()).filter(scope => VUtils.isNotBlank(scope));
			if (scopes.length === 0) {
				return (void 0);
			} else {
				return scopes;
			}
		}
	}
}