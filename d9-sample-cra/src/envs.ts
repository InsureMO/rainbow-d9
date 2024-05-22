import {registerCharts} from '@rainbow-d9/echarts';
import {MUtils, N1Logger, PPUtils, VUtils} from '@rainbow-d9/n1';
// import all n2 widgets
import '@rainbow-d9/n2';
import {CalendarUtils} from '@rainbow-d9/n2';
import {registerN2Widgets, Widget} from '@rainbow-d9/n3';
import {registerPlayground} from '@rainbow-d9/n5';
import {registerPlayground as registerO23Playground} from '@rainbow-d9/n6';
import {registerPlanSelect} from '@rainbow-d9/thai-plan-selection';
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
	registerPlanSelect(widgetsHelper);
	registerPlayground(widgetsHelper);
	registerO23Playground(widgetsHelper);
	// set widgets parameters
	// calendar
	CalendarUtils.setCalendarDefaults({
		dateFormat: 'DD/MM/YYYY',
		// timeFormat: askDisplayTimeFormat(),
		// datetimeFormat: askDateTimeFormat(),
		useCalendarIcon: true
	});
})();

// attach anything on window, then you can use it in snippet
window.VUtils = VUtils;
window.PPUtils = PPUtils;
window.MUtils = MUtils;
