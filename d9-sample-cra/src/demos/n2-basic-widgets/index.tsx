import {StandaloneRoot} from '@rainbow-d9/n1';
import {
	CssVars,
	DropdownOptions,
	Global,
	GlobalEventHandlers,
	GlobalRoot,
	ModelCarrier,
	OptionItems
} from '@rainbow-d9/n2';
import {KeyboardEvent} from 'react';
import styled from 'styled-components';
import {CustomEventHandler} from '../custom-event-handler';
import {N2DemoDialogHandler} from '../n2-dialog-handler';
import {useDemoMarkdown} from '../use-demo-markdown';
import DemoData from './demo.json';
import {markdown as DemoContent} from './demo.md';

const StyleController = styled.div.attrs({})`
    + div[data-w=d9-page] {
        div[data-w=d9-calendar][data-calendar-hide-shortcuts] {
            div[data-w=d9-calendar-date-picker] {
                grid-template-columns: 1fr;

                > div[data-w=d9-calendar-date-picker-shortcuts] {
                    display: none;
                }
            }
        }

        div[data-w=d9-radios][data-as-toggle-button] {
            > span[data-w=d9-radios-option] {
                border: ${CssVars.BORDER};
                border-radius: ${CssVars.BORDER_RADIUS};
                margin-left: 0;
                margin-right: 0;
                transition: color 0.3s, border-color 0.3s, background-color 0.3s, box-shadow 0.3s;

                &:not(:first-child) {
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                    margin-left: -1px;
                }

                &:not(:last-child) {
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                }

                &:hover {
                    box-shadow: ${CssVars.HOVER_SHADOW};
                }

                &[data-checked=true] {
                    color: ${CssVars.INVERT_COLOR};
                    border-color: ${CssVars.PRIMARY_COLOR};
                    background-color: ${CssVars.PRIMARY_COLOR};

                    &:hover {
                        box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
                    }
                }

                > div[data-w=d9-radio] {
                    display: none;
                }
            }
        }

        div[data-w=d9-checkboxes][data-as-toggle-button] {
            > span[data-w=d9-checkboxes-option] {
                border: ${CssVars.BORDER};
                border-radius: ${CssVars.BORDER_RADIUS};
                margin-left: 0;
                margin-right: 8px;
                transition: color 0.3s, border-color 0.3s, background-color 0.3s, box-shadow 0.3s;

                &:hover {
                    box-shadow: ${CssVars.HOVER_SHADOW};
                }

                &[data-checked=true] {
                    color: ${CssVars.INVERT_COLOR};
                    border-color: ${CssVars.PRIMARY_COLOR};
                    background-color: ${CssVars.PRIMARY_COLOR};

                    &:hover {
                        box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
                    }
                }

                > div[data-w=d9-checkbox] {
                    display: none;
                }
            }
        }
    }
`;
export const N2BasicWidgets = () => {
	const def = useDemoMarkdown(DemoContent);
	const dropdown3Options = [
		{value: '100', label: 'John Doe'}
	];
	const externalDefs = {
		deco: {
			numericFormat: {
				thousandsSeparator: ',',
				radix: '.',
				normalizeZeros: false,
				padFractionalZeros: true,
				scale: 2
			}
		},
		tip: {
			numeric2: {body: <Global.TipLabel>Numeric input #2.<br/>Tips line #2.</Global.TipLabel>}
		},
		keydown: {
			numeric: (event: KeyboardEvent<HTMLInputElement>) => {
				console.log(`Key event[key=${event.key}, code=${event.code}] capture.`);
				if (event.key.length === 1 && !['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(event.key)) {
					event.preventDefault();
					return false;
				}
			}
		},
		dropdown2: async (_options: ModelCarrier & GlobalEventHandlers): Promise<OptionItems<string>> => {
			return [
				{value: '1', label: 'Option #1'},
				{value: '2', label: 'Option #2'},
				{value: '3', label: 'Option #3'},
				{value: '4', label: 'Option #4'},
				{value: '5', label: 'Option #5'},
				{value: '6', label: 'Option #6'},
				{value: '7', label: 'Option #7'},
				{value: '8', label: 'Option #8'},
				{value: '9', label: 'Option #9'},
				{value: 'X', label: 'Option #X'}
			];
		},
		dropdown3: async (): Promise<DropdownOptions> => dropdown3Options,
		dropdown3FilterChanged: async (filter: string) => {
			const text = filter.trim();
			if (dropdown3Options.find(option => option.label.startsWith(text.charAt(0).toUpperCase() + text.slice(1) + ' '))) {
				// already searched
				return new Promise<void>(resolve => setTimeout(resolve, 50));
			} else {
				return new Promise<void>(resolve => {
					setTimeout(() => {
						const maxValue = dropdown3Options.reduce((max, option) => {
							return Math.max(Number(option.value), max);
						}, 0);
						dropdown3Options.push(...(new Array(3).fill(1).map((_, index) => {
							return {
								value: `${maxValue + 1}`,
								label: text.charAt(0).toUpperCase() + text.slice(1) + ` Doe #${index + 1}`
							};
						})));
						resolve();
					}, 500);
				});
			}
		}
	};

	return <GlobalRoot>
		<CustomEventHandler/>
		<N2DemoDialogHandler/>
		<StyleController/>
		<StandaloneRoot {...def} $root={DemoData} externalDefs={externalDefs}/>
	</GlobalRoot>;
};

export const N2BasicWidgetsData = DemoData;
export const N2BasicWidgetsMarkdown = DemoContent;
