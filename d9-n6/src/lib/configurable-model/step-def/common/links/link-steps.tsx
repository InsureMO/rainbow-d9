import {BezierCurve, Point} from '@projectstorm/geometry';
import {GenerateModelEvent, GenerateWidgetEvent} from '@projectstorm/react-canvas-core';
import {
	DefaultLinkFactory,
	DefaultLinkModel,
	DefaultLinkPointWidget,
	DefaultLinkSegmentWidget,
	LinkWidget,
	PointModel
} from '@projectstorm/react-diagrams';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import React, {createRef, MouseEvent, RefObject, useEffect, useRef, useState} from 'react';
import styled, {keyframes} from 'styled-components';

export class StepsLinkModel extends DefaultLinkModel {
	public static readonly TYPE = 'steps-link';

	public constructor() {
		super({type: StepsLinkModel.TYPE});
	}

	public getSVGPath(): string {
		if (this.points.length == 2) {
			const curve = new BezierCurve();
			curve.setSource(this.getFirstPoint().getPosition());
			curve.setTarget(this.getLastPoint().getPosition());
			curve.setSourceControl(new Point(this.getFirstPoint().getX() + (this.getLastPoint().getX() - this.getFirstPoint().getX()) / 2, this.getFirstPoint().getY()));
			curve.setTargetControl(new Point(this.getFirstPoint().getX() + (this.getLastPoint().getX() - this.getFirstPoint().getX()) / 2, this.getLastPoint().getY()));

			if (this.sourcePort) {
				curve.getSourceControl().translate(...this.calculateControlOffset(this.getSourcePort()));
			}

			if (this.targetPort) {
				curve.getTargetControl().translate(...this.calculateControlOffset(this.getTargetPort()));
			}
			return curve.getSVGCurve();
		}
	}
}

export interface StepsLinkProps {
	link: StepsLinkModel;
	diagramEngine: DiagramEngine;
	renderPoints?: boolean;
	selected?: (event: MouseEvent) => void;
}

export const StepsLinkWidget = (props: StepsLinkProps) => {
	const [selected, setSelected] = useState(false);
	const refPaths = useRef<RefObject<SVGPathElement>[]>([]);

	const renderPoints = () => {
		return props.renderPoints ?? true;
	};

	useEffect(() => {
		props.link.setRenderedPaths(refPaths.current.map((ref) => ref.current).filter(Boolean) as SVGPathElement[]);
		return () => {
			props.link.setRenderedPaths([]);
		};
	}, [props.link]);

	const generateRef = () => {
		const ref = createRef<SVGPathElement>();
		refPaths.current.push(ref);
		return ref;
	};

	const addPointToLink = (event: MouseEvent, index: number) => {
		if (!event.shiftKey &&
			!props.link.isLocked() &&
			props.link.getPoints().length - 1 <= props.diagramEngine.getMaxNumberPointsPerLink()) {
			const position = props.diagramEngine.getRelativeMousePoint(event);
			const point = props.link.point(position.x, position.y, index);
			event.persist();
			event.stopPropagation();
			props.diagramEngine.getActionEventBus().fireAction({event, model: point});
		}
	};
	const generatePoint = (point: PointModel): JSX.Element => {
		return <DefaultLinkPointWidget key={point.getID()} point={point}
		                               colorSelected={props.link.getOptions().selectedColor ?? ''}
		                               color={props.link.getOptions().color}/>;
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const generateLink = (path: string, extraProps: any, id: string | number): JSX.Element => {
		return <DefaultLinkSegmentWidget key={`link-${id}`} path={path} selected={selected}
		                                 diagramEngine={props.diagramEngine}
		                                 factory={props.diagramEngine.getFactoryForLink(props.link)}
		                                 link={props.link} forwardRef={generateRef()}
		                                 onSelection={setSelected} extras={extraProps}/>;
	};

	const points = props.link.getPoints();
	const paths = [];
	refPaths.current = []; // Reset the refPaths for the current render

	if (points.length === 2) {
		paths.push(generateLink(props.link.getSVGPath(), {
			onMouseDown: (event: MouseEvent) => {
				props.selected?.(event);
				addPointToLink(event, 1);
			}
		}, '0'));

		if (props.link.getTargetPort() == null) {
			paths.push(generatePoint(points[1]));
		}
	} else {
		for (let j = 0; j < points.length - 1; j++) {
			paths.push(generateLink(LinkWidget.generateLinePath(points[j], points[j + 1]), {
				'data-linkid': props.link.getID(),
				'data-point': j,
				onMouseDown: (event: MouseEvent) => {
					props.selected?.(event);
					addPointToLink(event, j + 1);
				}
			}, j));
		}

		if (renderPoints()) {
			for (let i = 1; i < points.length - 1; i++) {
				paths.push(generatePoint(points[i]));
			}

			if (props.link.getTargetPort() == null) {
				paths.push(generatePoint(points[points.length - 1]));
			}
		}
	}

	return <g data-default-link-test={props.link.getOptions().testName}>
		{paths}
	</g>;
};

export const LinkSelectionKeyFrames = keyframes`
    from {
        stroke-dashoffset: 24;
    }
    to {
        stroke-dashoffset: 0;
    }
`;

// noinspection CssUnresolvedCustomProperty
export const LinkSegmentPath = styled.path.attrs<{ selected: boolean }>(
	({selected}) => {
		return {
			[DOM_KEY_WIDGET]: 'o23-playground-link-segment-path',
			style: {
				'--selected-stroke-dasharray': selected ? '10, 2' : (void 0),
				'--selected-animation': selected ? 'running' : 'paused'
			}
		};
	})<{ selected: boolean }>`
    fill: none;
    pointer-events: auto;
    stroke-dasharray: var(--selected-stroke-dasharray);
    animation: ${LinkSelectionKeyFrames} 1s linear infinite;
    animation-play-state: var(--selected-animation);
`;

export class StepsLinkFactory extends DefaultLinkFactory<StepsLinkModel> {
	constructor() {
		super(StepsLinkModel.TYPE);
	}

	public generateReactWidget(event: GenerateWidgetEvent<StepsLinkModel>): JSX.Element {
		return <StepsLinkWidget link={event.model} diagramEngine={this.engine}/>;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public generateModel(_event: GenerateModelEvent): StepsLinkModel {
		return new StepsLinkModel();
	}

	public generateLinkSegment(model: StepsLinkModel, selected: boolean, path: string) {
		return <LinkSegmentPath
			selected={selected}
			stroke={selected ? model.getOptions().selectedColor : model.getOptions().color}
			strokeWidth={model.getOptions().width}
			d={path}/>;
	}
}
