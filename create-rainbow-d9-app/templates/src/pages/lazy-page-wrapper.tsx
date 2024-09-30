import {JSX, LazyExoticComponent, Suspense} from 'react';

export const LazyPageWrapper = (LazyComponent: LazyExoticComponent<() => JSX.Element>) => {
	return () => (
		<Suspense fallback="Lazy component is loading ...">
			<LazyComponent/>
		</Suspense>
	);
};
