import {VUtils} from '@rainbow-d9/n1';
import {ButtonFill, ButtonInk, CssVars, UnwrappedButton, UnwrappedSection} from '@rainbow-d9/n2';
import {Fragment, useState} from 'react';
import Markdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {materialDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';
import {N2ArrayPanel, N2ArrayPanelData, N2ArrayPanelMarkdown} from './n2-array-panel';
import {N2BasicWidgets, N2BasicWidgetsData, N2BasicWidgetsMarkdown} from './n2-basic-widgets';
import {N2Buttons, N2ButtonsData, N2ButtonsMarkdown} from './n2-buttons';
import {N2Intl, N2IntlData, N2IntlMarkdown} from './n2-intl';
import {N2Monitors, N2MonitorsData, N2MonitorsMarkdown} from './n2-monitors';
import {N2Table, N2TableData, N2TableMarkdown} from './n2-table';
import {N2Tabs, N2TabsData, N2TabsMarkdown} from './n2-tabs';
import {N2Tree, N2TreeData, N2TreeMarkdown} from './n2-tree';
import {N2Wizard, N2WizardData, N2WizardMarkdown} from './n2-wizard';
import 'github-markdown-css/github-markdown.css';
import {ThaiPlanSelection, ThaiPlanSelectionData, ThaiPlanSelectionMarkdown} from './thai-plan-selection';

const DemoContainer = styled.div`
    display: grid;
    position: relative;
    grid-template-columns: 300px 1fr;
    grid-template-rows: calc(100vh - ${CssVars.SECTION_HEADER_HEIGHT} - 2px) auto;

    &:not([data-active-source=none]) {
        grid-template-rows: 50vh 50vh;
    }
`;
const DemoMenus = styled.div.attrs({
	'data-v-scroll': '',
	'data-h-scroll': ''
})`
    display: flex;
    position: sticky;
    grid-row: 1 / span 2;
    top: 0;
    flex-direction: column;
    height: 100vh;
    border-right: ${CssVars.BORDER};
    overflow: auto;
`;
const DemoMenuHeader = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    align-items: center;
    padding: 0 calc(${CssVars.SECTION_BODY_PADDING} * 3);
    font-family: ${CssVars.FONT_FAMILY};
    font-size: calc(${CssVars.FONT_SIZE} * 1.4);
    font-weight: ${CssVars.FONT_BOLD};
    color: ${CssVars.INVERT_COLOR};
    background-color: ${CssVars.PRIMARY_COLOR};
    min-height: calc(${CssVars.INPUT_HEIGHT} * 1.6);
    border-bottom: ${CssVars.BORDER};
    border-bottom-width: 2px;
    z-index: 1;
`;
const DemoMenu = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    padding: 0 calc(${CssVars.SECTION_BODY_PADDING} * 3);
    font-family: ${CssVars.FONT_FAMILY};
    font-size: calc(${CssVars.FONT_SIZE} * 1.2);
    color: ${CssVars.FONT_COLOR};
    min-height: calc(${CssVars.INPUT_HEIGHT} * 1.4);
    border-bottom: ${CssVars.BORDER};
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &[data-active=true] {
        &:before {
            content: '>>';
            display: block;
            position: relative;
            margin-right: 8px;
        }

        &:after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background-color: ${CssVars.PRIMARY_COLOR};
            opacity: 0.1;
        }
    }

    &:hover {
        color: ${CssVars.PRIMARY_COLOR};
        background-color: ${CssVars.HOVER_COLOR};
        text-decoration: underline;
    }
`;
const DemoPlayground = styled.div`
    display: block;
    position: relative;
    overflow: auto;
    padding: 0 calc(${CssVars.SECTION_BODY_PADDING} * 2);
    min-height: 50vh;
`;
const DemoSource = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    border-top: ${CssVars.BORDER};
    border-top-width: 2px;
`;
const DemoSourceHeader = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    padding: 0 calc(${CssVars.SECTION_BODY_PADDING} * 2);
    min-height: ${CssVars.SECTION_HEADER_HEIGHT};
    border-bottom: ${CssVars.BORDER};

    > button:not(:first-child) {
        margin-left: 8px;
    }
`;
const DemoSourceBody = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    row-gap: 16px;
    overflow: auto;
    padding: calc(${CssVars.SECTION_BODY_PADDING} * 2);

    > div[data-w=d9-section] > div[data-w=d9-section-body] {
        display: flex;
        flex-direction: column;
    }
`;
const MarkdownTitle = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    color: ${CssVars.PRIMARY_COLOR};
    font-size: 1.6em;
    font-weight: bold;
`;

enum ActiveSource {
	NONE = 'none',
	MARKDOWN = 'markdown',
	JSON = 'json'
}

const MarkdownContainer = (props: {
	contents: string | object | Array<{ title: string, content: string | object }>
}) => {
	const {contents} = props;

	let markdowns = [{title: '', markdown: ''}];
	if (typeof contents === 'string') {
		markdowns = [{title: '', markdown: contents}];
	} else if (Array.isArray(contents)) {
		markdowns = contents.map(({title, content}) => {
			return {
				title,
				markdown: typeof content === 'string' ? content : '```json\n' + JSON.stringify(content, null, 4) + '\n```'
			};
		});
	} else {
		markdowns = [{title: '', markdown: '```json\n' + JSON.stringify(contents, null, 4) + '\n```'}];
	}

	return <>
		{markdowns.map(({title, markdown}) => {
			// @ts-ignore
			return <UnwrappedSection title={VUtils.isNotBlank(title) ? <MarkdownTitle>{title}</MarkdownTitle> : null}
			                         collapsible={true}
			                         key={VUtils.generateUniqueId()}>
				<Markdown className="markdown-body" remarkPlugins={[remarkGfm]} components={{
					code(props) {
						const {children, className, node, ...rest} = props;
						const match = /language-(\w+)/.exec(className || '');
						return match
							// @ts-ignore
							? <SyntaxHighlighter
								{...rest}
								PreTag="div"
								children={String(children).replace(/\n$/, '')}
								language={match[1]}
								style={materialDark}
							/>
							: <code {...rest} className={className}>
								{children}
							</code>;
					}
				}}>
					{markdown}
				</Markdown>
			</UnwrappedSection>;
		})}
	</>;
};
export const DemoIndex = () => {
	const [pathname, setPathname] = useState(localStorage.getItem('PATH') || '/n2-basic-widgets');

	const [activeSource, setActiveSource] = useState<ActiveSource>(ActiveSource.NONE);

	const onMenuClicked = (pathname: string) => () => {
		localStorage.setItem('PATH', pathname);
		setPathname(pathname);
	};
	const onHideAllClicked = () => setActiveSource(ActiveSource.NONE);
	const onMarkdownClicked = () => setActiveSource(ActiveSource.MARKDOWN);
	const onJsonClicked = () => setActiveSource(ActiveSource.JSON);

	const route = {[pathname]: true};

	const demos = [
		{
			path: '/n2-basic-widgets', label: '1. N2 Basic Widgets',
			C: N2BasicWidgets, data: N2BasicWidgetsData, markdown: N2BasicWidgetsMarkdown
		},
		{path: '/n2-buttons', label: '2. N2 Buttons', C: N2Buttons, data: N2ButtonsData, markdown: N2ButtonsMarkdown},
		{path: '/n2-table', label: '3. N2 Table', C: N2Table, data: N2TableData, markdown: N2TableMarkdown},
		{
			path: '/n2-array-panel', label: '4. N2 Array Panel',
			C: N2ArrayPanel, data: N2ArrayPanelData, markdown: N2ArrayPanelMarkdown
		},
		{path: '/n2-tabs', label: '5. N2 Tabs', C: N2Tabs, data: N2TabsData, markdown: N2TabsMarkdown},
		{path: '/n2-wizard', label: '6. N2 Wizard', C: N2Wizard, data: N2WizardData, markdown: N2WizardMarkdown},
		{
			path: '/n2-monitors', label: '7. N2 Monitors',
			C: N2Monitors, data: N2MonitorsData, markdown: N2MonitorsMarkdown
		},
		{path: '/n2-intl', label: '8. N2 Internationalization', C: N2Intl, data: N2IntlData, markdown: N2IntlMarkdown},
		{path: '/n2-tree', label: '9. N2 Tree', C: N2Tree, data: N2TreeData, markdown: N2TreeMarkdown},
		{
			path: '/thai-plan-selection', label: '100. ThaiCloud Plan Selection',
			C: ThaiPlanSelection, data: ThaiPlanSelectionData, markdown: ThaiPlanSelectionMarkdown
		}
	];

	const C = demos.find(demo => demo.path === pathname)?.C ?? Fragment;
	const markdown = demos.find(demo => demo.path === pathname)?.markdown ?? '';
	const json = demos.find(demo => demo.path === pathname)?.data ?? {};

	return <DemoContainer data-w="d9-demo" data-active-source={activeSource}>
		<DemoMenus>
			<DemoMenuHeader>Demo List</DemoMenuHeader>
			{demos.map(demo => {
				return <DemoMenu key={demo.path} data-active={route[demo.path]} onClick={onMenuClicked(demo.path)}>
					{demo.label}
				</DemoMenu>;
			})}
		</DemoMenus>
		<DemoPlayground data-v-scroll="" data-h-scroll="">
			<C/>
		</DemoPlayground>
		<DemoSource>
			<DemoSourceHeader>
				{/** @ts-ignore */}
				<UnwrappedButton onClick={onHideAllClicked}
				                 ink={ButtonInk.PRIMARY}
				                 fill={activeSource === ActiveSource.NONE ? ButtonFill.FILL : ButtonFill.PLAIN}>
					Hide All
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
			</DemoSourceHeader>
			{activeSource === ActiveSource.NONE
				? null
				: <DemoSourceBody data-v-scroll="" data-h-scroll="">
					{activeSource === ActiveSource.MARKDOWN ? <MarkdownContainer contents={markdown}/> : null}
					{activeSource === ActiveSource.JSON ? <MarkdownContainer contents={json}/> : null}
				</DemoSourceBody>}
		</DemoSource>
	</DemoContainer>;
};
