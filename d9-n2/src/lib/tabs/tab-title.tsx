import {
	buildDefaultAttributeValues,
	ModelHolder,
	MUtils,
	NodeAttributeValues,
	PPUtils,
	useAttributesWatch,
	VUtils
} from '@rainbow-d9/n1';
import React, {MouseEvent, useState} from 'react';
import {LabelLike} from '../label-like';
import {useTabsEventBus} from './event/tabs-event-bus';
import {TabsEventTypes} from './event/tabs-event-bus-types';
import {TabTitleDef} from './types';
import {ATabTitle} from './widgets';

export interface TabTitleProps extends TabTitleDef, ModelHolder {
	active?: boolean;
	tabIndex: number;
	marker: string;
}

export const TabTitle = (props: TabTitleProps) => {
	const {
		$pp, title, badge,
		$root, $model, $p2r,
		active, tabIndex, marker,
		...rest
	} = props;

	const {fire} = useTabsEventBus();
	// monitor myself, mostly for $disabled and $visible
	const [attributeValues, setAttributeValues] = useState<NodeAttributeValues>(buildDefaultAttributeValues(props));
	useAttributesWatch({props, attributeValues, setAttributeValues});

	const $wrapped = {
		$root, $model: MUtils.getValue($model, $pp), $p2r: PPUtils.concat($p2r, $pp),
		$avs: attributeValues, $onValueChange: VUtils.noop
	};
	const {$disabled, $visible} = attributeValues;

	const onTitleClicked = (event: MouseEvent<HTMLDivElement>) => {
		if ($disabled) {
			return;
		}

		event.preventDefault();
		event.stopPropagation();

		fire(TabsEventTypes.ACTIVE_TAB, tabIndex, marker);
	};

	return <ATabTitle data-disabled={$disabled} data-visible={$visible} data-active={active}
	                  {...rest}
	                  onClick={onTitleClicked}>
		<LabelLike $wrapped={$wrapped} label={title} wrapByCaption={true}/>
		<LabelLike $wrapped={$wrapped} label={badge}/>
	</ATabTitle>;
};
