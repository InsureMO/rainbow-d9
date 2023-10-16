import {ContainerDef, NodeDef, PropertyPath} from '@rainbow-d9/n1';
import {ParsedNodeType} from '../../node-types';
import {WidgetType} from '../../semantic';
import {ParsedNodeDef} from '../../types';
import {Nullable, Undefinable} from '../../utility-types';
import {AbstractTranslator, Decipherable} from './abstract-translator';
import {SpecificWidgetTranslator} from './specific-translator';
import {AttributeMap} from './types';

export class WidgetTranslator extends AbstractTranslator<Decipherable> {
	public static readonly FORM_CELL_SUFFIX = '.FC';
	public static readonly FORCE_WRAPPED_INTO_FORM_CELL = '$fc';

	/**
	 * any widget type is supported
	 * @param _$wt
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	isTypeSupported(_$wt: WidgetType): boolean {
		return true;
	}

	protected isForceWrappedByFormCell(attributes: AttributeMap): boolean {
		return attributes[WidgetTranslator.FORCE_WRAPPED_INTO_FORM_CELL] === true;
	}

	/**
	 * wrap by form cell when given label is not null
	 */
	protected tryToWrapByFormCell($wt: WidgetType, label?: Nullable<string>): Pick<NodeDef, '$wt'> & {
		label?: string
	} {
		if (label == null) {
			return {$wt};
		} else {
			return {$wt: `${$wt}${WidgetTranslator.FORM_CELL_SUFFIX}`, label: label.trim()};
		}
	}

	protected attemptToFormCell(options: {
		$wt: WidgetType; attributes: AttributeMap; label: string;
		translator: SpecificWidgetTranslator<WidgetType>;
	}) {
		const {$wt, label, attributes, translator} = options;
		if (this.isForceWrappedByFormCell(attributes) || translator.shouldWrapByFormCell()) {
			return this.tryToWrapByFormCell($wt, label);
		} else {
			return {$wt, [translator.transformLabelAttributeName()]: label};
		}
	}

	protected doTranslate(node: Decipherable, $pp: Undefinable<PropertyPath>, label: Nullable<string>, findChildren: () => Array<ParsedNodeDef>): ParsedNodeDef {
		const {$wt} = node;

		const classified = this.classifyAttributesAndSubWidgetsByList(node);
		const attributes: AttributeMap = this.parseAndCombineAttributes({
			$wt, items: classified.attributes, $pp
		});

		let def: ParsedNodeDef['node'];
		const translator = this.findSpecificTranslator($wt);
		if (translator != null) {
			def = translator.beautifyProperties({
				$pp, ...attributes,
				...this.attemptToFormCell({$wt, attributes, label, translator})
			});
		} else {
			def = {...attributes, $pp, $wt};
		}
		const children = [
			...this.buildChildrenOnList({widgets: classified.widgets}),
			...findChildren()
		].map(parsed => parsed.node);
		if (children != null && children.length !== 0) {
			(def as ContainerDef).$nodes = children;
		}

		// never export
		return {node: def};
	}

	public translate(node: Decipherable): ParsedNodeDef {
		if (node.type === ParsedNodeType.HEADING) {
			return this.doTranslate(node, (void 0), node.headline, () => {
				return this.buildChildrenOnSubHeadings({widgets: node.children});
			});
		} else if (node.type === ParsedNodeType.LIST_ITEM) {
			return this.doTranslate(node, node.$pp, node.label, () => []);
		} else {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			throw new Error(`Given node type[${node.type}] is not supported.`);
		}
	}
}
