import {ArrayUsedDef, NodeDef, Undefinable} from '@rainbow-d9/n1';
import {WidgetType} from '../../semantic';
import {DocParseOptions} from '../../types';
import {AttributeValueBuild, createAsyncSnippetBuild, CustomAttributeName, WidgetPropertyName} from './attribute';
import {DisablementUtils, MonitorHandlerDetective, ReactionUtils, ValidatorUtils, VisibilityUtils} from './monitor';
import {WidgetTranslatorRepository} from './translator-repository';
import {WidgetTranslator} from './widget-translator';

export interface PostWorkSupplementary {
	translator: WidgetTranslator;
	parseOptions: DocParseOptions;
}

export abstract class SpecificWidgetTranslator<T extends WidgetType> {
	// noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
	public constructor(private readonly repository: WidgetTranslatorRepository) {
		this.repository = repository;
	}

	public abstract getSupportedType(): T;

	/**
	 * default do nothing, return given definition itself.
	 */
	public redressProperties<Def extends NodeDef>(def: Partial<Def>): Def {
		return def as Def;
	}

	/**
	 * default do nothing, return given definition itself.
	 */
	public beautifyProperties<Def extends NodeDef>(def: Partial<Def>): Def {
		return def as Def;
	}

	/**
	 * default true
	 */
	public shouldWrapByFormCell(): boolean {
		return true;
	}

	/**
	 * default true
	 */
	public shouldTranslateLabelAttribute(): boolean {
		return true;
	}

	/**
	 * default empty array
	 */
	public getToWidgetAttributeNames(): Array<string> {
		return [];
	}

	/**
	 * default returns "label", override me if it needs to be transformed to other name
	 */
	public transformLabelAttributeName(): string {
		return 'label';
	}

	protected beautifyColumnSpan<Def extends NodeDef>(def: Partial<Def>, cols: number): Partial<Def> {
		if (def.$pos?.$cols == null) {
			if (def.$pos == null) {
				def.$pos = {$cols: cols};
			} else {
				def.$pos.$cols = cols;
			}
		}
		return def as Def;
	}

	/**
	 * default returns undefined, override me if there is any attribute names mapping needs to be added
	 */
	public getAttributeNamesMapping(): Undefinable<Record<CustomAttributeName, WidgetPropertyName>> {
		return (void 0);
	}

	/**
	 * default returns empty array, override me if there is any attribute value builder needs to be added
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [];
	}

	/**
	 * default returns empty array, override me if there is any validation handler detective needs to be added
	 */
	public getValidationHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [ValidatorUtils.DETECT_VALIDATION];
	}

	/**
	 * default returns empty array, override me if there is any reaction handler detective needs to be added
	 */
	public getReactionHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			ReactionUtils.DETECT_REACTION_REPAINT,
			ReactionUtils.DETECT_REACTION_CLEAR_ME,
			ReactionUtils.DETECT_REACTION_WATCH
		];
	}

	/**
	 * default returns empty array, override me if there is any disablement handler detective needs to be added
	 */
	public getEnablementHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [DisablementUtils.DETECT_DISABLED];
	}

	/**
	 * default returns empty array, override me if there is any visibility handler detective needs to be added
	 */
	public getVisibilityHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [VisibilityUtils.DETECT_VISIBILITY];
	}

	/**
	 * default do nothing, return given definition itself.
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public postWork<Def extends NodeDef>(def: Partial<Def>, _supplementary: PostWorkSupplementary): Def {
		return def as Def;
	}
}

export const ArrayElementAddedBuild = createAsyncSnippetBuild<ArrayUsedDef, 'elementAdded'>('$array.elementAdded', ['options', 'handlers']);
export const ArrayCreateElementBuild = createAsyncSnippetBuild<ArrayUsedDef, 'createElement'>('$array.createElement', ['options', 'handlers']);
export const ArrayCouldAddElementBuild = createAsyncSnippetBuild<ArrayUsedDef, 'couldAddElement'>('$array.couldAddElement', ['options', 'handlers']);
export const ArrayElementRemovedBuild = createAsyncSnippetBuild<ArrayUsedDef, 'elementRemoved'>('$array.elementRemoved', ['options', 'handlers']);
export const ArrayCouldRemoveElementBuild = createAsyncSnippetBuild<ArrayUsedDef, 'couldRemoveElement'>('$array.couldRemoveElement', ['options', 'handlers']);

export abstract class SpecificArrayWidgetTranslator<T extends WidgetType> extends SpecificWidgetTranslator<T> {
	protected buildDefaultAttributeNamesMapping(additional?: Record<CustomAttributeName, WidgetPropertyName>): Record<CustomAttributeName, WidgetPropertyName> {
		const keys: Array<keyof ArrayUsedDef> = [
			'noElementReminder',
			'addable', 'addLabel', 'elementAdded', 'createElement', 'couldAddElement', 'disableOnCannotAdd',
			'removable', 'removeLabel', 'elementRemoved', 'couldRemoveElement',
			'getElementKey'
		];
		return keys.reduce((mapping, key) => {
			mapping[`${this.getSupportedType()}.${key}`] = `$array.${key}`;
			return mapping;
		}, additional ?? {});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [
			ArrayElementAddedBuild,
			ArrayCreateElementBuild,
			ArrayCouldAddElementBuild,
			ArrayElementRemovedBuild,
			ArrayCouldRemoveElementBuild,
			...super.getAttributeValueBuilders()
		];
	}
}