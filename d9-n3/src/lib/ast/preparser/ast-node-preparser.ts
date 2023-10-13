import {PreparsedNodeMap} from '../types';
import {AbstractParentPreparser} from './abstract-preparser';

export abstract class AbstractAstNodePreparser<T extends keyof PreparsedNodeMap> extends AbstractParentPreparser {
	/**
	 * get supported node type
	 */
	public abstract getSupportedType(): T;

	/**
	 * check the given type is supported or not
	 */
	public accept(type: keyof PreparsedNodeMap): boolean {
		return type === this.getSupportedType();
	}

	public abstract parse(node: PreparsedNodeMap[T]['content']): PreparsedNodeMap[T];
}
