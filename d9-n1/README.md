# d9-n1

It is the No.1 project of group `d9`, which is created at 9th. Dec. 2022.  
This project is higher-order components for ui configuration, which describe the interfaces, behaviours of underlay widgets.

# Idea

[d9](https://github.com/InsureMO/rainbow-d9/blob/main/README.md)

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
