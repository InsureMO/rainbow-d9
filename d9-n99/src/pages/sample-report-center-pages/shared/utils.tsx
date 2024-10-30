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

    > span[data-role=ancestor]:not(:last-child) {
        display: none;

        &:after {
            content: '/';
            display: inline-block;
            position: relative;
            margin: 0 2px 0 4px;
        }
    }
`;
const asTreeOptionLabel = (icon: ReactNode) => {
	return (label: string | ReactNode, ancestors: Array<DropdownTreeOption>) => {
		if (typeof label === 'string') {
			return <IconTreeNodeLabel leads={[icon]}>
				{ancestors.map((ancestor, index) => {
					return <span data-role="ancestor" key={index}>{ancestor.stringify?.(ancestor) ?? (void 0)}</span>;
				})}
				<span>{label}</span>
			</IconTreeNodeLabel>;
		} else {
			return label;
		}
	};
};
export const createReportTreeOptions = (options: DropdownTreeOptions, stackValue: boolean = false) => {
	const redressOption = (option: DropdownTreeOption, ancestors: Array<DropdownTreeOption> = []) => {
		if (typeof option.label === 'string') {
			const label = option.label;
			option.stringify = () => label;
		}
		if (stackValue && ancestors.length !== 0) {
			option.value = ancestors[ancestors.length - 1].value + '\t' + option.value;
		}
		if (option.children != null) {
			option.label = asTreeOptionLabel(<ReportFolderIcon/>)(option.label, ancestors);
			option.children.forEach(child => redressOption(child, [...ancestors, option]));
		} else {
			option.label = asTreeOptionLabel(<ReportFileIcon/>)(option.label, ancestors);
			option.value = option.value + '\nreport';
		}
	};
	options.forEach(option => redressOption(option));
	return options;
};