# Page::Demo Tab

## Section::# 7. Monitors

- Input::Property A::a
- Input::Shadow of Property A::a
	- disabled
	- repaint:
		- on: a
- Input::Clear Me when Property A Changed::clearMe
	- disabled
	- clearMe:
		- on: a
- Input::Last 2 Chars of Property A::last2Chars
	- disabled
	- watch:
		- on: a
		- handle:
		  ```javascript
		  model.last2Chars = model.a.slice(-2);
          return 'repaint';
		  ```
- Input::Property B, Disabled When "A" Is Empty::b
	- place: 2, 1
	- disabled:
		- on: a
		- handle: if ((model.a ?? '').length === 0) {
		  return true;
		  } else {
		  return false;
		  }
- Input::Property C, Invisible When "A" Is Empty::c
	- place: 3, 1
	- visible:
		- on: a
		- handle:
		  ```javascript
		  if ((model.a ?? '').length === 0) {
		    return false;
		  } else {
		    return true;
		  }
		  ```
- Input::Property D::d
	- place: 4, 1
	- required
	- validate:
		- on: a
		- handle:
		  ```javascript
		  if (VUtils.isBlank(model.a)) {
		    return value === 'blank' ? {valid: true}: {valid:false, failReason: 'A is blank, D should be "blank".'};
		  } else if (VUtils.isNumber(model.a).test) {
		    return value === 'number' ? {valid: true}: {valid:false, failReason: 'A is number, D should be "number".'};
		  } else {
		    return value === 'string' ? {valid: true}: {valid:false, failReason: 'A is string, D should be "string"'};
		  }       
		  ```
- Input::Property X::x
	- place: 5, 1
	- watch:
		- on: x
		- handle:
		  ```javascript
		  const oldValue = model.y;
		  model.y = `${model.x} and y`;
		  console.log(`[${oldValue}]`, `[${model.y}]`)
		  return ['value-changed', {path: '/y', from: oldValue, to: model.y}]
		  ```
- Input::Property Y::y
	- place: 5, 4
	- visible:
		- on: y
		- handle: `return (model.y ?? '').startsWith('123')`