import {Undefinable} from '@rainbow-d9/n1';
import {Content, Parent} from 'mdast';
import {N3Logger} from '../../logger';
import {PreparsedNode, PreparsedNodeMap} from '../types';
import {AbstractAstNodePreparser} from './ast-node-preparser';
import {AstNodePreparserRepository} from './preparser-repository';

export abstract class AbstractPreparser {
	public constructor(private readonly preparserRepository: AstNodePreparserRepository) {
		this.preparserRepository = preparserRepository;
	}

	protected findPreparser<T extends keyof PreparsedNodeMap>(type: T): Undefinable<AbstractAstNodePreparser<T>> {
		return this.preparserRepository.askPreparser(type);
	}
}

export abstract class AbstractParentPreparser extends AbstractPreparser {
	protected abstract isChildConcerned(child: Content): boolean;

	protected parseChildren(parent: Parent): Array<PreparsedNode<Content>> {
		return (parent.children ?? []).filter(child => {
			const concerned = this.isChildConcerned(child);
			if (concerned) {
				return true;
			} else {
				N3Logger.info(`Child node[type=${child.type}] not concerned, ignored.`, AbstractParentPreparser.name);
				return false;
			}
		}).map(child => {
			const preparser = this.findPreparser(child.type);
			if (preparser != null) {
				return preparser.parse(child) as PreparsedNode<Content>;
			} else {
				N3Logger.error(`Child node[type=${child.type}] not supported yet, ignored.`, AbstractParentPreparser.name);
				return (void 0);
			}
		}).filter(preparsed => preparsed != null);
	}
}
