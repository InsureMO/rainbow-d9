import {MUtils, PPUtils, registerWidget, VUtils} from '@rainbow-d9/n1';
import React from 'react';
import {TabTitle} from './tab-title';
import {TabDef, TabsProps} from './types';
import {ATabs, TabsBody, TabsHeader} from './widgets';

const redressTabMarker = (content: TabDef) => {
	if (VUtils.isNotBlank(content.marker)) {
		return content.marker;
	}
	if (typeof content.title === 'string') {
		content.marker = content.title;
		return content.marker;
	}
	content.marker = VUtils.generateUniqueId();
	return content.marker;
};

export const Tabs = (props: TabsProps) => {
	const {$pp, $wrapped, contents, ...rest} = props;
	const {$p2r, $avs: {$disabled, $visible}} = $wrapped;

	return <ATabs {...rest} data-disabled={$disabled} data-visible={$visible}
	              id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}>
		<TabsHeader>
			{(contents ?? []).map(content => {
				redressTabMarker(content);
				const $model = MUtils.getValue($wrapped.$model, $pp);
				return <TabTitle key={content.marker}
				                 $root={$wrapped.$root} $model={$model} $p2r={PPUtils.concat($p2r, $pp)}
				                 {...content}/>;
			})}
		</TabsHeader>
		<TabsBody>

		</TabsBody>
	</ATabs>;
};

registerWidget({key: 'Tabs', JSX: Tabs, container: false, array: false});

export * from './types';
