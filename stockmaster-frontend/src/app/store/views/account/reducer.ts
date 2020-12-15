import { FunctionReturnTypes, ReduxAction } from '../../index';
import { actionCreators } from './actions';
import { IAccountState } from './types';
import update from 'immutability-helper';

const initialState = Object.freeze<IAccountState>({});

export const reducer = (
    state: IAccountState = initialState,
    incomingAction: FunctionReturnTypes<typeof actionCreators>,
) => {
    const action = incomingAction as ReduxAction;

    switch (action.type) {
        default:
            return state;
    }
};
