import dom2image from 'dom-to-image';
import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import {DEFAULTS} from '../constants';
import {FileDefSerializer} from '../definition';
import {
	CollapseToc,
	DownloadFile,
	DownloadImage,
	ExpandToc,
	FitCanvas,
	FoldAllNodes,
	Max,
	Min,
	OriginSize,
	UnfoldAllNodes,
	UploadFile,
	Window,
	Zen,
	ZoomIn,
	ZoomOut
} from '../icons';
import {PlaygroundEventTypes, usePlaygroundEventBus} from '../playground-event-bus';
import {cloneDiagramNodes} from './diagram-utils';
import {EditorKernelRefState} from './painter';
import {ToolbarTocWrapper} from './toolbar-toc';
import {EditorToolbar, EditorToolbarButton, EditorToolbarToc, EditorToolbarTocButton} from './widgets';

export interface ToolbarProps {
	stateRef: MutableRefObject<EditorKernelRefState>;
	serializer: FileDefSerializer;
	allowUploadFile: boolean;
	allowDownloadFile: boolean;
	allowDownloadImage: boolean;
	maxMode: boolean;
	zenMode: boolean;
}

export interface ToolbarState {
	max: boolean;
	zen: boolean;
	tocExpanded: boolean;
}

export const Toolbar = (props: ToolbarProps) => {
	const {
		stateRef, serializer,
		allowUploadFile, allowDownloadFile, allowDownloadImage, maxMode, zenMode
	} = props;

	const ref = useRef<HTMLDivElement>(null);
	const {fire} = usePlaygroundEventBus();
	const [state, setState] = useState<ToolbarState>({max: false, zen: false, tocExpanded: false});
	useEffect(() => {
		const onFullScreenChanged = () => {
			if (document.fullscreenElement == null) {
				setState(state => ({...state, zen: false, max: false}));
			}
		};
		window.addEventListener('fullscreenchange', onFullScreenChanged);
		return () => {
			window.removeEventListener('fullscreenchange', onFullScreenChanged);
		};
	}, []);
	useEffect(() => {
		const wrapper = ref.current.parentElement as HTMLDivElement;
		switch (true) {
			case state.zen:
				wrapper.setAttribute('data-diagram-work-mode', 'zen');
				document.documentElement.requestFullscreen && document.documentElement.requestFullscreen({navigationUI: 'hide'});
				break;
			case state.max:
				wrapper.setAttribute('data-diagram-work-mode', 'max');
				break;
			case !state.max:
				wrapper.removeAttribute('data-diagram-work-mode');
				if (document.fullscreenElement != null) {
					document.exitFullscreen && document.exitFullscreen();
				}
				break;
		}
	}, [state.max, state.zen]);
	const onZoomInClicked = () => {
		fire(PlaygroundEventTypes.ZOOM_TO, (stateRef.current.canvasZoom ?? 1) + 0.05);
	};
	const onZoomOutClicked = () => {
		fire(PlaygroundEventTypes.ZOOM_TO, Math.max(stateRef.current.canvasZoom ?? 1, 0.1) - 0.05);
	};
	const onOriginSizeClicked = () => {
		fire(PlaygroundEventTypes.ZOOM_TO, 1);
	};
	const onFitCanvasClicked = () => {
		fire(PlaygroundEventTypes.ZOOM_TO_FIT);
	};
	const onDownloadImageClicked = async () => {
		const backendModel = stateRef.current.engineBackend.getModel();
		stateRef.current.engineBackend.setModel(cloneDiagramNodes(stateRef.current.engine!.getModel()));
		await stateRef.current.engineBackend.repaintCanvas(true);
		const node = ref.current.parentElement.querySelector('div.o23-playground-editor-content-backend') as HTMLDivElement;
		const {width, height} = Array.from(node.lastElementChild.children).reduce(({width, height}, child) => {
			const {width: childWidth, height: childHeight} = child.getBoundingClientRect();
			return {
				width: Math.max(width, childWidth + parseInt((child as HTMLDivElement).style.left)),
				height: Math.max(height, childHeight + parseInt((child as HTMLDivElement).style.top))
			};
		}, {width: 0, height: 0});
		node.style.width = `${width + DEFAULTS.diagram.startLeft}px`;
		node.style.height = `${height + DEFAULTS.diagram.startTop}px`;
		// node.style.overflow = 'visible';
		// const svgNode = node.querySelector('svg');
		// const transform = svgNode.style.transform;
		// const divNode = node.querySelector('div');
		// svgNode.style.transform = '';
		// divNode.style.transform = '';
		// noinspection SpellCheckingInspection
		const dataUrl = await dom2image.toPng(node, {quality: 1, bgcolor: 'transparent'});
		// svgNode.style.transform = transform;
		// divNode.style.transform = transform;
		// node.style.overflow = '';
		const link = document.createElement('a');
		link.download = `${stateRef.current.def?.code || 'no-code'}-diagram.png`;
		link.href = dataUrl;
		link.click();
		node.style.width = '';
		node.style.height = '';
		stateRef.current.engineBackend.setModel(backendModel);
	};
	const onDownloadFileClicked = async () => {
		const link = document.createElement('a');
		link.download = `${stateRef.current.def?.code || 'no-code'}-config.${serializer.extname()}`;
		link.href = 'data:text/plain;charset=UTF-8,' + encodeURIComponent(serializer.stringify(stateRef.current.def));
		link.click();
	};
	const onUploadFileClicked = async () => {
		const file = document.createElement('input');
		file.setAttribute('type', 'file');
		file.setAttribute('accept', '.yml,.yaml');
		file.setAttribute('multiple', 'false');
		file.addEventListener('change', () => {
			if (file.files.length == 1) {
				const reader = new FileReader();
				reader.onload = () => {
					const content = reader.result as string;
					fire(PlaygroundEventTypes.RESET_CONTENT, content);
				};
				reader.readAsText(file.files[0]);
			}
		});
		file.click();
	};
	const onMaxClicked = () => setState(state => ({...state, max: true}));
	const onMinClicked = () => setState(state => ({...state, max: false}));
	const onZenClicked = () => setState(state => ({...state, zen: true, max: true}));
	const onWindowClicked = () => {
		document.exitFullscreen && document.exitFullscreen();
		setState(state => ({...state, zen: false, max: false}));
	};
	const onFoldAllNodesClicked = () => fire(PlaygroundEventTypes.FOLD_ALL_NODES);
	const onUnfoldAllNodesClicked = () => fire(PlaygroundEventTypes.UNFOLD_ALL_NODES);
	const onSwitchToc = (expanded: boolean) => () => setState(state => ({...state, tocExpanded: expanded}));

	const columns = 11 - ((!zenMode || state.zen) ? 1 : 0) - ((!maxMode) ? 1 : 0)
		- ((!allowDownloadFile) ? 1 : 0) - ((!allowDownloadImage) ? 1 : 0) - ((!allowUploadFile) ? 1 : 0);
	return <>
		<EditorToolbar columns={columns} data-toc-expanded={state.tocExpanded} ref={ref}>
			<EditorToolbarButton onClick={onZoomInClicked}><ZoomIn/></EditorToolbarButton>
			<EditorToolbarButton onClick={onZoomOutClicked}><ZoomOut/></EditorToolbarButton>
			<EditorToolbarButton onClick={onOriginSizeClicked}><OriginSize/></EditorToolbarButton>
			<EditorToolbarButton onClick={onFitCanvasClicked}><FitCanvas/></EditorToolbarButton>
			<EditorToolbarButton onClick={onFoldAllNodesClicked}><FoldAllNodes/></EditorToolbarButton>
			<EditorToolbarButton onClick={onUnfoldAllNodesClicked}><UnfoldAllNodes/></EditorToolbarButton>
			{allowDownloadImage
				? <EditorToolbarButton onClick={onDownloadImageClicked}><DownloadImage/></EditorToolbarButton> : null}
			{allowDownloadFile
				? <EditorToolbarButton onClick={onDownloadFileClicked}><DownloadFile/></EditorToolbarButton> : null}
			{allowUploadFile
				? <EditorToolbarButton onClick={onUploadFileClicked}><UploadFile/></EditorToolbarButton> : null}
			{maxMode
				? (state.max ? null : <EditorToolbarButton onClick={onMaxClicked}><Max/></EditorToolbarButton>)
				: null}
			{maxMode
				? ((state.max && !state.zen) ?
					<EditorToolbarButton onClick={onMinClicked}><Min/></EditorToolbarButton> : null)
				: null}
			{zenMode
				? (state.zen ? null : <EditorToolbarButton onClick={onZenClicked}><Zen/></EditorToolbarButton>)
				: null}
			{zenMode
				? (state.zen ? <EditorToolbarButton onClick={onWindowClicked}><Window/></EditorToolbarButton> : null)
				: null}
			<EditorToolbarToc>
				{state.tocExpanded
					? <EditorToolbarTocButton onClick={onSwitchToc(false)}><CollapseToc/></EditorToolbarTocButton>
					: <EditorToolbarTocButton onClick={onSwitchToc(true)}><ExpandToc/></EditorToolbarTocButton>}
			</EditorToolbarToc>
		</EditorToolbar>
		<ToolbarTocWrapper expanded={state.tocExpanded} buttons={columns} stateRef={stateRef}/>
	</>;
};
