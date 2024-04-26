import {PlaygroundWidgetProperty} from '../../types';

const DecorateElements = (name: 'leads' | 'tails'): PlaygroundWidgetProperty => {
	return {
		name, label: 'Decorations.',
		description: 'A string or a predefined icon. Icons need to start with “$icons.” Multiple decorations can be connected with “;”.'
	};
};
export const LeadsDecorateElements = DecorateElements('leads');
export const TailsDecorateElements = DecorateElements('tails');
