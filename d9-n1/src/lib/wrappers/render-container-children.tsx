import React from 'react';
import {ContainerDef, NodeDef, WrappedAttributes} from '../types';
import {N1Logger, NUtils, PPUtils} from '../utils';
import {findContainerChildKey} from './utils';
import {Wrapper} from './wrapper';

export const renderContainerChildren = (options: {
	def: ContainerDef;
	childrenDefs: Array<NodeDef>;
	keys: Array<[NodeDef, string]>;
	$wrapped: WrappedAttributes;
}) => {
	const {def, childrenDefs, keys, $wrapped: {$root, $p2r, $model}} = options;

	return (childrenDefs).filter(x => x != null).map(childProps => {
		// remove $key, and re-assign one to make sure it is unique
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const {$key: keyOfChild, ...restOfChild} = childProps;
		const key = findContainerChildKey(keys, childProps);
		N1Logger.debug(`Container element[key=${key}, path=${PPUtils.concat($p2r, restOfChild.$pp)}].`, childProps, 'RenderContainerChildren');
		NUtils.inheritValidationScopes(def, restOfChild);
		// share root and model between container parent and children
		return <Wrapper $root={$root} $p2r={$p2r} $model={$model} $key={key} {...restOfChild}
		                key={key}/>;
	});
};