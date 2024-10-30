import './echarts-envs';
import {registerCharts} from '@rainbow-d9/echarts';
import {MUtils, N1Logger, PPUtils, VUtils} from '@rainbow-d9/n1';
// import all n2 widgets
import '@rainbow-d9/n2';
import {CalendarUtils, DropdownUtils, RibsUtils} from '@rainbow-d9/n2';
import {registerN2Widgets, useDynamicFuncsInScriptTag, Widget} from '@rainbow-d9/n3';
import dayjs from 'dayjs';
import ArraySupport from 'dayjs/plugin/arraySupport';
import BuddhistEra from 'dayjs/plugin/buddhistEra';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import Duration from 'dayjs/plugin/duration';
import IsToday from 'dayjs/plugin/isToday';
import ObjectSupport from 'dayjs/plugin/objectSupport';
import QuarterOfYear from 'dayjs/plugin/quarterOfYear';
import RelativeTime from 'dayjs/plugin/relativeTime';
import UTC from 'dayjs/plugin/utc';
import WeekOfYear from 'dayjs/plugin/weekOfYear';
import {askDateFormat, askStoreDateTimeFormat, askTimeFormat, asT, defendCSPNoUnsafe} from '../utils';

// datetime functions
dayjs.extend(WeekOfYear);
dayjs.extend(QuarterOfYear);
dayjs.extend(Duration);
dayjs.extend(IsToday);
dayjs.extend(RelativeTime);
dayjs.extend(ArraySupport);
dayjs.extend(ObjectSupport);
dayjs.extend(CustomParseFormat);
dayjs.extend(UTC);
dayjs.extend(BuddhistEra);

(() => {
	// d9 logger
	if (process.env.VITE_ENABLE_D9_LOGGER === 'true') {
		N1Logger.enableLevel('debug');
	}
	// register widgets to n3
	const widgetsHelper = Widget.createOrGetTranslateHelperSingleton();
	registerN2Widgets(widgetsHelper);
	registerCharts(widgetsHelper);
	if (defendCSPNoUnsafe()) {
		const meta = [...document.head.children]
			.filter(child => child.tagName === 'META')
			.find(child => child.getAttribute('property') === 'csp-nonce');
		if (meta == null) {
			console.error('Failed to defend unsafe eval, csp-nonce meta tag[<meta property="csp-nonce" nonce="VITE_NONCE">] not found, world collapsed.');
		} else {
			// according to MDN, nonce might be hide from getAttribute,
			// it can be visited only by property name
			// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/nonce
			const nonce = asT<HTMLElement>(meta).nonce || meta.getAttribute('nonce');
			if (VUtils.isBlank(nonce)) {
				console.error('Failed to defend unsafe eval, nonce from csp-nonce meta tag[<meta property="csp-nonce">] is blank, world collapsed.');
			} else {
				// n3 create functions by script tag
				useDynamicFuncsInScriptTag(() => nonce!);
				// it is for styled-components, which will add styles in CSSStyleSheet dynamically
				// @ts-ignore
				window.__webpack_nonce__ = nonce;
			}
		}
	}
	// set widgets parameters
	// calendar
	CalendarUtils.setCalendarDefaults({
		dateFormat: askDateFormat(),
		timeFormat: askTimeFormat(),
		datetimeFormat: askStoreDateTimeFormat(),
		useCalendarIcon: true
	});
	DropdownUtils.setDropdownDefaults({
		fixFilter: true,
		findPortalCarrier: () => document.getElementById('app-frame')!
	});
	RibsUtils.setRibsDefaults({useSectionStyleIcons: true});
	// never switch to enabled in production, it is for debug only
	// switchCollapseFixedThingDebug(true);
})();

// attach anything on window, then you can use it in snippet
window.VUtils = VUtils;
window.PPUtils = PPUtils;
window.MUtils = MUtils;
