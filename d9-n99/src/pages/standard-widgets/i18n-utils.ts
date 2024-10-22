import {MUtils} from '@rainbow-d9/n1';
import {$D9N2I18NLabels} from '@rainbow-d9/n2';

export const redressByCutPrefix = (labels: Record<string, string>, prefix: string): $D9N2I18NLabels => {
	const prefixLength = prefix.length + 1;

	// const duplications: Record<string, Array<string>> = {};
	return Object.keys(labels).reduce((acc, key) => {
		MUtils.setValue(acc, key.substring(prefixLength), labels[key]);
		// duplications[labels[key]] = [...(duplications[labels[key]] ?? []), key];
		return acc;
	}, {} as Record<string, string>);
	// console.log(Object.keys(duplications).filter(key => duplications[key].length > 1).reduce((acc, key) => {
	// 	acc[key] = duplications[key];
	// 	return acc;
	// }, {} as Record<string, Array<string>>));
	// return redressed;
};
