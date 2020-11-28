export interface IActionType {
    readonly LOGIN: string;
    readonly LOGIN_SUCCESS: string;
    readonly LOGIN_FAIL: string;
    readonly LOGOUT: string;
    readonly RESET_STATE: string;
    readonly REGISTER: string;
    readonly REGISTER_SUCCESS: string;
    readonly REGISTER_FAIL: string;
    readonly SET_LOGIN_AUTH_STATUS: string;
    readonly SET_REGISTER_AUTH_STATUS: string;
}

export type AuthStatus = 'none' | 'process' | 'success' | 'fail';

export type ICredentials = {
    email: string;
    password: string;
};

export type ResponseBase = {
    reason: string;
    code: string;
    statusCode: number | null;
    status: AuthStatus;
};
export type RegisterRequest = ICredentials & {};
export type RegisterResponse = ResponseBase & {};

export type LoginRequest = ICredentials & {};
export type LoginResponse = ResponseBase & {
    accessToken: string | object;
    refreshToken: string | object;
    role: string;
    expires: number;
    email: string;
};

export type IAuthState = {
    loginResponse: LoginResponse;
    registerResponse: RegisterResponse;
    isAuthenticated: boolean;
    validationErrors: boolean;
};

const _namespace = 'Authentication';

export const ActionType = Object.freeze<IActionType>({
    LOGIN: `${_namespace}/login`,
    LOGIN_SUCCESS: `${_namespace}/loginSuccess`,
    LOGIN_FAIL: `${_namespace}/loginFail`,
    LOGOUT: `${_namespace}/logout`,
    RESET_STATE: `${_namespace}/resetState`,
    REGISTER: `${_namespace}/register`,
    REGISTER_SUCCESS: `${_namespace}/registerSuccess`,
    REGISTER_FAIL: `${_namespace}/registerFail`,
    SET_LOGIN_AUTH_STATUS: `${_namespace}/setLoginAuthStatus`,
    SET_REGISTER_AUTH_STATUS: `${_namespace}/setRegisterAuthStatus`,
});

export const AuthStatusEnum = Object.freeze<{ [key: string]: AuthStatus }>({
    NONE: 'none',
    PROCESS: 'process',
    SUCCESS: 'success',
    FAIL: 'fail',
});
