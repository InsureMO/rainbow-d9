import {ContainerDef, ContainerWidgetProps, NodeDef, PPUtils, registerWidget} from '@rainbow-d9/n1';
import React, {ForwardedRef, forwardRef, ReactNode, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {CssVars, DOM_ID_WIDGET, DOM_KEY_WIDGET} from './constants';
import {GlobalEventPrefix, GlobalEventTypes, useCustomGlobalEvent, useGlobalEventBus} from './global';
import {notInMe} from './hooks';
import {ArrowDown} from './icons';
import {LabelLike} from './label-like';
import {ModelCarrier, OmitHTMLProps2, OmitNodeDef} from './types';

/** Section configuration definition */
export type SectionDef = ContainerDef & OmitHTMLProps2<HTMLDivElement, 'title'> & {
	title?: ReactNode | NodeDef;
	collapsible?: boolean;
	collapsed?: boolean;
	/** use on identify itself when event fired */
	marker?: string;
};
/** Section widget definition, with html attributes */
export type SectionProps = OmitNodeDef<SectionDef> & ContainerWidgetProps;

// noinspection CssUnresolvedCustomProperty
const ASection = styled.div.attrs(
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	({id, [DOM_KEY_WIDGET]: dataW}) => {
		return {
			[DOM_KEY_WIDGET]: dataW || 'd9-section',
			[DOM_ID_WIDGET]: id
		};
	})`
    display: flex;
    position: relative;
    flex-direction: column;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);

    &[data-visible=false] {
        display: none;
    }
`;
const ASectionHeader = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-section-header'})`
    display: flex;
    position: relative;
    align-items: center;
    height: ${CssVars.SECTION_HEADER_HEIGHT};
    min-height: ${CssVars.SECTION_HEADER_HEIGHT};
    padding-top: ${CssVars.SECTION_HEADER_OFFSET};
    border-bottom: ${CssVars.SECTION_HEADER_BORDER};

    &[data-expanded=false] {
        cursor: pointer;
    }

    + div[data-w=d9-section-body] {
        padding: ${CssVars.SECTION_BODY_PADDING} 0;
    }
`;
const ASectionTitle = styled.div.attrs({[DOM_KEY_WIDGET]: 'd9-section-header-title'})`
    display: flex;
    position: relative;
    align-items: center;
    flex-grow: 1;
    font-family: ${CssVars.CAPTION_FONT_FAMILY};
    font-size: ${CssVars.SECTION_HEADER_FONT_SIZE};
    font-weight: ${CssVars.SECTION_HEADER_FONT_WEIGHT};
    color: ${CssVars.CAPTION_FONT_COLOR};
`;
const ASectionExpander = styled.div.attrs<{ expanded: boolean }>(
	{[DOM_KEY_WIDGET]: 'd9-section-header-expander'}
)<{ expanded: boolean }>`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    height: calc(${CssVars.SECTION_HEADER_HEIGHT} * 0.6);
    width: calc(${CssVars.SECTION_HEADER_HEIGHT} * 0.6);
    border-radius: ${CssVars.BORDER_RADIUS};
    cursor: pointer;
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &:hover {
        box-shadow: ${CssVars.PRIMARY_SHADOW};
        background-color: ${CssVars.PRIMARY_COLOR};

        > svg {
            fill: ${CssVars.INVERT_COLOR};
            opacity: 1;
        }
    }

    > svg {
        height: calc(${CssVars.SECTION_HEADER_HEIGHT} * 0.3);
        width: calc(${CssVars.SECTION_HEADER_HEIGHT} * 0.3);
        fill: ${CssVars.FONT_COLOR};
        opacity: 0.5;
        transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    }
`;
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const ASectionExpanderSvg = styled(ArrowDown as any).attrs({[DOM_KEY_WIDGET]: 'd9-section-header-expander-svg'})`
    height: 70%;
    color: ${CssVars.FONT_COLOR};
    opacity: 0.7;
    transition: color ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION}, transform ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};

    &[data-expanded=true] {
        transform: rotateX(180deg);
    }
`;
const ASectionBody = styled.div.attrs<{ expanded: boolean }>(({expanded}) => {
	return {
		[DOM_KEY_WIDGET]: 'd9-section-body',
		style: {
			display: expanded ? (void 0) : 'none'
		}
	};
})<{ expanded: boolean }>`
    display: grid;
    position: relative;
    grid-template-columns: repeat(${CssVars.GRID_COLUMNS}, calc((100% - ${CssVars.GRID_COLUMN_GAP} * (${CssVars.GRID_COLUMNS} - 1)) / ${CssVars.GRID_COLUMNS}));
    grid-column-gap: ${CssVars.GRID_COLUMN_GAP};
    grid-row-gap: ${CssVars.GRID_ROW_GAP};
`;

export const Section = forwardRef((props: SectionProps, ref: ForwardedRef<HTMLDivElement>) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {
		$wrapped,
		title, collapsible, collapsed = false, marker,
		children, ...rest
	} = props;
	const {$p2r, $avs: {$disabled, $visible}} = $wrapped;

	const headerRef = useRef<HTMLDivElement>(null);
	const firstRound = useRef(true);
	const customEventCallbackRef = useRef<{ has: boolean; callback?: () => Promise<void> }>({has: false});
	const {on: onGlobal, off: offGlobal} = useGlobalEventBus();
	// collapsible is false or collapsed is false, then expanded is true
	const [expanded, setExpanded] = useState(collapsible !== true || !collapsed);
	const fireCustomEvent = useCustomGlobalEvent();
	useEffect(() => {
		const onCustomEvent = (_: string, prefix: string, clipped: string, _models?: ModelCarrier, callback?: () => Promise<void>) => {
			if (prefix !== GlobalEventPrefix.EXPAND_SECTION && prefix !== GlobalEventPrefix.COLLAPSE_SECTION) {
				return;
			}
			clipped = clipped || '';
			// For a piece of data, it may be divided into multiple sections for display, and these sections may hold the same ID.
			// Therefore, it is not possible to precisely locate a specific section in this case.
			// In such situations, a prefix can be added, and a match can be made using the format $full:marker+ID.
			if (clipped.startsWith('$full:')) {
				if (clipped !== `$full:${marker ?? ''}+${PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id)}`) {
					return;
				}
			} else {
				// still use marker or id to match
				if (clipped !== marker && clipped !== PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id)) {
					return;
				}
			}
			if (prefix === GlobalEventPrefix.EXPAND_SECTION) {
				if (!expanded) {
					customEventCallbackRef.current.has = true;
					customEventCallbackRef.current.callback = callback;
					setExpanded(true);
				} else {
					// noinspection JSIgnoredPromiseFromCall
					callback?.();
				}
			} else {
				if (expanded) {
					customEventCallbackRef.current.has = true;
					customEventCallbackRef.current.callback = callback;
					setExpanded(false);
				} else {
					// noinspection JSIgnoredPromiseFromCall
					callback?.();
				}
			}
		};
		onGlobal && onGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		return () => {
			offGlobal && offGlobal(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		};
	}, [onGlobal, offGlobal, expanded, marker, $p2r, props.$pp, props.id]);
	useEffect(() => {
		if (firstRound.current) {
			firstRound.current = false;
			return;
		}
		if (customEventCallbackRef.current.has) {
			customEventCallbackRef.current.has = false;
			// noinspection JSIgnoredPromiseFromCall
			customEventCallbackRef.current.callback?.();
			delete customEventCallbackRef.current.callback;
		}
		const prefix = expanded ? GlobalEventPrefix.SECTION_EXPANDED : GlobalEventPrefix.SECTION_COLLAPSED;
		const key = `${prefix}:${marker ?? ''}`;
		// noinspection JSIgnoredPromiseFromCall
		fireCustomEvent(key, prefix, marker ?? '', {root: $wrapped.$root, model: $wrapped.$model});
	}, [onGlobal, offGlobal, fireCustomEvent, expanded, marker, $wrapped.$root, $wrapped.$model]);

	const onExpandClicked = () => {
		setExpanded(!expanded);
	};
	const onHeaderClicked = () => {
		if (!expanded && headerRef.current != null) {
			const focused = document.activeElement;
			if (focused == null || notInMe(headerRef.current, focused)) {
				setExpanded(true);
			}
		}
	};

	return <ASection {...rest} data-disabled={$disabled} data-visible={$visible}
	                 id={PPUtils.asId(PPUtils.absolute($p2r, props.$pp), props.id)}
	                 ref={ref}>
		{title != null
			? <ASectionHeader data-expanded={expanded} onClick={onHeaderClicked} ref={headerRef}>
				<ASectionTitle>
					<LabelLike label={title} $wrapped={$wrapped} $validationScopes={props}/>
				</ASectionTitle>
				{collapsible
					? <ASectionExpander expanded={expanded} onClick={onExpandClicked}>
						<ASectionExpanderSvg data-expanded={expanded}/>
					</ASectionExpander>
					: null}
			</ASectionHeader>
			: null}
		<ASectionBody expanded={expanded}>
			{children}
		</ASectionBody>
	</ASection>;
});

registerWidget({key: 'Section', JSX: Section, container: true, array: false});
