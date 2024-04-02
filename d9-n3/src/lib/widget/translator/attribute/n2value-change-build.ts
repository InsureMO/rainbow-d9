import {createAsyncSnippetBuild} from "./snippet-attribute-build";
import {ValueChangeableNodeDef} from "@rainbow-d9/n1/src";

export const N2ValueChangedBuild = createAsyncSnippetBuild<ValueChangeableNodeDef, 'valueChanged'>('valueChanged', ['options']);
