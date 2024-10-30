import {DropdownTreeOption, DropdownTreeOptions, UnwrappedCaption} from '@rainbow-d9/n2';
import {ReactNode} from 'react';
import styled from 'styled-components';
import ReportFileIcon from '../../../assets/report-file.svg?react';
import ReportFolderIcon from '../../../assets/report-folder.svg?react';

// noinspection CssUnresolvedCustomProperty
const IconTreeNodeLabel = styled(UnwrappedCaption)`
    color: var(--d9-font-color);

    > span[data-w=d9-deco-lead] {
        margin-left: -9px;
    }
`;
const asFolder = (label: string | ReactNode) => {
	if (typeof label === 'string') {
		return <IconTreeNodeLabel leads={[<ReportFolderIcon/>]}>{label}</IconTreeNodeLabel>;
	} else {
		return label;
	}
};
const asFile = (label: string | ReactNode) => {
	if (typeof label === 'string') {
		return <IconTreeNodeLabel leads={[<ReportFileIcon/>]}>{label}</IconTreeNodeLabel>;
	} else {
		return label;
	}
};
export const createReportTreeOptions = (options: DropdownTreeOptions) => {
	const redressOption = (option: DropdownTreeOption) => {
		if (typeof option.label === 'string') {
			const label = option.label;
			option.stringify = () => label;
		}
		if (option.children != null) {
			option.label = asFolder(option.label);
			option.children.forEach(redressOption);
		} else {
			option.label = asFile(option.label);
		}
	};
	options.forEach(redressOption);
	return options;
};