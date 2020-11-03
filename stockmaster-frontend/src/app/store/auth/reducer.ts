import { FunctionReturnTypes, ReduxAction } from '../index';
import { actionCreators } from './actions';
import { ActionType, IAuthState, AuthStatusEnum } from './types';
import update from 'immutability-helper';

const initialState = Object.freeze<IAuthState>({
	AccessToken: '',
	RefreshToken: '',
	Role: '',
	Expires: null,
	Email: '',
	Status: AuthStatusEnum.NONE,
	isAuthenticated: false,
});


export const reducer = (state: IAuthState = initialState, incomingAction: FunctionReturnTypes<typeof actionCreators>) => {
	const action = incomingAction as ReduxAction;

	switch (action.type) {
		case ActionType.LOGIN:
			return state;

		case ActionType.SET_AUTH_STATUS:
			return update(state, {
				Status: { $set: action.Status },
			});

		case ActionType.LOGIN_SUCCESS:
			return update(state, {
				AccessToken: { $set: action.authUser.AccessToken },
				Expires: { $set: action.authUser.Expires },
				Role: { $set: action.authUser.Role },
				Email: { $set: action.authUser.Email },
				Status: { $set: action.authUser.Status },
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
