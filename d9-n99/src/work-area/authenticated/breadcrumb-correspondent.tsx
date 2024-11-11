import {useEffect} from 'react';
import {AppEventTypes, useAppEventBus} from '../../bootstrap';
import {AppPage} from '../../global-settings';

export const BreadcrumbCorrespondent = (props: AppPage) => {
	const {renderer: Renderer, breadcrumb} = props;

	const {on, off, fire} = useAppEventBus();
	useEffect(() => {
		const onAskBreadcrumb = (onReply: (breadcrumb?: any) => void) => {
			onReply(breadcrumb);
		};
		on(AppEventTypes.ASK_BREADCRUMB, onAskBreadcrumb);
		return () => {
			off(AppEventTypes.ASK_BREADCRUMB, onAskBreadcrumb);
		};
	}, []);
	useEffect(() => {
		fire(AppEventTypes.BREADCRUMB_CHANGED, breadcrumb);
	}, [breadcrumb]);

	return <Renderer/>;
};
