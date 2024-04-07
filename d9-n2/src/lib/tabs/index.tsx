import {MUtils, PPUtils, registerWidget} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef} from 'react';
import {TabsEventBusProvider} from './event/tabs-event-bus';
import {TabBody} from './tab-body';
import {TabTitle} from './tab-title';
import {TabsController} from './tabs-controller';
import {TabsProps} from './types';
import {redressTabMarker} from './utils';
import {ATabs, TabsBody, TabsHeader} from './widgets';

const InternalTabs = forwardRef((props: TabsProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {$pp, $wrapped, initActive, contents, ...rest} = props;
	const {$p2r, $avs: {$disabled, $visible}} = $wrapped;

	(contents ?? []).forEach(content => redressTabMarker(content));

	return <ATabs {...rest} data-disabled={$disabled} data-visible={$visible}
	              id={PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id)}
	              ref={ref}>
		<TabsHeader>
			{(contents ?? []).map((content, index) => {
				const $model = MUtils.getValue($wrapped.$model, $pp);
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const {data, ...rest} = content;
				return <TabTitle key={content.marker}
				                 $root={$wrapped.$root} $model={$model} $p2r={PPUtils.concat($p2r, $pp)}
				                 {...rest} tabIndex={index} marker={content.marker}/>;
			})}
		</TabsHeader>
		<TabsBody>
			{(contents ?? []).map((content, index) => {
				const $model = MUtils.getValue($wrapped.$model, $pp);
				// marker already redressed in headers rendering
				return <TabBody key={content.marker} def={content.body} $pp={content.$pp}
				                $root={$wrapped.$root} $model={$model} $p2r={PPUtils.concat($p2r, $pp)}
				                tabIndex={index} marker={content.marker}/>;
			})}
		</TabsBody>
		<TabsController $pp={$pp} $wrapped={$wrapped} initActive={initActive} contents={contents}/>
	</ATabs>;
});

export const Tabs = forwardRef((props: TabsProps, ref: ForwardedRef<HTMLDivElement>) => {
	return <TabsEventBusProvider>
		<InternalTabs {...props} ref={ref}/>
	</TabsEventBusProvider>;
});

registerWidget({key: 'Tabs', JSX: Tabs, container: false, array: false});

export * from './types';
