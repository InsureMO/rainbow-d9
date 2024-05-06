import {VUtils} from '@rainbow-d9/n1';
import {Global} from '@rainbow-d9/n2';
import React, {ReactNode, useRef} from 'react';
import {PlanElementDef} from './types';
import {PlanElementCellContainer} from './widgets';

export interface PlanElementCellWithTipProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	attributes: Record<string, any>;
	elementDef: PlanElementDef;
	children?: ReactNode;
}

export const PlanElementCellWithTip = (props: PlanElementCellWithTipProps) => {
	const {attributes, elementDef, children} = props;

	const ref = useRef<HTMLDivElement>(null);
	Global.useTip({
		ref, title: elementDef.tip.title, body: elementDef.tip.body,
		minWidth: elementDef.tip.minWidth, maxWidth: elementDef.tip.maxWidth, maxHeight: elementDef.tip.maxHeight,
		delay: elementDef.tip.delay
	});

	return <PlanElementCellContainer {...attributes} ref={ref}>
		{children}
	</PlanElementCellContainer>;
};

export interface PlanElementCellProps {
	lack?: true;
	category?: true;
	odd: boolean;
	ancestorCollapsed?: boolean;
	elementDef?: PlanElementDef;
	children?: ReactNode;
}

export const PlanElementCell = (props: PlanElementCellProps) => {
	const {lack, category, odd, ancestorCollapsed, elementDef, children} = props;

	const attributes = (() => {
		const attrs = {};
		if (lack === true) {
			attrs['data-element-lack'] = true;
		}
		if (category === true) {
			attrs['data-element-category'] = true;
		}
		if (ancestorCollapsed === true) {
			attrs['data-ancestor-collapsed'] = true;
		}
		attrs['data-odd'] = odd;
		return attrs;
	})();

	if (elementDef?.tip != null && VUtils.isNotBlank(elementDef.tip.body)) {
		return <PlanElementCellWithTip attributes={attributes} elementDef={elementDef}>
			{children}
		</PlanElementCellWithTip>;
	} else {
		return <PlanElementCellContainer {...attributes} >
			{children}
		</PlanElementCellContainer>;
	}
};
