import { FunctionReturnTypes, ReduxAction } from '../index';
import { actionCreators } from './actions';
import { ActionType, IAuthState, AuthStatusEnum } from './types';
import update from 'immutability-helper';

const initialState = Object.freeze<IAuthState>({
	token: '',
	validTo: '',
	email: '',
	status: AuthStatusEnum.NONE,
	isAuthenticated: false,
});

export const reducer = (state: IAuthState = initialState, incomingAction: FunctionReturnTypes<typeof actionCreators>) => {
	const action = incomingAction as ReduxAction;

	switch (action.type) {
		case ActionType.LOGIN:
			return state;

		case ActionType.SET_AUTH_STATUS:
			return update(state, {
				status: { $set: action.status },
			});

		case ActionType.LOGIN_SUCCESS:
			return update(state, {
				token: { $set: action.authUser.token },
				validTo: { $set: action.authUser.validTo },
				email: { $set: action.authUser.email },
				status: { $set: action.authUser.status },
				isAuthenticated: { $set: true },
			});
		case ActionType.LOGOUT:
		case ActionType.LOGIN_FAIL:
		case ActionType.RESET_STATE:
			return initialState;

		default:
			return state;
	}
};
