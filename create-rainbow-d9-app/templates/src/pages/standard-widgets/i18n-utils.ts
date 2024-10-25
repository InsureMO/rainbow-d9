import {MUtils} from '@rainbow-d9/n1';
import {$D9N2I18NLabels} from '@rainbow-d9/n2';

export const redressByCutPrefix = (labels: Record<string, string>, prefix: string): $D9N2I18NLabels => {
	const prefixLength = prefix.length + 1;

	return Object.keys(labels).reduce((acc, key) => {
		MUtils.setValue(acc, key.substring(prefixLength), labels[key]);
		return acc;
	}, {} as Record<string, string>);
};
