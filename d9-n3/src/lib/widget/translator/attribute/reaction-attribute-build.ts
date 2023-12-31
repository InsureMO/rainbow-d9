import {Nullable, Reaction, Undefinable, VUtils} from '@rainbow-d9/n1';
import {ParsedListItemAttributePair} from '../../../semantic';
import {AttributeNames} from './attribute-name-util';
import {
	ComplexMonitorableAttributeValue,
	MonitorableAttributeBuild,
	PossibleMonitorableAttributeValue
} from './monitor-attribute-build';
import {WidgetPropertyName} from './types';

export type ReactionTypes = AttributeNames.REACTION_WATCH
	| AttributeNames.REACTION_REPAINT
	| AttributeNames.REACTION_CLEAR_ME
	| string;

export interface ReactionMonitorAttributeValue extends ComplexMonitorableAttributeValue {
	type: ReactionTypes | string;
}

export abstract class AbstractReactionAttributeBuild<A extends ReactionMonitorAttributeValue> extends MonitorableAttributeBuild<A, never> {
	protected abstract getReactionType(): ReactionTypes;

	public accept(key: WidgetPropertyName): boolean {
		return key === this.getReactionType();
	}

	protected detectBooleanValues(): boolean {
		return false;
	}

	protected couldSnippetIgnored(): boolean {
		return true;
	}

	protected abstract getReturnReaction(): Reaction | string;

	protected redressSnippet(snippet: A['snippet']): A['snippet'] {
		if (snippet == null || (typeof snippet === 'string' && VUtils.isBlank(snippet))) {
			return `return '${this.getReturnReaction()}';`;
		} else {
			return snippet;
		}
	}

	public build(value: Undefinable<string>, list: ParsedListItemAttributePair): Nullable<PossibleMonitorableAttributeValue<A, never>> {
		const built = super.build(value, list);
		if (built == null) {
			return built;
		}
		if (built.on.length === 0 || (!this.couldSnippetIgnored() && VUtils.isBlank(built.snippet))) {
			//  watching list is required, and snippet is mandatory or not depends on the reaction type
			// otherwise treated as invalid attribute value, ignored
			return (void 0);
		}
		return {
			on: built.on, snippet: this.redressSnippet(built.snippet), type: this.getReactionType()
		} as PossibleMonitorableAttributeValue<A, never>;
	}
}

export interface ReactionRepaintMonitorAttributeValue extends ReactionMonitorAttributeValue {
	type: AttributeNames.REACTION_REPAINT;
}

export class ReactionRepaintAttributeBuild extends AbstractReactionAttributeBuild<ReactionRepaintMonitorAttributeValue> {
	protected getReactionType(): ReactionTypes {
		return AttributeNames.REACTION_REPAINT;
	}

	protected getReturnReaction(): Reaction | string {
		return Reaction.REPAINT;
	}
}

export interface ReactionClearMeMonitorAttributeValue extends ReactionMonitorAttributeValue {
	type: AttributeNames.REACTION_CLEAR_ME;
}

export class ReactionClearMeAttributeBuild extends AbstractReactionAttributeBuild<ReactionClearMeMonitorAttributeValue> {
	protected getReactionType(): ReactionTypes {
		return AttributeNames.REACTION_CLEAR_ME;
	}

	protected getReturnReaction(): Reaction | string {
		return Reaction.CLEAR_VALUE;
	}
}

export interface ReactionWatchMonitorAttributeValue extends ReactionMonitorAttributeValue {
	type: AttributeNames.REACTION_WATCH;
}

export class ReactionWatchAttributeBuild extends AbstractReactionAttributeBuild<ReactionWatchMonitorAttributeValue> {
	protected getReactionType(): ReactionTypes {
		return AttributeNames.REACTION_WATCH;
	}

	protected couldSnippetIgnored(): boolean {
		return false;
	}

	protected getReturnReaction(): Reaction | string {
		return Reaction.REPAINT;
	}
}
