import { FunctionReturnTypes, ReduxAction } from '../index';
import { actionCreators } from './actions';
import { ActionType, IAuthState, LoginResponse, RegisterResponse } from './types';
import update from 'immutability-helper';

const initialState = Object.freeze<IAuthState>({
    loginResponse: {} as LoginResponse,
    registerResponse: {} as RegisterResponse,
    isAuthenticated: false,
    validationErrors: false,
});

export const reducer = (
    state: IAuthState = initialState,
    incomingAction: FunctionReturnTypes<typeof actionCreators>,
) => {
    const action = incomingAction as ReduxAction;

    switch (action.type) {
        case ActionType.LOGIN:
        case ActionType.REGISTER:
            return state;

        case ActionType.SET_LOGIN_AUTH_STATUS:
            return update(state, {
                loginResponse: {
                    status: { $set: action.status },
                },
            });

        case ActionType.SET_REGISTER_AUTH_STATUS:
            return update(state, {
                registerResponse: {
                    status: { $set: action.status },
                },
            });

        case ActionType.LOGIN_SUCCESS:
            return update(state, {
                loginResponse: {
                    accessToken: { $set: action.loginResponse.accessToken },
                    refreshToken: { $set: action.loginResponse.refreshToken },
                    expires: { $set: action.loginResponse.expires },
                    role: { $set: action.loginResponse.role },
                    email: { $set: action.loginResponse.email },
                    statusCode: { $set: action.loginResponse.statusCode },
                },
                isAuthenticated: { $set: true },
                validationErrors: { $set: false },
            });
        case ActionType.LOGIN_FAIL:
            return update(state, {
                loginResponse: {
                    code: { $set: action.loginResponse.code },
                    reason: { $set: action.loginResponse.reason },
                    statusCode: { $set: action.loginResponse.statusCode },
                },
                validationErrors: { $set: true },
            });

        case ActionType.REGISTER_SUCCESS:
            return update(state, {
                registerResponse: {
                    statusCode: { $set: action.registerResponse.statusCode },
                },
                validationErrors: { $set: false },
            });

        case ActionType.REGISTER_FAIL:
            return update(state, {
                registerResponse: {
                    code: { $set: action.registerResponse.code },
                    reason: { $set: action.registerResponse.reason },
                    statusCode: { $set: action.registerResponse.statusCode },
                },
                validationErrors: { $set: true },
            });

        case ActionType.LOGOUT:
        case ActionType.RESET_STATE:
            return initialState;

        default:
            return state;
    }
};
