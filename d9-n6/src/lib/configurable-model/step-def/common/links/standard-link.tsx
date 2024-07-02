import {GenerateWidgetEvent} from '@projectstorm/react-canvas-core';
import {
	DefaultLinkFactory,
	DefaultLinkModel,
	DefaultLinkPointWidget,
	DefaultLinkSegmentWidget,
	LinkWidget,
	PointModel
} from '@projectstorm/react-diagrams';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import React, {createRef, MouseEvent, RefObject, useEffect, useRef, useState} from 'react';
import {PlaygroundCssVars} from '../../../../widgets';
import {StandardLinkSegmentPath} from './standard-link-segment-path';

export interface StandardLinkProps {
	link: DefaultLinkModel;
	engine: DiagramEngine;
	renderPoints?: boolean;
	selected?: (event: MouseEvent) => void;
}

export const StandardLinkWidget = (props: StandardLinkProps) => {
	const {link, engine, renderPoints: shouldRenderPoints, selected: onSelected} = props;

	const [selected, setSelected] = useState(false);
	const refPaths = useRef<RefObject<SVGPathElement>[]>([]);
	useEffect(() => {
		link.setRenderedPaths(refPaths.current.map((ref) => ref.current).filter(Boolean) as SVGPathElement[]);
		return () => {
			link.setRenderedPaths([]);
		};
	}, [link]);

	const renderPoints = () => shouldRenderPoints ?? true;
	const generateRef = () => {
		const ref = createRef<SVGPathElement>();
		refPaths.current.push(ref);
		return ref;
	};
	const addPointToLink = (event: MouseEvent, index: number) => {
		if (!event.shiftKey &&
			!link.isLocked() &&
			link.getPoints().length - 1 <= engine.getMaxNumberPointsPerLink()) {
			const position = engine.getRelativeMousePoint(event);
			const point = link.point(position.x, position.y, index);
			event.persist();
			event.stopPropagation();
			engine.getActionEventBus().fireAction({event, model: point});
		}
	};
	const generatePoint = (point: PointModel): JSX.Element => {
		return <DefaultLinkPointWidget key={point.getID()} point={point}
		                               colorSelected={link.getOptions().selectedColor ?? ''}
		                               color={link.getOptions().color}/>;
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const generateLink = (path: string, extraProps: any, id: string | number): JSX.Element => {
		return <DefaultLinkSegmentWidget key={`link-${id}`} path={path} selected={selected}
		                                 diagramEngine={engine}
		                                 factory={engine.getFactoryForLink(link)}
		                                 link={link} forwardRef={generateRef()}
		                                 onSelection={setSelected} extras={extraProps}/>;
	};

	const points = link.getPoints();
	const paths = [];
	refPaths.current = []; // Reset the refPaths for the current render

	if (points.length === 2) {
		paths.push(generateLink(link.getSVGPath(), {
			onMouseDown: (event: MouseEvent) => {
				onSelected?.(event);
				addPointToLink(event, 1);
			}
		}, '0'));

		if (link.getTargetPort() == null) {
			paths.push(generatePoint(points[1]));
		}
	} else {
		for (let j = 0; j < points.length - 1; j++) {
			paths.push(generateLink(LinkWidget.generateLinePath(points[j], points[j + 1]), {
				'data-linkid': link.getID(),
				'data-point': j,
				onMouseDown: (event: MouseEvent) => {
					onSelected?.(event);
					addPointToLink(event, j + 1);
				}
			}, j));
		}

		if (renderPoints()) {
			for (let i = 1; i < points.length - 1; i++) {
				paths.push(generatePoint(points[i]));
			}

			if (link.getTargetPort() == null) {
				paths.push(generatePoint(points[points.length - 1]));
			}
		}
	}

	// noinspection com.intellij.reactbuddy.ArrayToJSXMapInspection
	return <g data-default-link-test={link.getOptions().testName}>
		{paths}
	</g>;
};

export abstract class StandardLinkFactory<L extends DefaultLinkModel = DefaultLinkModel> extends DefaultLinkFactory<L> {
	protected constructor(type: string) {
		super(type);
	}

	public generateReactWidget(event: GenerateWidgetEvent<L>): JSX.Element {
		return <StandardLinkWidget link={event.model} engine={this.engine}/>;
	}

	public generateLinkSegment(model: L, selected: boolean, path: string): JSX.Element {
		return <StandardLinkSegmentPath
			selected={selected}
			dasharray={this.getLinkSegmentDasharray()}
			selectedDasharray={this.getLinkSegmentSelectedDasharray()}
			stroke={selected ? model.getOptions().selectedColor : model.getOptions().color}
			strokeWidth={model.getOptions().width}
			d={path}/>;
	}

	protected getLinkSegmentDasharray(): string {
		return PlaygroundCssVars.LINK_DEFAULT_STROKE_DASHARRAY;
	}

	protected getLinkSegmentSelectedDasharray(): string {
		return PlaygroundCssVars.LINK_DEFAULT_SELECTED_STROKE_DASHARRAY;
	}
}
