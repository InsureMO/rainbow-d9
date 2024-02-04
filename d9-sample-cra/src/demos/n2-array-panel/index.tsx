import {ArrayPropValue, BaseModel, StandaloneRoot} from '@rainbow-d9/n1';
import {GlobalRoot, ModelCarrier} from '@rainbow-d9/n2';
import {CustomEventHandler} from '../custom-event-handler';
import {N2DemoDialogHandler} from '../n2-dialog-handler';
import {useDemoMarkdown} from '../use-demo-markdown';
import DemoData from './demo.json';
import {markdown as DemoContent} from './demo.md';

export const N2ArrayPanel = () => {
	const def = useDemoMarkdown(DemoContent);

	const externalDefs = {
		couldAddElement: async (options: ModelCarrier<BaseModel, ArrayPropValue>, _handlers: GlobalEventHandlers): Promise<boolean> => {
			// at most 5 elements
			return ((options.model ?? []).length) < 5;
		}
	};

	return <GlobalRoot>
		<CustomEventHandler/>
		<N2DemoDialogHandler/>
		<StandaloneRoot {...def} $root={DemoData} externalDefs={externalDefs}/>
	</GlobalRoot>;
};

export const N2ArrayPanelData = DemoData;
export const N2ArrayPanelMarkdown = DemoContent;
