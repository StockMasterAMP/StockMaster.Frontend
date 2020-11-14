import { AuthApi } from '../../api';
import { IAppThunkAction, ReduxAction } from '../';
import { ActionType, IAuthUser, ICredentials, IRegisterResponse, AuthStatusEnum, AuthStatus } from './types';
import Cookies from 'js-cookie';

export const actionCreators = {
	resetState: (): ReduxAction => ({
		type: ActionType.RESET_STATE,
	}),

	setAuthStatus: (status: AuthStatus): ReduxAction => ({
		status,
		type: ActionType.SET_AUTH_STATUS,
	}),

	loginUserRequest: (credentials: ICredentials): IAppThunkAction<ReduxAction> => (dispatch) => {
		AuthApi.loginAsync(credentials).then((loginResponse: IAuthUser) => {
			if (loginResponse !== undefined) {
				dispatch({
					loginResponse,
					type: ActionType.LOGIN_SUCCESS,
				});
				Cookies.set('AccessToken', loginResponse.accessToken, { expires: new Date(loginResponse.expires * 1000) });
				Cookies.set('RefreshToken', loginResponse.refreshToken, { expires: new Date(loginResponse.expires * 1000) });
			} else {
				dispatch({ type: ActionType.LOGIN_FAIL });
			}
		});
	},

	logoutUserRequest: (): IAppThunkAction<ReduxAction> => (dispatch) => {
		Cookies.remove('AccessToken');
		Cookies.remove('RefreshToken');
		dispatch({ type: ActionType.RESET_STATE });
	},

	registerUserRequest: (credentials: ICredentials): IAppThunkAction<ReduxAction> => (dispatch) => {
		AuthApi.registerAsync(credentials).then((registerResponse: number | IRegisterResponse) => {
			if (registerResponse == 201) {
				dispatch({ type: ActionType.REGISTER_SUCCESS });

				AuthApi.loginAsync(credentials).then((loginResponse: IAuthUser) => {
					if (loginResponse !== undefined) {
						dispatch({
							loginResponse,
							type: ActionType.LOGIN_SUCCESS,
						});

						Cookies.set('AccessToken', loginResponse.accessToken, { expires: new Date(loginResponse.expires * 1000) });

						Cookies.set('RefreshToken', loginResponse.refreshToken, { expires: new Date(loginResponse.expires * 1000) });
					} else {
						dispatch({ type: ActionType.LOGIN_FAIL });
					}
				});
			} else {
				dispatch({
					registerResponse,
					type: ActionType.REGISTER_FAIL,
				});
			}
		});
	},
};
