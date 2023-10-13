import {createOrGetTranslateHelperSingleton, WidgetHelper} from '../widget';
import {N2ButtonTranslator} from './button';
import {N2ButtonBarTranslator} from './button-bar';
import {N2CalendarTranslator, N2DateTimeTranslator, N2DateTranslator} from './calendar';
import {N2CaptionTranslator, N2LabelTranslator} from './caption';
import {N2CheckboxTranslator} from './checkbox';
import {N2DropdownTranslator} from './dropdown';
import {N2InputTranslator} from './input';
import {N2NumberTranslator} from './number';
import {N2RibsTranslator, N2RibsViewTranslator} from './ribs';
import {N2SectionTranslator} from './section';
import {N2TableTranslator} from './table';
import {N2TextareaTranslator} from './textarea';

export const registerN2Widgets = (widgetHelper?: WidgetHelper) => {
	const {repository: repo} = widgetHelper ?? createOrGetTranslateHelperSingleton();

	repo.register(new N2InputTranslator(repo));
	repo.register(new N2NumberTranslator(repo));
	repo.register(new N2TextareaTranslator(repo));
	repo.register(new N2CheckboxTranslator(repo));
	repo.register(new N2DropdownTranslator(repo));
	repo.register(new N2DateTranslator(repo));
	repo.register(new N2DateTimeTranslator(repo));
	repo.register(new N2CalendarTranslator(repo));

	repo.register(new N2ButtonTranslator(repo));
	repo.register(new N2ButtonBarTranslator(repo));

	repo.register(new N2CaptionTranslator(repo));
	repo.register(new N2LabelTranslator(repo));

	repo.register(new N2RibsTranslator(repo));
	repo.register(new N2RibsViewTranslator(repo));
	repo.register(new N2TableTranslator(repo));
	repo.register(new N2SectionTranslator(repo));
};
