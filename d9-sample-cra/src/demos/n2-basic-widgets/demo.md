# Page::Demo Tab

## Section::# 1.1. Basic Widgets - Decorated Input

- DecoInput::Decorate Input::decorateInput
	- label:
		- labelOnValue
		- property: decorateInput
		- leads: Masked:
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
		- valueToLabel: `'Number, Grouping'`
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

## Section::# 1.2. Basic Widgets - Dropdown

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

## Section::# 1.3. Basic Widgets - Calendar

- DateTime::Buddhist Era::buddhistEra
	- dateFormat: BBBB/MM/DD
	- timeFormat: HH

## Section::# 1.4. Basic Widgets - Label

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

## Section::# 1.4. Basic Widgets - Radio

- Radio::A Radio::aRadio
- Radios::Radio Group::radios1
	- options:
		- 1: Option #1
		- 2: Option #2
		- 3: Option #3
		- 4: Option #4
		- 5: A very very very very very very very very very very very very very very very very very very long Option #5
	- place: 6
	- columns: 4
- Radios::Radio Group, Fake as Toggle Buttons::radios2
	- data-as-toggle-button
	- options:
		- 1: Option #1
		- 2: Option #2
		- 3: Option #3
		- 4: Option #4
		- 5: Option #5
	- place: 12

## Section::# 1.5. Basic Widgets - Checkbox

- Checkbox::A Checkbox::aCheckbox
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
- Checks::Checkbox Group, Fake as Toggle Buttons::checks3
	- data-as-toggle-button
	- options:
		- 1: Option #1
		- 2: Option #2
		- 3: Option #3
		- 4: Option #4
		- 5: Option #5
	- place: 12

## Section::# 1.6. Basic Widgets - Button

- Button::
	- text: Validate Inputs, Scope "S1"
	- click: validate s1

