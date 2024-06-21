import {markdown as stepName} from './name.md';
import {markdown as stepTransformer} from './transformer.md';

export const docs = {
	stepName,
	// replace $ to $$, since this content will be used in a replacement string
	stepTransformer: stepTransformer.replace(/\$/g, '$$$$')
};
