import {EnhancedPropsForArrayElement, NUtils, Wrapper} from '@rainbow-d9/n1';
import React, {useState} from 'react';
import {RibRowOperators} from './rib-row-operators';
import {RibsProps} from './types';
import {ARibRow, ARibRowBody, ARibRowHeader, ARibRowHeaderContent, ARibRowIndex} from './widgets';

export const RibRow = (props: Omit<RibsProps, '$array'> & { $array: EnhancedPropsForArrayElement }) => {
	const {
		caption,
		$wrapped: {$root, $p2r, $model},
		$array: {elementIndex, removable, removeElement},
		children
	} = props;

	const [expanded, setExpanded] = useState(false);
	const expand = () => setExpanded(true);
	const collapse = () => setExpanded(false);

	return <ARibRow>
		<ARibRowHeader>
			<ARibRowIndex># {elementIndex + 1}</ARibRowIndex>
			<ARibRowHeaderContent>
				{caption == null
					? null
					: (() => {
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						const {$key: keyOfChild, ...rest} = caption;
						NUtils.getDefKey(caption);
						NUtils.inheritValidationScopes(props, caption);
						return <Wrapper $root={$root} $model={$model} $p2r={$p2r} {...rest} />;
					})()}
			</ARibRowHeaderContent>
			<RibRowOperators expanded={expanded} expand={expand} collapse={collapse}
			                 removable={removable} removeElement={removeElement} />
		</ARibRowHeader>
		<ARibRowBody expanded={expanded}>
			{children}
		</ARibRowBody>
	</ARibRow>;
};
