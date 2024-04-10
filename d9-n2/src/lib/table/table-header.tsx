import {NUtils, Undefinable} from '@rainbow-d9/n1';
import React, {useState} from 'react';
import {toIntlLabel} from '../intl-label';
import {TableProps} from './types';
import {ATableHeaderCell} from './widgets';
import {SortAscendingIcon, SortDescendingIcon, UnSortIcon} from "../icons";
import styled from 'styled-components';
import {CssVars} from "../constants";
import {SortableColumn} from "./table-content";

export enum SortDirection {
    ASC = 'asc',
    DESC = 'desc',
    NONE = 'none'
}

export interface TableHeaderProps {
    headers: TableProps['headers'];
    headerHeight: TableProps['headerHeight'];
    stickyOffsets: Array<[boolean, Undefinable<string>, Undefinable<string>]>;
    tailGrabberAppended: boolean;
    sortStates: Array<SortableColumn>;
    updateSortState: (headerKey: number, newState: SortDirection) => void;
}

const SortableIconWrapper = styled.div<{ isHovered: boolean; hasIcon: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 8px;

  .sortable-icon {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0.3s, opacity 0.3s; // 添加过渡效果  
  }

  ${({isHovered, hasIcon}) =>
          (isHovered || hasIcon)
                  ? `  
        .sortable-icon {  
          visibility: visible;  
          opacity: 0.4;  
        }  
      `
                  : ''}
`;

const SortableIcon = ({sortDirection}) => {
    const IconComponent = sortDirection == SortDirection.ASC ? SortAscendingIcon : sortDirection === SortDirection.DESC ? SortDescendingIcon : UnSortIcon;
    const IconColor = IconComponent !== UnSortIcon ? CssVars.PRIMARY_COLOR : CssVars.FONT_COLOR;
    return (
        <IconComponent className="sortable-icon" fill={IconColor} height={'14px'}/>
    );
};


export const TableHeader = (props: TableHeaderProps) => {
    const {
        headers, headerHeight,
        stickyOffsets, tailGrabberAppended, sortStates, updateSortState
    } = props;

    const [hoveredHeaderKey, setHoveredHeaderKey] = useState(null);
    const handleHeaderMouseEnter = (key) => {
        setHoveredHeaderKey(key);
    };
    const handleHeaderMouseLeave = () => {
        setHoveredHeaderKey(null);
    };

    return <>
        <ATableHeaderCell headerHeight={headerHeight} isGrabber={true} stickyOffset={stickyOffsets[0]}/>
        {headers.map((header, index) => {
            const key = NUtils.getDefKey(header);

            const sortDirection = sortStates[index].direction;
            const shouldShowIcon = (sortDirection == SortDirection.ASC || sortDirection == SortDirection.DESC);

            return <ATableHeaderCell headerHeight={headerHeight} stickyOffset={stickyOffsets[index + 1]} key={key}
                                     onMouseEnter={() => handleHeaderMouseEnter(key)}
                                     onMouseLeave={handleHeaderMouseLeave}>
                {toIntlLabel(header.label)}

                <SortableIconWrapper isHovered={hoveredHeaderKey === key}
                                     hasIcon={shouldShowIcon}
                                     onClick={() => updateSortState(index, sortDirection)}>
                    <SortableIcon
                        sortDirection={sortDirection}
                    />
                </SortableIconWrapper>
            </ATableHeaderCell>
                ;

        })}

        {
            tailGrabberAppended
                ? <ATableHeaderCell headerHeight={headerHeight} isGrabber={true}
                                    stickyOffset={stickyOffsets[stickyOffsets.length - 2]}/>
                : null
        }
        <ATableHeaderCell headerHeight={headerHeight} isGrabber={true}
                          stickyOffset={stickyOffsets[stickyOffsets.length - 1]}/>
    </>
        ;
};
