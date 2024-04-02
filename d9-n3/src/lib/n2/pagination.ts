import {NodeDef, Undefinable, VUtils} from '@rainbow-d9/n1';
import {ParsedListItemAttributePair} from '../semantic';
import {
	AttributeValueBuild,
	CustomAttributeName,
	SpecificWidgetTranslator,
	ValueChangedBuild,
	WidgetPropertyName
} from '../widget';
import {N2WidgetType} from './types';

export const N2PaginationPossibleSizesBuild: AttributeValueBuild<Array<number>> = {
	accept: (key: WidgetPropertyName) => key === 'possibleSizes',
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	build: (value: Undefinable<string>, _list: ParsedListItemAttributePair): Undefinable<Array<number>> => {
		if (VUtils.isNotBlank(value)) {
			return value.split(';')
				.map(item => item.trim())
				.filter(item => VUtils.isNotBlank(item))
				.map(item => {
					const check = VUtils.isNumber(item);
					if (check.test) {
						return check.value;
					} else {
						return null;
					}
				})
				.filter(item => item !== null)
				.filter(item => item > 0);
		}
		return (void 0);
	}
};

export class N2PaginationTranslator extends SpecificWidgetTranslator<N2WidgetType.PAGINATION> {
	public getSupportedType(): N2WidgetType.PAGINATION {
		return N2WidgetType.PAGINATION;
	}

	public beautifyProperties<Def extends NodeDef>(def: Partial<Def>): Def {
		return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
	}

	public shouldWrapByFormCell(): boolean {
		return false;
	}

	public getAttributeNamesMapping(): Undefinable<Record<CustomAttributeName, WidgetPropertyName>> {
		return {'Pagination.sizes': 'possibleSizes'};
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [N2PaginationPossibleSizesBuild, ValueChangedBuild];
	}
}
