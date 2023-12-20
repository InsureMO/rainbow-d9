import {EnhancedPropsForArrayElement} from '@rainbow-d9/n1';
import React, {useState} from 'react';
import {LabelLike} from '../label-like';
import {RibRowOperators} from './rib-row-operators';
import {RibsProps} from './types';
import {ARibRow, ARibRowBody, ARibRowHeader, ARibRowHeaderContent, ARibRowIndex} from './widgets';

export const RibRow = (props: Omit<RibsProps, '$array'> & { $array: EnhancedPropsForArrayElement }) => {
	const {
		caption,
		$wrapped,
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
				<LabelLike label={caption} $wrapped={$wrapped} $validationScopes={props} wrapByCaption={true}/>
			</ARibRowHeaderContent>
			<RibRowOperators expanded={expanded} expand={expand} collapse={collapse}
			                 removable={removable} removeElement={removeElement}/>
		</ARibRowHeader>
		<ARibRowBody expanded={expanded}>
			{children}
		</ARibRowBody>
	</ARibRow>;
};
