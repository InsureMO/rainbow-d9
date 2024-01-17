import {
	BaseModel,
	ExternalDefIndicator,
	NodeDef,
	NUtils,
	PropValue,
	ReactionMonitor,
	Undefinable,
	VUtils
} from '@rainbow-d9/n1';
import {CaptionClick, CaptionClickOptions, CaptionDef, CaptionValueToLabel} from '@rainbow-d9/n2';
import {MouseEvent} from 'react';
import {N3Logger} from '../logger';
import {ParsedListItemAttributePair} from '../semantic';
import {AsyncFunction} from '../utils';
import {
	AttributeValueBuild,
	DecorateLeadsBuild,
	DecorateTailsBuild,
	MonitorHandlerDetective,
	MonitorHandlerDetectOptions,
	parseSnippet,
	SpecificWidgetTranslator,
	WidgetPropertyName,
	WidgetTranslator
} from '../widget';
import {buildClickHandler} from './event-handler';
import {N2WidgetType} from './types';

export const N2CaptionValueToLabelBuild: AttributeValueBuild<Pick<CaptionDef, 'labelOnValue' | 'valueToLabel'>> = {
	accept: (key: WidgetPropertyName) => key === 'valueToLabel',
	build: (value: Undefinable<string>): Undefinable<Pick<CaptionDef, 'labelOnValue' | 'valueToLabel'>> => {
		if (VUtils.isBlank(value)) {
			// ignored
			return (void 0);
		}
		try {
			// this is sync function
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const func: CaptionValueToLabel = new Function('value', 'formats', `try {
				const $ = formats;
				return ${value}
			} catch (e) {
				console.error(e);
				return value == null ? '' : value;
			}`);
			return {labelOnValue: true, valueToLabel: func};
		} catch (e) {
			N3Logger.error(e, 'N2CaptionValueToLabelBuild');
			return (void 0);
		}
	}
};

export const N2CaptionClickBuild: AttributeValueBuild<CaptionClick | ExternalDefIndicator> = {
	accept: (key: WidgetPropertyName) => key === 'click',
	build: (value: Undefinable<string>, list: ParsedListItemAttributePair): Undefinable<CaptionClick | ExternalDefIndicator> => {
		if (VUtils.isNotBlank(value)) {
			return buildClickHandler(value) as CaptionClick;
		} else {
			const parsed = parseSnippet(value, list);
			if (parsed instanceof ExternalDefIndicator) {
				// in fact, external def indicator is already intercepted by caller,
				// see AbstractTranslator.buildAttributeValue for more details
				return parsed;
			} else if (VUtils.isBlank(parsed)) {
				return (void 0);
			} else {
				const func = new AsyncFunction('options', 'event', parsed);
				return async <R extends BaseModel, M extends PropValue>(
					options: CaptionClickOptions<R, M>, event: MouseEvent<HTMLSpanElement>) => {
					await func(options, event);
				};
			}
		}
	}
};

/**
 * add reaction when attribute "valueToLabel" is defined
 * @param options
 */
export const N2CaptionReactionDetective: MonitorHandlerDetective = (options: MonitorHandlerDetectOptions): Undefinable<ReactionMonitor> => {
	const {$pp, attributes} = options;
	// const reaction = (attributes[MonitorNodeAttributes.REACTION] ?? {}) as Partial<ReactionMonitor>;
	if (attributes.labelOnValue !== true) {
		return (void 0);
	}
	const watches = [$pp].filter(path => VUtils.isNotBlank(path));
	return {$watch: watches, $handle: NUtils.reactWithRepaint};
};

export const N2CaptionRedressLabelAndText = <Def extends NodeDef>(def: Partial<Def>): Partial<Def> => {
	const defs = def as Partial<CaptionDef>;
	if (defs.labelOnValue === true || defs[WidgetTranslator.FORCE_WRAPPED_INTO_FORM_CELL] === true) {
		// label on value, or force wrapped by form cell, do nothing
		return defs as Def;
	}
	if (defs.text != null || (VUtils.isPrimitive(defs.text) && VUtils.isNotBlank(defs.text))) {
		// text declared, do nothing
		return defs as Def;
	}
	defs.text = defs.label;
	delete defs.label;

	return defs as Def;
};

export class N2CaptionTranslator extends SpecificWidgetTranslator<N2WidgetType.CAPTION> {
	public getSupportedType(): N2WidgetType.CAPTION {
		return N2WidgetType.CAPTION;
	}

	public shouldTranslateLabelAttribute(): boolean {
		return true;
	}

	public getToWidgetAttributeNames(): Array<string> {
		return [...super.getToWidgetAttributeNames(), 'text'];
	}

	public redressProperties<Def extends NodeDef>(def: Partial<Def>): Def {
		return super.redressProperties(N2CaptionRedressLabelAndText(def));
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [N2CaptionValueToLabelBuild, N2CaptionClickBuild, DecorateLeadsBuild, DecorateTailsBuild];
	}

	public getReactionHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			N2CaptionReactionDetective,
			...super.getReactionHandlerDetectives()
		];
	}
}

export class N2LabelTranslator extends SpecificWidgetTranslator<N2WidgetType.LABEL> {
	public getSupportedType(): N2WidgetType.LABEL {
		return N2WidgetType.LABEL;
	}

	public shouldTranslateLabelAttribute(): boolean {
		return false;
	}

	public redressProperties<Def extends NodeDef>(def: Partial<Def>): Def {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return super.redressProperties(N2CaptionRedressLabelAndText({...def, labelOnValue: true}));
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [N2CaptionValueToLabelBuild, N2CaptionClickBuild, DecorateLeadsBuild, DecorateTailsBuild];
	}

	public getReactionHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			N2CaptionReactionDetective,
			...super.getReactionHandlerDetectives()
		];
	}
}

export class N2BadgeTranslator extends SpecificWidgetTranslator<N2WidgetType.BADGE> {
	public getSupportedType(): N2WidgetType.BADGE {
		return N2WidgetType.BADGE;
	}

	public shouldTranslateLabelAttribute(): boolean {
		return false;
	}

	public redressProperties<Def extends NodeDef>(def: Partial<Def>): Def {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return super.redressProperties(N2CaptionRedressLabelAndText(def));
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [N2CaptionValueToLabelBuild, N2CaptionClickBuild, DecorateLeadsBuild, DecorateTailsBuild];
	}

	public getReactionHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [
			N2CaptionReactionDetective,
			...super.getReactionHandlerDetectives()
		];
	}
}
