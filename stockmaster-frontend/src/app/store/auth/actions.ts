import { AuthApi } from '../../api';
import { IAppThunkAction, ReduxAction } from '../';
import { ActionType, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, AuthStatus } from './types';
import Cookies from 'js-cookie';

export const actionCreators = {
    resetState: (): ReduxAction => ({
        type: ActionType.RESET_STATE,
    }),

    setRegisterAuthStatus: (status: AuthStatus): ReduxAction => ({
        status,
        type: ActionType.SET_REGISTER_AUTH_STATUS,
    }),

    setLoginAuthStatus: (status: AuthStatus): ReduxAction => ({
        status,
        type: ActionType.SET_LOGIN_AUTH_STATUS,
    }),

    loginUserRequest: (loginRequest: LoginRequest): IAppThunkAction<ReduxAction> => (dispatch) => {
        AuthApi.loginAsync(loginRequest).then((loginResponse: Partial<LoginResponse>) => {
            if (
                loginResponse.accessToken &&
                loginResponse.expires &&
                loginResponse.refreshToken &&
                loginResponse.role
            ) {
                Cookies.set('AccessToken', loginResponse.accessToken, {
                    expires: new Date(loginResponse.expires * 1000),
                });
                Cookies.set('RefreshToken', loginResponse.refreshToken, {
                    expires: new Date().getTime(),
                });
                dispatch({ loginResponse, type: ActionType.LOGIN_SUCCESS });
            } else {
                dispatch({ loginResponse, type: ActionType.LOGIN_FAIL });
            }
        });
    },

    logoutUserRequest: (): IAppThunkAction<ReduxAction> => (dispatch) => {
        Cookies.remove('AccessToken');
        debugger;
        dispatch({ type: ActionType.LOGOUT });
    },

    registerUserRequest: (registerRequest: RegisterRequest): IAppThunkAction<ReduxAction> => (dispatch) => {
        AuthApi.registerAsync(registerRequest).then((registerResponse: Partial<RegisterResponse>) => {
            if (registerResponse.statusCode == 201) {
                var loginRequest: LoginRequest = {
                    email: registerRequest.email,
                    password: registerRequest.password,
                };

                AuthApi.loginAsync(loginRequest).then((loginResponse: Partial<LoginResponse>) => {
                    if (
                        loginResponse.accessToken &&
                        loginResponse.expires &&
                        loginResponse.refreshToken &&
                        loginResponse.role
                    ) {
                        Cookies.set('AccessToken', loginResponse.accessToken, {
                            expires: new Date(loginResponse.expires * 1000),
                        });

                        Cookies.set('RefreshToken', loginResponse.refreshToken, {
                            expires: new Date(loginResponse.expires * 1000),
                        });
                        dispatch({ registerResponse, type: ActionType.REGISTER_SUCCESS });
                        dispatch({ loginResponse, type: ActionType.LOGIN_SUCCESS });
                    } else {
                        dispatch({ registerResponse, type: ActionType.REGISTER_FAIL });
                        dispatch({ loginResponse, type: ActionType.LOGIN_FAIL });
                    }
                });
            } else {
                dispatch({ registerResponse, type: ActionType.REGISTER_FAIL });
            }
        });
    },
};
