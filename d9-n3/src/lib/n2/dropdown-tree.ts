import {Undefinable} from '@rainbow-d9/n1';
import {DropdownTreeDef} from '@rainbow-d9/n2';
import {
	AttributeValueBuild,
	createSyncSnippetBuild,
	CustomAttributeName,
	MonitorHandlerDetective,
	SpecificWidgetTranslator,
	TipAttachableBuild,
	ValidatorUtils,
	ValueChangedBuild,
	WidgetPropertyName
} from '../widget';
import {
	N2DropdownReactionRefreshOptionsBuild,
	N2DropdownReactionRefreshOptionsHandlerDetective,
	N2DropdownSortBuild
} from './dropdown';
import {N2WidgetType} from './types';

export const N2DropdownTreeCouldSelectBuild =
	createSyncSnippetBuild<DropdownTreeDef, 'couldSelect'>('couldSelect', ['option']);

export abstract class AbstractN2DropdownTreeTranslator<T extends N2WidgetType.DROPDOWN_TREE | N2WidgetType.DDT> extends SpecificWidgetTranslator<T> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [N2DropdownTreeCouldSelectBuild, N2DropdownSortBuild, N2DropdownReactionRefreshOptionsBuild, TipAttachableBuild, ValueChangedBuild];
	}

	public getValidationHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			ValidatorUtils.DETECT_REQUIRED,
			...super.getValidationHandlerDetectives()
		];
	}

	public getReactionHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			...super.getReactionHandlerDetectives(),
			N2DropdownReactionRefreshOptionsHandlerDetective
		];
	}
}

export class N2DropdownTreeTranslator extends AbstractN2DropdownTreeTranslator<N2WidgetType.DROPDOWN_TREE> {
	public getSupportedType(): N2WidgetType.DROPDOWN_TREE {
		return N2WidgetType.DROPDOWN_TREE;
	}

	public getAttributeNamesMapping(): Undefinable<Record<CustomAttributeName, WidgetPropertyName>> {
		return {'DropdownTree.sort': 'optionSort'};
	}
}

export class N2DDTTranslator extends AbstractN2DropdownTreeTranslator<N2WidgetType.DDT> {
	public getSupportedType(): N2WidgetType.DDT {
		return N2WidgetType.DDT;
	}

	public getAttributeNamesMapping(): Undefinable<Record<CustomAttributeName, WidgetPropertyName>> {
		return {'DDT.sort': 'optionSort'};
	}
}
