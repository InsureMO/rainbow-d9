import {ModelUtilsType, PropertyPathUtilsType, ValueUtilsType} from '@rainbow-d9/n1';

declare global {
	interface Window {
		PPUtils: PropertyPathUtilsType;
		VUtils: ValueUtilsType;
		MUtils: ModelUtilsType;
	}
}
