export type IDashboardState = {
    status?: boolean;
};

const _namespace = 'Dashboard';

export interface IActionType {
    readonly RESET_STATE: string;
    readonly GET: string;
}

export const ActionType = Object.freeze<IActionType>({
    RESET_STATE: `${_namespace}/resetState`,
    GET: `${_namespace}/get`,
});
