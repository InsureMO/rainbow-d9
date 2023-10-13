import {BaseModel, MonitorNodeAttributes, NUtils, PropValue, ReactionMonitor, VUtils} from '@d9/n1';
import {CaptionClick, CaptionClickOptions, CaptionDef, CaptionValueToLabel} from '@d9/n2';
import {ParsedListItemAttributePair} from '../semantic';
import {Undefinable} from '../utility-types';
import {
	AttributeValueBuild,
	MonitorHandlerDetective,
	MonitorHandlerDetectOptions,
	SpecificWidgetTranslator,
	WidgetPropertyName
} from '../widget';
import {N2WidgetType} from './types';

export const N2CaptionValueToLabelBuild: AttributeValueBuild<Pick<CaptionDef, 'labelOnValue' | 'valueToLabel'>> = {
	accept: (key: WidgetPropertyName) => key === 'valueToLabel',
	build: (value: Undefinable<string>): Pick<CaptionDef, 'labelOnValue' | 'valueToLabel'> | undefined => {
		if (VUtils.isBlank(value)) {
			// ignored
			return (void 0);
		}
		try {
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
			console.error(e);
			return (void 0);
		}
	}
};

export const N2CaptionClickBuild: AttributeValueBuild<CaptionClick> = {
	accept: (key: WidgetPropertyName) => key === 'click',
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	build: (value: Undefinable<string>, _list: ParsedListItemAttributePair): CaptionClick | undefined => {
		if (VUtils.isNotBlank(value)) {
			const originalValue = value;
			value = value.trim().toLowerCase();
			if (value.startsWith('alert ') || value.startsWith('alert:')) {
				return async (options: CaptionClickOptions<BaseModel, PropValue>): Promise<void> => {
					const {global: {alert: {show}}} = options;
					return await show(originalValue.slice('alert '.length).trim());
				};
			} else if (value.startsWith('dialog ') || value.startsWith('dialog:')) {
				// dialog content cannot be analysis here, so fire a custom event
				return async (options: CaptionClickOptions<BaseModel, PropValue>): Promise<void> => {
					const {global: {custom}, root, model} = options;
					return await custom(originalValue.trim(), {root, model});
				};
			} else {
				return (void 0);
			}
		} else {
			return (void 0);
		}
	}
};

/**
 * add reaction when attribute "valueToLabel" is defined
 * @param options
 */
export const N2CaptionReactionDetective: MonitorHandlerDetective = (options: MonitorHandlerDetectOptions): Undefinable<ReactionMonitor> => {
	const {$pp, attributes} = options;
	const reaction = (attributes[MonitorNodeAttributes.REACTION] ?? {}) as Partial<ReactionMonitor>;
	const watches = (reaction.$watch ?? [$pp]).filter(path => VUtils.isNotBlank(path));
	if (attributes.labelOnValue !== true || watches.length === 0) {
		return (void 0);
	}
	return {$watch: watches, $handle: reaction.$handle ?? NUtils.reactWithRepaint};
};

export class N2CaptionTranslator extends SpecificWidgetTranslator<N2WidgetType.CAPTION> {
	public getSupportedType(): N2WidgetType.CAPTION {
		return N2WidgetType.CAPTION;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [N2CaptionValueToLabelBuild, N2CaptionClickBuild];
	}

	public getReactionHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [N2CaptionReactionDetective];
	}
}

export class N2LabelTranslator extends SpecificWidgetTranslator<N2WidgetType.LABEL> {
	public getSupportedType(): N2WidgetType.LABEL {
		return N2WidgetType.LABEL;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public getAttributeValueBuilders(): Array<AttributeValueBuild<any>> {
		return [N2CaptionValueToLabelBuild, N2CaptionClickBuild];
	}

	public getReactionHandlerDetectives(): Array<MonitorHandlerDetective> {
		return [N2CaptionReactionDetective];
	}
}
