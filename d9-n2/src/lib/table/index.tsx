import {registerWidget, WidgetRegistrationOptions} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef} from 'react';
import {TableEventBusProvider} from './event/table-event-bus';
import {Table as T} from './table';
import {TableBottomBar} from './table-bottom-bar';
import {TableContent} from './table-content';
import {TableNoData} from './table-no-data';
import {TableRow} from './table-row';
import {TableDef, TableHeaderDef, TableProps, TableRowButtonDef} from './types';

export const Table = forwardRef((props: TableProps, ref: ForwardedRef<HTMLDivElement>) => {
	const {children, ...rest} = props;
	return <TableEventBusProvider>
		<T {...rest} ref={ref}>
			{children}
		</T>
	</TableEventBusProvider>;
});

registerWidget({
	key: 'Table', JSX: Table,
	TOP: null, BODY: TableContent, NO_ELEMENT: TableNoData, ELEMENT: TableRow, BOTTOM: TableBottomBar,
	container: true, array: true
} as WidgetRegistrationOptions);

export {TableProps, TableDef, TableHeaderDef, TableRowButtonDef};
export * as TableUtils from './utils';