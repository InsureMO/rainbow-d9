![Static Badge](https://img.shields.io/badge/InsureMO-777AF2.svg)

![License](https://img.shields.io/github/license/InsureMO/rainbow-d9)
![GitHub Release](https://img.shields.io/github/v/release/InsureMO/rainbow-d9)
![GitHub Release Date](https://img.shields.io/github/release-date/InsureMO/rainbow-d9)
![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/InsureMO/rainbow-d9)

![npm (scoped)](https://img.shields.io/npm/v/%40rainbow-d9/n3?logo=npm)
![npm](https://img.shields.io/npm/dm/%40rainbow-d9/n3)

![Module Formats](https://img.shields.io/badge/module%20formats-cjs%2C%20esm-green.svg)
![Depends](https://img.shields.io/badge/depends-react%2C%20mdast%2C%20micromark-087EA4.svg)

# d9-n3

It is the No.3 project of group `d9`.  
This project is Markdown engine, parse to JSON configuration, which used to do rendering.

# Idea

[d9](https://github.com/InsureMO/rainbow-d9)

The purpose of `d9-n3` is to provide a Markdown-based approach that allows non-programmers to easily participate in the process of page
design and creation to a great extent, without the assistance of programmers. Additionally, due to the easily storable and comparable
structure of Markdown, this approach also brings convenience in terms of page management.

# Add Into Your Project

```bash
yarn add @rainbow-d9/n3
```

# Parse

Parsing Markdown involves three main steps: pre-parsing of Markdown content, syntax parsing, and creation and parsing of
widget configurations.

## Preparse

The pre-parsing of Markdown content uses `mdast` for parsing. It mainly processes the text content into a structured format and
builds the structure tree of the given document based on the hierarchy of headings. It is worth noting that according to the parsing result
of `mdast`, all headings (if the syntax follows the normal writing conventions, as Markdown has loose syntax requirements) are placed under
the root node and are not organized into a tree structure. Therefore, the pre-parsing process reorganizes the headings based on their
hierarchy, with N-level headings appearing as child nodes under the nearest preceding N-1 level heading.

## Semantic Parse

The semantic parsing will parse headings and list items into components, following the following parsing rules:

- Headings, in the format of `WidgetType[::Headline][::$Id]`.
	- If no text definition is provided, it is considered a reserved heading,
	- If the text ends with `::IGNORE` or `::EXPORT`, it is considered a reserved heading.,
	- If no widget type is detected, it is considered a reserved heading.
- List Items, content can be defined as a component or property definition.
	- If the first child element of the list item in Markdown syntax is not text, it is considered a reserved item.
	- If the first child element is not on the same line as the list item, it is considered a reserved item.
	- If there is no text definition on the same line, it is considered a reserved item.
	- If it starts with `REF.`, `Ref.`, or `ref.`, it is considered a reference to an external component.
	- If the text format is `WidgetType::Label[::PropertyPath]`, it is considered a component.
	- If it is in the format `x: y`, it is considered a property definition.
	- Others are considered a property group definition, specifically used for defining boolean properties.

> Reserved heading and list item currently not supported in the runtime.  
> Reference list item currently not supported in the runtime.

## Creation and Parsing of Widget Configurations

After the pre-parsing and syntax parsing stages, we have obtained a complete syntax tree. The remaining task is to continue parsing and
creating configuration data that can be used for rendering with the `d9` core.

Before explaining the final step, an important concept must be clarified: the parsing of Markdown syntax has no direct physical
relationship with the actual widget library selection. However, logically, all widget types parsed in the previous
process must be supported in the final rendering process. In particular, the parsing of specific widget properties, due to the uniqueness
of each individual widget (each widget may have its own unique properties and corresponding values), requires support from a
corresponding widget parsing implementation if we are rendering based on a specific widget library. However, `d9-n3` already has
standard support for standard properties, and if there are no specific properties that need support (which is highly unlikely in the real
world), there is essentially no need for additional widget-level plugin support.

All discussions below are based on the parsing support for the `d9-n2` widget library that comes with `d9-n3`. If you are using a
different widget library or a mixed scenario, you can also customize and register your own widget parsing by understanding the
following instructions and referring to the relevant source code of `d9-n3`.

Referencing the implementation of `SemanticHelper#classifyParsedHeadings`, Markdown allows multiple top-level nodes. Currently, only nodes
with a widget type of `Page` are considered renderable widgets. In the absence of any `Page` node definitions, only nodes defined as
`Export` will be considered renderable widgets. In the final parsing process, only the first node considered renderable will be selected
for further parsing and ultimately rendered.

Let's take a look at a very simple example,

```markdown
# Page

- Input::Name::name

# Page

[//]: # (something else)
```

In the above definition, only the first `Page` node will be considered for rendering, and the second one will be ignored. Therefore, in
actual practice, we recommend defining one page per Markdown and not merging them together.

> Regarding the inclusion of multiple widgets in a Markdown file, reserved headings, reserved list items, and related support, we will plan
> for it in future versions. Currently, it can be understood as just a placeholder to support flexibility in definitions.

After the initial demonstration, we have learned how to define a page using a Markdown file. Next, we will see a more complex example as
follows:

```markdown
# Page::Policy Info

## Section::Policy Info

- Input::Company Code::companyCode
	- length: 2;
	- disabled
- Input::Prefix::symbol
	- length: 3;
	- disabled
- Input::Policy No.::policyNo
	- disabled
	- length: 6;
- Input::Suffix::renewalRewriteVer
	- length: 1..2;
	- disabled
- Dropdown::Country::countryCode
	- options:
		- 183: NZ
- Input::Insured Name::insuredName
	- length: 0..128;
- Input::Insured Alias Name::insuredAliasName
	- length: 0..40;
- Input::Holder Contact Phone::holderContactPhone
	- length: 0..15;
- Input::Endorsement No.::endoNo
	- length: 3;
	- disabled
- Input::Endorsement Cancel Ver::endoCancelVer
	- length: 1..2;
	- disabled
- Input::Ccvb No.::ccvb
	- disabled
- Dropdown::Transaction Type::transactionType
	- options:
		- AP: New Business
		- CP: Cancel Policy Pro-rata
		- MP: Endorsement
		- RENEW: Renew
		- REIN: Reinstatement
- Date::Trans Date::transDate
- Date::Application Date::applicationDate
- Dropdown::Status::status
	- options:
		- A: Active
		- C: Cancelled
- Input::Previous Status::previousStatus
	- length: 1;
- Date::Policy Effective Date::effectiveDate
- Date::Policy Expiry Date::expiryDate
- Input::Terms::terms
	- length: 1..3;
	- integer: Must be an integer.
- Date::Origin Issue Date::originIssueDate
- Date::Origin Effective Date::originEffectiveDate
- Date::Endorsement Effective Date::endoEffectiveDate
- Date::Cancel Date::cancelDate
- Date::Cancel Process Date::cancelProcessDate
- Input::Cancel Reason Code::cancelReasonCode
	- length: 2;
- Date::Reinstate Process Date::reinstateProcessDate
- Dropdown::Reinstate Type::reinstateType
	- options:
		- P: P
- Dropdown::Branch::branchCode
	- options:
		- 01: 01
		- 02: 02
- Input::Underwriter Code::underwriterCode
	- length: 0..10;
- Input::Underwriter Origin::underwriterOrigin
	- length: 0..10;
- Dropdown::Broker Company Code::agentCode
	- options: @ext.codes.mdBrokerCompanyOptions
	- sort: asc
- Input::Broker Name Code::brokerCode
	- length: 0..6;
- Number::Commission Percentage::commissionPercentage
	- notNegative: Must be not negative.
	- numeric: Must be numeric.
- Dropdown::Account Type Code::accountTypeCode
	- options:
		- A: A
		- C: C
		- B: B
		- Y: Y
- Input::Source Code::sourceCode
	- length: 1..3;
- Input::Production Source Code::productionSourceCode
	- length: 1..3;
- Dropdown::Coinsurance Indicator::coinsuranceIndicator
	- options:
		- N: N (Non-Coinsurance)
		- L: L (Co-AIG as Leader)
		- Y: Y (Co-AIG as Follower)
- Dropdown::Renewal Flag::renewalFlag
	- options:
		- 0: N
		- 1: Y
- Dropdown::Renewal Code::renewalCode
	- options:
		- 00: 00
		- 01: 01
		- 02: 02
		- 03: 03
		- 04: 04
		- 05: 05
		- 06: 06
		- 07: 07
		- 08: 08
		- 09: 09
		- 10: 10
- Dropdown::Renewal Indicator::renewalIndicator
	- options:
		- N: N
		- Y: Y
- Input::Assume Business Indicator::assumeBusinessIndicator
	- length: 1;
- Dropdown::Inward RI Company Code::inwardRICode
	- options: @ext.codes.mdInwardRiCompanyOptions
	- sort: asc
- Dropdown::Assumed Type::agentSubproducerCode
	- options:
		- NRI: NRI
		- IRI: IRI
- Dropdown::Billing Code::billingCode
	- Options:
		- AC:AC
		- DB:DB
		- AR:AR
- Input::Pay Plan Code::payPlanCode
	- length:2
- Dropdown::Currency Code::currencyCode
	- options:
		- 108: 108
- Input::Quote Currency Code::quoteCurrencyCode
	- length: 3;
- Dropdown::Deductible Costs Flag::deductibleCostsFlag
	- options:
		- E: E
		- I: I
		- N: N
- Dropdown::Rated Type::ratedType
	- options:
		- M: M
		- A: A
		- H: H
		- P: P
- Number::Short Rate Percentage::shortRatePercentage
	- numeric: Must be numeric.
	- notNegative: Must be not negative.
- Date::Reinstatement Date::reinstatementDate
- Input::Renewal Certificate Number::renewalCertificateNumber
	- length: 8;
- Dropdown::Audit Frequency::auditFrequency
	- options:
		- A: A
		- S: S
		- M: M
- Dropdown::Personal Package Policy Status::personalPackagePolicyStatus
	- options:
		- A: A
		- H: H
		- B: B
- Input::Stateside Collection Indicator::statesideCollectionIndicator
	- length: 0..1;
- Dropdown::MM Maker Type::mmMakerType
	- options:
		- MJ: MJ
		- MM: MM
		- M: M
- Checkbox::eDit Flag::eDitFlag
	- values: Y, N
- Input::Request Revision No.::requestRevisionNo
- Input::Lae Method Flag::laeMethodFlag
	- length: 1;
- Dropdown::Prefix Segment Code::prefixSegmentCode
	- options:
		- C: C
		- S: S
		- T: T
		- A: A
		- O: O
		- N: N
		- 0: 0
- Dropdown::Waats Gds Reference No.::waatsGdsReferenceNo
	- options:
		- 0: 0
		- NZD: NZD
		- ANZ: ANZ
		- FRA: FRA
- Input::Document Note::documentNote
	- disabled
- Dropdown::Print Renewal Notice::printRenewalNotice
	- options:
		- Y: Y
- Date::Error Date::errorDate
- Input::Form Number::formNumber
	- length: 0..5;
- Dropdown::Region Field::regionField
	- options:
		- N: N
- Input::Renewal Extract::renewalExtract
	- length: 0..1;
- Checkbox::Has End::hasEnd
	- values: Y, N
- Input::Filler Field::fillerField
	- place: 12
	- length: 0..65;
- Input::Manual Modify::manualModify
	- disabled
```

The above is a fairly comprehensive example used to render a page for inputting basic insurance information. We don't need to focus on the
specific content here; we are interested in understanding how to define it quickly. Let’s select a representative section from it for a
detailed observation.

```markdown
# Page::Policy Info

## Section::Policy Info

- Input::Company Code::companyCode
	- length: 2;
	- disabled
- Dropdown::Country::countryCode
	- options:
		- 183: NZ
- Checkbox::Has End::hasEnd
	- values: Y, N
- Input::Filler Field::fillerField
	- place: 12
	- length: 0..65;
```

- `# Page::Policy Info`: This represents a page,
- `## Section::Policy Info`: This is a Section, and it is titled `Policy Info`,
- `- Input::Company Code::companyCode`: This is an input, and it is titled `Company Code`, bind two-way with the model
  property `companyCode`,
- `    - length: 2;`: The length of `Company Code` must be 2 characters. Custom validation exception messages can be written after the
  semicolon, but it is not specified in this case, so the standard message will be used,
- `    - disabled`: `Company Code` cannot be edited or modified,
- `- Dropdown::Country::countryCode`: This is a dropdown, and it is titled `Country`, bind two-way with the model property `countryCode`,
- `    - options:`, `        - 183: NZ`: This dropdown only has one option, with a value of `183` and a label of `NZ`,
- `- Checkbox::Has End::hasEnd`: This is a checkbox, and it is titled `Has End`, bind two-way with the model property `hasEnd`,
- `    - values: Y, N`: The value of this checkbox is `Y` and `N`,
- `- Input::Filler Field::fillerField`: This is an input, and it is titled `Filler Field`, bind two-way with the model
  property `fillerField`,
- `    - place: 12`: Occupying 12 columns, since the `Section` uses a 12-column layout, this input field actually spans the entire row,
- `    - length: 0..65;`: Similar to the length limit mentioned above, here it is defined that 0 to 65 characters are all valid.

Once the above Markdown is defined, simply invoke the `parseDoc` function to obtain the parsed configuration, which can then be used for
rendering, as shown below:

```typescript jsx
// Assuming that content is a markdown text definition that satisfies the syntax requirements,
const {node: def} = parseDoc(content);

return <StandaloneRoot $root={model} {...def} />;
```

## Built-in `d9-n2` Widgets Parser

All the built-in `d9-n2` widgets parsing support can be found in the `/src/lib/n2` directory. Before using the `d9-n2` widget parsing,
need to call the `registerN2Widgets` method to register all the parsers. All parsers need to
implement `SpecificWidgetTranslator`. If it is an array widget, please implement `SpecificArrayWidgetTranslator`. `d9-n3` already
provides a variety of basic parsers for customizing new parsers, and you can observe the specific implementation through the source code.
After writing your custom parsers, you also need to provide a function similar to `registerN2Widgets` to register your parser
into the parser repository.

# Syntax of Markdown

When defining a page, the most important aspect is attribute definition. This section will focus on the attribute definition part and
provide
comprehensive documentation to facilitate quick learning for users.

> Property or attribute have the same meaning in this chapter and are no longer distinguished.

## Heading

Syntax: `WidgetType[::Headline][::PropertyPath][::Id]`.

Connect with `::`,

- If there is no `::`, only the widget type is present,
- If there are two parts, it includes widget type and headline,
- If there are three parts, it includes widget type, headline and property path,
- If there are more than three parts,
	- The last section represents the id,
	- The second to last section represents property path,
	- The first section represents the widget type,
	- Rest sections are reconnected with `::` to represent the headline.

Some examples:

```markdown
# Page

## Section::Basic Info

### Table::Order Items::orderItems

- property: items
```

> It is important to note that the last section of the heading is not a property path, so an additional property path definition is
> needed through the list item approach.

> If heading ends with `::EXPORT`, means it is exported from this markdown configuration, the first one will be rendered if there is
> no `Page` present.  
> If heading ends with `::IGNORE`, means it is ignored in rendering, which can be used to annotate exclusions that are not meant to be
> removed from the entire configuration.

> Except for the root node, the content of the `headline` will be used as the `label` attribute.

## List Item

> If list item ends with `::IGNORE`, means it is ignored in rendering, which can be used to annotate exclusions that are not meant to be
> removed from the entire configuration.

### Widget

Syntax: `WidgetType::Label[::PropertyPath]`.

Connect with `::`,

- If there is no `::`, it will not be recognized as a widget,
- If there are two parts, it includes widget type and label (could be empty or blank),
- If there are more than three parts, the last section represents the property path, the first section represents the widget type. All the
  middle sections are reconnected with `::` to represent the headline.

Some examples:

```markdown
- Input::Name::name
- Dropdown::
	- property: gender
```

> `- Dropdown::` will be parsed to two parts, which presents widget type and an empty label.

### Reference Widget

Syntax: `REF.Id` or `Ref.Id` or `ref.Id`.

> Reserved, currently not supported in runtime.

### Attribute

Syntax: `X:y`.

Single attribute definition. Additionally, this list item node can contain child lists, depending on the implementation of the parser.

Some examples:

```markdown
- property: name
- options: @ext.codes.hasEndOptions
- options:
	- A: A
	- C: C
```

> In the examples above, all property definitions are written at the top level. However, in actual definitions, properties are always
> associated with a component and therefore cannot be written at the top level.

### Attributes

Syntax: `a[, b[, !c]]`.

To define multiple properties with boolean values, connected by commas. To represent a false value, simply prefix it with an exclamation
mark.

Some examples:

```markdown
- disabled
- disabled, !visible
```

> In the examples above, all property definitions are written at the top level. However, in actual definitions, properties are always
> associated with a component and therefore cannot be written at the top level.

## Position

Syntax:

- `place`, `position`, `pos` and `$pos` can all be used as attribute names, and they have the same meaning,
- `place: columns`,
- `place: row, column`,
- `place: row, column, columns`,
- `place: row, column, columns, rows`,
- `place: [c|$c|col|$col|column|$column: column][, r|$r|row|$row: row][, cols|$cols|columns|$columns: columns][, rows|$rows: rows]`.

Some examples:

```markdown
- place: 12
- position: 2, 4
- pos: 2, 4, 6
- $pos: 2, 4, 6, 3
- place: c: 4, r: 2, cols: 6, rows: 3
- place: $c: 4, $r: 2, $cols: 6, $rows: 3
```

## Attribute Guard

Any attributes that are not captured by a specific parser will be eventually parsed by the attribute guard. The attribute guard follows the
following principles for parsing:

- If the attribute value is empty, it is considered as an empty string.
- If it is any of `True`, `true`, `T`, `t`, `Yes`, `yes`, `Y`, `y`, it is considered as true.
- If it is any of `False`, `false`, `F`, `f`, `No`, `no`, `N`, `n`, it is considered as false.
- Attempt to convert it to a numeric type, if successful, it is converted to a numeric value; if failed, the string value is retained.

Therefore, if the value of a component attribute conforms to the above rules, there is no need to provide additional parsers.

Some examples:

```markdown
- property: name
- disabled: yes
```

## External Definition

Any attribute value starting with `@ext.` will be translated as requiring an external definition.

Some examples:

```markdown
- options: @ext.codes.hasEndOptions
```

> In the examples above, using `codes.hasEndOptions` to find external definitions, which passed to `StandardRoot`.

> Unless otherwise specified, in markdown, the `@ext.` syntax is only allowed when declaring properties in the first level under a
> component. Many properties of components are complex and require multi-level description. In such cases, the `@ext.` syntax is generally
> not
> supported.

## Form Cell

`$fc` is a boolean attribute. When this attribute is defined (typically with a value of true), the current widget will have
the `.FC` suffix added, indicating that it is included within the component represented by `FC`. Note that if a widget
already has a label defined, it will by default have the `.FC` suffix added. Unless the widget parser declares that it should not be
included, please refer to the `SpecificWidgetTranslator#shouldWrapByFormCell` implementation.

Form cell introduces the concept of `label`, which is generally a static string and can be defined using `- label: SomeText`. In complex
cases, component combinations can be defined using the following approach, as an example, we will take the input box:

- `label` in headline,
  ```markdown
  - Input::A Label::name
  ```
- `label` in attribute,
  ```markdown
  - Input::::name
    - label: A Label
  ```
- Use a `Caption` as `label`, in this case, label is same as input text,
  ```markdown
  - Input::::name
    - label:
        - valueOnLabel
        - property: name
  ```
- Use any widget as `label`,
  ```markdown
  - Input::::name
    - label: Input
        - property: name
  ```

Please be aware that `label` can be an attribute of widget itself, in this case,
use `SpecificWidgetTranslator#shouldTranslateLabelAttribute` to avoid default parsing behavior.

## Built-in Validation Properties

- `required`: boolean,
- `numeric`: boolean,
- `integer`: boolean,
- `positive`: boolean,
- `notNegative`: boolean,
- `length`: syntax as below,
	- `length: number`: presents fix length,
	- `length: number..`: presents minimum length,
	- `length: ..number`: presents maximum length,
	- `length: number..number`: presents both minimum and maximum length,
	- all above syntax, connected by `,`,
	- no negative value accepted.
- `numberRange`: : syntax as below,
	- `numberRange: [min..max]`: presents a range,
	- allow given minimum value by `[`, or ignore it. Or exclude given minimum value by `(`,
	- allow given maximum value by `]`, or ignore it. Or exclude given maximum value by `)`,
	- minimum/maximum value can be ignored, but at least one should be present,
	- all above syntax, connected by `,`,
- `regex` or `regexp`: syntax as below,
	- `regex: ^\d+$`: presents a regex pattern,
	- multiple patterns connected by `;`.

Some examples:

```markdown
- required, numeric, positive
- integer, notNegative
- length: 5
- length: 1..5
- length: ..5
- length: 3..
- length: 8, 11
- length: 5..8, 11..20
```

All built-in validation properties can use tailing `; message` to identify the customization message. For boolean attribute, string value
should be treated as customization message.

Some examples:

```markdown
- required: Name is required.
- length: 5; Name should be 5 characters.
```

> Built-in validation attribute must be declared in customized `SpecificWidgetTranslator`, otherwise it will not take effect.

## Name Mapping

The names of certain attributes in actual configurations may start with a `$`, or they may be abbreviated or use shorthand
forms. These names can be confusing to read when configuring in Markdown. Therefore, `d9-n3` provides a mechanism for attribute name
mapping, which consists of the following parts:

- Widget scoped: by `WidgetType.name` register,
- Global: by `name` register,
- Built-in.

Some examples:

```typescript
export class N2DropdownTranslator extends SpecificWidgetTranslator<N2WidgetType.DROPDOWN> {
	// declare sort is mapping to optionSort, for dropdown only
	// in markdown, eg. - sort: asc
	public getAttributeNamesMapping(): Undefinable<Record<CustomAttributeName, WidgetPropertyName>> {
		return {'Dropdown.sort': 'optionSort'};
	}
}

// declare sort is mapping to optionSort, for all widgets
AttributeNameUtils.register({'sort': 'optionSort'});
```

Built-in name mapping as below,

| Name in Markdown | Name in Definition |
|------------------|--------------------|
| disabled         | $disabled          |
| visible          | $visible           |
| validate         | $valid             |
| watch            | $reaction          |
| property         | $pp                |
| place            | $pos               |
| position         | $pos               |
| pos              | $pos               |

# `d9-n2` Widgets Support

## Common

| Attribute Name                    | Type          | Need Declare by Widget Parser? | Description                                                                                  |
|-----------------------------------|---------------|--------------------------------|----------------------------------------------------------------------------------------------|
| property, $pp                     | property path | No                             | `- property: name`<br/>`- property: customer.name`                                           |
| disabled, $disabled               | boolean       | No                             | `- disabled`                                                                                 |
| visible, $visible                 | boolean       | No                             | `- visible: false`                                                                           |
| validate, $valid                  | various       | No                             | **Not supported yet**                                                                        |
| validateScopes, $validationScopes | text          | No                             | `- validateScopes: s1, s2`<br/>Define the applicable validation scopes.                      |
| watch, $reaction                  | various       | No                             | **Not supported yet**                                                                        |
| place, position, pos, $pos        | various       | No                             | Refer to [Position](#position)                                                               |
| $fc                               | boolean       | No                             | `- $fc`<br/>Force current widget wrapped by a form cell.                                     |
| label                             | text          | No                             | `- Section::Customer`<br/>`- label: Customer`<br/>Works when widget is wrapped by form cell. |
| holdPositionWhenInvisible         | boolean       | No                             | Hold position even widget is invisible, for form cell.                                       |
| required                          | boolean       | Yes                            | `- required`<br/>`- required: This field is mandantory.`                                     |
| numeric                           | boolean       | Yes                            | `- numeric`<br/>`- numeric: This field should be a number.`                                  |
| integer                           | boolean       | Yes                            | `- integer`<br/>`- integer: This field should be an integer.`                                |
| positive                          | boolean       | Yes                            | `- positive`<br/>`- positive: This field should be a positive number.`                       |
| notNegative                       | boolean       | Yes                            | `- notNegative`<br/>`- notNegative: This field should be a non-negative number.`             |
| length                            | number range  | Yes                            | `- length: 5`<br/>`- length: 5..10`, etc.                                                    |
| regex,regexp                      | regexp        | Yes                            | `- regex: ^\d{5}$`, etc.                                                                     |

### Disablement and Visibility

For components that support responsive availability and visibility, besides directly using boolean values, `$disabled` and `$visible`
provide more complex definition approaches as follows:

```markdown
- Checkbox::Allowed to watch PG-13 rated films.::allowPG13
	- disabled:
		- on: name, age
		- handle: `(model.name ?? '').trim().length === 0 || parseInt(model.age ?? 0) <= 12`
```

The above syntax indicates that if the `name` is not filled in or the `age` is less than or equal to 12, the current component will be
disabled.

> `handle` can be defined using a JavaScript block to enable syntax highlighting. It also supports the `@ext.` syntax.

> It is important to note that for `disabled` and `visible`, the `handle` definition will also be called as a default value calculation.
> Therefore, please note that within the `handle` function body, only the `root`, `model`, and `value` arguments are applicable.

#### Validation

In addition to the built-in validation rules, you can also customize validation rules in the same way as `Disablement` and `Visibility`.
However, `Validation` can choose not to listen to any other property changes. If defined, it will be applied to all validation rules.

> `Validation` can also be defined with only the listening properties without defining any rules.

Here is a simple example:

```markdown
- Input::Property D::propD
	- required
	- validate:
		- on: propA
		- handle:
		  ```javascript
		  if (VUtils.isBlank(model.propA)) {
		    return value === 'blank' ? {valid: true}: {valid:false, failReason: 'A is blank, D should be "blank".'};
		  } else if (VUtils.isNumber(model.propA).test) {
		    return value === 'number' ? {valid: true}: {valid:false, failReason: 'A is number, D should be "number".'};
		  } else {
		    return value === 'string' ? {valid: true}: {valid:false, failReason: 'A is string, D should be "string"'};
		  }       
		  ```
```

The above definition means that property `D` is required and its value must have a certain mapping relationship with the type of
property `A`.

## Page

Strictly adhere to the heading parsing rules without any additional attribute definitions.

## Section

- Default Wrapped by Form Cell: `false`,
- Default Grid Column Span: `12`.

| Attribute Name | Type | Description                                   |
|----------------|------|-----------------------------------------------|
| label, title   | text | `- Section::Customer`<br/>`- title: Customer` |

> `label` and `title` attribute follows the `label` default parsing behavior.

## Tabs

- Default Wrapped by Form Cell: `false`,
- Default Grid Column Span: `12`.

### Tab

| Attribute Name | Type | Description                |
|----------------|------|----------------------------|
| title          | text | Tab title.                 |
| marker         | text | Tab marker, global unique. |
| badge          | text | Tab title badge.           |

> `title` and `badge` attribute follows the `label` default parsing behavior.

The configuration of tab content is the same as `Section`, except follows,

- No `title` attribute, which has already been used in tab title,
- No `label` attribute.

## Wizard

- Default Wrapped by Form Cell: `false`,
- Default Grid Column Span: `12`.

| Attribute Name | Type         | Description                                                                                                                            |
|----------------|--------------|----------------------------------------------------------------------------------------------------------------------------------------|
| balloon        | boolean      | Use ballon style or not, default true.                                                                                                 |
| emphasisActive | boolean      | Enable active emphasis animation or not, default true.                                                                                 |
| freeWalk       | boolean      | Freely switch between all the steps or not, default false.                                                                             |
| omitWalker     | boolean      | Omit the default step switching buttons (forward/backward) or not, default false.                                                      |
| reached        | number, text | Number represents step index (starts from 0), text represents step marker. All steps before the specified step can be switched freely. |

### Wizard Step (WStep)

| Attribute Name | Type | Description                |
|----------------|------|----------------------------|
| title          | text | Tab title.                 |
| marker         | text | Tab marker, global unique. |

> `title` attribute follows the `label` default parsing behavior.

The configuration of tab content is the same as `Section`, except follows,

- No `title` attribute, which has already been used in tab title,
- No `label` attribute.

### Wizard Shared Content (WShared)

| Attribute Name | Type    | Description                                                                |
|----------------|---------|----------------------------------------------------------------------------|
| lead           | boolean | Shared content block comes before each step content or not, default false. |

The configuration of tab content is the same as `Section`, except follows,

- No `title` attribute,
- No `label` attribute.

## Caption, Label

- Default Wrapped by Form Cell: `true`,
- Default Grid Column Span: `3`.

| Attribute Name | Type    | Description                                                                                               |
|----------------|---------|-----------------------------------------------------------------------------------------------------------|
| label, text    | text    | `- Caption::Customer Name`<br/>`- label: Customer Name`                                                   |
| labelOnValue   | boolean | `- labelOnValue: true`                                                                                    |
| valueToLabel   | various |                                                                                                           |
| click          | text    | `- click: alert message`<br/>`- click: alert:message`<br/>`- click: dialog key`<br/>`- click: dialog:key` |

`Caption` and `Label` have slight differences.

- For `Caption`, the model value must be explicitly specified; otherwise, only the given `label` will be used,
	- While defining `valueToLabel`, the parser will automatically set `labelOnValue` to `true`,
- For `Label`, defaults to using the model value and ignores the `label` attribute,
- For both, while defining `text`, will ignore the `label` attribute.

> `label` and `text` attribute follows the `label` default parsing behavior.

### Syntax of `valueToLabel`:

- ``valueToLabel: `value` ``: If using `Caption` and specifying to use the model value, no additional decoration applied. If using `Label`,
  this can be ignored.
- ``valueToLabel: `value ?? ''` ``: Use empty text instead when value is `null`,
- ``valueToLabel: `$.nf0(value)` ``: Format the value, by `#0,000`,
- ``valueToLabel: `$.nf1(value)` ``: Format the value, by `#0,000.0`,
- ``valueToLabel: `$.nf2(value)` ``: Format the value, by `#0,000.00`,
- ``valueToLabel: `$.nfx(value)` ``: Format the value, by `#0,000.000`, `x` could be `3` to `99`, identify the fraction digits,
- ``valueToLabel: `$.nf(0, false)(value)` ``: Format with the given parameters, keep 0 fraction digits, and do not use thousands separator
  in
  the example.
- ``valueToLabel: `$.df(value)` ``: Parse the value by default datetime format and format it to default date format.
	- Default datetime format: `getDefaultCalendarDatetimeFormat`,
	- Default date format: `getDefaultCalendarDateFormat`,
	- Change default formats: `setCalendarDefaults`,
- ``valueToLabel: `$.df(value, {from: 'YYYY/MM/DD', to: 'DD/MM/YYYY''})` ``: Parse the value by given `from format` and format it
  to `to format`,
	- `from` and `to` are optional, will use corresponding default format when ignored.

Some examples:

```markdown
- Label::Name::name
- Label::Middle Name::middleName
	- valueToLabel: `value ?? ''`
- Caption::Middle Name::middleName
	- valueToLabel: `value ?? ''`
```

> Because `Caption` is also enhanced by `Form Cell` by default, the behavior of the `label` attribute on `Caption` may seem strange. When
> not specifying using data from the model value, the same `label` will be displayed twice. Therefore, if you only want to use `Caption` but
> don't want it to be displayed twice, you should use `Caption::`. This way, the system no longer considers it enhanced by `Form Cell` and
> it will not be displayed twice. This usage is common in `Table`, and we will discuss it in more detail later.

### Syntax of `click`

`click` requires external support in order to respond to the defined event. For example:

```typescript jsx
import {BaseModel, PropValue} from '@rainbow-d9/n1';
import {PageDef} from '@rainbow-d9/n2';

const markdown = `# Page
- Label::Customer::name
	- valueToLabel: value ?? ''
	- click: dialog:customerDetails
`;
const DialogDefs: Record<string, PageDef> = {
	// ...
};
const Dialogs = () => {
	const {on, off} = useGlobalEventBus();
	const {show: showDialog} = useDialog();
	useEffect(() => {
		const openDialog = async <R extends BaseModel, M extends PropValue>(
			def: PageDef, models?: { root: R; model: M; }) => {
			showDialog(<>
				{title}
				<DialogBody>
					<StandaloneRoot {...someDialogDef} $root={model as BaseModel}/>
				</DialogBody>
				{footer}
			</>);
		};
		const onCustomEvent = <R extends BaseModel, M extends PropValue>(
			key: string, models?: { root: R; model: M; }) => {
			if (key.startsWith('dialog ') || key.startsWith('dialog:')) {
				const dialogKey = key.slice('dialog '.length).trim();
				if (VUtils.isNotEmpty(dialogKey)) {
					const def = DialogDefs[dialogKey];
					if (def !== null) {
						(async () => await openDialog(def, models))();
					} else {
						console.log(`Custom event[key=${key}] is ignored since no definition found by given dialog key[${dialogKey}].`);
					}
				} else {
					console.log(`Custom event[key=${key}] is ignored since no dialog key detected.`);
				}
			} else {
				console.log(`Custom event[key=${key}] is ignored.`);
			}
		};
		on(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		return () => {
			off(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
		};
	});
}
const Page = () => {
	const def = parseDoc(markdown);

	// alert handled by <Alert/>, so no additional supporte required
	// dialog is using custom event, which needs to supported by <Dialogs />, and bridge to <Dialog />
	return <GlobalEventBusProvider>
		<Alert/>
		<Dialog/>
		<Dialogs/>
		<StandaloneRoot $root={model} {...def} />
	</GlobalEventBusProvider>;
};
```

## Input, Number

- Default Wrapped by Form Cell: `true`,
- Default Grid Column Span: `3`,
- Declared Built-in Validation: `required`, `numeric`, `integer`, `positive`, `notNegative`, `length`, `regex`.

Some examples:

```markdown
- Input::Name::name
	- required
	- length: ..10; At most 10 characters for name.
- Number::Age::age
	- required
	- integer
	- positive
```

> The given regular expression will first match against the predefined expressions, and if no match is found, it will directly parse the
> string as a regular expression. If the given string ends with `/i`, it is case-insensitive.  
> Predefine regular expressions through `ValidatorUtils.registerRegexps`.

### Decoration

`Input` and `Number` can have decorations, including leadings and tailings. Both leadings and tailings support standard strings or built-in
icons. If you want to use built-in icons, you need to use `$icons.` followed by the icon name, for example, `$icons.date`.

```markdown
- Input::Name::name
	- leads: $icons.date
	- tails: $icons.time
```

> Multiple decorators could be split by `;`.  
> Decoration also supported for `Button`, `Caption`, `Label`.

## Textarea

- Default Wrapped by Form Cell: `true`,
- Default Grid Column Span: `3`,
- Declared Built-in Validation: `required`, `length`.

Some examples:

```markdown
- Textarea::Description::desc
	- required
	- length: 10..256
```

## Checkbox, Radio

- Default Wrapped by Form Cell: `true`,
- Default Grid Column Span: `3`,
- Declared Built-in Validation: `required`.

| Attribute Name | Type | Description                        |
|----------------|------|------------------------------------|
| values         | text | `- values: Y`<br/>`- values: Y, N` |

### Syntax of `values`

The default values for a checkbox are `true` and `false`, where any value other than `true` is considered as `false` in the display logic.
However, if the actual model value is not of boolean type, such as `1` and `0`, `Y` and `N`, `T` and `F`, etc., it needs to be explicitly
specified.

> It is important to note that in JavaScript, the value `1` is considered as `true`.

> Radio is a unidirectional form of Checkbox, which means that once selected, it cannot be unselected.

Some examples:

```markdown
- Checkbox::Agree::agreed
	- required
	- values: Y, N
- Checkbox::Agree::agreed
	- required
	- values: Y
- Checkbox::Agree::agreed
	- required
	- values: , N
```

> Typically, `values` appear in pairs, but in reality, having only one value is also allowed. However, we generally do not
> recommend such loose data definition as it can lead to data confusion to some extent.

## Dropdown, MultiDropdown

- Default Wrapped by Form Cell: `true`,
- Default Grid Column Span: `3`,
- Declared Built-in Validation: `required`.

| Attribute Name   | Type    | Description                                                     |
|------------------|---------|-----------------------------------------------------------------|
| sort, optionSort | text    | `- sort: asc`<br/>`- sort: desc`<br/>Value is case insensitive. |
| options          | various |                                                                 |

### Syntax of `options`

- `options: value: label[; value: label[; value: label...]]`: Static options can be defined by separating each option with a semicolon and
  separating the value and label with a colon,
- Use sub-lists to define options, where each sublist item represents an option, and use a colon to separate the value and label,
- `options: @ext.keys`: referencing external definitions is also possible.

Some examples:

```markdown
- Dropdown::Agree::agreed
	- required
	- options: Y: Yes; N: No
- Checkbox::Agree::agreed
	- required
	- options:
		- Y: Yes
		- N: No
- Checkbox::Agree::agreed
	- required
	- options: @ext.codes.yesNoOptions
```

> `codes.yesNoOptions` depends on external definitions, it must follow signature `DropdownDef['options']`.

## Checkboxes (Checks), Radios

In fact, Checkboxes and Radios are just alternative representations of `MultiDropdown` and `Dropdown`, respectively. Therefore, all
the parameters are the same.

> When there are too many options (usually limited to 5 or 6), it is not recommended to use a combination of checkboxes and radios, but
> rather to revert to a `MultiDropdown` or `Dropdown` form.


Due to the differences in presentation, Checkboxes and Radios have additional rendering parameters:

| Attribute Name | Type    | Description                                                                                                 |
|----------------|---------|-------------------------------------------------------------------------------------------------------------|
| columns        | number  | Number of columns in option arrangement.                                                                    |
| compact        | boolean | When there are multiple options in a row, whether to display them continuously or in a table column format. |

## Calendar, DateTime, Date

- Default Wrapped by Form Cell: `true`,
- Default Grid Column Span: `3`,
- Declared Built-in Validation: `required`.

| Attribute Name | Type    | Description                                                                                       |
|----------------|---------|---------------------------------------------------------------------------------------------------|
| please         | text    | `- please: Please select...`                                                                      |
| clearable      | boolean | `- !clearable`<br/>`- clearable: false`<br/>Allowed to clear the selected value or not.           |
| dateFormat     | text    | `- dateFormat: YYYY/MM/DD`, follows `Dayjs`.                                                      |
| time           | boolean | `- time: false`, only for `Calendar`                                                              |
| timeFormat     | text    | `- timeFormat: HH:mm:ss`, follows `Dayjs`                                                         |
| storeFormat    | text    | `- storeFormat: YYYY/MM/DD HH:mm:ss`, follows `Dayjs`                                             |
| autoConfirm    | boolean | `- autoConfirm: true`<br/>Selected value should be applied to model automatically on blur or not. |
| fixedTimeAt    | json    | For `Calendar`, works when time is false; and for `Date`.                                         | 
| initTimeAt     | json    | For `Calendar`, typically it is not need for date only.                                           | 

> Automatically detect the time format to determine whether to display minutes and seconds. When seconds are present in the time format,
> minutes will always be displayed.

### Formats

All formats have default values, see below for more details,

- `setCalendarDefaults`: to change default settings,
- `getDefaultCalendarDateFormat`: default of date format,
- `getDefaultCalendarTimeFormat`: default of time format,
- `getDefaultCalendarDatetimeFormat`: default of store format.

Introduce more `Dayjs` plugins to support additional date formats. For example, to support the Buddhist calendar:

```typescript
// in your entrypoint, make sure it runs before rendering
import dayjs from 'dayjs';
import BuddhistEra from 'dayjs/plugin/buddhistEra';

dayjs.extend(BuddhistEra);
```

### Auto Confirm

Auto confirm selected value on blur has default value, see below for more details,

- `setCalendarDefaults`: to change default settings,
- `isCalendarAutoConfirm`: default of autoConfirm.

### Fixed Time At, Initial Time At

- `- fixedTimeAt: start` or `- fixedTimeAt: 0`: fix at `00:00:00.0`,
- `- fixedTimeAt: end`: fix at `23:59:59.999`,
- `- fixedTimeAt: 01:00:00`: fix at `01:00:00.0`. Any valid time not `23:59:59`, millisecond should be set as `0`,
- `- fixedTimeAt: 23:59:59`: fix at `23:59:59.999`,
- `- fixedTimeAt: 23:59:59.1`: fix at `23:59:59.001`,
- `- fixedTimeAt: 23:59:59.12`: fix at `23:59:59.012`,
- `- fixedTimeAt: 23:59:59.123`: fix at `23:59:59.123`.

Some examples:

```markdown
- Calendar::Date of Birth::dob
	- required, !time
	- fixedTimeAt: start
- Date::Date of Birth::dob
	- required
	- fixedTimeAt: 0
- DateTime::Registration Time::registrationTime
	- required, !clearable
```

## Button

- Default Wrapped by Form Cell: `true`,
- Default Grid Column Span: `3`.

| Attribute Name | Type    | Description                                                                          |
|----------------|---------|--------------------------------------------------------------------------------------|
| head           | text    | `- head: **`<br/>Text before `text`.                                                 |
| text           | text    | `- text: Click Me`                                                                   |
| tail           | text    | `- tail: **`<br/>Text after `text`.                                                  |
| ink            | text    | `- ink: primary`<br/>One of `primary`, `danger`, `warn`, `success`, `info`, `waive`. |
| fill           | text    | `- fill: plain`<br/>One of `link`, `plain`, `fill`.                                  |
| click          | various |                                                                                      |

### Syntax of `click`

#### Alert and Dialog

Regarding Alert and Dialog, please refer to the description for `Caption` as it remains consistent.

#### Validation

- `click: validate`, `click: validate me`, `click: validate:me`: automatically detect the validation range and trigger validation. The
  detection of the validation range is done in the following order:
	- Whether the range is specified on the button,
	- Whether it is within the range of array sub-elements,
	- The closest container range among ancestors,
	- The entire range starting from the root node.
- `click: validate block`, `click: validate:block`: automatically detect the validation range and trigger validation. The detection of the
  validation range is done in the following order:
	- Whether it is within the range of array sub-elements,
	- The closest container range among ancestors,
	- The entire range starting from the root node.
- `click: validate all`, `click: validate:all`: trigger validation, the entire range starting from the root node,
- `click: validate scope1[, scope2[, scope3...]]`, `click: validate:scope1[; scope2[; scope3...]]`, `click: validate:scope1[ scope2[ scope3...]]`:
  trigger validation, limited to the given scopes only. If multiple scopes are triggered simultaneously, use a comma or semicolon or blank
  space as separators. All widgets that match at least one scope will trigger automatic validation.

Some examples:

```markdown
- Button::
	- ink: danger
	- fill: link
	- click: validate block
```

## Button Bar

- Default Wrapped by Form Cell: `false`,
- Default Grid Column Span: `12`.

| Attribute Name | Type | Description                                               |
|----------------|------|-----------------------------------------------------------|
| alignment      | text | `- alignment: left`<br/>One of `left`, `center`, `right`. |

Some examples:

```markdown
- ButtonBar::
	- alignment: center
```

## Pagination

- Default Wrapped by Form Cell: `false`,
- Default Grid Column Span: `12`.

| Attribute Name       | Type         | Description                                             |
|----------------------|--------------|---------------------------------------------------------|
| freeWalk             | boolean      | `- freeWalk`, render a dropdown for choose page number. |
| maxButtons           | number       | `- maxButtons: 5`, how many page number buttons.        |
| sizes, possibleSizes | number array | `- sizes: 5;10`, split by `;`.                          |

## Ribs, RibsView

- Default Wrapped by Form Cell: `false`,
- Default Grid Column Span: `12`.

| Attribute Name        | Type     | Description                                                                           |
|-----------------------|----------|---------------------------------------------------------------------------------------|
| elementTitle, caption | various  | `- elementTitle: propertyPath`                                                        |
| noElementReminder     | text     | `- noElementReminder: No Data`                                                        |
| addable               | boolean  | `- !addable`<br/>Not available for `RibsView`.                                        |
| addLabel              | text     | `- addLabel: Create New One`                                                          |
| elementAdded          | function | From external definition only, starts with `@ext.`.<br/>Not available for `RibsView`. |
| createElement         | function | From external definition only, starts with `@ext.`.<br/>Not available for `RibsView`. |
| removable             | boolean  | `- !removable`.<br/>Not available for `RibsView`.                                     |
| removeLabel           | text     | `- removeLabel: Remove This One`.<br/>Not available for `RibsView`.                   |
| elementRemoved        | function | From external definition only, starts with `@ext.`.<br/>Not available for `RibsView`. |
| couldRemoveElement    | function | From external definition only, starts with `@ext.`.<br/>Not available for `RibsView`. |
| getElementKey         | function | From external definition only, starts with `@ext.`.                                   |

### Syntax of `elementTitle` and `caption`

In addition to directly defining an attribute with its value as the title of the element, this attribute also supports the same syntax as
the `Caption`.

> `elementTitle` and `caption` attribute follows the `label` default parsing behavior.

Some examples:

```markdown
- Ribs::
	- caption: name
	- noElementReminder: No Data
	- Input::Name::name
	- Dropdown::Gender::gender
		- options: F: Female; M: Male
```

> `Ribs` and `RibsView` are array widgets, and the layout of each element can be described using a sublist. It is important to note that the
> sublist needs to be placed after the attributes list.

## Table

- Default Wrapped by Form Cell: `false`,
- Default Grid Column Span: `12`.

| Attribute Name               | Type                      | Description                                                                                                                                                                                                          |
|------------------------------|---------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| headers                      | various                   |                                                                                                                                                                                                                      |
| headerHeight                 | number, text              | `- headerHeight: 48`<br/>`- headerHeight: 2em`                                                                                                                                                                       |
| expandable                   | boolean                   | `- expandable`                                                                                                                                                                                                       |
| fixedLeadColumns             | number                    | `- fixedLeadColumns: 2`                                                                                                                                                                                              |
| fixedTailColumns             | number                    | `- fixedTailColumns: 1`                                                                                                                                                                                              |
| hideClassicCellsOnExpandable | boolean                   | `- hideClassicCellsOnExpandable`                                                                                                                                                                                     |
| clickToExpand                | boolean                   | `- clickToExpand`                                                                                                                                                                                                    |
| maxBodyHeight                | number, text              | `- maxBodyHeight: 300`<br/>`- maxBodyHeight: 80vh`                                                                                                                                                                   |
| operatorsColumnWidth         | number, text              | `- operatorsColumnWidth: 200`                                                                                                                                                                                        |
| rowIndexStartsFrom           | number                    | `- rowIndexStartsFrom: 21`                                                                                                                                                                                           |
| omitDefaultRowOperators      | boolean, `remove`, `fold` | `- omitDefaultRowOperators: true`: omit all default row operators,<br/>`- omitDefaultRowOperators: remove`: omit default remove row operator,<br/>`- omitDefaultRowOperators: fold`: omit default fold row operator. |
| RowOperators                 | various                   |                                                                                                                                                                                                                      |
| noElementReminder            | text                      | `- noElementReminder: No Data`                                                                                                                                                                                       |
| addable                      | boolean                   | `- !addable`<br/>Not available for `RibsView`.                                                                                                                                                                       |
| addLabel                     | text                      | `- addLabel: Create New One`                                                                                                                                                                                         |
| elementAdded                 | function                  | From external definition only, starts with `@ext.`.<br/>Not available for `RibsView`.                                                                                                                                |
| createElement                | function                  | From external definition only, starts with `@ext.`.<br/>Not available for `RibsView`.                                                                                                                                |
| removable                    | boolean                   | `- !removable`.<br/>Not available for `RibsView`.                                                                                                                                                                    |
| removeLabel                  | text                      | `- removeLabel: Remove This One`.<br/>Not available for `RibsView`.                                                                                                                                                  |
| elementRemoved               | function                  | From external definition only, starts with `@ext.`.<br/>Not available for `RibsView`.                                                                                                                                |
| couldRemoveElement           | function                  | From external definition only, starts with `@ext.`.<br/>Not available for `RibsView`.                                                                                                                                |
| getElementKey                | function                  | From external definition only, starts with `@ext.`.                                                                                                                                                                  |
| Pagination                   | various                   |                                                                                                                                                                                                                      |

### Syntax of `headers`

When defining a table, it is necessary to first define all the column headers. The widget will calculate whether a scrollbar is needed based
on the number of column headers and the total width. It will also determine which child elements should be displayed in the classic table
and which ones should be displayed after expanding the row.

The definition of table column headers is very simple, just look at an example to understand the several supported ways currently.

```markdown
## Table::Students::students

- $fc
- expandable, clickToExpand, !addable, !removable, hideClassicCellsOnExpandable
- headers:
	- Name: 120
	- column:
		- label: Age
		- width: 80
- Caption::
	- property: name
- Caption::
	- property: age
- Input::Name::name
	- required
- Number::Age::age
	- required
	- positive
	- integer
```

### Syntax of `omitDefaultRowOperators`, `RowOperators`

Sometimes it is necessary to customize row operations or the style of row operations. You can use `omitDefaultRowOperators` to disable all
default row operation buttons, or selectively disable some of them.

If you want to add your own row operation buttons, you can use `RowOperators` for full customization. `RowOperators` is a collection of
buttons, and you can use any buttons you want. Sometimes, for styling purposes, if you don't need the default row operations but still need
the default behavior, you can use `prebuilt` to specify. Note that after specifying `prebuilt`, the `click` won't work.

```markdown
## Table::Students::students

- RowOperators::
	- Button::
		- text: X
		- fill: plain
		- click: alert: X
	- Button::
		- fill: plain
		- tails: $icons.view
		- click: alert: View
	- Button::
		- fill: plain
		- tails: $icons.edit
		- click: alert: Edit
	- Button::
		- fill: plain
		- tails: $icons.remove
		- prebuilt: remove
	- Button::
		- fill: plain
		- tails: $icons.expand
		- prebuilt: expand
	- Button::
		- fill: plain
		- tails: $icons.collapse
		- prebuilt: collapse
```

### Syntax of `Pagination`

Just like the standard 'Pagination' definition, if the 'valueChanged' definition represents that the data source comes from outside, only
retrieve the data for the current page when the pagination changes.

```markdown
### Table::

- Pagination::::pageable
	- freeWalk
	- maxButtons: 3
	- sizes: 5;10;15
	- valueChanged: @ext.table2.onPageChanged
```

The `property` of `Pagination` is very important. It uses the model of `Table` and obtains a `Pagination` model from this model. If it fails
to obtain one, it creates a default one and writes it back to the model of `Table`. The default model is as follows:

```typescript
export interface PaginationData {
	// default 20
	pageSize: number;
	// default 1, starts from 1
	pageNumber: number;
	// default 1, event there is no data
	pageCount: number;
	// no value represents unknown
	itemCount: number;
}
```

# Logger

`d9-n3` provides a logging function called `N3Logger`, exactly same as `N1Logger`.
