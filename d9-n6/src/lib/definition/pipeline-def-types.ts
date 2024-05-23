export type PipelineStepRegisterKey = string;

export interface PipelineStepDef {
	name: string;
	use: PipelineStepRegisterKey;
}
