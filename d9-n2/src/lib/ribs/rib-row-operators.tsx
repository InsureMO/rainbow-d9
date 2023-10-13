import React from 'react';
import {ARibRowOperator, ARibRowOperators} from './widgets';

const ExpandButton = (props: { onClick: () => void }) => {
	const {onClick} = props;
	return <ARibRowOperator onClick={onClick}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
			<path
				d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z" />
		</svg>
	</ARibRowOperator>;
};
const CollapseButton = (props: { onClick: () => void }) => {
	const {onClick} = props;
	return <ARibRowOperator onClick={onClick}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
			<path
				d="M160 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V64zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32H96v64c0 17.7 14.3 32 32 32s32-14.3 32-32V352c0-17.7-14.3-32-32-32H32zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V64zM320 320c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z" />
		</svg>
	</ARibRowOperator>;
};
const RemoveButton = (props: { onClick: () => void }) => {
	const {onClick} = props;
	return <ARibRowOperator onClick={onClick}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
			<path
				d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
		</svg>
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
			{removable ? <RemoveButton onClick={onRemoveClicked} /> : null}
			{!expanded ? <ExpandButton onClick={expand} /> : null}
			{expanded ? <CollapseButton onClick={collapse} /> : null}
		</span>
	</ARibRowOperators>;
};
