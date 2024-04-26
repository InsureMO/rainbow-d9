import {PlaygroundWidgetProperty} from '../../types';

export const OptionItemsProperties: Array<PlaygroundWidgetProperty> = [
	{name: 'options', label: 'Text, Various.'},
	{name: 'optionSort', label: 'Text.', description: '"asc", "desc".'},
	{name: 'sort', label: 'Text. Shortcut of "optionSort".', description: '"asc", "desc".'},
	{name: 'noAvailable', label: 'Text.', description: 'Reminder text when no available option item.'},
	{name: 'noMatched', label: 'Text.', description: 'Reminder text when no matched option item.'}
];
