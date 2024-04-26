import {PlaygroundWidgetProperty} from '../../types';

export const NoElementReminder: PlaygroundWidgetProperty = {
	name: 'noElementReminder', label: 'Text.', description: 'No item reminder text.'
};
export const ArrayProperties: Array<PlaygroundWidgetProperty> = [
	NoElementReminder,
	{name: 'addable', label: 'Boolean.', description: 'Default false. Could add item or not.'},
	{name: 'addLabel', label: 'Text.', description: 'Default add button label.'},
	{
		name: 'couldAddElement', label: 'Snippet.',
		description: 'Check could add new item or not, runtime check before apply adding.'
	},
	{
		name: 'disableOnCannotAdd', label: 'Boolean.',
		description: 'Default false. Disable add button when adding new item is not allowed.'
	},
	{name: 'createElement', label: 'Snippet.', description: 'Default use empty object as new item.'},
	{name: 'elementAdded', label: 'Snippet.', description: 'Handle item added event.'},
	{name: 'removable', label: 'Boolean.', description: 'Default false. Could remove item or not.'},
	// {name: 'removeLabel', label: 'Text.', description: 'Default remove button label.'},
	{
		name: 'couldRemoveElement', label: 'Snippet.',
		description: 'Check could remove item or not, runtime check before apply removing.'
	},
	{name: 'elementRemoved', label: 'Snippet.', description: 'Handle item removed event.'}
];
