export interface $D9N3 {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	$dynamicFuncs: Record<string, Function>;
}

export interface $D9N3Window extends Window {
	$d9n3: $D9N3;
}

const $d9: $D9N3Window = window as unknown as $D9N3Window;
$d9.$d9n3 = {$dynamicFuncs: {}};

export const $d9n3 = $d9.$d9n3;

const DYNAMIC_FUNCS_BY_SCRIPT_TAG = {use: false, nonce: () => ''};
/**
 * enable create functions by script tag, to avoid CSP issue,
 * 1. without unsafe-eval
 * 2. with nonce
 * so the nonce function is required
 */
export const useDynamicFuncsInScriptTag = (nonce: () => string) => {
	DYNAMIC_FUNCS_BY_SCRIPT_TAG.use = true;
	DYNAMIC_FUNCS_BY_SCRIPT_TAG.nonce = nonce;
};
export const isUseDynamicFuncsInScriptTag = () => DYNAMIC_FUNCS_BY_SCRIPT_TAG.use;
export const nonce = () => DYNAMIC_FUNCS_BY_SCRIPT_TAG.nonce();
