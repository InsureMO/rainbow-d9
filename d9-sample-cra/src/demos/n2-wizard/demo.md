# Page::Demo Tab

## Section::# 6.1. Wizard

### Wizard::::wizard1

- freeWalk, omitWalker

#### WStep::Step #1::step1

- marker: w1s1
- Input::First Input In Wizard Step #1::step1Input1
- Button::
	- text: Next
	- tails: $icons.angleRight
	- place: row: 2, col:11, cols:2
	- click: wstep: w1s2

#### WStep::::step2

- title:
	- valueToLabel: `'Step #2'`
	- leads: $
	- tails: $icons.caretLeft
- marker: w1s2
- Checkbox::First Check In Step #2::step2check1
- Button::
	- text: Next
	- leads: $icons.angleLeft
	- place: row: 2, col:1, cols:2
	- click: wstep: w1s1
	- ink: waive
- Button::
	- text: Next
	- tails: $icons.angleRight
	- place: row: 2, col:11, cols:2
	- click: wstep: w1s3

#### WStep::::step3

- title: Step #3
- marker: w1s3
- Button::
	- text: Next
	- leads: $icons.angleLeft
	- place: row: 2, col:1, cols:2
	- click: wstep: w1s2
	- ink: waive
- Button::
	- text: Next
	- tails: $icons.angleRight
	- place: row: 2, col:11, cols:2
	- click: wstep: w1s4

#### WStep::::step4

- title: Step #4
- marker: w1s4
- Button::
	- text: Next
	- leads: $icons.angleLeft
	- place: row: 2, col:1, cols:2
	- click: wstep: w1s3
	- ink: waive

#### WShared::::shared

- Input::Summary Value::value
	- pos: 12

## Section::# 6.2. Wizard, Not Balloon

### Wizard::::wizard2

- balloon: false
- reached: 1

#### WStep::Step #1::step1

- Input::First Input In Wizard Step #1::step1Input1

#### WStep::::step2

- title:
	- valueToLabel: `'Step #2'`
	- leads: $
	- tails: $icons.caretLeft
- Checkbox::First Check In Step #2::step2check1

#### WStep::::step3

- title: Step #3

#### WStep::::step4

- title: Step #4
