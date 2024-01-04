import {Dispatch, SetStateAction} from 'react';
import {MonitorNodeAttributes, NodeAttributeValueHandle, NodeAttributeValues, PropertyPath} from '../types';

export type Watchers = Record<MonitorNodeAttributes, NodeAttributeValueHandle>;
export type Watches = Record<PropertyPath, Watchers>;

export interface DefaultNodeAttributesState {
	$defaultAttributes: NodeAttributeValues;
	$defaultAttributesSet: Dispatch<SetStateAction<NodeAttributeValues>>;
}
