/**
 * value should be "var(--x, 1)", and create css string as "--x: 1;"
 * any other values will be ignored
 */
export const createCss = (theme: Record<string, string | number>) => {
	return Object.keys(theme)
		.filter(key => typeof theme[key] === 'string' && (theme[key] as string).startsWith('var('))
		.map(key => {
			const parts = (theme[key] as string).split(',');
			return [parts[0], parts.slice(1).join(',').trim()];
		})
		.map(([p1, p2]) => [p1.substring(4), p2.slice(0, -1)])
		.map(([key, value]) => `${key}: ${value};`).join('\n');
};
