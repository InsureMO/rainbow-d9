import {ObjectPropValue, PropValue, useForceUpdate, VUtils} from '@rainbow-d9/n1';
import {
	ButtonFill,
	ButtonInk,
	GlobalRoot,
	IntlLabel,
	UnwrappedButton,
	UnwrappedCaption,
	UnwrappedDecorateInput,
	UnwrappedDecoratePasswordInput,
	UnwrappedSection
} from '@rainbow-d9/n2';
import {ReactNode, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Code from '../../assets/2fa-code.svg?react';
import Pwd from '../../assets/password.svg?react';
import User from '../../assets/user.svg?react';
import {I18NAndD9N2Bridge} from '../../bootstrap';
import {authenticate, authenticate2FA} from '../../services';
import {getHomeRoute, isAuthentication2FAEnabled} from '../../utils';
import {useExternalSSO} from './use-external-sso';
import {Container} from './widgets';

interface Model extends ObjectPropValue {
	username?: string;
	password?: string;
	code2fa?: string;
}

enum Mode {
	PWD = 'pwd', CODE2FA = 'code-2fa'
}

interface AuthenticationState {
	mode: Mode;
	authenticating: boolean;
	error: boolean;
	message?: ReactNode;
}

/**
 * Here are some standard implementations of login pages, including:
 * - Username/password
 * - Username/password + 2FA authentication code
 * Other implementations can be developed as needed.
 */
export const Authentication = () => {
	const {current: model} = useRef<Model>({});
	const usernameRef = useRef<HTMLDivElement>(null);
	const pwdRef = useRef<HTMLDivElement>(null);
	const codeRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const [state, setState] = useState<AuthenticationState>({mode: Mode.PWD, error: false, authenticating: false});
	// also could be authed by external SSO as well
	useExternalSSO();
	const forceUpdate = useForceUpdate();
	const is2FAEnabled = isAuthentication2FAEnabled();

	const onUsernameChange = (value: PropValue) => {
		model.username = (value ?? '') as string;
		forceUpdate();
	};
	const onPasswordChange = (value: PropValue) => {
		model.password = (value ?? '') as string;
		forceUpdate();
	};
	const onCodeChange = (value: PropValue) => {
		model.code2fa = (value ?? '') as string;
		forceUpdate();
	};
	const validateOnPwdMode = (): boolean => {
		const usernameRequired = VUtils.isBlank(model.username);
		const pwdRequired = VUtils.isBlank(model.password);
		if (usernameRequired && pwdRequired) {
			setState(state => ({
				...state, error: true,
				message: <IntlLabel keys={['page.authentication.username-pwd.required']}
				                    value="Username and password are both required."/>
			}));
			usernameRef.current?.querySelector('input')?.focus();
			return false;
		} else if (usernameRequired) {
			setState(state => ({
				...state, error: true,
				message: <IntlLabel keys={['page.authentication.username.required']} value="Username is required."/>
			}));
			usernameRef.current?.querySelector('input')?.focus();
			return false;
		} else if (pwdRequired) {
			setState(state => ({
				...state, error: true,
				message: <IntlLabel keys={['page.authentication.pwd.required']} value="Password is required."/>
			}));
			pwdRef.current?.querySelector('input')?.focus();
			return false;
		}
		return true;
	};
	const validateOn2FACodeMode = (): boolean => {
		const codeRequired = VUtils.isBlank(model.code2fa);
		if (codeRequired) {
			setState(state => ({
				...state, error: true,
				message: <IntlLabel keys={['page.authentication.code2fa.required']}
				                    value="Authentication code is required."/>
			}));
			codeRef.current?.querySelector('input')?.focus();
			return false;
		}
		return true;
	};
	const doAuthentication = async (auth: () => Promise<{
		success: boolean;
		message?: ReactNode
	}>, defaultMessage: ReactNode): Promise<boolean> => {
		const {success, message} = await auth();
		if (!success) {
			setState(state => ({
				...state, error: true, message: message ?? defaultMessage, authenticating: false
			}));
			return false;
		}
		return true;
	};
	const onConfirmClick = async () => {
		switch (state.mode) {
			case Mode.PWD: {
				if (validateOnPwdMode()) {
					setState(state => ({
						...state, mode: Mode.PWD, error: false, message: (void 0), authenticating: true
					}));
					const success = await doAuthentication(async () => await authenticate({
						username: model.username!, password: model.password!
					}), <IntlLabel keys={['page.authentication.failed']}
					               value="Authentication failed, check username and password please."/>);
					if (success) {
						delete model.password;
						if (is2FAEnabled) {
							setState(state => ({...state, mode: Mode.CODE2FA, error: false, message: (void 0)}));
							// wait for re-render, code input is disabled now
							setTimeout(() => codeRef.current?.querySelector('input')?.focus(), 30);
						} else {
							navigate(getHomeRoute(), {replace: true});
						}
					}
				}
				break;
			}
			case Mode.CODE2FA: {
				if (validateOn2FACodeMode()) {
					setState(state => ({
						...state, mode: Mode.CODE2FA, error: false, message: (void 0), authenticating: true
					}));
					const success = await doAuthentication(async () => await authenticate2FA({
						username: model.username!, code2fa: model.code2fa!
					}), <IntlLabel keys={['page.authentication.failed2fa']}
					               value="Authentication failed, check authentication code please."/>);
					success && navigate(getHomeRoute(), {replace: true});
				}
				break;
			}
		}
	};
	const onToPwdClick = () => {
		delete model.password;
		setState(state => ({
			...state, mode: Mode.PWD, error: false, message: (void 0), authenticating: false
		}));
	};

	return <GlobalRoot>
		<I18NAndD9N2Bridge/>
		<Container data-w="page-authentication">
			<UnwrappedSection title={<IntlLabel keys={['page.authentication.title']} value="Welcome"/>}
			                  data-w="authentication-panel" data-mode={state.mode}>
				<UnwrappedCaption>
					{state.message}
				</UnwrappedCaption>
				<UnwrappedDecorateInput value={model.username ?? ''} onValueChange={onUsernameChange}
				                        disabled={state.mode !== Mode.PWD}
				                        placeholder="page.authentication.username.placeholder"
				                        data-di-for="username" ref={usernameRef}/>
				<span data-type="icon" data-for="username"><User/></span>
				<UnwrappedDecoratePasswordInput value={model.password ?? ''} onValueChange={onPasswordChange}
				                                disabled={state.mode !== Mode.PWD}
				                                placeholder="page.authentication.pwd.placeholder"
				                                data-di-for="pwd" ref={pwdRef}/>
				<span data-type="icon" data-for="pwd"><Pwd/></span>
				{is2FAEnabled
					? <>
						<UnwrappedDecorateInput value={model.code2fa ?? ''} onValueChange={onCodeChange}
						                        disabled={state.mode !== Mode.CODE2FA}
						                        placeholder="page.authentication.code2fa.placeholder"
						                        data-di-for="code2fa" ref={codeRef}/>
						<span data-type="icon" data-for="code2fa"><Code/></span>
					</>
					: null}
				{is2FAEnabled && state.mode === Mode.CODE2FA
					? <UnwrappedButton onClick={onToPwdClick} data-for="toPwd" ink={ButtonInk.WAIVE}
					                   fill={ButtonFill.LINK}>
						<IntlLabel keys={['page.authentication.toPwd']} value="Re-enter password"/>
					</UnwrappedButton>
					: null}
				<UnwrappedButton onClick={onConfirmClick} data-for="login">
					<IntlLabel keys={['page.authentication.confirm']} value="Login"/>
				</UnwrappedButton>
			</UnwrappedSection>
		</Container>
	</GlobalRoot>;
};
