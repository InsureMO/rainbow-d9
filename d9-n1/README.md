# d9-n1

It is the No.1 project of group `d9`, which is created at 9th. Dec. 2022.  
This project is higher-order components for ui configuration, which describe the interfaces, behaviours of underlay widgets.

# Idea

The inspiration for `d9` comes from some complex business applications, where certain data display pages, due to the differences in their
business forms, make it difficult to standardize their behavior even with the support of mature UI component libraries. The logical
relationship between different block components on the same page makes it difficult to abstract local reusable business components, or it
requires a significant amount of time and effort to achieve the desired results. When customizing pages based on product baselines in
different projects, one must also understand a large amount of existing code logic in order to make modifications and extensions
effectively, resulting in low efficiency.

To fundamentally address these issues, `d9` departs from the typical approach of component libraries focusing on the implementation of
individual component behaviors. Instead, it first standardizes the behavior of all components' interactions with data at the underlying
level and defines them at an abstract level. Then, it defines the implementation of components based on these behaviors. With this approach,
all components, data, and the logical relationships between components are standardized. At the same time, `d9` also provides a set of basic
UI components for easy use. In addition to that, considering the diversity of page presentation, `d9` also supports bridging third-party
components to the underlying standard library to accommodate various presentation requirements.

Lastly, to better serve business professionals, `d9` not only supports programming approaches (including writing in the standard React way
and
writing based on JSON configuration), but also provides a way for business users to write using Markdown configuration. This allows project
stakeholders without programming backgrounds to independently write pages without the need for developers.

In summary, the design principles of `d9` can be briefly summarized as follows:

- Standardize the presentation behavior of page components,
- Standardize the interaction between page components and data,
- Separate the implementation from the component implementation at the underlying level, providing the ability to integrate any third-party
  components,
- Provide the ability to parse and render pages based on Markdown.

# Modules

Currently, `d9` is divided into three submodules:

- [d9-n1](https://github.com/InsureMO/rainbow-d9-n1): the underlying module, this one,
- [d9-n2](https://github.com/InsureMO/rainbow-d9-n2): the component library,
- [d9-n3](https://github.com/InsureMO/rainbow-d9-n3): the Markdown parsing library.

# Add Into Your Project

```bash
yarn add @d9/n1
```

> If you develop based on the `d9` component library or the `d9` Markdown configuration method, you can skip the above steps as this library
> will be installed along with the relevant libraries when you install them.

# Development Guide

## The Only Component

`d9-n1` provides a standalone root entrypoint, Typically, all internal pages are rendered based on configuration definitions.

```typescript jsx
import {NodeDef, StandaloneRoot} from '@d9/n1';
import {Fragment, useEffect} from 'react';

interface AppState {
	loaded: boolean;
	data?: BaseModel;
	def?: NodeDef;
}

const askState = async (): Promise<AppState> => {
	// ask data and page definition from remote
};

const App = () => {
	const [state, setState] = useState<AppState>({loaded: false});

	useEffect(() => {
		(async () => {
			setState(await askState());
		})();
	}, []);

	if (!state.loaded) {
		return <Fragment />;
	}

	return <StandaloneRoot $root={state.data!} {...def} />;
};
```

A simple page configuration (base on `d9-n2` components) might be as below,

```json
{
	"$wt": "Page",
	"$nodes": [
		{
			"$wt": "Input.FC",
			"label": "Name",
			"$pp": "name"
		}
	]
}
```

There is an input with label should be rendered, and bind value between via given property path (`$pp`).

## Components

### Types

In `d9`, there are only three types of components:

- Basic components, such as input, dropdown, etc.
- Container components, such as Section.
- Array components, such as tables.

All components are standardized under these three types of components.

### Location in Parent

`d9` components are positioned using the most popular grid system, and each component can be defined through declarations. It's important to
note that since the position of a component is defined relative to its parent container, the actual layout is not provided by `d9-n1`, but
rather by the implementation of the container itself. However, we recommend that all container implementations that can accommodate child
components follow the grid layout approach. To fully adapt to this layout, the position definition information of the components includes
four attributes: row, column, rowSpan, and colSpan. You can refer to `NodePosition` for details.
