import {DropdownOptions} from '@rainbow-d9/n2';
import {isMockEnabled} from '../../utils';

const mockCodeTables: Record<string, DropdownOptions> = {};

export const registerMockCodeTables = (codeTables: Record<string, DropdownOptions>) => {
	if (!isMockEnabled()) {
		// save memory
		return;
	}
	Object.keys(codeTables).forEach(key => mockCodeTables[key] = codeTables[key]);
};

/**
 * return empty array when not found.
 * all mock code tables are registered by `registerMockCodeTables`
 */
export const mockAskCodeTableByCode = async (code: string): Promise<DropdownOptions> => {
	return mockCodeTables[code] ?? [];
};
