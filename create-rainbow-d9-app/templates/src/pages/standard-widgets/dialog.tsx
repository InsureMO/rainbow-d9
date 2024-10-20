import {DOM_KEY_WIDGET} from '@rainbow-d9/n2';
import {CSSProperties} from 'react';
import styled from 'styled-components';

export const LargestDialogStyles: CSSProperties = {
	marginTop: 'calc((100vh - var(--app-dialog-largest-height)) / 2 - 2vh)',
	marginLeft: 'calc((100vw - var(--app-dialog-largest-width)) / 2)',
	height: 'var(--app-dialog-largest-height)',
	width: 'var(--app-dialog-largest-width)',
	overflow: 'hidden'
};

// noinspection CssUnresolvedCustomProperty
const LayoutControllerForLastIsTextarea = styled.div.attrs<{ rows: number }>(
	{[DOM_KEY_WIDGET]: 'dialog-layout-controller'}
)<{ rows: number }>`
    display: none;

    + div[data-w=page-standard-wrapper] {
        height: calc(var(--app-dialog-largest-height) - var(--d9-dialog-padding-top) - var(--d9-dialog-padding-bottom) - var(--d9-button-bar-height));
        min-height: calc(var(--app-dialog-largest-height) - var(--d9-dialog-padding-top) - var(--d9-dialog-padding-bottom) - var(--d9-button-bar-height));
        max-height: calc(var(--app-dialog-largest-height) - var(--d9-dialog-padding-top) - var(--d9-dialog-padding-bottom) - var(--d9-button-bar-height));

        > div[data-w=d9-page] {
            height: 100%;

            > div[data-w=d9-section] > div[data-w=d9-section-body] {
                flex-grow: 1;
                grid-template-rows: ${({rows}) => new Array(rows - 1).fill(1).map(() => 'auto').join(' ')} 1fr;
                padding-bottom: 0;

                > div[data-w=d9-form-cell] > textarea {
                    flex-grow: 1;
                    height: unset;
                }
            }
        }
    }
`;
/**
 * input section with last one is textarea
 */
export const LayoutControllerWithLastTextarea = (props: { rows: number }) => {
	return <LayoutControllerForLastIsTextarea rows={props.rows}/>;
};

// noinspection CssUnresolvedCustomProperty
const LayoutControllerForCriteriaAndTable = styled.div.attrs<{ criteriaRows: number }>(
	{[DOM_KEY_WIDGET]: 'dialog-layout-controller'}
)<{ criteriaRows: number }>`
    display: none;

    + div[data-w=page-standard-wrapper] {
        height: calc(var(--app-dialog-largest-height) - var(--d9-dialog-padding-top) - var(--d9-dialog-padding-bottom) - var(--d9-button-bar-height));
        min-height: calc(var(--app-dialog-largest-height) - var(--d9-dialog-padding-top) - var(--d9-dialog-padding-bottom) - var(--d9-button-bar-height));
        max-height: calc(var(--app-dialog-largest-height) - var(--d9-dialog-padding-top) - var(--d9-dialog-padding-bottom) - var(--d9-button-bar-height));

        > div[data-w=d9-page] > div[data-w=d9-table] > div[data-w=d9-table-content] {
            max-height: calc(var(--app-dialog-largest-height)
            - var(--d9-dialog-padding-top)
            - var(--d9-section-header-height)
            - var(--d9-section-body-padding) * 2
            - var(--d9-input-height) * 2 * ${({criteriaRows}) => criteriaRows}
            - var(--d9-form-cell-invalid-message-padding) * 2 * ${({criteriaRows}) => criteriaRows}
            - var(--d9-button-bar-height)
            - var(--app-page-next-to-search-margin)
            - var(--d9-table-footer-height)
            - var(--d9-input-height) - var(--d9-button-bar-padding-tb) * 2
            - var(--d9-dialog-padding-bottom));
        }
    }
`;
/**
 * criteria section with title and search button bar, and result table
 */
export const LayoutControllerWithCriteriaAndTable = (props: { criteriaRows: number }) => {
	return <LayoutControllerForCriteriaAndTable criteriaRows={props.criteriaRows}/>;
};
