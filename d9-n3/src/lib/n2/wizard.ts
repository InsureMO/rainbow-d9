import {ContainerDef, NodeDef} from '@rainbow-d9/n1';
import {SectionDef, WizardDef, WizardStepDef} from '@rainbow-d9/n2';
import {SpecificWidgetTranslator} from '../widget';
import {N2WidgetType} from './types';

export class N2WizardStepTranslator extends SpecificWidgetTranslator<N2WidgetType.WIZARD_STEP> {
	public getSupportedType(): N2WidgetType.WIZARD_STEP {
		return N2WidgetType.WIZARD_STEP;
	}

	public transformLabelAttributeName(): string {
		return 'title';
	}

	public shouldWrapByFormCell(): boolean {
		return false;
	}

	public getToWidgetAttributeNames(): Array<string> {
		return [...super.getToWidgetAttributeNames(), 'title'];
	}

	postWork<Def extends NodeDef>(def: Partial<Def>): Def {
		const defs = def as unknown as ContainerDef;
		(defs as unknown as WizardStepDef).body = {
			$wt: N2WidgetType.SECTION,
			$nodes: defs.$nodes
		} as SectionDef;
		delete defs.$nodes;
		return defs as unknown as Def;
	}
}

export class N2WizardTranslator extends SpecificWidgetTranslator<N2WidgetType.WIZARD> {
	public getSupportedType(): N2WidgetType.WIZARD {
		return N2WidgetType.WIZARD;
	}

	public beautifyProperties<Def extends NodeDef>(def: Partial<Def>): Def {
		return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
	}

	public shouldWrapByFormCell(): boolean {
		return false;
	}

	postWork<Def extends NodeDef>(def: Partial<Def>): Def {
		const defs = def as unknown as ContainerDef;
		(defs as unknown as WizardDef).contents = defs.$nodes as Array<WizardStepDef>;
		delete defs.$nodes;
		return defs as unknown as Def;
	}
}
