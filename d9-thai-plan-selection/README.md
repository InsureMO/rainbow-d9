![Static Badge](https://img.shields.io/badge/InsureMO-777AF2.svg)

![License](https://img.shields.io/github/license/InsureMO/rainbow-d9)
![GitHub Release](https://img.shields.io/github/v/release/InsureMO/rainbow-d9)
![GitHub Release Date](https://img.shields.io/github/release-date/InsureMO/rainbow-d9)
![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/InsureMO/rainbow-d9)

![npm (scoped)](https://img.shields.io/npm/v/%40rainbow-d9/thai-plan-selection?logo=npm)
![npm](https://img.shields.io/npm/dm/%40rainbow-d9/thai-plan-selection)

![Depends](https://img.shields.io/badge/React-white.svg?logo=react)
![Depends](https://img.shields.io/badge/Styled--Components-white.svg?logo=styledcomponents&logoColor=DB7093)
![Depends](https://img.shields.io/badge/Font--Awesome-white.svg?logo=fontawesome&logoColor=528DD7)

![Module Formats](https://img.shields.io/badge/module%20formats-cjs%2C%20esm-green.svg)

# d9-thai-plan-selection

Plan selection for Thai Cloud.

| Attribute Name              | Type                                | Description                                                                                                                                                                             |
|-----------------------------|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| columns                     | number                              | max plans count in one page, default is 3. set tp <=0 value to represent no limit, which means show horizontal scrollbar and column width and line header width are in pixels (number). |
| columnWidth                 | number, text                        | plan column width                                                                                                                                                                       |
| lineHeaderWidth             | number, text                        | first column width, default use `columns` and `columnWidth` to compute                                                                                                                  |
| maxHeight                   | number, text                        | max body height, plan header and footer are not included                                                                                                                                |
| defs                        | PlanDefs, PlanDefsFunc              | plan candidate definitions                                                                                                                                                              |
| valuesInit                  | PlanValuesInitFunc                  | initialize plan values, invoked after defs first initialized                                                                                                                            |
| valuesClear                 | PlanValuesClearFunc                 | clear plan values, invoked after defs reloaded                                                                                                                                          |
| currencySymbol              | string, ReactNode                   | currency symbol                                                                                                                                                                         |
| premiumDescription          | string, ReactNode                   | premium description                                                                                                                                                                     |
| buyText                     | string, ReactNode                   | buy button text                                                                                                                                                                         |
| buy                         | ButtonClick                         | buy button click handler                                                                                                                                                                |
| planTitle                   | PlanTitleFunc                       | plan header title                                                                                                                                                                       |
| planSubTitle                | PlanSubTitleFunc                    | plan header subtitle                                                                                                                                                                    |
| elementTitle                | PlanElementTitleFunc                | plan element title, level starts from 0                                                                                                                                                 |
| elementFixedValue           | PlanElementFixedValueFunc           | plan element fixed value                                                                                                                                                                |
| elementOptionsValue         | PlanElementOptionsValueFunc         | plan element options value                                                                                                                                                              |
| elementNumberValue          | PlanElementNumberValueFunc          | plan element number value                                                                                                                                                               |
| elementNumberValueValidator | PlanElementNumberValueValidatorFunc | plan element number value validator                                                                                                                                                     |
| planOperators               | PlanOperatorsFunc                   | plan operators                                                                                                                                                                          |
| calculationDelay            | number                              | default 1s                                                                                                                                                                              |
| calculate                   | PlanCalculateFunc                   | do calculation                                                                                                                                                                          |

## Force Reload Plan Definitions

Sometimes, the definition of the available options for a plan needs to be reloaded. In such cases, you can force a plan reload by sending a
custom event to the component. It is important to note that reloading the plan definition may result in a mismatch between the memory data
associated with the current plan and the newly loaded plan. In this scenario, you can perform appropriate cleanup by using the `valuesClear`
method. If the `valuesClear` parameter is not specified, the component will not operate on the model after reloading the plan definition.
Here is an example of sending an event:

```typescript
import {useSimpleCustomGlobalEvent} from '@rainbow-d9/n2';

// useSimpleCustomGlobalEvent is same as useCustomGlobalEvent, but it is a simple version, which will build parameter key inside.
const fireCustomEvent = useSimpleCustomGlobalEvent();
// marker is required, it is used to identify the plan selection widget even there is only one exists.
// should be same as the marker declared in PlanSelectionDef.
const marker = 'plan-unique-marker';
// model is based on where to fire this event, not model of plan selection.
fireCustomEvent(PlanSelectionGlobalEventPrefix.RELOAD_DEFS, marker, {root, model});
```

# A sample

```markdown
- PlanSelect::::plans
	- defs: @ext.defs
	- currencySymbol: ฿
	- premiumDescription: After Tax
	- buy: @ext.buy
	- calculationDelay: 3
	- calculate: @ext.calculate
```
