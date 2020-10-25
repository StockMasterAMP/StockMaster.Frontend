import { History } from 'history';
import { IApplicationState } from './index';
import { reducer as AuthReducer } from './auth';
import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';

/**
 * Takes all the individual reducers and creates a single state object by combining them.
 */
export const createRootReducer = (history: History): Reducer<IApplicationState> =>
	combineReducers<IApplicationState>({
		auth: AuthReducer,
		router: connectRouter(history),
	});
