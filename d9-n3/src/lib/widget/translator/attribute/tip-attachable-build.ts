import {Global} from '@rainbow-d9/n2';
import {createSyncSnippetBuild} from './snippet-attribute-build';

export const TipAttachableBuild = createSyncSnippetBuild<Global.TipAttachableWidget, 'tip'>('tip', ['options']);
