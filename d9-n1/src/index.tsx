import {Buffer} from 'buffer';
import React from 'react';
import {RootEventBusProvider} from './lib/events';
import {ExternalDefsHandler} from './lib/external-defs-handler';
import {EventHolder} from './lib/hooks';
import {StandaloneRootProps} from './lib/types';
import {MUtils, N1Logger, NUtils, PPUtils} from './lib/utils';
import {Wrapper} from './lib/wrapper';

window.Buffer = Buffer;

/**
 * The root element of d9, which declares a section independent.
 * It cannot communicate with outside, it's standalone unless using children.
 *
 * @param props
 * @constructor
 */
export const StandaloneRoot = (props: StandaloneRootProps) => {
	const {
		$key, $root, $pp, $validationScopes,
		externalDefs,
		leading, children, tailing,
		...rest
	} = props;

	if ($root == null) {
		N1Logger.error('Root data model cannot be null, nothing would be rendering now.', 'StandaloneRoot');
		return null;
	}
	// get property path
	const modelPath = PPUtils.legalize($pp);
	// get model
	const model = MUtils.getValue($root, modelPath);
	const recompute = {$key, $validationScopes};
	NUtils.getDefKey(recompute);
	NUtils.inheritValidationScopes({}, recompute);

	return <RootEventBusProvider>
		<ExternalDefsHandler options={rest} externalDefs={externalDefs}/>
		{leading}
		{children}
		<EventHolder/>
		<Wrapper $root={$root} $p2r={modelPath} $model={model} {...recompute} {...rest} />
		{tailing}
	</RootEventBusProvider>;
};

export * from './lib/hooks';
export * from './lib/types';
export * from './lib/external-defs-handler';
export * from './lib/utils';
export * from './lib/constants';
export * from './lib/wrapper';
export * from './lib/wrappers';
export * from './lib/widgets-registration';
export * from './lib/events';
