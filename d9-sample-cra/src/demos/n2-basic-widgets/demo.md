# Page::Demo Tab

## Section::# 1. Basic Widgets

- collapsible
- marker: basic-widgets
- DecoInput::Decorate Input::decorateInput
	- label:
		- labelOnValue
		- property: decorateInput
		- leads: Yes:
	- leads: Hello
	- tails: World
	- regex: abc$,^def; Starts with "def" or ends with "abc".
	- validateScopes: s1
	- mask:
	  ```
	  return {
		mask: '**** **** ****',
		lazy: false,
		autofix: true
	  }
	  ```
- DecoNumber::Decorate Number Input::decorateNumberInput
	- label:
		- valueToLabel: `'Hello world, again.'`
	- leads: $icons.check;$
	- tails: %;$icons.caretLeft
	- numeric
	- placeholder: A placeholder
	- grouping
- DecoNumber::0 - 9 are Legal Keys::decorateNumberInput2
	- leads: $icons.check;$
	- tails: %;$icons.caretLeft
	- numeric
	- onKeyDown: @ext.keydown.numeric
- Checkbox::A Checkbox::aCheckbox
- Radio::A Radio::aRadio
- Dropdown::::dropdown
	- label: Dropdown
	- options:
		- 1: Option #1
		- 2: Option #2
- Dropdown::::dropdown2
	- label: Dropdown #2
	- options: @ext.dropdown2
- MultiDropdown::Multiple Dropdown::multiDropdown
	- options:
		- 1: Option #1
		- 2: Option #2
		- 3: A very very very very very very very very very very very very very very very very very very long Option #3
		- 4: Option #4
		- 5: Option #5
- DateTime::Buddhist Era::buddhistEra
	- dateFormat: BBBB/MM/DD
	- timeFormat: HH
- Label::A Label::label
	- valueToLabel: `'Hello World'`
	- leads: $icons.check;$
	- tails: %;$icons.caretLeft
- Caption::A Caption::caption
	- $fc
	- text: Hello World
- Caption::A Caption::caption
	- $fc
	- valueToLabel: `'Caption is [' + value + ']'`
- Radios::Radio Group::radios1
	- options:
		- 1: Option #1
		- 2: Option #2
		- 3: Option #3
		- 4: Option #4
		- 5: A very very very very very very very very very very very very very very very very very very long Option #5
	- place: 6
	- columns: 4
- Checks::Checkbox Group::checks1
	- options:
		- 1: Option #1
		- 2: Option #2
		- 3: Option #3
		- 4: Option #4
		- 5: A very very very very very very very very very very very very very very very very very very long Option #5
	- place: 6
	- columns: 4
- Checks::Checkbox Group::checks2
	- options:
		- 1: Option #1
		- 2: Option #2
		- 3: Option #3
		- 4: Option #4
	- single
- Button::
	- text: Validate Inputs
	- click: validate s1

