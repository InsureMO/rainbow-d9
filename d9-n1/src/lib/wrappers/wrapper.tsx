import React from 'react';
import {WrapperEventBusProvider} from '../events';
import {ModelHolder, NodeDef} from '../types';
import {WrapperDelegate} from './wrapper-delegate';

export const Wrapper = (props: NodeDef & ModelHolder) => {
	return <WrapperEventBusProvider>
		<WrapperDelegate {...props} />
	</WrapperEventBusProvider>;
};
