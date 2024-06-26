import {NodeDef, Undefinable} from '@rainbow-d9/n1';
import {WidgetType} from '../../../semantic';
import {AnyAttributeBuild} from './any-attribute-build';
import {DataPrefixAttributeBuild} from './data-prefix-attribute-build';
import {DisablementAttributeBuild} from './disablement-attribute-build';
import {MobilePositionAttributeBuild, PositionAttributeBuild} from './position-attribute-build';
import {
	ReactionClearMeAttributeBuild,
	ReactionRepaintAttributeBuild,
	ReactionWatchAttributeBuild
} from './reaction-attribute-build';
import {createSyncSnippetBuild} from './snippet-attribute-build';
import {AttributeValueBuild} from './types';
import {ValidationAttributeBuild} from './validation-attribute-build';
import {ValidationScopesAttributeBuild} from './validation-scopes-attribute-build';
import {VisibilityAttributeBuild} from './visibility-attribute-build';

export class AttributeUtils {
	public static readonly POSITION_ATTRIBUTE_BUILDER = new PositionAttributeBuild();
	public static readonly MOBILE_POSITION_ATTRIBUTE_BUILDER = new MobilePositionAttributeBuild();
	public static readonly RENDER_ON_ATTRIBUTE_BUILDER = createSyncSnippetBuild<NodeDef, '$renderOn'>('$renderOn', [], true);
	public static readonly ENABLEMENT_ATTRIBUTE_BUILDER = new DisablementAttributeBuild();
	public static readonly VISIBILITY_ATTRIBUTE_BUILDER = new VisibilityAttributeBuild();
	public static readonly VALIDATION_ATTRIBUTE_BUILDER = new ValidationAttributeBuild();
	public static readonly VALIDATION_SCOPES_ATTRIBUTE_BUILDER = new ValidationScopesAttributeBuild();
	public static readonly REACTION_REPAINT_ATTRIBUTE_BUILDER = new ReactionRepaintAttributeBuild();
	public static readonly REACTION_CLEAR_ME_ATTRIBUTE_BUILDER = new ReactionClearMeAttributeBuild();
	public static readonly REACTION_WATCH_ATTRIBUTE_BUILDER = new ReactionWatchAttributeBuild();
	public static readonly DATA_PREFIX_ATTRIBUTE_BUILDER = new DataPrefixAttributeBuild();
	// most widgets have tip, so considering it is common
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
			AttributeUtils.MOBILE_POSITION_ATTRIBUTE_BUILDER,
			AttributeUtils.RENDER_ON_ATTRIBUTE_BUILDER,
			AttributeUtils.ENABLEMENT_ATTRIBUTE_BUILDER,
			AttributeUtils.VISIBILITY_ATTRIBUTE_BUILDER,
			AttributeUtils.VALIDATION_ATTRIBUTE_BUILDER,
			AttributeUtils.VALIDATION_SCOPES_ATTRIBUTE_BUILDER,
			AttributeUtils.REACTION_REPAINT_ATTRIBUTE_BUILDER,
			AttributeUtils.REACTION_CLEAR_ME_ATTRIBUTE_BUILDER,
			AttributeUtils.REACTION_WATCH_ATTRIBUTE_BUILDER,
			AttributeUtils.DATA_PREFIX_ATTRIBUTE_BUILDER,
			AttributeUtils.ANY_ATTRIBUTE_BUILDER
		];
	}
}
