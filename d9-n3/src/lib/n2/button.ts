import {BaseModel, NodeValidationScope, PropValue, Undefinable, VUtils} from '@rainbow-d9/n1';
import {ButtonClick, ButtonClickOptions} from '@rainbow-d9/n2';
import {ParsedListItemAttributePair} from '../semantic';
import {
	AttributeValueBuild,
	DecorateLeadsBuild,
	DecorateTailsBuild,
	SpecificWidgetTranslator,
	WidgetPropertyName
} from '../widget';
import {buildClickHandler} from './event-handler';
import {N2WidgetType} from './types';

export const N2ButtonValidateMinimum = async (options: ButtonClickOptions<BaseModel, PropValue>): Promise<void> => {
	const {validators: {$mine}} = options;
	await $mine();
};

export const N2ButtonValidateBlock = async (options: ButtonClickOptions<BaseModel, PropValue>): Promise<void> => {
	const {validators: {$arrayElement, $closestContainer, $all}} = options;
	if (!$arrayElement != null) {
		await $arrayElement();
	} else if ($closestContainer != null) {
		await $closestContainer();
	} else {
		await $all();
	}
};

export const N2ButtonValidateAll = async (options: ButtonClickOptions<BaseModel, PropValue>): Promise<void> => {
	const {validators: {$all}} = options;
	await $all();
};

export const N2ButtonCreateScopesValidate = (scopes: Array<NodeValidationScope>) => {
	return async (options: ButtonClickOptions<BaseModel, PropValue>): Promise<void> => {
		const {validators: {$given}} = options;
		await $given(scopes);
	};
};

export const N2ButtonClickBuild: AttributeValueBuild<ButtonClick> = {
	accept: (key: WidgetPropertyName) => key === 'click',
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	build: (value: Undefinable<string>, _list: ParsedListItemAttributePair): Undefinable<ButtonClick> => {
		if (VUtils.isNotBlank(value)) {
			const originalValue = value;
			value = value.trim().toLowerCase();
			if (value === 'validate') {
				return N2ButtonValidateMinimum;
			} else if (value.startsWith('validate ') || value.startsWith('validate:')) {
				value = value.substring('validate '.length).trim();
				if (value === 'me') {
					return N2ButtonValidateMinimum;
				} else if (value === 'block') {
					return N2ButtonValidateBlock;
				} else if (value === 'all') {
					return N2ButtonValidateAll;
				} else {
					const scopes = value.split(/[,;\s]/).map(scope => scope.trim()).filter(scope => VUtils.isNotBlank(scope));
					if (scopes.length !== 0) {
						return N2ButtonCreateScopesValidate(scopes);
					}
				}
			}
			return buildClickHandler(originalValue) as ButtonClick;
		} else {
			// TODO read list
			return (void 0);
		}
	}
};

export class N2ButtonTranslator extends SpecificWidgetTranslator<N2WidgetType.BUTTON> {
	public getSupportedType(): N2WidgetType.BUTTON {
		return N2WidgetType.BUTTON;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [N2ButtonClickBuild, DecorateLeadsBuild, DecorateTailsBuild];
	}
}
