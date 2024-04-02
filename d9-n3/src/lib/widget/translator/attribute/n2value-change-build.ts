import {ValueChangeableNodeDef} from "@rainbow-d9/n1/lib/types/def-props-types";
import {createAsyncSnippetBuild} from "../../../../../lib/widget";

export const N2valueChangeBuild = createAsyncSnippetBuild<ValueChangeableNodeDef,'valueChanged'>('valueChanged',['options']);