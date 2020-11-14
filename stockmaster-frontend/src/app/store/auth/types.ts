export interface IActionType {
	readonly LOGIN: string;
	readonly LOGIN_SUCCESS: string;
	readonly LOGIN_FAIL: string;
	readonly LOGOUT: string;
	readonly RESET_STATE: string;
	readonly SET_AUTH_STATUS: string;
	readonly REGISTER: string;
	readonly REGISTER_SUCCESS: string;
	readonly REGISTER_FAIL: string;
}

export type AuthStatus = 'none' | 'process' | 'success' | 'fail';

export type ICredentials = {
	email?: string;
	password?: string;
};

export type IRegisterResponse = {
	reason: string;
	code: string;
	statusCode: number;
};

export type IAuthUser = {
	accessToken: string | object;
	refreshToken: string;
	role: string;
	expires: number;
	email: string;
	status?: AuthStatus;
};

export type IAuthState = {
	readonly accessToken: string | object | null;
	readonly refreshToken: string | null;
	readonly role: string | null;
	readonly expires: number | null;
	readonly email: string;
	readonly status?: AuthStatus;
	readonly isAuthenticated: boolean;
	readonly code: string;
	readonly reason: string;
};

const _namespace = 'Authentication';

export const ActionType = Object.freeze<IActionType>({
	LOGIN: `${_namespace}/login`,
	LOGIN_SUCCESS: `${_namespace}/loginSuccess`,
	LOGIN_FAIL: `${_namespace}/loginFail`,
	LOGOUT: `${_namespace}/logout`,
	RESET_STATE: `${_namespace}/resetState`,
	SET_AUTH_STATUS: `${_namespace}/setAuthStatus`,
	REGISTER: `${_namespace}/register`,
	REGISTER_SUCCESS: `${_namespace}/registerSuccess`,
	REGISTER_FAIL: `${_namespace}/registerFail`,
});

export const AuthStatusEnum = Object.freeze<{ [key: string]: AuthStatus }>({
	NONE: 'none',
	PROCESS: 'process',
	SUCCESS: 'success',
	FAIL: 'fail',
});
