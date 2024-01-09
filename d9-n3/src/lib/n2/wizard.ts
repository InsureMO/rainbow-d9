import {ContainerDef, ExternalDefIndicator, NodeDef} from '@rainbow-d9/n1';
import {SectionDef, WizardDef, WizardSharedDef, WizardStepDef} from '@rainbow-d9/n2';
import {SpecificWidgetTranslator} from '../widget';
import {N2WidgetType} from './types';

export class N2WizardSharedTranslator extends SpecificWidgetTranslator<N2WidgetType.WIZARD_SHARED> {
	public getSupportedType(): N2WidgetType.WIZARD_SHARED {
		return N2WidgetType.WIZARD_SHARED;
	}

	public shouldWrapByFormCell(): boolean {
		return false;
	}

	public postWork<Def extends NodeDef>(def: Partial<Def>): Def {
		const defs = def as unknown as ContainerDef;
		const shareDef = defs as unknown as WizardSharedDef;
		if (shareDef.body == null || !(shareDef.body instanceof ExternalDefIndicator)) {
			shareDef.body = {
				$wt: N2WidgetType.SECTION,
				$pos: {$cols: 3},
				$nodes: defs.$nodes
			} as SectionDef;
			delete defs.$nodes;
		}
		return defs as unknown as Def;
	}
}

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

	public postWork<Def extends NodeDef>(def: Partial<Def>): Def {
		const defs = def as unknown as ContainerDef;
		const stepDef = defs as unknown as WizardStepDef;
		if (stepDef.body == null || !(stepDef.body instanceof ExternalDefIndicator)) {
			stepDef.body = {
				$wt: N2WidgetType.SECTION,
				$pos: {$cols: 12},
				$nodes: defs.$nodes
			} as SectionDef;
			delete defs.$nodes;
		}
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

	public postWork<Def extends NodeDef>(def: Partial<Def>): Def {
		const defs = def as unknown as ContainerDef;
		const {$nodes} = defs;
		(defs as unknown as WizardDef).shared = ($nodes ?? []).find(node => node.$wt === N2WidgetType.WIZARD_SHARED) as WizardSharedDef;
		(defs as unknown as WizardDef).contents = ($nodes ?? []).filter(node => node.$wt === N2WidgetType.WIZARD_STEP) as Array<WizardStepDef>;
		delete defs.$nodes;
		return defs as unknown as Def;
	}
}
