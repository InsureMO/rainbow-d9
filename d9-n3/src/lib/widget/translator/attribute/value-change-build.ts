import {ValueChangeableNodeDef} from '@rainbow-d9/n1/src';
import {createAsyncSnippetBuild} from './snippet-attribute-build';

export const ValueChangedBuild =
	createAsyncSnippetBuild<ValueChangeableNodeDef, 'valueChanged'>('valueChanged', ['options', 'handlers']);
