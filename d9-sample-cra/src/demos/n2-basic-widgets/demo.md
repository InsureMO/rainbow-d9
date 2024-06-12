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
	- required
	- data-di-tip-body: return 'Hello, I am a mask input.'
	- data-di-tip-tag: return 'data-decorate-input'
	- data-di-tip-max-width: 150
	- data-di-tip-delay: 2
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
	- data-tip-title: return 'Hello'
	- data-tip-body: return 'I am a number input.'
	- data-tip-tag: return 'data-decorate-input'
- DecoNumber::0 - 9 are Legal Keys::decorateNumberInput2
	- leads: $icons.check;$
	- tails: %;$icons.caretLeft
	- tip: @ext.tip.numeric2
	- numeric
	- onKeyDown: @ext.keydown.numeric
- DecoNumber::::decorateNumberInput3
	- data-value2: $pp.decorateNumberInput3
	- data-value-func:
	  ```javascript
	  return options.model.decorateNumberInput3 < 10000 ? 'lt10000': 'gte10000';
	  ```
	- label: Contract Value
	- format: @ext.deco.numericFormat
	- tip:
	  ```javascript
	  // console.log(options.model);
	  return {body: `Hello, I am number input #3, current value is ${options.model.decorateNumberInput3}.`}
	  ```
	- repaint:
		- on: decorateNumberInput3

## Section::# 1.2. Basic Widgets - Dropdown

- Dropdown::::dropdown
	- label: Dropdown
	- options:
		- 1: Option #1
		- 2: Option #2
	- data-tip-body: return 'I am a simple dropdown.'
- Dropdown::::dropdown2
	- label: Dropdown #2
	- options: @ext.dropdown2
	- data-tip-body:
	  ```javascript
	  // console.log(options.model);
	  return `Hello, I am dropdown #2, current value is ${options.model.dropdown2}.`;
	  ```
- MultiDropdown::Multiple Dropdown::multiDropdown
	- options:
		- 1: Option #1
		- 2: Option #2
		- 3: A very very very very very very very very very very very very very very very very very very long Option #3
		- 4: Option #4
		- 5: Option #5
	- data-tip-body: return 'I am a multiple-choices dropdown.'

## Section::# 1.3. Basic Widgets - Calendar

- DateTime::Buddhist Era::buddhistEra
	- dateFormat: BBBB/MM/DD
	- timeFormat: HH
	- renderOn: desktop, mobile
	- !autoConfirm
	- couldPerform:
	  ```javascript
	  // April 2024, and after
	  if (['year', 'month', 'date'].includes(options.checkType)) {
	    return (options.valueToCheck.year() === 2024 && options.valueToCheck.month() >= 3)
	      || options.valueToCheck.year() > 2024;
	  } else {
	    return options.valueToCheck.hour() >= 9 && options.valueToCheck.hour() < 18;
	  }
	  ```
	- data-tip-body: return 'I am a Buddhist Era date time picker.'
- Date::Buddhist Year & Month::buddhistEra2
	- dateFormat: BBBB/MM
- Date::Hide Shortcuts::date3
	- data-calendar-hide-shortcuts
	- autoConfirmOnDate
- Time::Time Only::time1
	- timeFormat: HH:mm:ss
- Date::Only Visible on Desktop::mobileDesktop
	- renderOn:
	  ```
	  // this line canont be ignored, since renderOn attribute build will not treat single line as function body
	  return ['desktop', 'mobile'];
	  ```
- Date::Only Visible on Mobile::mobileDate
	- renderOn: mobile

## Section::# 1.4. Basic Widgets - Label

- Label::A Label::label
	- valueToLabel: `'Hello World'`
	- leads: $icons.check;$
	- tails: %;$icons.caretLeft
	- data-tip-body: return 'I am a label.'
- Caption::A Caption::caption
	- $fc
	- text: Hello World
- Caption::A Caption::caption
	- $fc
	- valueToLabel: `'Caption is [' + value + ']'`

## Section::# 1.4. Basic Widgets - Radio

- Radio::A Radio::aRadio
	- data-tip-body: return 'I am a radio.'
- Radios::Radio Group::radios1
	- options:
		- 1: Option #1
		- 2: Option #2
		- 3: Option #3
		- 4: Option #4
		- 5: A very very very very very very very very very very very very very very very very very very long Option #5
	- place: 6
	- columns: 4
	- data-tip-body: return 'I am a radios.'
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
	- data-tip-body: return 'I am a checkbox.'
- Checks::Checkbox Group::checks1
	- options:
		- 1: Option #1
		- 2: Option #2
		- 3: Option #3
		- 4: Option #4
		- 5: A very very very very very very very very very very very very very very very very very very long Option #5
	- place: 6
	- columns: 4
	- data-tip-body: return 'I am a checkboxes.'
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
	- data-tip-body: return 'I am a button.'

- Caption::
	- text: Dropdown
		- property: BizTransaction.PaymentMethod
		- disabled, data-as-label
		- please: Let you see me.
		- options: F: Female
	- click:
	  ```
	  const {global: {sc}, root, model} = options;
	  await sc( 'dialog', 'direct-card', {root, model});
	  ```
