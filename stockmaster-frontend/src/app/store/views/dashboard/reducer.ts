import { FunctionReturnTypes, ReduxAction } from '../../index';
import { actionCreators } from './actions';
import { IDashboardState } from './types';
import update from 'immutability-helper';

const initialState = Object.freeze<IDashboardState>({});

export const reducer = (
    state: IDashboardState = initialState,
    incomingAction: FunctionReturnTypes<typeof actionCreators>,
) => {
    const action = incomingAction as ReduxAction;

    switch (action.type) {
        default:
            return state;
    }
};
