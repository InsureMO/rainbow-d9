![Static Badge](https://img.shields.io/badge/InsureMO-777AF2.svg)

![License](https://img.shields.io/github/license/InsureMO/rainbow-d9)
![GitHub Release](https://img.shields.io/github/v/release/InsureMO/rainbow-d9)
![GitHub Release Date](https://img.shields.io/github/release-date/InsureMO/rainbow-d9)
![GitHub last commit (by committer)](https://img.shields.io/github/last-commit/InsureMO/rainbow-d9)

![npm (scoped)](https://img.shields.io/npm/v/%40rainbow-d9/n1?logo=npm)

![React](https://img.shields.io/badge/react-087EA4.svg?logo=react)
![Module Formats](https://img.shields.io/badge/module%20formats-cjs%2C%20esm-green.svg)

# Idea of `d9`

The inspiration for `d9` comes from some complex business applications, where certain data display pages, due to the differences in their
business forms, make it difficult to standardize their behavior even with the support of mature UI widget libraries. The logical
relationship between different widgets on the same page makes it difficult to abstract local reusable business widgets, or it
requires a significant amount of time and effort to achieve the desired results. When customizing pages based on product baselines in
different projects, one must also understand a large amount of existing code logic in order to make modifications and extensions
effectively, resulting in low efficiency.

To fundamentally address these issues, `d9` departs from the typical approach of widget libraries focusing on the implementation of
individual widget behaviors. Instead, it first standardizes the behavior of all widgets' interactions with data at the underlying
level and defines them at an abstract level. Then, it defines the implementation of widgets based on these behaviors. With this approach,
all widgets, data, and the logical relationships between widgets are standardized. At the same time, `d9` also provides a set of basic
UI widgets for easy use. In addition to that, considering the diversity of page presentation, `d9` also supports bridging third-party
widgets to the underlying standard library to accommodate various presentation requirements.

Lastly, to better serve business professionals, `d9` not only supports programming approaches (including writing in the standard React way
and
writing based on JSON configuration), but also provides a way for business users to write using Markdown configuration. This allows project
stakeholders without programming backgrounds to independently write pages without the need for developers.

In summary, the design principles of `d9` can be briefly summarized as follows:

- Standardize the presentation behavior of page widgets,
- Standardize the interaction between page widgets and data,
- Separate the implementation from the widget implementation at the underlying level, providing the ability to integrate any third-party
  widgets,
- Provide the ability to parse and render pages based on Markdown.

# Modules

Currently, `d9` is divided into three submodules:

- [d9-n1](https://github.com/InsureMO/rainbow-d9/blob/main/d9-n1/README.md): the underlying module,
- [d9-n2](https://github.com/InsureMO/rainbow-d9/blob/main/d9-n2/README.md): the widget library,
- [d9-n3](https://github.com/InsureMO/rainbow-d9/blob/main/d9-n3/README.md): the Markdown parsing library.
- [d9-n5](https://github.com/InsureMO/rainbow-d9/blob/main/d9-n5/README.md): the `d9` playground.
- [d9-n6](https://github.com/InsureMO/rainbow-d9/blob/main/d9-n5/README.md): the [`o23`](https://github.com/InsureMO/rainbow-o23)
  playground.
- [d9-echarts](https://github.com/InsureMO/rainbow-d9/blob/main/d9-echarts/README.md): the echarts widget library,
- [d9-thai-plan-selection](https://github.com/InsureMO/rainbow-d9/blob/main/d9-thai-plan-selection/README.md): the plan selection widget,
  collaborate with the Thai Cloud team.

| If You                                                                         | Modules You Need            | Install Command                          |
|--------------------------------------------------------------------------------|-----------------------------|------------------------------------------|
| Develop library based on `d9` core                                             | `d9-n1`                     | `yarn add @rainbow-d9/n1`                |
| Develop project based on `d9` widget, programmatically                         | `d9-n1` + `d9-n2`           | `yarn add @rainbow-d9/n2`                |
| Develop project based on `d9` widget, markdown configured                      | `d9-n1` + `d9-n2` + `d9-n3` | `yarn add @rainbow-d9/n2 @rainbow-d9/n3` |
| Develop project based on `d9` core, with your own widgets, markdown configured | `d9-n1` + `d9-n3`           | `yarn add @rainbow-d9/n3`                |
