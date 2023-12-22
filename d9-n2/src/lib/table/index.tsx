import {registerWidget, WidgetRegistrationOptions} from '@rainbow-d9/n1';
import React from 'react';
import {TableEventBusProvider} from './event/table-event-bus';
import {Table as T} from './table';
import {TableBottomBar} from './table-bottom-bar';
import {TableContent} from './table-content';
import {TableNoData} from './table-no-data';
import {TableRow} from './table-row';
import {TableTopBar} from './table-top-bar';
import {TableDef, TableHeaderDef, TableProps} from './types';

export const Table = (props: TableProps) => {
	const {children, ...rest} = props;
	return <TableEventBusProvider>
		<T {...rest}>
			{children}
		</T>
	</TableEventBusProvider>;
};

registerWidget({
	key: 'Table', JSX: Table,
	TOP: TableTopBar, BODY: TableContent, NO_ELEMENT: TableNoData, ELEMENT: TableRow, BOTTOM: TableBottomBar,
	container: true, array: true
} as WidgetRegistrationOptions);

export {TableProps, TableDef, TableHeaderDef};
export * as TableUtils from './utils';