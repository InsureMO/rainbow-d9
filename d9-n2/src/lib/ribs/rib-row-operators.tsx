import {VUtils, WrappedAttributes} from '@rainbow-d9/n1';
import React from 'react';
import styled from 'styled-components';
import {Button, ButtonFill, ButtonInk} from '../button';
import {CssVars, DOM_KEY_WIDGET} from '../constants';
import {useGlobalHandlers} from '../global';
import {ArrowDown} from '../icons';
import {ARibRowOperators} from './widgets';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const RibRowExpanderSvg = styled(ArrowDown as any).attrs({[DOM_KEY_WIDGET]: 'd9-rib-row-header-expander-svg'})`
    height: 70%;
    color: ${CssVars.FONT_COLOR};
    opacity: 0.7;
    transition: transform ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-expanded=true] {
        transform: rotateX(180deg);
    }
`;
const SectionStyleExpander = (props: { expanded: boolean; expand: () => void; collapse: () => void }) => {
	const {expanded, expand, collapse} = props;
	const $wrapped: WrappedAttributes = {
		$root: {}, $model: {}, $p2r: '.', $onValueChange: VUtils.noop,
		$avs: {$disabled: false, $visible: true}
	};
	return <Button $wrapped={$wrapped} ink={ButtonInk.PRIMARY} fill={ButtonFill.PLAIN}
	               leads={[<RibRowExpanderSvg data-expanded={expanded}/>]}
	               click={expanded ? collapse : expand}
	               data-w="d9-rib-row-operator"
	               data-role={expanded ? 'collapse' : 'expand'}/>;
};

const ExpandButton = (props: { onClick: () => void }) => {
	const {onClick} = props;
	const $wrapped: WrappedAttributes = {
		$root: {}, $model: {}, $p2r: '.', $onValueChange: VUtils.noop,
		$avs: {$disabled: false, $visible: true}
	};
	return <Button $wrapped={$wrapped} ink={ButtonInk.PRIMARY} fill={ButtonFill.PLAIN} leads={['$icons.expand']}
	               click={onClick}
	               data-w="d9-rib-row-operator" data-role="expand"/>;
};
const CollapseButton = (props: { onClick: () => void }) => {
	const {onClick} = props;
	const $wrapped: WrappedAttributes = {
		$root: {}, $model: {}, $p2r: '.', $onValueChange: VUtils.noop,
		$avs: {$disabled: false, $visible: true}
	};
	return <Button $wrapped={$wrapped} ink={ButtonInk.PRIMARY} fill={ButtonFill.PLAIN} leads={['$icons.collapse']}
	               click={onClick}
	               data-w="d9-rib-row-operator" data-role="collapse"/>;
};
const RemoveButton = (props: { onClick: () => void }) => {
	const {onClick} = props;
	const $wrapped: WrappedAttributes = {
		$root: {}, $model: {}, $p2r: '.', $onValueChange: VUtils.noop,
		$avs: {$disabled: false, $visible: true}
	};
	return <Button $wrapped={$wrapped} ink={ButtonInk.PRIMARY} fill={ButtonFill.PLAIN} leads={['$icons.remove']}
	               click={onClick}
	               data-w="d9-rib-row-operator" data-role="remove"/>;
};

export const RibRowOperators = (props: {
	expanded: boolean; expand: () => void; collapse: () => void;
	useSectionStyleIcons: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	removable?: boolean; removeElement: (...args: Array<any>) => Promise<void>;
}) => {
	const {expanded, expand, collapse, useSectionStyleIcons, removable = false, removeElement} = props;

	const globalHandlers = useGlobalHandlers();
	const onRemoveClicked = async () => await removeElement(globalHandlers);

	return <ARibRowOperators data-expanded={expanded}>
		{removable ? <RemoveButton onClick={onRemoveClicked}/> : null}
		{useSectionStyleIcons
			? <SectionStyleExpander expanded={expanded} expand={expand} collapse={collapse}/>
			: <>
				{!expanded ? <ExpandButton onClick={expand}/> : null}
				{expanded ? <CollapseButton onClick={collapse}/> : null}
			</>}
	</ARibRowOperators>;
};
