import {MonitorNodeAttributes, NodeDef, ReactionMonitor, VUtils} from '@rainbow-d9/n1';
import {CaptionDef} from '@rainbow-d9/n2';
import {ParsedNodeType} from '../node-types';
import {ParsedList, ParsedListItemAttributePair, SemanticUtils} from '../semantic';
import {Undefinable} from '../utility-types';
import {
	AttributeNameUtils,
	AttributeUtils,
	AttributeValueBuild,
	CustomAttributeName,
	SpecificArrayWidgetTranslator,
	WidgetPropertyName
} from '../widget';
import {N2CaptionReactionDetective, N2CaptionValueToLabelBuild} from './caption';
import {N2WidgetType} from './types';

const N2RibsCaptionBuild: AttributeValueBuild<CaptionDef> = {
	accept: (key: WidgetPropertyName) => key === 'caption',
	build: (value: Undefinable<string>, list: ParsedListItemAttributePair): Undefinable<CaptionDef> => {
		const def: CaptionDef = {$wt: N2WidgetType.CAPTION, labelOnValue: true};
		if (VUtils.isNotBlank(value)) {
			// treat it as property path
			def.$pp = value.trim();
		}
		if (list.children != null && list.children.length > 0 && list.children[0].type === ParsedNodeType.LIST) {
			((list.children[0] as ParsedList).children ?? [])
				.filter(SemanticUtils.isAttributePairListItem)
				.forEach(pair => {
					const key = AttributeNameUtils.mapAttributeName(N2WidgetType.CAPTION, pair.attributeName);
					if (N2CaptionValueToLabelBuild.accept(key)) {
						const built = N2CaptionValueToLabelBuild.build(pair.attributeValue, pair);
						if (built != null) {
							// function built, assign to def
							def.valueToLabel = built.valueToLabel;
						}
					} else if (AttributeUtils.ANY_ATTRIBUTE_BUILDER.accept(key)) {
						def[key] = AttributeUtils.ANY_ATTRIBUTE_BUILDER.build(pair.attributeValue, pair);
					}
				});
		}
		if (VUtils.isBlank(def.$pp)) {
			return (void 0);
		}
		const reaction = N2CaptionReactionDetective({$wt: N2WidgetType.CAPTION, $pp: def.$pp, attributes: def});
		if (reaction == null) {
			return (void 0);
		}
		def[MonitorNodeAttributes.REACTION] = reaction as ReactionMonitor;
		return def;
	}
};

abstract class AbstractRibsTranslator<T extends N2WidgetType.RIBS | N2WidgetType.READONLY_RIBS> extends SpecificArrayWidgetTranslator<T> {
	public beautifyProperties<Def extends NodeDef>(def: Partial<Def>): Def {
		return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
	}

	public shouldWrapByFormCell(): boolean {
		return false;
	}

	public getToWidgetAttributeNames(): Array<string> {
		return [...super.getToWidgetAttributeNames(), 'caption'];
	}

	public getAttributeNamesMapping(): Undefinable<Record<CustomAttributeName, WidgetPropertyName>> {
		return this.buildDefaultAttributeNamesMapping({[`${this.getSupportedType()}.elementTitle`]: 'caption'});
	}
}

export class N2RibsTranslator extends AbstractRibsTranslator<N2WidgetType.RIBS> {
	public getSupportedType(): N2WidgetType.RIBS {
		return N2WidgetType.RIBS;
	}
}

export class N2RibsViewTranslator extends AbstractRibsTranslator<N2WidgetType.READONLY_RIBS> {
	public getSupportedType(): N2WidgetType.READONLY_RIBS {
		return N2WidgetType.READONLY_RIBS;
	}
}
