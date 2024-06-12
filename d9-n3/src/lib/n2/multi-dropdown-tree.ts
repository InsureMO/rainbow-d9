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

export const MultiDropdownTreeCouldSelectBuild =
	createSyncSnippetBuild<DropdownTreeDef, 'couldSelect'>('couldSelect', ['option']);

export abstract class AbstractN2MultiDropdownTreeTranslator<T extends N2WidgetType.MULTI_DROPDOWN_TREE | N2WidgetType.MDDT> extends SpecificWidgetTranslator<T> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [MultiDropdownTreeCouldSelectBuild, N2DropdownSortBuild, N2DropdownReactionRefreshOptionsBuild, TipAttachableBuild, ValueChangedBuild];
	}

	public getValidationHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			ValidatorUtils.DETECT_REQUIRED,
			ValidatorUtils.DETECT_LENGTH,
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

export class N2MultiDropdownTreeTranslator extends AbstractN2MultiDropdownTreeTranslator<N2WidgetType.MULTI_DROPDOWN_TREE> {
	public getSupportedType(): N2WidgetType.MULTI_DROPDOWN_TREE {
		return N2WidgetType.MULTI_DROPDOWN_TREE;
	}

	public getAttributeNamesMapping(): Undefinable<Record<CustomAttributeName, WidgetPropertyName>> {
		return {'MultiDropdownTree.sort': 'optionSort'};
	}
}

export class N2MDDTTranslator extends AbstractN2MultiDropdownTreeTranslator<N2WidgetType.MDDT> {
	public getSupportedType(): N2WidgetType.MDDT {
		return N2WidgetType.MDDT;
	}

	public getAttributeNamesMapping(): Undefinable<Record<CustomAttributeName, WidgetPropertyName>> {
		return {'MDDT.sort': 'optionSort'};
	}
}
