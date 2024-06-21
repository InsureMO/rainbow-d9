import {markdown as stepName} from './name.md';
import {markdown as stepTransformer} from './transformer.md';

export const docs = {
	stepName, stepTransformer: stepTransformer.replace(/\$/g, '$$$$')
};
