import { IAppThunkAction, ReduxAction } from '../../';
import { AuthApi } from '../../../api';
import { ActionType } from './types';

export const actionCreators = {
    resetState: (): ReduxAction => ({
        type: ActionType.RESET_STATE,
    }),

    getAboutMe: (): IAppThunkAction<ReduxAction> => (dispatch) => {
        AuthApi.getAboutMe().then((response: any) => {
            // TODO
        });
    },
};
