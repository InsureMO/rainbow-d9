import {ValueChangeableNodeDef} from '@rainbow-d9/n1';
import {createAsyncSnippetBuild} from './snippet-attribute-build';

export const ValueChangedBuild =
	createAsyncSnippetBuild<ValueChangeableNodeDef, 'valueChanged'>('valueChanged', ['options', 'handlers']);
