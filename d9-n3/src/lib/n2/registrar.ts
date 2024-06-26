import {createOrGetTranslateHelperSingleton, WidgetHelper} from '../widget';
import {N2BoxTranslator} from './box';
import {N2ButtonTranslator, N2LinkTranslator} from './button';
import {N2ButtonBarTranslator} from './button-bar';
import {N2CalendarTranslator, N2DateTimeTranslator, N2DateTranslator, N2TimeTranslator} from './calendar';
import {N2BadgeTranslator, N2CaptionTranslator, N2LabelTranslator} from './caption';
import {N2CheckboxTranslator} from './checkbox';
import {N2CheckboxesTranslator, N2ChecksTranslator} from './checkboxes';
import {N2DropdownTranslator} from './dropdown';
import {N2DDTTranslator, N2DropdownTreeTranslator} from './dropdown-tree';
import {
	N2DecorateInputTranslator,
	N2DecorateNumberTranslator,
	N2DecoratePasswordTranslator,
	N2InputTranslator,
	N2NumberTranslator,
	N2PasswordTranslator
} from './input';
import {N2MultiDropdownTranslator} from './multi-dropdown';
import {N2MDDTTranslator, N2MultiDropdownTreeTranslator} from './multi-dropdown-tree';
import {N2PaginationTranslator} from './pagination';
import {N2RadioTranslator} from './radio';
import {N2RadiosTranslator} from './radios';
import {N2RibsTranslator, N2RibsViewTranslator} from './ribs';
import {N2SectionTranslator} from './section';
import {N2TableRowOperatorsTranslator, N2TableTranslator} from './table';
import {N2TabsTranslator, N2TabTranslator} from './tabs';
import {N2TextareaTranslator} from './textarea';
import {N2TreeTranslator} from './tree';
import {N2WizardSharedTranslator, N2WizardStepTranslator, N2WizardTranslator} from './wizard';

export const registerN2Widgets = (widgetHelper?: WidgetHelper) => {
	const {repository: repo} = widgetHelper ?? createOrGetTranslateHelperSingleton();

	repo.register(new N2InputTranslator(repo));
	repo.register(new N2NumberTranslator(repo));
	repo.register(new N2PasswordTranslator(repo));
	repo.register(new N2DecorateInputTranslator(repo));
	repo.register(new N2DecorateNumberTranslator(repo));
	repo.register(new N2DecoratePasswordTranslator(repo));
	repo.register(new N2TextareaTranslator(repo));
	repo.register(new N2CheckboxTranslator(repo));
	repo.register(new N2CheckboxesTranslator(repo));
	repo.register(new N2ChecksTranslator(repo));
	repo.register(new N2RadioTranslator(repo));
	repo.register(new N2RadiosTranslator(repo));
	repo.register(new N2DropdownTranslator(repo));
	repo.register(new N2MultiDropdownTranslator(repo));
	repo.register(new N2DateTranslator(repo));
	repo.register(new N2DateTimeTranslator(repo));
	repo.register(new N2TimeTranslator(repo));
	repo.register(new N2CalendarTranslator(repo));

	repo.register(new N2ButtonTranslator(repo));
	repo.register(new N2LinkTranslator(repo));
	repo.register(new N2ButtonBarTranslator(repo));

	repo.register(new N2CaptionTranslator(repo));
	repo.register(new N2LabelTranslator(repo));
	repo.register(new N2BadgeTranslator(repo));

	repo.register(new N2RibsTranslator(repo));
	repo.register(new N2RibsViewTranslator(repo));

	repo.register(new N2TableRowOperatorsTranslator(repo));
	repo.register(new N2TableTranslator(repo));

	repo.register(new N2SectionTranslator(repo));
	repo.register(new N2BoxTranslator(repo));

	repo.register(new N2TabTranslator(repo));
	repo.register(new N2TabsTranslator(repo));

	repo.register(new N2WizardSharedTranslator(repo));
	repo.register(new N2WizardStepTranslator(repo));
	repo.register(new N2WizardTranslator(repo));
	repo.register(new N2TreeTranslator(repo));
	repo.register(new N2DropdownTreeTranslator(repo));
	repo.register(new N2DDTTranslator(repo));
	repo.register(new N2MultiDropdownTreeTranslator(repo));
	repo.register(new N2MDDTTranslator(repo));
	repo.register(new N2PaginationTranslator(repo));
};
