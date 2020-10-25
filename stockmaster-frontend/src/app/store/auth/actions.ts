import { AuthApi } from '../../api';
import { IAppThunkAction, ReduxAction } from '../';
import { ActionType, IAuthUser, ICredentials, AuthStatusEnum, AuthStatus } from './types';
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
		AuthApi.loginAsync(credentials).then((authUser: IAuthUser) => {
			if (authUser.status === AuthStatusEnum.SUCCESS) {
				dispatch({
					authUser,
					type: ActionType.LOGIN_SUCCESS,
				});

				Cookies.set('authToken', authUser.token, { expires: new Date(authUser.validTo) });
			} else {
				dispatch({ type: ActionType.LOGIN_FAIL });
			}
		});
	},

	logoutUserRequest: (): IAppThunkAction<ReduxAction> => (dispatch) => {
		Cookies.remove('authToken');
		dispatch({ type: ActionType.RESET_STATE });
	},
};
