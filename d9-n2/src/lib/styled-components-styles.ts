import {DOM_ID_WIDGET, DOM_KEY_WIDGET} from './constants';

export type DataW = { [DOM_KEY_WIDGET]?: string };
export type DataID = { [DOM_ID_WIDGET]?: string };
export type DataScroll = { 'data-h-scroll'?: string, 'data-v-scroll'?: string };
export type DataPrefix = DataW & DataID & DataScroll;
export type SDP = DataPrefix;

export type WithDataW<T> = T & DataW;
export type WithDataID<T> = T & DataID;
export type WithDataWID<T> = T & DataW & DataID;
export type WithDataPrefix<T> = T & DataPrefix;
export type WSDP<T> = WithDataPrefix<T>
