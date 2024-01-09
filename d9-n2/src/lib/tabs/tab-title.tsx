import {
	DefaultNodeAttributesState,
	ModelHolder,
	MUtils,
	PPUtils,
	useAttributesWatch,
	useDefaultAttributeValues,
	VUtils
} from '@rainbow-d9/n1';
import React, {MouseEvent} from 'react';
import {LabelLike} from '../label-like';
import {useTabsEventBus} from './event/tabs-event-bus';
import {TabsEventTypes} from './event/tabs-event-bus-types';
import {TabTitleDef} from './types';
import {useTabActive} from './use-tab-active';
import {ATabTitle} from './widgets';

export interface TabTitleProps extends TabTitleDef, ModelHolder {
	tabIndex: number;
	marker: string;
}

export const TabTitleWorker = (props: TabTitleProps & DefaultNodeAttributesState & { active: boolean }) => {
	const {
		$pp, title, badge,
		$root, $model, $p2r,
		tabIndex, marker, active,
		$defaultAttributes: attributeValues, $defaultAttributesSet: setAttributeValues,
		...rest
	} = props;

	const {fire} = useTabsEventBus();
	// monitor myself, mostly for $disabled and $visible
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

		fire(TabsEventTypes.TRY_ACTIVE_TAB, tabIndex, marker);
	};

	return <ATabTitle data-disabled={$disabled} data-visible={$visible} data-active={active}
	                  {...rest}
	                  onClick={onTitleClicked}>
		<LabelLike $wrapped={$wrapped} label={title} wrapByCaption={true}/>
		<LabelLike $wrapped={$wrapped} label={badge}/>
	</ATabTitle>;
};

export const TabTitle = (props: TabTitleProps) => {
	const {tabIndex, marker} = props;

	// active hook must put here, since tab title is rendered before tab controller
	// and since the attribute initializer is async, the tab title worker is not ensured to be rendered before tab controller
	// which leads to miss the active tab event from inside
	const active = useTabActive(tabIndex, marker);
	const {initialized, $defaultAttributes, $defaultAttributesSet} = useDefaultAttributeValues(props);
	if (!initialized) {
		return null;
	}

	return <TabTitleWorker {...props} active={active}
	                       $defaultAttributes={$defaultAttributes}
	                       $defaultAttributesSet={$defaultAttributesSet}/>;
};
