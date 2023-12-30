import {
	MonitorOthers,
	NodeAttributeValue,
	NodeAttributeValueHandle,
	Nullable,
	PropertyPath,
	Undefinable
} from '@rainbow-d9/n1';
import {WidgetType} from '../../../semantic';
import {AttributeMap} from '../types';

export interface MonitorHandlerDetectOptions {
	$wt: WidgetType;
	$pp: Nullable<PropertyPath>;
	attributes: AttributeMap;
}

export type MonitorHandler = Undefinable<Partial<MonitorOthers<NodeAttributeValue>> | NodeAttributeValueHandle>

/**
 * detect single property to be a step of monitor handle,
 * every step has same function signature, and exactly same as defined.
 */
export type MonitorHandlerDetective = (options: MonitorHandlerDetectOptions) => MonitorHandler;

export interface MonitorHandlers {
	attributes: AttributeMap;
	handlers: Array<Exclude<MonitorHandler, undefined>>;
}

export type MonitorHandlersDetective = (options: MonitorHandlerDetectOptions) => MonitorHandlers;
