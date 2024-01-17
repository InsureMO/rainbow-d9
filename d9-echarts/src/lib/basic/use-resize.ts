import {getInstanceByDom} from 'echarts';
import {MutableRefObject, useEffect} from 'react';

export const useResize = (ref: MutableRefObject<HTMLDivElement>, domInitialized: boolean) => {
	useEffect(() => {
		if (!domInitialized || ref.current == null) {
			return;
		}
		// add resize observer after initialization
		const chart = getInstanceByDom(ref.current);
		const resizeObserver = new ResizeObserver(() => {
			chart?.resize();
		});
		resizeObserver.observe(ref.current);
		return () => {
			resizeObserver?.disconnect();
		};
	}, [domInitialized, ref]);
};
