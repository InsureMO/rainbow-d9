export const isBlank = (value?: any) => {
	if (value == null) {
		return true;
	} else {
		return `${value}`.trim().length === 0;
	}
};
export const isNotBlank = (value?: any) => !isBlank(value);
