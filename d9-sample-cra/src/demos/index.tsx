import {UnwrappedTsEditor} from '@rainbow-d9/code-editor/src';
import {DeviceDetective, useForceUpdate, VUtils} from '@rainbow-d9/n1';
import {ButtonFill, ButtonInk, UnwrappedButton} from '@rainbow-d9/n2';
import {Fragment, useState} from 'react';
import {
	DemoContainer,
	DemoPlayground,
	Demos,
	DemoSource,
	DemoSourceBody,
	DemoSourceHeader,
	MarkdownContainer
} from './demo-layout';
import 'github-markdown-css/github-markdown.css';
import {DemoLayoutMenus} from './demo-layout/menus';

enum ActiveSource {
	NONE = 'none',
	MARKDOWN = 'markdown',
	JSON = 'json'
}

export const DemoIndex = () => {
	const [pathname, setPathname] = useState(localStorage.getItem('PATH') || '/n2-basic-widgets');

	const [activeSource, setActiveSource] = useState<ActiveSource>(ActiveSource.NONE);
	const forceUpdate = useForceUpdate();

	const onMenuClicked = (pathname: string) => () => {
		localStorage.setItem('PATH', pathname);
		setPathname(pathname);
	};
	const onHideAllClicked = () => setActiveSource(ActiveSource.NONE);
	const onMarkdownClicked = () => setActiveSource(ActiveSource.MARKDOWN);
	const onJsonClicked = () => setActiveSource(ActiveSource.JSON);
	const onJsonDataRefreshClicked = () => forceUpdate();

	const route = {[pathname]: true};

	const C = Demos.find(demo => demo.path === pathname)?.C ?? Fragment;
	const markdown = Demos.find(demo => demo.path === pathname)?.markdown ?? '';
	const json = Demos.find(demo => demo.path === pathname)?.data ?? {};

	return <DemoContainer data-active-source={activeSource}>
		<DeviceDetective/>
		<DemoLayoutMenus route={route} onMenuClicked={onMenuClicked}/>
		<DemoPlayground data-v-scroll="" data-h-scroll="">
			<C/>
		</DemoPlayground>
		<DemoSource>
			<DemoSourceHeader>
				{/** @ts-ignore */}
				<UnwrappedButton onClick={onHideAllClicked}
				                 ink={ButtonInk.PRIMARY}
				                 fill={activeSource === ActiveSource.NONE ? ButtonFill.FILL : ButtonFill.PLAIN}>
					Hide
				</UnwrappedButton>
				{/** @ts-ignore */}
				<UnwrappedButton onClick={onMarkdownClicked}
				                 ink={ButtonInk.PRIMARY}
				                 fill={activeSource === ActiveSource.MARKDOWN ? ButtonFill.FILL : ButtonFill.PLAIN}>
					Markdown
				</UnwrappedButton>
				{/** @ts-ignore */}
				<UnwrappedButton onClick={onJsonClicked}
				                 ink={ButtonInk.PRIMARY}
				                 fill={activeSource === ActiveSource.JSON ? ButtonFill.FILL : ButtonFill.PLAIN}>
					JSON
				</UnwrappedButton>
				<UnwrappedButton onClick={onJsonDataRefreshClicked}
				                 ink={ButtonInk.INFO}
				                 disabled={activeSource !== ActiveSource.JSON}
				                 fill={ButtonFill.PLAIN}>
					Refresh Data
				</UnwrappedButton>
			</DemoSourceHeader>
			{activeSource === ActiveSource.NONE
				? null
				: <DemoSourceBody data-v-scroll="" data-h-scroll=""
				                  data-avoid-padding={activeSource === ActiveSource.JSON}>
					{activeSource === ActiveSource.MARKDOWN ? <MarkdownContainer contents={markdown}/> : null}
					{activeSource === ActiveSource.JSON
						? <UnwrappedTsEditor value={'const data = ' + JSON.stringify(json, null, '\t')}
						                     onValueChange={VUtils.noop}/>
						: null}
				</DemoSourceBody>}
		</DemoSource>
	</DemoContainer>;
};
