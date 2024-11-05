import {PlaygroundWidgetProperty} from '../../types';

export const ValueChanged: PlaygroundWidgetProperty = {
	name: 'valueChanged', label: 'Snippet.', description: 'Handle value changed.'
};

export const AutoSelect: PlaygroundWidgetProperty = {
	name: 'autoSelect', label: 'Boolean. Select all content automatically.', description: 'Default true.'
};
export const InputPlaceholder: PlaygroundWidgetProperty = {
	name: 'placeholder',
	label: 'Text. Placeholder when no content.'
};
export const Please: PlaygroundWidgetProperty = {name: 'please', label: 'Text. Placeholder.'};
export const Filterable: PlaygroundWidgetProperty = {
	name: 'filterable',
	label: 'Boolean.',
	description: 'Default true.'
};
export const Clearable: PlaygroundWidgetProperty = {name: 'clearable', label: 'Boolean.', description: 'Default true.'};
export const Click: PlaygroundWidgetProperty = {name: 'click', label: 'Snippet.', description: 'Handle click event.'};
export const Ink: PlaygroundWidgetProperty = {
	name: 'ink', label: 'Text.',
	description: 'Ink mode. "primary", "success", "warn", "info", "danger", "waive".'
};
export const Fill: PlaygroundWidgetProperty = {
	name: 'fill', label: 'Text.', description: 'Fill mode. "link", "plain", "fill".'
};
