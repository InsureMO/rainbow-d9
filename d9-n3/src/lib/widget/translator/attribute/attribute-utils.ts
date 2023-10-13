import {WidgetType} from '../../../semantic';
import {Undefinable} from '../../../utility-types';
import {AnyAttributeBuild} from './any-attribute-build';
import {PositionAttributeBuild} from './position-attribute-build';
import {AttributeValueBuild} from './types';

export class AttributeUtils {
	public static readonly POSITION_ATTRIBUTE_BUILDER = new PositionAttributeBuild();
	public static readonly ANY_ATTRIBUTE_BUILDER = new AnyAttributeBuild();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private static CUSTOMIZED_ATTRIBUTE_BUILDERS: Record<WidgetType, Array<AttributeValueBuild<any>>> = {};

	// noinspection JSUnusedLocalSymbols
	private constructor() {
		// do nothing, avoid extend
	}

	public static register<T>($wt: WidgetType, builders: Array<AttributeValueBuild<T>>): Undefinable<Array<AttributeValueBuild<T>>> {
		const existing = AttributeUtils.CUSTOMIZED_ATTRIBUTE_BUILDERS[$wt];
		AttributeUtils.CUSTOMIZED_ATTRIBUTE_BUILDERS[$wt] = builders.filter(b => b != null);
		return existing;
	}

	public static unregister<T>($wt: WidgetType): Undefinable<Array<AttributeValueBuild<T>>> {
		const existing = AttributeUtils.CUSTOMIZED_ATTRIBUTE_BUILDERS[$wt];
		delete AttributeUtils.CUSTOMIZED_ATTRIBUTE_BUILDERS[$wt];
		return existing;
	}

	public static findAttributeBuilders<T>($wt: WidgetType): Array<AttributeValueBuild<T>> {
		return [
			...(AttributeUtils.CUSTOMIZED_ATTRIBUTE_BUILDERS[$wt] ?? []),
			AttributeUtils.POSITION_ATTRIBUTE_BUILDER,
			AttributeUtils.ANY_ATTRIBUTE_BUILDER
		];
	}
}
