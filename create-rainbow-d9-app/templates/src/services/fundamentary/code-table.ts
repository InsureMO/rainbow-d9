import {DropdownOptions} from '@rainbow-d9/n2';
import {mock, mockAskCodeTableByCode} from '../../mock-services';
import {RC} from '../rest-client';

export const askCodeTableByCode = mock(async (code: string): Promise<DropdownOptions> => {
	return await RC.get<DropdownOptions>({api: RC.buildApi(RC.APIS.ASK_CODE_TABLE, {code})});
}).by(mockAskCodeTableByCode);
