import {StandaloneRoot} from '@rainbow-d9/n1';
import {
	$d9n2,
	ButtonBarAlignment,
	GlobalEventTypes,
	GlobalRoot,
	UnwrappedButton,
	UnwrappedButtonBar,
	useGlobalEventBus
} from '@rainbow-d9/n2';
import {CustomEventHandler} from '../custom-event-handler';
import {N2DemoDialogHandler} from '../n2-dialog-handler';
import {useDemoMarkdown} from '../use-demo-markdown';
import DemoData from './demo.json';
import {markdown as DemoContent} from './demo.md';

$d9n2.intl.labels['zh'] = {
	'# 8. Internationalization': '# 8. 国际化',
	Test1: '测试1',
	Test2: '测试2',
	Female: '女',
	Male: '男',
	'Field is required.': '字段不能为空.',
	'Test 2 is required.': '测试2不能为空.',
	pagination: {
		page: '第', of: '页, 共', pages: '页,', afterSize: '行每页,',
		total: '共', unknownItemCount: '???', items: '行.'
	}
};

const Languages = () => {
	const {fire} = useGlobalEventBus();
	const onEnClicked = () => {
		$d9n2.intl.language = 'en-US';
		fire(GlobalEventTypes.LANGUAGE_CHANGED, 'en-US');
	};
	const onZhClicked = () => {
		$d9n2.intl.language = 'zh';
		fire(GlobalEventTypes.LANGUAGE_CHANGED, 'zh');
	};
	/** @ts-ignore */
	return <UnwrappedButtonBar alignment={ButtonBarAlignment.CENTER}>
		{/** @ts-ignore */}
		<UnwrappedButton onClick={onEnClicked}>EN</UnwrappedButton>
		{/** @ts-ignore */}
		<UnwrappedButton onClick={onZhClicked}>ZH</UnwrappedButton>
	</UnwrappedButtonBar>;
};
export const N2Intl = () => {
	const def = useDemoMarkdown(DemoContent);

	return <GlobalRoot>
		<CustomEventHandler/>
		<N2DemoDialogHandler/>
		<Languages/>
		<StandaloneRoot {...def} $root={DemoData}/>
	</GlobalRoot>;
};

export const N2IntlData = DemoData;
export const N2IntlMarkdown = DemoContent;
