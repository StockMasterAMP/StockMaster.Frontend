import { FunctionReturnTypes, ReduxAction } from '../index';
import { actionCreators } from './actions';
import { ActionType, IAuthState, AuthStatusEnum } from './types';
import update from 'immutability-helper';

const initialState = Object.freeze<IAuthState>({
	accessToken: '',
	refreshToken: '',
	role: '',
	expires: null,
	email: '',
	status: AuthStatusEnum.NONE,
	isAuthenticated: false,
	code: '',
	reason: '',
});

export const reducer = (state: IAuthState = initialState, incomingAction: FunctionReturnTypes<typeof actionCreators>) => {
	const action = incomingAction as ReduxAction;

	switch (action.type) {
		case ActionType.LOGIN:
		case ActionType.REGISTER:
		case ActionType.REGISTER_SUCCESS:
			return state;

		case ActionType.SET_AUTH_STATUS:
			return update(state, {
				status: { $set: action.status },
			});

		case ActionType.LOGIN_SUCCESS:
			return update(state, {
				accessToken: { $set: action.loginResponse.accessToken },
				refreshToken: { $set: action.loginResponse.refreshToken },
				expires: { $set: action.loginResponse.expires },
				role: { $set: action.loginResponse.role },
				email: { $set: action.loginResponse.email },
				status: { $set: action.loginResponse.status },
				isAuthenticated: { $set: true },
			});

		case ActionType.REGISTER_FAIL:
			return update(state, {
				code: { $set: action.registerResponse.code },
				reason: { $set: action.registerResponse.reason },
			});

		case ActionType.LOGOUT:
		case ActionType.LOGIN_FAIL:
		case ActionType.RESET_STATE:
			return initialState;

		default:
			return state;
	}
};
