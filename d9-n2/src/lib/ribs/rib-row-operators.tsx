import {VUtils, WrappedAttributes} from '@rainbow-d9/n1';
import React from 'react';
import {Button, ButtonFill, ButtonInk} from '../button';
import {useGlobalHandlers} from '../global';
import {ARibRowOperators} from './widgets';

const ExpandButton = (props: { onClick: () => void }) => {
	const {onClick} = props;
	const $wrapped: WrappedAttributes = {
		$root: {}, $model: {}, $p2r: '.', $onValueChange: VUtils.noop,
		$avs: {$disabled: false, $visible: true}
	};
	return <Button $wrapped={$wrapped} ink={ButtonInk.PRIMARY} fill={ButtonFill.PLAIN} leads={['$icons.expand']}
	               click={onClick}
	               data-w="d9-rib-row-operator"/>;
};
const CollapseButton = (props: { onClick: () => void }) => {
	const {onClick} = props;
	const $wrapped: WrappedAttributes = {
		$root: {}, $model: {}, $p2r: '.', $onValueChange: VUtils.noop,
		$avs: {$disabled: false, $visible: true}
	};
	return <Button $wrapped={$wrapped} ink={ButtonInk.PRIMARY} fill={ButtonFill.PLAIN} leads={['$icons.collapse']}
	               click={onClick}
	               data-w="d9-rib-row-operator"/>;
};
const RemoveButton = (props: { onClick: () => void }) => {
	const {onClick} = props;
	const $wrapped: WrappedAttributes = {
		$root: {}, $model: {}, $p2r: '.', $onValueChange: VUtils.noop,
		$avs: {$disabled: false, $visible: true}
	};
	return <Button $wrapped={$wrapped} ink={ButtonInk.PRIMARY} fill={ButtonFill.PLAIN} leads={['$icons.remove']}
	               click={onClick}
	               data-w="d9-rib-row-operator"/>;
};

export const RibRowOperators = (props: {
	expanded: boolean; expand: () => void; collapse: () => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	removable?: boolean; removeElement: (...args: Array<any>) => Promise<void>;
}) => {
	const {expanded, expand, collapse, removable = false, removeElement} = props;

	const globalHandlers = useGlobalHandlers();
	const onRemoveClicked = async () => await removeElement(globalHandlers);

	return <ARibRowOperators data-expanded={expanded}>
		{removable ? <RemoveButton onClick={onRemoveClicked}/> : null}
		{!expanded ? <ExpandButton onClick={expand}/> : null}
		{expanded ? <CollapseButton onClick={collapse}/> : null}
	</ARibRowOperators>;
};
