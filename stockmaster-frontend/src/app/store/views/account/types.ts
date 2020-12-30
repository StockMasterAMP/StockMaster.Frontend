const _namespace = 'Account';

export interface IActionType {
    readonly RESET_STATE: string;
    readonly GET: string;
}
export type IAccountState = {
    status?: boolean;
};

export type GetAboutMeResponse = {};

export const ActionType = Object.freeze<IActionType>({
    RESET_STATE: `${_namespace}/resetState`,
    GET: `${_namespace}/get`,
});
