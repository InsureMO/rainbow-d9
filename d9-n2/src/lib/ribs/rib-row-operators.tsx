import React from 'react';
import {Collapse, Expand, Remove} from '../icons';
import {ARibRowOperator, ARibRowOperators} from './widgets';

const ExpandButton = (props: { onClick: () => void }) => {
	const {onClick} = props;
	return <ARibRowOperator onClick={onClick}>
		<Expand/>
	</ARibRowOperator>;
};
const CollapseButton = (props: { onClick: () => void }) => {
	const {onClick} = props;
	return <ARibRowOperator onClick={onClick}>
		<Collapse/>
	</ARibRowOperator>;
};
const RemoveButton = (props: { onClick: () => void }) => {
	const {onClick} = props;
	return <ARibRowOperator onClick={onClick}>
		<Remove/>
	</ARibRowOperator>;
};

export const RibRowOperators = (props: {
	expanded: boolean; expand: () => void; collapse: () => void;
	removable?: boolean; removeElement: () => Promise<void>;
}) => {
	const {expanded, expand, collapse, removable = false, removeElement} = props;

	const onRemoveClicked = async () => await removeElement();

	return <ARibRowOperators data-expanded={expanded}>
		<span>
			{removable ? <RemoveButton onClick={onRemoveClicked}/> : null}
			{!expanded ? <ExpandButton onClick={expand}/> : null}
			{expanded ? <CollapseButton onClick={collapse}/> : null}
		</span>
	</ARibRowOperators>;
};
