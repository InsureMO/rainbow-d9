import {VUtils} from '@rainbow-d9/n1';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trim = (value: any) => {
	if (value == null) {
		return (void 0);
	} else if (typeof value === 'string') {
		value = value.trim();
		return VUtils.isBlank(value) ? (void 0) : value;
	} else {
		return value;
	}
};

export const indent = '  ';
export const indentN = (times: number) => indent.repeat(times);
