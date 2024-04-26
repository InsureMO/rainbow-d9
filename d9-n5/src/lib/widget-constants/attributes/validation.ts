import {PlaygroundWidgetProperty} from '../../types';

export const ValidationRequired: PlaygroundWidgetProperty = {
	name: 'required', label: 'Boolean, Various.', description: 'Required check. Customize message after ";".'
};
export const ValidationLength: PlaygroundWidgetProperty = {
	name: 'length',
	label: 'Number, Various.',
	description: 'Length check. Multiple rules connected by ",". Rule also can be "..x", "x..", "x..y". Customize message after ";".'
};
export const ValidationNumeric: PlaygroundWidgetProperty = {
	name: 'numeric', label: 'Boolean, Various.', description: 'Number check. Customize message after ";".'
};
export const ValidationPositive: PlaygroundWidgetProperty = {
	name: 'positive', label: 'Boolean, Various.', description: 'Positive number check. Customize message after ";".'
};
export const ValidationNotNegative: PlaygroundWidgetProperty = {
	name: 'notNegative', label: 'Boolean, Various.',
	description: 'Not negative number check. Customize message after ";".'
};
export const ValidationInteger: PlaygroundWidgetProperty = {
	name: 'integer', label: 'Boolean, Various.', description: 'Integer check. Customize message after ";".'
};
export const ValidationNumberRange: PlaygroundWidgetProperty = {
	name: 'numberRange', label: 'Various.',
	description: 'Number range check. Multiple rules connected by ",". Rule also can be "[..x]", "(x..)", "(x..y]". Customize message after ";".'
};
export const ValidationRegex: PlaygroundWidgetProperty = {
	name: 'regex', label: 'Boolean, Various.',
	description: 'Regex check. Regex could be predefined. Customize message after ";".'
};
export const ValidationRegexp: PlaygroundWidgetProperty = {
	name: 'regexp', label: 'Boolean, Various.', description: 'Same as "regex".'
};
