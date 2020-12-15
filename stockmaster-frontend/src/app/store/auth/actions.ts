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
        proceedLoginProcess(loginRequest, dispatch, null);
    },

    logoutUserRequest: (): IAppThunkAction<ReduxAction> => (dispatch) => {
        accessTokenRevoke();
        refreshTokenRevoke();
        dispatch({ type: ActionType.LOGOUT });
    },

    registerUserRequest: (registerRequest: RegisterRequest): IAppThunkAction<ReduxAction> => (dispatch) => {
        AuthApi.registerAsync(registerRequest).then((registerResponse: Partial<RegisterResponse>) => {
            if (registerResponse.statusCode == 201) {
                var loginRequest: LoginRequest = {
                    email: registerRequest.email,
                    password: registerRequest.password,
                };

                proceedLoginProcess(loginRequest, dispatch, registerResponse);
            } else {
                dispatch({ registerResponse, type: ActionType.REGISTER_FAIL });
            }
        });
    },
};

const proceedLoginProcess = (
    loginRequest: LoginRequest,
    dispatch: (action: ReduxAction) => void,
    registerResponse: Partial<RegisterResponse> | null,
) => {
    AuthApi.loginAsync(loginRequest).then((loginResponse: Partial<LoginResponse>) => {
        if (loginResponse.accessToken && loginResponse.expires && loginResponse.refreshToken && loginResponse.role) {
            Cookies.set('AccessToken', loginResponse.accessToken, {
                expires: new Date(loginResponse.expires * 1000),
            });
            Cookies.set('RefreshToken', loginResponse.refreshToken, {
                expires: new Date().getTime(),
            });
            dispatch({ loginResponse, type: ActionType.LOGIN_SUCCESS });
            registerResponse !== null ?? dispatch({ registerResponse, type: ActionType.REGISTER_SUCCESS });
        } else {
            registerResponse !== null ?? dispatch({ registerResponse, type: ActionType.REGISTER_FAIL });
            dispatch({ loginResponse, type: ActionType.LOGIN_FAIL });
        }
    });
};

const accessTokenRevoke = () => {
    if (Cookies.get('AccessToken')!?.length > 0) {
        let accessTokenString: string = Cookies.get('AccessToken')!.toString();
        AuthApi.accessTokensRevoke(accessTokenString);
        Cookies.remove('AccessToken');
    }
};

const refreshTokenRevoke = () => {
    if (Cookies.get('RefreshToken')!?.length > 0) {
        let refreshTokenString: string = Cookies.get('RefreshToken')!.toString();
        AuthApi.refreshTokenRevoke(refreshTokenString);
        Cookies.remove('RefreshToken');
    }
};

const updateAuthenticationTokens = () => {
    if (Cookies.get('RefreshToken')!?.length > 0) {
        let refreshTokenString: string = Cookies.get('RefreshToken')!.toString();
        AuthApi.updateAuthenticationTokens(refreshTokenString);
    }
};
