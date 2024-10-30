import ReportCenterIcon from '../../assets/report-center.svg?react';
import ReportDownloadIcon from '../../assets/report-download.svg?react';
import ReportGenerateIcon from '../../assets/report-generate.svg?react';
import ReportMaintainIcon from '../../assets/report-maintain.svg?react';
import {AppMenuGroup, AppMenuType, buildMenuItemForRoute, Menus} from '../../global-settings';
import './generate';
import './maintain';
import './download';

Menus.register({
	code: 'report-center', type: AppMenuType.GROUP,
	icon: <ReportCenterIcon/>, text: 'Report Center',
	items: [
		buildMenuItemForRoute({
			code: 'report-maintain', icon: <ReportMaintainIcon/>, text: 'Report Maintain'
		}),
		buildMenuItemForRoute({
			code: 'report-generate', icon: <ReportGenerateIcon/>, text: 'Report Generate'
		}),
		buildMenuItemForRoute({
			code: 'report-download', icon: <ReportDownloadIcon/>, text: 'Report Download'
		})
	]
} as AppMenuGroup, 300);
