import {MonitorNodeAttributes, NodeAttributeValueHandle, PropertyPath} from '../types';

export type Watchers = Record<MonitorNodeAttributes, NodeAttributeValueHandle>;
export type Watches = Record<PropertyPath, Watchers>;
