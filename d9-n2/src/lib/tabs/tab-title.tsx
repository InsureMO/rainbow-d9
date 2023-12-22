import {
	buildDefaultAttributeValues,
	ModelHolder,
	MUtils,
	NodeAttributeValues,
	PPUtils,
	useAttributesWatch,
	VUtils
} from '@rainbow-d9/n1';
import React, {useState} from 'react';
import {LabelLike} from '../label-like';
import {TabTitleDef} from './types';
import {ATabTitle} from './widgets';

export const TabTitle = (props: TabTitleDef & ModelHolder) => {
	const {
		$pp, title, badge,
		$root, $model, $p2r,
		...rest
	} = props;

	// monitor myself, mostly for $disabled and $visible
	const [attributeValues, setAttributeValues] = useState<NodeAttributeValues>(buildDefaultAttributeValues(props));
	useAttributesWatch({props, attributeValues, setAttributeValues});

	const $wrappedTitle = {
		$root, $model: MUtils.getValue($model, $pp), $p2r: PPUtils.concat($p2r, $pp),
		$avs: attributeValues, $onValueChange: VUtils.noop
	};
	const {$disabled, $visible} = attributeValues;

	return <ATabTitle data-disabled={$disabled} data-visible={$visible} {...rest}>
		<LabelLike $wrapped={$wrappedTitle} label={title} wrapByCaption={true}/>
		<LabelLike $wrapped={$wrappedTitle} label={badge}/>
	</ATabTitle>;
};
