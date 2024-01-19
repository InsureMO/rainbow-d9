import {MBUtils} from '@rainbow-d9/n1';
import {useState} from 'react';
import {DemoMenu, DemoMenus, Demos} from './index';
import {DemoMenuHeader} from './widgets';

export const DemoLayoutMenus = (props: {
	route: Record<string, boolean>;
	onMenuClicked: (path: string) => (() => void);
}) => {
	const {route, onMenuClicked} = props;

	const [expanded, setExpanded] = useState(false);

	const onClicked = () => {
		if (!MBUtils.isTouchable()) {
			return;
		}
		setExpanded(!expanded);
	};

	return <DemoMenus data-menu-expanded={expanded}>
		<DemoMenuHeader onClick={onClicked}>Demo List</DemoMenuHeader>
		{Demos.map(demo => {
			return <DemoMenu key={demo.path} data-active={route[demo.path]} onClick={onMenuClicked(demo.path)}>
				{demo.label}
			</DemoMenu>;
		})}
	</DemoMenus>;
};
