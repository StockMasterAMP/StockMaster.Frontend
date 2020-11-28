import { IAppThunkAction, ReduxAction } from '../../';
import { ActionType } from './types';

export const actionCreators = {
    resetState: (): ReduxAction => ({
        type: ActionType.RESET_STATE,
    }),
};
