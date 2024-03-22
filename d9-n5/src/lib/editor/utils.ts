export const beautifyTemplate = (template: string, prefix: string, indent: string): string => {
	template = `${prefix} ${template}`;
	template = template.split('\n').map((line, index) => {
		if (index === 0) {
			return `${indent}${line}`;
		} else if (line.trim().startsWith('#')) {
			// force insert an empty line after heading
			return `${indent}${line}\n`;
		} else {
			return `${indent}  ${line}`;
		}
	}).join('\n');
	return template;
};
