export interface DeviceType {
	touchable: boolean;
	mobile: boolean;
	tablet: boolean;
	desktop: boolean;
}

export type DeviceTag = `data-${keyof DeviceType}`
export type DeviceTags = Record<DeviceTag, boolean>;
